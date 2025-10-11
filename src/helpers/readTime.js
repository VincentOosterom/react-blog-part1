export function readTime (post) {
    if (!post) return 0;

    const words = post.trim().split(/\s+/).length;
    const readTime = (words / 100 ) * 0.3;
    return Math.round(readTime * 10 );
}