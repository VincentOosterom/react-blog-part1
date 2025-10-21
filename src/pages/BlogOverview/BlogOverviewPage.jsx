import './BlogOverviewPage.css'
import NavBar from "../../components/Navigatie/NavBar.jsx";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {countPosts} from "../../helpers/countPost.js";


function BlogOverviewPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch("/data.json");
                if (!response.ok) {
                    throw new Error("Er is een fout opgetreden bij het ophalen van de posts.");
                }

                const data = await response.json();
                console.log("Data opgehaald:", data);

                // Controleer of je data een array is of een object met posts erin
                setPosts(Array.isArray(data) ? data : data.posts);
            } catch (error) {
                console.error(error);
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
            <header>
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