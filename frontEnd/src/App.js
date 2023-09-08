import React from "react";
import "../src/assets/scss/styles.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Pages";
import { useState } from "react";

export default function App() {
  return (
    <>
      <Router>  
        <Home />
      </Router>
    </>
  );
}