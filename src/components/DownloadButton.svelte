<script lang="ts">
	import Button, { Icon, Label } from '@smui/button';
	export let fileBlob: string;
	export let filename: string;

	function downloadFile(): void {
		const link = document.createElement('a');
		link.href = fileBlob;
		link.setAttribute('download', filename);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<Button variant="raised" color="secondary" on:click={downloadFile}>
	<Icon class="material-icons">arrow_downward</Icon>
	<Label>Datei Herunterladen</Label>
</Button>
