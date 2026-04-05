import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Loader2, ShieldCheck, ShieldAlert, Users, Activity } from 'lucide-react';
import { format, addDays, parseISO, isAfter, startOfDay } from 'date-fns';
import { INITIAL_PLANNING } from '../data/mock';

import type { DayPlanning, Status } from '../types';

type DateOption = 'today' | 'tomorrow' | 'next';

export const HomeScreen: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<DateOption>('today');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [planning, setPlanning] = useState<DayPlanning>(() => {
    const saved = localStorage.getItem('gardeflash_planning');
    return saved ? JSON.parse(saved) : INITIAL_PLANNING;
  });

  // Sync state with localStorage if it changes elsewhere
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('gardeflash_planning');
      if (saved) setPlanning(JSON.parse(saved));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const todayStr = format(new Date(), 'yyyy-MM-dd');
  const tomorrowStr = format(addDays(new Date(), 1), 'yyyy-MM-dd');

  const nextShiftDate = useMemo(() => {
    const dates = Object.keys(planning)
      .filter(date => {
        const d = parseISO(date);
        return isAfter(d, addDays(startOfDay(new Date()), 1)) && 
               (planning[date].jour === 'available' || planning[date].nuit === 'available');
      })
      .sort();
    return dates[0] || null;
  }, [planning]);

  const currentTargetDate = useMemo(() => {
    if (selectedOption === 'today') return todayStr;
    if (selectedOption === 'tomorrow') return tomorrowStr;
    return nextShiftDate || todayStr;
  }, [selectedOption, todayStr, tomorrowStr, nextShiftDate]);

  const currentStatus: Status = useMemo(() => {
    const dayData = planning[currentTargetDate];
    // Default to 'jour' status for the quick selector
    return dayData?.jour || 'unavailable';
  }, [planning, currentTargetDate]);

  const isAvailable = currentStatus === 'available';

  const toggleAvailability = () => {
    const newPlanning = { ...planning };
    const dateToUpdate = currentTargetDate;
    
    if (!newPlanning[dateToUpdate]) {
      newPlanning[dateToUpdate] = { jour: 'unavailable', nuit: 'unavailable' };
    }
    
    const nextStatus: Status = isAvailable ? 'unavailable' : 'available';
    newPlanning[dateToUpdate].jour = nextStatus;
    
    setPlanning(newPlanning);
    localStorage.setItem('gardeflash_planning', JSON.stringify(newPlanning));
    
    // Dispatch storage event for other components in same window
    window.dispatchEvent(new Event('storage'));

    toast.success(nextStatus === 'available' ? 'DISPONIBLE' : 'HORS SERVICE', {
      description: `Statut mis à jour pour le ${format(parseISO(dateToUpdate), 'dd/MM')}`,
      duration: 3000,
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const saved = localStorage.getItem('gardeflash_planning');
      if (saved) setPlanning(JSON.parse(saved));
      toast.info('Synchronisation terminée', {
        description: 'Effectifs et alertes à jour.'
      });
    }, 1500);
  };

  const dateOptions = [
    { id: 'today', label: "Aujourd'hui", date: todayStr },
    { id: 'tomorrow', label: 'Demain', date: tomorrowStr },
    { id: 'next', label: 'Prochaine', date: nextShiftDate },
  ];

  return (
    <div className="flex flex-col gap-8 animate-fade-in relative min-h-full pb-10">
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

      {/* Hero Header */}
      <section 
        className="flex flex-col gap-6 pt-4"
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

        {/* Quick Date Selector */}
        <div className="flex p-1.5 glass-card rounded-2xl border border-white/5 mx-2 relative overflow-hidden">
          <div className="flex w-full relative">
            {dateOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedOption(opt.id as DateOption)}
                disabled={opt.id === 'next' && !opt.date}
                className={`flex-1 py-3 px-1 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 relative z-10 ${
                  selectedOption === opt.id ? 'text-white' : 'text-text-muted opacity-50'
                } ${opt.id === 'next' && !opt.date ? 'hidden' : ''}`}
              >
                {opt.label}
                {opt.id === 'next' && opt.date && (
                  <span className="block text-[8px] opacity-60 font-bold mt-0.5">
                    {format(parseISO(opt.date), 'dd/MM')}
                  </span>
                )}
              </button>
            ))}
            
            {/* Animated Indicator */}
            <motion.div
              layoutId="activeTab"
              className="absolute inset-y-0 bg-white/10 rounded-xl border border-white/10"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              style={{
                width: `${100 / (nextShiftDate ? 3 : 2)}%`,
                left: `${(dateOptions.findIndex(o => o.id === selectedOption) * 100) / (nextShiftDate ? 3 : 2)}%`,
              }}
            />
          </div>
        </div>

        {/* Status Card */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedOption + currentTargetDate + isAvailable}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.4 }}
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
                  <span className="text-xs font-bold text-text-muted mt-2 uppercase tracking-widest italic opacity-60">
                    {selectedOption === 'today' ? "Prêt pour engagement" : "Prévu sur planning"}
                  </span>
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
        </AnimatePresence>
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
