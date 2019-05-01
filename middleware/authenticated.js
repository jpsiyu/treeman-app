export default function (context) {
  const { store, redirect, route} = context
  if (!store.state.tokenStr) {
    redirect(`/login?from=${route.path}`)
  }
}
