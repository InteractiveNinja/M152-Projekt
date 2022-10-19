<script lang="ts">
	export let fileBlob: string;

	function downloadFile(): void {
		const link = document.createElement('a');
		link.href = fileBlob;
		link.setAttribute('download', 'output');
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<button id="btn" class="btn btn-success big-btn" on:click={() => downloadFile()}
	>Herunterladen</button
>
