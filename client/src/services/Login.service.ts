import { useState } from "react";
import { api } from "../api/fetchData";

type LoginCredentials = {
    email: string;
    password: string;
}

export function LoginPagesService() {
    const [loading, setLoading] = useState<boolean>(false);

    async function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        const credential = {
            email: data.get("email"),
            password: data.get("password")
        } as LoginCredentials;

        setLoading(true);
        try {
            const response = await api.post('auth/users/login', credential)
            console.log(response.data)
        }catch(err) {
            throw err
        } finally {
            setLoading(false);
        }
    }

    return {
        handleLoginSubmit,
        loading
    }
}