'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import Navigation from '@/components/Navigation';
import { ArrowLeft, Copy, Check, Terminal, ArrowRight } from 'lucide-react';

const INSTALL_COMMANDS: Record<string, string> = {
  npm: 'npm install -g @donate-protocol/cli',
  pnpm: 'pnpm add -g @donate-protocol/cli',
  yarn: 'yarn global add @donate-protocol/cli',
  bun: 'bun add -g @donate-protocol/cli',
};

function TerminalBlock({
  title,
  lines,
  copyText,
}: {
  title?: string;
  lines: { prompt?: boolean; text: string; type?: 'cmd' | 'out' | 'success' | 'comment' }[];
  copyText?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    if (!copyText) return;
    navigator.clipboard.writeText(copyText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 my-6">
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700">
        <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
        {title && <span className="ml-2 text-slate-500 text-xs font-mono">{title}</span>}
        {copyText && (
          <button
            onClick={copy}
            aria-label="Copy code block"
            className="ml-auto flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-xs font-mono"
          >
            {copied ? (
              <><Check className="w-3.5 h-3.5 text-green-400" /><span className="text-green-400">Copied!</span></>
            ) : (
              <><Copy className="w-3.5 h-3.5" />Copy</>
            )}
          </button>
        )}
      </div>
      <div className="p-5 font-mono text-sm space-y-1.5">
        {lines.map((line, i) => {
          if (line.type === 'success') {
            return <div key={i} className="text-green-400 text-xs">{line.text}</div>;
          }
          if (line.type === 'out') {
            return <div key={i} className="text-slate-400 text-xs">{line.text}</div>;
          }
          if (line.type === 'comment') {
            return <div key={i} className="text-slate-500 text-xs">{line.text}</div>;
          }
          return (
            <div key={i} className="flex gap-2">
              {line.prompt !== false && <span className="text-brand-accent select-none">$</span>}
              <span className="text-slate-100">{line.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-20 scroll-mt-28">
      {children}
    </section>
  );
}

const DONATERC = `{
  "exchange": "binance",
  "apiKey": "YOUR_READ_ONLY_KEY",
  "apiSecret": "YOUR_READ_ONLY_SECRET",
  "rules": [
    { "type": "round-up", "cause": "climate" },
    { "type": "percentage", "rate": 0.1, "cause": "education" }
  ],
  "causes": ["climate", "education", "health"],
  "notify": true
}`;

export default function CliQuickStart() {
  const [activePm, setActivePm] = useState('npm');
  const [installCopied, setInstallCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText(INSTALL_COMMANDS[activePm]).then(() => {
      setInstallCopied(true);
      setTimeout(() => setInstallCopied(false), 2000);
    });
  };

  return (
    <>
      <Navigation />

      <main className="pt-32 pb-20 min-h-screen">
        {/* Decorative blobs */}
        <div className="fixed top-1/4 -left-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">

          {/* Back link */}
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-primary transition-colors text-sm font-semibold mb-10">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/20 px-4 py-1.5 rounded-full mb-6">
              <Terminal className="w-3.5 h-3.5 text-brand-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">CLI Reference</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight">
              CLI Quick Start
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl leading-relaxed">
              Everything you need to install, configure, and run Donate Protocol from your terminal in under 2 minutes.
            </p>
          </motion.div>

          {/* Table of Contents */}
          <div className="glass-card rounded-2xl p-8 mb-20">
            <h2 className="font-bold text-lg mb-4">Contents</h2>
            <ol className="space-y-2 text-sm text-slate-500">
              {[
                ['#installation', 'Installation'],
                ['#init', 'donate init — initialize config'],
                ['#connect', 'donate connect — link your exchange'],
                ['#config', 'donate config — choose causes & rate'],
                ['#run', 'donate run — start watching trades'],
                ['#env', 'Environment variables & .donaterc'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="hover:text-brand-primary transition-colors font-semibold">{label}</a>
                </li>
              ))}
            </ol>
          </div>

          {/* Installation */}
          <Section id="installation">
            <h2 className="font-display text-3xl font-bold mb-4">Installation</h2>
            <p className="text-slate-500 mb-4 leading-relaxed">
              Install the <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-sm">@donate-protocol/cli</code> package globally with your preferred package manager.
            </p>

            {/* PM tabs */}
            <div className="flex gap-2 mb-3">
              {['npm', 'pnpm', 'yarn', 'bun'].map(pm => (
                <button
                  key={pm}
                  onClick={() => setActivePm(pm)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${activePm === pm ? 'bg-brand-primary text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                >
                  {pm}
                </button>
              ))}
            </div>

            <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-xl border border-slate-700/50">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                <span className="ml-2 text-slate-500 text-xs font-mono">terminal</span>
                <button
                  onClick={copyInstall}
                  aria-label="Copy install command"
                  className="ml-auto flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-xs font-mono"
                >
                  {installCopied ? (
                    <><Check className="w-3.5 h-3.5 text-green-400" /><span className="text-green-400">Copied!</span></>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" />Copy</>
                  )}
                </button>
              </div>
              <div className="p-5 font-mono text-sm">
                <div className="flex gap-2">
                  <span className="text-brand-accent select-none">$</span>
                  <span className="text-slate-100 break-all">{INSTALL_COMMANDS[activePm]}</span>
                </div>
                <div className="mt-3 text-green-400 text-xs">✓ @donate-protocol/cli installed successfully</div>
              </div>
            </div>

            <p className="text-slate-500 mt-4 text-sm">
              Requires Node.js 18+ LTS. Verify the installation: <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">donate --version</code>
            </p>
          </Section>

          {/* donate init */}
          <Section id="init">
            <h2 className="font-display text-3xl font-bold mb-4"><code className="font-mono">donate init</code></h2>
            <p className="text-slate-500 mb-2 leading-relaxed">
              Scaffolds a <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">.donaterc</code> config file in the current directory and walks you through an interactive setup.
            </p>
            <TerminalBlock
              title="terminal"
              copyText="donate init"
              lines={[
                { text: 'donate init' },
                { prompt: false, text: '', type: 'out' },
                { prompt: false, text: '  ✦ Donate Protocol v1.0.0', type: 'out' },
                { prompt: false, text: '  ? Choose your primary exchange: › Binance', type: 'out' },
                { prompt: false, text: '  ? Donation rate: › 0.1%', type: 'out' },
                { prompt: false, text: '  ? Select causes: › Climate, Education', type: 'out' },
                { prompt: false, text: '  ✓ .donaterc created', type: 'success' },
              ]}
            />
          </Section>

          {/* donate connect */}
          <Section id="connect">
            <h2 className="font-display text-3xl font-bold mb-4"><code className="font-mono">donate connect</code></h2>
            <p className="text-slate-500 mb-2 leading-relaxed">
              Links your exchange account using a <strong>read-only</strong> API key. Donate Protocol never requests withdrawal or trading permissions.
            </p>
            <TerminalBlock
              title="terminal"
              copyText="donate connect --exchange binance"
              lines={[
                { text: 'donate connect --exchange binance' },
                { prompt: false, text: '  ? API Key: ••••••••••••', type: 'out' },
                { prompt: false, text: '  ? API Secret: ••••••••••••', type: 'out' },
                { prompt: false, text: '  ✓ Credentials encrypted and stored locally', type: 'success' },
                { prompt: false, text: '  ✓ Connected to Binance sandbox', type: 'success' },
              ]}
            />
            <div className="glass-card rounded-2xl p-6 text-sm text-slate-600 leading-relaxed">
              <strong className="text-brand-primary">Security note:</strong> Your API credentials are encrypted with AES-256 and stored only on your local machine in <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">~/.donate/credentials</code>. They are never transmitted to Donate Protocol servers.
            </div>
          </Section>

          {/* donate config */}
          <Section id="config">
            <h2 className="font-display text-3xl font-bold mb-4"><code className="font-mono">donate config</code></h2>
            <p className="text-slate-500 mb-2 leading-relaxed">
              Update your donation rules, rate, and causes at any time without re-initializing.
            </p>
            <TerminalBlock
              title="terminal"
              lines={[
                { text: 'donate config --rate 0.2% --cause climate,health' },
                { prompt: false, text: '  ✓ Config updated', type: 'success' },
                { text: 'donate config --list' },
                { prompt: false, text: '  exchange:  binance', type: 'out' },
                { prompt: false, text: '  rate:      0.2%', type: 'out' },
                { prompt: false, text: '  causes:    climate, health', type: 'out' },
              ]}
            />
          </Section>

          {/* donate run */}
          <Section id="run">
            <h2 className="font-display text-3xl font-bold mb-4"><code className="font-mono">donate run</code></h2>
            <p className="text-slate-500 mb-2 leading-relaxed">
              Starts the trade watcher. The process listens for new trades via the exchange&apos;s WebSocket feed and calculates micro-donations in real time.
            </p>
            <TerminalBlock
              title="terminal"
              copyText="donate run"
              lines={[
                { text: 'donate run' },
                { prompt: false, text: '  ✦ Donate Protocol — watching trades', type: 'out' },
                { prompt: false, text: '  ✓ Connected: Binance WebSocket', type: 'success' },
                { prompt: false, text: '  [12:04:02] BTC/USDT  $18,420 → $0.018 donated', type: 'out' },
                { prompt: false, text: '  [12:04:17] ETH/USDT  $1,240  → $0.012 donated', type: 'out' },
                { prompt: false, text: '  Running total: $0.030  |  Press Ctrl+C to stop', type: 'comment' },
              ]}
            />
          </Section>

          {/* Environment variables */}
          <Section id="env">
            <h2 className="font-display text-3xl font-bold mb-4">Environment Variables &amp; .donaterc</h2>
            <p className="text-slate-500 mb-4 leading-relaxed">
              All CLI options can be provided via environment variables or a <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">.donaterc</code> JSON file in your project root.
            </p>

            <h3 className="font-bold text-lg mb-3">Environment variables</h3>
            <TerminalBlock
              title=".env"
              lines={[
                { prompt: false, text: 'DONATE_EXCHANGE=binance', type: 'out' },
                { prompt: false, text: 'DONATE_API_KEY=your_read_only_key', type: 'out' },
                { prompt: false, text: 'DONATE_API_SECRET=your_read_only_secret', type: 'out' },
                { prompt: false, text: 'DONATE_RATE=0.1%', type: 'out' },
                { prompt: false, text: 'DONATE_CAUSES=climate,education', type: 'out' },
              ]}
            />

            <h3 className="font-bold text-lg mb-3 mt-8">.donaterc example</h3>
            <div className="bg-slate-950 rounded-2xl overflow-hidden shadow-xl border border-slate-700/50">
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                <span className="ml-2 text-slate-500 text-xs font-mono">.donaterc</span>
              </div>
              <pre className="p-5 font-mono text-sm text-slate-300 overflow-x-auto"><code>{DONATERC}</code></pre>
            </div>
          </Section>

          {/* Back to home CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-12 border-t border-slate-200">
            <Link href="/" className="flex items-center gap-2 font-bold text-slate-400 hover:text-brand-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/marcusmattus/donate_protocoll"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-xl border border-brand-dark/20 font-semibold hover:border-brand-dark/40 transition-all text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                View on GitHub
              </a>
              <Link href="/waitlist" className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-lg shadow-brand-primary/20 text-sm flex items-center gap-2">
                Join Waitlist
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-brand-primary rounded-md flex items-center justify-center text-white font-display font-bold text-xs">D</div>
            <span>Donate Protocol</span>
          </div>
          <p>© 2024 Donate Protocol. Building in public.</p>
          <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
        </div>
      </footer>
    </>
  );
}
