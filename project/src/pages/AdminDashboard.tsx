import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import Layout from '../components/Layout';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
  Shield,
  Activity
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { accounts, transactions } = useData();

  // Mock admin data
  const adminStats = {
    totalUsers: 1250,
    activeAccounts: accounts.length * 625, // Simulate more accounts
    totalTransactions: transactions.length * 417, // Simulate more transactions
    pendingIssues: 3
  };

  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="p-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Admin Dashboard - Welcome, {user?.name}! 🛡️
          </h1>
          <p className="text-gray-300">
            Monitor and manage the Finverse banking platform.
          </p>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{adminStats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Accounts</p>
                <p className="text-2xl font-bold text-white">{adminStats.activeAccounts.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Transactions</p>
                <p className="text-2xl font-bold text-white">{adminStats.totalTransactions.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Pending Issues</p>
                <p className="text-2xl font-bold text-white">{adminStats.pendingIssues}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-red-400 to-pink-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent System Activity */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>System Activity</span>
              </h2>
            </div>
            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.type === 'Deposit' ? 'bg-green-500/20' :
                      transaction.type === 'Withdrawal' ? 'bg-red-500/20' : 'bg-blue-500/20'
                    }`}>
                      {transaction.type === 'Deposit' ? (
                        <ArrowDownRight className="w-4 h-4 text-green-400" />
                      ) : transaction.type === 'Withdrawal' ? (
                        <ArrowUpRight className="w-4 h-4 text-red-400" />
                      ) : (
                        <ArrowLeftRight className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">
                        User #{transaction.accountId} - {transaction.description}
                      </p>
                      <p className="text-gray-400 text-xs">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold text-sm ${
                      transaction.type === 'Deposit' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      ₹{transaction.amount.toLocaleString('en-IN')}
                    </p>
                    <p className="text-gray-400 text-xs">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Management */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>User Management</span>
              </h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg text-center transition-all duration-200 transform hover:scale-105">
                  <Users className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-medium">View All Users</p>
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-lg text-center transition-all duration-200 transform hover:scale-105">
                  <Shield className="w-6 h-6 mx-auto mb-2" />
                  <p className="font-medium">Security Issues</p>
                </button>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-white font-medium mb-2">Recent User Actions</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">New registrations today</span>
                    <span className="text-green-400">+15</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Password resets</span>
                    <span className="text-yellow-400">3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Account locks</span>
                    <span className="text-red-400">1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Transaction Monitoring */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Transaction Monitoring</span>
              </h2>
            </div>
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-white font-medium mb-3">Daily Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Total Volume</span>
                    <span className="text-white font-semibold">₹45,67,890</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Successful</span>
                    <span className="text-green-400">1,247 (98.2%)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Failed</span>
                    <span className="text-red-400">23 (1.8%)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Flagged for Review</span>
                    <span className="text-yellow-400">5</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 rounded-lg font-medium transition-all duration-200">
                View Detailed Reports
              </button>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>System Health</span>
              </h2>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">API Response Time</span>
                  <span className="text-green-400 text-sm font-medium">125ms</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Database Load</span>
                  <span className="text-yellow-400 text-sm font-medium">67%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Server Uptime</span>
                  <span className="text-green-400 text-sm font-medium">99.9%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '99%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Issues Alert */}
        {adminStats.pendingIssues > 0 && (
          <div className="mt-8 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <h3 className="text-lg font-semibold text-white">Attention Required</h3>
            </div>
            <p className="text-gray-300 mb-4">
              You have {adminStats.pendingIssues} pending issues that require immediate attention.
            </p>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
              Review Issues
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;