import React from "react";
import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import LoginPage from "./LoginPage/LoginPage";
import UserPage from "./UserPage/UserPage";
import ModeratorPage from "./ModeratorPage/ModeratorPage";
import SettingsPage from "./SettingsPage/SettingsPage";

function AuthRoute({ isAuth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        return isAuth ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
}

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <AuthRoute isAuth={true} path="/user" component={UserPage} />
        <Route path="/moderator" component={ModeratorPage} />
        <Route path="/settings" component={SettingsPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default connect()(Router);
