export const columnsToDisplayCatalog = ['productCode', 'name', 'unit', 'price', 'availability', 'actions'];
export const columnsToDisplayCustomers = ['customerNo', 'name', 'address', 'deliveryDays'];
export const columnsToDisplayOrders = ['orderNo', 'customer', 'customerNo', 'items', 'notes', 'ordered', 'reqDelivery', 'status'];
export const daysArr = ['Mon', 'Tue', 'Wed,', 'Thu', 'Fri', 'Sat', 'Sun'];

export const routeTypes = {
  orders: 'orders',
  catalog: 'catalog',
  customers: 'customers'
};
