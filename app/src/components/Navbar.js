import React, { useState } from "react";
import AddPhase from "./AddPhase";

const Navbar = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light px-4">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Dashboard
          </a>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <form class="d-flex ">
            <button
              class="btn btn-outline-primary btn-sm"
              type="button"
              onClick={toggle}
            >
              Add New Phase
            </button>
          </form>
        </div>
      </nav>
      <AddPhase modal={modal} setModal={setModal} toggle={toggle} />
    </div>
  );
};

export default Navbar;
