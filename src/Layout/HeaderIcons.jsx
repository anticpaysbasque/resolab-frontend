import React from "react";
import { Settings, ExitToApp } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { removeToken } from "../reducers/actions";

function HeaderIcons({ logOut }) {
  const handleLogout = () => {
    logOut();
  };

  let history = useHistory();

  return (
    <>
      <Grid
        container
        spacing={5}
        direction="row"
        justify="space-around"
        align-items="baseline"
      >
        <Settings color="default" />

        <ExitToApp color="default" onClick={handleLogout} />
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
