<script>
    let showRegistrationSubmenu = false;
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Reddit+Mono:wght@200..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

    .bi {
        margin-right: 8px;
    }
    .sidebar {
        min-width: 200px;
        max-width: 250px;
        min-height: 100vh;
        background : linear-gradient(to bottom, #0f0c29, #302b63, #24243e)  !important;
       
    }
    .sidebar.collapsed {
        min-width: 80px;
        max-width: 80px;
    }
    .sidebar .nav-link {
        width: 100%;
        text-align: left;
        color: white !important;/* Set text color to white */
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
    .fs-4{
        color: #f8f9fa;
        align-items: center;
        font-family: 'Reddit Mono', monospace;
    }
</style>

<div class={`d-flex flex-column flex-shrink-0 p-3 bg-light sidebar`} style="width: 280px;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <span class="fs-4">Dashboard</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
            <a class="nav-link" href="#" aria-current="page" on:click={() => showRegistrationSubmenu = !showRegistrationSubmenu}>
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
    <hr>
    <div class="dropdown">
        <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="user-image-url.jpg" alt="" class="user-img">
        </a>
        <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser">
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Sign out</a></li>
        </ul>
    </div>
</div>