import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";

import Storie from "./Story";
import PostStorie from "./PostStorie";
import axios from "axios";
import img from "../../Assets/logo-resolab.png";

const apiUrl = process.env.REACT_APP_API_URL;

function DisplayStories({ classes, handleSnackBar }) {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const fetchDatas = async () => {
      const res = await axios.get(`${apiUrl}/stories`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          Accept: "application/json"
        }
      });
      setStories(res.data);
      setTimeout(() => {
        fetchDatas();
      }, 10000);
    };
    fetchDatas();
  }, []);

  return (
    <Grid container direction="row" alignItems="center" wrap="nowrap">
      <PostStorie classes={classes} handleSnackBar={handleSnackBar} />
      {stories.map(story => {
        const storyDate = Date.parse(story.date);
        const nowDate = Date.now();
        const imageStory = story.image;
        return (
          <>
            {nowDate - storyDate < 86400000 && (
              <>
                {imageStory ? (
                  <Storie
                    classes={classes}
                    username={story.user.username}
                    image={`http://localhost:8089/media/${story.image.filePath}`}
                  />
                ) : (
                  <Storie
                    classes={classes}
                    username={story.user.username}
                    image={img}
                  />
                )}
              </>
            )}
          </>
        );
      })}
    </Grid>
  );
}

export default DisplayStories;
