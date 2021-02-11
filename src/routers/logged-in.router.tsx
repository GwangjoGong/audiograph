import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import { Browse } from "../pages/browse"

export const LoggedInRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/browse">
          <Browse></Browse>
        </Route>
        <Redirect to="/browse" />
      </Switch>
    </Router>
  )
}