export const getComments = () => {
    return fetch("http://localhost:8000/comments", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sm_token")}`
        }
    })
        .then(response => response.json())
}

export const getExactComment = (eventId) => {
    return fetch(`http://localhost:8000/comments?event_id=${eventId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("sm_token")}`
        }
    })
        .then(res => res.json())
}

export const createComment = (comment) => {
    return fetch(`http://localhost:8000/comments`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sm_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
    })
        .then(response => response.json())
}

export const deleteComment = (commentId) => {
    return fetch(`http://localhost:8000/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sm_token")}`
        }
    })
}