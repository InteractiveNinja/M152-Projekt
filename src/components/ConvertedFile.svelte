<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
	import { FileTypes } from '../types/FileTypes';
	import {
		getFileExtension,
		getFileTypeExtension,
		getFileTypeFromFile,
		isAudioType,
		isFileOfType
	} from '../util/FileUtil';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import VideoShowcase from './VideoShowcase.svelte';
	import Snackbar, { Label } from '@smui/snackbar';
	import './FileInput/file-input.scss';

	let snackBar: Snackbar;
	let snackbarText = 'Ausgewählte Datei ist nicht valide!';

	export let file: File | undefined;
	export let fileExt: FileTypes;
	export let reset: () => void;
	let convertedVideoUrl: string;
	let convertedFileName: string;
	let ffmpegLoaded = false;
	let loading = false;

	const ffmpeg = createFFmpeg({ log: true });

	async function convertFile(file: File, outputFileType: FileTypes) {
		if (!canBeConverted(file, outputFileType)) return;
		ffmpegLoaded = true;
		await ffmpeg.load();
		ffmpegLoaded = false;
		loading = true;
		const sourceFileExt = getFileExtension(file);
		const inputFile = `input.${sourceFileExt}`;

		const outputFileExt = getFileTypeExtension(outputFileType);
		const outputFile = `output.${outputFileExt}`;

		ffmpeg.FS('writeFile', inputFile, await fetchFile(file));
		await ffmpeg.run('-i', inputFile, outputFile);
		loading = false;

		const data = ffmpeg.FS('readFile', outputFile);

		convertedVideoUrl = URL.createObjectURL(new Blob([data.buffer], { type: outputFileType }));
		convertedFileName = outputFile;
	}

	const canBeConverted = (file: File, outputFileType: FileTypes): boolean => {
		if (isFileOfType(file, FileTypes.gif) && isAudioType(outputFileType)) {
			snackbarText = 'Ein GIF kann nicht zur eine Audiodatei konvertiert werden';
			snackBar.open();
			return false;
		}
		if (outputFileType === FileTypes.gif && isAudioType(getFileTypeFromFile(file))) {
			snackbarText = 'Audiodateien können nicht zu GIF konvertiert werden';
			snackBar.open();
			return false;
		}

		return true;
	};

	function handleCloseSnackbar() {
		console.log('reset');
		reset();
	}

	onDestroy(() => {
		URL.revokeObjectURL(convertedVideoUrl);
	});

	onMount(async () => {
		if (file && fileExt) {
			await convertFile(file, fileExt);
		}
	});
</script>

{#if ffmpegLoaded}
	<LoadingSpinner text="Konverter wird vorbereitet..." />
{/if}

{#if loading}
	<LoadingSpinner text="Datei wird konvertiert..." />
{/if}
{#if convertedVideoUrl}
	<VideoShowcase {convertedFileName} {convertedVideoUrl} {reset} {fileExt} />
{/if}

<Snackbar
	class="error-snackbar"
	leading
	bind:this={snackBar}
	on:SMUISnackbar:closed={handleCloseSnackbar}
>
	<Label>{snackbarText}</Label>
</Snackbar>
