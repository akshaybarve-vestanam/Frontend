<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { Modals, closeModal, openModal, modals } from 'svelte-modals';
	import { fade } from 'svelte/transition';
	import Modal from '$lib/Modal.svelte';
	import CompanyModal from '$lib/CompanyModal.svelte';
	import Grid from 'gridjs-svelte';
	import { h, PluginPosition } from 'gridjs';
	import { auth_base_url } from '../../../stores/constants';
	import EditCompanyModal from '$lib/EditCompanyModal.svelte';


	let companies = [];
	let filteredCompanies = [];
	let selectedRows = new Set();
	let searchText = '';
	let currentPage = 1;
	let limit = 5;
	let grid;
	let newCompany = {
		name: '',
		city: '',
		country: '',
		division: ''
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
			name: 'Name',
			sort: false,
			width: '200px'
		},
		{
			name: 'City',
			sort: false
		},
		{
			name: 'Country',
			sort: false
		},
		{
			name: 'Division',
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
							onclick: () => toggleEditMode(row)
							
						},
						h('i', { className: 'bi bi-pencil-square text-dark' })
					)
				]);
			}
		}
	];

	onMount(async () => {
		await fetchCompanies();
	});

	async function fetchCompanies() {
		const response = await fetch($auth_base_url + `companies`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'content-type': 'application/json'
			}
		});
		if (response.ok) {
			const data = await response.json();
			companies = data;
			filteredCompanies = data;
		} else {
			console.error('Failed to fetch companies');
		}
	}

	async function searchCompanies() {
		if (searchText) {
			// const urlSearchParams = new URLSearchParams();

			// urlSearchParams.append('search', searchText);

			// const url = $auth_base_url + `companies?&search=${searchText}`;

			grid
				.updateConfig({
					server: {
						url: $auth_base_url + `companies?search=${searchText}`,
						credentials: 'include',
						then: (data) => {
							return data.d.map((c, index) => [
								index + 1,
								c.companyId,
								c.name,
								c.city,
								c.country,
								c.division
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
		filteredCompanies = companies;
		grid
			.updateConfig({
				server: {
					url: $auth_base_url + 'companies',
					credentials: 'include',
					then: (data) => {
						return data.d.map((c, index) => [
							index + 1,
							c.companyId,
							c.name,
							c.city,
							c.country,
							c.division
						]);
					},
					total: (data) => data.count
				}
			})
			.forceRender();
	}

	function addCompany() {
		openModal(
			CompanyModal
			//, {
			// 	title: 'Add Company',
			// 	company: newCompany,
			// 	onSave: async (company) => {
			// 		const response = await fetch(auth_base_url + 'companies', {
			// 			method: 'POST',
			// 			credentials: 'include',
			// 			headers: {
			// 				'content-type': 'application/json'
			// 			},
			// 			body: JSON.stringify(company)
			// 		});
			// 		if (response.ok) {
			// 			await fetchCompanies();
			// 			closeModal();
			// 		} else {
			// 			console.error('Failed to add company');
			// 		}
			// 	}
			// }
		);
	}

	function toggleEditMode(row) {
        const companyData = {
            companyId: row.cells[1].data,
            name: row.cells[2].data,
            city: row.cells[3].data,
            country: row.cells[4].data,
            division: row.cells[5].data
        };

        openModal(EditCompanyModal, { company: companyData });
    }


</script>

<div class="container mt-4">
	<h2>Company Management</h2>
	<div class="mb-3 row">
		<div class="col">
			<input
				type="text"
				class="form-control"
				placeholder="Search by Name, City, or Country"
				bind:value={searchText}
				on:input={searchCompanies}
			/>
		</div>
		<!-- <div class="col">
			<button class="btn btn-primary" on:click={searchCompanies}>Search</button>
		</div> -->
		<div class="col">
			{#if isSearchActive}
				<button class="btn btn-primary gogo" on:click={clearSearch}>Clear Search</button>
			{/if}
		</div>
		<div class="col">
			<button class="btn btn-success soso" on:click={addCompany}>Add Company</button>
		</div>
	</div>

	<Grid
    bind:instance={grid}
    {columns}
    server={{
        url: $auth_base_url + 'companies',
        credentials: 'include',
        then: (data) =>
            data.d.map((c, index) => {
                return [index + 1, c.companyId, c.name, c.city, c.country, c.division];
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
		margin-left: 235px;
	}
	.gogo{
		margin-right: 250px;
	}
</style>
