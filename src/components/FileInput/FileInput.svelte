<script lang="ts">
	import Button, { Icon } from '@smui/button';
	import { createEventDispatcher } from 'svelte';
	import { isFilesizeAccepted, isValideFile } from '../../util/FileUtil';
	import Snackbar, { Label } from '@smui/snackbar';
	import './file-input.scss';

	const dispatch = createEventDispatcher();

	let snackBar: Snackbar;
	let snackbarText = 'Ausgewählte Datei ist nicht valide!';
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
		if (isValideFile(file) && isFilesizeAccepted(file)) {
			dispatch('valide', { file });
			return;
		}
		if (!isFilesizeAccepted(file)) {
			snackbarText = 'Die Datei ist zu gross!';
		}
		if (!isValideFile(file)) {
			snackbarText = 'Das Dateiformat der gewählten Datei wird nicht unterstützt!';
		}
		dispatch('invalide');
		snackBar.open();
	};
</script>

<div class="d-flex flex-column">
	<Button variant="raised" on:click={openFilePicker}>
		<Icon class="material-icons">attach_file</Icon>
		<Label>Datei wählen</Label>
	</Button>
	<p class="text-secondary text-center">Maximale Dateingrösse: 2G</p>
</div>
<Snackbar class="error-snackbar" leading bind:this={snackBar}>
	<Label>{snackbarText}</Label>
</Snackbar>
