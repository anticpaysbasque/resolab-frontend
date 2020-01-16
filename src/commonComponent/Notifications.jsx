import React from "react";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Box,
  Grid
} from "@material-ui/core";
import { Notifications, ExpandMore } from "@material-ui/icons/";

import NotifyComments from "./NotifyComments";
import NotifyLikes from "./NotifyLikes";

export default function Notification({ classes }) {
  return (
    <ExpansionPanel className={classes.sidebarCard}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.sidebarCardHeader}
      >
        <Notifications className={classes.sidebarCardHeaderElements} />
        <Typography className={classes.sidebarCardHeaderElements}>
          Notifications
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box
          style={{
            display: "flex",
            height: "250px",
            overflowY: "auto",
            width: "100%"
          }}
        >
          <Grid container direction="column" wrap="nowrap">
            <NotifyComments />
            <NotifyLikes />
          </Grid>
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
