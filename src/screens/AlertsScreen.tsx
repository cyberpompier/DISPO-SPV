import React from 'react';
import { Clock, TriangleAlert } from 'lucide-react';

import { MOCK_ALERTS } from '../data/mock';
import { motion } from 'framer-motion';
import Badge from '../components/ui/Badge';

export const AlertsScreen: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 animate-fade-in pb-12">
      {/* Premium Header */}
      <div className="flex items-end justify-between px-2">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-red/80">Centre Secours</span>
          <h2 className="text-3xl font-black text-white tracking-tight">Alertes Actives</h2>
        </div>
        <Badge variant="danger" className="gap-2">
          <div className="w-2 h-2 bg-primary-red rounded-full animate-pulse" />
          2 LIVE
        </Badge>
      </div>

      {/* Hero Coverage Card */}
      <section className="glass-card rounded-[40px] p-8 relative overflow-hidden group shadow-premium ring-1 ring-white/10">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary-red/10 blur-[80px] -z-10" />
        
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-bold text-white/70 uppercase tracking-widest leading-none">Capacité Opérationnelle</h3>
            <Badge variant="white">SECTEUR NORD</Badge>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={251} strokeDashoffset={251 * 0.25} className="text-primary-red" strokeLinecap="round" />
              </svg>
              <span className="absolute text-2xl font-black text-white">75%</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-4xl font-black text-white tracking-tighter">LIMITÉE</span>
              <div className="flex items-center gap-2">
                <TriangleAlert size={14} className="text-primary-red" />
                <span className="text-xs font-bold text-primary-red uppercase tracking-wider">Risque élevé détecté</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-text-secondary leading-relaxed max-w-[240px]">
            Manque d’effectif critique sur les spécialités <span className="text-white font-bold">Drone</span> et <span className="text-white font-bold">Secours Routier</span>.
          </p>
        </div>
      </section>

      {/* Enhanced Alert Cards */}
      <div className="flex flex-col gap-6">
        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-text-muted px-2">Derniers Événements</h4>
        {MOCK_ALERTS.map((alert, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12 }}
            key={alert.id}
            className="glass-card rounded-[32px] p-7 flex flex-col gap-5 border border-white/10 shadow-lg relative active:scale-[0.98] transition-all"
          >
            {alert.type === 'critical' && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-red/5 blur-[50px] -z-10" />
            )}
            
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <Badge variant={alert.type === 'critical' ? 'danger' : 'warning'}>
                  {alert.type}
                </Badge>
                <h5 className="text-xl font-bold text-white tracking-tight leading-snug pr-8">{alert.message}</h5>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-muted">
                <Clock size={12} />
                {alert.timestamp}
              </div>
            </div>
            
            <p className="text-[15px] text-text-secondary leading-relaxed">{alert.description}</p>
            
            <div className="flex items-center justify-between mt-2 pt-5 border-t border-white/5">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-bg-dark bg-white/10" />)}
                <div className="w-8 h-8 rounded-full bg-white/5 text-[9px] font-black flex items-center justify-center border-2 border-bg-dark text-text-muted">+2</div>
              </div>
              <button className="flex items-center gap-2 text-[11px] font-black text-white bg-white/5 px-5 py-2.5 rounded-xl border border-white/10 active:bg-white/10 transition-all uppercase tracking-wider">
                Consulter
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
