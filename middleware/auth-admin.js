export default async function ({ $auth, redirect, store }) {
  const user = $auth.state.user

  if (user && user.role.slug === 'super-admin') {
    // Some thing
  } else {
    redirect('/')
  }
}