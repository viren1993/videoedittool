export interface CustomerUser {
  username: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  updated_at: string;
  id: string;
}

export interface CustomerCompany {
  company_name: string;
  description: string;
  mobile: string;
  logo_url: string;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  email: string;
  username: string;
  id: string;
}

export interface CustomerPorps {
  customer_company_name: string;
  full_name: string;
  logo_url: string;
  city: string;
  phone_number: string;
  telephone_number: string;
  address: string;
  linked_company_id: string;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
  user: CustomerUser;
  company: CustomerCompany;
  id: string;
}