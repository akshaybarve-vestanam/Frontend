<script>
	// @ts-ignore
	import { onMount } from 'svelte';
	import { auth_base_url } from '../stores/constants';
	import { closeModal } from 'svelte-modals';

    export let title;
    export let message;
	export let data = {
        name: '',
        city: '',
        country: '',
        division: ''
    };

	// Handle form submission
	async function handleSubmit(event) {
		event.preventDefault();

		if (data.name && data.city && data.country) {
			const res = await fetch($auth_base_url+`/companies/register`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			const jsonRes = await res.json();
			if (jsonRes.s) {
				alert('Company information saved successfully');
			} else {
				alert('An error occurred: ' + jsonRes.m);
			}
		} else {
			alert('Please fill in all required fields');
		}

		closeModal();
	}
</script>

<div class="modal-container">
	<div class="modal-content">
		<div class="modal-header">
			<h2>Add Company</h2>
			
			<button class="close-btn" on:click={closeModal}>&times;</button>
		</div>
		<div class="modal-body">
			<form on:submit={handleSubmit}>
				<div class="form-group">
					<label for="name">Name</label>
					<input type="text" id="name" class="form-control" bind:value={data.name} />
				</div>
				<div class="form-group">
					<label for="city">City</label>
					<input type="text" id="city" class="form-control" bind:value={data.city} />
				</div>
				<div class="form-group">
					<label for="country">Country</label>
					<input type="text" id="country" class="form-control" bind:value={data.country} />
				</div>
				<div class="form-group">
					<label for="division">Division</label>
					<input type="text" id="division" class="form-control" bind:value={data.division} />
				</div>
				<button type="submit" class="btn btn-primary">Submit</button>
			</form>
		</div>
	</div>
</div>

<style>
	.modal-container {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80%;
		max-width: 600px;
		background: white;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		z-index: 1000;
	}

	.modal-content {
		padding: 20px;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #302b63;
		color: white;
		padding: 10px;
		border-bottom: 1px solid #ccc;
	}

	.modal-header h2 {
		margin: 0;
	}

	.modal-body {
		padding: 20px;
	}

	.form-group {
		margin-bottom: 15px;
	}

	.form-group label {
		display: block;
		margin-bottom: 5px;
	}

	.form-group input {
		width: 100%;
		padding: 8px;
		box-sizing: border-box;
	}

	.close-btn {
		background: none;
		border: none;
		color: white;
		font-size: 1.5rem;
		cursor: pointer;
	}

	.btn-primary {
		background-color: #007bff;
		color: white;
		border: none;
		padding: 10px 20px;
		cursor: pointer;
	}
</style>
