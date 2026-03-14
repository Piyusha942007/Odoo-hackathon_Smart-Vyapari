import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/store';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Receipts from './pages/Receipts';
import Deliveries from './pages/Deliveries';
import Transfers from './pages/Transfers';
import Adjustments from './pages/Adjustments';
import Ledger from './pages/Ledger';

function App() {
    return (
        <AppProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />

                    {/* Authenticated Routes connected to Layout */}
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Navigate to="/dashboard" replace />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="products" element={<Products />} />
                        <Route path="operations/receipts" element={<Receipts />} />
                        <Route path="operations/deliveries" element={<Deliveries />} />
                        <Route path="operations/transfers" element={<Transfers />} />
                        <Route path="operations/adjustments" element={<Adjustments />} />
                        <Route path="ledger" element={<Ledger />} />
                    </Route>
                </Routes>
            </Router>
        </AppProvider>
    );
}

export default App;