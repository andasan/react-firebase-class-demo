import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);

  if (loading && !blogPosts.length) {
    db
      .ref("/posts")
      .orderByChild("dateFormatted")
      .once("value")
      .then(snapshot => {
        let posts = [];
        const snapshotVal = snapshot.val();
        if (snapshotVal) {
          const snapshotVal = snapshot.val();
          for (let slug in snapshotVal) {
            posts.push(snapshotVal[slug]);
          }
        }
        const newestFirst = posts.reverse();
        setBlogPosts(newestFirst);
        setLoading(false);
        setBlogPosts(posts);
      })
      .catch(err => console.log(err.message));
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <h1>Blog posts</h1>
      <br />
      {blogPosts && blogPosts.map(blogPost => (
        <section key={blogPost.slug} className="card">
          <img src={blogPost.coverImage} alt={blogPost.coverImageAlt} crossOrigin="anonymous" />
          <div className="card-content">
            <h2>
              <Link to={`/${blogPost.slug}`}>{blogPost.title}</Link> &mdash;{" "}
              <span className="card-date">{blogPost.datePrettify}</span>
            </h2>
            <p
              dangerouslySetInnerHTML={{
                __html: `${blogPost.content.substring(0, 200)}...`
              }}
            ></p>
            <Link to={`/${blogPost.slug}`}>Continue reading...</Link>
          </div>
        </section>
      ))}
    </>
  );
};

export default Home;
