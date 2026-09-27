export interface Order {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: number;
  qty: number;
  status: 'Paid' | 'Pending' | 'Refunded';
  date: number; // timestamp
  notes: string;
}

// Generate canonical dataset with realistic seed data based on the original 2000 records
const PRODUCTS = [
  'Premium Air',
  'AI Stapler',
  'Synergy Pack',
  'Cloud Blockchain',
  'Quantum Toaster',
  'NFT Chair',
  'Enterprise Spoon',
  'Metaverse Socks'
];

const CUSTOMERS = [
  'Olga Arjunson', 'Olga Kabirson', 'Ananya Johnson', 'John Johnson', 'Fatima Olgason',
  'Wei Kabirson', 'Ananya Meerason', 'Vikram Fatimason', 'Carlos Vikramson', 'Meera Fatimason',
  'Vikram Janeson', 'Wei Olgason', 'Carlos Johnson', 'John Carlosson', 'Arjun Vikramson',
  'Carlos Weison', 'Rahul Kabirson', 'Aarav Janeson', 'Carlos Ananyason', 'Meera Meerason',
  'Ananya Carlosson', 'Arjun Meerason', 'Vikram Rahulson', 'Meera Snehason', 'Rahul Weison',
  'Sneha Ananyason', 'Fatima Meerason', 'Kabir Vikramson', 'John Janeson', 'Priya Johnson',
  'Jane Ananyason', 'Isha Aaravson', 'Carlos Ishason', 'Jane Weison', 'Aarav Carlosson',
  'Jane Priyason', 'Priya Sharma', 'Marcus Johnson', 'Sarah Chen', 'Alex Rivera'
];

const STATUSES: ('Paid' | 'Pending' | 'Refunded')[] = ['Paid', 'Pending', 'Paid', 'Pending', 'Paid', 'Refunded'];

// Deterministic generator so results match realistic finance expectations and never change between renders
function createSeedOrders(): Order[] {
  const list: Order[] = [];
  const baseTime = 1544150000000; // ~Dec 2018 / Jan 2019
  const seedMultiplier = 48271;
  let seed = 12345;

  for (let i = 0; i < 2000; i++) {
    seed = (seed * seedMultiplier) % 2147483647;
    const prodIdx = seed % PRODUCTS.length;
    
    seed = (seed * seedMultiplier) % 2147483647;
    const custIdx = seed % CUSTOMERS.length;
    
    seed = (seed * seedMultiplier) % 2147483647;
    const rawAmt = 15 + ((seed % 98500) / 100);
    const amount = parseFloat(rawAmt.toFixed(2));
    
    seed = (seed * seedMultiplier) % 2147483647;
    const qty = 1 + (seed % 9);
    
    seed = (seed * seedMultiplier) % 2147483647;
    const status = STATUSES[seed % STATUSES.length];
    
    seed = (seed * seedMultiplier) % 2147483647;
    const dateOffset = (seed % (86400000 * 45)); // over 45 days
    const date = baseTime + dateOffset;

    list.push({
      id: `ORD-${100000 + i}`,
      customer: CUSTOMERS[custIdx],
      email: `user${i}@example.com`,
      product: PRODUCTS[prodIdx],
      amount,
      qty,
      status,
      date,
      notes: `Order placed via web portal. Verified transaction with security check passed.`
    });
  }
  return list;
}

export const INITIAL_ORDERS: Order[] = createSeedOrders();

export function calculateOrderStats(orders: Order[]) {
  const totalRevenue = orders.reduce((acc, o) => acc + (o.status !== 'Refunded' ? o.amount : 0), 0);
  const grossVolume = orders.reduce((acc, o) => acc + o.amount, 0);
  const totalItems = orders.reduce((acc, o) => acc + o.qty, 0);
  const orderCount = orders.length;
  const avgOrder = orderCount > 0 ? grossVolume / orderCount : 0;
  
  const paidCount = orders.filter(o => o.status === 'Paid').length;
  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const refundedCount = orders.filter(o => o.status === 'Refunded').length;

  return {
    totalRevenue,
    grossVolume,
    totalItems,
    orderCount,
    avgOrder,
    paidCount,
    pendingCount,
    refundedCount
  };
}
