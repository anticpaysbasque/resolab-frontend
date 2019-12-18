import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";

import { useStyles } from "./useStyles";
import apiCallAuth from "../apiCallAuth";
import Post from "./Post";

function Publications({ handleSnackBar }) {
  const [publications, setPublications] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const fetchDatas = async () => {
      const res = await apiCallAuth.get("/posts");
      setPublications(res.data);
    };
    fetchDatas();
  });

  return (
    <>
      {publications.reverse().map(publication => (
        <Box m={2}>
          <Post
            key={publication.id}
            description={publication.description}
            photo={publication.photo}
            classes={classes}
            handleSnackBar={handleSnackBar}
          />
        </Box>
      ))}
    </>
  );
}

export default Publications;
