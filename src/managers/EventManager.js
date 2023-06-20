export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sm_token")}`
        }
    })
        .then(response => response.json())
}

export const getMyEvents = () => {
    return fetch("http://localhost:8000/events/myevents", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sm_token")}`
        }
    })
        .then(response => response.json())
}

export const deleteEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("sm_token")}`
        }
    })
}

export const updateEvents = (event) => {
    return fetch(`http://localhost:8000/events/${event.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("sm_token")}`
        },
        body: JSON.stringify(event)
    })
}

export const createEvents = (event) => {
    return fetch("http://localhost:8000/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("sm_token")}`
        },
        body: JSON.stringify(event)
    })
        .then(res => res.json())
}

export const getExactEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("sm_token")}`
        }
    })
        .then(res => res.json())
}

export const leaveEvent = eventId => {
    // TODO: Write the DELETE fetch request to leave an event
    return fetch(`http://localhost:8000/events/${eventId}/leave`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sm_token")}`
        }
    })
}

export const joinEvent = eventId => {
    // TODO: Write the POST fetch request to join and event
    return fetch(`http://localhost:8000/events/${eventId}/signup`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("sm_token")}`
        }
    })
        .then(response => response.json())
}

export const filterEventsBySearch = (searchTerm) => {
    return fetch(`http://localhost:8000/events?search=${searchTerm}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("sm_token")}`
        }
    })
        .then(response => response.json())
}