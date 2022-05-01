import React, { Suspense, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "./Navigation";
import NavBar from "./NavBar";

import Loader from "../Loader";
import routes from "../../../routes";
import Aux from "../../../hoc/_Aux";
import * as actionTypes from "../../../store/actions";

import "./app.scss";

const AdminLayout = (props) => {
  const dispatch = useDispatch();
  const isAuthed = localStorage.getItem("isAuthed");
  const isAdmin = localStorage.getItem("isAdmin");
  // const isAuthed = true;

  const state = useSelector((state) => state);

  const { defaultPath, collapseMenu, layout, currentRole } = state;

  const roles = {
    ADMIN: "ADMIN",
    PATIENT: "PATIENT",
  };

  useEffect(() => {
    if (
      props.windowWidth > 992 &&
      props.windowWidth <= 1024 &&
      layout !== "horizontal"
    ) {
      dispatch({ type: actionTypes.COLLAPSE_MENU });
    }
  }, []);

  const mobileOutClickHandler = () => {
    if (props.windowWidth < 992 && collapseMenu) {
      dispatch({ type: actionTypes.COLLAPSE_MENU });
    }
  };

  const ProtectedRoute = ({ component: Component, ...rest }) => {
    var isAuthenticated = true;
    return (
      <Route
        {...rest}
        render={(props) => {
          // If the user is authed render the component
          if (isAuthenticated) {
            return <Component {...props} />;
          } else {
            // If they are not then we need to redirect to a public page

            if (currentRole === roles.ADMIN) {
              return <Redirect to={"/admin"} />;
            } else {
              return <Redirect to={"/auth/register"} />;
            }
          }
        }}
      />
    );
  };

  const menu = (role) => {
    var routesLinks = routes.filter((route) => route.permission === role);

    const menuLinks = routesLinks.map((route, index) => {
      return route.component ? (
        <ProtectedRoute
          component={route.component}
          key={index}
          path={route.path}
          exact={route.exact}
          name={route.name}
          // render={(props) => <route.component {...props} />}
        />
      ) : null;
    });
    return menuLinks;
  };

  return (
    <Aux>
      <Navigation isAdmin={isAdmin} />
      <NavBar />
      <div
        className="pcoded-main-container"
        onClick={() => mobileOutClickHandler}
      >
        <div className="pcoded-wrapper">
          <div className="pcoded-content">
            <div className="pcoded-inner-content">
              <div className="main-body">
                <div className="page-wrapper">
                  <Suspense fallback={<Loader />}>
                    <Switch>
                      {currentRole === roles.ADMIN || isAdmin
                        ? menu(roles.ADMIN)
                        : menu(roles.PATIENT)}

                      {isAuthed ? (
                        <Redirect exact from="/" to={"/app"} />
                      ) : (
                        <Redirect exact from="/" to={"/auth/register"} />
                      )}
                      <Redirect from="/app" to="/app/home" />
                    </Switch>
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default AdminLayout;
