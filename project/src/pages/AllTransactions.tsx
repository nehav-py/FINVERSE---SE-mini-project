import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import Layout from '../components/Layout';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  ArrowDownRight, 
  ArrowLeftRight, 
  Filter,
  Search,
  Calendar,
  Download,
  RotateCcw
} from 'lucide-react';

const AllTransactions = () => {
  const navigate = useNavigate();
  const { transactions, accounts } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  // Filter and sort transactions
  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || transaction.type === filterType;
      const matchesStatus = filterStatus === 'All' || transaction.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortOrder === 'oldest') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (sortOrder === 'highest') {
        return b.amount - a.amount;
      } else {
        return a.amount - b.amount;
      }
    });

  const getAccountName = (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId);
    return account ? `${account.bank} - ${account.accountType}` : 'Unknown Account';
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'Deposit':
        return <ArrowDownRight className="w-5 h-5 text-green-400" />;
      case 'Withdrawal':
        return <ArrowUpRight className="w-5 h-5 text-red-400" />;
      case 'Transfer':
        return <ArrowLeftRight className="w-5 h-5 text-blue-400" />;
      default:
        return <ArrowLeftRight className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return 'text-green-400 bg-green-500/10';
      case 'Failed':
        return 'text-red-400 bg-red-500/10';
      case 'Pending':
        return 'text-yellow-400 bg-yellow-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  const handleReverseTransaction = (transactionId: string) => {
    // In a real app, this would call an API
    alert(`Reverse transaction request submitted for ID: ${transactionId}`);
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">All Transactions</h1>
              <p className="text-gray-300">View and manage your complete transaction history</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Type Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="All">All Types</option>
                  <option value="Deposit">Deposits</option>
                  <option value="Withdrawal">Withdrawals</option>
                  <option value="Transfer">Transfers</option>
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="All">All Status</option>
                  <option value="Success">Success</option>
                  <option value="Failed">Failed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              {/* Sort Order */}
              <div>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Amount</option>
                  <option value="lowest">Lowest Amount</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
              <p className="text-gray-300">
                Showing {filteredTransactions.length} of {transactions.length} transactions
              </p>
              <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Transactions List */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            {filteredTransactions.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 text-lg mb-2">No transactions found</p>
                <p className="text-gray-400">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          transaction.type === 'Deposit' ? 'bg-green-500/20' :
                          transaction.type === 'Withdrawal' ? 'bg-red-500/20' :
                          'bg-blue-500/20'
                        }`}>
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{transaction.description}</p>
                          <p className="text-gray-300 text-sm">
                            {getAccountName(transaction.accountId)}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-gray-400 text-xs">ID: {transaction.id}</p>
                            <span className="text-gray-500">•</span>
                            <p className="text-gray-400 text-xs">{transaction.date}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className={`text-lg font-bold ${
                            transaction.type === 'Deposit' ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {transaction.type === 'Deposit' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                          </p>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </div>
                        </div>
                        
                        {transaction.status === 'Success' && (
                          <button
                            onClick={() => handleReverseTransaction(transaction.id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all duration-200"
                            title="Request Reversal"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {transaction.toAccount && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-gray-400 text-sm">
                          Transfer to: {transaction.toAccount}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Transaction Summary */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-500/10 border border-green-400/20 rounded-lg p-4">
              <h3 className="text-green-200 font-semibold mb-2">Total Credits</h3>
              <p className="text-2xl font-bold text-green-400">
                ₹{filteredTransactions
                  .filter(t => t.type === 'Deposit')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString('en-IN')}
              </p>
            </div>
            
            <div className="bg-red-500/10 border border-red-400/20 rounded-lg p-4">
              <h3 className="text-red-200 font-semibold mb-2">Total Debits</h3>
              <p className="text-2xl font-bold text-red-400">
                ₹{filteredTransactions
                  .filter(t => t.type === 'Withdrawal' || t.type === 'Transfer')
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toLocaleString('en-IN')}
              </p>
            </div>
            
            <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-4">
              <h3 className="text-blue-200 font-semibold mb-2">Net Change</h3>
              <p className="text-2xl font-bold text-blue-400">
                ₹{(filteredTransactions
                  .filter(t => t.type === 'Deposit')
                  .reduce((sum, t) => sum + t.amount, 0) -
                  filteredTransactions
                  .filter(t => t.type === 'Withdrawal' || t.type === 'Transfer')
                  .reduce((sum, t) => sum + t.amount, 0))
                  .toLocaleString('en-IN')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllTransactions;