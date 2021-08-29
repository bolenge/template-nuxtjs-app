export default async function ({ $auth, redirect, store }) {
  const user = $auth.state.user
  const COMPLIANCE = 1
  const OFFICE_MANAGER = 2

  if (user) {
    if (user.admin && user.admin.fonction) {
      const admin = user.admin

      if (admin.fonction.validation_level_id === OFFICE_MANAGER || admin.fonction.validation_level_id === COMPLIANCE) {
        //  Some thing
      }else {
        redirect('/')
      }
    }else {
      redirect('/')
    }
  } else {
    redirect('/')
  }
}