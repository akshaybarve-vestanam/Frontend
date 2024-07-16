<script>
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	import { closeModal } from 'svelte-modals';
	import { debounce } from 'lodash-es';
	import { auth_base_url } from '../stores/constants';

	export let user = {
		userId: '',
		fullName: '',
		email: '',
		mobileNumber: '',
		companies: ''
	};

	const dispatch = createEventDispatcher();
	let companies = [];
	let filteredCompanies = [];

	onMount(async () => {
		await fetchCompanies();
	});

	async function fetchCompanies() {
		const response = await fetch($auth_base_url + 'companies', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'content-type': 'application/json'
			}
		});

		if (response.ok) {
			const result = await response.json();
			companies = result.d;
		} else {
			console.error('Failed to fetch companies');
		}
	}

	function filterCompanies(input) {
		if (input.trim() === '') {
			filteredCompanies = [];
		} else {
			filteredCompanies = companies.filter((company) =>
				company.name.toLowerCase().includes(input.toLowerCase())
			);
		}
	}

	const debouncedFilter = debounce(filterCompanies, 300);

	async function editUser(event) {
		event.preventDefault();

		const { userId, fullName, email, mobileNumber, companies } = user;

		if (userId || fullName || email || mobileNumber || companies) {
			const res = await fetch($auth_base_url + 'users/edit', {
				method: 'PUT',
				credentials: 'include',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					userId,
					fullName,
					email,
					mobileNumber,
					companies
				})
			});

			const jsonRes = await res.json();
			if (jsonRes.s) {
				window.alert('User information updated successfully');
				dispatch('save', { user: jsonRes.user });
			} else {
				window.alert('An error occurred: ' + jsonRes.m);
			}
		} else {
			window.alert('Please provide the user ID and at least one field to update');
		}

		closeModal();
	}

	function cancel() {
		dispatch('cancel');
		closeModal();
	}
</script>

<div class="card">
	<div class="modal-header">
		<h2>Edit User</h2>
		<button class="close-btn" on:click={closeModal}>&times;</button>
	</div>
	<div class="card-body">
		<form on:submit|preventDefault={editUser}>
			<div class="row">
				<div class="col-md-6 mb-3">
					<label for="userId" class="form-label">User ID</label>
					<input type="text" class="form-control" id="userId" bind:value={user.userId} disabled />
				</div>
				<div class="col-md-6 mb-3">
					<label for="fullName" class="form-label">Full Name</label>
					<input type="text" class="form-control" id="fullName" bind:value={user.fullName} />
				</div>
				<div class="col-md-6 mb-3">
					<label for="email" class="form-label">Email</label>
					<input type="email" class="form-control" id="email" bind:value={user.email} />
				</div>
				<div class="col-md-6 mb-3">
					<label for="mobileNumber" class="form-label">Mobile Number</label>
					<input
						type="text"
						class="form-control"
						id="mobileNumber"
						bind:value={user.mobileNumber}
					/>
				</div>
				<div class="col-md-6 mb-3">
					<label for="companies" class="form-label">Company</label>
					<input
						type="text"
						class="form-control"
						id="companies"
						on:input={(e) => debouncedFilter(e.target.value)}
						bind:value={user.companies}
						placeholder="Search your company"
					/>
					<ul class="suggestions">
						{#if filteredCompanies.length > 0}
							{#each filteredCompanies as company}
								<li
									on:click={() => {
										user.companies = company.name;
										filteredCompanies = [];
									}}
								>
									{company.name}
								</li>
							{/each}
						{/if}
					</ul>
				</div>
			</div>
			<button type="submit" class="btn btn-primary">Save</button>
			<button type="button" class="btn btn-secondary" on:click={cancel}>Cancel</button>
		</form>
	</div>
</div>

<style>
	.card {
		margin: 20px auto;
		font-family: 'Reddit Mono', monospace;
		font-weight: 400;
		color: black;
		border: 1.5px solid black;
		border-radius: 8px;
		position: absolute;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		width: 50%;
	}
	.modal-header {
		background-color: #302b63;
		color: white;
		padding: 10px;
		border: 1.5px solid black;
		border-radius: 8px 8px 0 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.modal-header h2 {
		margin: 0;
	}
	.modal-header .close-btn {
		background: none;
		border: none;
		font-size: 24px;
		cursor: pointer;
		color: white;
	}
	.card-body {
		padding: 20px;
	}
	.form-label {
		display: block;
		margin-bottom: 5px;
	}
	.form-control {
		width: 100%;
		padding: 8px;
		box-sizing: border-box;
	}
	.row {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	.col-md-6 {
		flex: 0 0 calc(50% - 10px);
	}
	.mb-3 {
		margin-bottom: 15px;
	}
	.btn {
		padding: 10px 20px;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}
	.btn-primary {
		background-color: #007bff;
		color: white;
	}
	.btn-secondary {
		background-color: #6c757d;
		color: white;
		margin-left: 10px;
	}
	.suggestions {
		list-style-type: none;
		padding: 0;
		margin: 0;
		border: 1px solid #ccc;
		max-height: 150px;
		overflow-y: auto;
	}
	.suggestions li {
		padding: 8px;
		cursor: pointer;
	}
	.suggestions li:hover {
		background-color: #f0f0f0;
	}
</style>
