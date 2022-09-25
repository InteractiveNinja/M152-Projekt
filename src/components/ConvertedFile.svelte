<script lang='ts'>
	import { onMount } from 'svelte';
	import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
	import { FileTypes } from './FileTypes';
	import LoadingSpinner from './LoadingSpinner.svelte';

	export let file: File;
	export let fileExt: FileTypes;
	let convertedVideoUrl;
	let loading = false;


	const ffmpeg = createFFmpeg({ log: true });

	async function convertFile(file: File, outputFileType: FileTypes) {
		await ffmpeg.load();
		loading = true;
		const sourceFileExt = file.name.split('.').pop();
		const inputFile = `input.${sourceFileExt}`;

		const outputFileExt = outputFileType.split('/').pop();
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
<video controls>
	<source src='{URL.createObjectURL(file)}' type='{file.type}'>
</video>
{#if loading}
	<LoadingSpinner />
	<span>Datei wird konvertiert...</span>
	{/if}
{#if convertedVideoUrl}
	<p>Output Video</p>
	{#if fileExt !== FileTypes.gif}
		<video controls>
			<source src='{convertedVideoUrl}'>
		</video>
	{:else}
		<img src='{convertedVideoUrl}' type='media/gif' alt='Konvertierens GIF {file.name}'>
	{/if}

{/if}

