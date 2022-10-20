<script lang="ts">
	import ConvertedFile from '../components/ConvertedFile.svelte';
	import FileInput from '../components/FileInput.svelte';
	import FileFormatInput from '../components/FileFormatInput.svelte';
	import { FileTypes } from '../types/FileTypes';
	import Button, { Label, Icon } from '@smui/button';
	import AppBar, { Row, Section, Title } from '@smui/top-app-bar';

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

<div>
	<AppBar variant="static" dense color="secondary">
		<Row>
			<Section>
				<Icon class="material-icons">settings</Icon>
				<Title>Media Converter</Title>
			</Section>
			<Section align="end">
				<Button
					variant="unelevated"
					color="secondary"
					class="small-side-button"
					on:click={() => window.open('https://svelte.dev/', '_blank')}
				>
					<Label>Made with Svelte</Label>
					<Icon class="material-icons white-icon">favorite</Icon>
				</Button>
			</Section>
		</Row>
	</AppBar>

	<FileInput
		on:valide={(event) => (sourceFile = event.detail.file)}
		on:invalide={() => (sourceFile = undefined)}
	/>

	<FileFormatInput on:fileformat={(event) => (outputFileExtension = event.detail.format)} />

	{#if isValide}
		<Button variant="raised" on:click={() => (readyForConversion = true)}>
			<Icon class="material-icons">settings</Icon>
			<Label>Konvertieren</Label>
		</Button>
	{/if}

	{#if readyForConversion}
		<ConvertedFile {reset} file={sourceFile} fileExt={outputFileExtension} />
	{/if}
	{#if import.meta.env.VITE_BUILD_NR}
		Build: {import.meta.env.VITE_BUILD_NR}
	{/if}
</div>
