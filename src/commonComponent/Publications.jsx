import React, { useState, useEffect } from "react";
import { Box, Switch, Grid, makeStyles, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import BottomScrollListener from "react-bottom-scroll-listener";
import { useStyles } from "./useStyles";
import apiCallAuth from "../apiCallAuth";
import Post from "./Post";

import useInterval from "../useInterval";

function Publications({ handleSnackBar, userId }) {
  const [publications, setPublications] = useState([]);
  const [showUserPublications, setShowUserPublications] = useState(false);
  const [lastPageToFetch, setLastPageToFetch] = useState(1);
  const [timerCount, setTimerCount] = useState(0);

  const classes = useStyles();

  //  sets the interval for fetching new posts using custom hook
  useInterval(() => {
    setTimerCount(timerCount + 1);
  }, 10000);

  useEffect(() => {
    const fetchDatas = async page => {
      const res = await fetchPages(page);
      setPublications(res);
    };
    fetchDatas(lastPageToFetch);
  }, [lastPageToFetch, timerCount]);

  const fetchPages = async lastPage => {
    let fetchedPublications = [];
    for (let page = 1; page <= lastPage; page++) {
      const res = await apiCallAuth.get(`/posts?page=${page}`);
      fetchedPublications = fetchedPublications.concat(res.data);
    }
    return fetchedPublications;
  };

  const fetchMorePages = () => {
    setLastPageToFetch(lastPageToFetch + 1);
  };

  return (
    <BottomScrollListener onBottom={fetchMorePages}>
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
    </BottomScrollListener>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.userReducer.id
  };
};

export default connect(mapStateToProps)(Publications);
