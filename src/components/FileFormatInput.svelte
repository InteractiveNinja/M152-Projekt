<script lang="ts">
	import Select, { Option } from '@smui/select';
	import Icon from '@smui/select/icon';

	import { FileTypes } from '../types/FileTypes';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const fileFormatChoosen = (format: string) => {
		dispatch('fileformat', {
			format
		});
	};
</script>

<div>
	<Select
		required
		label="Zielformat"
		on:MDCSelect:change={(e) => fileFormatChoosen(e.detail.value)}
	>
		<Icon class="material-icons" slot="leadingIcon">file_present</Icon>
		{#each Object.entries(FileTypes) as [key, value]}
			<Option {value}>{key}</Option>
		{/each}
	</Select>
</div>
