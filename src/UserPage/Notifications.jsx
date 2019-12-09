import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import NotificationsIcon from "@material-ui/icons/Notifications";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  }
}));

export default function Notifications() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        title={
          <>
            <NotificationsIcon />
            <Typography>Notifications</Typography>
          </>
        }
      ></CardHeader>

      <CardContent></CardContent>
    </Card>
  );
}
