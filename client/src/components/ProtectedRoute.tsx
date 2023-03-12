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
        allowedRoles: [1],
      },
      {
        path: "/equipmentmanager",
        allowedRoles: [2, 1],
      },
      {
        path: "/settings",
        allowedRoles: [1, 2],
      },
    ];
    const userLoggedInValue = sessionStorage.getItem("loggedIn");
    const userRole = sessionStorage.getItem("userRole");

    if (!userLoggedInValue || userLoggedInValue === "undefined") {
      setIsLoggedIn(false);
      return navigate("/login");
    }

    setIsLoggedIn(true);

    const allowedRoles =
      routes.find((route) => route.path === location.pathname)?.allowedRoles ||
      [];
    if (!allowedRoles.includes(Number(userRole))) {
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
