import './Formulier.css'
import { useState } from "react";
import { readTime } from "../../helpers/readTime.js";

function Form() {

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [name, setName] = useState("");
    const [post, setPost] = useState("");
    const [error, setError] = useState(false);
    const time = readTime(post)


    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!name || !subtitle || !title) {
            setError("Vul alle velden in");
            return;
        }

        if (post.length < 300 || post.length > 2000) {
            setError("Deze blogpost moet minimaal 300 tekens en maximaal 2000 tekens zijn");
            return;
        }

        setTitle("")
        setSubtitle("")
        setName("")
        setPost("")

        const newPost = {
            title: title,
            subtitle: subtitle,
            content: post,
            author: name,
            created: new Date().toISOString(),
            shares: 0,
            comments: 0,
            readtime: time

        }

        console.log(newPost);

        setTitle("");
        setSubtitle("");
        setName("");
        setPost("");
        setError("");

    }


    return (
        <>
            <div className="form-container">
                <h1>Post toevoegen</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-inputs">

                        <label htmlFor="title">Titel</label>
                        <input type="text" title="Title" name="title" value={title}
                               onChange={(e) => setTitle(e.target.value)}/>

                        <label htmlFor="subtitel">Subtitel</label>
                        <input type="text" title="Subtitel" name="Subtitel" value={subtitle}
                               onChange={(e) => setSubtitle(e.target.value)}/>

                        <label htmlFor="First & Lastname">Voor en Achternaam</label>
                        <input type="text" title="First & Lastname" name="First & Lastname" value={name}
                               onChange={(e) => setName(e.target.value)}/>

                        <label htmlFor="text">Blogpost</label>
                        <textarea rows="15" cols="30" value={post}
                                  title="Blogpost"
                                  name="Blogpost"
                                  onChange={(e) => setPost(e.target.value)}
                        />
                    </div>
                    <button className="button-form" type="submit">Verstuur blog</button>
                </form>
                {error && <p className="error-message">{error}</p>}
            </div>
        </>
    )
}

export default Form;