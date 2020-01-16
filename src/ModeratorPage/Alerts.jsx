import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Box,
  Grid
} from "@material-ui/core";
import { NotificationImportant } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AlertsList from "./AlertsList";

function Alerts({ classes }) {
  return (
    <ExpansionPanel className={classes.sidebarCard}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.sidebarCardHeader}
      >
        <NotificationImportant className={classes.sidebarCardHeaderElements} />
        <Typography className={classes.sidebarCardHeaderElements}>
          Alerts
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            height: "250px",
            overflowY: "auto",
            overflowX: "visible",
            paddingTop: "75px",
            width: "100%"
          }}
        >
          <Grid container direction="column" alignItems="center" wrap="nowrap">
            <AlertsList classes={classes} />
          </Grid>
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default Alerts;
