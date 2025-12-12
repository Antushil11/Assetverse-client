import { createBrowserRouter } from "react-router-dom"; // make sure it's react-router-dom
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
import ErrorPage from "../pages/ErrorPage";
import HrPrivateRote from "./HrPrivateRote";
import HrRegister from "../pages/Auth/Login/Register/HrRegister";
import PaymentSuccess from "../pages/HRManager/PaymentSuccess";
import PaymentCancelled from "../pages/HRManager/PaymentCancelled";
import PaymentHistory from "../pages/HRManager/PaymentHistory";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/Hrregister",
        element: <HrRegister></HrRegister>,
      },
    ],
  },
  {
    path: "HR-Manager",
    element: (
      <HrPrivateRote>
        <DashbordLayout />
      </HrPrivateRote>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "Add-an-Asset",
        element: <AddanAsset />,
      },
      {
        path: "Asset-List",
        element: <AssetList />,
      },
      {
        path: "Upgrade-Package",
        element: <UpgradePackage />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "payment-cancel",
        element: <PaymentCancelled></PaymentCancelled>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>
      },
    ],
  },
  {
    path: "Employee",
    element: (
      <PrivateRoute>
        <DashbordLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "My-Assets",
        element: <MyAssets />,
      },
    ],
  },
]);
