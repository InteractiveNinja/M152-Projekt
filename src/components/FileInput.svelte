<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { isValideFile } from '../util/FileUtil';
	import Snackbar, { Label } from '@smui/snackbar';

	const dispatch = createEventDispatcher();

	let snackBar: Snackbar;

	const validateFileInput = (file: File) => {
		if (isValideFile(file)) {
			dispatch('valide', {
				file
			});
			return;
		}
		snackBar.open();
		dispatch('invalide');
	};
</script>

<label class="btn big-btn shadow">
	<span>Datei wählen</span>
	<input
		hidden
		class="btn"
		type="file"
		on:change={(e) => validateFileInput(e.target?.files?.item(0))}
		name=""
		id=""
	/>
</label>
<Snackbar bind:this={snackBar}>
	<Label>Ausgewählte Datei ist nicht valide!</Label>
</Snackbar>

<style lang="scss">
	.big-btn {
		margin: 1em;
		width: 66%;
	}
</style>
