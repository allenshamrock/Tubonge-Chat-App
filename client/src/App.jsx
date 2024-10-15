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

const App = () => {
  return (
    <AppLayout>
      <Router>
        <Routes>
          <Route
            path="/sign-in"
            element={user ? <Navigate to={"/messages"} /> : <SignIn />}
          />
        </Routes>
      </Router>
    </AppLayout>
  );
};

export default App;
