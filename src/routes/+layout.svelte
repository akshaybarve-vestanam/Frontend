<script>
	import { isLoading } from '../stores/loading';
	isLoading.set(true);
</script>

<slot />

{#if $isLoading}
	<div class="loader">Loading...</div>
{/if}

<style>
	.loader {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
		font-size: 2rem;
	}
</style>
