<script>
    // @ts-ignore
    import { onMount } from 'svelte';
    import { auth_base_url } from '../stores/constants';
    import { closeModal } from 'svelte-modals';
    import { debounce } from 'lodash-es';

    export let title;
    export let user = {
        fullName: '',
        email: '',
        mobileNumber: '',
        company: ''
    };

    let companies = [];
    let filteredCompanies = [];
    
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
            const result = await response.json();
            companies = result.d;
        } else {
            console.error('Failed to fetch companies');
        }
    }

    function filterCompanies(input) {
        if (input.trim() === '') {
            filteredCompanies = [];
        } else {
            filteredCompanies = companies.filter(company =>
                company.name.toLowerCase().includes(input.toLowerCase())
            );
        }
    }

    const debouncedFilter = debounce(filterCompanies, 300);

    async function handleSubmit(event) {
        event.preventDefault();
        console.log('Submitting data: ', user);
        if (user.fullName && user.email && user.mobileNumber && user.company) {
            const res = await fetch($auth_base_url + `users/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const jsonRes = await res.json();
            if (jsonRes.s) {
                alert('User information saved successfully');
            } else {
                alert('An error occurred: ' + jsonRes.m);
            }
        } else {
            alert('Please fill in all required fields');
        }

        closeModal();
    }
</script>

<div class="modal-container">
    <div class="modal-content">
        <div class="modal-header">
            <h2>{title}</h2>
            <button class="close-btn" on:click={closeModal}>&times;</button>
        </div>
        <div class="modal-body">
            <form on:submit={handleSubmit}>
                <div class="form-group">
                    <label for="fullName">Full Name</label>
                    <input type="text" id="fullName" class="form-control" bind:value={user.fullName} />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" class="form-control" bind:value={user.email} />
                </div>
                <div class="form-group">
                    <label for="mobileNumber">Mobile Number</label>
                    <input type="text" id="mobileNumber" class="form-control" bind:value={user.mobileNumber} />
                </div>
                <div class="form-group">
                    <label for="company">Company</label>
                    <input type="text" id="company" class="form-control" on:input={(e) => debouncedFilter(e.target.value)} bind:value={user.companies} placeholder="Search your company" />
                    <ul class="suggestions">
                        {#if filteredCompanies.length > 0}
                            {#each filteredCompanies as company}
                                <li on:click={() => { user.company = company.name; filteredCompanies = []; }}>{company.name}</li>
                            {/each}
                        {/if}
                    </ul>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</div>

<style>
    .modal-container {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        max-width: 600px;
        background: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    }

    .modal-content {
        padding: 20px;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #302b63;
        color: white;
        padding: 10px;
        border-bottom: 1px solid #ccc;
    }

    .modal-header h2 {
        margin: 0;
    }

    .modal-body {
        padding: 20px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-group label {
        display: block;
        margin-bottom: 5px;
    }

    .form-group input {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
    }

    .suggestions {
        list-style-type: none;
        padding: 0;
        margin: 0;
        border: 1px solid #ccc;
        max-height: 150px;
        overflow-y: auto;
    }

    .suggestions li {
        padding: 8px;
        cursor: pointer;
    }

    .suggestions li:hover {
        background-color: #f0f0f0;
    }

    .close-btn {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    }

    .btn-primary {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
    }
</style>
