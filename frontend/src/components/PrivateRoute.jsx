import {useAuthStatus} from "../hooks/useAuthStatus"
import {Outlet, Navigate} from "react-router-dom"
import Spinner from "./Spinner"

function PrivateRoute(props) {
  const {loggedIn, checkingStatus} = useAuthStatus()

  if (checkingStatus) {
    return <Spinner />
  }

  return loggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute;