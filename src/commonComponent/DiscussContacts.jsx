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
import { connect } from "react-redux";

import ContactsList from "./ContactsList";
import ChatWrapper from "../Chat/ChatWrapper";

function Contacts({ classes, username }) {
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
            alignItems: "center",
            height: "250px",
            overflowY: "auto",
            overflowX: "visible",
            paddingTop: "25px",
            width: "100%"
          }}
        >
          <Grid container direction="column" wrap="nowrap">
            {/* <ContactsList classes={classes} /> */}
            <ChatWrapper username={username} classes={classes} />
          </Grid>
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

const mapStateToProps = state => {
  return {
    username: state.userReducer.username
  };
};

export default connect(mapStateToProps)(Contacts);
