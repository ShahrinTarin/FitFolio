import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import RootLayOut from "../LayOuts/RootLayOut";
import Login from "../Pages/Login";


const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayOut,
    // errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        // hydrateFallbackElement: <Loader></Loader>,
        Component: Home,

      },
      {
        path: '/login',
        Component: Login,
      },
      // {
      //   path: '/register',
      //   Component: Register,
      // },
    ]

  }
])

export default router
