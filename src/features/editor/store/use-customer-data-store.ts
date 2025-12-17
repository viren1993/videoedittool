import { create } from "zustand";

export interface CustomerUser {
  username?: string;
  email?: string;
  role?: string;
  status?: string;
}

export interface CustomerCompany {
  company_name?: string;
  description?: string;
  mobile?: string;
  logo_url?: string;
  email?: string;
  username?: string;
}

export interface CustomerData {
  customer_company_name?: string;
  full_name?: string;
  logo_url?: string;
  city?: string;
  phone_number?: string;
  telephone_number?: string;
  address?: string;
  user?: CustomerUser;
  company?: CustomerCompany;
  [key: string]: any;
}

interface CustomerDataState {
  customerData: CustomerData | null;
  setCustomerData: (data: CustomerData) => void;
  clearCustomerData: () => void;
}

export const useCustomerDataStore = create<CustomerDataState>((set) => ({
  customerData: null,
  setCustomerData: (data) => set({ customerData: data }),
  clearCustomerData: () => set({ customerData: null }),
}));
