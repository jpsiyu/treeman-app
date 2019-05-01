export default function ({ store, redirect }) {
  if (!store.state.tokenStr) {
    redirect('/login')
  }
}
