import React, { useState } from "react";
import { db } from "../firebase";

const Create = ({history}) => {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [coverImageAlt, setCoverImageAlt] = useState("");
    const [content, setContent] = useState("");

    const createPost = () => {
        // console.log({ title, slug, coverImage, coverImageAlt, content });
        const date = generateDate();
        const newPost = {
            title,
            dateFormatted: date.formatted,
            datePrettify: date.pretty,
            slug,
            coverImage,
            coverImageAlt,
            content
        };
        db
            .ref(`posts/${slug}`)
            .set(newPost)
            .then(() => history.push(`/`));
    };

    const generateDate = () => {
        const now = new Date();
        const options = { month: "long", day: "numeric", year: "numeric" };

        const year = now.getFullYear();

        let month = now.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`; // prepend with a 0
        }

        const day = now.getDate();
        if (day < 10) {
            day = `0${day}`; // prepend with a 0
        }

        return {
            formatted: `${year}-${month}-${day}`,             // used for sorting
            pretty: now.toLocaleDateString("en-US", options)  // used for displaying
        };
    };

    return (
        <>
            <h1>Create a new post</h1>
            <section style={{ margin: "2rem 0" }}>
                <label htmlFor="title-field">
                    Title
        </label>
                <input
                    id="title-field"
                    type="text"
                    value={title}
                    onChange={({ target: { value } }) => {
                        setTitle(value);
                    }}
                />

                <label htmlFor="slug-field">
                    Slug
        </label>
                <input
                    id="slug-field"
                    type="text"
                    value={slug}
                    onChange={({ target: { value } }) => {
                        setSlug(value);
                    }}
                />

                <label htmlFor="cover-image-field">
                    Cover image
        </label>
                <input
                    id="cover-image-field"
                    type="text"
                    value={coverImage}
                    onChange={({ target: { value } }) => {
                        setCoverImage(value);
                    }}
                />

                <label htmlFor="cover-image-alt-field">
                    Cover image alt
        </label>
                <input
                    id="cover-image-alt-field"
                    type="text"
                    value={coverImageAlt}
                    onChange={({ target: { value } }) => {
                        setCoverImageAlt(value);
                    }}
                />

                <label htmlFor="content-field">
                    Content
        </label>
                <textarea
                    style={{ height: 200, verticalAlign: "top" }}
                    id="content"
                    type="text"
                    value={content}
                    onChange={({ target: { value } }) => {
                        setContent(value);
                    }}
                />
                <div style={{ textAlign: "right" }}>
                    <button
                        style={{
                            border: "none",
                            color: "#fff",
                            backgroundColor: "#039be5",
                            borderRadius: "4px",
                            padding: "8px 12px",
                            fontSize: "0.9rem"
                        }}
                        onClick={createPost}
                    >
                        Create
          </button>
                </div>
            </section>
        </>
    );
};

export default Create;