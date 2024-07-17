<script>
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';
    import { closeModal } from 'svelte-modals';
    import { debounce } from 'lodash-es';
    import { auth_base_url } from '../stores/constants';

    export let company = {
        companyId: '',
        name: '',
        city: '',
        country: '',
        division: ''
    };

    const dispatch = createEventDispatcher();
    let allCompanies = [];
    let filteredCompanies = [];

    onMount(async () => {
        await fetchCompanies();
    });

    async function fetchCompanies() {
        const response = await fetch($auth_base_url + 'companies', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        });

        if (response.ok) {
            const result = await response.json();
            allCompanies = result.d;
        } else {
            console.error('Failed to fetch companies');
        }
    }

    function filterCompanies(input) {
        if (input.trim() === '') {
            filteredCompanies = [];
        } else {
            filteredCompanies = allCompanies.filter((company) =>
                company.name.toLowerCase().includes(input.toLowerCase())
            );
        }
    }

    const debouncedFilter = debounce(filterCompanies, 300);

    async function editCompany(event) {
        event.preventDefault();

        const { companyId, name, city, country, division } = company;

        if (companyId || name || city || country || division) {
            const res = await fetch( $auth_base_url + 'companies/edit', {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    companyId,
                    name,
                    city,
                    country,
                    division
                })
            });

            const jsonRes = await res.json();
            if (jsonRes.s) {
                window.alert('Company information updated successfully');
                dispatch('save', { company: jsonRes.company });
            } else {
                window.alert('An error occurred: ' + jsonRes.m);
            }
        } else {
            window.alert('Please provide the company ID and at least one field to update');
        }

        closeModal();
    }

   
</script>

<div class="card">
    <div class="modal-header">
        <h2>Edit Company</h2>
        <button class="close-btn" on:click={closeModal}>&times;</button>
    </div>
    <div class="card-body">
        <form on:submit|preventDefault={editCompany}>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="companyId" class="form-label">Company ID</label>
                    <input type="text" class="form-control" id="companyId" bind:value={company.companyId} disabled />
                </div>
                <div class="col-md-6 mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" bind:value={company.name} />
                </div>
                <div class="col-md-6 mb-3">
                    <label for="city" class="form-label">City</label>
                    <input type="text" class="form-control" id="city" bind:value={company.city} />
                </div>
                <div class="col-md-6 mb-3">
                    <label for="country" class="form-label">Country</label>
                    <input type="text" class="form-control" id="country" bind:value={company.country} />
                </div>
                <div class="col-md-6 mb-3">
                    <label for="division" class="form-label">Division</label>
                    <input type="text" class="form-control" id="division" bind:value={company.division} />
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
       
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
    .form-label {
        display: block;
        margin-bottom: 5px;
    }
    .form-control {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
    }
    .row {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    .col-md-6 {
        flex: 0 0 calc(50% - 10px);
    }
    .mb-3 {
        margin-bottom: 15px;
    }
    .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .btn-primary {
        background-color: #007bff;
        color: white;
    }
    .btn-secondary {
        background-color: #6c757d;
        color: white;
        margin-left: 10px;
    }
</style>
