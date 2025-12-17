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
import MyTeam from "../pages/Employee/MyTeam";
import AllRequests from "../pages/HRManager/AllRequests";
import UserManagement from "../pages/HRManager/UserManagement";
import AdminRoute from "./AdminRoute";
import RequestanAsset from "../pages/Employee/RequestanAsset";
import EmployeeRouter from "./EmployeeRouter";
import ProfilePage from "../pages/Employee/ProfilePage";




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
        element: <AdminRoute><AddanAsset /></AdminRoute>,
      },
      {
        path: "Asset-List",
        element: <AdminRoute><AssetList /></AdminRoute>,
      },
      {
        path: "All-Requests",
        element: <AdminRoute><AllRequests></AllRequests></AdminRoute>
      },
      {
        path: "Upgrade-Package",
        element: <AdminRoute><UpgradePackage /></AdminRoute>
        
      },
      {
        path: "payment-success",
        element: <AdminRoute><PaymentSuccess></PaymentSuccess></AdminRoute>
      },
      {
        path: "payment-cancel",
        element: <AdminRoute><PaymentCancelled></PaymentCancelled></AdminRoute>
      },
      {
        path: "payment-history",
        element: <AdminRoute><PaymentHistory></PaymentHistory></AdminRoute>
      },
      {
        path: "User-Management",
        element: <AdminRoute><UserManagement></UserManagement></AdminRoute>
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
        element: <EmployeeRouter><MyAssets /></EmployeeRouter>,
      },
      {
        path: "My-Team",
        element: <EmployeeRouter><MyTeam></MyTeam></EmployeeRouter>,
      },
      {
        path:"Request-an-Asset",
        element:<EmployeeRouter><RequestanAsset></RequestanAsset></EmployeeRouter>
      },
      {
        path:"Profile-Page",
        element:<EmployeeRouter><ProfilePage></ProfilePage></EmployeeRouter>
      }
    ],
  },
]);
