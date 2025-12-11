import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Auth/Login/Register/Register";
import Login from "../pages/Auth/Login/Login";
import PrivateRoute from "./PrivateRoute";
import AddanAsset from "../pages/HRManager/AddanAsset";
import DashbordLayout from "../layouts/DashbordLayout";
import AssetList from "../pages/HRManager/AssetList";
import UpgradePackage from "../pages/HRManager/UpgradePackage";
import MyAssets from "../pages/Employee/MyAssets";




export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },

      
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
  {
    path: "HR-Manager",
    element: (
      <PrivateRoute>
        <DashbordLayout></DashbordLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "Add-an-Asset",
        element:<AddanAsset></AddanAsset>
       
      },
      {
        path: "Asset-List",
        element:<AssetList></AssetList>
       
      },
      {
        path:'Upgrade-Package',
        element:<UpgradePackage></UpgradePackage>

      },
    ],
  },

  {
    path:'Employee',
    element:<PrivateRoute><DashbordLayout></DashbordLayout></PrivateRoute>,
    children:[
      {
        path:'My-Assets',
        element:<MyAssets></MyAssets>
      }
    ]
  }
]);
