<template>
    <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <nuxt-link class="navbar-brand brand-logo" to="/admin"><img src="/images/one-touch-logo.png" alt="logo"/></nuxt-link>
            <nuxt-link class="navbar-brand brand-logo-mini" to="/"><img src="/images/logo-one-touch-mobile.png" alt="logo"/></nuxt-link>
            <button class="navbar-toggler navbar-toggler align-self-center d-none d-lg-none" type="button" data-toggle="minimize">
                <span class="typcn typcn-th-menu"></span>
            </button>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
            <ul class="navbar-nav mr-lg-2">
                <li class="nav-item nav-profile dropdown">
                    <a class="nav-link dropdown-toggle  pl-0 pr-0" href="#" data-toggle="dropdown" id="profileDropdown">
                        <img
                            :src="userAvatar ? `${BASE_PATH_USER_PICTURES}/${userAvatar}` : DEFAULT_USER_AVATAR"
                            alt="Current user avatar"
                            style="margin-bottom: -9px;"
                        />
                        <span class="nav-profile-name mb-0 font-weight-bold">{{ $auth.user.name }}</span><br>
                        <p
                            class="sidebar-designation"
                            style="margin-bottom: -2px;margin-top: -8px;margin-left: 2.5rem;"
                        >
                            {{ $auth.user.role.name }}
                            {{ $auth.user.admin.fonction ? ' - ' + $auth.user.admin.fonction.name : '' }}
                        </p>
                    </a>
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
    computed: {
        userAvatar() {
            return this.$auth.user.avatar
        }
    }
}
</script>