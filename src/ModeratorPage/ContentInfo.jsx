import React from "react";

export default function ContentInfo(content) {
  if (content.post) {
    return <div>sur la publication de {content.post.user.username}</div>;
  }
  if (content.comment) {
    return <div>sur le commentaire de {content.comment.user.username}</div>;
  }
  if (content.story) {
    return <div>sur la story de {content.story.user.username}</div>;
  }
  if (content.chat) {
    return <div>sur la discussion de {content.chat.user.username}</div>;
  }
}
