import './BlogDetailPage.css'
import {Link, useParams} from "react-router-dom";
import NavBar from "../../components/Navigatie/NavBar.jsx";
import {formatDate} from "../../helpers/formatDate.js"
import {useEffect, useState} from "react";
import axios from "axios";


function BlogDetailPage() {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get('/data.json');
                const data = response.data;

                const foundPost = data.find((item) => String(item.id) === id);

                if (!foundPost) {
                    throw new Error("Fout bij het ophalen van de post.");
                }
                console.log("Gevonden post", foundPost);
                setPost(foundPost);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();

    }, [id]);


    if (loading) {
        return (
            <>
                <NavBar/>
                <p>Bezig met laden...</p>
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavBar/>
                <p style={{color: "red"}}>{error}</p>
            </>
        );
    }

    if (!post) {
        return (
            <>
                <NavBar/>
                <p>Geen post gevonden.</p>
            </>
        );
    }

    return (
        <>
            <NavBar/>
            <section className="blog-detail">
                <article className="blog-post">
                    <div className="blog-post-content">
                        <strong><h2>{post.title}</h2></strong>
                        <strong>{post.subtitle}</strong>
                        <p>Geschreven door {post.author} op {formatDate(post.created)}</p>
                        <p>{post.content}</p>
                        <p>{post.comments} reacties - {post.shares} gedeeld</p>
                    </div>
                    <Link to="/blog-overview">← Terug naar overzicht</Link>
                </article>
            </section>
        </>
    )
}

export default BlogDetailPage;