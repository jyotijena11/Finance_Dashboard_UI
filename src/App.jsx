import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Receipt,
  Lightbulb,
  Bell,
  Search,
  Filter,
  Plus,
  Pencil,
  Trash2,
  Moon,
  Sun,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  BadgeIndianRupee,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';

const INITIAL_TRANSACTIONS = [
  { id: 1, title: 'Salary Credit', date: '2026-04-01', amount: 95000, category: 'Income', type: 'income', status: 'Completed' },
  { id: 2, title: 'Stock Dividend', date: '2026-04-02', amount: 5400, category: 'Income', type: 'income', status: 'Completed' },
  { id: 3, title: 'Rent Payment', date: '2026-04-03', amount: 24000, category: 'Housing', type: 'expense', status: 'Completed' },
  { id: 4, title: 'Zomato Order', date: '2026-04-04', amount: 920, category: 'Food', type: 'expense', status: 'Completed' },
  { id: 5, title: 'Amazon Purchase', date: '2026-04-05', amount: 4799, category: 'Shopping', type: 'expense', status: 'Completed' },
  { id: 6, title: 'Electricity Bill', date: '2026-04-06', amount: 3150, category: 'Utilities', type: 'expense', status: 'Pending' },
  { id: 7, title: 'Mutual Fund SIP', date: '2026-04-07', amount: 12000, category: 'Investment', type: 'expense', status: 'Completed' },
  { id: 8, title: 'Flight Booking', date: '2026-04-08', amount: 8900, category: 'Travel', type: 'expense', status: 'Completed' },
  { id: 9, title: 'Freelance Project', date: '2026-04-09', amount: 18000, category: 'Income', type: 'income', status: 'Pending' },
  { id: 10, title: 'Netflix', date: '2026-04-10', amount: 649, category: 'Entertainment', type: 'expense', status: 'Completed' },
  { id: 11, title: 'Uber Ride', date: '2026-04-11', amount: 420, category: 'Transport', type: 'expense', status: 'Completed' },
  { id: 12, title: 'Phone Recharge', date: '2026-04-12', amount: 799, category: 'Utilities', type: 'expense', status: 'Completed' },
];

const MONTHLY_TREND = [
  { month: 'Jan', income: 112000, expense: 69000 },
  { month: 'Feb', income: 119000, expense: 72000 },
  { month: 'Mar', income: 125000, expense: 77000 },
  { month: 'Apr', income: 118400, expense: 55637 },
  { month: 'May', income: 131000, expense: 81400 },
  { month: 'Jun', income: 139000, expense: 83200 },
];

const CATEGORY_COLORS = {
  Housing: '#7c5cff',
  Food: '#ff9a62',
  Shopping: '#ef5da8',
  Utilities: '#45c4ff',
  Investment: '#30d5a4',
  Travel: '#a78bfa',
  Entertainment: '#ffd84d',
  Transport: '#5eead4',
  Income: '#16c47f',
};

const defaultForm = {
  title: '',
  date: '2026-04-15',
  amount: '',
  category: 'Shopping',
  type: 'expense',
  status: 'Completed',
};

const currency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

const chip = (type) =>
  type === 'income' ? 'chip chip-income' : 'chip chip-expense';

function deriveInsights(transactions) {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const income = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = expenses.reduce((sum, t) => sum + t.amount, 0);

  const byCategory = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  const highest = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0] || ['None', 0];
  const savings = income - expense;
  const savingsRate = income ? ((savings / income) * 100).toFixed(1) : '0.0';
  const avgExpense = expenses.length ? expense / expenses.length : 0;

  return [
    {
      title: 'Highest spending category',
      value: highest[0],
      note: `${currency(highest[1])} spent in ${highest[0]}. Consider setting a category cap.`,
      icon: <TrendingDown size={18} />,
    },
    {
      title: 'Monthly savings rate',
      value: `${savingsRate}%`,
      note: `You retained ${currency(savings)} after expenses this cycle.`,
      icon: <PiggyBank size={18} />,
    },
    {
      title: 'Average expense',
      value: currency(avgExpense),
      note: `Typical expense ticket size across ${expenses.length} transactions.`,
      icon: <Receipt size={18} />,
    },
  ];
}

