import React, { useState } from 'react';
import { ForumThread, INITIAL_THREADS } from '../data/community';
import { 
  MessageSquare, 
  ThumbsUp, 
  Send, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Search, 
  Sparkles,
  RefreshCw,
  HelpCircle
} from 'lucide-react';

interface CommunityPageProps {
  showToast: (title: string, desc?: string, type?: 'success' | 'info' | 'error') => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ showToast }) => {
  const [threads, setThreads] = useState<ForumThread[]>(() => {
    const saved = localStorage.getItem('nexora_forum_threads');
    return saved ? JSON.parse(saved) : INITIAL_THREADS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [teamSize, setTeamSize] = useState('10–50');
  const [topic, setTopic] = useState('Support');
  const [message, setMessage] = useState('');
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [captchaNum1, setCaptchaNum1] = useState(4);
  const [captchaNum2, setCaptchaNum2] = useState(3);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // New Thread Modal State
  const [isNewThreadOpen, setIsNewThreadOpen] = useState(false);
  const [threadTitle, setThreadTitle] = useState('');
  const [threadContent, setThreadContent] = useState('');
  const [threadAuthor, setThreadAuthor] = useState('');
  const [threadTag, setThreadTag] = useState<ForumThread['tag']>('Question');

  // Reply state
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [replyAuthor, setReplyAuthor] = useState('');

  // Refresh math captcha
  const refreshCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 8) + 2);
    setCaptchaNum2(Math.floor(Math.random() * 8) + 1);
    setCaptchaAnswer('');
  };

  // Upvote Thread
  const handleUpvote = (threadId: string) => {
    setThreads(prev => {
      const updated = prev.map(t => {
        if (t.id === threadId) {
          return { ...t, upvotes: t.upvotes + 1 };
        }
        return t;
      });
      localStorage.setItem('nexora_forum_threads', JSON.stringify(updated));
      return updated;
    });
    showToast('Upvoted!', 'Thank you for supporting this discussion.', 'success');
  };

  // Submit New Discussion Thread
  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!threadTitle.trim() || !threadContent.trim()) {
      showToast('Validation Error', 'Title and content cannot be empty.', 'error');
      return;
    }

    const newThread: ForumThread = {
      id: `thread-${Date.now()}`,
      author: threadAuthor.trim() || 'Community Builder',
      avatarColor: 'from-blue-500 to-indigo-600',
      tag: threadTag,
      title: threadTitle.trim(),
      content: threadContent.trim(),
      timestamp: Date.now(),
      upvotes: 1,
      replies: []
    };

    const updated = [newThread, ...threads];
    setThreads(updated);
    localStorage.setItem('nexora_forum_threads', JSON.stringify(updated));
    setIsNewThreadOpen(false);
    setThreadTitle('');
    setThreadContent('');
    setThreadAuthor('');
    showToast('Discussion Posted', 'Your post is now live in the community.', 'success');
  };

  // Submit Thread Reply
  const handleAddReply = (threadId: string) => {
    if (!replyContent.trim()) return;

    setThreads(prev => {
      const updated = prev.map(t => {
        if (t.id === threadId) {
          return {
            ...t,
            replies: [
              ...t.replies,
              {
                id: `reply-${Date.now()}`,
                author: replyAuthor.trim() || 'Contributor',
                avatarColor: 'from-cyan-500 to-blue-500',
                content: replyContent.trim(),
                timestamp: Date.now()
              }
            ]
          };
        }
        return t;
      });
      localStorage.setItem('nexora_forum_threads', JSON.stringify(updated));
      return updated;
    });

    setReplyContent('');
    setReplyAuthor('');
    setReplyingToId(null);
    showToast('Reply Added', 'Your reply has been posted.', 'success');
  };

  // Submit Contact Form (HUMANE & VALIDATED - No 5-char phone bug, no 500-char msg bug, no fake captcha 5 bug, no sleep(4000) freeze!)
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    // Name validation
    if (!name.trim() || name.trim().length < 2) {
      errors.name = 'Please provide your full name (min 2 characters).';
    }

    // RFC Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    // Phone validation (optional or sensible standard)
    if (phone.trim() && phone.replace(/\D/g, '').length < 7) {
      errors.phone = 'Please enter a valid phone number (at least 7 digits).';
    }

    // Message validation
    if (!message.trim() || message.trim().length < 10) {
      errors.message = 'Please provide a message with at least 10 characters.';
    }

    // Humane Math Captcha Check
    const expected = captchaNum1 + captchaNum2;
    if (parseInt(captchaAnswer.trim(), 10) !== expected) {
      errors.captcha = `Verification incorrect. What is ${captchaNum1} + ${captchaNum2}?`;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast('Validation Check', 'Please review the highlighted fields in the form.', 'error');
      return;
    }

    // Clear errors and submit asynchronously
    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      showToast('Message Sent!', 'Our engineering team will review your inquiry immediately.', 'success');
    }, 600);
  };

  // Filter threads
  const filteredThreads = threads.filter(t => {
    const matchTag = selectedTag === 'All' || t.tag === selectedTag;
    const query = searchQuery.toLowerCase().trim();
    const matchQuery = !query ||
      t.title.toLowerCase().includes(query) ||
      t.content.toLowerCase().includes(query) ||
      t.author.toLowerCase().includes(query);

    return matchTag && matchQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>12,400+ Members Online</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text)]">
          Community & Technical Support
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
          Ask questions, share workflows, and connect directly with the Nexora core engineering team.
        </p>
      </div>

      {/* Main 2-Column Layout: Forum on Left, Contact on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Community Discussions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-[var(--text)]">Discussion Forum</h2>
              <p className="text-xs text-[var(--text-muted)]">Verified peer advice & architecture showcases</p>
            </div>
            <button
              onClick={() => setIsNewThreadOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Start Discussion</span>
            </button>
          </div>

          {/* Search & Tag Filter */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search discussions or questions..."
                className="w-full text-xs bg-[var(--surface)] border border-[var(--surface-border)] rounded-xl pl-9 pr-3 py-2 text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500"
              />
            </div>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="text-xs bg-[var(--surface)] border border-[var(--surface-border)] rounded-xl px-3 py-2 text-[var(--text)] focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Categories</option>
              <option value="Showcase">Showcase</option>
              <option value="Question">Question</option>
              <option value="Feature Request">Feature Request</option>
              <option value="Announcement">Announcement</option>
            </select>
          </div>

          {/* Thread Cards List */}
          <div className="space-y-4">
            {filteredThreads.length === 0 ? (
              <div className="p-8 text-center bg-[var(--surface)] border border-[var(--surface-border)] rounded-2xl text-[var(--text-muted)]">
                No discussion threads found. Be the first to start a conversation!
              </div>
            ) : (
              filteredThreads.map((thread) => (
                <div
                  key={thread.id}
                  className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] space-y-3.5"
                >
                  {/* Author Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${thread.avatarColor} flex items-center justify-center text-white font-bold text-xs`}>
                        {thread.author[0]}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[var(--text)] block">{thread.author}</span>
                        <span className="text-[10px] text-[var(--text-muted)] block">
                          {new Date(thread.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {thread.tag}
                    </span>
                  </div>

                  {/* Thread Title & Content (Sanitized rendering, no XSS vulnerability!) */}
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text)] mb-1.5">{thread.title}</h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
                      {thread.content}
                    </p>
                  </div>

                  {/* Actions & Upvote */}
                  <div className="pt-2 flex items-center justify-between border-t border-[var(--surface-border)] text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpvote(thread.id)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-[var(--text)] hover:text-blue-400 hover:border-blue-500/30 transition-colors"
                      >
                        <ThumbsUp className="w-3 h-3 text-blue-400" />
                        <span className="font-mono">{thread.upvotes}</span>
                      </button>
                      <button
                        onClick={() => setReplyingToId(replyingToId === thread.id ? null : thread.id)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-[var(--text)] hover:text-[var(--text)] transition-colors"
                      >
                        <MessageSquare className="w-3 h-3 text-indigo-400" />
                        <span>{thread.replies.length} Replies</span>
                      </button>
                    </div>
                    <button
                      onClick={() => setReplyingToId(thread.id)}
                      className="text-xs font-semibold text-blue-400 hover:underline"
                    >
                      Reply →
                    </button>
                  </div>

                  {/* Replies List */}
                  {thread.replies.length > 0 && (
                    <div className="mt-3 pl-4 border-l-2 border-blue-500/20 space-y-2.5 pt-2">
                      {thread.replies.map((reply) => (
                        <div key={reply.id} className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-[var(--text)]">{reply.author}</span>
                            <span className="text-[10px] text-[var(--text-muted)]">{new Date(reply.timestamp).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-[var(--text-muted)] leading-relaxed">{reply.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Inline Reply Composer */}
                  {replyingToId === thread.id && (
                    <div className="mt-3 p-3.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[var(--text)]">Write a reply</span>
                        <button onClick={() => setReplyingToId(null)} className="text-[var(--text-muted)] hover:text-[var(--text)]">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={replyAuthor}
                        onChange={(e) => setReplyAuthor(e.target.value)}
                        placeholder="Your name"
                        className="w-full text-xs bg-[var(--surface)] border border-[var(--surface-border)] rounded-lg px-2.5 py-1.5 text-[var(--text)] focus:outline-none focus:border-blue-500"
                      />
                      <textarea
                        rows={2}
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Share your technical perspective..."
                        className="w-full text-xs bg-[var(--surface)] border border-[var(--surface-border)] rounded-lg p-2.5 text-[var(--text)] focus:outline-none focus:border-blue-500"
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleAddReply(thread.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5"
                        >
                          <Send className="w-3 h-3" />
                          <span>Post Reply</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Contact Us & Direct Support Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-7 rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] space-y-5 shadow-sm">
            <div>
              <span className="text-[10px] font-semibold text-blue-500 uppercase tracking-widest block">Direct Channel</span>
              <h2 className="text-xl font-bold text-[var(--text)] mt-1">Get in Touch with Engineering</h2>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Have a question or custom architectural requirement? We typically respond in under 2 hours.
              </p>
            </div>

            {submittedSuccess ? (
              <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-[var(--text)]">Inquiry Successfully Received!</h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Thank you for reaching out, {name}. A member of our solutions engineering team has received your ticket and will follow up at <strong className="text-[var(--text)]">{email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmittedSuccess(false);
                    setName('');
                    setEmail('');
                    setMessage('');
                    setPhone('');
                    refreshCaptcha();
                  }}
                  className="px-4 py-2 rounded-lg bg-[var(--surface-elevated)] text-xs font-semibold text-[var(--text)] hover:bg-[var(--surface-border)] border border-[var(--surface-border)]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3.5 text-xs">
                {/* Name */}
                <div>
                  <label className="block text-[var(--text-muted)] mb-1 font-medium">Your Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); if (formErrors.name) setFormErrors(prev => ({ ...prev, name: '' })); }}
                    placeholder="e.g. Maya Lin"
                    className={`w-full bg-[var(--surface-elevated)] border rounded-xl px-3 py-2 text-[var(--text)] focus:outline-none ${
                      formErrors.name ? 'border-rose-500' : 'border-[var(--surface-border)] focus:border-blue-500'
                    }`}
                  />
                  {formErrors.name && <p className="text-[11px] text-rose-400 mt-1">{formErrors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[var(--text-muted)] mb-1 font-medium">Work Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (formErrors.email) setFormErrors(prev => ({ ...prev, email: '' })); }}
                    placeholder="maya@company.com"
                    className={`w-full bg-[var(--surface-elevated)] border rounded-xl px-3 py-2 text-[var(--text)] focus:outline-none ${
                      formErrors.email ? 'border-rose-500' : 'border-[var(--surface-border)] focus:border-blue-500'
                    }`}
                  />
                  {formErrors.email && <p className="text-[11px] text-rose-400 mt-1">{formErrors.email}</p>}
                </div>

                {/* Phone & Company (2 columns) */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[var(--text-muted)] mb-1 font-medium">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); if (formErrors.phone) setFormErrors(prev => ({ ...prev, phone: '' })); }}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full bg-[var(--surface-elevated)] border rounded-xl px-3 py-2 text-[var(--text)] focus:outline-none ${
                        formErrors.phone ? 'border-rose-500' : 'border-[var(--surface-border)] focus:border-blue-500'
                      }`}
                    />
                    {formErrors.phone && <p className="text-[11px] text-rose-400 mt-1">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-[var(--text-muted)] mb-1 font-medium">Company</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Organization Ltd."
                      className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl px-3 py-2 text-[var(--text)] focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Topic & Team size */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[var(--text-muted)] mb-1 font-medium">Topic</label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl px-3 py-2 text-[var(--text)] focus:outline-none focus:border-blue-500"
                    >
                      <option value="Support">Technical Support</option>
                      <option value="Sales">Enterprise Sales</option>
                      <option value="Partnerships">Partnership</option>
                      <option value="Feedback">Platform Feedback</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[var(--text-muted)] mb-1 font-medium">Team Size</label>
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl px-3 py-2 text-[var(--text)] focus:outline-none focus:border-blue-500"
                    >
                      <option value="1–10">1–10 people</option>
                      <option value="10–50">10–50 people</option>
                      <option value="50–200">50–200 people</option>
                      <option value="Enterprise">200+ Enterprise</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[var(--text-muted)] mb-1 font-medium">Inquiry Message *</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => { setMessage(e.target.value); if (formErrors.message) setFormErrors(prev => ({ ...prev, message: '' })); }}
                    placeholder="How can we help your team with our intelligence tools or analytics?"
                    className={`w-full bg-[var(--surface-elevated)] border rounded-xl p-3 text-[var(--text)] focus:outline-none ${
                      formErrors.message ? 'border-rose-500' : 'border-[var(--surface-border)] focus:border-blue-500'
                    }`}
                  />
                  {formErrors.message && <p className="text-[11px] text-rose-400 mt-1">{formErrors.message}</p>}
                </div>

                {/* Real Math Captcha Check */}
                <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[var(--text-muted)] font-medium flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                      Verification: What is {captchaNum1} + {captchaNum2}?
                    </span>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      title="New question"
                      className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Refresh</span>
                    </button>
                  </div>
                  <input
                    type="number"
                    value={captchaAnswer}
                    onChange={(e) => { setCaptchaAnswer(e.target.value); if (formErrors.captcha) setFormErrors(prev => ({ ...prev, captcha: '' })); }}
                    placeholder="Answer"
                    className={`w-28 bg-[var(--surface)] border rounded-lg px-2.5 py-1 text-center font-mono text-sm text-[var(--text)] focus:outline-none ${
                      formErrors.captcha ? 'border-rose-500' : 'border-[var(--surface-border)] focus:border-blue-500'
                    }`}
                  />
                  {formErrors.captcha && <p className="text-[11px] text-rose-400">{formErrors.captcha}</p>}
                </div>

                {/* Consent */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="marketing"
                    checked={agreeMarketing}
                    onChange={(e) => setAgreeMarketing(e.target.checked)}
                    className="rounded border-[var(--surface-border)] mt-0.5"
                  />
                  <label htmlFor="marketing" className="text-[11px] text-[var(--text-muted)] leading-tight cursor-pointer">
                    Keep me updated with major product changelogs and platform announcements (optional).
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-xs shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-all mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Inquiry to Engineering</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Quick Contact Info */}
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] space-y-3.5 text-xs text-[var(--text-muted)]">
            <h4 className="text-sm font-bold text-[var(--text)]">Direct Office & Support</h4>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-blue-400" />
              <span>support@nexora.ai</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>+1 (800) 555-NEXORA (24/7 Priority Line)</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span>548 Market St, Suite 9200, San Francisco, CA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Start New Thread Modal */}
      {isNewThreadOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[var(--surface)] border border-[var(--surface-border)] rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-3">
              <h4 className="text-sm font-bold text-[var(--text)]">Create Community Discussion</h4>
              <button onClick={() => setIsNewThreadOpen(false)} className="text-[var(--text-muted)] hover:text-[var(--text)] p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateThread} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[var(--text-muted)] mb-1">Your Name or Handle</label>
                <input
                  type="text"
                  value={threadAuthor}
                  onChange={(e) => setThreadAuthor(e.target.value)}
                  placeholder="e.g. David Kim"
                  className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl px-3 py-2 text-[var(--text)] focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[var(--text-muted)] mb-1">Category</label>
                <select
                  value={threadTag}
                  onChange={(e) => setThreadTag(e.target.value as any)}
                  className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl px-3 py-2 text-[var(--text)] focus:outline-none focus:border-blue-500"
                >
                  <option value="Question">Question</option>
                  <option value="Showcase">Showcase</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-[var(--text-muted)] mb-1">Discussion Title *</label>
                <input
                  type="text"
                  required
                  value={threadTitle}
                  onChange={(e) => setThreadTitle(e.target.value)}
                  placeholder="What is your topic or question?"
                  className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl px-3 py-2 text-[var(--text)] focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[var(--text-muted)] mb-1">Details & Context *</label>
                <textarea
                  rows={4}
                  required
                  value={threadContent}
                  onChange={(e) => setThreadContent(e.target.value)}
                  placeholder="Provide background, code snippets, or architectural thoughts..."
                  className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl p-3 text-[var(--text)] focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewThreadOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[var(--surface-border)] hover:bg-[var(--surface-elevated)] text-[var(--text)] font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-md shadow-blue-600/30 transition-colors"
                >
                  Publish Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
