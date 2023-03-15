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
        allowedRoles: [0],
      },
      {
        path: "/equipmentmanager",
        allowedRoles: [1],
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
      routes.find((route) => route.path === location.pathname)?.allowedRoles ||
      [];
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
