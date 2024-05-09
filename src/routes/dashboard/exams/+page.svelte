<script>
	import { onMount } from 'svelte';
	import { Modals, closeModal, openModal, modals } from 'svelte-modals';
	import { fade } from 'svelte/transition';
	import Modal from '$lib/Modal.svelte';

	let Exams = generateMockData(); // Initialize with mock data

	// Function to generate mock data
	function generateMockData() {
		return Array.from({ length: 100 }, (_, index) => ({
			examType: `Exam Type ${index + 1}`,
			examID: `ExamId00${index + 1}`
		}));
	}

	function handleOpen() {
		openModal(Modal, {
			title: `Alert #${$modals.length + 1}`,
			message: 'This is an alert',
			onOpenAnother: () => {
				handleOpen();
			}
		});
	}
</script>

<div class="page">
	<div class="card">
		<div class="card-header">Exams</div>
		<div class="card-body">
			<table class="table">
				<thead>
					<tr>
						<th scope="col">Exam Type</th>
						<th scope="col">Exam ID</th>
					</tr>
				</thead>
				<tbody>
					{#each Exams as exam, index}
						<tr on:click={handleOpen}>
							<td>{exam.examType}</td>
							<td>{exam.examID}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<Modals>
	<div slot="backdrop" class="backdrop" transition:fade on:click={closeModal} />
</Modals>

<style>
	.card {
		margin: 20px;
		font-family: 'Reddit Mono', monospace;
		font-weight: 400;
		color: black;
		border: 1px solid black;
		border-radius: 8px;
	}

	.card-header {
		border: 1px solid black;
		padding: 10px;
		font-weight: 700;
	}

	.card-body {
		border: 1px solid black;
		padding: 20px;
	}

	.table {
		width: 100%;
		margin-bottom: 1rem;
		color: #212529;
	}

	.table th,
	.table td {
		padding: 0.75rem;
		vertical-align: top;
		border-top: 1px solid #dee2e6;
	}

	.table thead th {
		vertical-align: bottom;
		border-bottom: 2px solid #dee2e6;
	}

	.table tbody + tbody {
		border-top: 2px solid #dee2e6;
	}

	.table .table {
		background-color: #fff;
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
