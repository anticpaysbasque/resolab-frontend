import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";

import Storie from "./Storie";
import apiCallAuth from "../apiCallAuth";
import img from "../Assets/logo-resolab.png";

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
      {stories.reverse().map(story => {
        // const image = story.image;
        // if (image.filePath === undefined || image.filePath === null) {
        return (
          <Grid>
            <Storie
              classes={classes}
              username={story.user.username}
              image={img}
            />
          </Grid>
        );
        // } else {
        //     return (
        //         <Grid>
        //             <Storie
        //                 classes={classes}
        //                 username={story.user.username}
        //                 image={`http://localhost:8089/media/${story.image.filePath}`}
        //             />
        //         </Grid>
        //     );
        // }
      })}
    </Grid>
  );
}

export default DisplayStories;
