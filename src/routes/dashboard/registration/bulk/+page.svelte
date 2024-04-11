<script>
    let selectedTestType = '';
    let selectedLabels = [];
    let testDateTime = ''; // Added for date and time field
  
    function downloadSampleExcel() {
      window.location.href = 'url-to-sample-excel-file.xlsx';
    }
  
    function handleFileUpload(event) {
      const file = event.target.files[0];
      // Logic to handle the uploaded file
    }

  </script>
<body style="background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);">

<style>   
 @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Reddit+Mono:wght@200..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
    .card {
      margin: 20px;
      background : linear-gradient(to bottom, #0f0c29, #302b63, #24243e); 
      font-family: 'Reddit Mono', monospace;
      font-weight: 700;
      color: whitesmoke;
      border: 2px solid #ffffff;
      /*width : 50%;*/
      border-radius: 8px;
    }
    .card-header {
        border: 2px solid #ffffff;
        padding: 10px; /* Optional: Add padding to the header */
    }

    .card-body {
        border: 2px solid #ffffff;
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
              <!-- Options similar to IndividualRegistration.svelte -->
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label for="bulkLabels" class="form-label">
              <i class="bi bi-tags"></i> 
            </label>
             <!--Placeholder for multi-select labels component similar to IndividualRegistration.svelte -->
          </div>
          <div class="col-md-6 mb-3">
            <button type="button" class="btn btn-info" on:click={downloadSampleExcel}>
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
      </form>
    </div>
  </div>
</div>
</body>