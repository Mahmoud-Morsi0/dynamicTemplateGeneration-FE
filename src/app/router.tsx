import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import UploadInspect from '../pages/UploadInspect'
import RenderPage from '../pages/RenderPage'
import Docs from '../pages/Docs'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: 'register',
        element: <RegisterForm />,
      },
      {
        path: 'dashboard',
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      },
      {
        path: 'upload',
        element: <ProtectedRoute><UploadInspect /></ProtectedRoute>,
      },
      {
        path: 'render',
        element: <ProtectedRoute><RenderPage /></ProtectedRoute>,
      },
      {
        path: 'docs',
        element: <Docs />,
      },
    ],
  },
])
