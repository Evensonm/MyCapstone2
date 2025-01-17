import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Users from "./pages/Users";
import Businesses from "./pages/Businesses";
import CreateReview from "./pages/CreateReview";
import Home from "./pages/Home";
<<<<<<< Updated upstream
=======
import Login from "./pages/Login";
import Register from "./pages/Register";
>>>>>>> Stashed changes

function App() {
  const [auth, setAuth] = useState({});
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    attemptLoginWithToken();
  }, []);

  const attemptLoginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await fetch(`/api/auth/me`, {
        headers: {
          authorization: token,
        },
      });
      const json = await response.json();
      if (response.ok) {
        setAuth(json);
      } else {
        window.localStorage.removeItem("token");
      }
    }
  };

  const authAction = async (credentials, mode) => {
    const response = await fetch(`/api/auth/${mode}`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    if (response.ok) {
      window.localStorage.setItem("token", json.token);
      attemptLoginWithToken();
    } else {
      throw json;
    }
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setAuth({});
  };

  return (
    <>
      <h1>Seen It Business Reviews</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/businesses">Businesses ({businesses.length})</Link>
        <Link to="/users">Users ({users.length})</Link>
        {auth.id ? (
          <Link to="/createReview">Create Review</Link>
        ) : (
<<<<<<< Updated upstream
          <Link to="/">Register/Login</Link>
=======
          <Link to="/login">Login</Link>
>>>>>>> Stashed changes
        )}
      </nav>
      {auth.id && <button onClick={logout}>Logout {auth.username}</button>}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              authAction={authAction}
              auth={auth}
              businesses={businesses}
              users={users}
              reviews={reviews}
            />
          }
        />
        <Route
          path="/businesses"
          element={<Businesses businesses={businesses} />}
        />
        <Route path="/users" element={<Users users={users} />} />
        {!!auth.id && <Route path="/createReview" element={<CreateReview />} />}
<<<<<<< Updated upstream
      </Routes>
=======

        <Route path="/login" element={<Login 
        authAction={authAction}
        auth={auth}
        businesses={businesses}
        users={users}
        reviews={reviews}/>}/>

        <Route path="/register" element={<Register
        authAction={authAction}
        auth={auth}
        businesses={businesses}
        users={users}
        reviews={reviews}/>} />
        
        </Routes>
>>>>>>> Stashed changes
    </>
  );
}

export default App;
