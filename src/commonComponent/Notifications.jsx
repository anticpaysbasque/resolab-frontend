import React from "react";
import { Grid, Card, CardHeader, Typography } from "@material-ui/core";
import { Notifications } from "@material-ui/icons/";
import Box from "@material-ui/core/Box";

import NotifyComments from "./NotifyComments";
import NotifyLikes from "./NotifyLikes";

export default function Notification({ classes }) {
  return (
    <Card className={classes.sidebarCard}>
      <CardHeader
        title={
          <Box display="flex">
            <Notifications className={classes.sidebarCardHeaderElements} />
            <Typography className={classes.sidebarCardHeaderElements}>
              Notifications
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
          overflowX: "visible",
          paddingTop: "25px"
        }}
      >
        <Grid container direction="column" alignItems="center" wrap="nowrap">
          <NotifyComments />
          <NotifyLikes />
        </Grid>
      </Box>
    </Card>
  );
}
