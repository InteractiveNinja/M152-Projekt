<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { isValideFile } from '../util/FileUtil';

	const dispatch = createEventDispatcher();
	let isFilled,
		isInvalide = false;

	const validateFileInput = (file: File) => {
		isFilled = true;
		if (isValideFile(file)) {
			isInvalide = false;
			dispatch('valide', {
				file
			});
			return;
		}
		dispatch('invalide');
		isInvalide = true;
	};
</script>

<label class="btn btn-lg shadow {isFilled && !isInvalide ? 'btn-success' : 'btn-light'} big-btn">
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
{#if isInvalide}
	<span class="text-warning">Ausgewählte Datei ist nicht valide</span>
{/if}

<style lang="scss">
	.big-btn {
		margin: 1em;
		width: 66%;
	}
</style>
