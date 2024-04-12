<script>
	// @ts-ignore
	import Sidebar from '$lib/sidebar.svelte';
</script>

<div class="d-flex">
	<Sidebar />
	<div class="content">
		<slot />
	</div>
</div>

<style>
	.content {
	  flex-grow: 1;
	  padding: 20px; /* Adjust padding as needed */
	}
  </style>
