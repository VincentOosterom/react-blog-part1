import './App.css'
import {Routes, Route, } from 'react-router-dom'
import Homepage from "./pages/Homepage/Homepage.jsx";
import BlogOverviewPage from "./pages/BlogOverview/BlogOverviewPage.jsx";
import NewPostPage from "./pages/NewPost/NewPostPage.jsx";
import NotFoundPage from "./pages/NotFound/NotFoundPage.jsx";
import BlogDetailPage from "./pages/BlogDetailPage/BlogDetailPage.jsx";

function App() {
    return (
            <Routes>
                <Route path="/" element={<Homepage/>}></Route>
                <Route path="/blog-overview" element={<BlogOverviewPage/>}></Route>
                <Route path="/new-post" element={<NewPostPage/>}></Route>
                <Route path="/blog/:id" element={<BlogDetailPage/>}></Route>
                <Route path="*" element={<NotFoundPage/>}></Route>
            </Routes>

    )
}

export default App
