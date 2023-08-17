// import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Timeline } from "./pages/index.pages";
import SingInPage from "./pages/SignInPage";
import SingUpPage from "./pages/SignUp";

function App() {
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<SingInPage />} /> */}
            <Route path="" element={<SingUpPage />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/user/:userId" element={"user page feature"} />
            <Route path="/hashtag/:hashtag" element={"HashtagPage feature"} />
          </Routes>
    </BrowserRouter>  
  );
}

export default App
