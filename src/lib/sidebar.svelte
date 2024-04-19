<script>
    let showRegistrationSubmenu = false;
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Reddit+Mono:wght@200..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

    .bi {
        margin-right: 8px;
    }
    .sidebar {
        min-width: 250px;
        max-width: 250px;
        min-height: 100vh;
        background : linear-gradient(to bottom, #0f0c29, #302b63, #24243e)  !important;
        border: 2px solid #ffffff;
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
    /* Style the dropdown button */
.dropbtn {
  background-color:#302b63;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  font-family: 'Reddit Mono', monospace;
}

/* Position the dropdown content (hidden by default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  right: 0;
  bottom: 100%;
  font-family: 'Reddit Mono', monospace;
}

/* Style links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 5px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #f1f1f1;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color:  black;
}
.dropbtn {
    border: 2px solid white; /* Add white outline */
    color: white; /* Change text color to white */
    background-color: transparent; /* Make background transparent */
    padding: 10px 20px; /* Adjust padding as needed */
    font-size: 16px; /* Adjust font size as needed */
    cursor: pointer;
}

.dropbtn:hover {
    background-color: rgba(255, 255, 255, 0.1); /* Add hover effect with semi-transparent white */
}

/* Additional styling for dropdown content */
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 200px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    z-index: 1;
}

.dropdown-content a {
    color: black;
    padding: 8px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {
    background-color: #f1f1f1;
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
                Reports
            </a>
        </li>
        <li>
            <a href="/dashboard/stats" class="nav-link link-dark">
                <i class="bi bi-graph-up"></i>
                Stats/Analytics
            </a>
        </li>
    </ul>
    <hr>
    <div class="dropdown">
        <button class="dropbtn"><i class="bi bi-menu-button"></i>Menu</button>
        <div class="dropdown-content">
          <a href="#">Settings</a>
          <a href="#">Profile</a>
          <a href="/login">Sign Out</a>
        </div>
      </div>
</div>  




  