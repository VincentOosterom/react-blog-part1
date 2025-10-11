import './BlogDetailPage.css'
import {Link, useParams} from "react-router-dom";
import posts from "../../constants/data.json";
import NavBar from "../../components/Navigatie/NavBar.jsx";
import {formatDate} from "../../helpers/formatDate.js"


function BlogDetailPage() {
    const {id} = useParams();
    const post = posts.find(post => post.id === parseInt(id));

    if (!post) {
        return <p>Post niet gevonden..</p>;
    }

    return (
        <>
            <NavBar/>
            <section className="blog-detail">
                <article key={post.id} className="blog-post">
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