function Modal({ children, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-card"
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function StatCard({ icon, label, value, sub, glow }) {
  return (
    <motion.div className="stat-card" whileHover={{ y: -5, scale: 1.01 }} transition={{ duration: 0.2 }}>
      <div className={`stat-glow ${glow}`} />
      <div className="stat-top">
        <div>
          <div className="eyebrow">{label}</div>
          <div className="stat-value">{value}</div>
          <div className="stat-sub">{sub}</div>
        </div>
        <div className="icon-pill">{icon}</div>
      </div>
    </motion.div>
  );
}

function SectionCard({ title, subtitle, action, children }) {
  return (
    <div className="section-card">
      <div className="section-head">
        <div>
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance-dashboard-premium-transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [role, setRole] = useState('Admin');
  const [theme, setTheme] = useState(() => localStorage.getItem('finance-dashboard-premium-theme') || 'dark');
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    localStorage.setItem('finance-dashboard-premium-transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('finance-dashboard-premium-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const summary = useMemo(() => {
    const income = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expense;
    const savingsRate = income ? Math.round((balance / income) * 100) : 0;
    return { income, expense, balance, savingsRate };
  }, [transactions]);

  const categoryData = useMemo(() => {
    const result = {};
    transactions.filter((t) => t.type === 'expense').forEach((t) => {
      result[t.category] = (result[t.category] || 0) + t.amount;
    });
    return Object.entries(result).map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || '#7c5cff' }));
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    let data = [...transactions].filter((item) => {
      const search = query.toLowerCase();
      const matchesQuery = !search || [item.title, item.category, item.type, item.status, item.date].join(' ').toLowerCase().includes(search);
      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      return matchesQuery && matchesType;
    });

    data.sort((a, b) => {
      if (sortBy === 'latest') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'oldest') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'highest') return b.amount - a.amount;
      if (sortBy === 'lowest') return a.amount - b.amount;
      return a.title.localeCompare(b.title);
    });

    return data;
  }, [transactions, query, typeFilter, sortBy]);

  const insights = useMemo(() => deriveInsights(transactions), [transactions]);

  const hasActiveSearch = query.trim().length > 0;
  const searchResultCount = filteredTransactions.length;

  const searchStatus = hasActiveSearch
    ? searchResultCount > 0
      ? `${searchResultCount} result${searchResultCount === 1 ? '' : 's'} found`
      : 'Not found'
    : '';

  const tooltipProps = {
    contentStyle: {
      background: 'var(--tooltip-bg)',
      border: '1px solid var(--line)',
      borderRadius: 16,
      color: 'var(--tooltip-text)',
      boxShadow: 'var(--shadow)',
    },
    labelStyle: { color: 'var(--tooltip-text)', fontWeight: 700 },
    itemStyle: { color: 'var(--tooltip-text)' },
    cursor: { stroke: 'var(--line)' },
  };

  const openAddModal = () => {
    setEditing(null);
    setForm(defaultForm);
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditing(item.id);
    setForm({
      title: item.title,
      date: item.date,
      amount: item.amount,
      category: item.category,
      type: item.type,
      status: item.status,
    });
    setShowModal(true);
  };

  const saveTransaction = (e) => {
    e.preventDefault();
    if (role !== 'Admin') return;
    const payload = { ...form, amount: Number(form.amount) };

    if (editing) {
      setTransactions((prev) => prev.map((item) => (item.id === editing ? { ...item, ...payload } : item)));
    } else {
      setTransactions((prev) => [{ id: Date.now(), ...payload }, ...prev]);
    }

    setShowModal(false);
    setEditing(null);
    setForm(defaultForm);
  };

  const removeTransaction = (id) => {
    if (role !== 'Admin') return;
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
    { id: 'transactions', label: 'Transactions', icon: <Receipt size={18} /> },
    { id: 'insights', label: 'Insights', icon: <Lightbulb size={18} /> },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const pageMeta = {
    dashboard: { kicker: 'Executive dashboard', title: 'Premium Finance Dashboard' },
    overview: { kicker: 'Overview module', title: 'Financial Overview' },
    transactions: { kicker: 'Transactions module', title: 'Transactions Management' },
    insights: { kicker: 'Insights module', title: 'Financial Insights' },
  };

  return (
    <div className="app-shell">
      <div className={`mobile-overlay ${showSidebar ? 'show' : ''}`} onClick={() => setShowSidebar(false)} />

      <aside className={`sidebar ${showSidebar ? 'show' : ''}`}>
        <button className="brand-row brand-button" onClick={() => { setCurrentPage('dashboard'); setShowSidebar(false); }}>
          <div className="brand-mark"><Wallet size={18} /></div>
          <div>
            <div className="brand-title">Zorvyn</div>
            <div className="brand-sub">Finance Dashboard UI</div>
            <div className="brand-sub">Developed by @JP_Jena</div>
          </div>
          <button className="mobile-close" onClick={() => setShowSidebar(false)}><X size={18} /></button>
        </button>

        <div className="nav-group">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => {
                setCurrentPage(item.id);
                setShowSidebar(false);
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              <ChevronRight size={16} className="nav-arrow" />
            </button>
          ))}
        </div>

        <div className="sidebar-block glass-soft">
          <div className="eyebrow">Role simulation</div>
          <div className="brand-sub">Developed by @JP_Jena</div>
          <label className="field-label">Selected role</label>
          <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Viewer</option>
            <option>Admin</option>
          </select>
          <div className="role-note"><ShieldCheck size={15} /> Viewer can view data, Admin can add, edit, and delete transactions.</div>
        </div>

        <div className="sidebar-block promo-block">
          <div className="eyebrow">Performance</div>
          <div className="promo-title">Savings rate {summary.savingsRate}%</div>
          <div className="promo-copy">Strong month so far. Keep large discretionary purchases under control for a healthier net balance.</div>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar glass-card">
          <div className="topbar-left">
            <button className="icon-btn mobile-only" onClick={() => setShowSidebar(true)}><Menu size={18} /></button>
            <div>
              <div className="page-kicker">{pageMeta[currentPage]?.kicker || 'Executive dashboard'}</div>
              <h1 className="page-title">{pageMeta[currentPage]?.title || 'Premium Finance Dashboard'}</h1>
            </div>
          </div>

          <div className="topbar-right">
            <div className="topbar-search-group">
              <div className="search-wrap">
                <Search size={16} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search transactions, category, date..."
                />
              </div>
              {hasActiveSearch && (
                <div className={`search-status ${searchResultCount > 0 ? 'found' : 'not-found'}`}>
                  {searchStatus}
                </div>
              )}
            </div>
            <button className="icon-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button className="icon-btn"><Bell size={17} /></button>
          </div>
        </header>


        {currentPage === 'dashboard' && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="page-grid">
            <div className="stats-grid">
              <StatCard icon={<Wallet size={18} />} label="Net Balance" value={currency(summary.balance)} sub="Current available funds" glow="glow-violet" />
              <StatCard icon={<ArrowUpRight size={18} />} label="Income" value={currency(summary.income)} sub="All credited amounts" glow="glow-emerald" />
              <StatCard icon={<ArrowDownRight size={18} />} label="Expenses" value={currency(summary.expense)} sub="All outgoing payments" glow="glow-rose" />
              <StatCard icon={<BadgeIndianRupee size={18} />} label="Savings Rate" value={`${summary.savingsRate}%`} sub="Retained from total income" glow="glow-amber" />
            </div>

            <div className="charts-layout">
              <SectionCard title="Balance trend" subtitle="Income and expense movement across recent months">
                <div className="chart-box large">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MONTHLY_TREND}>
                      <defs>
                        <linearGradient id="incomeFillDash" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.38} />
                          <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="expenseFillDash" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef5da8" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#ef5da8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)" />
                      <XAxis dataKey="month" stroke="var(--muted)" />
                      <YAxis stroke="var(--muted)" />
                      <Tooltip {...tooltipProps} />
                      <Legend />
                      <Area type="monotone" dataKey="income" stroke="#2dd4bf" fill="url(#incomeFillDash)" strokeWidth={3} />
                      <Area type="monotone" dataKey="expense" stroke="#ef5da8" fill="url(#expenseFillDash)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </SectionCard>

              <SectionCard title="Spending breakdown" subtitle="Distribution by expense category">
                <div className="chart-box medium">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={72} outerRadius={112} paddingAngle={4}>
                        {categoryData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip {...tooltipProps} formatter={(value) => currency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="legend-pills">
                  {categoryData.map((item) => (
                    <span className="legend-pill" key={item.name}>
                      <i style={{ background: item.color }} /> {item.name}
                    </span>
                  ))}
                </div>
              </SectionCard>
            </div>

            <div className="dashboard-lower">
              <SectionCard
                title="Recent transactions"
                subtitle="A quick view from the latest activity"
                action={<button className="ghost-btn" onClick={() => setCurrentPage('transactions')}>Open module</button>}
              >
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th><th>Date</th><th>Category</th><th>Type</th><th className="align-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.slice(0,5).map((item) => (
                        <tr key={item.id}>
                          <td><div className="td-title">{item.title}</div></td>
                          <td>{item.date}</td>
                          <td>{item.category}</td>
                          <td><span className={chip(item.type)}>{item.type}</span></td>
                          <td className={`align-right amount ${item.type === 'income' ? 'pos' : 'neg'}`}>{item.type === 'income' ? '+' : '-'}{currency(item.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SectionCard>

              <SectionCard
                title="Insights snapshot"
                subtitle="Key highlights from this month"
                action={<button className="ghost-btn" onClick={() => setCurrentPage('insights')}>Open module</button>}
              >
                <div className="snapshot-grid">
                  {insights.map((item) => (
                    <div key={item.title} className="snapshot-card">
                      <div className="snapshot-label">{item.title}</div>
                      <div className="snapshot-value">{item.value}</div>
                      <p>{item.note}</p>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>

            <footer className="site-footer">
              <div className="footer-top">
                <div>
                  <div className="footer-brand">New customer? Start here.</div>
                  <p>Explore Zorvyn modules for overview, transactions, and insights in one smooth workspace.</p>
                  <div className="brand-sub">Developed by @JP_Jena</div>
                </div>
                <button className="ghost-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top</button>
              </div>
              <div className="footer-links">
                <div>
                  <h4>Platform</h4>
                  <a>Overview dashboard</a>
                  <a>Transactions control</a>
                  <a>Insights reporting</a>
                </div>
                <div>
                  <h4>Company</h4>
                  <a>About Zorvyn</a>
                  <a>Careers</a>
                  <a>Press</a>
                </div>
                <div>
                  <h4>Support</h4>
                  <a>Help center</a>
                  <a>Privacy</a>
                  <a>Terms</a>
                </div>
              </div>
            </footer>
          </motion.div>
        )}

        {currentPage === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="page-grid">
            <div className="stats-grid">
              <StatCard icon={<Wallet size={18} />} label="Net Balance" value={currency(summary.balance)} sub="Current available funds" glow="glow-violet" />
              <StatCard icon={<ArrowUpRight size={18} />} label="Income" value={currency(summary.income)} sub="All credited amounts" glow="glow-emerald" />
              <StatCard icon={<ArrowDownRight size={18} />} label="Expenses" value={currency(summary.expense)} sub="All outgoing payments" glow="glow-rose" />
              <StatCard icon={<BadgeIndianRupee size={18} />} label="Savings Rate" value={`${summary.savingsRate}%`} sub="Retained from total income" glow="glow-amber" />
            </div>

            <div className="charts-layout">
              <SectionCard title="Balance trend" subtitle="Income and expense movement across recent months">
                <div className="chart-box large">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={MONTHLY_TREND}>
                      <defs>
                        <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.38} />
                          <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="expenseFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef5da8" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#ef5da8" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)" />
                      <XAxis dataKey="month" stroke="var(--muted)" />
                      <YAxis stroke="var(--muted)" />
                      <Tooltip {...tooltipProps} />
                      <Legend />
                      <Area type="monotone" dataKey="income" stroke="#2dd4bf" fill="url(#incomeFill)" strokeWidth={3} />
                      <Area type="monotone" dataKey="expense" stroke="#ef5da8" fill="url(#expenseFill)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </SectionCard>

              <SectionCard title="Spending breakdown" subtitle="Distribution by expense category">
                <div className="chart-box medium">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={72} outerRadius={112} paddingAngle={4}>
                        {categoryData.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip {...tooltipProps} formatter={(value) => currency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="legend-pills">
                  {categoryData.map((item) => (
                    <span className="legend-pill" key={item.name}>
                      <i style={{ background: item.color }} /> {item.name}
                    </span>
                  ))}
                </div>
              </SectionCard>
            </div>
          </motion.div>
        )}

        {currentPage === 'transactions' && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="page-grid">
            <SectionCard
              title="Transactions management"
              subtitle="Search, filter, sort, and maintain transaction records"
              action={
                <div className="table-actions">
                  <div className="mini-select"><Filter size={14} />
                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                      <option value="all">All</option>
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                  <div className="mini-select">
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                      <option value="latest">Latest</option>
                      <option value="oldest">Oldest</option>
                      <option value="highest">Highest amount</option>
                      <option value="lowest">Lowest amount</option>
                      <option value="name">Name</option>
                    </select>
                  </div>
                  {role === 'Admin' && (
                    <button className="primary-btn" onClick={openAddModal}><Plus size={16} /> Add transaction</button>
                  )}
                </div>
              }
            >
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th className="align-right">Amount</th>
                      <th className="align-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="empty-cell">{hasActiveSearch ? 'Not found' : 'No transactions match your filters'}</td>
                      </tr>
                    ) : filteredTransactions.map((item) => (
                      <motion.tr key={item.id} layout>
                        <td>
                          <div className="td-title">{item.title}</div>
                        </td>
                        <td>{item.date}</td>
                        <td>{item.category}</td>
                        <td><span className={chip(item.type)}>{item.type}</span></td>
                        <td>{item.status}</td>
                        <td className={`align-right amount ${item.type === 'income' ? 'pos' : 'neg'}`}>{item.type === 'income' ? '+' : '-'}{currency(item.amount)}</td>
                        <td className="align-right">
                          <div className="action-row">
                            <button className="icon-btn small" onClick={() => openEditModal(item)} disabled={role !== 'Admin'}><Pencil size={15} /></button>
                            <button className="icon-btn small danger" onClick={() => removeTransaction(item.id)} disabled={role !== 'Admin'}><Trash2 size={15} /></button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>
          </motion.div>
        )}

        {currentPage === 'insights' && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="page-grid insights-grid">
            <div className="insight-cards">
              {insights.map((item) => (
                <motion.div key={item.title} className="insight-card" whileHover={{ y: -4 }}>
                  <div className="insight-top">
                    <span className="insight-icon">{item.icon}</span>
                    <span className="eyebrow">{item.title}</span>
                  </div>
                  <div className="insight-value">{item.value}</div>
                  <p>{item.note}</p>
                </motion.div>
              ))}
            </div>

            <SectionCard title="Monthly comparison" subtitle="Quick savings comparison for leadership review">
              <div className="chart-box medium">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { month: 'Last Month', saved: 46300 },
                    { month: 'This Month', saved: summary.balance },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--grid)" />
                    <XAxis dataKey="month" stroke="var(--muted)" />
                    <YAxis stroke="var(--muted)" />
                    <Tooltip {...tooltipProps} formatter={(value) => currency(value)} />
                    <Bar dataKey="saved" fill="#7c5cff" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </SectionCard>
          </motion.div>
        )}
      </main>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="modal-head">
            <div>
              <h3>{editing ? 'Edit transaction' : 'Add new transaction'}</h3>
              <p>{editing ? 'Update the selected transaction details.' : 'Create a new income or expense record.'}</p>
            </div>
            <button className="icon-btn" onClick={() => setShowModal(false)}><X size={16} /></button>
          </div>
          <form className="form-grid" onSubmit={saveTransaction}>
            <label>
              <span>Title</span>
              <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </label>
            <label>
              <span>Date</span>
              <input className="input" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
            </label>
            <label>
              <span>Amount</span>
              <input className="input" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} required />
            </label>
            <label>
              <span>Category</span>
              <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option>Income</option>
                <option>Housing</option>
                <option>Food</option>
                <option>Shopping</option>
                <option>Utilities</option>
                <option>Investment</option>
                <option>Travel</option>
                <option>Entertainment</option>
                <option>Transport</option>
              </select>
            </label>
            <label>
              <span>Type</span>
              <select className="input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value, category: e.target.value === 'income' ? 'Income' : form.category === 'Income' ? 'Shopping' : form.category })}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </label>
            <label>
              <span>Status</span>
              <select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option>Completed</option>
                <option>Pending</option>
              </select>
            </label>
            <div className="form-actions">
              <button type="button" className="ghost-btn" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit" className="primary-btn">{editing ? 'Save changes' : 'Add transaction'}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
