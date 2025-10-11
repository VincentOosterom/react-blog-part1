export function countPosts (posts) {
    if (!Array.isArray(posts)) {
        return 0;
    }
    return posts.length;
}

