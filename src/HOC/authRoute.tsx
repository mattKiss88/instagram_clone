// import React from "react";
// import { Route, useLocation, useNavigate } from "react-router-dom";
// import { connect } from "react-redux";

// const AuthenticatedRoute = ({ component: Component, auth, ...rest }: any) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   if (!auth) {
//     // Redirect to the login page
//     navigate("/login", { replace: true, state: { from: location } });
//     return null;
//   }

//   return <Route {...rest} element={<Component />} />;
// };

// const mapStateToProps = (state: any) => ({
//   auth: state.userAccount.token !== null, // Replace with your own auth checking logic
// });

// export default connect(mapStateToProps)(AuthenticatedRoute);

import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import React, { ReactElement, useEffect } from "react";
import { authToken } from "../Redux/userAccountSlice";

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useSelector(authToken); // Replace with your own auth checking logic
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth) {
      navigate("/login", { replace: true, state: { from: location } });
    }
  }, [auth, navigate, location]);

  return auth ? children : null;
};

export default ProtectedRoute;
