export const formatDate = (date) => {
    const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true, // Set to false if you want 24-hour format
    };

    return new Date(date).toLocaleDateString("en-US", options);
};
