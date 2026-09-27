import React, { useState, useEffect } from 'react';
import { PageTab } from '../types';
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Globe2, 
  TrendingUp, 
  Layers, 
  Play, 
  Sparkles,
  BarChart3,
  Bot,
  Users2,
  DollarSign
} from 'lucide-react';

interface HomePageProps {
  setActiveTab: (tab: PageTab) => void;
  showToast: (title: string, desc?: string, type?: 'success' | 'info' | 'error') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab, showToast }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [activeStep, setActiveStep] = useState(0);
  const [liveCounter, setLiveCounter] = useState(12845620.40);
  const [recentEvent, setRecentEvent] = useState<string>('ORD-101999 processed via Cloud Proxy');

  // Simulated live event ticker
  useEffect(() => {
    const interval = setInterval(() => {
      const increment = parseFloat((Math.random() * 45 + 5).toFixed(2));
      setLiveCounter(prev => prev + increment);
      
      const prods = ['AI Stapler', 'Quantum Toaster', 'Synergy Pack', 'Premium Air', 'Metaverse Socks'];
      const cities = ['San Francisco', 'Tokyo', 'London', 'Bengaluru', 'Berlin', 'Singapore'];
      const randomProd = prods[Math.floor(Math.random() * prods.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      setRecentEvent(`New order for ${randomProd} verified in ${randomCity}`);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      num: "01",
      title: "Connect & Ingest",
      desc: "Link your databases, APIs, and commerce events in minutes with deterministic streaming and Zero-ETL pipelines.",
      tag: "500+ Connectors"
    },
    {
      num: "02",
      title: "Model & Automate",
      desc: "Deploy autonomous AI agents that analyze timeseries trends, catch discrepancies, and automate operational runbooks.",
      tag: "Autonomous Agents"
    },
    {
      num: "03",
      title: "Deliver & Scale",
      desc: "Empower your operations, finance, and engineering teams with verified, sub-50ms queryable dashboards.",
      tag: "99.99% SLA"
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: "Sub-Millisecond Engine",
      desc: "Engineered in modern TypeScript and columnar streaming. Enjoy instant queries with zero database contention."
    },
    {
      icon: <Bot className="w-6 h-6 text-blue-400" />,
      title: "Operational AI Agents",
      desc: "Pre-trained models that detect revenue leaks, flag ledger discrepancies, and generate executive briefings automatically."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: "Bank-Grade Security",
      desc: "SOC 2 Type II, HIPAA, and GDPR compliant by default. Cryptographic audit trails guarantee tamper-evident integrity."
    },
    {
      icon: <Globe2 className="w-6 h-6 text-cyan-400" />,
      title: "Global Edge Replication",
      desc: "Worldwide low-latency edge deployment ensures fast page paints for your distributed teams in Tokyo, London, or SF."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-purple-400" />,
      title: "Deterministic Reconciliations",
      desc: "Float-precise arithmetic and verified math ensure finance teams close ledgers without rounding drift or mismatch bugs."
    },
    {
      icon: <Layers className="w-6 h-6 text-rose-400" />,
      title: "Developer Toolkit",
      desc: "Built-in suite of 7 production utilities: WCAG contrast, bi-directional converters, and cryptographic password generators."
    }
  ];

  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-8 pb-12 text-center">
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/15 via-indigo-500/10 to-transparent blur-3xl pointer-events-none rounded-full -z-10" />

        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-xs font-medium text-blue-400 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span>Nexora 2.0 Autonomous Platform</span>
          <span className="text-[var(--text-muted)]">|</span>
          <span className="text-[var(--text-muted)] hidden sm:inline">Now with Integrated Developer Suite</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text)] max-w-5xl mx-auto leading-[1.1] mb-6">
          Supercharge your workflow with{' '}
          <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            verified intelligence
          </span>
        </h1>

        {/* Subhead */}
        <p className="text-base sm:text-xl text-[var(--text-muted)] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          The unified operations platform for modern engineering and finance teams. Fast, accessible, and mathematically precise from day one.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-10">
          <button
            onClick={() => setActiveTab('admin')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <BarChart3 className="w-4 h-4" />
            <span>Launch Live Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-border)] border border-[var(--surface-border)] text-[var(--text)] font-semibold text-sm flex items-center justify-center gap-2 transition-all"
          >
            <span>Explore 7 Tools</span>
          </button>
        </div>

        {/* Live Metrics Showcase Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6">
          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-left">
            <span className="text-xs text-[var(--text-muted)] block uppercase tracking-wider font-semibold">Active Teams</span>
            <span className="text-2xl sm:text-3xl font-bold text-[var(--text)] mt-1 block">10,400+</span>
            <span className="text-[11px] text-emerald-400 mt-0.5 block flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +24% this quarter
            </span>
          </div>
          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-left">
            <span className="text-xs text-[var(--text-muted)] block uppercase tracking-wider font-semibold">Uptime SLA</span>
            <span className="text-2xl sm:text-3xl font-bold text-[var(--text)] mt-1 block">99.99%</span>
            <span className="text-[11px] text-emerald-400 mt-0.5 block">Zero incident streak</span>
          </div>
          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-left">
            <span className="text-xs text-[var(--text-muted)] block uppercase tracking-wider font-semibold">Query Latency</span>
            <span className="text-2xl sm:text-3xl font-bold text-[var(--text)] mt-1 block">&lt; 42ms</span>
            <span className="text-[11px] text-blue-400 mt-0.5 block">Global edge p95</span>
          </div>
          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] text-left">
            <span className="text-xs text-[var(--text-muted)] block uppercase tracking-wider font-semibold">Volume Processed</span>
            <span className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text mt-1 block font-mono">
              ${liveCounter.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-[11px] text-[var(--text-muted)] mt-0.5 block truncate" title={recentEvent}>
              {recentEvent}
            </span>
          </div>
        </div>

        {/* Trusted By Logos */}
        <div className="pt-14 pb-4">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-semibold mb-6">
            Trusted by engineering & operations leaders at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-70">
            {['NORTHWIND', 'HALCYON LABS', 'MERIDIAN CLOUD', 'ACME ENTERPRISE', 'GLOBEX', 'INITECH'].map((corp) => (
              <span key={corp} className="text-xs sm:text-sm font-extrabold tracking-widest text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
                {corp}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-2">Capabilities</h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-[var(--text)] tracking-tight">
            Everything your operations team needs. Nothing you don't.
          </h3>
          <p className="text-sm sm:text-base text-[var(--text-muted)] mt-3">
            Designed to replace 8 fragmented spreadsheets and clunky legacy scripts with a singular, high-performance portal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h4 className="text-lg font-bold text-[var(--text)] mb-2">{feat.title}</h4>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive 3-Step Workflow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[var(--surface)] border border-[var(--surface-border)] relative overflow-hidden">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold text-blue-500 uppercase tracking-widest">Workflow Architecture</span>
            <h3 className="text-3xl font-bold text-[var(--text)] mt-2">
              Three steps from raw events to verified business clarity
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-2xl cursor-pointer transition-all border ${
                  activeStep === idx 
                    ? 'bg-blue-600/10 border-blue-500/50 shadow-md shadow-blue-500/10' 
                    : 'bg-[var(--surface-elevated)] border-[var(--surface-border)] hover:border-zinc-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-mono font-bold text-blue-400">{step.num}</span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/20">
                    {step.tag}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[var(--text)] mb-2">{step.title}</h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-2">Customer Feedback</h2>
          <h3 className="text-3xl font-bold text-[var(--text)]">Loved by engineering & finance leaders</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] flex flex-col justify-between">
            <p className="text-sm text-[var(--text)] leading-relaxed italic">
              "Nexora completely eliminated our month-end reconciliation headache. Having floating-point precise order calculations and instant CSV export saved our finance team 40 hours every month."
            </p>
            <div className="mt-6 pt-4 border-t border-[var(--surface-border)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
                SC
              </div>
              <div>
                <h5 className="text-sm font-bold text-[var(--text)]">Sarah Chen</h5>
                <p className="text-xs text-[var(--text-muted)]">VP Finance, ScaleCommerce</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] flex flex-col justify-between">
            <p className="text-sm text-[var(--text)] leading-relaxed italic">
              "The developer tools suite alone is worth the bookmark. Having an accurate WCAG contrast checker and unit converter built directly into our team portal keeps our frontend team aligned."
            </p>
            <div className="mt-6 pt-4 border-t border-[var(--surface-border)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-sm">
                MJ
              </div>
              <div>
                <h5 className="text-sm font-bold text-[var(--text)]">Marcus Johnson</h5>
                <p className="text-xs text-[var(--text-muted)]">CTO, CloudMatrix Inc.</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] flex flex-col justify-between">
            <p className="text-sm text-[var(--text)] leading-relaxed italic">
              "Clean typography, zero lag, and instant responsiveness on both desktop and mobile. Nexora sets the gold standard for what internal enterprise portals should look and feel like."
            </p>
            <div className="mt-6 pt-4 border-t border-[var(--surface-border)] flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center font-bold text-white text-sm">
                AR
              </div>
              <div>
                <h5 className="text-sm font-bold text-[var(--text)]">Alex Rivera</h5>
                <p className="text-xs text-[var(--text-muted)]">Lead Architect, BuildFast</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Pricing Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-2">Transparent Pricing</h2>
          <h3 className="text-3xl font-bold text-[var(--text)]">Predictable pricing for growing organizations</h3>
          <p className="text-sm text-[var(--text-muted)] mt-2">No hidden seat fees. No surprise overage invoices.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-[var(--surface)] border border-[var(--surface-border)] mt-6">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-blue-600 text-white'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                billingCycle === 'annual'
                  ? 'bg-blue-600 text-white'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <span>Annual billing</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Starter Plan */}
          <div className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-[var(--text)]">Starter</h4>
              <p className="text-xs text-[var(--text-muted)] mt-1">For early-stage startups and small projects.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-[var(--text)]">$0</span>
                <span className="text-xs text-[var(--text-muted)]">/ month</span>
              </div>
              <ul className="mt-6 space-y-3 text-xs text-[var(--text)]">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Up to 5,000 monthly events</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 7 Developer utilities</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Community forum access</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Standard CSV export</li>
              </ul>
            </div>
            <button
              onClick={() => { setActiveTab('tools'); showToast('Starter Plan Active', 'Explore the 7 developer tools suite.', 'info'); }}
              className="mt-8 w-full py-2.5 rounded-xl border border-[var(--surface-border)] hover:bg-[var(--surface-elevated)] text-xs font-semibold text-[var(--text)] transition-colors"
            >
              Get Started Free
            </button>
          </div>

          {/* Pro Plan */}
          <div className="p-8 rounded-2xl bg-[var(--surface-elevated)] border-2 border-blue-500 shadow-xl shadow-blue-500/10 flex flex-col justify-between relative">
            <span className="absolute -top-3 right-6 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
              Most Popular
            </span>
            <div>
              <h4 className="text-lg font-bold text-[var(--text)]">Pro Operations</h4>
              <p className="text-xs text-[var(--text-muted)] mt-1">For scaling teams managing high volume.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-[var(--text)]">
                  ${billingCycle === 'annual' ? '29' : '36'}
                </span>
                <span className="text-xs text-[var(--text-muted)]">/ month</span>
              </div>
              <ul className="mt-6 space-y-3 text-xs text-[var(--text)]">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Unlimited order tracking & search</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Sub-50ms analytics query engine</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Automated discrepancy detection</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Priority 24/7 engineer support</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Dedicated webhook streaming</li>
              </ul>
            </div>
            <button
              onClick={() => { setActiveTab('admin'); showToast('Pro Mode Initialized', 'Dashboard unlocked with full feature access.', 'success'); }}
              className="mt-8 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all"
            >
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-[var(--text)]">Enterprise</h4>
              <p className="text-xs text-[var(--text-muted)] mt-1">Custom governance, compliance & SLA.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-[var(--text)]">Custom</span>
              </div>
              <ul className="mt-6 space-y-3 text-xs text-[var(--text)]">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Single Sign-On (SAML / Okta / Azure)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> SCIM user provisioning & RBAC</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dedicated Technical Account Manager</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Custom data retention policies</li>
              </ul>
            </div>
            <button
              onClick={() => { setActiveTab('contact'); showToast('Connecting to Enterprise Sales', 'Complete the form for an immediate consultation.', 'info'); }}
              className="mt-8 w-full py-2.5 rounded-xl border border-[var(--surface-border)] hover:bg-[var(--surface-elevated)] text-xs font-semibold text-[var(--text)] transition-colors"
            >
              Talk to Enterprise Solutions
            </button>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-purple-900/40 border border-blue-500/30 text-center relative overflow-hidden">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[var(--text)] max-w-2xl mx-auto">
            Ready to experience clean, high-velocity operations?
          </h3>
          <p className="text-sm text-[var(--text-muted)] max-w-xl mx-auto mt-3 mb-8">
            Join thousands of modern organizations who rely on Nexora daily. Zero complex setup, zero bloated dependencies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('admin')}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 transition-all"
            >
              Go to Analytics Dashboard
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className="px-6 py-3 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-[var(--text)] font-semibold text-xs transition-colors"
            >
              Connect with Community
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
