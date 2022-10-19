<script lang="ts">
	import { onMount } from 'svelte';
	import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
	import { FileTypes } from '../types/FileTypes';
	import { getFileExtension, getFileTypeExtension } from "../util/FileUtil";
	import LoadingSpinner from './LoadingSpinner.svelte';
	import DownloadButton from './DownloadButton.svelte';

	export let file: File;
	export let fileExt: FileTypes;
	export let reset: () => void;
	let convertedVideoUrl;
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
	}

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
	{#if fileExt !== FileTypes.gif}
		<!-- svelte-ignore a11y-media-has-caption -->
		<video controls>
			<source src={convertedVideoUrl} />
		</video>
	{:else}
		<img src={convertedVideoUrl} type="media/gif" alt="Konvertierens GIF {file.name}" />
	{/if}
	<DownloadButton fileBlob={convertedVideoUrl} />
	<button class="btn btn-success text-white" on:click={reset()}>Nochmals Konvertieren?</button>
{/if}

<style>
	video {
		width: 50%;
		height: auto;
	}
	.btn {
		margin: 1em;
		width: 66%;
		text-align: center;
	}
</style>
