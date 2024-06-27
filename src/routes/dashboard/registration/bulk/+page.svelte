<script>
  let selectedTestType = '';
  let selectedLabels = [];
  let testDateTime = ''; // Added for date and time field

  let testTypes = ['Student', 'Professional', 'Operator', 'Fresher', 'Intern'];

  function downloadSampleExcel() {
      window.open("https://docs.google.com/spreadsheets/d/1Ss2TmGBF2Oc3MMmX2v-qTMLTkoH97nmwmFVvtkrNM_Y/edit?usp=sharing")
  }

  function handleFileUpload(event) {
      const file = event.target.files[0];
      // Logic to handle the uploaded file
  }
</script>

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
      font-weight: 700;
  }

  .card-body {
      border: 1px solid black;
      padding: 20px; /* Optional: Add padding to the body */
  }
</style>

<div class="page">
  <div class="card">
      <div class="card-header">
          Bulk Registration
      </div>
      <div class="card-body">
          <form>
              <div class="row">
                  <div class="col-md-6 mb-3">
                      <label for="bulkTestType" class="form-label">
                          <i class="bi bi-list-check"></i> Test Type
                      </label>
                      <select class="form-select" id="bulkTestType" bind:value={selectedTestType}>
                          {#each testTypes as testType}
                              <option value={testType}>{testType}</option>
                          {/each}
                      </select>
                  </div>
                  <div class="col-md-6 mb-3">
                      <label for="bulkLabels" class="form-label">
                          <i class="bi bi-tags"></i> Labels
                      </label>
                      <!-- Placeholder for multi-select labels component similar to IndividualRegistration.svelte -->
                  </div>
                  <div class="col-md-6 mb-3">
                      <button type="button" id="btn" class="btn btn-info" on:click={downloadSampleExcel}>
                          <i class="bi bi-file-earmark-excel-fill"></i> Download Sample Excel
                      </button>
                  </div>
                  <div class="col-md-6 mb-3">
                      <label class="btn btn-primary">
                          <i class="bi bi-upload"></i> Upload Excel
                          <input type="file" class="form-control" id="bulkUploadExcel" on:change={handleFileUpload} hidden>
                      </label>
                  </div>
                  <div class="col-md-6 mb-3">
                      <label for="testDateTime" class="form-label">
                          <i class="bi bi-calendar-event-fill"></i> Date and Time of Test
                      </label>
                      <input type="datetime-local" class="form-control" id="testDateTime" bind:value={testDateTime}>
                  </div>
              </div>
              <button type="submit" class="btn btn-primary">
                  <i class="bi bi-cursor-fill"></i> Submit
              </button>
          </form>
      </div>
  </div>
</div>
