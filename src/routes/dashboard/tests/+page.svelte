<script>
    import { onMount } from 'svelte';

    let Tests = generateMockData(); // Initialize with mock data

    // Function to generate mock data
    function generateMockData() {
        return Array.from({ length: 100 }, (_, index) => ({
            testType: `Test Type ${index + 1}`,
            testID: `TestId00${index + 1}`,
            testDuration: `${Math.floor(Math.random() * 60) + 30} minutes`,
            totalQuestions: Math.floor(Math.random() * 50) + 50,
            lastModifiedDate: new Date(2022 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toLocaleDateString(),
        }));
    }
</script>

<div class="page">
    <div class="card">
        <div class="card-header">
            Tests
        </div>
        <div class="card-body">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Test Type</th>
                        <th scope="col">Test ID</th>
                        <th scope="col">Test Duration</th>
                        <th scope="col">Total Questions</th>
                        <th scope="col">Last Modified Date</th>
                    </tr>
                </thead>
                <tbody>
                    {#each Tests as test, index}
                    <tr>
                        <td><a href={`/test-details/${test.testID}`}>{test.testType}</a></td>
                        <td><a href={`/test-details/${test.testID}`}>{test.testID}</a></td>
                        <td><a href={`/test-details/${test.testID}`}>{test.testDuration}</a></td>
                        <td><a href={`/test-details/${test.testID}`}>{test.totalQuestions}</a></td>
                        <td><a href={`/test-details/${test.testID}`}>{test.lastModifiedDate}</a></td>

                        
                    </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>

<style>
    .card {
      margin: 20px;
      font-family: 'Reddit Mono', monospace;
      font-weight: 400;
      color: black;
      border: 1px solid black;
      border-radius: 8px;
    }
  
    .card-header {
      border: 1px solid black;
      padding: 10px;
      font-weight: 700;
    }
  
    .card-body {
      border: 1px solid black;
      padding: 20px;
    }
  
    .table {
      width: 100%;
      margin-bottom: 1rem;
      color: #212529;
    }
  
    .table th,
    .table td {
      padding: 0.75rem;
      vertical-align: top;
      border-top: 1px solid #dee2e6;
    }
  
    .table thead th {
      vertical-align: bottom;
      border-bottom: 2px solid #dee2e6;
    }
  
    .table tbody + tbody {
      border-top: 2px solid #dee2e6;
    }
  
    .table .table {
      background-color: #fff;
    }
  </style>
  
