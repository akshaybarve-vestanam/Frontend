<script>
	import { goto } from "$app/navigation";
        let email = '';
        let password = '';
        let otp_val = 0;
       
       async function handleSubmit(event) {
            event.preventDefault();
            let txtPassword = document.getElementById("password");
            if (txtPassword.value == otp_val) {
					//alert("Email address verified...");
                    goto('http://localhost:5173/dashboard/registration/individual')
				}
				else {
					alert("Invalid OTP");
				}
        }
        function sendOTP() {
	        const email = document.getElementById('email');
	        const otpverify = document.getElementsByClassName('otpverify')[0];
            otp_val = Math.floor(Math.random() * 1000000);
	        let emailbody = `<h2>Your OTP is </h2>${otp_val}`;
        // @ts-ignore
        Email.send({
        SecureToken : "ea01ecf2-c78d-4d0d-9793-5a20ef4be616",
        // @ts-ignore
        To : email.value,
        From : "akshay.barve@vestanam.com",
        Subject : "OTP Mail",
        Body : emailbody}).then(

	message => {
        debugger;
        //if otp sent sucesfully
		if (message === "OK") {
			// @ts-ignore
			alert("OTP sent to your email " + email.value);

			//otpverify.style.display = "flex";
			const password = document.getElementById('password');
			

			// @ts-ignore
			
		}
	}
);


}

let isButtonDisabled = true;
   // var inputValue = '';
    function handleChange() {
    isButtonDisabled = password === '';
  }
</script>

<style>
    
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background : linear-gradient(to bottom, #0f0c29, #302b63, #24243e); 
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
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        background : linear-gradient(to bottom, #0f0c29, #302b63, #24243e); 
        border: 2px solid #ffffff;
    }

    h2 {
        text-align: center;
        margin-bottom: 20px;
        color: whitesmoke;
        font-family: 'Reddit Mono', monospace;
        font-weight: 700;
    }

    input[type="email"],
    input[type="password"] {
        width: 100%;
        padding: 12px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-sizing: border-box;
        font-size: 16px;
        color: black;
        font-family: 'Reddit Mono', monospace;
        font-weight: 700;
    }
    .dha{
        color: #ffffff;
        font-family: 'Reddit Mono', monospace;
        font-weight: 700;
    }
    .su{
        color: #5a50cc;
        font-family: 'Reddit Mono', monospace;
        font-weight: 700;
    }
    button[type = "submit"]{
        width: 100%;
        padding: 12px;
        border: none;
        border-radius: 5px;
        background-color: #007bff;
        color: #fff;
        cursor: pointer;
        font-size: 20px;
        transition: background-color 0.3s ease;
        font-family: 'Reddit Mono', monospace;
        font-weight: 700;
    }

    button:hover {
        background-color: #0056b3;
    }

    label[for="email"],
    label[for="password"] {
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
            background-color: #302b63;
            color: #fff;
            padding: 20px;
            text-align: center;
            font-family: 'Reddit Mono', monospace;
            font-weight: 700;
        }
    button[type = 'otpgen']{
        width: 40%;
        padding: 12px;
        height: min-content;
        align-content:end;
        border-radius: 5px;
        size: 1px;
        border: none;
        background-color: #007bff;
        color: #fff;
        cursor: pointer;
        font-size: 20px;
        transition: background-color 0.3s ease;
        font-family: 'Reddit Mono', monospace;
        font-weight: 400;
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
        <h2>Login</h2>
        <form>
            <div>
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" bind:value={email}>
                <button type = "otpgen" on:click={sendOTP}>Send OTP</button><p></p>
            </div>
            <div>
                <label for="password">OTP</label>
                <input type="password" id="password" placeholder="Enter the 6 digit OTP" bind:value={password} on:input={handleChange}>
            </div>  
            <button type="submit" id = "otp-btn" disabled = {isButtonDisabled} on:click={handleSubmit} >Login</button>
        </form>
        <p class="dha">Want to become a registered user? <a href="signup" class='su'>Click here</a></p>
  </div>
</div>
<footer class="footer">
    <p>&copy; 2024 Vestanam Solutions Pvt. Ltd. All rights reserved.</p>
</footer>





