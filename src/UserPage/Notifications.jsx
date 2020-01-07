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

import "../Layout/Scroll.css";

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
    <div className="scroll-notifications">
      <Card className={classes.card}>
        <CardHeader
          title={
            <Box display="flex">
              <Notifications />
              <Typography>Notifications</Typography>
            </Box>
          }
        ></CardHeader>

        <CardContent>
          {commentaires.map(commentaire => {
            //return tous le nombre de commentaires pour chaque publication de la personne
          })}{" "}
          <AccountCircle color="primary" alignItems="center" />
          Jules Bonard a commenté la publication de Basile
        </CardContent>
      </Card>
    </div>
  );
}
