import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import Layout from '../components/Layout';
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const TransferFunds = () => {
  const navigate = useNavigate();
  const { accounts, addTransaction } = useData();
  const [formData, setFormData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: 0,
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validation
    if (formData.fromAccount === formData.toAccount) {
      setError('Cannot transfer to the same account');
      setIsLoading(false);
      return;
    }

    const fromAcc = accounts.find(acc => acc.id === formData.fromAccount);
    if (!fromAcc || fromAcc.balance < formData.amount) {
      setError('Insufficient balance in source account');
      setIsLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Add transaction
    addTransaction({
      accountId: formData.fromAccount,
      type: 'Transfer',
      amount: formData.amount,
      description: formData.description || 'Fund Transfer',
      status: 'Success',
      toAccount: accounts.find(acc => acc.id === formData.toAccount)?.accountNumber
    });

    setSuccess(true);
    setIsLoading(false);

    // Redirect after success
    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  if (success) {
    return (
      <Layout>
        <div className="p-8 flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Transfer Successful!</h2>
            <p className="text-gray-300 mb-6">
              ₹{formData.amount.toLocaleString('en-IN')} has been successfully transferred.
            </p>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <div className="text-left">
                  <p className="text-gray-300 text-sm">From</p>
                  <p className="text-white font-semibold">
                    {accounts.find(acc => acc.id === formData.fromAccount)?.bank}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {accounts.find(acc => acc.id === formData.fromAccount)?.accountNumber}
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-blue-400" />
                <div className="text-right">
                  <p className="text-gray-300 text-sm">To</p>
                  <p className="text-white font-semibold">
                    {accounts.find(acc => acc.id === formData.toAccount)?.bank}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {accounts.find(acc => acc.id === formData.toAccount)?.accountNumber}
                  </p>
                </div>
              </div>
              <div className="border-t border-white/20 pt-4">
                <p className="text-gray-300 text-sm">Amount Transferred</p>
                <p className="text-2xl font-bold text-green-400">₹{formData.amount.toLocaleString('en-IN')}</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-4">Redirecting to dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Transfer Funds</h1>
              <p className="text-gray-300">Transfer money between your accounts instantly</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-400/20 rounded-lg p-4 flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              {/* From Account */}
              <div>
                <label htmlFor="fromAccount" className="block text-sm font-medium text-gray-200 mb-2">
                  From Account
                </label>
                <select
                  id="fromAccount"
                  name="fromAccount"
                  value={formData.fromAccount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select source account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.bank} - {account.accountType} (₹{account.balance.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              {/* To Account */}
              <div>
                <label htmlFor="toAccount" className="block text-sm font-medium text-gray-200 mb-2">
                  To Account
                </label>
                <select
                  id="toAccount"
                  name="toAccount"
                  value={formData.toAccount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select destination account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.bank} - {account.accountType} ({account.accountNumber})
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-200 mb-2">
                  Amount to Transfer (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">₹</span>
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    min="1"
                    step="0.01"
                    value={formData.amount || ''}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter amount"
                    required
                  />
                </div>
                {formData.fromAccount && (
                  <p className="text-gray-400 text-sm mt-1">
                    Available balance: ₹{accounts.find(acc => acc.id === formData.fromAccount)?.balance.toLocaleString('en-IN') || '0'}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-200 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Enter transfer description (e.g., Rent payment, Emergency fund)"
                />
              </div>

              {/* Transfer Preview */}
              {formData.fromAccount && formData.toAccount && formData.amount > 0 && (
                <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-4">
                  <h3 className="text-blue-200 font-semibold mb-3">Transfer Summary</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <p className="text-blue-100 text-sm">From</p>
                      <p className="text-white font-medium">
                        {accounts.find(acc => acc.id === formData.fromAccount)?.bank}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <ArrowRight className="w-5 h-5 text-blue-400" />
                      <div className="text-center">
                        <p className="text-blue-100 text-sm">Amount</p>
                        <p className="text-xl font-bold text-white">₹{formData.amount.toLocaleString('en-IN')}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-right">
                      <p className="text-blue-100 text-sm">To</p>
                      <p className="text-white font-medium">
                        {accounts.find(acc => acc.id === formData.toAccount)?.bank}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !formData.fromAccount || !formData.toAccount || formData.amount <= 0}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    'Transfer Funds'
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Security Info */}
          <div className="mt-6 bg-green-500/10 border border-green-400/20 rounded-lg p-4">
            <h3 className="text-green-200 font-semibold mb-2">🔒 Secure Transfer</h3>
            <p className="text-green-100 text-sm">
              All transfers are encrypted and processed securely. You'll receive instant confirmation 
              and the transaction will be reflected in both accounts immediately.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransferFunds;