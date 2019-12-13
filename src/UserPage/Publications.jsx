import React, { useState, useEffect } from "react";

import Axios from "axios";
import { useStyles } from "./useStyles";
import apiCallAuth from "../apiCallAuth";
import Post from "./Post";

function Publications() {
  const [publications, setPublications] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    const fetchDatas = async () => {
      const res = await apiCallAuth.get("/posts");
      setPublications(res.data["hydra:member"]);
    };
    fetchDatas();
  });

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  return (
    <>
      {publications.map(publication => (
        <Post
          key={publication.id}
          description={publication.description}
          photo={publication.photo}
          classes={classes}
          isLiked={isLiked}
          handleClick={handleClick}
        />
      ))}
    </>
  );
}

export default Publications;
