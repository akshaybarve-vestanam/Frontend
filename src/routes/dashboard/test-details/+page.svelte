<script>
    
    let testDetails = {
        testName: 'Test Name', 
        testID: 'TestId001',
        instructions1: 'Instruction 1', 
        instructions1Audio: 'Instruction 1 Audio', 
        instructions2Text: 'Instruction 2 Text', 
        instructions2Audio: 'Instruction 2 Audio', 
    };
</script>

<div class="page">
    <div class="card">
        <div class="card-header">
            Test Details
        </div>
        <div class="card-body">
            <div class="details-container">
                <div class="detail">
                    <label>Test Name:</label>
                    <span>{testDetails.testName}</span>
                </div>
                <div class="detail">
                    <label>Test ID:</label>
                    <span>{testDetails.testID}</span>
                </div>
                <div class="detail">
                    <label>Instructions 1:</label>
                    <span>{testDetails.instructions1}</span>
                </div>
                <div class="detail">
                    <label>Instructions 1 Audio:</label>
                    <span>{testDetails.instructions1Audio}</span>
                </div>
                <div class="detail">
                    <label>Instructions 2 Text:</label>
                    <span>{testDetails.instructions2Text}</span>
                </div>
                <div class="detail">
                    <label>Instructions 2 Audio:</label>
                    <span>{testDetails.instructions2Audio}</span>
                </div>
            </div>
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

    .details-container {
        display: flex;
        flex-direction: column;
    }

    .detail {
        margin-bottom: 10px;
    }

    .detail label {
        font-weight: bold;
        margin-right: 10px;
    }
</style>
