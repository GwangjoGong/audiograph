import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { MusicPlayer } from "../components/music-player";
import { TapBar } from "../components/tap-bar";
import { Browse } from "../pages/browse";
import { Manage } from "../pages/manage";
import { Play } from "../pages/play";

export const LoggedInRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/browse">
          <Browse></Browse>
        </Route>
        <Route path="/play">
          <Play></Play>
        </Route>
        <Route path="/manage">
          <Manage></Manage>
        </Route>
        <Redirect to="/browse" />
      </Switch>
      <MusicPlayer />
      <TapBar />
    </Router>
  );
};
