export interface ForumThread {
  id: string;
  author: string;
  avatarColor: string;
  tag: 'Question' | 'Showcase' | 'General' | 'Feature Request' | 'Announcement';
  title: string;
  content: string;
  timestamp: number;
  upvotes: number;
  replies: {
    id: string;
    author: string;
    avatarColor: string;
    content: string;
    timestamp: number;
  }[];
}

export const INITIAL_THREADS: ForumThread[] = [
  {
    id: "thread-1",
    author: "Rahul Patel",
    avatarColor: "from-blue-500 to-indigo-600",
    tag: "Showcase",
    title: "Migrated our entire data reconciliation pipeline to Nexora 2.0 🚀",
    content: "We were previously dealing with 15-minute sync delays and reconciliation mismatch errors. With the new deterministic order processing and WebSocket-backed event stream, our operations team closed the month-end ledger in 45 minutes instead of 3 days. Kudos to the Nexora engineering team!",
    timestamp: Date.now() - 86400000 * 2,
    upvotes: 48,
    replies: [
      {
        id: "rep-1",
        author: "Sarah Chen",
        avatarColor: "from-emerald-500 to-teal-600",
        content: "Same experience here! The CSV exporter with clean headers and verified float sums saved us so much manual spreadsheet fixing.",
        timestamp: Date.now() - 86400000 * 1.5
      },
      {
        id: "rep-2",
        author: "Marcus Johnson",
        avatarColor: "from-purple-500 to-pink-600",
        content: "What database engine are you guys using behind the ingest proxy?",
        timestamp: Date.now() - 86400000 * 1.2
      }
    ]
  },
  {
    id: "thread-2",
    author: "Priya Sharma",
    avatarColor: "from-rose-500 to-orange-500",
    tag: "Question",
    title: "Best practices for WCAG AAA compliance when styling data tables?",
    content: "We're building an internal compliance portal and need to ensure all tabular data passes WCAG AAA contrast (minimum 7:1 for normal text). Any recommendations on badge backgrounds against dark surfaces?",
    timestamp: Date.now() - 86400000 * 3,
    upvotes: 32,
    replies: [
      {
        id: "rep-3",
        author: "Alex Rivera",
        avatarColor: "from-cyan-500 to-blue-600",
        content: "Check out the WCAG Contrast Checker tool in the Nexora Tools suite! You can input foreground and background hex values and it calculates the exact relative luminance and passes.",
        timestamp: Date.now() - 86400000 * 2.8
      }
    ]
  },
  {
    id: "thread-3",
    author: "Nexora Core Team",
    avatarColor: "from-amber-500 to-red-500",
    tag: "Announcement",
    title: "Official Community Guidelines & Release 2.0 Notes 🛡️",
    content: "Welcome to the official Nexora Community! This is a collaborative space for engineers, operations leads, and product builders. Please keep discussions constructive and respectful. All communications are verified and security-audited.",
    timestamp: Date.now() - 86400000 * 7,
    upvotes: 120,
    replies: [
      {
        id: "rep-4",
        author: "Wei Zhang",
        avatarColor: "from-indigo-500 to-purple-600",
        content: "Loving the new clean interface and responsive mobile experience. Truly world-class!",
        timestamp: Date.now() - 86400000 * 6.5
      }
    ]
  }
];
