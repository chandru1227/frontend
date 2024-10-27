import Sidebar from "./component/sidebar/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandHome } from "./component/landingpage/LandHome";
import Overview from './component/pages/Overview';
import SignInSignUp from "./component/signin";
// import YouTubeForm from "./component/pages/Youtube";
import NotFound from "./component/notFound/NotFound";
import YouTubeAnalytics from "./component/pages/Youtube";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandHome />} />
        <Route path="/signin" element={<SignInSignUp />} />
         
        <Route path="/das" element={<Sidebar />}>
          <Route index element={<Overview />} />
          <Route path="youtube" element={<YouTubeAnalytics/>} />
          {/* Add more routes here as needed */}
        </Route>

        {/* Catch-all route for Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
