<script lang="ts">
	import DownloadButton from './DownloadButton.svelte';
	import Button, { Icon, Label } from '@smui/button';
	import { FileTypes } from '../types/FileTypes.js';

	export let convertedVideoUrl: string;
	export let convertedFileName: string;
	export let fileExt: FileTypes;
	export let reset: () => void;
</script>

<div class="d-flex flex-column align-items-center">
	{#if fileExt !== FileTypes.gif}
		<!-- svelte-ignore a11y-media-has-caption -->
		<div class="embed-responsive embed-responsive-16by9">
			<video width="320" height="240" controls>
				<source src={convertedVideoUrl} />
			</video>
		</div>
	{:else}
		<div class="embed-responsive embed-responsive-16by9">
			<img
				width="320"
				height="240"
				src={convertedVideoUrl}
				alt="Konvertierens GIF {convertedFileName}"
			/>
		</div>
	{/if}
	<div class="d-flex justify-content-evenly p-1 action-buttons">
		<DownloadButton fileBlob={convertedVideoUrl} filename={convertedFileName} />
		<Button class="retry-button" variant="raised" color="secondary" on:click={reset}>
			<Icon class="material-icons">replay</Icon>
			<Label>Nochmals Konvertieren</Label>
		</Button>
	</div>
</div>

<style lang="scss">
	@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
		.action-buttons {
			flex-direction: column;
		}
		:global(.retry-button) {
			margin-top: 1em;
		}
	}
</style>
