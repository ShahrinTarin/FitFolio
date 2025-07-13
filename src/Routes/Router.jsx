import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import RootLayOut from "../LayOuts/RootLayOut";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AllTrainers from "../Pages/AllTrainers";
import DashboardLayout from "@/LayOuts/DashBoardLayout";
import PrivateRoute from "@/Provider/PrivateRoute";
import ActivityLog from "@/DashboardPages/ActivityLog";
import AllNewsletters from "@/DashboardPages/AllNewsletters";
import AllTrainer from "@/DashboardPages/AllTrainer";
import AddClass from "@/DashboardPages/AddClass";
import AppliedTrainers from "@/DashboardPages/AppliedTrainers";
import Balance from "@/DashboardPages/Balance";
import Profile from "@/DashboardPages/Profile";
import BookedTrainer from "@/DashboardPages/BookedTrainer";
import AddForum from "@/DashboardPages/AddForum";
import ManageSlots from "@/DashboardPages/ManageSlots";
import AddSlot from "@/DashboardPages/AddSlot";
import ErrorPage from "@/Pages/ErrorPage";


const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayOut,
    errorElement: <ErrorPage></ErrorPage>,
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
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/alltrainers',
        Component: AllTrainers,
      },
    ]

  },
  
  {
    path: "/dashboard",
    errorElement: <ErrorPage></ErrorPage>,
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Admin
      { path: "newsletter", element: <AllNewsletters /> },
      { path: "trainers", element: <AllTrainer /> },
      { path: "applied-trainers", element: <AppliedTrainers /> },
      { path: "balance", element: <Balance /> },
      { path: "add-class", element: <AddClass /> },

      // Trainer
      { path: "manage-slots", element: <ManageSlots /> },
      { path: "add-slot", element: <AddSlot /> },

      // // Shared
      { path: "add-forum", element: <AddForum/> }, // Example

      // // Member
      { path: "activity-log", element: <ActivityLog /> },
      { path: "profile", element: <Profile /> },
      { path: "booked-trainer", element: <BookedTrainer /> },
    ],
  },
])

export default router
