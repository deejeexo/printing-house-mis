import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IProtectedRoute } from "./interfaces/IProtectedRoute";

function ProtectedRoute(props: IProtectedRoute) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkIfUserLoggedIn = useCallback(() => {
    const routes = [
      {
        path: "/news",
        allowedRoles: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      {
        path: "/neworder",
        allowedRoles: [0],
      },
      {
        path: "/orders",
        allowedRoles: [0],
      },
      {
        path: "/ordersmanager",
        allowedRoles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      {
        path: "/statistics",
        allowedRoles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      {
        path: "/employeesmanager",
        allowedRoles: [1],
      },
      {
        path: "/equipmentmanager",
        allowedRoles: [1],
      },
      {
        path: "/consumablemanager",
        allowedRoles: [1],
      },
      {
        path: "/ordersmanager",
        allowedRoles: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      {
        path: "/usersettings",
        allowedRoles: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    ];
    const userLoggedInValue = sessionStorage.getItem("loggedIn");
    const position = sessionStorage.getItem("position");

    if (!userLoggedInValue || userLoggedInValue === "undefined") {
      setIsLoggedIn(false);
      return navigate("/login");
    }

    setIsLoggedIn(true);

    const allowedRoles =
      routes.find(
        (route) => route.path === `/${location.pathname.split("/")[1]}`
      )?.allowedRoles || [];
    if (!allowedRoles.includes(Number(position))) {
      return navigate("/accessdenied");
    }
  }, [navigate, location.pathname, setIsLoggedIn]);

  useEffect(() => {
    if (props.disabled === false) {
      checkIfUserLoggedIn();
    } else {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, checkIfUserLoggedIn, props.disabled]);

  return <>{isLoggedIn ? props.children : null}</>;
}

export default ProtectedRoute;
