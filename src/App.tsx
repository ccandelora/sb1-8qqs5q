import React from 'react';
import { BrainCog, Moon, Share2, Sparkles } from 'lucide-react';
import DreamEntry from './components/DreamEntry';
import DreamFeed from './components/DreamFeed';
import DreamStats from './components/DreamStats';
import DreamCalendar from './components/DreamCalendar';
import DreamCollections from './components/DreamCollections';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import { useAuthStore } from './store/authStore';

function App() {
  const [currentView, setCurrentView] = React.useState<'feed' | 'profile'>('feed');
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-800">
      <Navbar onViewChange={setCurrentView} currentView={currentView} />
      
      {currentView === 'feed' ? (
        <>
          {/* Hero Section */}
          <div className="container mx-auto px-4 pt-20 pb-12">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white mb-6">
                Unlock the Secrets of Your Dreams
              </h1>
              <p className="text-xl text-purple-200 mb-8">
                Document, analyze, and share your dreams with our AI-powered community
              </p>
              
              {/* Feature Cards */}
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <FeatureCard 
                  icon={<Moon className="w-8 h-8" />}
                  title="Dream Logging"
                  description="Record your dreams with our intuitive journal interface"
                />
                <FeatureCard 
                  icon={<BrainCog className="w-8 h-8" />}
                  title="AI Analysis"
                  description="Get instant AI-powered interpretation of your dreams"
                />
                <FeatureCard 
                  icon={<Share2 className="w-8 h-8" />}
                  title="Community"
                  description="Share and explore dreams with fellow dreamers"
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 py-12">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <DreamEntry />
                {user && <DreamCollections />}
                <DreamCalendar />
                <DreamStats />
                <DreamFeed />
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  Trending Dreams
                </h3>
                <TrendingDreams />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="pt-16">
          <UserProfile />
        </div>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
      <div className="text-purple-300 mb-4 flex justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-purple-200">{description}</p>
    </div>
  );
}

function TrendingDreams() {
  const trends = [
    { tag: "Flying", count: 234 },
    { tag: "Falling", count: 189 },
    { tag: "Chase", count: 156 },
    { tag: "Water", count: 143 },
    { tag: "Family", count: 128 },
  ];

  return (
    <div className="space-y-4">
      {trends.map((trend) => (
        <div 
          key={trend.tag}
          className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
        >
          <span className="text-purple-200">#{trend.tag}</span>
          <span className="text-purple-300 text-sm">{trend.count} dreams</span>
        </div>
      ))}
    </div>
  );
}

export default App;