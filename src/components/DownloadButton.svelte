<script lang="ts">
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

<button id="btn" class="btn btn-success big-btn" on:click={() => downloadFile()}
	>Herunterladen</button
>
