import React from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";

import HeaderSite from "./HeaderSite";
import HeaderIcons from "./HeaderIcons";
import { connect } from "react-redux";

import "../Layout/Scroll.css";

function Header({ isAuth }) {
  return (
    <>
      <div className="scroll-container">
        <AppBar color="primary">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid container item xs={6} sm={10}>
              <HeaderSite />
            </Grid>
            <Grid item xs={6} sm={2}>
              {isAuth && <HeaderIcons />}
            </Grid>
          </Grid>
        </AppBar>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.authReducer.isAuth
  };
};

export default connect(mapStateToProps)(Header);
