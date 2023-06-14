import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createEvents } from "../../managers/EventManager"
import { GetGi } from "../../managers/GiManager"

export const CreateEvent = () => {
    const navigate = useNavigate()
    const [gis, setGi] = useState([])
    const [event, updateEvent] = useState({
        description: "",
        title: "",
        date: "",
        time: "",
        location: "",
        image_url: "",
        gi: ""

    })

    useEffect(
        () => {
            GetGi().then(giData => setGi(giData))
        },[]
    )


    const createButton = (evt) => {
        evt.preventDefault()

        const eventToCreate = {
            description: event.description,
            title: event.title,
            date: event.date,
            time: event.time,
            location: event.location,
            image_url: event.image_url,
            gi: event.gi
        }

        return createEvents(eventToCreate)
            .then((event) => {
                navigate(`/events/${event.id}`)
            })
    }

    return <>
        <h2 className="eventForm__title">New event</h2>
        <form className="eventForm">
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <input
                            required autoFocus
                            type="text"
                            className="form-control-title"
                            placeholder="Title"
                            value={event.title}
                            onChange={
                                (evt) => {
                                    const copy = { ...event }
                                    copy.title = evt.target.value
                                    updateEvent(copy)
                                }
                            } />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <input
                            required autoFocus
                            type="text"
                            className="form-control-title"
                            placeholder="location"
                            value={event.location}
                            onChange={
                                (evt) => {
                                    const copy = { ...event }
                                    copy.location = evt.target.value
                                    updateEvent(copy)
                                }
                            } />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <input
                            required autoFocus
                            type="text"
                            className="form-control-image"
                            placeholder="Image URL"
                            value={event.image_url}
                            onChange={
                                (evt) => {
                                    const copy = { ...event }
                                    copy.image_url = evt.target.value
                                    updateEvent(copy)
                                }
                            } />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <input
                            required autoFocus
                            type="date"
                            className="form-control-image"
                            placeholder="Image URL"
                            value={event.date}
                            onChange={
                                (evt) => {
                                    const copy = { ...event }
                                    copy.date = evt.target.value
                                    updateEvent(copy)
                                }
                            } />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <input
                            required autoFocus
                            type="time"
                            className="form-control-image"
                            placeholder="Image URL"
                            value={event.time}
                            onChange={
                                (evt) => {
                                    const copy = { ...event }
                                    copy.time = evt.target.value
                                    updateEvent(copy)
                                }
                            } />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <textarea
                            required autoFocus
                            type="text"
                            className="form-control-content"
                            placeholder="Event Description"
                            value={event.description}
                            onChange={
                                (evt) => {
                                    const copy = { ...event }
                                    copy.description = evt.target.value
                                    updateEvent(copy)
                                }
                            } />
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <select
                            value={event.gi}
                            className="form-control-gi"
                            onChange={
                                (evt) => {
                                    const copy = { ...event }
                                    copy.gi = evt.target.value
                                    updateEvent(copy)
                                }
                            } > <option value="">Gi Select</option>
                            {gis.map((gi) => (
                                <option key={gi.id} value={gi.id}>
                                    {gi.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </fieldset>

            <button onClick={(clickEvent) => {
                createButton(clickEvent)
            }}
                className="btn-publish"><b>
                    Create
                </b></button>
        </form>
    </>
}


