<script lang="ts">
	import Button, { Icon } from '@smui/button';
	import { createEventDispatcher } from 'svelte';
	import { isValideFile } from '../util/FileUtil';
	import Snackbar, { Label } from '@smui/snackbar';

	const dispatch = createEventDispatcher();

	let snackBar: Snackbar;

	const openFilePicker = () => {
		let input = document.createElement('input');
		input.type = 'file';
		input.onchange = () => {
			let files = Array.from(input.files);
			if (files.length >= 1) {
				validateFile(files.pop());
			}
		};
		input.click();
	};

	const validateFile = (file: File) => {
		if (isValideFile(file)) {
			dispatch('valide', { file });
			return;
		}
		dispatch('invalide');
		snackBar.open();
	};
</script>

<Button variant="raised" on:click={openFilePicker}>
	<Icon class="material-icons">attach_file</Icon>
	<Label>Datei wählen</Label>
</Button>

<Snackbar bind:this={snackBar}>
	<Label>Ausgewählte Datei ist nicht valide!</Label>
</Snackbar>
