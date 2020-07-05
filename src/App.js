import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import SignUpModal from "./components/Sign-up-modal";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <header className="App-header">
        <SignUpModal show={false}></SignUpModal>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
