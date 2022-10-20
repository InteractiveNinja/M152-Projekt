<script lang="ts">
	import DownloadButton from './DownloadButton.svelte';
	import Button, { Icon, Label } from '@smui/button';
	import { FileTypes } from '../types/FileTypes.js';

	export let convertedVideoUrl: string;
	export let convertedFileName: string;
	export let fileExt: FileTypes;
	export let reset: () => void;
</script>

<div class="d-flex flex-column w-50">
	{#if fileExt !== FileTypes.gif}
		<!-- svelte-ignore a11y-media-has-caption -->
		<video controls>
			<source src={convertedVideoUrl} />
		</video>
	{:else}
		<img src={convertedVideoUrl} type="media/gif" alt="Konvertierens GIF {convertedFileName}" />
	{/if}
	<div class="d-flex justify-content-evenly p-1">
		<DownloadButton fileBlob={convertedVideoUrl} filename={convertedFileName} />
		<Button variant="raised" color="secondary" on:click={reset}>
			<Icon class="material-icons">replay</Icon>
			<Label>Nochmals Konvertieren</Label>
		</Button>
	</div>
</div>
