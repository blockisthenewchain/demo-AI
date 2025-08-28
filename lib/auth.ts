export interface User {
  id: string
  email: string
  password: string
  name: string
  role: "buyer" | "founder" | "admin"
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
