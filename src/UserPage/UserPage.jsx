import React from "react";

import Layout from "../Layout/Layout";
import PostArticle from "./PostArticle";
import Card from "./Card";

export default function UserPage() {
  return (
    <Layout>
      <PostArticle />
      <Card />
    </Layout>
  );
}
