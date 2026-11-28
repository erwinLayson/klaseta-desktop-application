import { NavLink } from "react-router-dom"
import {LoginPagesService} from "../services/Login.service"
import "../styles/Loginpages.css"

export function LoginPages() {
    const {
        handleLoginSubmit,
        loading: isSigningIn
    } = LoginPagesService();
    return(
        <div className="flex min-h-screen w-full justify-center items-center p-4">
            <form 
                onSubmit={handleLoginSubmit}
                className="login-card grid gap-5 w-full max-w-lg"
            >
                <div className="login-header block text-center">
                    <h1>Sign In</h1>
                    <p className="login-subtitle">Welcome back! Please enter your details.</p>
                </div>

                <div className="login-field">
                    <label className="login-label" htmlFor="email">Email</label>
                    <input className="login-input" type="email" name="email" placeholder="email" id="email"/>
                </div>

                <div className="login-field">
                    <label className="login-label" htmlFor="password">Password</label>
                    <input
                        className="login-input"
                        type="password"
                        name="password"
                        placeholder="*********"
                        id="password"
                    />
                </div>

                <div className="block text-center">
                    <button 
                    className="login-button" 
                    type={
                        isSigningIn ? "button" : "submit"
                    }>
                        {isSigningIn ? (
                            <p>Signing In</p>
                        ) : (
                            <p>Sign In</p>
                        )}
                    </button>
                </div>

                <div className="block text-center">
                    <NavLink className="login-switch-link" to="/register">
                        Don't have an account? Sign up
                    </NavLink>
                </div>
            </form>
        </div>
    );
}