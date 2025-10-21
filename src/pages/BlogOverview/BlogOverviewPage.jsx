import './BlogOverviewPage.css'
import NavBar from "../../components/Navigatie/NavBar.jsx";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {countPosts} from "../../helpers/countPost.js";
import axios from "axios";


function BlogOverviewPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    "https://novi-backend-api-wgsgz.ondigitalocean.app/api/blogposts",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "novi-education-project-id": "d6200c4d-2a0a-435d-aba6-6171c6a7296e",
                        },
                    }
                );

                // Axios zet JSON automatisch om naar JavaScript-object:
                const data = response.data;
                console.log("Data opgehaald:", data);

                // Zet de data in de state
                setPosts(Array.isArray(data) ? data : data.posts);
            } catch (error) {
                console.error("Fout bij ophalen:", error);
                setError("Er is een fout opgetreden bij het ophalen van de posts.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);


    if (loading) {
        return (
            <>
                <NavBar/>
                <div>Loading...</div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <NavBar/>
                <p>{error}</p>
            </>
        )
    }

    const totalPosts = countPosts(posts);

    return (
        <>
            <NavBar/>
            <header className="header-blog-overview">
                <div className="blog-overview-title">
                    <h1>Bekijk alle {totalPosts} posts op het platform</h1>
                </div>
            </header>
            <section className="all-blogs-overview">
                {Array.isArray(posts) && posts.length > 0 ? (
                    posts.map((post) => (
                        <article key={post.id} className="blog-post">
                            <div className="blog-post-title">
                                <h3>
                                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                                </h3>
                                <p>({post.author})</p>
                            </div>
                            <div className="blog-post-content">
                                <p>{post.comments} reacties - {post.shares} gedeeld </p>
                            </div>
                        </article>
                    ))
                ) : (
                    <p>Er zijn nog geen posts beschikbaar.</p>
                )}
            </section>
        </>
    );
}

export default BlogOverviewPage;