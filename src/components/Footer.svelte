{#if import.meta.env.VITE_BUILD_NR}
	<div class="footer">Build: {import.meta.env.VITE_BUILD_NR}</div>
{/if}

<style lang="scss">
	@use '@material/typography/index' as typography;

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		@include typography.typography('caption');
	}
</style>
