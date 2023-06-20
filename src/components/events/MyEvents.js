import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getMyEvents, joinEvent, leaveEvent } from "../../managers/EventManager"

export const MyEvents = () => {
    const [myEvents, setMyEvents] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getMyEvents().then(data => setMyEvents(data))
        }, []
    )

    const handleDelete = () => {
        <></>
    }

    const handleJoin = (eventId) => {
        joinEvent(eventId).then(() => { getMyEvents().then(data => setMyEvents(data)) })
    }

    const handleLeave = (eventId) => {
        leaveEvent(eventId).then(() => { getMyEvents().then(data => setMyEvents(data)) })
    }

    return <>
        {
            myEvents.map(event => {
                return <>
                    <section className="grid__items" class="has-text-centered mt-4 container has-background-light" key={`event--${event.id}`}>
                        <div>
                            <img src={event.image_url} height="200" width={"200"} />
                        </div>
                        <Link className="event__titles" to={`/events/${event.id}`}>{event.title}</Link>
                        <div className="event__dates">{event.date}</div>
                        <div className="event__categories">{event.time}</div>
                        <div className="event__categories">{event.description}</div>
                        <div className="event__categories">{event.location}</div>
                        <div className="event__categories">{event.gi?.label}</div>
                        <button class="button is-rounded" onClick={() => navigate(`/events/${event.id}/edit`)}>Edit</button>
                        <button class="button is-rounded" onClick={() => handleDelete(event.id)}>Delete</button>
                    </section>
                </>
            })
        }
    </>
}