import AuthPage from "./pages/AuthPage";
import DashBoard from "./pages/DashBoard";

function App() {
  return (
    <div className="flex justify-center">
      {!localStorage.getItem("__token__") ? (
        <AuthPage formType="login" />
      ) : (
        <DashBoard />
      )}
    </div>
  );
}

export default App;
