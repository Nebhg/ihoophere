import { UserRole } from "@/types/globals";
import { auth } from "@clerk/nextjs/server";

export const checkRole = (role: UserRole) => {
  const { sessionClaims } = auth();
  console.log(role);
  console.log(sessionClaims?.metadata.role);
  return sessionClaims?.metadata.role === role;
 
};