import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RequireAuth = ( {allowedRoles} ) => {
    const { auth } = useAuth()
    const location = useLocation()

    return (
        auth?.roles?.find(role => allowedRoles?.includes(role)) // check if user has allowed role to access page
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location}} replace /> // if user authorized, but doesn't have permissions/role for page 
                : <Navigate to="/login" state={{ from: location}} replace /> // send user to login page if not authorized
    )
}

export default RequireAuth