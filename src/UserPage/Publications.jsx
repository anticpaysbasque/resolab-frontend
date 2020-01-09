import React, { useState, useEffect } from "react";
import { Box, Switch, Grid, makeStyles, Typography } from "@material-ui/core";

import { useStyles } from "./useStyles";
import apiCallAuth from "../apiCallAuth";
import Post from "./Post";

function Publications({ handleSnackBar }) {
  const [publications, setPublications] = useState([]);
  const [showUserPublications, setShowUserPublications] = useState(false);

  const classes = useStyles();

  useEffect(() => {
    const fetchDatas = async () => {
      const res = await apiCallAuth.get("/posts");
      setPublications(res.data);
      setTimeout(() => {
        fetchDatas();
      }, 10000);
    };
    fetchDatas();
  }, []);

  return (
    <>
      <Grid direction="column">
        <Grid container spacing={0} align="center" justify="center">
          <Grid item xs="5">
            <Typography>Toutes les publications</Typography>
          </Grid>
          <Grid item xs="2">
            <Switch
              checked={showUserPublications}
              onChange={() => setShowUserPublications(!showUserPublications)}
              value={showUserPublications}
              color="primary"
            />
          </Grid>
          <Grid item xs="5">
            <Typography>Mes publications</Typography>
          </Grid>
        </Grid>
        <Grid>
          {publications.map(publication => (
            <Box m={2}>
              <Post
                key={publication.id}
                description={publication.description}
                photo={publication.photo}
                classes={classes}
                handleSnackBar={handleSnackBar}
                postId={publication.id}
                comments={publication.comments}
                owner={publication.user}
                likes={publication.likes}
              />
            </Box>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default Publications;
