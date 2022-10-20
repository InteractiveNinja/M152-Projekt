{#if import.meta.env.VITE_BUILD_NR}
	<div class="footer">Build: {import.meta.env.VITE_BUILD_NR}</div>
{/if}

<style lang="scss">
	@use '@material/typography/index' as typography;

	.footer {
		@include typography.typography('caption');
	}
</style>
