

<script>
    // @ts-nocheck

    import { onMount } from 'svelte';
    import { Modals, closeModal, openModal, modals } from 'svelte-modals';
    import { fade } from 'svelte/transition';
    import Modal from '$lib/Modal.svelte';
    import Candidatemodal from '$lib/candidatemodal.svelte';
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
    const recordsPerPage = 5;

    onMount(async () => {
        await fetchCandidates();
        await fetchLabels();
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
            candidates = data.map((candidate) => ({
                id: candidate._id,
                candidateId: candidate.candidateId,
                name: candidate.fullName,
                testType: candidate.selectedTestType.join(', '),
                dateOfTest: new Date(candidate.testDateTime).toLocaleDateString(),
                emailId: candidate.email,
                phoneNumber: candidate.phoneNumber,
                status: 'Registered',
                createdAt: new Date(candidate.createdAt).toISOString().split('T')[0]
            }));
            filteredCandidates = candidates;
            filteredCandidates.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            updateDisplayedCandidates();
        } catch (error) {
            console.error('Error fetching candidates:', error);
        }
    }

    async function fetchLabels() {
        try {
            const response = await fetch($auth_base_url + `labels`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await response.json();
            labels = data.d.map(label => label.name); // Adjust to the response structure
        } catch (error) {
            console.error('Error fetching labels:', error);
        }
    }

    async function searchCandidates() {
    const lowerCaseSearchText = searchText.toLowerCase();
    let query = `candidate?q=${lowerCaseSearchText}`;

    if (startDate) {
        query += `&startDate=${new Date(startDate).toISOString().split('T')[0]}`;
    }
    if (endDate) {
        query += `&endDate=${new Date(endDate).toISOString().split('T')[0]}`;
    }
    if (selectedLabels.length > 0) {
        query += `&label=${selectedLabels.join(',')}`;  // Join labels into a comma-separated string
    }

    try {
        const response = await fetch($auth_base_url + `${query}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        });
        const data = await response.json();
        candidates = data.map((candidate) => ({
            id: candidate._id,
            candidateId: candidate.candidateId,
            name: candidate.fullName,
            testType: candidate.selectedTestType.join(', '),
            dateOfTest: new Date(candidate.testDateTime).toLocaleDateString(),
            emailId: candidate.email,
            phoneNumber: candidate.phoneNumber,
            status: 'Registered',
            createdAt: new Date(candidate.createdAt).toISOString().split('T')[0]
        }));
        filterCandidates();
    } catch (error) {
        console.error('Error fetching candidates:', error);
    }
}


    function filterCandidates() {
        const lowerCaseSearchText = searchText.toLowerCase();
        filteredCandidates = candidates.filter((candidate) => {
            const isTextMatch =
                candidate.name.toLowerCase().includes(lowerCaseSearchText) ||
                candidate.emailId.toLowerCase().includes(lowerCaseSearchText) ||
                candidate.phoneNumber.includes(searchText);

            if (!startDate || !endDate) {
                return isTextMatch;
            }

            const candidateDate = new Date(candidate.createdAt);
            const start = new Date(startDate);
            const end = new Date(endDate);

            return isTextMatch && candidateDate >= start && candidateDate <= end;
        });

        if (selectedLabels.length > 0) {
            filteredCandidates = filteredCandidates.filter(candidate =>
                selectedLabels.every(label => candidate.labels.includes(label))
            );
        }

        totalPages = Math.ceil(filteredCandidates.length / recordsPerPage);
        currentPage = 1;
        updateDisplayedCandidates();
    }

    function updateDisplayedCandidates() {
        const startIndex = (currentPage - 1) * recordsPerPage;
        const endIndex = startIndex + recordsPerPage;
        displayedCandidates = filteredCandidates.slice(startIndex, endIndex);
    }

    // Pagination functions
    function changePage(page) {
        currentPage = page;
        updateDisplayedCandidates();
    }

    function nextPage(event) {
        event.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            updateDisplayedCandidates();
        }
    }

    function prevPage(event) {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            updateDisplayedCandidates();
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

    $: totalPages = Math.ceil(filteredCandidates.length / recordsPerPage);

    // Get candidates for the current page
    $: displayedCandidates = filteredCandidates.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
    );

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
        selectedLabels = selectedLabels.filter(l => l !== label);
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

	<table class="table">
		<thead>
			<tr>
				<th><input type="checkbox" on:click={toggleSelectAll} /></th>
				<th>Sr No</th>
				<th>Candidate id</th>
				<th>Name</th>
				<th>Test Type</th>
				<th>Date of Registration</th>
				<th>Email id</th>
				<th>Phone number</th>
				<th>Status</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each displayedCandidates as candidate, index (candidate.candidateId)}
				<tr>
					<td
						><input
							type="checkbox"
							checked={selectedRows.has(candidate.candidateId)}
							on:change={() => toggleSelection(candidate.candidateId)}
						/></td
					>
					<td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
					<td>{candidate.candidateId}</td>
					<td>{candidate.name}</td>
					<td>{candidate.testType}</td>
					<td>{candidate.createdAt}</td>
					<td>{candidate.emailId}</td>
					<td>{candidate.phoneNumber}</td>
					<td>{candidate.status}</td>
					<td>
						<i class="bi bi-envelope-fill" on:click={openMail}></i>
						<i class="bi bi-download" on:click={downloadFile}></i>
						<i class="bi bi-three-dots" on:click={() => editContent(candidate)}></i>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<Modals>
		<div slot="backdrop" class="backdrop" transition:fade on:click={closeModal} />
	</Modals>

	<div class="d-flex justify-content-between">
		<div style="position: absolute; top: 30px; right: 30px;">
			<button class="btn btn-primary" on:click={exportCandidates}>Export Reports</button>
		</div>
		<ul class="pagination">
			<li class="page-item {currentPage === 1 ? 'disabled' : ''}">
				<a class="page-link" href="#" on:click|preventDefault={prevPage}>Previous</a>
			</li>
			{#each Array(totalPages) as _, pageIndex}
				<li class="page-item {currentPage === pageIndex + 1 ? 'active' : ''}">
					<a class="page-link" href="#" on:click|preventDefault={() => changePage(pageIndex + 1)}
						>{pageIndex + 1}</a
					>
				</li>
			{/each}
			<li class="page-item {currentPage === totalPages ? 'disabled' : ''}">
				<a class="page-link" href="#" on:click|preventDefault={nextPage}>Next</a>
			</li>
		</ul>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Reddit+Mono:wght@200..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

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
