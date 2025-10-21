import './Formulier.css'
import {useState} from "react";
import {readTime} from "../../helpers/readTime.js";
import axios from "axios";

function Form() {

    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [name, setName] = useState("");
    const [post, setPost] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(null);
    const time = readTime(post)


    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess(null)

        if (!name || !subtitle || !title) {
            setError("Vul alle velden in");
            return;
        }

        if (post.length < 300 || post.length > 2000) {
            setError("Deze blogpost moet minimaal 300 tekens en maximaal 2000 tekens zijn");
            return;
        }

        const newPost = {
            title: title,
            subtitle: subtitle,
            content: post,
            author: name,
            created: new Date().toISOString(),
            shares: 0,
            comments: 0,
            readTime: time
        };
        try {
            const response = await axios.post("https://novi-backend-api-wgsgz.ondigitalocean.app/api/blogposts", newPost, {headers: {
                    'novi-education-project-id': 'd6200c4d-2a0a-435d-aba6-6171c6a7296e',
                }});
            console.log("Response", response.data);

            if (response.status === 201 || response.status === 200) {
                setSuccess(response.data);
            } else {
                throw new Error("Er ging iets mis bij het toevoegen van de blogpost.");
            }

            setTitle("")
            setSubtitle("")
            setName("")
            setPost("")
        } catch (err) {
            console.error(err);
            setError("Fout bij het verzenden van de blogpost.");
        }
    }

    return (
        <>
            <div className="form-container">
                <h1>Post toevoegen</h1>
                {!success ? (
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
                ) : (
                    <p className="success-message">
                        De blogpost is succesvol toegevoegd. Je kunt deze hier{" "}
                        <a href={`/blog/${success.id}`}>bekijken</a>.
                    </p>
                )}
                {error && <p className="error-message">{error}</p>}
            </div>
        </>
    )
}

export default Form;