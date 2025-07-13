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
import AdminRoute from "@/Provider/AdminRoute";
import TrainerRoute from "@/Provider/TrainerRoute";
import Loader from "@/Shared/Loader";


const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayOut,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        hydrateFallbackElement: <Loader></Loader>,
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
      { path: "newsletter", element: <PrivateRoute><AdminRoute><AllNewsletters /></AdminRoute></PrivateRoute> },
      { path: "trainers", element: <PrivateRoute><AdminRoute><AllTrainer /></AdminRoute></PrivateRoute> },
      { path: "applied-trainers", element: <PrivateRoute><AdminRoute><AppliedTrainers /></AdminRoute></PrivateRoute> },
      { path: "balance", element: <PrivateRoute><AdminRoute><Balance /></AdminRoute></PrivateRoute> },
      { path: "add-class", element: <PrivateRoute><AdminRoute> <AddClass /></AdminRoute></PrivateRoute> },

      // Trainer
      { path: "manage-slots", element: <PrivateRoute><TrainerRoute><ManageSlots /></TrainerRoute></PrivateRoute> },
      { path: "add-slot", element: <PrivateRoute><TrainerRoute><AddSlot /></TrainerRoute></PrivateRoute> },

      // // Shared
      { path: "add-forum", element: <PrivateRoute><AddForum /></PrivateRoute> }, // Example

      // // Member
      { path: "activity-log", element: <PrivateRoute><ActivityLog /></PrivateRoute> },
      { path: "profile", element: <PrivateRoute><Profile /></PrivateRoute> },
      { path: "booked-trainer", element: <PrivateRoute><BookedTrainer /></PrivateRoute> },
    ],
  },
])

export default router
