<script lang="ts">
	import ConvertedFile from '../components/ConvertedFile.svelte';
	import FileInput from '../components/FileInput/FileInput.svelte';
	import FileFormatInput from '../components/FileFormatInput.svelte';
	import Footer from '../components/Footer.svelte';
	import type { FileTypes } from '../types/FileTypes';
	import Button, { Label, Icon } from '@smui/button';
	import AppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import Card, { Content } from '@smui/card';
	import MobileFirst from '../components/MobileFirst.svelte';
	import IconButton from '@smui/icon-button';
	import SvelteLogo from '../components/svg/SvelteLogo.svelte';
	import { onMount } from 'svelte';
	import ErrorDialog from '../components/ErrorDialog.svelte';
	let sourceFile: File | undefined;
	let outputFileExtension: FileTypes;
	let readyForConversion = false;
	$: isValide = !!sourceFile && !!outputFileExtension;

	let errorDialog: ErrorDialog;

	const reset = () => {
		console.log('start reset');
		readyForConversion = false;
	};
	const openSvelte = () => {
		window.open('https://svelte.dev/', '_blank');
	};

	onMount(() => {
		// Event on error Thrown for opening Error Dialog
		window.onunhandledrejection = (e) => {
			errorDialog.open(e.reason, reset);
		};
	});
</script>

<div>
	<AppBar variant="static">
		<Row>
			<Section>
				<Icon class="material-icons">change_circle</Icon>
				<Title>Media Converter</Title>
			</Section>
			<Section align="end">
				<MobileFirst>
					<div slot="mobile">
						<IconButton on:click={openSvelte}>
							<SvelteLogo />
						</IconButton>
					</div>
					<div slot="desktop">
						<Button
							variant="unelevated"
							color="secondary"
							class="small-side-button"
							on:click={openSvelte}
						>
							<Label>Made with Svelte</Label>
							<Icon class="material-icons white-icon">favorite</Icon>
						</Button>
					</div>
				</MobileFirst>
			</Section>
		</Row>
	</AppBar>
	<div class="container-fluid p-4">
		<div class="container-fluid text-center">
			<div class="header">Media-Konverter</div>
			<div class="subtitle1">Konvertieren Sie Ihre Dateien in jedes beliebige Format</div>
			<div class="subtitle1">Lokale auf Ihren Browser</div>
		</div>
		<Card class="side-margin">
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
	<ErrorDialog bind:this={errorDialog} />

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

	@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
		.header {
			@include typography.typography(headline4);
		}
		.subtitle1 {
			@include typography.typography(subtitle2);
		}
		:global(.side-margin) {
			margin: 0;
		}
	}
</style>
