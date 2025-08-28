export interface User {
  id: string
  email: string
  name: string
  role: "buyer" | "founder" | "admin"
}

export const mockUsers: User[] = [
  {
    id: "1",
    email: "buyer@example.com",
    name: "Alice Buyer",
    role: "buyer",
  },
  {
    id: "2",
    email: "founder@example.com",
    name: "Bob Founder",
    role: "founder",
  },
  {
    id: "3",
    email: "admin@example.com",
    name: "Carol Admin",
    role: "admin",
  },
]

export function authenticateUser(email: string): User | null {
  return mockUsers.find((user) => user.email === email) || null
}
