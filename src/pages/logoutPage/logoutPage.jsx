import { useContext, useEffect } from "react";
import { LoggedInContext } from "../../context/loggedInContext";
import { useNavigate } from "react-router-dom";
import UserSessionHelper from "../../helpers/userSessionHelper";
function LogoutPage() {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoggedInContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(false);
    UserSessionHelper.clearStorage();
    if (isLoggedIn) {
      navigate("/");
    }
  });

  return <></>;
}
export default LogoutPage;
