import {LoginPagesService} from "../services/Login.service"
import "../styles/Loginpages.css"

export function LoginPages() {
    const {
        handleLoginSubmit,
        loading: isSigningIn
    } = LoginPagesService();
    return(
        <div className="flex h-screen w-full justify-center items-center">
            <form 
                onSubmit={handleLoginSubmit}
                className="grid gap-4"
            >
                <div className="login-header block text-center">
                    <h1>Sign In</h1>
                </div>

                <div className="login-field">
                    <label className="login-label" htmlFor="username">Username</label>
                    <input className="login-input" type="text" name="username" placeholder="Username" id="username"/>
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
            </form>
        </div>
    );
}