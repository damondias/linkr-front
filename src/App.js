// import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Timeline } from "./pages/index.pages";
import SingInPage from "./pages/SignInPage";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import SingUpPage from "./pages/SignUp";
import { AuthProvider } from "./contexts/authContext";

function App() {
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar/>
        <SearchBar/>
          <Routes>
            <Route path="/" element={<SingInPage />} />
            <Route path="/sign-up" element={<SingUpPage />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/user/:userId" element={"user page feature"} />
            <Route path="/hashtag/:hashtag" element={"HashtagPage feature"} />
          </Routes>
      </AuthProvider>
    </BrowserRouter>
      
  );
}

export default App
