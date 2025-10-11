 export function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("nl-NL", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });

}

