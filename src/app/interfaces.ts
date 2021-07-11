export interface Email {
  email: string;
}

export interface AuthResponse {
  status: string;
}

export const routeTypes = {
  orders: 'orders',
  catalog: 'catalog',
  customers: 'customers'
};
