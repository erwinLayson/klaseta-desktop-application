import { Outlet } from "react-router-dom";

export function ProtectRoutes(allowRoles: string[]) {
    void allowRoles;
    return (
        <Outlet />
    )
}