import "./NotFoundPage.css"
import NavBar from "../../components/Navigatie/NavBar.jsx";
import {Link} from "react-router-dom";

function NotFoundPage() {
    return (
        <>
            <NavBar/>
            <header >
                <h2>Deze pagina is helaas niet gevonden.</h2>
                <Link to="/blog-overview">Terug naar alle posts</Link>
            </header>

        </>
    )
}

export default NotFoundPage