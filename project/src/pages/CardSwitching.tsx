import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import Layout from '../components/Layout';
import { 
  ArrowLeft, 
  CreditCard, 
  CheckCircle, 
  Star,
  Zap,
  Shield,
  Gift
} from 'lucide-react';

const CardSwitching = () => {
  const navigate = useNavigate();
  const { cards, updateCard } = useData();
  const [selectedCard, setSelectedCard] = useState('');
  const [switchingTo, setSwitchingTo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const cardTypes = [
    { type: 'Credit', description: 'Credit Card for purchases and rewards', icon: '💳' },
    { type: 'Debit', description: 'Debit Card linked to your account', icon: '💰' },
    { type: 'ATM', description: 'ATM Card for cash withdrawals', icon: '🏧' },
    { type: 'Prepaid', description: 'Prepaid Card for controlled spending', icon: '💵' },
    { type: 'KCC', description: 'Kisan Credit Card for agricultural needs', icon: '🌾' },
    { type: 'Business', description: 'Business Card for commercial transactions', icon: '🏢' },
    { type: 'Visa', description: 'Visa Card for international acceptance', icon: '🌍' },
    { type: 'Master', description: 'MasterCard for global transactions', icon: '🌐' },
    { type: 'RuPay', description: 'RuPay Card for domestic transactions', icon: '🇮🇳' }
  ];

  const handleSwitch = async () => {
    if (!selectedCard || !switchingTo) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update card type
    updateCard(selectedCard, { type: switchingTo as any });
    
    setSuccess(true);
    setIsLoading(false);
    
    // Reset after success
    setTimeout(() => {
      setSuccess(false);
      setSelectedCard('');
      setSwitchingTo('');
    }, 3000);
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Card Switching</h1>
              <p className="text-gray-300">Switch between different card types for optimal benefits</p>
            </div>
          </div>

          {success && (
            <div className="bg-green-500/10 border border-green-400/20 rounded-xl p-6 mb-8">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <div>
                  <h3 className="text-green-200 font-semibold">Card Switch Successful!</h3>
                  <p className="text-green-100 text-sm">Your card has been successfully switched to {switchingTo}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current Cards */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-6">Your Current Cards</h2>
              <div className="space-y-4">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className={`bg-white/5 rounded-lg p-4 border cursor-pointer transition-all duration-200 ${
                      selectedCard === card.id 
                        ? 'border-blue-400 bg-blue-500/10' 
                        : 'border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => setSelectedCard(card.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">{card.type} Card</p>
                          <p className="text-gray-300 text-sm">{card.bank}</p>
                          <p className="text-gray-400 text-xs">{card.number}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          card.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {card.isActive ? 'Active' : 'Inactive'}
                        </div>
                        {card.rewardsActive && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span className="text-yellow-400 text-xs">Rewards Active</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Card Types */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-6">Switch To</h2>
              <div className="space-y-3">
                {cardTypes.map((cardType) => (
                  <div
                    key={cardType.type}
                    className={`bg-white/5 rounded-lg p-4 border cursor-pointer transition-all duration-200 ${
                      switchingTo === cardType.type 
                        ? 'border-purple-400 bg-purple-500/10' 
                        : 'border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => setSwitchingTo(cardType.type)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{cardType.icon}</span>
                      <div>
                        <p className="text-white font-medium">{cardType.type} Card</p>
                        <p className="text-gray-300 text-sm">{cardType.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Switch Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleSwitch}
              disabled={!selectedCard || !switchingTo || isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Switching Card...</span>
                </div>
              ) : (
                'Switch Card'
              )}
            </button>
          </div>

          {/* Benefits Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-green-400" />
                <h3 className="text-green-200 font-semibold">Instant Switch</h3>
              </div>
              <p className="text-green-100 text-sm">
                Switch between card types instantly without waiting for physical card replacement.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <h3 className="text-blue-200 font-semibold">Secure Process</h3>
              </div>
              <p className="text-blue-100 text-sm">
                All card switches are processed securely with bank-grade encryption and verification.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Gift className="w-6 h-6 text-purple-400" />
                <h3 className="text-purple-200 font-semibold">Better Rewards</h3>
              </div>
              <p className="text-purple-100 text-sm">
                Switch to cards with better reward programs and cashback offers based on your spending.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CardSwitching;