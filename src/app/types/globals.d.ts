export {};

export enum UserRole {
  Player = 0,
  Coach = 1,
}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
