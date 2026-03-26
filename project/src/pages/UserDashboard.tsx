import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import Layout from '../components/Layout';
import { 
  CreditCard, 
  TrendingUp, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  Target,
  Gift,
  Eye,
  ArrowLeftRight,
  Sparkles,
  Star
} from 'lucide-react';

const UserDashboard = () => {
  const { user } = useAuth();
  const { accounts, transactions, challenges, rewards } = useData();

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const recentTransactions = transactions.slice(0, 3);
  const activeChallenge = challenges.find(c => c.isActive);
  const unclaimedRewards = rewards.filter(r => !r.isClaimed);

  return (
    <Layout>
      <div className="p-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-300">
            Your financial dashboard with AI-powered insights and smart recommendations.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Balance</p>
                <p className="text-2xl font-bold text-white">₹{totalBalance.toLocaleString('en-IN')}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Accounts</p>
                <p className="text-2xl font-bold text-white">{accounts.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Savings Progress</p>
                <p className="text-2xl font-bold text-white">
                  {activeChallenge ? Math.round((activeChallenge.currentAmount / activeChallenge.goalAmount) * 100) : 0}%
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Available Rewards</p>
                <p className="text-2xl font-bold text-white">{unclaimedRewards.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 rounded-lg flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Account Overview */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Account Overview</h2>
              <Link
                to="/add-account"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Account</span>
              </Link>
            </div>
            <div className="space-y-4">
              {accounts.map((account) => (
                <div key={account.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{account.bank}</p>
                      <p className="text-gray-300 text-sm">{account.accountType} - {account.accountNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-white">₹{account.balance.toLocaleString('en-IN')}</p>
                      <p className="text-gray-300 text-sm">{account.branch}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Transactions</h2>
              <Link
                to="/transactions"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
              >
                <span>View All</span>
                <Eye className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
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
                      <p className="text-white text-sm font-medium">{transaction.description}</p>
                      <p className="text-gray-400 text-xs">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${
                      transaction.type === 'Deposit' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'Deposit' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                    </p>
                    <p className="text-gray-400 text-xs">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <Link
                to="/transfer"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 p-4 rounded-lg text-center transition-all duration-200 transform hover:scale-105"
              >
                <ArrowLeftRight className="w-6 h-6 text-white mx-auto mb-2" />
                <p className="text-white font-medium">Transfer Funds</p>
              </Link>
              <Link
                to="/card-switching"
                className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 p-4 rounded-lg text-center transition-all duration-200 transform hover:scale-105"
              >
                <CreditCard className="w-6 h-6 text-white mx-auto mb-2" />
                <p className="text-white font-medium">Switch Cards</p>
              </Link>
              <Link
                to="/challenges"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 p-4 rounded-lg text-center transition-all duration-200 transform hover:scale-105"
              >
                <Target className="w-6 h-6 text-white mx-auto mb-2" />
                <p className="text-white font-medium">Challenges</p>
              </Link>
              <Link
                to="/rewards"
                className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 p-4 rounded-lg text-center transition-all duration-200 transform hover:scale-105"
              >
                <Gift className="w-6 h-6 text-white mx-auto mb-2" />
                <p className="text-white font-medium">Rewards</p>
              </Link>
            </div>
          </div>

          {/* AI Card Recommendations */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span>AI Card Recommendations</span>
              </h2>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <p className="text-white font-medium">Recommended for You</p>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  Based on your spending pattern, switching to HDFC Millennia Credit Card could save you ₹2,500 annually in rewards.
                </p>
                <div className="flex space-x-3">
                  <Link
                    to="/ai-recommendations"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Learn More
                  </Link>
                  <Link
                    to="/card-switching"
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                  >
                    Switch Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Savings Challenge */}
        {activeChallenge && (
          <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">Active Savings Challenge</h2>
            <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{activeChallenge.title}</h3>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">
                    ₹{activeChallenge.currentAmount.toLocaleString('en-IN')}
                  </p>
                  <p className="text-gray-300 text-sm">
                    of ₹{activeChallenge.goalAmount.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 mb-4">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(activeChallenge.currentAmount / activeChallenge.goalAmount) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-300">{activeChallenge.description}</p>
                <Link
                  to="/challenges"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserDashboard;