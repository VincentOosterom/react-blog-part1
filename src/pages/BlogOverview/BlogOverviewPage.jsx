import './BlogOverviewPage.css'
import NavBar from "../../components/Navigatie/NavBar.jsx";
import posts from "../../constants/data.json";
import {countPosts} from "../../helpers/countPost.js";
import {Link} from "react-router-dom";

function BlogOverviewPage() {
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
                {posts.map((post) => (
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
                    ))}
            </section>
        </>
    )
}

export default BlogOverviewPage;