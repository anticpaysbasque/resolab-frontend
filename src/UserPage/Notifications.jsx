import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Box from "@material-ui/core/Box";
import axios from "axios";

import "../Layout/Scroll.css";

const useStyles = makeStyles({
  card: {
    minWidth: 350
  }
});

export default function Notifications() {
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
              <NotificationsIcon />
              <Typography>Notifications</Typography>
            </Box>
          }
        ></CardHeader>

        <CardContent>
          {commentaires.map(commentaire => {
            //return tous le nombre de commentaires pour chaque publication de la personne
          })}
          Jules Bonard a commenté la publication de Basile
        </CardContent>
      </Card>
    </div>
  );
}
