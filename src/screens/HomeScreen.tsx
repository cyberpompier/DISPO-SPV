import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Loader2, ShieldCheck, ShieldAlert, Users, Activity } from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const toggleAvailability = () => {
    const newState = !isAvailable;
    setIsAvailable(newState);
    toast.success(newState ? 'DISPONIBLE' : 'HORS SERVICE', {
      description: newState ? 'Engagement immédiat possible.' : 'Statut mis à jour au centre.',
      duration: 3000,
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.info('Synchronisation terminée', {
        description: 'Effectifs et alertes à jour.'
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-10 animate-fade-in relative min-h-full pb-10">
      {/* Pull to refresh visual */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-50">
        <AnimatePresence>
          {isRefreshing && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 30 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 px-4 py-2 glass rounded-full shadow-premium"
            >
              <Loader2 className="animate-spin text-primary-red" size={14} />
              <span className="text-[10px] font-black uppercase tracking-widest text-white">Mise à jour...</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hero Tactical Status Card */}
      <section 
        className="flex flex-col gap-8 pt-4"
        onTouchStart={(e) => {
          const touch = e.touches[0];
          const startY = touch.clientY;
          const handleTouchMove = (moveEvent: TouchEvent) => {
            const currentY = moveEvent.touches[0].clientY;
            if (currentY - startY > 120 && !isRefreshing) {
              handleRefresh();
              document.removeEventListener('touchmove', handleTouchMove);
            }
          };
          document.addEventListener('touchmove', handleTouchMove, { passive: true });
          document.addEventListener('touchend', () => {
            document.removeEventListener('touchmove', handleTouchMove);
          }, { once: true });
        }}
      >
        <div className="flex flex-col gap-1 px-2">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted">Système Flotte</span>
          <h2 className="text-4xl font-black text-white tracking-tighter">Mon Statut</h2>
        </div>

        <motion.div 
          layout
          className={`glass-card rounded-[48px] p-10 relative overflow-hidden transition-all duration-700 shadow-premium ${
            isAvailable ? 'ring-2 ring-status-green/30' : 'ring-2 ring-white/5'
          }`}
        >
          {/* Status Glow Background */}
          <div className={`absolute inset-0 opacity-20 blur-[100px] -z-10 transition-colors duration-1000 ${
            isAvailable ? 'bg-status-green' : 'bg-primary-red'
          }`} />
          
          <div className="flex flex-col items-center gap-10">
            <div className="flex flex-col items-center gap-5">
              <motion.div 
                animate={{ 
                  scale: isAvailable ? [1, 1.05, 1] : 1,
                  boxShadow: isAvailable ? ['0 0 20px rgba(52,199,89,0.2)', '0 0 40px rgba(52,199,89,0.4)', '0 0 20px rgba(52,199,89,0.2)'] : '0 0 0px transparent'
                }}
                transition={{ repeat: Infinity, duration: 4 }}
                className={`w-32 h-32 rounded-full flex items-center justify-center border-4 transition-all duration-700 ${
                  isAvailable ? 'border-status-green bg-status-green/10' : 'border-white/10 bg-white/5'
                }`}
              >
                {isAvailable ? <ShieldCheck size={56} className="text-status-green" /> : <ShieldAlert size={56} className="text-text-muted" />}
              </motion.div>
              <div className="flex flex-col items-center">
                <span className={`text-4xl font-black tracking-tight transition-colors duration-700 ${isAvailable ? 'text-white' : 'text-text-muted'}`}>
                  {isAvailable ? 'DISPONIBLE' : 'HORS SERVICE'}
                </span>
                <span className="text-xs font-bold text-text-muted mt-2 uppercase tracking-widest italic opacity-60">Prêt pour engagement</span>
              </div>
            </div>

            <button 
              onClick={toggleAvailability}
              className={`w-full py-6 rounded-[32px] font-black text-lg tracking-widest transition-all duration-500 shadow-2xl border-none ${
                isAvailable 
                ? 'bg-white text-black hover:bg-white/90' 
                : 'bg-primary-red text-white hover:bg-primary-red/90'
              }`}
            >
              {isAvailable ? 'QUITTER LA GARDE' : 'PRENDRE LA GARDE'}
            </button>
          </div>
        </motion.div>
      </section>

      {/* Quick Team Insights */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-text-muted italic">Caserne en Direct</h3>
          <span className="text-[10px] font-black text-white bg-white/10 px-4 py-1.5 rounded-full border border-white/10">12 ACTIFS</span>
        </div>
        
        <div className="grid grid-cols-2 gap-5">
          <div className="glass-card rounded-[32px] p-6 border border-white/10 flex flex-col gap-4 shadow-lg group active:scale-[0.96] transition-all">
            <div className="w-12 h-12 rounded-[20px] bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-all">
              <Users size={22} className="text-white/80" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white tracking-tighter">4/6</span>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Équipiers</span>
            </div>
          </div>
          <div className="glass-card rounded-[32px] p-6 border border-white/10 flex flex-col gap-4 shadow-lg group active:scale-[0.96] transition-all">
            <div className="w-12 h-12 rounded-[20px] bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-all">
              <Activity size={22} className="text-white/80" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white tracking-tighter">SOLIDE</span>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Couverture</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
