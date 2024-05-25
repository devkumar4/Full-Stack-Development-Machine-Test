import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import DashBoard from "./pages/DashBoard";
import PrivateRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="flex justify-center">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<AuthPage formType="login" />} />

          <Route path="/signup" element={<AuthPage formType="signup" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
