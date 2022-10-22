<script lang="ts">
	export let text = 'Wird geladen';
	import CircularProgress from '@smui/circular-progress';
</script>

<div class="d-flex flex-column align-items-center">
	<CircularProgress style="height: 32px; width: 32px;" indeterminate />
	<div class="spinner-text">{text}</div>
</div>

<style lang="scss">
	@use '@material/typography/index' as typography;

	.spinner-text {
		@include typography.typography('overline');
	}
</style>
