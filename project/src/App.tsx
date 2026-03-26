import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AddAccount from './pages/AddAccount';
import TransferFunds from './pages/TransferFunds';
import AllTransactions from './pages/AllTransactions';
import CardSwitching from './pages/CardSwitching';
import AICardRecommendations from './pages/AICardRecommendations';
import ManageCards from './pages/ManageCards';
import SavingsChallenges from './pages/SavingsChallenges';
import Rewards from './pages/Rewards';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              {/* User Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute requiredRole="user">
                  <UserDashboard />
                </ProtectedRoute>
              } />
              <Route path="/add-account" element={
                <ProtectedRoute requiredRole="user">
                  <AddAccount />
                </ProtectedRoute>
              } />
              <Route path="/transfer" element={
                <ProtectedRoute requiredRole="user">
                  <TransferFunds />
                </ProtectedRoute>
              } />
              <Route path="/transactions" element={
                <ProtectedRoute requiredRole="user">
                  <AllTransactions />
                </ProtectedRoute>
              } />
              <Route path="/card-switching" element={
                <ProtectedRoute requiredRole="user">
                  <CardSwitching />
                </ProtectedRoute>
              } />
              <Route path="/ai-recommendations" element={
                <ProtectedRoute requiredRole="user">
                  <AICardRecommendations />
                </ProtectedRoute>
              } />
              <Route path="/manage-cards" element={
                <ProtectedRoute requiredRole="user">
                  <ManageCards />
                </ProtectedRoute>
              } />
              <Route path="/challenges" element={
                <ProtectedRoute requiredRole="user">
                  <SavingsChallenges />
                </ProtectedRoute>
              } />
              <Route path="/rewards" element={
                <ProtectedRoute requiredRole="user">
                  <Rewards />
                </ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;