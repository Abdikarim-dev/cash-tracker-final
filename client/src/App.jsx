import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Home from "./pages/Home";
// import Inventory from "./pages/Inventory";
// import AuditLogs from "./pages/AuditLogs";
// import Store from "./pages/Store";
// import DamagedItems from "./pages/DamagedItems";
import DashboardLayout from "./components/DashboardLayout";
// import Category from "./pages/Category";
// import ExportedItems from "./pages/ExportedItems";
// import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Accounts from "./pages/Accounts";
import TransferAmounts from "./pages/TransferAmounts";
import Transactions from "./pages/Transactions";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            {/* Admin-only routes */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="user" element={<Users />} />
              <Route path="account" element={<Accounts />} />
              <Route path="transfer" element={<TransferAmounts />} />
              <Route path="transaction" element={<Transactions />} />
              {/* <Route path="category" element={<Category />} />
              <Route path="audit-log" element={<AuditLogs />} />
              <Route path="store" element={<Store />} /> */}
            </Route>

            {/* Admin+Staff routes */}
            <Route
              element={<ProtectedRoute allowedRoles={["ADMIN", "STAFF"]} />}
            >
              {/* <Route path="inventory" element={<Inventory />} />
              <Route path="exported-item" element={<ExportedItems />} />
              <Route path="damaged-item" element={<DamagedItems />} />
              <Route path="user-profile" element={<Profile />} /> */}
              <Route index element={<Home />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
