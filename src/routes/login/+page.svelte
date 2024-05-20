<script>
	import { goto } from '$app/navigation';
	import { navigating } from '$app/stores'
	import { isLoading } from '../../stores/loading';
      isLoading.set(true);

	
	
	let email = '';
	let password = '';
	let otp_val = 0;
	let sendingOTP = false;

	async function login() {
		if (password) {
			const res = await fetch('http://localhost:3000/login', {
				method: 'POST',
				credentials:'include',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					otp: password,
					email: email
				})
			});
			console.log(res);
			const labelsRes=await fetch('http://localhost:3000/labels',{
				method: 'GET',
				credentials: 'include',
				headers:{
					'content-type':'application/json'
				}
			});
			console.log(labelsRes);

			//const jsonRes = await res.json();
			//if (jsonRes.s) {
			otpSent = true;
			//}
			//console.log(jsonRes);
			//navigating.update(n => false);
		} else {
			console.log('please enter otp');
		}
	}
	async function sendOTP() {
		console.log('email', email);
		if (email) {
			//navigating.set(true);
			const res = await fetch('http://localhost:3000/user/otp', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					email: email
				})
			});
			const jsonRes = await res.json();
			if (jsonRes.s) {
				otpSent = true;
			}
			console.log(jsonRes);
			// navigating.set(false);
		} else {
			console.log('please enter email');
		}
	}

	let isButtonDisabled = true;
	// var inputValue = '';
	function handleChange() {
		isButtonDisabled = password === '';
	}

	let otpSent = false; // Define the otpSent variable and initialize it to false

	// function sendOTP() {
	//     // Add your logic to send OTP
	//     // Once OTP is sent, set otpSent to true
	//     otpSent = true;
	// }

	// function handleChange() {
	//     // Add your logic to handle input change
	// }

	// function handleSubmit() {
	//     // Add your logic to handle form submission
	// }
</script>

<nav class="navi">
	<div>
		<p class="heading">Introspects 2.0</p>
	</div>
	<div>
		<a href="/contact" class="contactnav">Help</a>
	</div>
</nav>

<div class="center">
	<div class="container">
		<h2>Login</h2>
		<form>
			{#if !otpSent}
				<div>
					<label for="email">Email</label>
					<input type="email" id="email" placeholder="Enter your email" bind:value={email} />
				</div>
				<button class="otpbutton" type="submit" on:click={sendOTP} disabled={sendingOTP}>Send OTP</button>
			{/if}

			{#if otpSent}
				<div>
					<label for="password">OTP</label>
					<input
						type="password"
						id="password"
						placeholder="Enter the 6 digit OTP"
						bind:value={password}
						on:input={handleChange}
					/>
				</div>
				<button type="button" id="otp-btn" disabled={isButtonDisabled} on:click={login}
					>Login</button
				>
			{/if}
		</form>

		<p class="dha">Want to become a registered user? <a href="signup" class="su">Click here</a></p>
	</div>
</div>
<footer class="footer">
	<p>&copy; 2024 Vestanam Solutions Pvt. Ltd. All rights reserved.</p>
</footer>

{#if $navigating}
    <SyncLoader size="60" color="#FF3E00" unit="px" duration="1s" />
{/if}

<style>
	.center {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
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
		background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
		border: 2px solid #ffffff;
	}

	h2 {
		text-align: center;
		margin-bottom: 20px;
		color: whitesmoke;
		font-family: 'Reddit Mono', monospace;
		font-weight: 700;
	}

	input[type='email'],
	input[type='password'] {
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
	.dha {
		color: #ffffff;
		font-family: 'Reddit Mono', monospace;
		font-weight: 700;
	}
	.su {
		color: #5a50cc;
		font-family: 'Reddit Mono', monospace;
		font-weight: 700;
	}
	button[type='submit'] {
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

	label[for='email'],
	label[for='password'] {
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

	.heading {
		font-family: 'Reddit Mono', monospace;
		font-weight: 700;
		font-size: 30px;
		align-items: center;
	}
	.navi {
		background-color: #0f0c29;
	}
	.contactnav {
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
	button[type='otpgen']{
		width: 40%;
		padding: 12px;
		height: min-content;
		align-content: end;
		border-radius: 5px;
		/* size: 1px; */
		border: none;
		background-color: #007bff;
		color: #fff;
		cursor: pointer;
		font-size: 20px;
		transition: background-color 0.3s ease;
		font-family: 'Reddit Mono', monospace;
		font-weight: 400;
	}
	.otpbutton {
		font-family: 'Reddit Mono', monospace;
	}

	button[type='button'] {
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

	button[type='button']:hover {
		background-color: #0056b3;
	}
</style>
