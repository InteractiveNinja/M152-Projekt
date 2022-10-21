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
		<Card class=" sides">
			<Content>
				<div class="d-flex flex-column align-items-center">
					<div class="p-2">
						<FileInput
							on:valide={(event) => (sourceFile = event.detail.file)}
							on:invalide={() => (sourceFile = undefined)}
						/>
					</div>
					<div class="p-2">
						<FileFormatInput
							on:fileformat={(event) => (outputFileExtension = event.detail.format)}
						/>
					</div>
					{#if isValide}
						<div class="p-2">
							<Button variant="raised" on:click={() => (readyForConversion = true)}>
								<Icon class="material-icons">settings</Icon>
								<Label>Konvertieren</Label>
							</Button>
						</div>
					{/if}
					{#if readyForConversion}
						<ConvertedFile {reset} file={sourceFile} fileExt={outputFileExtension} />
					{/if}
				</div>
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
	:global(.side-margin) {
		margin: 0 20em;
	}
</style>
