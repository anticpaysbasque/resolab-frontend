import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import LoginPage from "./LoginPage/LoginPage";
import UserPage from "./UserPage/UserPage";
import ModeratorPage from "./ModeratorPage/ModeratorPage";
import SettingsPage from "./SettingsPage/SettingsPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/user" component={UserPage} />
        <Route path="/moderator" component={ModeratorPage} />
        <Route path="/settings" component={SettingsPage} />
      </Switch>
    </BrowserRouter>
  );
}
