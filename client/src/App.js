import "./globals.css";
import {
  BrowserRouter as Router,
  // Switch,
  Routes,
  Route,
} from "react-router-dom";

import Layout from "./components/Layout";
// import Main from "./pages/Main";
import Section from "./pages/Section";
import NotFoundPage from "./pages/404";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* <Route exact path="/" component={Main} />
          <Route component={NotFoundPage} /> */}
          {/* <Route exact path="/" element={<Main />} /> */}
          <Route exact path="/" element={<Section />} />
          <Route path="/404" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
