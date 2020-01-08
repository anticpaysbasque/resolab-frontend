import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";

import Storie from "./Storie";
import apiCallAuth from "../apiCallAuth";

function DisplayStories({ classes }) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchDatas = async () => {
      const res = await apiCallAuth.get("/stories");
      setStories(res.data);
      setTimeout(() => {
        fetchDatas();
      }, 10000);
    };
    fetchDatas();
  }, []);

  return (
    <Grid container direction="row" alignItems="center">
      {stories.reverse().map(story => (
        <Grid>
          <Storie classes={classes} />
        </Grid>
      ))}
      {/* <Grid>
                <Storie classes={classes} />
            </Grid>
            <Grid>
                <Storie classes={classes} />
            </Grid>
            <Grid>
                <Storie classes={classes} />
            </Grid> */}
    </Grid>
  );
}

export default DisplayStories;
