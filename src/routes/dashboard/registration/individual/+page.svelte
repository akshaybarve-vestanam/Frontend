<script>
	// @ts-nocheck
	import { base_url } from '../../../../stores/constants';
	import { onMount } from 'svelte';
	import { auth_base_url } from '../../../../stores/constants';
	import Select from 'svelte-select';
	let testDateTime = '';
	let testTypes = ['Student', 'Professional', 'Operator', 'Fresher', 'Intern'];
	let labels = [];
	let selectedTestType = '';
	let fullName = '';
	let phoneNumber = '+91';
	let email = '';
	let selectedLabels = [];
	let tagInput = '';
	let candidateid = '';
	let errors = {
		testType: false,
		fullName: false,
		email: false
	};

	import { getNotificationsContext } from 'svelte-notifications';
	const { addNotification } = getNotificationsContext();

	// Simulate fetching test types from an API
	onMount(async () => {
		// try {
		// 	const labelsResponse = await fetch($auth_base_url + 'labels', {
		// 		method: 'GET',
		// 		credentials: 'include',
		// 		headers: {
		// 			'content-type': 'application/json'
		// 		}
		// 	});
		// 	labels = await labelsResponse.json();
		// } catch (d) {
		// 	console.error('Error fetching labels:', d);
		// }
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

	async function createNewLabel(label) {
		try {
			const response = await fetch($auth_base_url + `labels`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name: label })
			});
			if (response.ok) {
				const newLabel = await response.json();
				return newLabel.d.name; // Assuming the API returns the created label
			} else {
				console.error('Error creating new label');
				return null;
			}
		} catch (error) {
			console.error('Error creating new label:', error);
			return null;
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
	
	/*async function registerCandidate(event) {
		event.preventDefault();
		//const fullName = '';
		//const email = '';
		console.log(fullName);
		console.log(selectedTestType);
		console.log('phoneNumber', phoneNumber);
		console.log(candidateid);
		if (selectedTestType && fullName && email) {
			const res = await fetch($auth_base_url + 'candidate/register/individual', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					candidateid,
					selectedTestType,
					fullName,
					email,
					phoneNumber,
					selectedLabels,
					testDateTime
				})
			});

			const jsonRes = await res.json();
			if (jsonRes.m) {
				console.log(jsonRes.m);
				addNotification({
					text: jsonRes.m,
					position: 'top-center',
					type: 'success',
					removeAfter: 3000
				});
			} else {
				console.log(jsonRes.m);
			}

			selectedTestType = '';
			fullName = '';
			phoneNumber = '+91';
			email = '';
			selectedLabels = [];
			testDateTime = '';
			tags = [];
		} else {
			console.log('Please fill in all the required fields');
			window.alert('Please fill in all the required fields');
		}
	}*/

	async function registerCandidate(event) {
		event.preventDefault();

		errors.testType = !selectedTestType;
		errors.fullName = !fullName;
		errors.email = !email;

		if (!errors.testType && !errors.fullName && !errors.email) {
			const res = await fetch($auth_base_url + 'candidate/register/individual', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					candidateid,
					selectedTestType,
					fullName,
					email,
					phoneNumber,
					selectedLabels,
					testDateTime
				})
			});

			const jsonRes = await res.json();
			if (jsonRes.m) {
				addNotification({
					text: jsonRes.m,
					position: 'top-center',
					type: 'success',
					removeAfter: 3000
				});
			} else {
				console.log(jsonRes.m);
			}

			selectedTestType = '';
			fullName = '';
			phoneNumber = '+91';
			email = '';
			selectedLabels = [];
			testDateTime = '';
			tags = [];
		} else {
			addNotification({
				text: 'Please fill in all the required fields',
				position: 'top-center',
				type: 'error',
				removeAfter: 3000
			});
		}
	}
	function debounce(func, wait) {
		let timeout;
		return function (...args) {
			const context = this;
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(context, args), wait);
		};
	}
