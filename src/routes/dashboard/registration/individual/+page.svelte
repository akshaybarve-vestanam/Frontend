<script>
	import { onMount } from 'svelte';

	let testTypes = []; // For storing test types fetched from the server
	let labels = []; // For storing labels fetched from the server
	let selectedTestType = '';
	let fullName = '';
	let mobileNumber = '+91'; // Default country code for India
	let email = '';
	let selectedLabels = [];
	let testDateTime = '';

	// Simulate fetching test types from an API
	onMount(async () => {
		// Replace this URL with your actual API endpoint
		const testTypesResponse = await fetch('https://api.example.com/test-types');
		testTypes = await testTypesResponse.json();

		// Simulate fetching labels from an API
		const labelsResponse = await fetch('https://api.example.com/labels');
		labels = await labelsResponse.json();
	});

	// Function to handle label selection and creation logic
	function handleLabelSelectOrCreate(label) {
		// Implement logic to select or create a label
	}
</script>
<div class="card">
	<div class="card-header">Individual Registration</div>
	<div class="card-body">
		<form>
			<div class="row">
				<div class="col-md-6 mb-3">
					<label for="testType" class="form-label">
						<i class="bi bi-list-check"></i> Test Type
					</label>
					<select class="form-select" id="testType" bind:value={selectedTestType}>
						{#each testTypes as testType}
							<option value={testType}>{testType}</option>
						{/each}
					</select>
				</div>
				<div class="col-md-6 mb-3">
					<label for="fullName" class="form-label">
						<i class="bi bi-person-fill"></i> Full Name
					</label>
					<input type="text" class="form-control" id="fullName" bind:value={fullName} />
				</div>
				<div class="col-md-6 mb-3">
					<label for="mobileNumber" class="form-label">
						<i class="bi bi-telephone-fill"></i> Mobile Number
					</label>
					<input type="tel" class="form-control" id="mobileNumber" bind:value={mobileNumber} />
				</div>
				<div class="col-md-6 mb-3">
					<label for="email" class="form-label">
						<i class="bi bi-envelope-fill"></i> Email ID
					</label>
					<input type="email" class="form-control" id="email" bind:value={email} />
				</div>
				<div class="col-md-6 mb-3">
					<label for="labels" class="form-label">
						<i class="bi bi-tags-fill"></i> Label
					</label>
					<!-- Placeholder for multi-select labels component -->
					<!-- Consider using a library like Select2 or a custom component for multi-select with creation on the fly -->
				</div>
				<div class="col-md-6 mb-3">
					<label for="testDateTime" class="form-label">
						<i class="bi bi-calendar-event-fill"></i> Date and Time of Test
					</label>
					<input
						type="datetime-local"
						class="form-control"
						id="testDateTime"
						bind:value={testDateTime}
					/>
				</div>
			</div>
			<button type="submit" class="btn btn-primary">
				<i class="bi bi-cursor-fill"></i> Submit
			</button>
		</form>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Reddit+Mono:wght@200..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
    .card {
      margin: 20px;
      font-family: 'Reddit Mono', monospace;
      font-weight: 400;
      color: black;
      border: 1px solid black;
      /*width : 50%;*/
      border-radius: 8px;
    }
    .card-header {
        border: 1px solid black;
        padding: 10px; /* Optional: Add padding to the header */
		text-align:left;
		font-weight: 700;
    }

    .card-body {
        border: 1px solid black;
        padding: 20px; /* Optional: Add padding to the body */
    }
</style>