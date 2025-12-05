import { useEffect } from 'react'
import { Toaster } from './components/ui/sonner'
import RouterTree from './routers'
import { useAuthStore } from './features/_authentication/data/store'

const App = () => {
  useEffect(() => {
    const { auth, signinWithSocialMediaSuccess } = useAuthStore.getState()
    if (!auth) signinWithSocialMediaSuccess()
  }, [])
  return (
    <>
      <RouterTree />
      <Toaster />
    </>
  )
}

export default App
