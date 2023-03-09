import { useCallback, useEffect, useState } from "react";
import { IProtectedRoute } from "./interfaces/IProtectedRoute";

function ProtectedRoute({ children }: IProtectedRoute) {
  // const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkIfUserLoggedIn = useCallback(() => {
    const userLoggedInValue = sessionStorage.getItem("loggedIn");
    if (!userLoggedInValue || userLoggedInValue === "undefined") {
      setIsLoggedIn(false);
      // return navigate("/login");
    }
    setIsLoggedIn(true);
  }, [setIsLoggedIn]); //navigate

  useEffect(() => {
    checkIfUserLoggedIn();
  }, [isLoggedIn, checkIfUserLoggedIn]);
  return <>{isLoggedIn ? children : null}</>;
}

export default ProtectedRoute;
