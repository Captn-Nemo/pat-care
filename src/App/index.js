import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import "../../node_modules/font-awesome/scss/font-awesome.scss";
import Loader from "./layout/Loader";
import Aux from "../hoc/_Aux";
import ScrollToTop from "./layout/ScrollToTop";

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader,
});

const App = () => {
  const SignUp = React.lazy(() =>
    import("../Scenes/Authentication/SignUp/index")
  );
  const Login = React.lazy(() => import("../Scenes/Authentication/SignIn"));

  return (
    <Aux>
      {/* <ScrollToTop> */}
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/auth/register" component={SignUp} />
          <Route exact path="/admin" component={Login} />

          <AdminLayout />
        </Switch>
      </Suspense>
      {/* </ScrollToTop> */}
    </Aux>
  );
};

export default App;
