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
import Forum from "@/Pages/Forum";
import AllClasses from "@/Pages/AllClasses";
import BeTrainer from "@/Pages/BeTrainer";
import TrainerDetails from "@/Pages/TrainerDetailsPage";



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
        element: <AllTrainers></AllTrainers>
      },
      {
        path: '/betrainer',
        element: <PrivateRoute><BeTrainer></BeTrainer></PrivateRoute>

      },
      {
        path: '/forums',
        Component: Forum
      },
      {
        path: 'classes',
        Component: AllClasses
      },
      {
        path: '/trainerdetails/:id',
        Component: TrainerDetails
      }
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
      { path: "newsletter", element: <AdminRoute><AllNewsletters /></AdminRoute> },
      { path: "trainers", element: <AdminRoute><AllTrainer /></AdminRoute> },
      { path: "applied-trainers", element: <AdminRoute><AppliedTrainers /></AdminRoute> },
      { path: "balance", element: <AdminRoute><Balance /></AdminRoute> },
      { path: "add-class", element: <AdminRoute> <AddClass /></AdminRoute> },

      // Trainer
      { path: "manage-slots", element: <TrainerRoute><ManageSlots /></TrainerRoute> },
      { path: "add-slot", element: <TrainerRoute><AddSlot /></TrainerRoute> },

      // // Shared
      { path: "add-forum", element: <AddForum />}, 

      // // Member
      { path: "activity-log", element: <ActivityLog /> },
      { path: "profile", element:<Profile />},
      { path: "booked-trainer", element: <BookedTrainer /> },
    ],
  },
])

export default router
