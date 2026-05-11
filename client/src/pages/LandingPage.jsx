import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const features = [
  {
    icon: "📊",
    title: "Real-Time Overview",
    desc: "Instant visibility into your income and expenses with a clean, data-rich dashboard.",
  },
  {
    icon: "🔐",
    title: "Bank-Grade Security",
    desc: "JWT authentication with httpOnly cookies ensures your financial data stays private.",
  },
  {
    icon: "📂",
    title: "Smart Categories",
    desc: "Organize transactions by category — salary, rent, food, freelance and more.",
  },
  {
    icon: "📈",
    title: "Visual Analytics",
    desc: "Understand your spending patterns at a glance with beautiful interactive charts.",
  },
  {
    icon: "⚡",
    title: "Fast & Reliable",
    desc: "Built on Node.js and PostgreSQL for speed, reliability and data integrity.",
  },
  {
    icon: "📱",
    title: "Fully Responsive",
    desc: "Works seamlessly across desktop, tablet and mobile devices.",
  },
];

const stats = [
  { value: "100%", label: "Free to use" },
  { value: "₹0", label: "Hidden fees" },
  { value: "24/7", label: "Access anywhere" },
  { value: "∞", label: "Transactions" },
];

const LandingPage = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.add("visible")),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

        .font-display { font-family: 'DM Serif Display', serif; }
        .font-body { font-family: 'DM Sans', sans-serif; }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        .reveal-delay-4 { transition-delay: 0.4s; }

        .grid-bg {
          background-image:
            linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        .glow {
          box-shadow: 0 0 80px -20px rgba(16,185,129,0.3);
        }

        .feature-card:hover {
          border-color: rgba(16,185,129,0.3);
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }

        .hero-badge {
          animation: pulse-border 3s ease-in-out infinite;
        }

        @keyframes pulse-border {
          0%, 100% { border-color: rgba(16,185,129,0.3); }
          50% { border-color: rgba(16,185,129,0.7); }
        }

        .btn-primary:hover {
          box-shadow: 0 8px 30px -8px rgba(16,185,129,0.6);
          transform: translateY(-1px);
          transition: all 0.2s ease;
        }
      `}</style>

      {/* Navbar */}
      <nav className="font-body fixed top-0 left-0 right-0 z-50 border-b border-slate-800/80 backdrop-blur-md bg-slate-950/80">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">₹</span>
            </div>
            <span className="font-semibold text-white tracking-tight">
              ExpenseTracker
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-slate-400 hover:text-white transition-colors px-4 py-2"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="btn-primary text-sm bg-emerald-500 hover:bg-emerald-400 text-white font-medium px-5 py-2 rounded-xl transition-colors"
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="grid-bg relative pt-36 pb-24 px-6">
        {/* Glow orb */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/5 rounded-full px-4 py-1.5 mb-8">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="font-body text-emerald-400 text-xs font-medium tracking-wide">
              Smart Financial Management
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6">
            Take control of
            <br />
            <span className="italic text-emerald-400">your finances.</span>
          </h1>

          {/* Subheadline */}
          <p className="font-body text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            ExpenseTracker helps you monitor income, track expenses, and
            understand your spending patterns — all in one secure, beautiful
            platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="btn-primary w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-white font-body font-semibold px-8 py-3.5 rounded-xl text-sm transition-colors glow"
            >
              Start tracking for free →
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-white font-body px-8 py-3.5 rounded-xl text-sm transition-colors"
            >
              Sign in to your account
            </Link>
          </div>

          {/* Trust line */}
          <p className="font-body text-slate-600 text-xs mt-6">
            No credit card required · Free forever · Secure by default
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-slate-800 bg-slate-900/40 py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <p className="font-display text-3xl text-emerald-400 mb-1">
                {stat.value}
              </p>
              <p className="font-body text-slate-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="font-body text-emerald-400 text-sm font-medium tracking-widest uppercase mb-3">
              Everything you need
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-white mb-4">
              Built for real
              <span className="italic"> financial clarity</span>
            </h2>
            <p className="font-body text-slate-400 max-w-xl mx-auto">
              Every feature is designed to give you a clearer picture of where
              your money goes and how to make it work harder.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className={`feature-card reveal reveal-delay-${(i % 3) + 1} bg-slate-900 border border-slate-800 rounded-2xl p-6 cursor-default`}
              >
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-xl mb-4">
                  {f.icon}
                </div>
                <h3 className="font-body font-semibold text-white mb-2">
                  {f.title}
                </h3>
                <p className="font-body text-slate-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-slate-900/40 border-y border-slate-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="font-body text-emerald-400 text-sm font-medium tracking-widest uppercase mb-3">
              Simple by design
            </p>
            <h2 className="font-display text-4xl sm:text-5xl text-white">
              Up and running
              <span className="italic"> in minutes</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create your account",
                desc: "Sign up for free in seconds. No credit card, no hidden fees.",
              },
              {
                step: "02",
                title: "Add your transactions",
                desc: "Log income and expenses by category. Import as many as you need.",
              },
              {
                step: "03",
                title: "Gain clarity",
                desc: "See your balance, trends, and spending patterns on your dashboard.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${i + 1} text-center`}
              >
                <div className="font-display text-5xl text-emerald-500/20 mb-4">
                  {s.step}
                </div>
                <h3 className="font-body font-semibold text-white mb-2">
                  {s.title}
                </h3>
                <p className="font-body text-slate-400 text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center reveal">
          <div className="bg-linear-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-emerald-500/5 rounded-3xl" />
            <div className="relative">
              <h2 className="font-display text-4xl sm:text-5xl text-white mb-4">
                Ready to take
                <span className="italic text-emerald-400"> control?</span>
              </h2>
              <p className="font-body text-slate-400 mb-8 max-w-md mx-auto">
                Join thousands of people who track their finances smarter with
                ExpenseTracker.
              </p>
              <Link
                to="/register"
                className="btn-primary inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-body font-semibold px-10 py-4 rounded-xl text-sm transition-colors glow"
              >
                Get started for free →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">₹</span>
            </div>
            <span className="font-body text-slate-400 text-sm">
              ExpenseTracker
            </span>
          </div>
          <p className="font-body text-slate-600 text-xs">
            Built with React, Node.js & PostgreSQL
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="font-body text-slate-500 hover:text-slate-300 text-xs transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="font-body text-slate-500 hover:text-slate-300 text-xs transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
