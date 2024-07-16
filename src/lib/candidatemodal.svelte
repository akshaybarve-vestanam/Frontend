<!-- <script>
	// @ts-ignore
	import { onMount } from 'svelte';
	import { auth_base_url } from '../stores/constants';
	import { closeModal } from 'svelte-modals';


    export let title
    export let message
	// @ts-ignore
	export let data

	/*let fullName = '';
	let email = '';
	let phoneNumber = '';
    let testTypes = '';
	let candidateId = '';*/
	let { fullName, email, phoneNumber, candidateId } = data;
	console.log(data);
	// onMount(async () => {
	// });

	// @ts-ignore
	async function editCandidate(event) {
		event.preventDefault(); 

		console.log(data);
		if ( fullName || email || phoneNumber ) {
            // @ts-ignore
        
			const res = await fetch($auth_base_url + 'candidate/edit', {
			 	method: 'POST',
			 	credentials: 'include',
			 	headers: {
		 		'content-type': 'application/json'
			 	},
			 	body: JSON.stringify(data)
			 });

			 const jsonRes = await res.json();
			 if (jsonRes.s) {
			 	console.log(jsonRes.m);
			 	window.alert('Candidate information updated successfully');
			 } else {
			 	console.log(jsonRes.m);
			 	window.alert('An error occurred: ' + jsonRes.m);
		 }
		} else {
			window.alert('Please provide the candidate ID and at least one field to update');
		}

		closeModal();
	}
</script>

<div class="card">
	<div class="modal-header"> 
        <h2>{title}</h2>
        <p>{message}</p>
		<button class="close-btn" on:click={closeModal}>&times;</button>
    </div>
	<div class="card-body">
		<form on:submit={editCandidate}>
			<div class="row">
				<div class="col-md-6 mb-3">
					<label for="firstName" class="form-label">First Name</label>
					<input type="text" class="form-control" id="firstName" bind:value={data.name} />
				</div>
				<div class="col-md-6 mb-3">
					<label for="email" class="form-label">Email</label>
					<input type="email" class="form-control" id="email" bind:value={data.emailId} />
				</div>
				<div class="col-md-6 mb-3">
					<label for="phoneNumber" class="form-label">Phone Number</label>
					<input type="tel" class="form-control" id="phoneNumber" bind:value={data.phoneNumber} />
				</div>
				<div class="col-md-6 mb-3">
					<label for="candidateId" class="form-label">Candidate ID</label>
					<input type="text" class="form-control" id="candidateId" value={data.candidateId} disabled />
				  </div>
			</div>
			<button type="submit" class="btn btn-primary">Submit</button>
		</form>
	</div>
</div>


<style>
	.card {
		margin: 20px auto;
		font-family: 'Reddit Mono', monospace;
		font-weight: 400;
		color: black;
		border: 1.5px solid black;
		border-radius: 8px;
		position: absolute;
		top: 20px;
		left: 50%;
		transform: translateX(-50%);
		width: 80%; 
	}
    .modal-header {
        background-color: #302b63;
        color: white;
        padding: 10px;
        border: 1.5px solid black;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
	.card-body {
		border: 1.5px solid black;
		padding: 20px;
	}
	.close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: white;
        cursor: pointer;
        width: 30px;
        height: 30px;
        transition: background-color 0.3s, color 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .close-btn:hover {
        background-color: red;
        color: white;
    }
</style> -->



<script>
	// @ts-ignore
	import { onMount } from 'svelte';
	import { auth_base_url } from '../stores/constants';
	import { closeModal } from 'svelte-modals';
	import Tags from 'svelte-tags-input';

	export let title;
	export let message;
	// @ts-ignore
	export let data;
  
	let { fullName, email, phoneNumber, candidateId, labels } = data;
  let selectedTestType = '';
  let selectedLabels = labels || [];
  let tagInput = '';
  let tempSuggestions = [];
  let testTypes = ['Student', 'Professional', 'Operator', 'Fresher', 'Intern']; // Test types options



  const fetchSuggestions = async (query) => {
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



  async function editCandidate(event) {
    event.preventDefault();

    if (fullName || email || phoneNumber || selectedTestType || selectedLabels) {
      const res = await fetch($auth_base_url + 'candidate/edit', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          phoneNumber,
          candidateId,
          selectedTestType,
          selectedLabels
        }),
      });

      const jsonRes = await res.json();
      if (jsonRes.s) {
        window.alert('Candidate information updated successfully');
      } else {
        window.alert('An error occurred: ' + jsonRes.m);
      }
    } else {
      window.alert('Please provide the candidate ID and at least one field to update');
    }

    closeModal();
  }
  onMount(() => {
    // Ensure selectedTestType is set to a default value if necessary
    if (testTypes.length > 0) {
      selectedTestType = testTypes[0];
    }
  });
  </script>
  
  <div class="card">
	<div class="modal-header">
	  <h2>{title}</h2>
	  <p>{message}</p>
	  <button class="close-btn" on:click={closeModal}>&times;</button>
	</div>
	<div class="card-body">
	  <form on:submit={editCandidate}>
		<div class="row">
		  <div class="col-md-6 mb-3">
			<label for="firstName" class="form-label">First Name</label>
			<input type="text" class="form-control" id="firstName" bind:value={fullName} />
		  </div>
		  <div class="col-md-6 mb-3">
			<label for="email" class="form-label">Email</label>
			<input type="email" class="form-control" id="email" bind:value={email} />
		  </div>
		  <div class="col-md-6 mb-3">
			<label for="phoneNumber" class="form-label">Phone Number</label>
			<input type="tel" class="form-control" id="phoneNumber" bind:value={phoneNumber} />
		  </div>
		  <div class="col-md-6 mb-3">
			<label for="candidateId" class="form-label">Candidate ID</label>
			<input type="text" class="form-control" id="candidateId" value={candidateId} disabled />
		  </div>
		  <div class="col-md-6 mb-3">
			<label for="testType" class="form-label">Test Type</label>
			<select class="form-select" id="testType" bind:value={selectedTestType}>
			  {#each testTypes as testType}
				<option value={testType}>{testType}</option>
			  {/each}
			</select>
		  </div>
		  <div class="col-md-6 mb-3">
			<label for="labels" class="form-label">Labels</label>
			<Tags
			  class="form-control"
			  bind:tags={selectedLabels}
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
		</div>
		<button type="submit" class="btn btn-primary">Submit</button>
	  </form>
	</div>
  </div>
  
  <style>
	.card {
	  margin: 20px auto;
	  font-family: 'Reddit Mono', monospace;
	  font-weight: 400;
	  color: black;
	  border: 1.5px solid black;
	  border-radius: 8px;
	  position: absolute;
	  top: 20px;
	  left: 50%;
	  transform: translateX(-50%);
	  width: 50%;
	}
	.modal-header {
	  background-color: #302b63;
	  color: white;
	  padding: 10px;
	  border: 1.5px solid black;
	  border-radius: 8px 8px 0 0;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}
	.modal-header h2 {
	  margin: 0;
	}
	.modal-header .close-btn {
	  background: none;
	  border: none;
	  font-size: 24px;
	  cursor: pointer;
	  color: white;
	}
	.card-body {
	  padding: 20px;
	}
  </style>
  

