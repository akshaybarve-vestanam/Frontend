<script>
    import { closeModal, closeAllModals, openModal, modals } from 'svelte-modals'
      import { fly } from 'svelte/transition'
      
    export let isOpen
    export let title
    export let message
      export let onOpenAnother
      
      let stackIndex = $modals.length
  </script>
  
  {#if isOpen}
      <!-- on:introstart and on:outroend are required to transition 1 at a time between modals -->
    <div role="dialog" class="modal" transition:fly={{ y: 50 }} on:introstart on:outroend>
      <div class="contents">
        <h2>{title}</h2>
        <p>{message}</p>
        <div class="actions">
                  {#if stackIndex > 1}
                      <button on:click={closeModal}>Close One</button>
                      <button on:click={closeAllModals}>Close All</button>				
                  {:else}
                      <button on:click={closeModal}>Close</button>
                  {/if}				
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