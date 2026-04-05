import React, { useState } from 'react';
import { Home, Calendar, Bell, Repeat, User as UserIcon, Menu } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { HomeScreen } from './screens/HomeScreen.tsx';
import { PlanningScreen } from './screens/PlanningScreen.tsx';
import { AlertsScreen } from './screens/AlertsScreen.tsx';
import { ExchangeScreen } from './screens/ExchangeScreen.tsx';
import { ProfileScreen } from './screens/ProfileScreen.tsx';
import { Toaster } from 'sonner';

type Screen = 'home' | 'planning' | 'alerts' | 'exchanges' | 'profile';

const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home': return <HomeScreen />;
      case 'planning': return <PlanningScreen />;
      case 'alerts': return <AlertsScreen />;
      case 'exchanges': return <ExchangeScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-dark">
      <Toaster position="top-center" richColors />
      {/* Header */}
      <header className="glass fixed top-0 w-full z-40 safe-area-top px-5 py-4 flex items-center justify-between border-b border-white/5">
        <button className="flex items-center text-text-secondary">
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-red rounded-lg flex items-center justify-center shadow-lg">
            <Repeat size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold italic text-white tracking-tight">
            Garde<span className="text-primary-red">Flash</span>
          </span>
        </div>
        <button className="text-text-secondary relative" onClick={() => setActiveScreen('alerts')}>
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary-red rounded-full border-2 border-bg-dark" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-24 px-6 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <nav className="glass fixed bottom-0 w-full z-40 safe-area-bottom px-4 py-3 pb-8 flex justify-between items-center border-t border-white/10 rounded-t-3xl shadow-lg">
        <NavItem 
          active={activeScreen === 'home'} 
          onClick={() => setActiveScreen('home')} 
          icon={<Home size={20} />} 
          label="Statut" 
        />
        <NavItem 
          active={activeScreen === 'planning'} 
          onClick={() => setActiveScreen('planning')} 
          icon={<Calendar size={20} />} 
          label="Planning" 
        />
        <NavItem 
          active={activeScreen === 'alerts'} 
          onClick={() => setActiveScreen('alerts')} 
          icon={<Bell size={20} />} 
          label="Alertes" 
        />
        <NavItem 
          active={activeScreen === 'exchanges'} 
          onClick={() => setActiveScreen('exchanges')} 
          icon={<Repeat size={20} />} 
          label="Échanges" 
        />
        <NavItem 
          active={activeScreen === 'profile'} 
          onClick={() => setActiveScreen('profile')} 
          icon={<UserIcon size={20} />} 
          label="Profil" 
        />
      </nav>
    </div>
  );
};

interface NavItemProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all flex-1 ${
      active ? 'text-primary-red' : 'text-text-muted hover:text-text-secondary'
    }`}
  >
    <div className={`p-1.5 rounded-xl transition-all ${
      active ? 'bg-primary-red/10' : ''
    }`}>
      {icon}
    </div>
    <span className={`text-[9px] font-bold uppercase tracking-wide ${active ? 'opacity-100' : 'opacity-60'}`}>
      {label}
    </span>
  </button>
);

export default App;
