import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Notifications, AccountCircle } from "@material-ui/icons/";
import Box from "@material-ui/core/Box";
import axios from "axios";
import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    minWidth: 350
  }
});

export default function Notification() {
  const classes = useStyles();

  const [commentaires, setCommentaires] = useState([]);

  const handleCommentsNotifications = () => {
    axios
      .get("")
      .then(res => {
        setCommentaires(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Card className={classes.card}>
      <AppBar position="static" color="primary">
        <CssBaseline />
        <CardHeader
          title={
            <Box display="flex">
              <Notifications color="default" />
              <Typography color="default">Notifications</Typography>
            </Box>
          }
        ></CardHeader>
      </AppBar>

      <CardContent>
        {commentaires.map(commentaire => {
          //return tous le nombre de commentaires pour chaque publication de la personne
        })}{" "}
        <AccountCircle color="primary" alignItems="center" />
        Jules Bonard a commenté la publication de Basile
      </CardContent>
    </Card>
  );
}
