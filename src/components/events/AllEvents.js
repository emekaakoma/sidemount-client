import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteEvent, getEvents } from "../../managers/EventManager"

export const AllEvents = () => {
    const [events, setEvents] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getEvents().then(eventData => setEvents(eventData))
        }, []
    )

    const handleDelete = (eventId) => {
        if(window.confirm("Are you sure you want to delete this post?")) {
            deleteEvent(eventId)
            .then(() => {
                getEvents().then((postData) => setEvents(postData))
            })
        }
    }

    return <>
    {
            events.map(event => {
                return <>
                    <section className="grid__items" key={`event--${event.id}`}>
                        <Link className="event__titles" to={`/events/${event.id}`}>{event.title}</Link>
                        <div className="event__dates">{event.date}</div>
                        <div className="event__categories">{event.time}</div>
                        <div className="event__categories">{event.description}</div>
                        <div className="event__categories">{event.location}</div>
                        <div className="event__categories">{event.gi?.label}</div>
                        <button onClick={() => navigate(`/events/${event.id}/edit`)}>Edit</button>
                        <button onClick={() => handleDelete(event.id)}>Delete</button>
                    </section>
                </>
            })
        }</>
}