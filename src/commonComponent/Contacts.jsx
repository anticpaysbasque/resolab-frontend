import React from "react";
import { Box, Grid, Card, CardHeader, Typography } from "@material-ui/core";
import ContactsIcon from "@material-ui/icons/Contacts";

import ContactsList from "./ContactsList";

function Contacts({ classes }) {
  return (
    <Card className={classes.sidebarCard}>
      <CardHeader
        title={
          <Box display="flex">
            <ContactsIcon className={classes.sidebarCardHeaderElements} />
            <Typography className={classes.sidebarCardHeaderElements}>
              Contacts
            </Typography>
          </Box>
        }
        className={classes.sidebarCardHeader}
      ></CardHeader>

      <Box
        style={{
          display: "flex",
          alignItems: "center",
          height: "250px",
          overflowY: "auto",
          paddingTop: "25px"
        }}
      >
        <Grid container direction="column" wrap="nowrap">
          <ContactsList classes={classes} />
        </Grid>
      </Box>
    </Card>
  );
}

export default Contacts;
