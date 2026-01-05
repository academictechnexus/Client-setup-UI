import { Routes, Route } from "react-router-dom";
import Setup from "./pages/Setup";
import Success from "./pages/Success";
import Invalid from "./pages/Invalid";

export default function App() {
  return (
    <Routes>
      <Route path="/setup/:token" element={<Setup />} />
      <Route path="/success" element={<Success />} />
      <Route path="*" element={<Invalid />} />
    </Routes>
  );
}
