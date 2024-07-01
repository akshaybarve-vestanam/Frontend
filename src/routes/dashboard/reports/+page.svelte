<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import { Modals, closeModal, openModal, modals } from 'svelte-modals';
	import { fade } from 'svelte/transition';
	import Modal from '$lib/Modal.svelte';
	import Candidatemodal from '$lib/candidatemodal.svelte';
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

	const columns = [
		{
			name: 'Id',
			sort: false
		},
		{
			name: 'Name',
			sort: false
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
				return h(
					'button',
					{
						onClick: () => {
							alert(`Editing "${row.cells[0].data}" "${row.cells[1].data}"`);
						}
					},
					'Edit'
				);
			}
		}
	];

	onMount(async () => {
		// await fetchCandidates();
		// await fetchLabels();
	});

	let tags = [];
	let input = '';
	let suggestions = [];

	async function fetchSuggestions(query) {
		try {
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
				console.log('Fetched suggestions:', data.d); // Debug output
				for (let index = 0; index < data.d.length; index++) {
					const element = data.d[index];
					temp.push(element.name);
				}
				suggestions = temp;
			} else {
				console.error('Failed to fetch suggestions');
				suggestions = [];
			}
		} catch (error) {
			console.error('Error fetching suggestions:', error);
			suggestions = [];
		}
	}

	const debouncedFetchSuggestions = debounce(fetchSuggestions, 300);

	function handleInput(event) {
		input = event.target.value;
		if (input.length >= 1) {
			debouncedFetchSuggestions(input);
		} else {
			suggestions = [];
		}
	}

	function debounce(func, delay) {
		let timeout;
		return function (...args) {
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(this, args), delay);
		};
	}

	async function addTag(tag) {
		// Ensure tag is a string
		if (typeof tag !== 'string') {
			console.error('Tag is not a string:', tag);
			return;
		}

		tag = tag.trim();

		if (tag !== '' && !tags.includes(tag)) {
			if (!suggestions.includes(tag)) {
				tag = await createNewLabel(tag);
				if (!tag) return; // Do not add the tag if creation fails
			}
			tags = [...tags, tag];
			selectedLabels = [...selectedLabels, tag];
			input = '';
			suggestions = [];
		}
	}

	function removeTag(tag) {
		tags = tags.filter((t) => t !== tag);
		selectedLabels = selectedLabels.filter((t) => t !== tag);
	}

	function handleKeydown(event) {
		if (event.key === 'Enter') {
			addTag(input);
		}
	}

	async function fetchCandidates() {
		try {
			const response = await fetch($auth_base_url + `candidate`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'content-type': 'application/json'
				}
			});
			const data = await response.json();
			candidates = data.d.map((candidate) => [
				candidate.candidateId,
				candidate.fullName,
				candidate.email
			]);
			console.log(candidates);
			grid
				.updateConfig({
					data: candidates
				})
				.forceRender();
		} catch (error) {
			console.error('Error fetching candidates:', error);
		}
	}

	async function fetchLabels() {
		try {
			const response = await fetch($auth_base_url + `labels?q=`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'content-type': 'application/json'
				}
			});
			const data = await response.json();
			labels = data.d.map((label) => label.name); // Adjust to the response structure
		} catch (error) {
			console.error('Error fetching labels:', error);
		}
	}

	async function searchCandidates() {
		console.log(startDate, endDate, selectedLabels, searchText);
		if ((startDate && endDate) || selectedLabels || searchText) {
			selectedLabel = selectedLabels.join();
			grid
				.updateConfig({
					server: {
						url:
							$auth_base_url +
							`candidate?startDate=${startDate}&endDate=${endDate}&labels=${selectedLabel}&search=${searchText}`,
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

	// Function to handle label selection from suggestions
	function selectLabel(label) {
		selectedLabel = label;
	}

	// Function to clear selected label
	function clearSelectedLabel() {
		selectedLabel = '';
		searchCandidates();
	}

	// Function to handle search button click
	function handleSearch() {
		searchCandidates();
	}

	// Function to handle date filter change
	function handleDateFilterChange() {
		searchCandidates();
	}

	// Function to handle label tag removal
	function removeLabelTag(label) {
		selectedLabels = selectedLabels.filter((l) => l !== label);
		searchCandidates();
	}

	// Function to add selected label as a filter
	async function addSelectedLabel(label) {
		selectedLabels.push(label);
		searchCandidates();
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
			<input
				type="text"
				class="form-control"
				placeholder="Add label"
				bind:value={input}
				on:input={handleInput}
				on:keydown={handleKeydown}
			/>
			{#if suggestions.length > 0 && input.length >= 1}
				<div class="suggestion-box">
					{#each suggestions as suggestion}
						<div class="suggestion" on:click={() => addTag(suggestion)}>
							{suggestion}
						</div>
					{/each}
				</div>
			{/if}
			<div class="selected-labels">
				{#each selectedLabels as label}
					<span class="label">{label} <button on:click={() => removeTag(label)}>x</button></span>
				{/each}
			</div>
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
	.table {
		margin: 20px;
		font-family: 'Reddit Mono', monospace;
		font-weight: 400;
		color: black;
		border: 1px solid black;
		border-radius: 8px;
	}

	h2 {
		font-family: 'Reddit Mono', monospace;
		font-weight: 700;
	}

	.bi.bi-envelope-fill {
		cursor: pointer;
	}

	.bi.bi-download {
		cursor: pointer;
	}

	.bi.bi-three-dots {
		cursor: pointer;
	}

	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(7, 37, 236, 0.5);
	}

	.search-box {
		position: relative;
		width: 100%;
	}

	.search-box input {
		width: calc(100% - 30px);
		padding-right: 30px;
	}

	.pagination {
		display: flex;
		list-style: none;
		padding-left: 0;
	}

	.page-item {
		margin: 0 5px;
	}

	.page-item.disabled .page-link {
		pointer-events: none;
		color: #6c757d;
	}

	.page-item.active .page-link {
		background-color: #007bff;
		border-color: #007bff;
		color: white;
	}

	.page-link {
		display: block;
		padding: 0.5rem 0.75rem;
		color: #007bff;
		text-decoration: none;
		background-color: #fff;
		border: 1px solid #dee2e6;
		border-radius: 0.25rem;
	}

	.labels {
		position: relative;
		width: 100%;
	}

	.labels input {
		width: calc(100% - 30px);
		padding-right: 30px;
	}

	.suggestion-box {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background-color: white;
		border: 1px solid #ccc;
		border-radius: 4px;
		list-style: none;
		padding: 0;
		margin: 0;
		z-index: 1;
	}

	.suggestion {
		padding: 8px;
		cursor: pointer;
	}

	.suggestion:hover {
		background-color: #f0f0f0;
	}

	.selected-labels {
		margin-top: 10px;
	}

	.label {
		display: inline-block;
		background-color: #e0e0e0;
		border-radius: 4px;
		padding: 5px;
		margin: 5px;
	}

	.label button {
		border: none;
		background: none;
		cursor: pointer;
		margin-left: 5px;
	}
</style>
