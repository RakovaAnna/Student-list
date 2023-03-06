import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import StudentsList from "./components/StudentsList";

function App() {
  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <h1 className="">Список студентов</h1>
      </nav>
      <StudentsList />
    </>
  );
}

export default App;
