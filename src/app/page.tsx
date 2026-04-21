"use client";

import { useEffect, useRef, useState } from "react";
import { 
  Sword, 
  Wand2, 
  Axe, 
  Flame, 
  Snowflake, 
  Zap, 
  MapPin, 
  Gamepad2, 
  UserPlus, 
} from "lucide-react";
import Image from "next/image";

// Cambiamos 'emoji' por 'Icon'
const players = [
  { name: "ShadowNinja", rank: "Inmortal", match: 95, games: ["Valorant", "CS:GO"], style: ["Competitivo", "Estratégico"], Icon: Sword, color: "#FF6B00" },
  { name: "MysticMage", rank: "Oro", match: 88, games: ["League of Legends", "Dota 2"], style: ["Casual", "Amigable"], Icon: Wand2, color: "#00C2E0" },
  { name: "DragonSlayer", rank: "Diamante", match: 92, games: ["Valorant", "Rainbow Six"], style: ["Competitivo", "Serio"], Icon: Axe, color: "#FF6B00" },
  { name: "PhoenixRising", rank: "Platino", match: 85, games: ["LoL", "TFT"], style: ["Competitivo", "Flexible"], Icon: Flame, color: "#00C2E0" },
  { name: "IceQueen", rank: "Plata", match: 78, games: ["Valorant", "Overwatch 2"], style: ["Casual", "Divertido"], Icon: Snowflake, color: "#FF6B00" },
  { name: "ThunderStrike", rank: "Diamante", match: 90, games: ["Apex", "Warzone"], style: ["Agresivo", "Rápido"], Icon: Zap, color: "#00C2E0" },
];

const features = [
  {
    Icon: MapPin,
    title: "Jugadores Cercanos",
    desc: "Conecta con gamers de tu ciudad o región.",
    accent: "#00C2E0",
  },
  {
    Icon: Gamepad2,
    title: "Multi-Plataforma",
    desc: "PC, consola o móvil. Valorant, LoL, FIFA, Fortnite. Una sola plataforma para encontrar tu squad en cualquier juego.",
    accent: "#FF6B00",
  }
];

const steps = [
  { num: "01", title: "Crea tu perfil", desc: "Agrega tus juegos favoritos, horarios y estilo de juego en menos de 2 minutos.", Icon: UserPlus },
  { num: "02", title: "Recibe matches", desc: "Encuentra los mejores compañeros según compatibilidad real.", Icon: Zap },
  { num: "03", title: "¡A jugar!", desc: "Acepta el match, coordina e intercambia discord. Así de simple.", Icon: Gamepad2 },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function MatchHubLanding() {
  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <a href="#" className="nav-logo">
          <Image src="/mathub.png" alt="MatchHub" className="logo-img" width={40} height={40} />
        </a>
      
        <a href="#cta" className="nav-cta">Empezar gratis</a>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div>
            <h1>
              Tu squad ideal<br />
              está <span className="accent-orange">cerca</span> de<br />
              <span className="accent-cyan">ti</span>
            </h1>
            <p className="hero-sub">
              MatchHub conecta jugadores compatibles en tiempo real. Algoritmo inteligente, jugadores cercanos, cero buscar en Discord.
            </p>
            <div className="hero-actions">
              <a href="#cta" className="btn-primary">Crear mi perfil</a>
              <a href="#como" className="btn-secondary">Ver cómo funciona →</a>
            </div>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num"><AnimatedCounter target={48000} suffix="+" /></div>
                <div className="hero-stat-label">Jugadores activos</div>
              </div>
              <div>
                <div className="hero-stat-num cyan"><AnimatedCounter target={25} suffix="+" /></div>
                <div className="hero-stat-label">Juegos disponibles</div>
              </div>
              <div>
                <div className="hero-stat-num"><AnimatedCounter target={94} suffix="%" /></div>
                <div className="hero-stat-label">Satisfacción</div>
              </div>
            </div>
          </div>

          {/* HERO MOCKUP */}
          <div className="hero-visual">
            <div style={{ position: "relative", padding: "24px" }}>
              <div className="mockup-card">
                <div className="mockup-header">
                  <span className="mockup-title">Matches para ti</span>
                  <span className="match-badge">EN VIVO</span>
                </div>
                <div className="mockup-players">
                  {players.slice(0, 4).map((p, i) => (
                    <div key={i} className="mini-player">
                      <div className="mini-avatar" style={{ background: `${p.color}18`, color: p.color }}>
                        <p.Icon size={18} />
                      </div>
                      <div className="mini-info">
                        <div className="mini-name">{p.name}</div>
                        <div className="mini-rank">{p.rank} · {p.games[0]}</div>
                        <div className="mini-bar">
                          <div className="mini-fill" style={{ width: `${p.match}%`, background: p.color }} />
                        </div>
                      </div>
                      <div className="mini-match" style={{ color: p.color }}>{p.match}%</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="badge-float badge-online">
                <div className="dot-online" />
                <span style={{ fontSize: 12, fontWeight: 700 }}>2,341 online ahora</span>
              </div>
              <div className="badge-float badge-match">
                <div className="dot-match" />
                <span style={{ fontSize: 12, fontWeight: 700 }}>⚡ Match en 8 seg.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-bg" id="features">
        <div className="container">
          <div className="section-label">Características</div>
          <h2>Diseñado para<br /><span style={{ color: "var(--orange)" }}>ganar juntos</span></h2>
          <p className="section-sub">No más teamkills por incompatibilidad. Cada match está construido sobre datos reales.</p>
          <div className="features-grid">
            {features.map((f, i) => (
              <div
                key={i}
                className="feature-card"
                style={{ ["--card-accent" as string]: f.accent } as React.CSSProperties}
              >
                <div className="feature-icon" style={{ background: `${f.accent}18`, color: f.accent }}>
                  <f.Icon size={26} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="como">
        <div className="container">
          <div className="section-label">Proceso</div>
          <h2>Simple como<br /><span style={{ color: "var(--cyan)" }}>presionar Play</span></h2>
          <p className="section-sub">Tres pasos para tener tu compañero de juego perfecto.</p>
          <div className="steps">
            {steps.map((s, i) => (
              <div key={i} className="step">
                <div className="step-num-wrap text-white">
                  <s.Icon size={32} />
                  <div className="step-badge">{s.num}</div>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <a href="#" className="nav-logo" style={{ textDecoration: "none" }}>
          <Image src="/mathub.png" alt="MatchHub" width={28} height={28} style={{ objectFit: "contain" }} />
          <span className="logo-text" style={{ fontSize: 16, marginLeft: 8 }}>Match<span>Hub</span></span>
        </a>
        <span>© 2026 MatchHub. Hecho para gamers.</span>
      </footer>
    </>
  );
}