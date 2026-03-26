import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { 
  ArrowLeft, 
  Sparkles, 
  TrendingUp, 
  CreditCard, 
  Star,
  Target,
  Gift,
  Zap,
  Shield,
  Brain,
  BarChart3,
  Wallet
} from 'lucide-react';

const AICardRecommendations = () => {
  const navigate = useNavigate();

  const recommendations = [
    {
      id: 1,
      cardName: 'HDFC Millennia Credit Card',
      bank: 'HDFC Bank',
      currentSavings: 2500,
      potentialSavings: 5000,
      matchScore: 95,
      features: ['5% cashback on online shopping', '2.5% on dining', '1% on all other spends'],
      whyRecommended: 'Based on your high online shopping frequency (₹15,000/month), this card offers maximum rewards.',
      annualFee: 1000,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 2,
      cardName: 'SBI SimplyCLICK Credit Card',
      bank: 'State Bank of India',
      currentSavings: 1800,
      potentialSavings: 3200,
      matchScore: 88,
      features: ['10X rewards on online spends', '5X on dining', 'Fuel surcharge waiver'],
      whyRecommended: 'Perfect for your digital lifestyle with high online transaction volume.',
      annualFee: 499,
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 3,
      cardName: 'ICICI Amazon Pay Credit Card',
      bank: 'ICICI Bank',
      currentSavings: 2200,
      potentialSavings: 4100,
      matchScore: 92,
      features: ['5% back on Amazon', '2% on bill payments', '1% on other spends'],
      whyRecommended: 'Your Amazon spending of ₹8,000/month makes this highly beneficial.',
      annualFee: 0,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const spendingAnalysis = {
    totalMonthlySpend: 45000,
    categories: [
      { name: 'Online Shopping', amount: 15000, percentage: 33 },
      { name: 'Dining & Food', amount: 8000, percentage: 18 },
      { name: 'Fuel & Transport', amount: 6000, percentage: 13 },
      { name: 'Bills & Utilities', amount: 5000, percentage: 11 },
      { name: 'Groceries', amount: 7000, percentage: 16 },
      { name: 'Others', amount: 4000, percentage: 9 }
    ]
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
              <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
                <Sparkles className="w-8 h-8 text-yellow-400" />
                <span>AI Card Recommendations</span>
              </h1>
              <p className="text-gray-300">Personalized card suggestions based on your spending patterns</p>
            </div>
          </div>

          {/* AI Analysis Overview */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-8 mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">AI Analysis Complete</h2>
                <p className="text-yellow-100">We've analyzed your spending patterns from the last 12 months</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-white">₹{spendingAnalysis.totalMonthlySpend.toLocaleString('en-IN')}</p>
                <p className="text-yellow-200 text-sm">Monthly Spend</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">3</p>
                <p className="text-yellow-200 text-sm">Cards Analyzed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">₹12,500</p>
                <p className="text-yellow-200 text-sm">Potential Annual Savings</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">95%</p>
                <p className="text-yellow-200 text-sm">Best Match Score</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Spending Analysis */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-6">
                <BarChart3 className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Spending Analysis</h3>
              </div>
              
              <div className="space-y-4">
                {spendingAnalysis.categories.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 text-sm">{category.name}</span>
                      <span className="text-white font-semibold">₹{category.amount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">{category.percentage}% of total spend</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Recommendations */}
            <div className="lg:col-span-2 space-y-6">
              {recommendations.map((card, index) => (
                <div key={card.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center`}>
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{card.cardName}</h3>
                        <p className="text-gray-300 text-sm">{card.bank}</p>
                        {index === 0 && (
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-yellow-400 text-xs font-semibold">AI RECOMMENDED</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <Target className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-bold">{card.matchScore}% Match</span>
                      </div>
                      <p className="text-gray-400 text-xs">Annual Fee: ₹{card.annualFee}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Key Features</h4>
                      <ul className="space-y-1">
                        {card.features.map((feature, idx) => (
                          <li key={idx} className="text-gray-300 text-sm flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-2">Potential Savings</h4>
                      <div className="bg-green-500/10 border border-green-400/20 rounded-lg p-3">
                        <p className="text-green-400 font-bold text-lg">₹{card.potentialSavings.toLocaleString('en-IN')}/year</p>
                        <p className="text-green-200 text-xs">vs current: ₹{card.currentSavings.toLocaleString('en-IN')}/year</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-4 mb-4">
                    <h4 className="text-blue-200 font-semibold mb-2">Why This Card?</h4>
                    <p className="text-blue-100 text-sm">{card.whyRecommended}</p>
                  </div>

                  <div className="flex space-x-3">
                    <Link
                      to="/card-switching"
                      className={`flex-1 bg-gradient-to-r ${card.color} hover:opacity-90 text-white py-3 px-4 rounded-lg font-semibold text-center transition-all duration-200 transform hover:scale-[1.02]`}
                    >
                      Switch to This Card
                    </Link>
                    <button className="bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-purple-400" />
                <h3 className="text-purple-200 font-semibold">Smart Analysis</h3>
              </div>
              <p className="text-purple-100 text-sm">
                Our AI analyzes your spending patterns, transaction history, and preferences to recommend the perfect cards.
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Wallet className="w-6 h-6 text-green-400" />
                <h3 className="text-green-200 font-semibold">Maximize Savings</h3>
              </div>
              <p className="text-green-100 text-sm">
                Get recommendations that can save you thousands annually through better rewards and cashback programs.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-blue-400" />
                <h3 className="text-blue-200 font-semibold">Secure & Private</h3>
              </div>
              <p className="text-blue-100 text-sm">
                Your financial data is analyzed securely with bank-grade encryption. We never store sensitive information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AICardRecommendations;