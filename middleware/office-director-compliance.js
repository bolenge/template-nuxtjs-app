export default async function ({ $auth, redirect, store }) {
  const user = $auth.state.user

  if (user) {
    if (user.admin && user.admin.fonction) {
      const admin = user.admin
      const isOfficeDirector = admin.fonction.name === 'Directrice Bureau' || admin.fonction.name === 'Directeur Bureau'

      if (isOfficeDirector || admin.fonction.name === 'Conformité') {
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