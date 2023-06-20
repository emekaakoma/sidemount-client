import React, { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import { getBeltsRegistration } from "../../managers/BeltManager"


export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const bio = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const belt = useRef()
    const profile_image = useRef()
    const navigate = useNavigate()
    const [belts, setBelt] = useState([])

    useEffect(
        () => {
            getBeltsRegistration().then(data => setBelt(data))
        }, []
    )

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "bio": bio.current.value,
                "password": password.current.value,
                "belt": parseInt(belt.current.value)
            }

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("sm_token", res.token)
                        navigate("/events")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal" class="title">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName" class="label my-2"> First Name </label>
                    <input ref={firstName} type="text" name="firstName" class="input is-info has-text-centered" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName" class="label my-2"> Last Name </label>
                    <input ref={lastName} type="text" name="lastName" class="input is-info has-text-centered" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputUsername" class="label my-2">Username</label>
                    <input ref={username} type="text" name="username" class="input is-info has-text-centered" className="form-control" placeholder="Username" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword" class="label my-2"> Password </label>
                    <input ref={password} type="password" name="password" class="input is-info has-text-centered" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword" class="label my-2"> Verify Password </label>
                    <input ref={verifyPassword} type="password" class="input is-info has-text-centered" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword" class="label my-2"> Bio </label>
                    <textarea ref={bio} name="bio" className="form-control" class="input is-info has-text-centered" placeholder="Let other fighters know a little bit about you..." />
                </fieldset>
                <fieldset>
                    <div class="select is-rounded my-3">
                        <select

                            ref={belt}
                            className="form-control-gi"
                        > <option value="0">Select Belt</option>
                            {belts.map((belt) => (
                                <option key={belt.id} value={belt.id}>
                                    {belt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn" class="button is-rounded my-3" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}
