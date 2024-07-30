<!-- <script>
	import { onMount } from 'svelte';
	import { auth_base_url } from '../stores/constants';
	export let showRegistrationSubmenu = false;

	const handleLogout = async () => {
		try {
			const response = await fetch($auth_base_url + '/logout', {
				method: 'POST',
				credentials: 'include'
			});
			if (response.ok) {
				window.location.href = '/login';
			} else {
				console.error('Logout failed');
			}
		} catch (error) {
			console.error('Error during logout:', error);
		}
	};
</script>

<div class="d-flex">
	<div class={`d-flex flex-column flex-shrink-0 p-3 bg-light sidebar`} style="width: 280px;">
		<a
			href="/"
			class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
		>
			<span class="fs-4">Dashboard</span>
		</a>
		<hr />
		<ul class="nav nav-pills flex-column mb-auto">
			<li class="nav-item">
				<a
					class="nav-link"
					href="#"
					aria-current="page"
					on:click={() => (showRegistrationSubmenu = !showRegistrationSubmenu)}
				>
					<i class="bi bi-person-plus"></i>
					Registration
					<i class={`bi ${showRegistrationSubmenu ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
				</a>
				<ul class={`nav flex-column submenu collapse ${showRegistrationSubmenu ? 'show' : ''}`}>
					<li class="nav-item">
						<a href="/dashboard/registration/individual" class="nav-link">
							<i class="bi bi-person"></i> Individual
						</a>
					</li>
					<li class="nav-item">
						<a href="/dashboard/registration/bulk" class="nav-link">
							<i class="bi bi-people"></i> Bulk
						</a>
					</li>
				</ul>
			</li>
			<li>
				<a href="/dashboard/reports" class="nav-link link-dark">
					<i class="bi bi-table"></i>
					Candidates
				</a>
			</li>
			<li>
				<a href="/dashboard/user-management" class="nav-link link-dark">
					<i class="bi bi-graph-up"></i>
					User Management
				</a>
			</li>
			<li>
				<a href="/dashboard/company-management" class="nav-link link-dark">
					<i class="bi bi-graph-up"></i>
					Company Management
				</a>
			</li>
			<li>
                <a href="/dashboard/stats" class="nav-link link-dark">
                    <i class="bi bi-graph-up"></i>
                    Stats/Analytics
                </a>
            </li>
            <li>
                <a href="/dashboard/tests" class="nav-link link-dark">
                    <i class="bi bi-graph-up"></i>
                    Tests
                </a>
            </li>
            <li>
                <a href="/dashboard/exams" class="nav-link link-dark">
                    <i class="bi bi-graph-up"></i>
                    Exams
                </a>
            </li>
		</ul>
		<hr />
		<button class="btn btn-logout" on:click={handleLogout}>Logout</button>
	</div>
	<div class="content">
		<slot />
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Reddit+Mono:wght@200..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

	.bi {
		margin-right: 8px;
	}
	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		min-width: 200px;
		max-width: 250px;
		min-height: 100vh;
		background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e) !important;
		z-index: 1000;
		overflow-y: auto;
	}
	.sidebar.collapsed {
		min-width: 80px;
		max-width: 80px;
	}
	.sidebar .nav-link {
		width: 100%;
		text-align: left;
		color: white !important; /* Set text color to white */
		font-family: 'Reddit Mono', monospace;
	}
	.sidebar .nav-link:hover {
		background-color: black;
	}
	.user-img {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}
	.submenu .nav-link {
		padding-left: 2rem;
		color: #f8f9fa;
		font-family: 'Reddit Mono', monospace;
	}
	.fs-4 {
		color: #f8f9fa;
		align-items: center;
		font-family: 'Reddit Mono', monospace;
	}
	.btn-logout {
		background: rgba(255, 255, 255, 0.5);
		border: 1px solid white;
		color: black;
		width: 50%;
		padding: 10px;
		text-align: center;
		cursor: pointer;
		font-size: 16px;
		border-radius: 5px;
		transition: background 0.3s ease;
	}

	.btn-logout:hover {
		background: rgba(255, 255, 255, 0.7);
	}
	.content {
		margin-left: 200px; /* Adjust based on sidebar width */
		padding: 20px;
	}
</style> -->












<script>
	import { onMount } from 'svelte';
	import { auth_base_url } from '../stores/constants';
	export let showRegistrationSubmenu = false;
	let showSidebar = false;

	const handleLogout = async () => {
		try {
			const response = await fetch($auth_base_url + '/logout', {
				method: 'POST',
				credentials: 'include'
			});
			if (response.ok) {
				window.location.href = '/login';
			} else {
				console.error('Logout failed');
			}
		} catch (error) {
			console.error('Error during logout:', error);
		}
	};

	const toggleSidebar = () => {
		showSidebar = !showSidebar;
	};

	const closeSidebar = () => {
		showSidebar = false;
	};
</script>

<div class="d-flex">
	<!-- Toggle button for mobile devices -->
	<button class="btn-toggle-sidebar" on:click={toggleSidebar} class:hide={showSidebar}>
		<i class="bi bi-list"></i>
	</button>

	{#if showSidebar}
		<!-- Overlay for clicking outside the sidebar to close it -->
		<div class="overlay" on:click={closeSidebar}></div>
	{/if}

	<div class={`d-flex flex-column flex-shrink-0 p-3 bg-light sidebar ${showSidebar ? 'show' : ''}`}>
		<a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
			<span class="fs-4">Dashboard</span>
		</a>
		<hr />
		<ul class="nav nav-pills flex-column mb-auto">
			<li class="nav-item">
				<a class="nav-link" href="#" aria-current="page" on:click={() => { showRegistrationSubmenu = !showRegistrationSubmenu; }}>
					<i class="bi bi-person-plus"></i>
					Registration
					<i class={`bi ${showRegistrationSubmenu ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
				</a>
				<ul class={`nav flex-column submenu collapse ${showRegistrationSubmenu ? 'show' : ''}`}>
					<li class="nav-item">
						<a href="/dashboard/registration/individual" class="nav-link" on:click={closeSidebar}>
							<i class="bi bi-person"></i> Individual
						</a>
					</li>
					<li class="nav-item">
						<a href="/dashboard/registration/bulk" class="nav-link" on:click={closeSidebar}>
							<i class="bi bi-people"></i> Bulk
						</a>
					</li>
				</ul>
			</li>
			<li>
				<a href="/dashboard/reports" class="nav-link link-dark" on:click={closeSidebar}>
					<i class="bi bi-table"></i>
					Candidates
				</a>
			</li>
			<li>
				<a href="/dashboard/user-management" class="nav-link link-dark" on:click={closeSidebar}>
					<i class="bi bi-graph-up"></i>
					User Management
				</a>
			</li>
			<li>
				<a href="/dashboard/company-management" class="nav-link link-dark" on:click={closeSidebar}>
					<i class="bi bi-graph-up"></i>
					Company Management
				</a>
			</li>
		</ul>
		<hr />
		<a class="nav-link link-dark logout-link" on:click={handleLogout} style="cursor: pointer;">
			<i class="bi bi-box-arrow-right"></i>
			Logout
		</a>
	</div>
	<div class="content">
		<slot />
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Reddit+Mono:wght@200..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

	.bi {
		margin-right: 8px;
	}
	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		width: 280px;
		min-height: 100vh;
		background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e) !important;
		z-index: 1000;
		overflow-y: auto;
		transition: transform 0.3s ease-in-out;
		transform: translateX(0); /* Ensure the sidebar is visible by default */
	}
	.sidebar.show {
		transform: translateX(0); /* No translation when showing */
	}
	.sidebar.hidden {
		transform: translateX(-100%); /* Hide sidebar by translating out of view */
	}
	.sidebar .nav-link {
		width: 100%;
		text-align: left;
		color: white !important; /* Set text color to white */
		font-family: 'Reddit Mono', monospace;
	}
	.sidebar .nav-link:hover {
		background-color: black;
	}
	.user-img {
		width: 60px;
		height: 60px;
		border-radius: 50%;
	}
	.submenu .nav-link {
		padding-left: 2rem;
		color: #f8f9fa;
		font-family: 'Reddit Mono', monospace;
	}
	.fs-4 {
		color: #f8f9fa;
		align-items: center;
		font-family: 'Reddit Mono', monospace;
	}
	.logout-link {
		background: transparent !important;
		color: white !important;
		font-family: 'Reddit Mono', monospace;
	}
	.logout-link:hover {
		background-color: black !important;
	}
	.content {
		margin-left: 280px; /* Adjust based on sidebar width */
		padding: 20px;
	}
	@media (max-width: 768px) {
		.sidebar {
			width: 75%; /* 3/4th of the screen */
			transform: translateX(-100%); /* Hide sidebar by default on mobile */
		}
		.sidebar.show {
			transform: translateX(0); /* Show sidebar when toggled */
		}
		.content {
			margin-left: 0;
		}
		.btn-toggle-sidebar {
			display: block;
			position: fixed;
			top: 10px;
			left: 10px;
			z-index: 1100;
			background: transparent;
			border: none;
			color: rgb(12, 12, 12);
			font-size: 1.5rem;
			cursor: pointer;
		}
		.btn-toggle-sidebar.hide {
			display: none;
		}
		.overlay {
			position: fixed;
			top: 0;
			left: 75%; /* This will cover the remaining 1/4th of the screen */
			width: 25%; /* Remaining 1/4th of the screen */
			height: 100%;
			background: rgba(0, 0, 0, 0.5);
			z-index: 999;
		}
	}
	@media (min-width: 769px) {
		.sidebar {
			transform: translateX(0); /* Ensure sidebar is visible by default on larger screens */
		}
		.btn-toggle-sidebar {
			display: none;
		}
		.overlay {
			display: none; /* No overlay on larger screens */
		}
	}
</style>

