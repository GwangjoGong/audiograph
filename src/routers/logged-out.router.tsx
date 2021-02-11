import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import { Login } from "../pages/login"

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login></Login>
        </Route>
        <Redirect to ="/"/>
      </Switch>
    </Router>
  )
}