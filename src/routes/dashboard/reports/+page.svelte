<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import { Modals, closeModal, openModal, modals } from 'svelte-modals';
	import { fade } from 'svelte/transition';
	import Modal from '$lib/Modal.svelte';
	import Candidatemodal from '$lib/candidatemodal.svelte';
	import Tags from 'svelte-tags-input';
	import Grid from 'gridjs-svelte';
	import { h, PluginPosition } from 'gridjs';
	import { auth_base_url } from '../../../stores/constants';

	let candidates = [];
	let filteredCandidates = [];
	let selectedRows = new Set();
	let labels = [];
	let selectedLabel = '';
	let searchText = '';
	let createdAt = '';
	let startDate = '';
	let endDate = '';
	let currentPage = 1;
	let limit = 5;
	let grid;
	let tags = [];
	let tempSuggestions = [];

	const columns = [
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
			name: 'Email',
			sort: false
		},
		{
			name: 'Test Type',
			sort: false
		},
		{
			name: 'Date of Test',
			sort: false,
			formatter: (cell, row) => {
				return cell ? new Date(cell).toLocaleDateString('en-GB') : '-';
			}
		},
		{
			name: 'Phone No.',
			sort: false
		},
		{
			name: 'Status',
			sort: false
		},
		{
			name: 'Label',
			sort: false
		},
		{
			name: 'Created At',
			sort: false,
			formatter: (cell, row) => {
				return new Date(cell).toLocaleDateString('en-GB');
			}
		},
		{
			name: 'Action',
			formatter: (cell, row) => {
				return h('div', { className: 'button-container' }, [
					// Wrap buttons in a div
					h(
						'button',
						{
							className: 'edit-button',
							onClick: () => {
								// Handle edit action
								console.log(`Editing row data:`, row.cells[0].data, row.cells[1].data);
							}
						},
						'Edit'
					),
					h(
						'button',
						{
							className: 'delete-button',
							onClick: () => {
								// Handle delete action
								console.log(`Deleting row data:`, row.cells[0].data, row.cells[1].data);
							}
						},
						'Download'
					),
					h(
						'button',
						{
							className: 'delete-button',
							onClick: () => {
								// Handle delete action
								console.log(`Deleting row data:`, row.cells[0].data, row.cells[1].data);
							}
						},
						'Email'
					)
				]);
			}
		}
	];

	onMount(async () => {
		// await fetchCandidates();
		// await fetchLabels();
	});

	let input = '';
	let suggestions = [];

	const fetchSuggestions = async (query) => {
		// Replace this with your actual API call
		const response = await fetch($auth_base_url + `labels?q=${query}`, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'content-type': 'application/json'
			}
		});
		if (response.ok) {
			const data = await response.json();
			let temp = [];
			for (let index = 0; index < data.d.length; index++) {
				const element = data.d[index];
				temp.push(element.name);
			}
			tempSuggestions = temp;
			return temp;
		} else {
			console.error('Failed to fetch suggestions');
			return [];
		}
	};

	async function tagAdded(newTag) {
		tempSuggestions = [];
	}

	// async function validator(tag) {
	// 	console.log('tag', tag);
	//     return
	//     if(tempSuggestions.includes(tag)){
	//         return true;
	//     }
	// }

	async function searchCandidates() {
		console.log(startDate, endDate, selectedLabels, searchText);
		if ((startDate && endDate) || selectedLabels || searchText) {
			selectedLabel = selectedLabels.join();
			grid
				.updateConfig({
					server: {
						url:
							$auth_base_url +
							`candidate?startDate=${startDate}&endDate=${endDate}&labels=${tags}&search=${searchText}`,
						credentials: 'include',
						then: (data) =>
							data.d.map((c) => {
								return [
									c.candidateId,
									c.fullName,
									c.email,
									c.selectedTestType,
									c.testDateTime,
									c.phoneNumber,
									'Registered',
									c.selectedLabels,
									c.createdAt
								];
							}),
						total: (data) => data.count
					}
				})
				.forceRender();
		}
	}

	// Functions for handling user actions
	function toggleSelection(rowId) {
		selectedRows.has(rowId) ? selectedRows.delete(rowId) : selectedRows.add(rowId);
	}

	function toggleSelectAll(event) {
		if (event.target.checked) {
			candidates.forEach((candidate) => selectedRows.add(candidate.id));
		} else {
			selectedRows.clear();
		}
	}

	function exportCandidates() {
		// Implement export functionality
	}

	let selectedLabels = [];

	function isSelected(label) {
		return selectedLabel.includes(label);
	}

	function openMail() {
		alert('Mail icon clicked');
	}

	function downloadFile() {
		alert('Download icon clicked');
	}

	function editContent(candidate) {
		openModal(Candidatemodal, {
			title: `Edit Candidate`,
			message: ``,
			data: candidate
		});
	}

	function handleOpen() {
		openModal(Modal, {
			title: `Send Mail #${$modals.length + 1}`,
			message: 'This is an alert',
			onOpenAnother: () => {
				handleOpen();
			}
		});
	}

	function sendMail(option) {
		switch (option) {
			case 'registration':
				// Logic to send registration email
				break;
			case 'instructions':
				// Logic to send instructions email
				break;
			case 'reports':
				// Logic to send reports email
				break;
			default:
				break;
		}
		closeModal(); // Close the modal after sending the email
	}