</script>

<div class="card">
	<div class="card-header">Individual Registration</div>
	<div class="card-body">
		<form on:submit={registerCandidate}>
			<div class="row">
				<div class="col-md-6 mb-3">
					<label for="testType" class="form-label">
						<i class="bi bi-list-check"></i> Test Type <span class="required">*</span>
					</label>
					<select class="form-select" id="testType" bind:value={selectedTestType} class:error={errors.testType}>
						{#each testTypes as testType}
							<option value={testType}>{testType}</option>
						{/each}
					</select>
				</div>
				<div class="col-md-6 mb-3">
					<label for="fullName" class="form-label">
						<i class="bi bi-person-fill"></i> Full Name <span class="required">*</span>
					</label>
					<input type="text" class="form-control" id="fullName" bind:value={fullName} class:error={errors.fullName}/>
				</div>
				<div class="col-md-6 mb-3">
					<label for="mobileNumber" class="form-label">
						<i class="bi bi-telephone-fill"></i> Mobile Number
					</label>
					<input type="tel" class="form-control" id="mobileNumber" bind:value={phoneNumber} />
				</div>
				<div class="col-md-6 mb-3">
					<label for="email" class="form-label">
						<i class="bi bi-envelope-fill"></i> Email ID <span class="required">*</span>
					</label>
					<input type="email" class="form-control" id="email" bind:value={email}  class:error={errors.email}/>
				</div>
				<div class="col-md-6 mb-3">
					<label for="labels" class="form-label">
						<i class="bi bi-tags-fill"></i> Labels
					</label>
					<div class="tag-container">
						{#each tags as tag}
							<div class="tag ">
								<span>{tag}</span>
								<span class="remove-tag" on:click={() => removeTag(tag)}>x</span>
							</div>
						{/each}
						<div class="tag-input">
							<input
								type="text"
								id="tag-input-field"
								bind:value={input}
								placeholder="Add a tag..."
								on:input={handleInput}
								on:keydown={handleKeydown}
								autocomplete="off"
							/>
							{#if suggestions.length > 0}
								<div class="suggestions">
									{#each suggestions as suggestion}
										<div class="suggestion" on:click={() => addTag(suggestion)}>
											{suggestion}
										</div>
									{/each}
								</div>
							{/if}
						</div>
					</div>
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
		<div class="mandatory-note">
			<span class="required">*</span> marked fields are mandatory 
		</div>
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
		text-align: left;
		font-weight: 700;
	}

	.card-body {
		border: 1px solid black;
		padding: 20px; /* Optional: Add padding to the body */
	}
	.tag-container {
		display: flex;
		flex-wrap: wrap;
		width: auto;
		padding: 3px;
		border: 1px solid #ccc;
		border-radius: 5px;
		background-color: #fff;
	}

	.tag {
		display: flex;
		align-items: center;
		padding: 5px;
		margin: 5px;
		background-color: #e0e0e0;
		border-radius: 3px;
	}

	.tag span {
		margin-right: 5px;
	}

	.remove-tag {
		cursor: pointer;
		color: #888;
		font-size: 12px;
		margin-left: 5px;
	}

	.tag-input {
		display: flex;
		flex-grow: 1;
		position: relative;
	}

	.tag-input input {
		border: none;
		outline: none;
		padding: 5px;
		font-size: 14px;
		flex-grow: 1;
	}

	.suggestions {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background-color: white;
		border: 1px solid #ccc;
		z-index: 1000;
		max-height: 200px;
		overflow-y: auto;
	}

	.suggestion {
		padding: 8px;
		cursor: pointer;
	}

	.suggestion:hover {
		background-color: #eee;
	}

	.required {
		color: red;
	}

	.mandatory-note {
		position:absolute;
		right: 20px;
		bottom: 20px;
		font-size: 14px;
	}
	.error {
		border-color: red !important;
		border-width: 2px !important;
	}
</style>
