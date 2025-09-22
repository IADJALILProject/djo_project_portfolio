import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, Github, Linkedin, Download, ExternalLink, Briefcase, Database,
  Rocket, Filter, Phone, Moon, Sun, ArrowLeft, ArrowRight
} from "lucide-react";
import {
  FaPython, FaDatabase, FaCogs, FaNetworkWired, FaCloud, FaServer, FaDocker, FaAws
} from "react-icons/fa";
import {
  SiElasticsearch, SiPostgresql, SiMysql, SiMongodb, SiJenkins, SiPrometheus, SiGrafana,
  SiScikitlearn, SiTensorflow, SiPytorch, SiExpress, SiSocketdotio, SiApacheairflow,
  SiDocker, SiKubernetes, SiApachespark, SiApachekafka, SiFlask, SiTalend,
  SiDatabricks, SiKeras
} from "react-icons/si";

/* ─────────────────────────────────────────────────────────────
   Portfolio — Djalil Salah-Bey (Data / Analytics Engineer)
   ───────────────────────────────────────────────────────────── */

const DATA = {
  name: "Djalil Salah-Bey",
  title: "Ingénieur en science des données",
  location: "Marseille · Paris · Lille",
  email: "mailto:ad.salahbey@gmail.com",
  phone: "tel:+33611279153",
  github: "https://github.com/IADJALILProject",
  linkedin: "https://www.linkedin.com/in/djalil-salah-bey/",
  cvUrl: "/Djalil_Salah-Bey_CV_DataEngineer_FR.pdf",
  avatar: "/avatar.jpg",
};

const SECTION_ORDER = ["projects", "skills", "responsibilities", "experience", "education", "contact"];

/* ─────────────────────────────────────────────────────────────
   Styles
   ───────────────────────────────────────────────────────────── */
const BTN = "inline-flex items-center gap-2 rounded-full px-4 py-2 bg-black text-white hover:bg-zinc-800 transition";
const BTN_SM = "inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-black text-white hover:bg-zinc-800 transition text-sm";
const BTN_CHIP = "inline-flex items-center rounded-full px-3 py-1 text-sm bg-black text-white transition";

/* ─────────────────────────────────────────────────────────────
   Logos & fallback
   ───────────────────────────────────────────────────────────── */

function BrandLogo({ brand }) {
  const label = (brand || "Data").toUpperCase();
  return (
    <svg viewBox="0 0 400 140" className="w-full h-36">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="#e5e7eb" />
          <stop offset="1" stopColor="#f3f4f6" />
        </linearGradient>
      </defs>
      <rect width="400" height="140" fill="url(#g)" />
      <text
        x="50%" y="50%"
        dominantBaseline="middle" textAnchor="middle"
        fontFamily="Inter,system-ui" fontSize="28"
        fill="#111827" letterSpacing="1.5"
      >
        {label}
      </text>
    </svg>
  );
}

function BrandMark({ brand }) {
  const B = (brand || "").toLowerCase();
  const size = "h-16 w-16";
  const iconMap = {
    clickhouse: <FaDatabase className={size} />,
    dbt: <FaCogs className={size} />,
    talend: <SiTalend className={size} />,
    spark: <SiApachespark className={size} />,
    pyspark: <SiApachespark className={size} />,
    databricks: <SiDatabricks className={size} />,
    flask: <SiFlask className={size} />,
    n8n: <FaNetworkWired className={size} />,
    kafka: <SiApachekafka className={size} />,
    fraud: <FaDatabase className={size} />,
    keras: <SiKeras className={size} />,
    cloud: <FaCloud className={size} />,
  };
  const icon = iconMap[B];
  if (icon) return <div className="flex items-center justify-center h-36 bg-white">{icon}</div>;
  return <BrandLogo brand={brand} />;
}

function ImgWithFallback({ src, alt }) {
  const [ok, setOk] = useState(true);
  if (!src || !ok) return <BrandMark brand={alt} />;
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-36 object-contain"
      onError={() => setOk(false)}
      loading="lazy"
      decoding="async"
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   THEME / layout helpers
   ───────────────────────────────────────────────────────────── */

function Section({ id, title, icon, children }) {
  return (
    <section id={id} className="scroll-mt-20 max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-14">
      <div className="flex items-center gap-3 mb-8">
        {icon}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}
function Badge({ children }) {
  return <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm leading-6 mr-2 mb-2">{children}</span>;
}
function Card({ children }) {
  return (
    <div className="group rounded-2xl border p-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur transition shadow-sm hover:shadow-md hover:-translate-y-0.5">
      {children}
    </div>
  );
}
function Avatar({ src, name, className = "" }) {
  const [ok, setOk] = useState(true);
  const initials = useMemo(() => name.split(" ").map(w => w[0]).join(""), [name]);
  if (ok && src) {
    return (
      <img
        src={src}
        alt={name}
        className={"w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border shadow-inner " + className}
        onError={() => setOk(false)}
        loading="lazy"
        decoding="async"
      />
    );
  }
  return (
    <div className={"w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center border shadow-inner " + className}>
      <span className="text-4xl md:text-6xl font-semibold select-none">{initials}</span>
    </div>
  );
}

function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);
  return { dark, toggle: () => setDark((d) => !d) };
}

