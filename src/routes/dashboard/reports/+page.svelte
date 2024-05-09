<script>
  import { onMount } from 'svelte';

  // Mock data generation
  const generateMockData = () => {
    return Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      name: `Name ${index + 1}`,
      testType: ['Student', 'Professional'][Math.floor(Math.random() * 2)],
      dateOfTest: new Date(2022 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toLocaleDateString(),
      emailid : `name${index+1}@gmail.com`,
      phonenumber : `9${Math.floor(100000000 + Math.random() * 900000000)}`,
      city: ['Nagpur', 'Mumbai', 'Delhi','Bengaluru'][Math.floor(Math.random() * 3)],
      status:[ 'Active','Disabled'][Math.floor(Math.random() * 2)],
    }));
  };

  let Candidates = generateMockData();
  let selectedRows = new Set();
  let labels = ['Label 1', 'Label 2', 'Label 3']; // Example labels
  let selectedLabel = '';
  let searchText = '';
  let status =[ 'Active','Disabled'];

  // Functions for handling user actions
  function toggleSelection(rowId) {
    selectedRows.has(rowId) ? selectedRows.delete(rowId) : selectedRows.add(rowId);
  }

  function toggleSelectAll(event) {
    if (event.target.checked) {
      Candidates.forEach(Candidates => selectedRows.add(Candidates.id));
    } else {
      selectedRows.clear();
    }
  }

  function exportCandidates() {
    // Implement export functionality
  }

  
  


    let selectedLabels = [];

    function isSelected(label) {
        return selectedLabel.includes(label);
    }

    function openMail() {
        alert("Mail icon clicked");
    }

    function downloadFile() {
        alert("Download icon clicked");
    }

    function editContent() {
        alert("Edit icon clicked");
    }


   



</script>

<div class="container mt-4">
  <h2>Candidates</h2>
  <div class="mb-3 row">
    <div class="col">
      <input type="date" class="form-control" placeholder="Start Date">
    </div>
    <div class="col">
      <input type="date" class="form-control" placeholder="End Date">
    </div>
    <div class="col">
      <select class="form-select" bind:value={selectedLabel}>
        <option value="">Filter by Label</option>
        {#each labels as label}
          <option value={label}>{label}</option>
        {/each}
      </select>
    </div>

    <div class="col" id = "status" >
      <select class="form-select" bind:value={selectedLabel}>
        <option value="">Filter by Status</option>
        {#each status as active }
          <option value={active}>{active}</option>
        {/each}
      </select>
    </div>
  
 
  
  
    <div class="col">
      <input type="text" class="form-control" placeholder="Search" bind:value={searchText}>
    </div>
  </div>

  

<table class="table">
    <thead>
        <tr>
            <th><input type="checkbox" on:click={toggleSelectAll}></th>
            <th>Sr No</th>
            <th>Name</th>
            <th>Test Type</th>
            <th>Date of Test</th>
            <th>Email id</th>
            <th>Phone number</th>
            <th>City</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {#each Candidates as candidates, index (candidates.id)}
        <tr>
          <td><input type="checkbox" checked={selectedRows.has(candidates.id)} on:change={() => toggleSelection(candidates.id)}></td>
          <td>{index + 1}</td>
          <td>{candidates.name}</td>
          <td>{candidates.testType}</td>
          <td>{candidates.dateOfTest}</td>
          <td>{candidates.emailid}</td>
          <td>{candidates.phonenumber}</td>
          <td>{candidates.city}</td>
          <td>{candidates.status}</td>
          <td>
            <i class="bi bi-envelope-fill " on:click={openMail}></i> <!-- Bootstrap Icon for mail -->
            <i class="bi bi-download" on:click={downloadFile}></i> <!-- Bootstrap Icon for download -->
            <i class="bi bi-three-dots" on:click={editContent}></i> <!-- Bootstrap Icon for edit -->
        </td>
        </tr>
        {/each}
    </tbody>
</table>



  <div class="d-flex justify-content-between">
    <div style="position: absolute; top: 30px; right: 30px;">
        <button class="btn btn-primary" on:click={exportCandidates}>Export Reports</button>
    </div>
    <nav>
        <!-- Pagination Placeholder -->
    </nav>
  </div>  
</div>


<style>
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Reddit+Mono:wght@200..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
  .table{
      margin: 20px;
      font-family: 'Reddit Mono', monospace;
      font-weight: 400;
      color: black;
      border: 1px solid black;
      /*width : 50%;*/
      border-radius: 8px;
      

  }
  h2{
    font-family: 'Reddit Mono', monospace;
    font-weight: 700;
  }

  .bi bi-envelope{
  display:block;
  width:100px;
  height:20px;
}
  
  

  



</style>