<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { Modals, closeModal, openModal } from 'svelte-modals';
	import { fade } from 'svelte/transition';
	import Modal from '$lib/Modal.svelte';
	import UserModal from '$lib/usermodal.svelte';
	import UserEditModal from '$lib/userEditModal.svelte';
	import Grid from 'gridjs-svelte';
	import { h, PluginPosition } from 'gridjs';
	import { auth_base_url } from '../../../stores/constants';

	let users = [];
	let filteredUsers = [];
	let selectedRows = new Set();
	let searchText = '';
	let currentPage = 1;
	let limit = 5;
	let grid;
	let newUser = {
		fullName: '',
		email: '',
		mobileNumber: '',
		companies: ''
	};
	$: isSearchActive = searchText.length > 0;

	const columns = [
		{
			name: 'No',
			sort: false
		},
		{
			name: 'Id',
			sort: false
		},
		{
			name: 'Full Name',
			sort: false,
			width: '200px'
		},
		{
			name: 'Email',
			sort: false
		},
		{
			name: 'Mobile Number',
			sort: false
		},
		{
			name: 'Company',
			sort: false
		},
		{
			name: 'Action',
			formatter: (cell, row) => {
				return h('div', { className: 'button-container' }, [
					h(
						'button',
						{
							className: 'btn btn-transparent btn-sm me-1',
							onClick: () => {
								editUser(row);
							}
						},
						h('i', { className: 'bi bi-pencil-square text-dark' })
					)
				]);
			}
		}
	];

	onMount(async () => {
		await fetchUsers();
	});

	async function fetchUsers() {
		const response = await fetch($auth_base_url + `users`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'content-type': 'application/json'
			}
		});
		if (response.ok) {
			const data = await response.json();
			users = data.map(user => ({
            ...user,
            companies: user.company ? user.company.name : 'No Company' // Map the company name for display
        }));
			filteredUsers = data;
		} else {
			console.error('Failed to fetch users');
		}
	}

	async function searchUsers() {
	if (searchText) {
		grid
			.updateConfig({
				server: {
					url: $auth_base_url + `users?search=${searchText}`,
					credentials: 'include',
					then: (data) => {
						return data.d.map((u, index) => [
							index + 1,
							u.userId,
							u.fullName,
							u.email,
							u.mobileNumber,
							u.companies
						]);
					},
					total: (data) => data.count
				}
			})
			.forceRender();
	}
}

	function clearSearch() {
		searchText = '';
		filteredUsers = users;
		grid
			.updateConfig({
				server: {
					url: $auth_base_url + 'users',
					credentials: 'include',
					then: (data) => {
						return data.d.map((u, index) => [
							index + 1,
							u.userId,
							u.fullName,
							u.email,
							u.mobileNumber,
							u.companies
						]);
					},
					total: (data) => data.count
				}
			})
			.forceRender();
	}

	function addUser() {
		openModal(
			UserModal
		);
	}

	function editUser(row) {
    // const userToEdit = users.find(user => user.userId === userId);
	const userData = {
			userId: row.cells[1].data,
			fullName: row.cells[2].data,
			email: row.cells[3].data,
			mobileNumber: row.cells[4].data,
			companies: row.cells[5].data
		};
    openModal(UserEditModal,{
      title: 'Edit User',
	  user :userData

        })
	}
      
  
//   async function updateUser(updatedUser) {
//     const response = await fetch(auth_base_url + `users/${updatedUser.userId}`, {
//       method: 'PUT',
//       credentials: 'include',
//       headers: {
//         'content-type': 'application/json'
//       },
//       body: JSON.stringify(updatedUser)
//     });
//     if (response.ok) {
//       await fetchUsers();
//     } else {
//       console.error('Failed to update user');
//     }
//   }

	
// 	$: filteredUsers = users.filter(user =>
//         Object.values(user).some(value =>
//             value.toLowerCase().includes(searchText.toLowerCase())
//         )
//     );

//     $: filteredUsers = filteredUsers.slice((currentPage - 1) * limit, currentPage * limit);
</script>

<div class="container mt-4">
	<h2>User Management</h2>
	<div class="mb-3 row">
		<div class="col">
			<input
				type="text"
				class="form-control"
				placeholder="Search by Full Name, Email, or Mobile Number"
				bind:value={searchText}
				on:input={searchUsers}
			/>
		</div>
		<!-- <div class="col">
			<button class="btn btn-primary" on:click={searchUsers}>Search</button>
		</div> -->
		<div class="col">
			{#if isSearchActive}
				<button class="btn btn-primary gogo" on:click={clearSearch}>Clear Search</button>
			{/if}
		</div>
		<div class="col">
			<button class="btn btn-success soso" on:click={addUser}>Add User</button>
		</div>
	</div>

	<Grid
		bind:instance={grid}
		{columns}
		server={{
			url: $auth_base_url + 'users',
			credentials: 'include',
			then: (data) =>
				data.d.map((u, index) => {
					return [index + 1, u.userId, u.fullName, u.email, u.mobileNumber, u.companies];
				}),
			total: (data) => data.count
		}}
		pagination={{
			limit: limit,
			server: {
				url: (prev, page, limit) => 
					prev.includes('order') || prev.includes('search') || prev.includes('labels')
						? `${prev}&limit=${limit}&offset=${page * limit}`
						: `${prev}?limit=${limit}&offset=${page * limit}`
			}
		}}
		autoWidth={true}
	/>

	<Modals>
		<div slot="backdrop" class="backdrop" transition:fade on:click={closeModal} />
	</Modals>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900&family=Reddit+Mono:wght@200..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
	@import 'https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css';

	h2 {
		font-family: 'Reddit Mono', monospace;
		font-weight: 700;
	}

	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(7, 37, 236, 0.5);
	}

	.btn-transparent {
		background-color: transparent;
		border: none;
		padding: 5px 10px;
	}

	.btn-transparent .bi {
		font-size: 16px;
	}

	.button-container {
		display: flex;
		gap: 10px;
	}

	button {
		display: flex;
		align-items: center;
		gap: 5px;
		cursor: pointer;
	}

	button i {
		font-size: 16px;
	}

	.btn-success {
		margin-left: 15px;
	}

	.soso{
		margin-left: 270px;
	}
	.gogo{
		margin-right: 250px;
	}
</style>























