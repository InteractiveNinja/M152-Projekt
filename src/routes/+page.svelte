<script lang="ts">
	import ConvertedFile from '../components/ConvertedFile.svelte';
	import FileInput from '../components/FileInput.svelte';
	import FileFormatInput from "../components/FileFormatInput.svelte";

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
		on:valide={(event) => (sourceFile = event.detail.file)}
		on:invalide={() => (sourceFile = undefined)}
	/>

	<label class="container big-btn p-0">
		<p>Ziel Format wählen</p>
		<FileFormatInput on:fileformat="{(event) => (outputFileExtension = event.detail.format)}"/>
	</label>

	{#if isValide}
		<button on:click={() => (readyForConversion = true)} class="btn btn-dark big-btn"
			>Konvertieren
		</button>
	{/if}

	{#if readyForConversion}
		<ConvertedFile {reset} file={sourceFile} fileExt={outputFileExtension} />
	{/if}
	{#if import.meta.env.VITE_BUILD_NR}
		Build: {import.meta.env.VITE_BUILD_NR}
	{/if}
</div>
