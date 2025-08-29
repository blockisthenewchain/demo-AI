export interface User {
  id: string
  email: string
  password: string
  name: string
  role: "buyer" | "founder" | "admin"
  isDemo?: boolean
  demoSessionId?: string
  demoListingId?: string
  demoExpiration?: number
}

export const mockUsers: User[] = [
  {
    id: "1",
    email: "buyer@example.com",
    password: "buyer@example.com",
    name: "Alice Buyer",
    role: "buyer",
  },
  {
    id: "2",
    email: "founder@example.com",
    password: "founder@example.com",
    name: "Bob Founder",
    role: "founder",
  },
  {
    id: "3",
    email: "admin@example.com",
    password: "admin@example.com",
    name: "Carol Admin",
    role: "admin",
  },
]

export function authenticateUser(email: string, password: string): User | null {
  const user = mockUsers.find((user) => user.email === email)
  if (!user || user.password !== password) {
    return null
  }
  return user
}

export interface DemoTokenPayload {
  buyerEmail: string
  demoSessionId: string
  listingId: string
  exp: number
}

export function createDemoUser(payload: DemoTokenPayload): User {
  return {
    id: `demo_${payload.demoSessionId}`,
    email: payload.buyerEmail,
    password: "", // Demo users don't need passwords
    name: `Demo User (${payload.buyerEmail})`,
    role: "buyer", // Demo users get buyer role
    isDemo: true,
    demoSessionId: payload.demoSessionId,
    demoListingId: payload.listingId,
    demoExpiration: payload.exp
  }
}

export function isDemoSessionExpired(user: User): boolean {
  if (!user.isDemo || !user.demoExpiration) return false
  return Date.now() / 1000 > user.demoExpiration
}
