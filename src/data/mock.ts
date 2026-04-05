import type { User, Alert } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Jean M.',
    role: 'Chef d\'Agrès',
    status: 'available',
    avatar: 'https://i.pravatar.cc/150?u=jean',
    grade: 'Sergent-Chef',
    specialties: ['Incendie', 'Secours Routier', 'Drone']
  },
  {
    id: '2',
    name: 'Sophie R.',
    role: 'Équipière',
    status: 'available',
    avatar: 'https://i.pravatar.cc/150?u=sophie'
  },
  {
    id: '3',
    name: 'Lucas T.',
    role: 'Conducteur',
    status: 'available',
    avatar: 'https://i.pravatar.cc/150?u=lucas'
  },
  {
    id: '4',
    name: 'David L.',
    role: 'Équipier',
    status: 'unavailable',
    avatar: 'https://i.pravatar.cc/150?u=david'
  },
  {
    id: '5',
    name: 'Emma C.',
    role: 'Équipière',
    status: 'available',
    avatar: 'https://i.pravatar.cc/150?u=emma'
  },
  {
    id: '6',
    name: 'Thomas G.',
    role: 'Officier',
    status: 'busy',
    avatar: 'https://i.pravatar.cc/150?u=thomas'
  }
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'a1',
    type: 'critical',
    message: 'Effectif insuffisant ce soir',
    description: 'Manque 2 Équipiers pour le créneau Nuit (20:00 - 08:00)',
    timestamp: 'Il y a 10 min'
  },
  {
    id: 'a2',
    type: 'warning',
    message: 'Alerte: Risque de sous-effectif',
    description: 'Prochaine garde Dimanche 20 Avril (Jour)',
    timestamp: 'Il y a 2h'
  }
];
