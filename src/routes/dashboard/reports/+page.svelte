<script>
  import { onMount } from 'svelte';

  // Mock data generation
  const generateMockData = () => {
    return Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      name: `Name ${index + 1}`,
      testType: ['Student', 'Professional'][Math.floor(Math.random() * 2)],
      dateOfTest: new Date(2022 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toLocaleDateString(),
      city: ['City A', 'City B', 'City C'][Math.floor(Math.random() * 3)]
    }));
  };

  let reports = generateMockData();
  let selectedRows = new Set();
  let labels = ['Label 1', 'Label 2', 'Label 3']; // Example labels
  let selectedLabel = '';
  let searchText = '';

  // Functions for handling user actions
  function toggleSelection(rowId) {
    selectedRows.has(rowId) ? selectedRows.delete(rowId) : selectedRows.add(rowId);
  }

  function toggleSelectAll(event) {
    if (event.target.checked) {
      reports.forEach(report => selectedRows.add(report.id));
    } else {
      selectedRows.clear();
    }
  }

  function exportReports() {
    // Implement export functionality
  }
</script>

<div class="container mt-4">
  <h2>Reports</h2>
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
    <div class="col">
      <input type="text" class="form-control" placeholder="Search" bind:value={searchText}>
    </div>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th><input type="checkbox" on:change={toggleSelectAll}></th>
        <th>Sr No</th>
        <th>Name</th>
        <th>Test Type</th>
        <th>Date of Test</th>
        <th>City</th>
      </tr>
    </thead>
    <tbody>
      {#each reports as report, index (report.id)}
        <tr>
          <td><input type="checkbox" checked={selectedRows.has(report.id)} on:change={() => toggleSelection(report.id)}></td>
          <td>{index + 1}</td>
          <td>{report.name}</td>
          <td>{report.testType}</td>
          <td>{report.dateOfTest}</td>
          <td>{report.city}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="d-flex justify-content-between">
    <div>
      <button class="btn btn-primary" on:click={exportReports}>Export Reports</button>
    </div>
    <nav>
      <!-- Pagination Placeholder -->
    </nav>
  </div>
</div>
