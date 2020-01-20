import React from "react";
import { Settings, ExitToApp } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";

import { removeToken } from "../reducers/actions";

function HeaderIcons({ logOut }) {
  const handleLogout = () => {
    logOut();
  };

  return (
    <>
      <Grid
        container
        spacing={5}
        direction="row"
        justify="space-around"
        align-items="baseline"
      >
        <Fab color="default">
          <Settings color="default" />
        </Fab>
        <Fab color="default">
          <ExitToApp color="default" onClick={handleLogout} />
        </Fab>
      </Grid>
    </>
  );
}

const mapdispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(removeToken())
  };
};

export default connect(null, mapdispatchToProps)(HeaderIcons);
