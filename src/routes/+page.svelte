<script lang="ts">
	import ConvertedFile from '../components/ConvertedFile.svelte';
	import FileInput from '../components/FileInput/FileInput.svelte';
	import FileFormatInput from '../components/FileFormatInput.svelte';
	import Footer from '../components/Footer.svelte';
	import { FileTypes } from '../types/FileTypes';
	import Button, { Label, Icon } from '@smui/button';
	import AppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import Card, { Content } from '@smui/card';

	let sourceFile: File | undefined;
	let outputFileExtension: FileTypes;
	let readyForConversion = false;
	$: isValide = !!sourceFile && !!outputFileExtension;

	function reset() {
		readyForConversion = false;
	}
</script>

<div>
	<AppBar variant="static">
		<Row>
			<Section>
				<Icon class="material-icons">change_circle</Icon>
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
	<div class="container-fluid p-4">
		<div class="container-fluid text-center">
			<div class="header">Media-Konverter</div>
			<div class="subtitle1">Konvertieren Sie Ihre Dateien in jedes beliebige Format</div>
			<div class="subtitle1">Lokale auf Ihren Browser</div>
		</div>
		<Card class="w-100">
			<Content>
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
			</Content>
		</Card>
	</div>

	<Footer />
</div>

<style lang="scss">
	@use '@material/typography';
	@use './src/theme/variables';

	.header {
		@include typography.typography(headline3);
		color: variables.$primary;
		font-weight: bold;
	}

	.subtitle1 {
		@include typography.typography(subtitle1);
	}
</style>
