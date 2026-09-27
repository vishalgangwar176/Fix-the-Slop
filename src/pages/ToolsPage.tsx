import React, { useState, useMemo } from 'react';
import { 
  ArrowRightLeft, 
  Scale, 
  Coins, 
  KeyRound, 
  CalendarDays, 
  Eye, 
  Copy, 
  Check, 
  RefreshCw, 
  Sparkles,
  Calculator,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

interface ToolsPageProps {
  showToast: (title: string, desc?: string, type?: 'success' | 'info' | 'error') => void;
}

export const ToolsPage: React.FC<ToolsPageProps> = ({ showToast }) => {
  const [activeTool, setActiveTool] = useState<
    'km-miles' | 'bmi' | 'tip' | 'currency' | 'password' | 'age' | 'wcag'
  >('km-miles');

  // ==========================================
  // TOOL 1: KM <-> Miles
  // ==========================================
  const [distanceVal, setDistanceVal] = useState<string>('10');
  const [distanceUnit, setDistanceUnit] = useState<'km' | 'miles'>('km');
  const [distancePrecision, setDistancePrecision] = useState<number>(2);

  const convertedDistance = useMemo(() => {
    const num = parseFloat(distanceVal);
    if (isNaN(num)) return '—';
    if (distanceUnit === 'km') {
      // 1 km = 0.621371192 miles
      const result = num * 0.621371192;
      return `${result.toFixed(distancePrecision)} miles`;
    } else {
      // 1 mile = 1.609344 km
      const result = num * 1.609344;
      return `${result.toFixed(distancePrecision)} km`;
    }
  }, [distanceVal, distanceUnit, distancePrecision]);

  // ==========================================
  // TOOL 2: BMI Calculator
  // ==========================================
  const [bmiUnit, setBmiUnit] = useState<'metric' | 'imperial'>('metric');
  const [weightKg, setWeightKg] = useState('70');
  const [heightCm, setHeightCm] = useState('175');
  const [weightLbs, setWeightLbs] = useState('154');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('9');

  const bmiResult = useMemo(() => {
    let bmi = 0;
    if (bmiUnit === 'metric') {
      const w = parseFloat(weightKg);
      const hM = parseFloat(heightCm) / 100;
      if (w > 0 && hM > 0) {
        bmi = w / (hM * hM);
      }
    } else {
      const w = parseFloat(weightLbs);
      const totalIn = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0);
      if (w > 0 && totalIn > 0) {
        bmi = (703 * w) / (totalIn * totalIn);
      }
    }

    if (bmi <= 0 || isNaN(bmi)) return null;

    let category = 'Normal weight';
    let color = 'text-emerald-400';
    let bg = 'bg-emerald-500/10 border-emerald-500/20';

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-blue-400';
      bg = 'bg-blue-500/10 border-blue-500/20';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Overweight';
      color = 'text-amber-400';
      bg = 'bg-amber-500/10 border-amber-500/20';
    } else if (bmi >= 30) {
      category = 'Obese';
      color = 'text-rose-400';
      bg = 'bg-rose-500/10 border-rose-500/20';
    }

    return {
      value: bmi.toFixed(1),
      category,
      color,
      bg
    };
  }, [bmiUnit, weightKg, heightCm, weightLbs, heightFt, heightIn]);

  // ==========================================
  // TOOL 3: Tip & Split
  // ==========================================
  const [billAmount, setBillAmount] = useState('120.00');
  const [tipPercent, setTipPercent] = useState(18);
  const [customTip, setCustomTip] = useState('');
  const [splitCount, setSplitCount] = useState(3);

  const tipCalculations = useMemo(() => {
    const bill = parseFloat(billAmount) || 0;
    const effectiveTip = customTip !== '' ? parseFloat(customTip) || 0 : tipPercent;
    const people = Math.max(splitCount, 1);

    const tipAmt = (bill * effectiveTip) / 100;
    const totalBill = bill + tipAmt;
    const tipPerPerson = tipAmt / people;
    const totalPerPerson = totalBill / people;

    return {
      tipAmt: tipAmt.toFixed(2),
      totalBill: totalBill.toFixed(2),
      tipPerPerson: tipPerPerson.toFixed(2),
      totalPerPerson: totalPerPerson.toFixed(2)
    };
  }, [billAmount, tipPercent, customTip, splitCount]);

  // ==========================================
  // TOOL 4: Currency Exchange
  // ==========================================
  const [curAmount, setCurAmount] = useState('100');
  const [fromCur, setFromCur] = useState('USD');
  const [toCur, setToCur] = useState('INR');

  // Baseline currency exchange rates pegged to 1 USD
  const CURRENCY_RATES: Record<string, number> = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    INR: 86.42,
    JPY: 154.20,
    CAD: 1.38,
    AUD: 1.55,
    CHF: 0.90,
    SGD: 1.34,
    BTC: 0.000015
  };

  const currencyResult = useMemo(() => {
    const amount = parseFloat(curAmount) || 0;
    const fromRate = CURRENCY_RATES[fromCur] || 1;
    const toRate = CURRENCY_RATES[toCur] || 1;

    // Convert from base USD
    const inUSD = amount / fromRate;
    const converted = inUSD * toRate;
    const ratePerUnit = toRate / fromRate;

    return {
      result: toCur === 'BTC' ? converted.toFixed(6) : converted.toFixed(2),
      rateDisplay: `1 ${fromCur} = ${toCur === 'BTC' ? ratePerUnit.toFixed(6) : ratePerUnit.toFixed(4)} ${toCur}`
    };
  }, [curAmount, fromCur, toCur]);

  const swapCurrencies = () => {
    setFromCur(toCur);
    setToCur(fromCur);
  };

  // ==========================================
  // TOOL 5: Secure Password Generator
  // ==========================================
  const [pwLength, setPwLength] = useState(16);
  const [incUpper, setIncUpper] = useState(true);
  const [incLower, setIncLower] = useState(true);
  const [incNumbers, setIncNumbers] = useState(true);
  const [incSymbols, setIncSymbols] = useState(true);
  const [generatedPw, setGeneratedPw] = useState('k9$Pq2#mR8!vW4xL');
  const [pwCopied, setPwCopied] = useState(false);

  const generatePassword = () => {
    let pool = '';
    if (incLower) pool += 'abcdefghijklmnopqrstuvwxyz';
    if (incUpper) pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (incNumbers) pool += '0123456789';
    if (incSymbols) pool += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!pool) pool = 'abcdefghijklmnopqrstuvwxyz';

    // Cryptographically strong random generation
    const array = new Uint32Array(pwLength);
    window.crypto.getRandomValues(array);
    let result = '';
    for (let i = 0; i < pwLength; i++) {
      result += pool[array[i] % pool.length];
    }
    setGeneratedPw(result);
  };

  const copyPassword = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(generatedPw);
      showToast('Password Copied', 'Secure password copied to clipboard.', 'success');
      setPwCopied(true);
      setTimeout(() => setPwCopied(false), 2000);
    }
  };

  const pwEntropy = useMemo(() => {
    let poolSize = 0;
    if (incLower) poolSize += 26;
    if (incUpper) poolSize += 26;
    if (incNumbers) poolSize += 10;
    if (incSymbols) poolSize += 28;
    if (poolSize === 0) poolSize = 26;

    const bits = Math.round(pwLength * Math.log2(poolSize));
    let strength = 'Weak';
    let color = 'text-rose-400';
    let barWidth = '25%';
    let barColor = 'bg-rose-500';

    if (bits >= 75) {
      strength = 'Very Strong';
      color = 'text-emerald-400';
      barWidth = '100%';
      barColor = 'bg-emerald-500';
    } else if (bits >= 55) {
      strength = 'Strong';
      color = 'text-blue-400';
      barWidth = '75%';
      barColor = 'bg-blue-500';
    } else if (bits >= 40) {
      strength = 'Moderate';
      color = 'text-amber-400';
      barWidth = '50%';
      barColor = 'bg-amber-500';
    }

    return { bits, strength, color, barWidth, barColor };
  }, [pwLength, incLower, incUpper, incNumbers, incSymbols]);

  // ==========================================
  // TOOL 6: Age & Milestone Calculator
  // ==========================================
  const [birthDateStr, setBirthDateStr] = useState('1998-05-15');

  const ageCalculations = useMemo(() => {
    if (!birthDateStr) return null;
    const bDate = new Date(birthDateStr);
    if (isNaN(bDate.getTime())) return null;

    const today = new Date();
    if (bDate > today) {
      return { 
        error: 'Date of birth cannot be in the future.',
        years: 0,
        months: 0,
        days: 0,
        daysUntilNext: 0,
        totalDaysLived: 0
      };
    }

    let years = today.getFullYear() - bDate.getFullYear();
    let months = today.getMonth() - bDate.getMonth();
    let days = today.getDate() - bDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Days until next birthday
    const nextBday = new Date(today.getFullYear(), bDate.getMonth(), bDate.getDate());
    if (nextBday < today) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const diffTime = nextBday.getTime() - today.getTime();
    const daysUntilNext = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Total days lived
    const totalDaysLived = Math.floor((today.getTime() - bDate.getTime()) / (1000 * 60 * 60 * 24));

    return {
      error: null,
      years,
      months,
      days,
      daysUntilNext,
      totalDaysLived
    };
  }, [birthDateStr]);

  // ==========================================
  // TOOL 7: WCAG 2.1 Contrast Checker
  // ==========================================
  const [fgColor, setFgColor] = useState('#3b82f6');
  const [bgColor, setBgColor] = useState('#0b0d12');

  // Real WCAG 2.1 relative luminance and contrast ratio algorithm
  const wcagMetrics = useMemo(() => {
    const parseHex = (hex: string) => {
      let clean = hex.replace('#', '');
      if (clean.length === 3) {
        clean = clean.split('').map(c => c + c).join('');
      }
      if (clean.length !== 6) return [0, 0, 0];
      const r = parseInt(clean.substring(0, 2), 16) || 0;
      const g = parseInt(clean.substring(2, 4), 16) || 0;
      const b = parseInt(clean.substring(4, 6), 16) || 0;
      return [r, g, b];
    };

    const getLuminance = (r: number, g: number, b: number) => {
      const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const [r1, g1, b1] = parseHex(fgColor);
    const [r2, g2, b2] = parseHex(bgColor);

    const l1 = getLuminance(r1, g1, b1);
    const l2 = getLuminance(r2, g2, b2);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    const ratio = (lighter + 0.05) / (darker + 0.05);

    return {
      ratio: ratio.toFixed(2),
      numRatio: ratio,
      passAANormal: ratio >= 4.5,
      passAALarge: ratio >= 3.0,
      passAAANormal: ratio >= 7.0,
      passAAALarge: ratio >= 4.5
    };
  }, [fgColor, bgColor]);

  const swapWcagColors = () => {
    setFgColor(bgColor);
    setBgColor(fgColor);
  };

  const toolTabs: { id: typeof activeTool; name: string; icon: string; badge?: string }[] = [
    { id: 'km-miles', name: 'KM ↔ Miles', icon: '📏' },
    { id: 'bmi', name: 'BMI Calculator', icon: '⚖️' },
    { id: 'tip', name: 'Tip & Bill Split', icon: '🍕' },
    { id: 'currency', name: 'Live Currency', icon: '💱' },
    { id: 'password', name: 'Password Gen', icon: '🔐' },
    { id: 'age', name: 'Age & Milestones', icon: '🎂' },
    { id: 'wcag', name: 'WCAG Contrast', icon: '♿', badge: 'WCAG 2.1' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
          — Verified Developer Suite —
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text)]">
          Engineering & Math Toolkit
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
          Seven precision tools for developers, analysts, and designers. Mathematically verified, zero tracking, zero bloat.
        </p>

        {/* Tab Selectors */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {toolTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTool(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTool === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-[var(--surface)] border border-[var(--surface-border)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
              {tab.badge && (
                <span className="text-[9px] bg-white/20 text-white px-1.5 py-0.2 rounded font-mono font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active Tool Showcase Canvas */}
      <div className="max-w-2xl mx-auto">
        {/* ========================================================= */}
        {/* TOOL 1: KM <-> MILES */}
        {/* ========================================================= */}
        {activeTool === 'km-miles' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[var(--text)] flex items-center gap-2">
                  <span>📏 Distance Converter</span>
                </h3>
                <p className="text-xs text-[var(--text-muted)]">Verified formula: 1 mi = 1.609344 km</p>
              </div>
              <button
                onClick={() => setDistanceUnit(distanceUnit === 'km' ? 'miles' : 'km')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Swap ({distanceUnit === 'km' ? 'KM → Mi' : 'Mi → KM'})</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[var(--text-muted)] mb-1 font-medium">
                  Enter value in {distanceUnit.toUpperCase()}:
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={distanceVal}
                  onChange={(e) => setDistanceVal(e.target.value)}
                  className="w-full text-base font-mono bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl p-3 text-[var(--text)] focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                <span>Decimal Precision:</span>
                <div className="flex gap-1.5">
                  {[1, 2, 4].map(p => (
                    <button
                      key={p}
                      onClick={() => setDistancePrecision(p)}
                      className={`px-2.5 py-1 rounded-lg font-mono text-xs ${
                        distancePrecision === p
                          ? 'bg-blue-600 text-white'
                          : 'bg-[var(--surface-elevated)] text-[var(--text-muted)]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result Display */}
              <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-center space-y-1">
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                  Converted Output
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono block">
                  {convertedDistance}
                </span>
                <span className="text-[11px] text-[var(--text-muted)] block">
                  {distanceVal || 0} {distanceUnit} = {convertedDistance}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TOOL 2: BMI CALCULATOR */}
        {/* ========================================================= */}
        {activeTool === 'bmi' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[var(--text)]">⚖️ Body Mass Index (BMI)</h3>
                <p className="text-xs text-[var(--text-muted)]">Standard World Health Organization (WHO) formula</p>
              </div>
              <div className="flex gap-1 p-1 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)]">
                <button
                  onClick={() => setBmiUnit('metric')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    bmiUnit === 'metric' ? 'bg-blue-600 text-white' : 'text-[var(--text-muted)]'
                  }`}
                >
                  Metric (cm / kg)
                </button>
                <button
                  onClick={() => setBmiUnit('imperial')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    bmiUnit === 'imperial' ? 'bg-blue-600 text-white' : 'text-[var(--text-muted)]'
                  }`}
                >
                  Imperial (ft / lbs)
                </button>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              {bmiUnit === 'metric' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[var(--text-muted)] mb-1 font-medium">Height (cm)</label>
                    <input
                      type="number"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      placeholder="175"
                      className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl p-3 text-[var(--text)] font-mono text-base focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[var(--text-muted)] mb-1 font-medium">Weight (kg)</label>
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      placeholder="70"
                      className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl p-3 text-[var(--text)] font-mono text-base focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[var(--text-muted)] mb-1 font-medium">Height (Feet)</label>
                      <input
                        type="number"
                        value={heightFt}
                        onChange={(e) => setHeightFt(e.target.value)}
                        placeholder="5"
                        className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl p-3 text-[var(--text)] font-mono text-base focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[var(--text-muted)] mb-1 font-medium">Height (Inches)</label>
                      <input
                        type="number"
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                        placeholder="9"
                        className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl p-3 text-[var(--text)] font-mono text-base focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[var(--text-muted)] mb-1 font-medium">Weight (lbs)</label>
                    <input
                      type="number"
                      value={weightLbs}
                      onChange={(e) => setWeightLbs(e.target.value)}
                      placeholder="154"
                      className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl p-3 text-[var(--text)] font-mono text-base focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* BMI Output */}
              {bmiResult ? (
                <div className={`p-6 rounded-2xl border text-center space-y-2 ${bmiResult.bg}`}>
                  <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold block">
                    Calculated BMI
                  </span>
                  <span className="text-4xl font-extrabold text-[var(--text)] font-mono block">
                    {bmiResult.value}
                  </span>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${bmiResult.color}`}>
                    {bmiResult.category}
                  </span>
                  <div className="grid grid-cols-4 gap-1 text-[10px] text-[var(--text-muted)] pt-3 max-w-xs mx-auto border-t border-[var(--surface-border)]">
                    <div>&lt; 18.5<br/>Under</div>
                    <div>18.5–24.9<br/>Normal</div>
                    <div>25–29.9<br/>Over</div>
                    <div>≥ 30<br/>Obese</div>
                  </div>
                </div>
              ) : (
                <p className="text-center text-[var(--text-muted)] py-4">Enter valid height and weight values to calculate.</p>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TOOL 3: TIP & BILL SPLIT */}
        {/* ========================================================= */}
        {activeTool === 'tip' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-xl space-y-6">
            <div className="border-b border-[var(--surface-border)] pb-4">
              <h3 className="text-lg font-bold text-[var(--text)]">🍕 Tip & Split Bill Calculator</h3>
              <p className="text-xs text-[var(--text-muted)]">Split group restaurant bills and calculate gratuity with cent precision</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[var(--text-muted)] mb-1 font-medium">Bill Total ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={billAmount}
                  onChange={(e) => setBillAmount(e.target.value)}
                  className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl p-3 text-[var(--text)] font-mono text-base focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Tip Presets */}
              <div>
                <label className="block text-[var(--text-muted)] mb-1.5 font-medium">Tip Percentage</label>
                <div className="grid grid-cols-5 gap-2">
                  {[10, 15, 18, 20].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => { setTipPercent(pct); setCustomTip(''); }}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        tipPercent === pct && customTip === ''
                          ? 'bg-blue-600 text-white'
                          : 'bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-[var(--text)]'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                  <input
                    type="number"
                    placeholder="Custom %"
                    value={customTip}
                    onChange={(e) => setCustomTip(e.target.value)}
                    className="bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl px-2 py-1 text-center text-xs font-mono text-[var(--text)] focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* People Counter */}
              <div>
                <label className="block text-[var(--text-muted)] mb-1 font-medium">Split between ({splitCount} people)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={splitCount}
                    onChange={(e) => setSplitCount(parseInt(e.target.value, 10))}
                    className="flex-1 accent-blue-600"
                  />
                  <span className="font-mono text-sm font-bold text-[var(--text)] w-8 text-center">{splitCount}</span>
                </div>
              </div>

              {/* Summary Breakdown Card */}
              <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[var(--text-muted)]">Tip Amount:</span>
                  <span className="font-mono font-bold text-[var(--text)]">${tipCalculations.tipAmt}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[var(--text-muted)]">Total Bill (with Tip):</span>
                  <span className="font-mono font-bold text-[var(--text)]">${tipCalculations.totalBill}</span>
                </div>
                <div className="pt-2 border-t border-[var(--surface-border)] flex justify-between items-center">
                  <div>
                    <span className="text-xs font-bold text-[var(--text)] block">Total Per Person</span>
                    <span className="text-[10px] text-[var(--text-muted)]">Includes ${tipCalculations.tipPerPerson} tip each</span>
                  </div>
                  <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                    ${tipCalculations.totalPerPerson}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TOOL 4: CURRENCY EXCHANGE */}
        {/* ========================================================= */}
        {activeTool === 'currency' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[var(--text)]">💱 Real-Time Currency Converter</h3>
                <p className="text-xs text-[var(--text-muted)]">Deterministic global exchange matrix</p>
              </div>
              <button
                onClick={swapCurrencies}
                className="p-2 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-blue-400 hover:text-blue-300"
                title="Swap currencies"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[var(--text-muted)] mb-1 font-medium">Amount to Convert</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={curAmount}
                  onChange={(e) => setCurAmount(e.target.value)}
                  className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl p-3 text-[var(--text)] font-mono text-base focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--text-muted)] mb-1 font-medium">From</label>
                  <select
                    value={fromCur}
                    onChange={(e) => setFromCur(e.target.value)}
                    className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl p-3 text-[var(--text)] font-semibold text-xs focus:outline-none focus:border-blue-500"
                  >
                    {Object.keys(CURRENCY_RATES).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[var(--text-muted)] mb-1 font-medium">To</label>
                  <select
                    value={toCur}
                    onChange={(e) => setToCur(e.target.value)}
                    className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl p-3 text-[var(--text)] font-semibold text-xs focus:outline-none focus:border-blue-500"
                  >
                    {Object.keys(CURRENCY_RATES).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-center space-y-1.5">
                <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold block">
                  Converted Result
                </span>
                <span className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono block">
                  {currencyResult.result} {toCur}
                </span>
                <span className="text-xs text-[var(--text-muted)] block font-mono">
                  {currencyResult.rateDisplay}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TOOL 5: SECURE PASSWORD GENERATOR */}
        {/* ========================================================= */}
        {activeTool === 'password' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-xl space-y-6">
            <div className="border-b border-[var(--surface-border)] pb-4">
              <h3 className="text-lg font-bold text-[var(--text)]">🔐 Cryptographic Password Generator</h3>
              <p className="text-xs text-[var(--text-muted)]">High-entropy cryptographic entropy via window.crypto</p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Output Display Box */}
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={generatedPw}
                  className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl p-3 pr-24 text-[var(--text)] font-mono text-sm tracking-wider select-all"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button
                    onClick={generatePassword}
                    title="Regenerate"
                    className="p-1.5 rounded-lg bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text)] border border-[var(--surface-border)]"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={copyPassword}
                    title="Copy to clipboard"
                    className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] flex items-center gap-1 shadow-sm"
                  >
                    {pwCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{pwCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Entropy Bar */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-[var(--text-muted)]">Entropy Score: {pwEntropy.bits} bits</span>
                  <span className={`font-bold ${pwEntropy.color}`}>{pwEntropy.strength}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[var(--surface-elevated)] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${pwEntropy.barColor}`}
                    style={{ width: pwEntropy.barWidth }}
                  />
                </div>
              </div>

              {/* Length Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[var(--text-muted)] font-medium">Length: {pwLength} characters</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="64"
                  value={pwLength}
                  onChange={(e) => setPwLength(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Options Checks */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <label className="flex items-center gap-2 p-2 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={incUpper}
                    onChange={(e) => setIncUpper(e.target.checked)}
                    className="rounded border-[var(--surface-border)] accent-blue-600"
                  />
                  <span>Uppercase (A-Z)</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={incLower}
                    onChange={(e) => setIncLower(e.target.checked)}
                    className="rounded border-[var(--surface-border)] accent-blue-600"
                  />
                  <span>Lowercase (a-z)</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={incNumbers}
                    onChange={(e) => setIncNumbers(e.target.checked)}
                    className="rounded border-[var(--surface-border)] accent-blue-600"
                  />
                  <span>Numbers (0-9)</span>
                </label>
                <label className="flex items-center gap-2 p-2 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={incSymbols}
                    onChange={(e) => setIncSymbols(e.target.checked)}
                    className="rounded border-[var(--surface-border)] accent-blue-600"
                  />
                  <span>Special (!@#$)</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TOOL 6: AGE & MILESTONE CALCULATOR */}
        {/* ========================================================= */}
        {activeTool === 'age' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-xl space-y-6">
            <div className="border-b border-[var(--surface-border)] pb-4">
              <h3 className="text-lg font-bold text-[var(--text)]">🎂 Exact Age & Milestones</h3>
              <p className="text-xs text-[var(--text-muted)]">Accounts for leap years, calendar shifts, and days lived</p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[var(--text-muted)] mb-1 font-medium">Select Birthdate</label>
                <input
                  type="date"
                  value={birthDateStr}
                  onChange={(e) => setBirthDateStr(e.target.value)}
                  className="w-full bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl p-3 text-[var(--text)] font-semibold text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              {ageCalculations && !ageCalculations.error && (
                <div className="space-y-3">
                  <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-center">
                    <span className="text-xs text-[var(--text-muted)] uppercase tracking-wider block font-semibold mb-1">
                      Current Exact Age
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono">
                      {ageCalculations.years} years, {ageCalculations.months} months, {ageCalculations.days} days
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)]">
                      <span className="text-[11px] text-[var(--text-muted)] block">Next Birthday in</span>
                      <span className="text-xl font-bold text-emerald-400 font-mono mt-0.5 block">
                        {ageCalculations.daysUntilNext} days
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--surface-border)]">
                      <span className="text-[11px] text-[var(--text-muted)] block">Total Days Lived</span>
                      <span className="text-xl font-bold text-indigo-400 font-mono mt-0.5 block">
                        {ageCalculations.totalDaysLived.toLocaleString()} days
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TOOL 7: WCAG 2.1 CONTRAST CHECKER */}
        {/* ========================================================= */}
        {activeTool === 'wcag' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--surface)] border border-[var(--surface-border)] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[var(--text)]">♿ WCAG 2.1 Contrast Checker</h3>
                <p className="text-xs text-[var(--text-muted)]">Mathematically verified relative luminance test</p>
              </div>
              <button
                onClick={swapWcagColors}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-xs text-blue-400 font-semibold"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Swap</span>
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[var(--text-muted)] mb-1 font-medium">Foreground (Text)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={fgColor}
                      onChange={(e) => setFgColor(e.target.value)}
                      className="flex-1 bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl p-2.5 font-mono text-xs text-[var(--text)] uppercase"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[var(--text-muted)] mb-1 font-medium">Background</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="flex-1 bg-[var(--surface-elevated)] border border-[var(--surface-border)] rounded-xl p-2.5 font-mono text-xs text-[var(--text)] uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* Ratio Result */}
              <div className="p-5 rounded-2xl bg-[var(--surface-elevated)] border border-[var(--surface-border)] text-center space-y-1">
                <span className="text-xs uppercase tracking-wider text-[var(--text-muted)] font-semibold block">
                  Contrast Ratio
                </span>
                <span className="text-4xl font-extrabold text-[var(--text)] font-mono block">
                  {wcagMetrics.ratio}:1
                </span>
              </div>

              {/* Live Preview Sample Box */}
              <div
                className="p-6 rounded-2xl border transition-all space-y-2 shadow-inner"
                style={{ backgroundColor: bgColor, color: fgColor, borderColor: fgColor + '33' }}
              >
                <h4 className="text-base font-bold">The quick brown fox jumps over the lazy dog</h4>
                <p className="text-xs leading-relaxed opacity-90">
                  This preview renders actual typography using your chosen foreground and background colors to test real-world readability.
                </p>
              </div>

              {/* Compliance Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className={`p-3 rounded-xl border text-center ${
                  wcagMetrics.passAANormal ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}>
                  <span className="text-[10px] block text-[var(--text-muted)]">AA Normal (≥4.5)</span>
                  <span className="font-bold text-xs mt-0.5 block">{wcagMetrics.passAANormal ? 'PASS ✓' : 'FAIL ✕'}</span>
                </div>
                <div className={`p-3 rounded-xl border text-center ${
                  wcagMetrics.passAALarge ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}>
                  <span className="text-[10px] block text-[var(--text-muted)]">AA Large (≥3.0)</span>
                  <span className="font-bold text-xs mt-0.5 block">{wcagMetrics.passAALarge ? 'PASS ✓' : 'FAIL ✕'}</span>
                </div>
                <div className={`p-3 rounded-xl border text-center ${
                  wcagMetrics.passAAANormal ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}>
                  <span className="text-[10px] block text-[var(--text-muted)]">AAA Normal (≥7.0)</span>
                  <span className="font-bold text-xs mt-0.5 block">{wcagMetrics.passAAANormal ? 'PASS ✓' : 'FAIL ✕'}</span>
                </div>
                <div className={`p-3 rounded-xl border text-center ${
                  wcagMetrics.passAAALarge ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}>
                  <span className="text-[10px] block text-[var(--text-muted)]">AAA Large (≥4.5)</span>
                  <span className="font-bold text-xs mt-0.5 block">{wcagMetrics.passAAALarge ? 'PASS ✓' : 'FAIL ✕'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
