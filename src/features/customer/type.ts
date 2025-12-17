// User interface
export interface IUser {
  id: string;
  username: string;
  email: string;
  role: "company" | "superadmin";
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

// Company interface
export interface ICompany {
  id: string;
  company_name: string;
  description: string;
  mobile: string;
  email: string;
  username: string;
  logo_url: string;
  user_id: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
}

// Customer interface (Main)
export interface ICustomer {
  id: string;
  customer_company_name: string;
  full_name: string;
  logo_url: string;
  city: string;
  phone_number: string;
  telephone_number: string;
  address: string;
  linked_company_id: string;
  user_id: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
  user: IUser;
  company: ICompany;
}
