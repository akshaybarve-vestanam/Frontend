<script>
	// @ts-nocheck
	import { base_url } from '../../../../stores/constants';
	import { onMount } from 'svelte';
	import { auth_base_url } from '../../../../stores/constants';
	import Select from 'svelte-select';
	import Tags from 'svelte-tags-input';
	let testDateTime = '';
	let testTypes = ['Student', 'Professional', 'Operator', 'Fresher', 'Intern'];
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
	let tempSuggestions = [];
	let tags = [];

	import { getNotificationsContext } from 'svelte-notifications';

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
			console.log('Fetched suggestions:', data.d); // Debug output
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

	const tagAdded = async (newTag) => {
		if (!tempSuggestions.includes(newTag)) {
			const response = await fetch($auth_base_url + `labels`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name: newTag })
			});
		}
		tempSuggestions = [];
	};
	const { addNotification } = getNotificationsContext();

	// Simulate fetching test types from an API
	onMount(async () => {});

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
					selectedLabels: tags,
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
                    <select
                        class="form-select"
                        id="testType"
                        bind:value={selectedTestType}
                        class:error={errors.testType}
                    >
                        {#each testTypes as testType}
                            <option value={testType}>{testType}</option>
                        {/each}
                    </select>
                </div>
                <div class="col-md-6 mb-3">
                    <label for="fullName" class="form-label">
                        <i class="bi bi-person-fill"></i> Full Name <span class="required">*</span>
                    </label>
                    <input
                        type="text"
                        class="form-control"
                        id="fullName"
                        bind:value={fullName}
                        class:error={errors.fullName}
                    />
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
                    <input
                        type="email"
                        class="form-control"
                        id="email"
                        bind:value={email}
                        class:error={errors.email}
                    />
                </div>
                <div class="col-md-6 mb-3">
                    <label for="tags" class="form-label">
                        <i class="bi bi-tags-fill"></i> Tags
                    </label>
                    <Tags
                        class="form-control"
                        bind:tags
                        autoComplete={fetchSuggestions}
                        placeholder={'Enter Min 3 Characters'}
                        minChars={3}
                        autoCompleteKey={'name'}
                        autoCompleteShowKey={'alpha3Code'}
                        onTagAdded={tagAdded}
                        onlyUnique={true}
                        customValidation={(tag) => (tag.length >= 3 ? true : false)}
                    />
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
        border-radius: 8px;
    }
    .card-header {
        border-bottom: 1px solid black;
        padding: 10px;
        text-align: left;
        font-weight: 700;
    }
    .card-body {
        padding: 20px;
    }
    .form-label {
        display: flex;
        align-items: center;
        font-weight: 700;
    }
    .form-label i {
        margin-right: 5px;
    }
    .required {
        color: red;
    }
    .mandatory-note {
        font-size: 14px;
        margin-top: 20px;
    }
    .error {
        border-color: red !important;
        border-width: 2px !important;
    }
</style>