</script>

<div class="container mt-4">
	<h2>Candidates</h2>
	<div class="mb-3 row">
		<div class="col">
			<input type="date" class="form-control" bind:value={startDate} placeholder="Start Date" />
		</div>
		<div class="col">
			<input type="date" class="form-control" bind:value={endDate} placeholder="End Date" />
		</div>

		<div class="labels col">
			<Tags
				class="form-control"
				bind:tags
				autoComplete={fetchSuggestions}
				placeholder={'Enter Min 3 Characters'}
				minChars={3}
				autoCompleteKey={'name'}
				autoCompleteShowKey={'alpha3Code'}
				onlyUnique={true}
				onTagAdded={tagAdded}
				customValidation={(tag) => (tempSuggestions.includes(tag) ? true : false)}
			/>
		</div>

		<div class="col">
			<input
				type="text"
				class="form-control"
				placeholder="Search by Name or Email"
				bind:value={searchText}
			/>
		</div>

		<div class="col">
			<button class="btn btn-primary" on:click={searchCandidates}>Search</button>
		</div>
	</div>

	<Grid
		
		bind:instance={grid}
		{columns}
		pagination={{
			limit: limit,
			server: {
				url: (prev, page, limit) => {
					return prev.includes('order') || prev.includes('search') || prev.includes('labels')
						? `${prev}&limit=${limit}&offset=${page * limit}`
						: `${prev}?limit=${limit}&offset=${page * limit}`;
				}
			}
		}}
		server={{
			url: $auth_base_url + 'candidate',
			credentials: 'include',
			then: (data) =>
				data.d.map((c) => {
					return [
						c.candidateId,
						c.fullName,
						c.email,
						c.selectedTestType,
						c.testDateTime,
						c.phoneNumber,
						'Registered',
						c.selectedLabels,
						c.createdAt
					];
				}),
			total: (data) => data.count
		}}
		sort={{
			multiColumn: true,
			server: {
				url: (prev, columns) => {
					if (!columns.length) return prev;
					const col = columns[0];
					const dir = col.direction === 1 ? 'asc' : 'desc';
					let colName = ['id', 'name', 'email'][col.index];

					return prev.includes('limit') || prev.includes('search') || prev.includes('labels')
						? `${prev}&order=${colName}&dir=${dir}`
						: `${prev}?order=${colName}&dir=${dir}`;
				}
			}
		}}
		autoWidth={true}
	/>

	<Modals>
		<div slot="backdrop" class="backdrop" transition:fade on:click={closeModal} />
	</Modals>

	<div class="d-flex justify-content-between">
		<div style="position: absolute; top: 30px; right: 30px;">
			<button class="btn btn-primary" on:click={exportCandidates}>Export Reports</button>
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Reddit+Mono:wght@200..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
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
</style>
