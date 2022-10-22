<script lang="ts">
	import MediaQuery from 'svelte-media-query';
</script>

<MediaQuery query="(min-device-width : 320px) and (max-device-width : 480px)" let:matches>
	{#if matches}
		<slot name="mobile" />
	{:else}
		<slot name="desktop" />
	{/if}
</MediaQuery>

<style lang="scss">
</style>
