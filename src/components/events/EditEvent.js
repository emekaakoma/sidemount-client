import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getEvents, getExactEvent, updateEvents } from "../../managers/EventManager"
import { GetGi } from "../../managers/GiManager"

export const EditEvent = () => {
    const navigate = useNavigate()
    const [gis, setGi] = useState([])
    const { eventId } = useParams()
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
            getExactEvent(eventId).then((data) => {
                const eventArray = data
                eventArray.gi = data.gi.id
                updateEvent(eventArray)
            })
        }, []
    )

    useEffect(
        () => {
            GetGi().then(giData => setGi(giData))
        }, []
    )

    const changeEventState = (domEvent) => {
        const copy = { ...event }
        copy[domEvent.target.name] = domEvent.target.value
        updateEvent(copy)
    };


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
                            onChange={changeEventState} />
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
                            onChange={changeEventState}/>
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
                            onChange={changeEventState}/>
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
                            onChange={changeEventState}/>
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
                            onChange={changeEventState}/>
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
                            onChange={changeEventState}/>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <div className="input__field">
                        <select
                            value={event.gi}
                            className="form-control-gi"
                            onChange={changeEventState} >
                            <option value="0">Gi Select</option>
                            {gis.map((gi) => (
                                <option key={gi.id} value={gi.id}>
                                    {gi.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </fieldset>

            <button className="btn btn-save"
                onClick={evt => {
                    evt.preventDefault()

                    // const updateEvent = {
                    //     id: eventId,
                    //     description: event.description,
                    //     title: event.title,
                    //     date: event.date,
                    //     time: event.time,
                    //     location: event.location,
                    //     image_url: event.image_url,
                    //     gi: event.gi
                    // }

                    updateEvents(event)
                        .then(() => navigate("/posts"))
                }}>
                Update
            </button>
        </form>
    </>
}