function Header({ activeId }) {
  const { dark, toggle } = useTheme();
  const linkCls = (id) =>
    "hover:opacity-70 " +
    (activeId === id ? "underline underline-offset-8 decoration-2" : "opacity-90");
  return (
    <>
      <a href="#projects" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-black focus:text-white focus:px-3 focus:py-1 focus:rounded">
        Aller au contenu
      </a>
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60 border-b">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="font-semibold tracking-tight">{DATA.name}</div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#projects" className={linkCls("projects")}>Projets</a>
            <a href="#skills" className={linkCls("skills")}>Compétences</a>
            <a href="#responsibilities" className={linkCls("responsibilities")}>Missions & Réalisations</a>
            <a href="#experience" className={linkCls("experience")}>Expériences</a>
            <a href="#education" className={linkCls("education")}>Formation</a>
            <a href="#contact" className={linkCls("contact")}>Contact</a>
            <a href={DATA.cvUrl} download className={BTN_SM} aria-label="Télécharger le CV">
              <Download className="h-4 w-4" /> CV
            </a>
            <button onClick={toggle} className={BTN_SM} aria-label="Basculer le thème">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />} Thème
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}

function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-50 to-transparent dark:from-zinc-950" />
      <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          <div>
            <div className="text-sm inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4">
              <Rocket className="h-4 w-4" /> Disponible pour CDI / Mission
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1] [text-wrap:balance]">
              {DATA.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#contact" className={BTN}>
                <Mail className="h-4 w-4" /> Me contacter
              </a>
              <a href={DATA.cvUrl} download className={BTN} aria-label="Télécharger le CV">
                <Download className="h-4 w-4" /> Télécharger le CV
              </a>
              <a href={DATA.github} target="_blank" rel="noreferrer" className={BTN} aria-label="Ouvrir GitHub">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a href={DATA.linkedin} target="_blank" rel="noreferrer" className={BTN} aria-label="Ouvrir LinkedIn">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>

            <div className="mt-6 flex flex-wrap">
              {["dbt","Airflow","ClickHouse","Python","SQL","Docker","Azure","Grafana"].map((b) => (<Badge key={b}>{b}</Badge>))}
            </div>
          </div>
          <div className="flex md:justify-end">
            <Avatar src={DATA.avatar} name={DATA.name} />
          </div>
        </motion.div>
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Projets — thèmes + visuels
   ───────────────────────────────────────────────────────────── */

const BRAND_THEME = {
  clickhouse: { bg: "from-yellow-200 via-amber-300 to-amber-600", tint: "bg-amber-500/20", ring: "ring-amber-400/30" },
  dbt:        { bg: "from-orange-200 via-orange-300 to-orange-600", tint: "bg-orange-500/20", ring: "ring-orange-400/30" },
  talend:     { bg: "from-indigo-200 via-indigo-300 to-indigo-600", tint: "bg-indigo-500/20", ring: "ring-indigo-400/30" },
  spark:      { bg: "from-amber-100 via-orange-200 to-orange-500", tint: "bg-orange-500/20", ring: "ring-orange-400/30" },
  databricks: { bg: "from-rose-100 via-rose-200 to-rose-600", tint: "bg-rose-500/20", ring: "ring-rose-400/30" },
  flask:      { bg: "from-emerald-100 via-emerald-200 to-emerald-600", tint: "bg-emerald-500/20", ring: "ring-emerald-400/30" },
  n8n:        { bg: "from-pink-100 via-pink-200 to-pink-600", tint: "bg-pink-500/20", ring: "ring-pink-400/30" },
  kafka:      { bg: "from-zinc-100 via-zinc-200 to-zinc-700", tint: "bg-zinc-500/20", ring: "ring-zinc-400/30" },
  cloud:      { bg: "from-sky-100 via-sky-200 to-sky-600", tint: "bg-sky-500/20", ring: "ring-sky-400/30" },
  fraud:      { bg: "from-violet-100 via-fuchsia-200 to-fuchsia-600", tint: "bg-fuchsia-500/20", ring: "ring-fuchsia-400/30" },
  keras:      { bg: "from-red-100 via-red-200 to-red-600", tint: "bg-red-500/20", ring: "ring-red-400/30" },
  generic:    { bg: "from-zinc-100 via-zinc-200 to-zinc-500", tint: "bg-zinc-500/10", ring: "ring-zinc-400/20" },
};

const TAG_ICON_MAP = {
  airflow: <SiApacheairflow className="h-4 w-4" />,
  docker: <SiDocker className="h-4 w-4" />,
  kubernetes: <SiKubernetes className="h-4 w-4" />,
  grafana: <SiGrafana className="h-4 w-4" />,
  prometheus: <SiPrometheus className="h-4 w-4" />,
  kafka: <SiApachekafka className="h-4 w-4" />,
  spark: <SiApachespark className="h-4 w-4" />,
  "delta lake": <FaDatabase className="h-4 w-4" />,
  dbt: <FaCogs className="h-4 w-4" />,
  clickhouse: <FaDatabase className="h-4 w-4" />,
  flask: <SiFlask className="h-4 w-4" />,
  terraform: <FaServer className="h-4 w-4" />,
  python: <FaPython className="h-4 w-4" />,
  sql: <FaDatabase className="h-4 w-4" />,
  bi: <FaDatabase className="h-4 w-4" />,
};

function ProjectPoster({ brand, tags, image }) {
  const key = (brand || "generic").toLowerCase();
  const theme = BRAND_THEME[key] || BRAND_THEME.generic;
  if (image) return <ImgWithFallback src={image} alt={brand || "project"} />;
  const topTags = (tags || []).slice(0, 5);
  return (
    <div className={`relative h-44 md:h-48 bg-gradient-to-br ${theme.bg} rounded-xl ring-1 ${theme.ring} overflow-hidden`}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0%, rgba(255,255,255,.6) 0, transparent 40%), radial-gradient(circle at 80% 120%, rgba(255,255,255,.4) 0, transparent 60%)",
        }}
      />
      <div className="absolute top-3 left-3 inline-flex items-center gap-2">
        <div className={`inline-flex items-center justify-center rounded-full ${theme.tint} backdrop-blur px-2.5 py-1 text-xs font-medium`}>
          {brand}
        </div>
      </div>
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-2">
        {topTags.map((t, i) => {
          const k = (t || "").toLowerCase();
          const icon = TAG_ICON_MAP[k] || TAG_ICON_MAP[k.split(" ")[0]] || null;
          return (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-full bg-white/80 backdrop-blur px-2 py-0.5 text-xs border"
            >
              {icon}
              {t}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   KPI compacts + Onglets (affichage conditionnel)
   ───────────────────────────────────────────────────────────── */

function StatPill({ title, value, sub }) {
  return (
    <div className="flex flex-col items-start rounded-xl border px-3 py-2 bg-white/70 dark:bg-zinc-900/60">
      <div className="text-[10px] uppercase tracking-wide opacity-70">{title}</div>
      <div className="text-base font-semibold leading-5">{value}</div>
      {sub ? <div className="text-[10px] opacity-70 mt-0.5">{sub}</div> : null}
    </div>
  );
}

function StatStrip({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
      {items.map((k, i) => (
        <StatPill key={i} title={k.label} value={k.value} sub={k.sub} />
      ))}
    </div>
  );
}

function KPIGrid({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
      {items.map((k, i) => (
        <div key={i} className="rounded-2xl border p-4 bg-white/70 dark:bg-zinc-900/60">
          <div className="text-xs uppercase tracking-wide opacity-70">{k.label}</div>
          <div className="text-xl font-semibold">{k.value}</div>
          <div className="text-xs opacity-70 mt-1">{k.sub}</div>
        </div>
      ))}
    </div>
  );
}

function ArchitectureTabs({ variant = "generic" }) {
  const [tab, setTab] = useState("overview");
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "architecture", label: "Architecture" },
    { id: "benchmarks", label: "Benchmarks" },
    { id: "demo", label: "Demo & Repos" }
  ];

  const lists = {
    heatmap: {
      overview: [
        "Domaine batteries (SOC, température, courant) — client → asset → rack → module.",
        "Staging → étoile (dimensions/faits) → marts ClickHouse (heatmaps/KPI).",
        "Qualité : dbt tests, Great Expectations, freshness checks."
      ],
      architecture: [
        "Ingestion Python → Azure Blob (Bronze) — idempotence, retries, logs.",
        "Transformations dbt — SCD, incrémental, docs, lineage.",
        "Entrepôt ClickHouse — MergeTree, ORDER BY, partitions, vues matérialisées.",
        "Serving Streamlit/Power BI ; orchestration Airflow ; observabilité Grafana."
      ],
      benchmarks: [
        "Requêtes heatmap p95 < 500 ms (40M lignes, warm cache).",
        "Incrémental dbt 3× plus rapide que full refresh.",
        "Pruning partitions & TTL → coût stockage ↓."
      ],
      demo: [
        "Streamlit : filtres hiérarchiques, KPI, heatmaps.",
        "README : `docker compose up -d` + `dbt build`.",
        "CI : `dbt test` + GE ; GitHub Actions."
      ]
    },
    dbt: {
      overview: [
        "Modèle ventes en étoile : facts + dimensions, snapshots SCD.",
        "Documentation & lineage pour accélérer l’onboarding."
      ],
      architecture: [
        "Sources → staging → marts dbt.",
        "Airflow : DAGs, backfills contrôlés, SLA."
      ],
      benchmarks: [
        "Build complet < 8 min (démos).",
        "Tests dbt > 95% passent (démos)."
      ],
      demo: [
        "Commande : `dbt build` ; `dbt docs serve`.",
        "Repo: dbt_sales."
      ]
    },
    spark: {
      overview: [
        "Batch + streaming temps réel via Kafka.",
        "Delta Lake : MERGE/OPTIMIZE, time travel."
      ],
      architecture: [
        "Ingestion Kafka → Structured Streaming.",
        "Stockage Delta ; orchestration Airflow."
      ],
      benchmarks: [
        "Latence < 2s (micro-batch).",
        "OPTIMIZE & ZORDER améliorent les scans."
      ],
      demo: [
        "`docker compose` + jobs PySpark.",
        "DAG Airflow pour backfills."
      ]
    },
    cloud: {
      overview: [
        "Pipeline bronze/silver/gold sur Cloud (Databricks/ADLS).",
        "Exposition KPI BI."
      ],
      architecture: [
        "Ingestion ADLS ; dbt transformations ; serving BI.",
        "Terraform (réseaux, monitoring) en base."
      ],
      benchmarks: ["Freshness < 1h ; success rate > 99%."],
      demo: ["dbt build + notebooks ; dashboard Grafana (démo)."]
    },
    flask: {
      overview: ["Microservice ML : /predict, /metrics, health.", "Conteneurisation & CI."],
      architecture: ["Flask + Gunicorn ; readiness/liveness.", "Déploiement k8s (maquette)."],
      benchmarks: ["RPS de démo ; cold start mesuré."],
      demo: ["`docker compose up` ; `pytest` ; Actions."]
    },
    talend: {
      overview: ["ETL Talend packagé (JAR) ; contexts dev/recette/prod.", "Audit/logging centralisé."],
      architecture: ["tMap, routines ; orchestration Airflow/k8s."],
      benchmarks: ["Jobs < 10 min ; succès > 99% (démo)."],
      demo: ["Exécution JAR ; config externe."]
    },
    n8n: {
      overview: ["Automatisation ingestion/enrichissement ; webhooks."],
      architecture: ["Workflows n8n ; Postgres + objet ; Kafka optionnel."],
      benchmarks: ["Temps bout à bout court (démo)."],
      demo: ["Export/Import workflows ; docker-compose."]
    },
    fraud: {
      overview: ["Détection de fraude : features de base + API.", "Carte géo simplifiée."],
      architecture: ["Training sklearn ; serving Flask ; persist SQL."],
      benchmarks: ["AUC (démo) ; temps de prédiction faible."],
      demo: ["Notebook + API ; compose."]
    },
    keras: {
      overview: ["AI labs : NLP TF-IDF, CNN Keras (CIFAR-10)."],
      architecture: ["Pipelines d’entraînement ; packaging ; tests."],
      benchmarks: ["Scores reproductibles (démo)."],
      demo: ["`pytest` ; scripts CLI ; README."]
    },
    generic: {
      overview: ["Description non détaillée."],
      architecture: ["Archi non détaillée."],
      benchmarks: ["Benchmarks de démo."],
      demo: ["Voir README du repo."]
    }
  };

  const mk = lists[variant] || lists.generic;

  return (
    <div className="mt-2">
      <div className="flex gap-2 flex-wrap mb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`${BTN_SM} ${tab === t.id ? "opacity-100" : "opacity-70"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="rounded-2xl border p-4 bg-white/60 dark:bg-zinc-900/50 text-sm leading-6">
        {tab === "overview" && (
          <ul className="list-disc pl-5 space-y-1">{mk.overview.map((x, i) => <li key={i}>{x}</li>)}</ul>
        )}
        {tab === "architecture" && (
          <ul className="list-disc pl-5 space-y-1">{mk.architecture.map((x, i) => <li key={i}>{x}</li>)}</ul>
        )}
        {tab === "benchmarks" && (
          <ul className="list-disc pl-5 space-y-1">{mk.benchmarks.map((x, i) => <li key={i}>{x}</li>)}</ul>
        )}
        {tab === "demo" && (
          <ul className="list-disc pl-5 space-y-1">{mk.demo.map((x, i) => <li key={i}>{x}</li>)}</ul>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Données — Projets (titres courts)
   ───────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: 0,
    brand: "ClickHouse",
    image: "/projet.png",
    title: "Battery Heatmap",
    task: "Data/Analytics",
    pitch:
      "E2E : ingestion → dbt étoile → marts ClickHouse → Streamlit. Perf, coûts, fiabilité.",
    highlights: [
      "Bronze/Silver/Gold dbt (tests, docs, snapshots).",
      "MV + ORDER BY → p95 < 500 ms.",
      "Obs : Prometheus + Grafana, freshness/latence.",
    ],
    kpis: [
      { label: "Query time", value: "119 ms", sub: "asset · 1 nœud · 2492 j" },
      { label: "Max bin", value: "3.82%", sub: "time_spent%" },
      { label: "dbt incrémental", value: "×3", sub: "vs full refresh" },
      { label: "Cible p95", value: "< 500 ms", sub: "40M+ lignes" },
    ],
    variant: "heatmap",
    tags: [
      "ClickHouse","dbt","Airflow","Grafana","Python","Streamlit","Azure",
      "InfluxDB","MongoDB","Delta Lake","Databricks","Docker","Kubernetes","Power BI"
    ],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/heatmap_migration" }],
  },
  {
    id: 1,
    brand: "dbt",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Star-schema.png",
    title: "Ventes dbt",
    task: "Data/BI",
    pitch: "Modèle ventes en étoile, industrialisé avec dbt + Airflow.",
    highlights: [
      "Staging → marts, SCD, tests auto.",
      "DAGs & backfills sûrs.",
      "Docs/lineage pour revue rapide.",
    ],
    kpis: [
      { label: "Build", value: "< 8 min", sub: "dataset démo" },
      { label: "Tests dbt", value: "> 95%", sub: "succès" },
      { label: "Freshness", value: "< 1 h", sub: "démo" },
      { label: "Backfill", value: "safe", sub: "DAG" },
    ],
    variant: "dbt",
    tags: ["dbt", "Airflow", "Great Expectations", "SQL", "Docker"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/dbt_sales" }],
  },
  {
    id: 2,
    brand: "Talend",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Talend_logo_2021.svg/1024px-Talend_logo_2021.svg.png",
    title: "ETL Talend",
    task: "ETL",
    pitch: "Ingestion multi-sources → ODS de reporting, orchestré et journalisé.",
    highlights: ["tMap/routines, contexts env.", "Audit/logging & incidents.", "Exécution conteneurisée."],
    kpis: [
      { label: "Succès jobs", value: "> 99%", sub: "démo" },
      { label: "Durée", value: "< 10 min", sub: "pipeline type" },
      { label: "Env.", value: "dev/recette/prod", sub: "contexts" },
      { label: "Logs", value: "centralisés", sub: "audit" },
    ],
    variant: "talend",
    tags: ["Talend", "Java", "PostgreSQL", "Airflow", "Terraform"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/Projet_Talend" }],
  },
  {
    id: 3,
    brand: "Spark",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg",
    title: "Spark + Kafka",
    task: "Big Data",
    pitch: "PySpark batch & streaming avec Kafka et Delta Lake.",
    highlights: ["Structured Streaming + Kafka.", "Delta (MERGE/OPTIMIZE).", "Airflow orchestration."],
    kpis: [
      { label: "Latency", value: "< 2 s", sub: "micro-batch" },
      { label: "Throughput", value: "stable", sub: "backpressure" },
      { label: "Optimize", value: "ON", sub: "Z-Order/OPTIMIZE" },
      { label: "Ops", value: "Airflow", sub: "backfills" },
    ],
    variant: "spark",
    tags: ["PySpark", "Kafka", "Delta Lake", "Airflow", "Python"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/mini_spark_project" }],
  },
  {
    id: 4,
    brand: "Cloud",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/63/Databricks_Logo.png",
    title: "BI Cloud",
    task: "Cloud",
    pitch: "Pipeline b/s/g et exposition d’indicateurs BI.",
    highlights: ["Transformations dbt + tests.", "Alerting fraîcheur/latence.", "IaC Terraform (base)."],
    kpis: [
      { label: "Freshness", value: "< 1 h", sub: "démo" },
      { label: "Success", value: "> 99%", sub: "tasks" },
      { label: "Obs.", value: "Grafana", sub: "latence/volumétrie" },
      { label: "IaC", value: "Terraform", sub: "réseau/monit." },
    ],
    variant: "cloud",
    tags: ["Cloud", "dbt", "Airflow", "Terraform", "SQL"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/Data_Engineering_BI" }],
  },
  {
    id: 5,
    brand: "Flask",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg",
    title: "API Flask ML",
    task: "MLOps",
    pitch: "Modèle exposé via API REST conteneurisée et testée.",
    highlights: ["Endpoints /predict & /metrics.", "pytest + CI GitHub Actions.", "Déploiement k8s (maquette)."],
    kpis: [
      { label: "Health", value: "OK", sub: "readiness/liveness" },
      { label: "CI", value: "Actions", sub: "tests & build" },
      { label: "RPS", value: "stable", sub: "profilé" },
      { label: "Deploy", value: "k8s", sub: "maquette" },
    ],
    variant: "flask",
    tags: ["Flask", "pytest", "Docker", "Kubernetes", "Python"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/flask_docker_app" }],
  },
  {
    id: 6,
    brand: "Talend",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Talend_logo_2021.svg/1024px-Talend_logo_2021.svg.png",
    title: "Talend JAR",
    task: "ETL",
    pitch: "Module ETL autonome (JAR) avec configuration externe et logs.",
    highlights: ["Packaging JAR & log4j2.", "Orchestration Airflow/k8s.", "Monitoring centralisé."],
    kpis: [
      { label: "Packaging", value: "JAR", sub: "multi-env" },
      { label: "Logs", value: "log4j2", sub: "centralisés" },
      { label: "Orchestration", value: "Airflow/k8s", sub: "OK" },
      { label: "Success", value: "> 99%", sub: "démo" },
    ],
    variant: "talend",
    tags: ["Talend", "Java", "Airflow", "Kubernetes", "Grafana"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/Projet_Talend_2" }],
  },
  {
    id: 7,
    brand: "n8n",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/N8n-logo.png",
    title: "n8n Flows",
    task: "Automation",
    pitch: "Ingestion/enrichissement automatisés avec n8n.",
    highlights: ["Webhooks/Kafka.", "PostgreSQL + stockage objet.", "k8s (maquette)."],
    kpis: [
      { label: "Jobs/jour", value: "démo", sub: "scénarios" },
      { label: "Retry", value: "backoff", sub: "géré" },
      { label: "Intégrations", value: "webhooks/Kafka", sub: "OK" },
      { label: "Store", value: "PG + objet", sub: "OK" },
    ],
    variant: "n8n",
    tags: ["n8n", "Kafka", "PostgreSQL", "Docker", "Python"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/Agent_n8n" }],
  },
  {
    id: 8,
    brand: "Fraud",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/World_map_blank_without_borders.svg/1024px-World_map_blank_without_borders.svg.png",
    title: "Fraude API",
    task: "Data/ML",
    pitch: "Modèle simple + API, visualisation géographique.",
    highlights: ["EDA & features essentielles.", "Dockerisation & instrumentation.", "Prêt CI/CD (démo)."],
    kpis: [
      { label: "AUC", value: "démo", sub: "notebook" },
      { label: "Predict", value: "ms", sub: "API" },
      { label: "Docker", value: "OK", sub: "compose" },
      { label: "CI/CD", value: "ready", sub: "pipeline" },
    ],
    variant: "fraud",
    tags: ["Python", "Flask", "Docker", "SQL", "BI"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/detection_fraude_bancaire" }],
  },
  {
    id: 9,
    brand: "Keras",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg",
    title: "Keras Labs",
    task: "AI/MLOps",
    pitch: "Deux maquettes : NLP (TF-IDF) et CNN images.",
    highlights: ["NLP (CLI/GUI).", "CNN Keras (CIFAR-10).", "pytest & packaging."],
    kpis: [
      { label: "Accuracy", value: "démo", sub: "NLP/CNN" },
      { label: "Tests", value: "pytest", sub: "OK" },
      { label: "Docker", value: "OK", sub: "build" },
      { label: "Serving", value: "CLI/GUI", sub: "ready" },
    ],
    variant: "keras",
    tags: ["Python", "Docker", "Keras", "sklearn"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/ai-labs-text-and-image" }],
  },
];

const FILTERS = [
  "All","ClickHouse","dbt","Airflow","Great Expectations","PySpark","Kafka",
  "Delta Lake","Flask","n8n","Kubernetes","Docker","Terraform","Prometheus",
  "Grafana","Python","SQL","BI","Talend","Java","Cloud"
];

/* ─────────────────────────────────────────────────────────────
   Liste Projets (recherche + filtres + KPIs repliables)
   ───────────────────────────────────────────────────────────── */

function useQuerySync(state, setState) {
  useEffect(() => {
    const url = new URL(window.location.href);
    const q = url.searchParams.get("q") || "";
    const f = url.searchParams.get("f") || "All";
    setState((s) => ({ ...s, q, selected: f }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (state.q) url.searchParams.set("q", state.q);
    else url.searchParams.delete("q");
    if (state.selected && state.selected !== "All") url.searchParams.set("f", state.selected);
    else url.searchParams.delete("f");
    window.history.replaceState({}, "", url);
  }, [state.q, state.selected]);
}

function Projects() {
  const [state, setState] = useState({ selected: "All", q: "" });
  const [open, setOpen] = useState({}); // { [projectId]: boolean }
  useQuerySync(state, setState);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchFilter = state.selected === "All" || p.tags.includes(state.selected);
      const haystack = (p.title + " " + p.pitch + " " + (p.highlights || []).join(" ") + " " + p.tags.join(" ")).toLowerCase();
      const matchQuery = state.q.trim() === "" || haystack.includes(state.q.toLowerCase());
      return matchFilter && matchQuery;
    });
  }, [state]);

  const reset = () => setState({ selected: "All", q: "" });

  return (
    <Section id="projects" title="Projets sélectionnés" icon={<Briefcase className="h-6 w-6" />}>
      {/* Barre recherche + filtres */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1">
          <div className="relative">
            <input
              value={state.q}
              onChange={(e) => setState((s) => ({ ...s, q: e.target.value }))}
              placeholder="Rechercher un projet (mots-clés, techno…)"
              className="w-full rounded-xl border px-4 py-2 pr-24"
            />
            <div className="absolute right-2 top-1.5 flex gap-2">
              <button className={BTN_SM} onClick={reset} title="Réinitialiser">Réinitialiser</button>
              <Filter className="h-7 w-7 mt-0.5 opacity-60" />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto no-scrollbar whitespace-nowrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setState((s) => ({ ...s, selected: f }))}
              className={`${BTN_CHIP} mr-2 mb-2 ${state.selected === f ? "ring-2 ring-white/70 dark:ring-zinc-700" : "opacity-90"}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Cartes projets */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => {
          const isOpen = !!open[p.id];
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <Card>
                <div className="mb-4 overflow-hidden rounded-xl border bg-white">
                  <ProjectPoster brand={p.brand || p.tags?.[0]} tags={p.tags} image={p.image} />
                </div>

                {/* Titre court + rôle */}
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
                  <span className="text-xs opacity-60 whitespace-nowrap">{p.task}</span>
                </div>

                {/* Pitch court */}
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-6 mb-2">
                  {p.pitch}
                </p>

                {/* Tags (8 max) */}
                <div className="mb-3">
                  {p.tags.slice(0, 8).map((t) => <Badge key={t}>{t}</Badge>)}
                </div>

                {/* Actions primaire + lien repo */}
                <div className="flex items-center gap-3 mb-2">
                  {p.link?.map((l, i) => (
                    <a key={i} href={l.url} target="_blank" rel="noreferrer" className={BTN_SM}>
                      {l.name === "GitHub" ? <Github className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />} {l.name}
                    </a>
                  ))}
                  <button
                    className={BTN_SM + " ml-auto"}
                    onClick={() => setOpen((o) => ({ ...o, [p.id]: !o[p.id] }))}
                  >
                    {isOpen ? "Masquer" : "Détails"}
                  </button>
                </div>

                {/* CONTENU DÉPLIABLE : stat strip compact + onglets + KPIs complets */}
                {isOpen && (
                  <>
                    <StatStrip items={p.kpis} />

                    {p.highlights?.length ? (
                      <div className="mb-3">
                        <div className="text-xs uppercase tracking-wide opacity-70 mb-1">Ce que contient</div>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          {p.highlights.slice(0, 3).map((h, i) => <li key={i}>{h}</li>)}
                        </ul>
                      </div>
                    ) : null}

                    {p.variant ? <ArchitectureTabs variant={p.variant} /> : null}

                    {p.kpis?.length ? (
                      <div className="mt-3">
                        <div className="text-xs uppercase tracking-wide opacity-70 mb-1">KPIs</div>
                        <KPIGrid items={p.kpis} />
                      </div>
                    ) : null}
                  </>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Compétences (compact)
   ───────────────────────────────────────────────────────────── */

function SkillStars({ rating }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={
            "inline-block h-2.5 w-6 rounded-full " +
            (i < rating ? "bg-zinc-900 dark:bg-white" : "bg-zinc-200 dark:bg-zinc-700")
          }
        />
      ))}
    </div>
  );
}

const SKILLS = [
  { name: "Python", category: "Data Engineering", rating: 5, icon: <FaPython /> },
  { name: "SQL", category: "Data Engineering", rating: 5, icon: <FaDatabase /> },
  { name: "dbt", category: "Data Engineering", rating: 5, icon: <FaCogs /> },
  { name: "ClickHouse", category: "Data Engineering", rating: 5, icon: <FaDatabase /> },
  { name: "Spark", category: "Big Data", rating: 4, icon: <SiApachespark /> },
  { name: "Kafka", category: "Big Data", rating: 4, icon: <SiApachekafka /> },
  { name: "Airflow", category: "Orchestration", rating: 5, icon: <SiApacheairflow /> },
  { name: "Docker", category: "DevOps", rating: 5, icon: <SiDocker /> },
  { name: "Kubernetes", category: "DevOps", rating: 4, icon: <SiKubernetes /> },
  { name: "Grafana", category: "Observabilité", rating: 4, icon: <SiGrafana /> },
];

function Skills() {
  const grouped = useMemo(() => {
    const map = new Map();
    for (const s of SKILLS) {
      if (!map.has(s.category)) map.set(s.category, []);
      map.get(s.category).push(s);
    }
    return Array.from(map.entries());
  }, []);
  return (
    <Section id="skills" title="Compétences" icon={<Database className="h-6 w-6" />}>
      <div className="grid md:grid-cols-2 gap-6">
        {grouped.map(([cat, skills]) => (
          <Card key={cat}>
            <div className="mb-3 font-medium">{cat}</div>
            <div className="space-y-3">
              {skills.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{s.icon}</span>
                    <span className="text-sm">{s.name}</span>
                  </div>
                  <SkillStars rating={s.rating} />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Missions & Réalisations (compact)
   ───────────────────────────────────────────────────────────── */

const RESPONSIBILITIES = [
  { title: "Architecture & Modélisation", items: ["Étoile (Kimball), Lakehouse.", "Contrats de données, SCD & incrémental.", "Partitionnement/TTL/MV."] },
  { title: "Ingestion & Orchestration", items: ["API/JDBC, S3/ADLS.", "Airflow : DAGs, backfills, SLA.", "Idempotence, retries, secrets."] },
  { title: "Qualité & Observabilité", items: ["dbt tests, GE.", "Prometheus/Grafana : freshness/latence.", "Alerting & runbooks."] },
  { title: "DevOps & Sécurité", items: ["Docker/k8s, CI GitHub Actions.", "RBAC, chiffrement, audit.", "Terraform (réseaux/monit.)."] },
];

function Responsibilities() {
  return (
    <Section id="responsibilities" title="Missions & Réalisations" icon={<Briefcase className="h-6 w-6" />}>
      <div className="grid md:grid-cols-2 gap-6">
        {RESPONSIBILITIES.map((r, i) => (
          <Card key={i}>
            <div className="font-medium mb-2">{r.title}</div>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {r.items.map((it, idx) => <li key={idx}>{it}</li>)}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Expériences (très synthétique)
   ───────────────────────────────────────────────────────────── */

function Experience() {
  const rows = [
    {
      role: "Data Engineer",
      company: "PowerUp Technology",
      period: "2025 · Paris",
      bullets: [
        "Plateforme analytics ClickHouse (heatmaps).",
        "Azure Blob → dbt → Airflow ; Grafana.",
        "MV/ORDER BY/TTL ; benchmarks & SLAs.",
      ],
    },
    {
      role: "Data Engineer (Freelance)",
      company: "SkyOps",
      period: "2024–2025 · Remote",
      bullets: [
        "Pipelines S3/ADLS, validations & reprise.",
        "Modèles dbt + GE ; Airflow orchestration.",
        "Freshness/latence : métriques & alertes.",
      ],
    },
    {
      role: "Data Engineer",
      company: "Koacher (SportTech)",
      period: "2022–2024 · Lyon",
      bullets: [
        "Entrepôt Postgres + APIs Node/Express.",
        "Dashboards internes & métriques produit.",
        "CI Docker/GitHub Actions.",
      ],
    },
  ];
  return (
    <Section id="experience" title="Expériences" icon={<Briefcase className="h-6 w-6" />}>
      <div className="space-y-6">
        {rows.map((e, idx) => (
          <Card key={idx}>
            <div className="flex items-center justify-between">
              <div className="font-medium">{e.role} — {e.company}</div>
              <div className="text-sm opacity-70">{e.period}</div>
            </div>
            <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
              {e.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Formation & Contact
   ───────────────────────────────────────────────────────────── */

function Education() {
  return (
    <Section id="education" title="Formation & Certifications" icon={<Database className="h-6 w-6" />}>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <div className="font-medium mb-2">Diplômes</div>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Licence — Banque & Finance</li>
            <li>Master — AFI & SI</li>
            <li>Master — Data Engineering</li>
          </ul>
        </Card>
        <Card>
          <div className="font-medium mb-2">Certifications</div>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Microsoft Azure (cloud)</li>
            <li>Udemy — Data/Engineering</li>
            <li>Kaggle — notebooks</li>
          </ul>
        </Card>
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" title="Contact" icon={<Mail className="h-6 w-6" />}>
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="font-medium mb-1">Travaillons ensemble</div>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              {DATA.location} — disponible pour CDI / missions.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <a href={DATA.email} className={BTN}><Mail className="h-4 w-4" /> Email</a>
            <a href={DATA.phone} className={BTN}><Phone className="h-4 w-4" /> +33 6 11 27 91 53</a>
            <a href={DATA.github} target="_blank" rel="noreferrer" className={BTN}><Github className="h-4 w-4" /> GitHub</a>
            <a href={DATA.linkedin} target="_blank" rel="noreferrer" className={BTN}><Linkedin className="h-4 w-4" /> LinkedIn</a>
            <a href={DATA.cvUrl} download className={BTN}><Download className="h-4 w-4" /> CV</a>
          </div>
        </div>
      </Card>
      <div className="mt-6 text-xs opacity-60">
        © {new Date().getFullYear()} {DATA.name}. Portfolio React & Tailwind.
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Scrollspy + navigation
   ───────────────────────────────────────────────────────────── */

function useScrollspy(ids) {
  const [activeId, setActiveId] = useState(ids[0]);
  useEffect(() => {
    const opts = { rootMargin: "-50% 0px -50% 0px", threshold: [0, 1] };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(entry.target.id);
      });
    }, opts);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return activeId;
}

function useSectionPager() {
  const [current, setCurrent] = useState(0);
  const activeId = useScrollspy(SECTION_ORDER);
  useEffect(() => {
    const idx = SECTION_ORDER.indexOf(activeId);
    if (idx >= 0) setCurrent(idx);
  }, [activeId]);

  const go = (delta) => {
    const next = Math.min(Math.max(current + delta, 0), SECTION_ORDER.length - 1);
    const id = SECTION_ORDER[next];
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === "ArrowRight" || e.key === "PageDown") && !e.metaKey && !e.ctrlKey) {
        e.preventDefault(); go(+1);
      }
      if ((e.key === "ArrowLeft" || e.key === "PageUp") && !e.metaKey && !e.ctrlKey) {
        e.preventDefault(); go(-1);
      }
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, [current]);

  return { current, go, activeId };
}

/* ─────────────────────────────────────────────────────────────
   Root
   ───────────────────────────────────────────────────────────── */

export default function Portfolio() {
  const pager = useSectionPager();
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white scroll-smooth">
      <Header activeId={pager.activeId} />
      <Hero />
      <Projects />
      <Skills />
      <Responsibilities />
      <Experience />
      <Education />
      <Contact />

      {/* Contrôles de navigation gauche/droite */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 hidden md:flex gap-3">
        <button className={BTN_SM} onClick={() => pager.go(-1)}>
          <ArrowLeft className="h-4 w-4" /> Précédent
        </button>
        <button className={BTN_SM} onClick={() => pager.go(+1)}>
          Suivant <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Bouton contact flottant (mobile) */}
      <a href="#contact" className="md:hidden fixed bottom-4 right-4 z-40 rounded-full shadow-lg px-4 py-2 bg-black text-white">
        Contact
      </a>
    </div>
  );
}
