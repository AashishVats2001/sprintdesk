import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Board from "./pages/Board";
import Analytics from "./pages/Analytics";

import AppLayout from "./components/layout/AppLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import PublicRoute from "./components/layout/PublicRoute";
import AppInitializer from "./components/layout/AppInitializer";

export default function App() {
  return (
    <BrowserRouter>
      <AppInitializer>

        <Routes>
          {/* Public Route*/}
          <Route element={<PublicRoute />}>

            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected Route */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/board"
                element={<Board />}
              />

              <Route
                path="/analytics"
                element={<Analytics />}
              />
            </Route>
          </Route>

          {/* Fallback */}
          <Route
            path="*"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />
        </Routes>

      </AppInitializer>
    </BrowserRouter>
  );
}