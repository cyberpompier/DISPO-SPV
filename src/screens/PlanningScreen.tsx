import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, addMonths, subMonths, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Users, X, CheckCircle2, MinusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import type { Status, DayPlanning } from '../types';

export const PlanningScreen: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  
  // State for planning persistence (localStorage)
  const [planning, setPlanning] = useState<DayPlanning>(() => {
    const saved = localStorage.getItem('gardeflash_planning');
    return saved ? JSON.parse(saved) : {};
  });

  const savePlanning = (newPlanning: DayPlanning) => {
    setPlanning(newPlanning);
    localStorage.setItem('gardeflash_planning', JSON.stringify(newPlanning));
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const updateStatus = (dateStr: string, shift: 'jour' | 'nuit', status: Status) => {
    const newPlanning = { ...planning };
    if (!newPlanning[dateStr]) {
      newPlanning[dateStr] = { jour: 'unavailable', nuit: 'unavailable' };
    }
    newPlanning[dateStr][shift] = status;
    savePlanning(newPlanning);
    toast.success(`Planning mis à jour : ${shift === 'jour' ? 'Journée' : 'Nuit'}`);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in relative min-h-full">
      {/* Month Selector */}
      <section className="bg-card rounded-2xl p-6 shadow-lg border border-white/5">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary-red/10 rounded-xl text-primary-red">
              <CalendarIcon size={22} />
            </div>
            <h2 className="text-xl font-bold capitalize">
              {format(currentMonth, 'MMMM yyyy', { locale: fr })}
            </h2>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1 mb-4 text-center">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
            <span key={i} className="text-xs font-bold text-text-muted">{d}</span>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const plan = planning[dateStr];
            const isSelected = selectedDay && isSameDay(day, selectedDay);
            
            // Availability state
            const isJour = plan?.jour === 'available';
            const isNuit = plan?.nuit === 'available';
            
            return (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDay(day)}
                key={idx}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-bold relative transition-all duration-300 overflow-hidden ${
                  isSelected ? 'ring-2 ring-primary-red' : 'border border-white/5'
                }`}
                style={{
                  background: isJour && isNuit 
                    ? 'var(--status-green)' 
                    : isJour 
                    ? 'linear-gradient(135deg, var(--status-green) 50%, var(--bg-card) 50%)'
                    : isNuit
                    ? 'linear-gradient(135deg, var(--bg-card) 50%, var(--status-green) 50%)'
                    : 'var(--bg-card)'
                }}
              >
                <div className="relative z-10 drop-shadow-md">
                  <span className={isToday(day) ? 'text-primary-red' : (isJour || isNuit ? 'text-white' : '')}>
                    {format(day, 'd')}
                  </span>
                </div>

                {isToday(day) && (
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary-red rounded-full" />
                )}
                
                {/* Micro Icons for shift context */}
                <div className="absolute bottom-1 right-1 flex gap-0.5 opacity-40">
                  {isJour && <div className="w-1 h-1 bg-white rounded-full" />}
                  {isNuit && <div className="w-1 h-1 bg-white rounded-full" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Persistence Info Label */}
      <div className="text-center">
        <p className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Sauvegarde locale active</p>
      </div>

      {/* Selection Drawer (Custom Implementation for UX) */}
      <AnimatePresence>
        {selectedDay && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDay(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 glass shadow-2xl z-[60] p-6 rounded-t-[32px] border-t border-white/10 pb-10"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6" />
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold capitalize">
                    {format(selectedDay, 'EEEE d MMMM', { locale: fr })}
                  </h3>
                  <p className="text-text-secondary">Gérer vos disponibilités</p>
                </div>
                <button onClick={() => setSelectedDay(null)} className="p-3 bg-white/5 rounded-full">
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-2">
                <StatusButton 
                  shift="Jour" 
                  time="08:00 - 20:00"
                  status={planning[format(selectedDay, 'yyyy-MM-dd')]?.jour || 'unavailable'}
                  onClick={(s) => updateStatus(format(selectedDay, 'yyyy-MM-dd'), 'jour', s)}
                />
                <StatusButton 
                  shift="Nuit" 
                  time="20:00 - 08:00"
                  status={planning[format(selectedDay, 'yyyy-MM-dd')]?.nuit || 'unavailable'}
                  onClick={(s) => updateStatus(format(selectedDay, 'yyyy-MM-dd'), 'nuit', s)}
                />
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/5">
                <h4 className="font-bold flex items-center gap-2 mb-4">
                  <Users size={16} /> Effectif Prévu (Simulé)
                </h4>
                <div className="flex -space-x-3 overflow-hidden">
                  {[1,2,3,4].map(i => (
                    <img key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-bg-dark" src={`https://i.pravatar.cc/100?u=${i}`} alt="" />
                  ))}
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-xs font-bold text-white ring-2 ring-bg-dark">+3</div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedDay(null)}
                className="w-full mt-10 py-5 bg-white/5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all border border-white/10"
              >
                Fermer
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

interface StatusButtonProps {
  shift: string;
  time: string;
  status: Status;
  onClick: (s: Status) => void;
}

const StatusButton: React.FC<StatusButtonProps> = ({ shift, time, status, onClick }) => {
  const isAvailable = status === 'available';
  
  return (
    <div className={`p-4 rounded-3xl border-2 flex flex-col gap-3 transition-all ${
      isAvailable ? 'bg-status-green/10 border-status-green/30' : 'bg-card border-white/5'
    }`}>
      <div className="flex items-center justify-between">
        <span className="font-bold uppercase tracking-wider text-xs flex items-center gap-2">
          <Clock size={12} /> {shift}
        </span>
        {isAvailable ? <CheckCircle2 size={18} className="text-status-green" /> : <MinusCircle size={18} className="text-text-muted" />}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] text-text-muted mb-2">{time}</span>
        <button 
          onClick={() => onClick(isAvailable ? 'unavailable' : 'available')}
          className={`py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-lg ${
            isAvailable 
              ? 'bg-status-green text-white shadow-status-green/20' 
              : 'bg-white/5 text-text-secondary hover:text-white'
          }`}
        >
          {isAvailable ? 'DISPONIBLE' : 'DÉCLARER'}
        </button>
      </div>
    </div>
  );
};
