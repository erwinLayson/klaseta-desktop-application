import { useState, useEffect } from "react"
import { api } from "../api/fetchAPI";

export function useAuth() {
    async function verifyAuth() {
        const result = await api.get('auth/me');
        console.log(result);
    }

    useEffect(() => {
        verifyAuth()
    }, []);
}