<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
	import { FileTypes } from '../types/FileTypes';
	import { getFileExtension, getFileTypeExtension } from '../util/FileUtil';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import VideoShowcase from './VideoShowcase.svelte';

	export let file: File;
	export let fileExt: FileTypes;
	export let reset: () => void;
	let convertedVideoUrl: string;
	let convertedFileName: string;
	let ffmpegLoaded = true;
	let loading = false;

	const ffmpeg = createFFmpeg({ log: true });

	async function convertFile(file: File, outputFileType: FileTypes) {
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
