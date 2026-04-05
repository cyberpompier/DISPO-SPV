import React, { useState } from 'react';
import { Repeat, ChevronRight, User as UserIcon, Send, Clock, Calendar } from 'lucide-react';
import { MOCK_USERS } from '../data/mock';
import { motion } from 'framer-motion';

export const ExchangeScreen: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>('');

  const myGardes = [
    { date: 'Vendredi 22 Avril', shift: 'Nuit (20:00 - 08:00)', id: 'g1' },
    { date: 'Samedi 30 Avril', shift: 'Jour (08:00 - 20:00)', id: 'g2' }
  ];

  return (
    <div className="flex flex-col gap-6 animate-fade-in px-2">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-primary-red/10 rounded-xl text-primary-red">
          <Repeat size={24} />
        </div>
        <h2 className="text-2xl font-bold">Échanger une Garde</h2>
      </div>

      {/* Step 1: Selection de ma garde */}
      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted px-1 flex items-center gap-2">
          <Calendar size={14} /> Choisir Ma Garde
        </h3>
        <div className="flex flex-col gap-3">
          {myGardes.map((garde, idx) => (
            <motion.div
              whileTap={{ scale: 0.98 }}
              key={garde.id}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center ${
                idx === 0 ? 'bg-primary-red/5 border-primary-red/30' : 'bg-card border-white/5 hover:bg-card-hover'
              }`}
            >
              <div className="flex flex-col gap-1">
                <span className="font-bold text-lg">{garde.date}</span>
                <span className="text-sm text-text-secondary flex items-center gap-2">
                  <Clock size={12} /> {garde.shift}
                </span>
              </div>
              {idx === 0 && (
                <div className="w-6 h-6 bg-primary-red rounded-full flex items-center justify-center ring-4 ring-primary-red/10">
                  <div className="w-2.5 h-2.5 bg-white rounded-full" />
                </div>
              )}
              {idx !== 0 && (
                <div className="w-6 h-6 border-2 border-white/10 rounded-full" />
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Step 2: Selection du collegue */}
      <section className="flex flex-col gap-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted px-1 flex items-center gap-2">
          <UserIcon size={14} /> Échanger avec :
        </h3>
        <div className="relative group">
          <select 
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full h-16 bg-card rounded-2xl px-6 appearance-none border border-white/5 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-primary-red/30 transition-all cursor-pointer group-hover:bg-card-hover"
          >
            <option value="" disabled>Sélectionner un collègue...</option>
            {MOCK_USERS.filter(u => u.id !== '1').map(user => (
              <option key={user.id} value={user.id}>{user.name} ({user.role})</option>
            ))}
          </select>
          <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 transform rotate-90 text-text-muted" size={20} />
        </div>
      </section>

      {/* Submit */}
      <motion.button
        disabled={!selectedUser}
        whileHover={selectedUser ? { scale: 1.02 } : {}}
        whileTap={selectedUser ? { scale: 0.98 } : {}}
        className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-xl shadow-xl transition-all duration-300 mt-4 overflow-hidden relative ${
          selectedUser ? 'bg-primary-red text-white' : 'bg-white/5 text-text-muted cursor-not-allowed opacity-50'
        }`}
      >
        <Send size={22} className={selectedUser ? 'animate-bounce-slow' : ''} />
        Envoyer la Demande
      </motion.button>

      {/* Footer Info */}
      <p className="text-xs text-text-muted text-center leading-loose">
        Une notification sera envoyée à votre collègue.<br />
        L'échange doit être validé par le Chef de Centre.
      </p>
    </div>
  );
};
