import React from "react";
import { Box, Grid, Card, CardHeader, Typography } from "@material-ui/core";
import ContactsIcon from "@material-ui/icons/Contacts";

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
          overflowX: "visible"
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          wrap="nowrap"
        ></Grid>
      </Box>
    </Card>
  );
}

export default Contacts;
