export const state = () => ({
  page_active: 'home',
  nav_link_active: ''
})

export const mutations = {
  CHANGE_PAGE_ACTIVE(State, page) {
    State.page_active = page
  },
  CHANGE_NAV_LINK_ACTIVE(State, navLink) {
    State.nav_link_active = navLink
  }
}
