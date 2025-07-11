import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import RootLayOut from "../LayOuts/RootLayOut";


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
       ]

  }
])

export default router
    