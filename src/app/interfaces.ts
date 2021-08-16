export interface IOrder {
  orderNo: number;
  customer: string;
  customerNo: string;
  items: number;
  notes: string;
  ordered: string;
  reqDelivery: string;
  status: boolean;
}

export interface IOrderState {
  [code: string]: IOrder;
}

export interface ICustomer {
  customerNo: string;
  name: string;
  address: string;
  deliveryDays: DeliveryDays;
}

export interface ICustomerState {
  [code: string]: ICustomer;
}


// export interface Availability {
// //   inStock: boolean;
// //   outOfStock: boolean;
// //   discontinued: boolean;
// // }

export type Availability = 'In stock' | 'Out of stock' | 'Discontinued';

export interface IProduct {
  productCode: string;
  name: string;
  unit: string;
  price: number;
  availability: Availability;
}

export interface ICatalogState {
  [code: string]: IProduct;
}

export interface DeliveryDays {
  [day: string]: boolean;
}

export interface Email {
  email: string;
}

export interface SuccessEmail {
  status: string;
}

export interface Request {
  email: Email;
  code?: number;
}
