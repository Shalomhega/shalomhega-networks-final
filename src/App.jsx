import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout.jsx";
import { routes } from "./routes/routes.js";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
function App(){return <BrowserRouter><Routes><Route path="/admin" element={<AdminLogin/>}/><Route path="/admin/dashboard" element={<AdminDashboard/>}/><Route element={<MainLayout/>}>{routes.map(({path,Component})=><Route key={path} path={path} element={<Component/>}/>)}</Route></Routes></BrowserRouter>}
export default App;
