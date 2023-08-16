import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={"Sign In feature"} />
            <Route path="/sign-up" element={"Sign Up feature "} />
            <Route path="/timeline" element={"Timeline feature"} />
            <Route path="/user/:userId" element={"user page feature"} />
            <Route path="/hashtag/:hashtag" element={"HashtagPage feature"} />
          </Routes>
    </BrowserRouter>  
  );
}

export default App
