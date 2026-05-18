export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "student";
  phone?: string;
  joinDate?: string;
}
