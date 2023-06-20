import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { AllEvents } from "../components/events/AllEvents"
import { AttendingEvents } from "../components/events/AttendingEvents"
import { CreateEvent } from "../components/events/CreateEvent"
import { EditEvent } from "../components/events/EditEvent"
import { EventDetails } from "../components/events/EventDetails"
import { MyEvents } from "../components/events/MyEvents"
import { Authorized } from "./Authorized"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
            <Route path="/events" element={<AllEvents />} />
            <Route path="/createevent" element={<CreateEvent />} />
            <Route path="/events/:eventId/edit" element={<EditEvent />} />
            <Route path="/events/:eventId" element={<EventDetails />} />
            <Route path="/myevents" element={<MyEvents />} />
            <Route path="/attendingevents" element={<AttendingEvents />} />
            </Route>
        </Routes>
    </>
}
