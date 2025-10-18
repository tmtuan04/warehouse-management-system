import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ROUTES } from "./constants/routes";

import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App;
