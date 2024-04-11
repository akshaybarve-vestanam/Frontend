<script>
  /*import { navigate } from 'svelte-routing';*/
  import { goto } from '$app/navigation';
  let name = '';
  let email = '';
  let phoneNumber = '';
  let address = '';
  let query='';

  function handleSubmit() {
    // Here you would handle form submission, for now, let's just log the values
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);
    console.log('Address:', address);
    console.log('Query',query);
    goto('/login')
  }
</script>

<style>
   .center {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background : linear-gradient(to bottom, #0f0c29, #302b63, #24243e); 
      min-height: calc(100vh - 100px);
  }
  
 /* @keyframes gradientTransition {
      0% {
          background-color: #0f0c29;
      }
      50% {
          background-color: #302b63;
      }
      100% {
          background-color: #24243e;
      }
  }*/
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Reddit+Mono:wght@200..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background : linear-gradient(to bottom, #0f0c29, #302b63, #24243e); 
    font-family: 'Reddit Mono', monospace;
    font-weight: 700;
    border: 2px solid #ffffff;
    width : 100%;
  }


  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: white;
    font-family: 'Reddit Mono', monospace;
    font-weight: 700;
  }

  input[type="text"],
  input[type="email"],
  input[type="tel"],
  textarea {
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
    font-family: 'Reddit Mono', monospace;
    font-weight: 700;
    color: black;
  }

  button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
    font-family: 'Reddit Mono', monospace;
    font-weight: 700;
  }

  button:hover {
    background-color: #0056b3;
  }
  label[for="email"],
  label[for="address"],
  label[for="name"],
  label[for="phoneNumber"],
  label[for="query"]{
    color: #a7d1d8; 
    font-family: 'Reddit Mono', monospace;
    font-weight: 700;
  }
  
  nav {
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  nav a {
    color: #fff;
    text-decoration: none;
    margin-right: 10px;
    font-weight: bold;
  }
  .heading{
    font-family: 'Reddit Mono', monospace;
    font-weight: 700;
    font-size: 30px;
    align-items: center;
  }
  .navi{
    background-color: #0f0c29;
  }
  .contactnav{
    font-size: 18px;
    align-items: center;
    border: #007bff;
    font-family: 'Reddit Mono', monospace;
    font-weight: 700;
  }
  .footer {
            background-color: #0c0742;
            color: #fff;
            padding: 20px;
            text-align: center;
            font-family: 'Reddit Mono', monospace;
            font-weight: 700;
            position: relative;
            width: 100%;
        }
</style>

<nav class = 'navi'>
  <div>
    <p class = "heading"> Introspects 2.0</p>
  </div>
  <div>
    <a href="/contact" class = "contactnav">Help</a>
  </div>
</nav>
<div class="center">
<div class="container">
  <h2>Query Request</h2>
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="name">Name</label>
      <input type="text" id="name" placeholder="Enter your name" bind:value={name} />
    </div>
    <div>
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="Enter your email" bind:value={email} />
    </div>
    <div>
      <label for="phoneNumber">Phone Number</label>
      <input type="tel" id="phoneNumber" placeholder="Enter your Phone Number" bind:value={phoneNumber} />
    </div>
    <div>
      <label for="address">Address</label>
      <textarea id="address" placeholder="Enter your address" bind:value={address}></textarea>
    </div>
    <div>
      <label for="query">Query</label>
      <textarea id="query" placeholder="Write your query" bind:value={query}></textarea>
    </div>
    <button type="submit">Send Query</button>
  </form>
  </div>
</div>
<footer class="footer">
  <p class = "textfoot">&copy; 2024 <a href = "https://www.vestanam.com/">Vestanam Solutions Pvt. Ltd.</a> All rights reserved.</p>
</footer>
