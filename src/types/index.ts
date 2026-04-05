export type Role = 'Chef d\'Agrès' | 'Conducteur' | 'Équipier' | 'Équipière' | 'Officier';
export type Status = 'available' | 'unavailable' | 'busy';

export interface User {
  id: string;
  name: string;
  role: Role;
  status: Status;
  avatar: string;
  specialties?: string[];
  grade?: string;
}

export type ShiftType = 'jour' | 'nuit';

export interface GuardStats {
  date: string;
  status: Status;
  shift: ShiftType;
}

export interface DayPlanning {
  [date: string]: {
    jour: Status;
    nuit: Status;
  };
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  message: string;
  description: string;
  timestamp: string;
}
