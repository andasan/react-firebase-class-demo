import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { db } from "../firebase";

const Post = ({ match }) => {

  console.log(match.params.slug);
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState();

  const slug = match.params.slug;
  
  if (loading && !currentPost) {
    db
      .ref()
      .child(`/posts/${slug}`)
      .once("value")
      .then(snapshot => {
        if (snapshot.val()) {
          setCurrentPost(snapshot.val());
        }
        setLoading(false);
      });
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  const postDoesNotExist = !currentPost;
  if (postDoesNotExist) {
    return <Redirect to="/404" />;
  }

  return (
    <>
      <img src={currentPost.coverImage} width="100%" alt={currentPost.coverImageAlt} />
      <h1>{currentPost.title}</h1>
      <em>{currentPost.datePrettify}</em>
      <p dangerouslySetInnerHTML={{ __html: currentPost.content }}></p>
    </>
  );
};

export default Post;
