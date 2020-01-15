import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from "@material-ui/core";
import { NotificationImportant } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
        <Typography>ALED</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default Alerts;
