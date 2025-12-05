import { useRoutes } from 'react-router-dom'

import SigninPage from '@/features/_authentication/pages/SigninPage'
import SignupPage from '@/features/_authentication/pages/SignupPage'
import ForgotPasswordPage from '@/features/_authentication/pages/ForgotPasswordPage'
import ResetPasswordPage from '@/features/_authentication/pages/ResetPasswordPage'
import OTPPage from '@/features/_authentication/pages/OTPPage'
import HomePage from '@/pages/home'
import DataTablePage from '@/pages/data-table'
import { TaskProvider } from '@/features/task/data/context'
import DndKitPage from '@/pages/dnd-kit'

const RouterTree = () => {
  const routers = useRoutes([
    {
      path: '/signin',
      element: <SigninPage />,
    },
    {
      path: '/signup',
      element: <SignupPage />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPasswordPage />,
    },
    {
      path: '/reset-password',
      element: <ResetPasswordPage />,
    },
    {
      path: '/otp',
      element: <OTPPage />,
    },
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: `data-table`,
      element: (
        <TaskProvider>
          <DataTablePage />
        </TaskProvider>
      ),
    },
    {
      path: '/dnd-kit',
      element: <DndKitPage />,
    },
  ])
  return routers
}

export default RouterTree
