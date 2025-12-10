import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Auth/Login/Register/Register";
import Login from "../pages/Auth/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Employee from "../pages/Employee/Employee";
import AddanAsset from "../pages/HRManager/AddanAsset";
import Upgrade from "../pages/HRManager/Upgrade";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path:'/employee',
        element:<PrivateRoute><Employee></Employee></PrivateRoute>
      },
      {
        path:'/upgrade',
        element:<PrivateRoute><Upgrade></Upgrade></PrivateRoute>
      },
      {
        path:'/Add-an-Asset',
        element:<PrivateRoute><AddanAsset></AddanAsset></PrivateRoute>

      }
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
       
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
]);
