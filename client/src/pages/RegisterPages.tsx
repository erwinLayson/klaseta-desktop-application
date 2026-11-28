import { NavLink } from "react-router-dom"
import "../styles/Registerpages.css"

export function RegisterPages() {
    return(
        <div className="flex h-screen w-full justify-center items-center p-4">
            <form className="grid gap-4 w-full max-w-2xl">
                <div className="register-header block text-center">
                    <h1>Sign Up</h1>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="register-field">
                        <label className="register-label" htmlFor="firstname">First Name</label>
                        <input className="register-input" type="text" name="firstname" id="firstname" placeholder="First name" />
                    </div>

                    <div className="register-field">
                        <label className="register-label" htmlFor="middlename">Middle Name</label>
                        <input className="register-input" type="text" name="middlename" id="middlename" placeholder="Middle name" />
                    </div>

                    <div className="register-field">
                        <label className="register-label" htmlFor="lastname">Last Name</label>
                        <input className="register-input" type="text" name="lastname" id="lastname" placeholder="Last name" />
                    </div>

                    <div className="register-field">
                        <label className="register-label" htmlFor="username">username</label>
                        <input className="register-input" type="text" name="username" id="username" placeholder="username" />
                    </div>

                    <div className="register-field">
                        <label className="register-label" htmlFor="password">Password</label>
                        <input className="register-input" type="text" name="password" id="password" placeholder="*********" />
                    </div>

                    <div className="register-field">
                        <label className="register-label" htmlFor="department">Department (optional)</label>
                        <input className="register-input" type="text" name="department" id="department" placeholder="Department" />
                    </div>
                </div>

                <div className="block text-center">
                    <button className="register-button" type="submit">
                        <p>Sign up</p>
                    </button>
                </div>

                <div className="block text-center">
                    <NavLink className="register-switch-link" to="/login">
                        Already have an account? Sign in
                    </NavLink>
                </div>
            </form>
        </div>
    )
}
