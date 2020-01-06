import React, { useState, useEffect } from "react";

import { CardContent, Typography } from "@material-ui/core";

import apiCallAuth from "../apiCallAuth";

function DisplayComments({ comments }) {
  // const [contentComments, setContentComments] = useState("");

  // useEffect(() => {
  //     const fetchComments = async () => {
  //         const res = await apiCallAuth.get("/api/comments");
  //         setPublications(res.data);
  //     };
  //     fetchDatas();
  // }, []);

  return (
    <CardContent>
      {comments.map(comment => (
        <Typography>{comment.content}</Typography>
      ))}
    </CardContent>

    // <CardContent>
    //   {comments.map(comment => {
    //     let content = "totojhj";
    //     const fetchComments = async comment => {
    //       const res = await apiCallAuth.get(`${comment}`);
    //       setContentComments(res.data.content);
    //       // console.log(content);
    //     };

    //     fetchComments(comment);

    //     return <Typography>{contentComments}</Typography>;

    //     // apiCallAuth
    //     //     .get(`${comment}`)
    //     //     .then(res => {
    //     //         const datas = res.data.content;

    //     //         content = datas;
    //     //         console.log(content);
    //     //         return <Typography>{content}</Typography>;
    //     //     })
    //     //     .catch(err => console.log(err));
    //   })}
    // </CardContent>
  );
}

export default DisplayComments;
