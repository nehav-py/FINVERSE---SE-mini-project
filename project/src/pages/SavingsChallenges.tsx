import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import Layout from '../components/Layout';
import { 
  ArrowLeft, 
  Target, 
  Trophy, 
  Calendar,
  TrendingUp,
  Gift,
  Star,
  CheckCircle,
  Plus,
  Clock,
  Zap
} from 'lucide-react';

const SavingsChallenges = () => {
  const navigate = useNavigate();
  const { challenges, joinChallenge } = useData();
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

  const availableChallenges = [
    {
      id: '3',
      title: 'Emergency Fund Builder',
      description: 'Build a solid emergency fund of ₹1,00,000 in 12 months',
      goalAmount: 100000,
      currentAmount: 0,
      deadline: '2024-12-31',
      reward: 5000,
      isActive: false,
      isCompleted: false,
      difficulty: 'Medium',
      participants: 1250
    },
    {
      id: '4',
      title: 'Daily Savings Streak',
      description: 'Save at least ₹100 every day for 30 days straight',
      goalAmount: 3000,
      currentAmount: 0,
      deadline: '2024-02-29',
      reward: 300,
      isActive: false,
      isCompleted: false,
      difficulty: 'Easy',
      participants: 2100
    },
    {
      id: '5',
      title: 'Investment Kickstart',
      description: 'Start your investment journey by saving ₹25,000 for investments',
      goalAmount: 25000,
      currentAmount: 0,
      deadline: '2024-06-30',
      reward: 1250,
      isActive: false,
      isCompleted: false,
      difficulty: 'Hard',
      participants: 850
    }
  ];

  const allChallenges = [...challenges, ...availableChallenges];

  const handleJoinChallenge = (challengeId: string) => {
    joinChallenge(challengeId);
    setSelectedChallenge(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400 bg-green-500/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'Hard': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'from-green-400 to-emerald-500';
    if (progress >= 50) return 'from-yellow-400 to-orange-500';
    return 'from-blue-400 to-purple-500';
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
              <h1 className="text-3xl font-bold text-white">Savings Challenges</h1>
              <p className="text-gray-300">Gamify your savings journey and earn rewards</p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Active Challenges</p>
                  <p className="text-2xl font-bold text-white">{challenges.filter(c => c.isActive).length}</p>
                </div>
                <Target className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-white">{challenges.filter(c => c.isCompleted).length}</p>
                </div>
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Total Saved</p>
                  <p className="text-2xl font-bold text-white">
                    ₹{challenges.reduce((sum, c) => sum + c.currentAmount, 0).toLocaleString('en-IN')}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Rewards Earned</p>
                  <p className="text-2xl font-bold text-white">
                    ₹{challenges.filter(c => c.isCompleted).reduce((sum, c) => sum + c.reward, 0).toLocaleString('en-IN')}
                  </p>
                </div>
                <Gift className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Active Challenges */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>Your Active Challenges</span>
              </h2>
              
              <div className="space-y-4">
                {challenges.filter(c => c.isActive || c.isCompleted).map((challenge) => {
                  const progress = (challenge.currentAmount / challenge.goalAmount) * 100;
                  const daysLeft = Math.ceil((new Date(challenge.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <div key={challenge.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-white font-semibold">{challenge.title}</h3>
                          <p className="text-gray-300 text-sm">{challenge.description}</p>
                        </div>
                        {challenge.isCompleted && (
                          <div className="flex items-center space-x-1 text-green-400">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-xs font-semibold">COMPLETED</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 text-sm">Progress</span>
                          <span className="text-white font-semibold">
                            ₹{challenge.currentAmount.toLocaleString('en-IN')} / ₹{challenge.goalAmount.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3">
                          <div
                            className={`bg-gradient-to-r ${getProgressColor(progress)} h-3 rounded-full transition-all duration-500`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                        <p className="text-gray-400 text-xs mt-1">{Math.round(progress)}% completed</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1 text-gray-300">
                            <Calendar className="w-4 h-4" />
                            <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-yellow-400">
                            <Gift className="w-4 h-4" />
                            <span>₹{challenge.reward.toLocaleString('en-IN')} reward</span>
                          </div>
                        </div>
                        {challenge.isCompleted && (
                          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200">
                            Claim Reward
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                
                {challenges.filter(c => c.isActive || c.isCompleted).length === 0 && (
                  <div className="text-center py-8">
                    <Target className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-300">No active challenges yet</p>
                    <p className="text-gray-400 text-sm">Join a challenge to start saving!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Available Challenges */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                <Plus className="w-5 h-5 text-green-400" />
                <span>Available Challenges</span>
              </h2>
              
              <div className="space-y-4">
                {availableChallenges.map((challenge) => (
                  <div key={challenge.id} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white font-semibold">{challenge.title}</h3>
                        <p className="text-gray-300 text-sm">{challenge.description}</p>
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.difficulty}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-xs">Goal Amount</p>
                        <p className="text-white font-semibold">₹{challenge.goalAmount.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Reward</p>
                        <p className="text-yellow-400 font-semibold">₹{challenge.reward.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Deadline</p>
                        <p className="text-white text-sm">{new Date(challenge.deadline).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Participants</p>
                        <p className="text-blue-400 text-sm">{challenge.participants.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleJoinChallenge(challenge.id)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02]"
                    >
                      Join Challenge
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Challenge Benefits */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Trophy className="w-6 h-6 text-green-400" />
                <h3 className="text-green-200 font-semibold">Earn Rewards</h3>
              </div>
              <p className="text-green-100 text-sm">
                Complete challenges to earn cash rewards, bonus points, and exclusive benefits that boost your savings.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-blue-400" />
                <h3 className="text-blue-200 font-semibold">Build Habits</h3>
              </div>
              <p className="text-blue-100 text-sm">
                Develop consistent saving habits through structured challenges that make financial discipline fun and engaging.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Star className="w-6 h-6 text-purple-400" />
                <h3 className="text-purple-200 font-semibold">Community</h3>
              </div>
              <p className="text-purple-100 text-sm">
                Join thousands of savers in challenges, share progress, and get motivated by the community's success stories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SavingsChallenges;