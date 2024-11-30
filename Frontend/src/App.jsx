/* eslint-disable no-unused-vars */
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";

import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import DisplayBooks from "./Wraper/DisplayBooks";
import AddingBook from "./Wraper/AddingBook";
import UpdatingBook from "./Wraper/Updatingbook";
import Login from "./components/Login";

function App() {
  const [authUser, setAuthUser] = useAuth();

  return (
    <div className="bg-white text-black dark:bg-slate-900 dark:text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/books"
          element={authUser ? <DisplayBooks /> : <Navigate to="/login" />}
        />
        <Route
          path="/addbook"
          element={authUser ? <AddingBook /> : <Navigate to="/login" />}
        />
        <Route
          path="/updatebook"
          element={authUser ? <UpdatingBook /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
