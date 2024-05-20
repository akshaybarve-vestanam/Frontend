<script>
	import { isLoading } from '../stores/loading';
	isLoading.set(true);
</script>

<slot />


{#if $isLoading}
  <div class="loader-container">
    <div class="loader">Loading...</div>
  </div>
{/if}

<style>
  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 9999; 
  }

  .loader,
  .loader:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }

  .loader {
    font-size: 10px;
    position: relative;
    text-indent: -9999em;
    border-top: 1.1em solid rgb(255, 255, 255);
    border-right: 1.1em solid #e1d3d3;;
    border-bottom: 1.1em solid rgb(249, 247, 247);
    border-left: 1.1em solid #e1d3d3;
    transform: translateZ(0);
    animation: load8 1.1s infinite linear;
  }

  @keyframes load8 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
