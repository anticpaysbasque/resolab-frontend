import React, { useState, useEffect } from "react";
import {
  Warning,
  PermIdentity,
  ChatBubbleOutline,
  Favorite
} from "@material-ui/icons";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton
} from "@material-ui/core";
import Axios from "axios";

import { useStyles } from "./useStyles";

export default function RecipeReviewCard() {
  const [datas, setDatas] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const fetchDatas = async () => {
      const res = await Axios.get();
      setDatas(res.data);
    };
    fetchDatas();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <PermIdentity />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <Warning />
          </IconButton>
        }
      />
      <CardMedia className={classes.media} />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="add to favorites">
          <ChatBubbleOutline />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent></CardContent>
      </Collapse>
    </Card>
  );
}
