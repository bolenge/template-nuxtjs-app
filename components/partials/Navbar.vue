<template>
    <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <a class="navbar-brand brand-logo" href="index.html"><strong>One Touch</strong></a>
            <a class="navbar-brand brand-logo-mini" href="index.html"><img src="images/logo-mini.svg" alt="logo"/></a>
            <button class="navbar-toggler navbar-toggler align-self-center d-none d-lg-flex" type="button" data-toggle="minimize">
                <span class="typcn typcn-th-menu"></span>
            </button>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
            <ul class="navbar-nav mr-lg-2">
                <li class="nav-item dropdown  d-flex">
                    <a class="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center" id="notificationDropdown" href="#" data-toggle="dropdown">
                    <i class="typcn typcn-bell mr-0"></i>
                    <span class="count bg-danger">2</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                    <p class="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
                    <a class="dropdown-item preview-item">
                        <div class="preview-thumbnail">
                        <div class="preview-icon bg-success">
                            <i class="typcn typcn-info-large mx-0"></i>
                        </div>
                        </div>
                        <div class="preview-item-content">
                        <h6 class="preview-subject font-weight-normal">Application Error</h6>
                        <p class="font-weight-light small-text mb-0">
                            Just now
                        </p>
                        </div>
                    </a>
                    <a class="dropdown-item preview-item">
                        <div class="preview-thumbnail">
                        <div class="preview-icon bg-warning">
                            <i class="typcn typcn-cog mx-0"></i>
                        </div>
                        </div>
                        <div class="preview-item-content">
                        <h6 class="preview-subject font-weight-normal">Settings</h6>
                        <p class="font-weight-light small-text mb-0">
                            Private message
                        </p>
                        </div>
                    </a>
                    <a class="dropdown-item preview-item">
                        <div class="preview-thumbnail">
                        <div class="preview-icon bg-info">
                            <i class="typcn typcn-user-outline mx-0"></i>
                        </div>
                        </div>
                        <div class="preview-item-content">
                        <h6 class="preview-subject font-weight-normal">New user registration</h6>
                        <p class="font-weight-light small-text mb-0">
                            2 days ago
                        </p>
                        </div>
                    </a>
                    </div>
                </li>
                <li class="nav-item nav-profile dropdown">
                    <a class="nav-link dropdown-toggle  pl-0 pr-0" href="#" data-toggle="dropdown" id="profileDropdown">
                        <i class="typcn typcn-user-outline mr-0"></i>
                        <span class="nav-profile-name">Evan Morales</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                        <a class="dropdown-item">
                            <i class="typcn typcn-user text-primary"></i>
                            Profile
                        </a>
                        <a class="dropdown-item">
                            <i class="typcn typcn-power text-primary"></i>
                            Déconnexion
                        </a>
                    </div>
                </li>
            </ul>
            <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span class="typcn typcn-th-menu"></span>
            </button>
        </div>
    </nav>
</template>

<script>
export default {
  
}
</script>