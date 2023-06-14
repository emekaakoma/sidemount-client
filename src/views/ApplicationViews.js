import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { AllEvents } from "../components/events/AllEvents"
import { CreateEvent } from "../components/events/CreateEvent"
import { EditEvent } from "../components/events/EditEvent"
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
            </Route>
        </Routes>
    </>
}
