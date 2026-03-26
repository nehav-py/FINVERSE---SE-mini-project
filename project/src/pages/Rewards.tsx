import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import Layout from '../components/Layout';
import { 
  ArrowLeft, 
  Gift, 
  Star,
  Calendar,
  CheckCircle,
  Clock,
  Trophy,
  Sparkles,
  Tag,
  CreditCard,
  ShoppingBag
} from 'lucide-react';

const Rewards = () => {
  const navigate = useNavigate();
  const { rewards, claimReward } = useData();
  const [claimingReward, setClaimingReward] = useState<string | null>(null);

  const additionalRewards = [
    {
      id: '3',
      title: '₹200 Cashback',
      description: 'Complete 5 transactions this month',
      points: 200,
      isClaimed: false,
      expiryDate: '2024-03-15',
      type: 'Cashback' as const,
      progress: 3,
      target: 5
    },
    {
      id: '4',
      title: 'Flipkart Voucher ₹500',
      description: 'Spend ₹10,000 using your credit card',
      points: 500,
      isClaimed: false,
      expiryDate: '2024-04-30',
      type: 'Voucher' as const,
      progress: 7500,
      target: 10000
    },
    {
      id: '5',
      title: '1000 Reward Points',
      description: 'Maintain minimum balance for 3 months',
      points: 1000,
      isClaimed: false,
      expiryDate: '2024-05-31',
      type: 'Points' as const,
      progress: 2,
      target: 3
    }
  ];

  const allRewards = [...rewards, ...additionalRewards];

  const handleClaimReward = async (rewardId: string) => {
    setClaimingReward(rewardId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    claimReward(rewardId);
    setClaimingReward(null);
  };

  const getRewardIcon = (type: string) => {
    switch (type) {
      case 'Cashback': return <CreditCard className="w-6 h-6 text-green-400" />;
      case 'Voucher': return <ShoppingBag className="w-6 h-6 text-blue-400" />;
      case 'Points': return <Star className="w-6 h-6 text-yellow-400" />;
      default: return <Gift className="w-6 h-6 text-purple-400" />;
    }
  };

  const getRewardColor = (type: string) => {
    switch (type) {
      case 'Cashback': return 'from-green-500/10 to-emerald-500/10 border-green-400/20';
      case 'Voucher': return 'from-blue-500/10 to-purple-500/10 border-blue-400/20';
      case 'Points': return 'from-yellow-500/10 to-orange-500/10 border-yellow-400/20';
      default: return 'from-purple-500/10 to-pink-500/10 border-purple-400/20';
    }
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  };

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  const unclaimedRewards = allRewards.filter(r => !r.isClaimed && !isExpired(r.expiryDate));
  const claimedRewards = allRewards.filter(r => r.isClaimed);
  const expiredRewards = allRewards.filter(r => !r.isClaimed && isExpired(r.expiryDate));

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
              <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
                <Gift className="w-8 h-8 text-purple-400" />
                <span>Rewards Center</span>
              </h1>
              <p className="text-gray-300">Claim your rewards and track your earnings</p>
            </div>
          </div>

          {/* Rewards Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Available Rewards</p>
                  <p className="text-2xl font-bold text-white">{unclaimedRewards.length}</p>
                </div>
                <Gift className="w-8 h-8 text-purple-400" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Value</p>
                  <p className="text-2xl font-bold text-white">
                    ₹{unclaimedRewards.reduce((sum, r) => sum + r.points, 0).toLocaleString('en-IN')}
                  </p>
                </div>
                <Tag className="w-8 h-8 text-green-400" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Claimed</p>
                  <p className="text-2xl font-bold text-white">{claimedRewards.length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Lifetime Earned</p>
                  <p className="text-2xl font-bold text-white">
                    ₹{allRewards.filter(r => r.isClaimed).reduce((sum, r) => sum + r.points, 0).toLocaleString('en-IN')}
                  </p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </div>

          {/* Available Rewards */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <span>Available Rewards</span>
            </h2>
            
            {unclaimedRewards.length === 0 ? (
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-12 border border-white/20 text-center">
                <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Available Rewards</h3>
                <p className="text-gray-300">Complete more challenges and transactions to earn rewards!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {unclaimedRewards.map((reward) => (
                  <div key={reward.id} className={`bg-gradient-to-r ${getRewardColor(reward.type)} rounded-xl p-6 border`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {getRewardIcon(reward.type)}
                        <div>
                          <h3 className="text-lg font-bold text-white">{reward.title}</h3>
                          <p className="text-gray-300 text-sm">{reward.description}</p>
                        </div>
                      </div>
                      {isExpiringSoon(reward.expiryDate) && (
                        <div className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-medium">
                          Expiring Soon
                        </div>
                      )}
                    </div>

                    {/* Progress Bar (for rewards with progress) */}
                    {'progress' in reward && reward.progress !== undefined && reward.target !== undefined && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 text-sm">Progress</span>
                          <span className="text-white font-semibold">
                            {reward.type === 'Cashback' ? `${reward.progress}/${reward.target}` : 
                             reward.type === 'Voucher' ? `₹${reward.progress.toLocaleString('en-IN')}/₹${reward.target.toLocaleString('en-IN')}` :
                             `${reward.progress}/${reward.target} months`}
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((reward.progress / reward.target) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1 text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Expires: {new Date(reward.expiryDate).toLocaleDateString()}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">₹{reward.points.toLocaleString('en-IN')}</p>
                        <p className="text-gray-300 text-xs">{reward.type}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleClaimReward(reward.id)}
                      disabled={claimingReward === reward.id || ('progress' in reward && reward.progress < reward.target)}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {claimingReward === reward.id ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Claiming...</span>
                        </div>
                      ) : ('progress' in reward && reward.progress < reward.target) ? (
                        'Complete to Claim'
                      ) : (
                        'Claim Reward'
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Claimed Rewards */}
          {claimedRewards.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span>Claimed Rewards</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {claimedRewards.map((reward) => (
                  <div key={reward.id} className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex items-center space-x-3 mb-4">
                      {getRewardIcon(reward.type)}
                      <div>
                        <h3 className="text-lg font-semibold text-white">{reward.title}</h3>
                        <p className="text-gray-400 text-sm">{reward.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 text-sm font-medium">Claimed</span>
                      </div>
                      <p className="text-lg font-bold text-gray-300">₹{reward.points.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expired Rewards */}
          {expiredRewards.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Clock className="w-6 h-6 text-red-400" />
                <span>Expired Rewards</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {expiredRewards.map((reward) => (
                  <div key={reward.id} className="bg-red-500/5 rounded-xl p-6 border border-red-500/20 opacity-60">
                    <div className="flex items-center space-x-3 mb-4">
                      {getRewardIcon(reward.type)}
                      <div>
                        <h3 className="text-lg font-semibold text-white">{reward.title}</h3>
                        <p className="text-gray-400 text-sm">{reward.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-red-400" />
                        <span className="text-red-400 text-sm font-medium">Expired</span>
                      </div>
                      <p className="text-lg font-bold text-gray-400">₹{reward.points.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Rewards;