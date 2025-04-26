import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App'
import SignUp from "./pages/SignUp"
import SignIn from "./pages/signIn"
import Test from "./pages/Test"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path:"/signUp",
    element:<SignUp />,
  },
  {
    path:"/test",
    element:<Test/>
  },
  {
    path:"/signIn",
    element:<SignIn/>
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode >
    <RouterProvider router={router} />
  </StrictMode>,
)
