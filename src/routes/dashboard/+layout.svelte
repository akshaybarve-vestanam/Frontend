<script>
	// @ts-ignore
	import Sidebar from '$lib/sidebar.svelte';
	import { Modals, closeModal } from 'svelte-modals';
</script>

<div class="d-flex">
	<Sidebar />
	<div class="content">
		<slot />
	</div>
</div>

<Modals>
	<div slot="backdrop" class="backdrop" on:click={closeModal} />
</Modals>

<style>
	.content {
		flex-grow: 1;
		padding: 20px; /* Adjust padding as needed */
	}

	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
