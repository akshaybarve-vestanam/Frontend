<script>
    import { closeModal, closeAllModals, openModal, modals } from 'svelte-modals';
    import { fly } from 'svelte/transition';
    import { auth_base_url } from '../stores/constants';

    export let isOpen;
    export let title;
    export let message;
    export let onOpenAnother;

    let stackIndex = $modals.length;

    let selectedOption = '';
    let to = '';
    let cc = '';

    async function sendEmail() {
        const emailData = {
            selectedOption,
            to,
            cc
        };

        try {
            const response = await fetch($auth_base_url + 'send-email', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData)
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Email sent successfully:', result);
            } else {
                console.error('Error sending email:', result);
            }
        } catch (error) {
            console.error('Failed to send email:', error);
        }

        closeModal();
    }
</script>

{#if isOpen}
    <div role="dialog" class="modal" transition:fly={{ y: 50 }} on:introstart on:outroend>
        <div class="contents">
            <div class="modal-header">
                <h2>{title}</h2>
                <p>{message}</p>
            </div>
            <div class="modal-body">
                <div class="email-option-select">
                    <label for="email-type">Choose Email Type:</label>
                    <select id="email-type" bind:value={selectedOption}>
                        <option value="">Select</option>
                        <option value="Registration">Send Registration Email</option>
                        <option value="Instructions">Send Instructions Email</option>
                        <option value="Reports">Send Reports Email</option>
                    </select>
                </div>
                {#if selectedOption}
                <div class="email-options">
                    <label for="to">To:</label>
                    <input type="text" id="to" bind:value={to} />

                    <label for="cc">CC:</label>
                    <input type="text" id="cc" bind:value={cc} />
                </div>
                <div class="actions">
                    {#if stackIndex > 1}
                        <button on:click={closeModal}>Close One</button>
                        <button on:click={closeAllModals}>Close All</button>
                    {:else}
                        <button on:click={closeModal}>Close</button>
                    {/if}
                    <button on:click={sendEmail}>Send Email</button>
                    <button on:click={onOpenAnother}>Open Another</button>
                </div>
                {/if}
            </div>
        </div>
    </div>
{/if}


<style>
    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        /* allow click-through to backdrop */
        pointer-events: none;
    }

    .contents {
        min-width: 240px;
        border-radius: 6px;
        padding: 16px;
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        pointer-events: auto;
    }

    h2 {
        text-align: center;
        font-size: 24px;
    }

    p {
        text-align: center;
        margin-top: 16px;
    }

    .actions {
        margin-top: 32px;
        display: flex;
        justify-content: space-between;
        gap: 8px;
    }

    .actions button:hover {
        background-color: #ddd; /* Change to desired hover background color */
        color: #333; /* Change to desired hover text color */
    }

    .modal-header {
        background-color: #302b63;
        color: white;
        padding: 10px;
    }

    .modal-body {
        background-color: #f8f9fa;
        padding: 10px;
    }
</style>

