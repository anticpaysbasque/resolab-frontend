import React from "react";
import {
  Box,
  Grid,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ContactsList from "./ContactsList";

function Contacts({ classes }) {
  return (
    <ExpansionPanel className={classes.sidebarCard}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.sidebarCardHeader}
      >
        <ForumIcon className={classes.sidebarCardHeaderElements} />
        <Typography className={classes.sidebarCardHeaderElements}>
          Discussion instantanée
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
            <ContactsList classes={classes} />
          </Grid>
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default Contacts;
