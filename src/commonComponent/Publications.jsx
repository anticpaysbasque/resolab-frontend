import React, { useState, useEffect } from "react";
import { Box, Switch, Grid, makeStyles, Typography } from "@material-ui/core";
import { connect } from "react-redux";

import { useStyles } from "./useStyles";
import apiCallAuth from "../apiCallAuth";
import Post from "./Post";

function Publications({ handleSnackBar, userId }) {
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
      <Grid direction="column" onContextMenu={e => e.preventDefault()}>
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
          {showUserPublications
            ? publications
                .filter(publi => publi.user.id === userId)
                .map(publication => (
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
                ))
            : publications.map(publication => (
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

const mapStateToProps = state => {
  return {
    userId: state.userReducer.id
  };
};

export default connect(mapStateToProps)(Publications);
