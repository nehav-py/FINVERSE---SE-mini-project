import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import Layout from '../components/Layout';
import { 
  ArrowLeft, 
  CreditCard, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock,
  Star,
  Calendar,
  Shield,
  Settings,
  AlertTriangle,
  CheckCircle,
  Gift
} from 'lucide-react';

const ManageCards = () => {
  const navigate = useNavigate();
  const { cards, updateCard } = useData();
  const [showCardNumbers, setShowCardNumbers] = useState<{[key: string]: boolean}>({});
  const [actionLoading, setActionLoading] = useState<{[key: string]: boolean}>({});

  const toggleCardVisibility = (cardId: string) => {
    setShowCardNumbers(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const handleCardAction = async (cardId: string, action: string, newValue: any) => {
    setActionLoading(prev => ({ ...prev, [cardId]: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateCard(cardId, { [action]: newValue });
    
    setActionLoading(prev => ({ ...prev, [cardId]: false }));
  };

  const getCardIcon = (type: string) => {
    const icons: {[key: string]: string} = {
      'Credit': '💳',
      'Debit': '💰',
      'ATM': '🏧',
      'Prepaid': '💵',
      'KCC': '🌾',
      'Business': '🏢',
      'Visa': '🌍',
      'Master': '🌐',
      'RuPay': '🇮🇳'
    };
    return icons[type] || '💳';
  };

  const getExpiryStatus = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const monthsUntilExpiry = (expiry.getFullYear() - now.getFullYear()) * 12 + (expiry.getMonth() - now.getMonth());
    
    if (monthsUntilExpiry < 0) return { status: 'expired', color: 'text-red-400', message: 'Expired' };
    if (monthsUntilExpiry <= 3) return { status: 'expiring', color: 'text-yellow-400', message: 'Expiring Soon' };
    return { status: 'valid', color: 'text-green-400', message: 'Valid' };
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
              <h1 className="text-3xl font-bold text-white">Manage Cards</h1>
              <p className="text-gray-300">Control your cards, view details, and manage settings</p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {cards.map((card) => {
              const expiryStatus = getExpiryStatus(`20${card.expiryDate.split('/')[1]}-${card.expiryDate.split('/')[0]}-01`);
              const isLoading = actionLoading[card.id];
              
              return (
                <div key={card.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{getCardIcon(card.type)}</span>
                      <div>
                        <h3 className="text-lg font-bold text-white">{card.type} Card</h3>
                        <p className="text-gray-300 text-sm">{card.bank}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        card.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {card.isActive ? 'Active' : 'Blocked'}
                      </div>
                      {card.rewardsActive && (
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                          <Star className="w-3 h-3 mr-1" />
                          Rewards
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="bg-white/5 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Card Number</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-white font-mono">
                            {showCardNumbers[card.id] ? card.number.replace(/\*/g, '1234') : card.number}
                          </p>
                          <button
                            onClick={() => toggleCardVisibility(card.id)}
                            className="text-gray-400 hover:text-white transition-colors duration-200"
                          >
                            {showCardNumbers[card.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-1">CVV</p>
                        <p className="text-white font-mono">{showCardNumbers[card.id] ? '123' : card.cvv}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Expiry Date</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-white font-mono">{card.expiryDate}</p>
                          <span className={`text-xs ${expiryStatus.color}`}>
                            {expiryStatus.message}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Status</p>
                        <div className="flex items-center space-x-1">
                          {card.isActive ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                          )}
                          <span className={card.isActive ? 'text-green-400' : 'text-red-400'}>
                            {card.isActive ? 'Active' : 'Blocked'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleCardAction(card.id, 'isActive', !card.isActive)}
                      disabled={isLoading}
                      className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                        card.isActive
                          ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                          : 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                      } disabled:opacity-50`}
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      ) : card.isActive ? (
                        <Lock className="w-4 h-4" />
                      ) : (
                        <Unlock className="w-4 h-4" />
                      )}
                      <span>{card.isActive ? 'Block Card' : 'Unblock Card'}</span>
                    </button>

                    <button
                      onClick={() => handleCardAction(card.id, 'rewardsActive', !card.rewardsActive)}
                      disabled={isLoading}
                      className={`flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                        card.rewardsActive
                          ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400'
                          : 'bg-gray-500/20 hover:bg-gray-500/30 text-gray-400'
                      } disabled:opacity-50`}
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Star className="w-4 h-4" />
                      )}
                      <span>{card.rewardsActive ? 'Disable Rewards' : 'Enable Rewards'}</span>
                    </button>
                  </div>

                  {/* Expiry Warning */}
                  {expiryStatus.status === 'expiring' && (
                    <div className="mt-4 bg-yellow-500/10 border border-yellow-400/20 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-yellow-400" />
                        <p className="text-yellow-200 text-sm font-medium">Card Expiring Soon</p>
                      </div>
                      <p className="text-yellow-100 text-xs mt-1">
                        Your card expires on {card.expiryDate}. Contact your bank for renewal.
                      </p>
                    </div>
                  )}

                  {expiryStatus.status === 'expired' && (
                    <div className="mt-4 bg-red-500/10 border border-red-400/20 rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <p className="text-red-200 text-sm font-medium">Card Expired</p>
                      </div>
                      <p className="text-red-100 text-xs mt-1">
                        This card expired on {card.expiryDate}. Please contact your bank immediately.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Card Management Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <h3 className="text-blue-200 font-semibold">Security Controls</h3>
              </div>
              <p className="text-blue-100 text-sm mb-4">
                Block/unblock cards instantly, view sensitive details securely, and manage card permissions.
              </p>
              <ul className="space-y-1 text-blue-100 text-xs">
                <li>• Instant card blocking</li>
                <li>• Secure detail viewing</li>
                <li>• Transaction controls</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Gift className="w-6 h-6 text-green-400" />
                <h3 className="text-green-200 font-semibold">Rewards Management</h3>
              </div>
              <p className="text-green-100 text-sm mb-4">
                Enable or disable reward programs, track reward points, and optimize your earning potential.
              </p>
              <ul className="space-y-1 text-green-100 text-xs">
                <li>• Toggle reward programs</li>
                <li>• Track earning rates</li>
                <li>• Optimize rewards</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Settings className="w-6 h-6 text-purple-400" />
                <h3 className="text-purple-200 font-semibold">Smart Monitoring</h3>
              </div>
              <p className="text-purple-100 text-sm mb-4">
                Get alerts for expiring cards, unusual activity, and optimization opportunities.
              </p>
              <ul className="space-y-1 text-purple-100 text-xs">
                <li>• Expiry notifications</li>
                <li>• Activity monitoring</li>
                <li>• Usage insights</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageCards;