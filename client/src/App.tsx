import ClientPage from "./pages/ClientPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ClientPage />} />
        <Route path="/signup" element={<div></div>} />
        <Route path="/login" element={<div></div>} />
      </Routes>
    </>
  );
}

export default App;
