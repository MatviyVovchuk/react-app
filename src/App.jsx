import { useState } from "react";

import "./styles/css/styles.css";
import Header from "./components/Header";
import Blog from "./pages/Blog";

function App() {
  return (
    <div className="app-container">
      <Blog />
    </div>
  );
}

export default App;
