import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getEvents, joinEvent, leaveEvent } from "../../managers/EventManager"

export const AttendingEvents = () => {
    const [myEvents, setMyEvents] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getEvents().then(data => setMyEvents(data))
        }, []
    )

    const handleJoin = (eventId) => {
        joinEvent(eventId).then(() => { getEvents().then(data => setMyEvents(data)) })
    }

    const handleLeave = (eventId) => {
        leaveEvent(eventId).then(() => { getEvents().then(data => setMyEvents(data)) })
    }

    return <>
        {
            myEvents.map(event => {
                return <>
                    <section class="has-text-centered mt-4 container has-background-light">
                        {
                            event.joined
                                ? <>
                                    <div>
                                        <img src={event.image_url} height="200" width={"200"} />
                                    </div>
                                    <Link className="event__titles" to={`/events/${event.id}`}>{event.title}</Link>
                                    <div className="event__dates">{event.date}</div>
                                    <div className="event__categories">{event.time}</div>
                                    <div className="event__categories">{event.location}</div>
                                    <button class="button is-rounded has-background-danger" onClick={() => handleLeave(event.id)}>Leave</button>
                                </>
                                : ""
                        }
                    </section>
                </>
            })
        }
    </>
}