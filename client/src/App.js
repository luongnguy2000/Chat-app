import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Route exact path="/">
        {user ? <Home /> : <Register />}
      </Route>
      <Route path="/login">{user ? <Link to="/" /> : <Login />}</Route>
      <Route path="/register">
        {user ? <Link to="/" /> : <Register />}
      </Route>
      <Route path="/messenger">
        {!user ? <Link to="/" /> : <Messenger />}
      </Route>
      <Route path="/profile/:username">
        <Profile />
      </Route>
    </Router>
  );
}

export default App;