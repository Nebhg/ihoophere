export {};

export enum UserRole {
  Player = 0,
  Coach = 1,
}

export interface Attendee {
  id: string;
  first_name: string;
  last_name: string;
}

export interface Task {
  id: string;
  name: string;
  user_id: string;
  location: string;
  time: string;
  price: string;
  spaces_left: number;
  description: string;
  public: boolean;
  latitude: number;
  longitude: number;
  attendees: string[];
  attendeeDetails?: Attendee[];
}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: UserRole;
    };
  }
}

