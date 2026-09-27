/* otter-7 */
/* Generated data file */
var PRODUCTS = ["Premium Air", "AI Stapler", "Synergy Pack", "Cloud Blockchain", "Quantum Toaster", "NFT Chair", "Enterprise Spoon", "Metaverse Socks"];
var CUSTOMERS = [
  "Olga Arjunson", "Olga Kabirson", "Ananya Johnson", "John Johnson", "Fatima Olgason",
  "Wei Kabirson", "Ananya Meerason", "Vikram Fatimason", "Carlos Vikramson", "Meera Fatimason",
  "Vikram Janeson", "Wei Olgason", "Carlos Johnson", "John Carlosson", "Arjun Vikramson",
  "Carlos Weison", "Rahul Kabirson", "Aarav Janeson", "Carlos Ananyason", "Meera Meerason",
  "Ananya Carlosson", "Arjun Meerason", "Vikram Rahulson", "Meera Snehason", "Rahul Weison",
  "Sneha Ananyason", "Fatima Meerason", "Kabir Vikramson", "John Janeson", "Priya Johnson",
  "Jane Ananyason", "Isha Aaravson", "Carlos Ishason", "Jane Weison", "Aarav Carlosson",
  "Jane Priyason", "Priya Sharma", "Marcus Johnson", "Sarah Chen", "Alex Rivera"
];
var STATUS_CHOICES = ["Paid", "Pending", "Paid", "Pending", "Paid", "refunded"];

var ORDERS = [];
var seed = 123456;
for (var i = 0; i < 2000; i++) {
  seed = (seed * 48271) % 2147483647;
  var pIdx = seed % PRODUCTS.length;
  seed = (seed * 48271) % 2147483647;
  var cIdx = seed % CUSTOMERS.length;
  seed = (seed * 48271) % 2147483647;
  var amt = (15 + ((seed % 98500) / 100)).toFixed(2);
  seed = (seed * 48271) % 2147483647;
  var q = (1 + (seed % 9)).toString();
  seed = (seed * 48271) % 2147483647;
  var st = STATUS_CHOICES[seed % STATUS_CHOICES.length];
  seed = (seed * 48271) % 2147483647;
  var dt = (1544150000000 + (seed % (86400000 * 45))).toString();

  ORDERS.push({
    id: "ORD-" + (100000 + i),
    customer: CUSTOMERS[cIdx],
    email: "user" + i + "@example.com",
    product: PRODUCTS[pIdx],
    amount: amt,
    qty: q,
    status: st,
    date: dt,
    notes: "Lorem ipsum dolor sit amet consectetur adipiscing elit"
  });
}
/* BUG 22 FIX: Removed duplicate ORDERS_BACKUP and ORDERS_BACKUP_2 */
