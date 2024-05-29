<script>
	// @ts-nocheck
	import { base_url } from '../../../../stores/constants';
	import { onMount } from 'svelte';
	import { auth_base_url } from '../../../../stores/constants';

	let testDateTime = '';
	let testTypes = ['Student', 'Professional', 'Operator', 'Fresher', 'Intern'];
	let labels = '';
	/*let labels1 = '';
	let labels = labels1.split('');*/
	let selectedTestType = '';
	let fullName = '';
	let phoneNumber = '+91';
	let email = '';
	//let selectedLabels1 = '';
	//let selectedLabels = selectedLabels1.split('');
	let selectedLabels = [];
	let tagInput = '';
	let candidateid = '';

	import { getNotificationsContext } from 'svelte-notifications';
	const { addNotification } = getNotificationsContext();

	// Simulate fetching test types from an API
	onMount(async () => {
    try {
        const labelsResponse = await fetch($auth_base_url + 'labels', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        });
        labels = await labelsResponse.json();
    } catch (d) {
        console.error('Error fetching labels:', d);
    }
});

	// @ts-ignore
	async function handleLabelSelectOrCreate(event) {
		const newLabel = event.target.value.trim();
		if (newLabel && !labels.includes(newLabel)) {
			try {
				const createLabelResponse = await fetch($auth_base_url + 'labels', {
					method: 'POST',
					credentials: 'include',
					headers: {
						'content-type': 'application/json'
					},
					body: JSON.stringify({ labels: [newLabel] })
				});
				const createLabelData = await createLabelResponse.json();
            if (createLabelData.success) {
                labels.push(newLabel); 
                event.target.value = ''; 
            }
        } catch (d) {
            console.error('Error creating label:', d);
        }
		}
	}

	function addTag(event) {
        const trimmedTag = tagInput.trim();
        if (trimmedTag && !selectedLabels.includes(trimmedTag)) {
            selectedLabels = [...selectedLabels, trimmedTag];
			handleLabelSelectOrCreate(event); 
            tagInput = '';
        }
    }

    function removeTag(tagToRemove) {
        selectedLabels = selectedLabels.filter(tag => tag !== tagToRemove);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            addTag(event);
        }
    }

    function handleBlur() {
        addTag();
    }

	async function registerCandidate(event) {
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
					type: 'success'
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
		} else {
			console.log('Please fill in all the required fields');
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
					<input type="tel" class="form-control" id="mobileNumber" bind:value={phoneNumber} />
				</div>
				<div class="col-md-6 mb-3">
					<label for="email" class="form-label">
						<i class="bi bi-envelope-fill"></i> Email ID
					</label>
					<input type="email" class="form-control" id="email" bind:value={email} />
				</div>
				<div class="col-md-6 mb-3">
                    <label for="labels" class="form-label">
                        <i class="bi bi-tags-fill"></i> Labels
                    </label>
                    <div class="tag-container">
                        {#each selectedLabels as tag}
                            <div class="tag">
                                <span>{tag}</span>
                                <button type="button" on:click={() => removeTag(tag)}>&times;</button>
                            </div>
                        {/each}
                        <div class="tag-input">
                            <input
                                type="text"
                                class="form-control"
                                bind:value={tagInput}
                                placeholder="Add a label..."
                                on:keydown={handleKeyDown}
                                on:blur={handleBlur}
                            />
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
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .tag {
        display: flex;
        align-items: center;
        background-color: #e0e0e0;
        border-radius: 4px;
        padding: 5px;
        margin: 5px;
    }
    .tag span {
        margin-right: 5px;
    }
    .tag button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
    }
    .tag-input {
        flex: 1;
        min-width: 100px;
    }
    .tag-input input {
        width: 100%;
        border: none;
        outline: none;
        height: 38px; 
    }
</style>
