<script>
  import { closeModal, closeAllModals, openModal, modals } from 'svelte-modals'
  import { fly } from 'svelte/transition'
    
  export let isOpen
  export let title
  export let message
  export let onOpenAnother
    
  let stackIndex = $modals.length

  // Variables to store email data
  let to = ''
  let cc = ''
  let bcc = ''
  let emailBody = ''
  
  // Function to send email
  function sendEmail() {
      // Implement your logic to send the email using the provided data
      console.log("Sending email to:", to)
      console.log("CC:", cc)
      console.log("BCC:", bcc)
      console.log("Body:", emailBody)
      // Close the modal after sending the email
      closeModal()
  }
</script>

{#if isOpen}
  <div role="dialog" class="modal" transition:fly={{ y: 50 }} on:introstart on:outroend>
      <div class="contents">
          <h2>{title}</h2>
          <p>{message}</p>
          <div class="email-options">
              <label for="to">To:</label>
              <input type="text" id="to" bind:value={to} />
              <p></p>
              <label for="cc">Cc:</label>
              <input type="text" id="cc" bind:value={cc} />
              <p></p>
              <label for="bcc">Bcc:</label>
              <input type="text" id="bcc" bind:value={bcc} />
              <p></p>
          </div>
          <div class="email-body">
              <label for="email-body">Email Body:</label>
              <textarea id="email-body" bind:value={emailBody}></textarea>
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
  

  
  </style>