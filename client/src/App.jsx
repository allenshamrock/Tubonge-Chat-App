import React from "react";
import "./App.css";
import AppLayout from "../layout";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignIn from "./pages/SignIn";
import {privateRoutes,publicRoutes} from './routes'
import PrivateRoute from "./PrivateRoute";
import { useSelector } from "react-redux";
function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute user={user} />}>
          {privateRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

        <Route
          path="/sign-in"
          element={user ? <Navigate to={"/messages"} /> : <SignIn />}
        />
      </Routes>
    </Router>
  );
}

export default App;