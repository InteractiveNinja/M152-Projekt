<script lang="ts">
	import { env } from '$env/dynamic/public';
	import ConvertedFile from '../components/ConvertedFile.svelte';
	import FileInput from '../components/FileInput.svelte';
	import { FileTypes } from '../types/FileTypes';

	let sourceFile: File | undefined;
	let outputFileExtension: FileTypes;
	let readyForConversion = false;
	$: isValide = !!sourceFile && !!outputFileExtension;

	function reset() {
		readyForConversion = false;
	}
</script>

<svelte:head>
	<title>Media Converter</title>
</svelte:head>
<div class="container-fluid">
	<h1>Media Converter</h1>
	<FileInput
		on:valide={(event) => console.log(event.detail.file)}
		on:invalide={() => (sourceFile = undefined)}
	/>

	<label class="container big-btn p-0">
		<p>Ziel Format wählen</p>
		<select
			class="form-select form-select-lg"
			on:change={(e) => (outputFileExtension = e.target?.value)}
			name="filetype"
			id="filetype"
		>
			<option disabled selected value>Formate</option>
			{#each Object.entries(FileTypes) as [key, value]}
				<option {value}>{key}</option>
			{/each}
		</select>
	</label>

	{#if isValide}
		<button on:click={() => (readyForConversion = true)} class="btn btn-dark big-btn"
			>Konvertieren
		</button>
	{/if}

	{#if readyForConversion}
		<ConvertedFile {reset} file={sourceFile} fileExt={outputFileExtension} />
	{/if}
	{#if env.BUILD_NUMBER}
		{env.BUILD_NUMBER}
	{/if}
</div>

<style lang="scss">
	// Global Styling
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

	:global {
		body {
			font-family: 'Poppins', sans-serif;
			color: var(--bs-white);
			background-color: var(--bs-gray-dark);
		}
	}

	div {
		display: flex;
		flex-direction: column;
		align-items: center;

		h1,
		p {
			text-align: center;
			font-size: 2em;
		}

		input,
		select {
			text-align: center;
			margin-top: 1em;
		}

		label {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		video {
			width: 100%;
			height: auto;
		}
	}
</style>
