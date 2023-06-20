import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteEvent, filterEventsBySearch, getEvents } from "../../managers/EventManager"
import 'bulma/css/bulma.min.css'
import './AllEvents.css'

export const AllEvents = () => {
    const [events, setEvents] = useState([])
    const [filterBySearch, setFilterBySearch] = useState("")
    const navigate = useNavigate()

    useEffect(
        () => {
            getEvents().then(eventData => setEvents(eventData))
        }, []
    )

    const handleDelete = (eventId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deleteEvent(eventId)
                .then(() => {
                    getEvents().then((postData) => setEvents(postData))
                })
        }
    }

    useEffect(
        () => {
            if (filterBySearch) {
                filterEventsBySearch(filterBySearch)
                    .then((filteredData) => setEvents(filteredData))
            }
        }, [filterBySearch]
    )

    return <>
        <article className="container" >
            <section className="column" class="has-text-right mt-5">
                <input type="text" placeholder="Search Events"  onChange={
                    (changeEvent => {
                        setFilterBySearch(changeEvent.target.value)
                    })
                }  />
            </section>

            {
                events.map(event => {
                    return <>
                        <section className="grid__items" class="has-text-centered mt-4 container has-background-light" key={`event--${event.id}`}>
                            <div>
                                <img src={event.image_url} height="200" width={"200"} />
                            </div>
                            <Link className="event__titles" class="title has-background-danger" to={`/events/${event.id}`}>{event.title}</Link>
                            <div className="event__dates" >{event.date}</div>
                            <div className="event__categories" >{event.time}</div>

                            <div className="event__categories" >{event.description}</div>
                            <div className="event__categories">{event.location}</div>
                            <div className="event__categories">{event.gi?.label}</div>
                            <div className="event__categories">Number of people attending: {event.attendees?.length}</div>
                            {
                                event.can_edit
                                    ? <button class="button is-rounded" onClick={() => navigate(`/events/${event.id}/edit`)}>Edit</button>
                                    : ""
                            }
                            {
                                event.can_delete
                                    ? <button class="button is-rounded" onClick={() => handleDelete(event.id)}>Delete</button>
                                    : ""
                            }
                        </section>
                    </>
                })
            }
        </article>
    </>
}