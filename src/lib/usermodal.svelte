<script>
	// @ts-ignore
	import { onMount } from 'svelte';
	import { auth_base_url } from '../stores/constants';
	import { closeModal } from 'svelte-modals';

	export let title;
	export let message;
	export let data = {
		fullName: '',
		email: '',
		mobileNumber: '',
		companies: ''
	};

	async function handleSubmit(event) {
		event.preventDefault();

		if (data.fullName && data.email && data.mobileNumber) {
			const res = await fetch($auth_base_url + `/users/register`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			const jsonRes = await res.json();
			if (jsonRes.s) {
				alert('User information saved successfully');
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
			<h2>Add User</h2>
			<button class="close-btn" on:click={closeModal}>&times;</button>
		</div>
		<div class="modal-body">
			<form on:submit={handleSubmit}>
				<div class="form-group">
					<label for="fullName">Full Name</label>
					<input type="text" id="fullName" class="form-control" bind:value={data.fullName} />
				</div>
				<div class="form-group">
					<label for="email">Email</label>
					<input type="email" id="email" class="form-control" bind:value={data.email} />
				</div>
				<div class="form-group">
					<label for="mobileNumber">Mobile Number</label>
					<input type="text" id="mobileNumber" class="form-control" bind:value={data.mobileNumber} />
				</div>
				<div class="form-group">
					<label for="companies">Companies</label>
					<input type="text" id="companies" class="form-control" bind:value={data.companies} />
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
