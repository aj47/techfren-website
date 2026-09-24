import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Projects from "./pages/Projects.jsx";
import PreloadResources from "./components/PreloadResources.jsx";

function App() {
  return (
    <HelmetProvider>
      <PreloadResources />
      <Router>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/timeline" element={<Navigate to="/projects" replace />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
