import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createComment, deleteComment, getExactComment } from "../../managers/CommentManager"
import { getExactEvent, joinEvent, leaveEvent } from "../../managers/EventManager"

export const EventDetails = () => {
    const [event, setEvent] = useState({})
    const [comments, setComments] = useState([])
    const { eventId } = useParams()
    const { commentId } = useParams()
    const navigate = useNavigate()
    const [comment, setComment] = useState({
        content: "",
        created_on: new Date().toISOString().slice(0, 10),
        author: "",
        event: eventId
    })

    useEffect(
        () => {
            getExactEvent(eventId).then((data) => {
                // const eventArray = data
                // eventArray.gi = data.gi.id
                setEvent(data)
            })
        }, [eventId]
    )

    useEffect(
        () => {
            getExactComment(eventId).then(data => setComments(data))
        }, []
    )

    const handleJoin = (eventId) => {
        joinEvent(eventId).then(() => { getExactEvent(eventId).then(data => setEvent(data)) })
    }

    const handleLeave = (eventId) => {
        leaveEvent(eventId).then(() => { getExactEvent(eventId).then(data => setEvent(data)) })
    }

    const handleDelete = (commentId) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            deleteComment(commentId)
                .then(() => {
                    getExactComment(eventId).then(data => setComments(data))
                })
        }
    }

    const handleInputChange = (event) => {
        const newComment = { ...comment };
        newComment[event.target.name] = event.target.value;
        setComment(newComment);
    };

    const saveComment = () => {

        const newComment = {
            content: comment.content,
            created_on: comment.created_on,
            author: parseInt(comment.author),
            event: parseInt(comment.event)
        };

        createComment(newComment)
            .then(() => {
                getExactComment(eventId).then(data => setComments(data))
            })
    }

    return <>

        <section className="grid__items" key={`event--${event.id}`} >
            <article class="has-text-centered mt-4 container has-background-light">
                <div className="event__titles" to={`/events/${event.id}`}>Title: {event.title}</div>
                <div className="event__dates">Date: {event.date}</div>
                <div className="event__categories">Time: {event.time}</div>
                <div className="event__categories">Description: {event.description}</div>
                <div className="event__categories">Location: {event.location}</div>
                <div className="event__categories">Requirements: {event.requirements}</div>
                <div className="event__categories">{event.gi?.label}</div>
                {
                    event.joined
                        ? <button class="button is-rounded has-background-danger" onClick={() => handleLeave(event.id)}>Leave</button>
                        : <button class="button is-rounded has-background-success" onClick={() => handleJoin(event.id)}>Join</button>
                }
                <div className="event__categories" class="menu-label">Attendees: {event?.attendees?.map(attendee => {
                    return <div>{attendee.user?.username} is a {attendee.belt?.label} belt</div>
                })}
                </div>
            </article>

            <section class="message is-dark">
                <h2 class="message-header mt-5 subtitle has-text-centered mr-2">Comments</h2>
                <form>
                    <label htmlFor="content" class="label">New Comment</label>
                    <input
                        type="text"
                        name="content"
                        value={comment.content}
                        onChange={handleInputChange}
                    />
                    <button type="button" onClick={saveComment} class="button is-rounded">
                        Save Comment
                    </button>
                </form>
            </section>
            <section class="message is-dark">
                <article class="message-body">
                    {
                        comments.map(comment => {
                            return <>
                                <section class="message-body">
                                    <div className="event__categories">Content: {comment.content}</div>
                                    <div className="event__categories">Created On: {comment.created_on}</div>
                                    <div className="event__categories">Author: {comment?.author?.user?.username}</div>
                                    {
                                        comment.can_delete
                                            ? <button class="button is-rounded" onClick={() => handleDelete(comment.id)}>Delete</button>
                                            : ""
                                    }
                                </section>

                            </>
                        })
                    }
                </article>
            </section>
        </section>
    </>
}