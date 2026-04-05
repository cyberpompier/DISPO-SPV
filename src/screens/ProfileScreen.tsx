import React from 'react';
import { MOCK_USERS } from '../data/mock';
import { Shield, Briefcase, History, BarChart3, ChevronRight, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import Badge from '../components/ui/Badge';

export const ProfileScreen: React.FC = () => {
  const me = MOCK_USERS[0];

  const guardsHistory = [
    { date: '17 Avril', status: 'available', shift: 'Jour' },
    { date: '16 Avril', status: 'unavailable', shift: 'Nuit' },
    { date: '15 Avril', status: 'available', shift: 'Jour' }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in relative pb-10">
      <div className="absolute top-0 right-0 p-4">
        <button className="p-3 bg-white/5 rounded-xl text-text-muted hover:text-white transition-colors">
          <Settings size={22} />
        </button>
      </div>

      {/* Header Profile */}
      <section className="flex flex-col items-center gap-4 text-center py-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-[40px] bg-primary-red/10 border-4 border-white/5 p-1 relative z-10">
            <img src={me.avatar} alt={me.name} className="w-full h-full rounded-[36px] object-cover" />
          </div>
          {/* Decorative backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary-red/5 blur-3xl -z-10 rounded-full" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-extrabold tracking-tight">{me.name}</h2>
          <Badge variant="primary" className="self-center">
            {me.grade}
          </Badge>
          <p className="text-text-secondary font-medium">{me.role}</p>
        </div>
      </section>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card rounded-[24px] p-5 border border-white/5 shadow-md flex items-center gap-4">
          <div className="p-2.5 bg-status-green/10 text-status-green rounded-xl">
            <BarChart3 size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">84%</span>
            <span className="text-[10px] uppercase font-bold text-text-muted">DISPO</span>
          </div>
        </div>
        <div className="bg-card rounded-[24px] p-5 border border-white/5 shadow-md flex items-center gap-4">
          <div className="p-2.5 bg-primary-red/10 text-primary-red rounded-xl">
            <History size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">12</span>
            <span className="text-[10px] uppercase font-bold text-text-muted">GARDES</span>
          </div>
        </div>
      </div>

      {/* Specialties Section */}
      <section className="bg-card rounded-3xl p-6 border border-white/5 shadow-lg">
        <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
          <Shield size={16} className="text-primary-red" /> Spécialités :
        </h3>
        <div className="flex flex-wrap gap-2">
          {me.specialties?.map(spec => (
            <Badge key={spec} variant="muted">
              {spec}
            </Badge>
          ))}
        </div>
      </section>

      {/* History Section */}
      <section className="bg-card rounded-3xl p-6 border border-white/5 shadow-lg">
        <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted mb-6 flex items-center justify-between">
          <span>Historique des Gardes</span>
          <ChevronRight size={16} />
        </h3>
        <div className="flex flex-col gap-3">
          {guardsHistory.map((h, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-[20px] group hover:bg-white/10 transition-all cursor-pointer">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  h.status === 'available' ? 'bg-status-green/10 text-status-green' : 'bg-status-red/10 text-status-red'
                }`}>
                  <Briefcase size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">{h.date}</span>
                  <span className="text-xs text-text-muted">{h.shift}</span>
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${h.status === 'available' ? 'bg-status-green shadow-[0_0_8px_var(--status-green)]' : 'bg-status-red shadow-[0_0_8px_var(--status-red)]'}`} />
            </div>
          ))}
        </div>
      </section>

      {/* Stats Button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="w-full h-16 bg-white/5 text-white font-bold rounded-2xl border border-white/10 shadow-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3 mt-4"
      >
        <BarChart3 size={20} className="text-primary-red" />
        Mes Statistiques Détailées
      </motion.button>
    </div>
  );
};
