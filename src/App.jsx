import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, Github, Linkedin, Download, ExternalLink, Briefcase, Database,
  Rocket, Filter, Phone, ArrowLeft, ArrowRight, X
} from "lucide-react";
import {
  FaPython, FaDatabase, FaCogs, FaNetworkWired, FaCloud, FaServer, FaAws
} from "react-icons/fa";
import {
  SiElasticsearch, SiPostgresql, SiMysql, SiMongodb, SiJenkins, SiPrometheus, SiGrafana,
  SiScikitlearn, SiTensorflow, SiPytorch, SiExpress, SiSocketdotio, SiApacheairflow,
  SiDocker, SiKubernetes, SiApachespark, SiApachekafka, SiFlask, SiTalend,
  SiDatabricks, SiKeras
} from "react-icons/si";

/* ─────────────────────────────────────────────────────────────
   Portfolio — Djalil Salah-Bey
   ───────────────────────────────────────────────────────────── */

const DATA = {
  name: "Djalil Salah-Bey",
  title: "Data Engineer & Aanlytics Engineer — Databricks (Azure/GCP) ",
  location: "Marseille · Paris · Lille",
  email: "mailto:salahbeydjalil@gmail.com",
  phone: "tel:+33611279153",
  github: "https://github.com/IADJALILProject",
  linkedin: "https://www.linkedin.com/in/djalil-salah-bey/",
  cvUrl: "/Djalil_DataEngineer.pdf",
  avatar: "/avatar.jpg",
};

/* Sections (sans Expériences) */
const SECTION_ORDER = ["projects", "skills",  "education", "contact"];

/* ─────────────────────────────────────────────────────────────
   Styles
   ───────────────────────────────────────────────────────────── */
const BTN = "inline-flex items-center gap-2 rounded-full px-4 py-2 bg-black text-white hover:bg-zinc-800 transition";
const BTN_SM = "inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-black text-white hover:bg-zinc-800 transition text-sm";
const BTN_CHIP = "inline-flex items-center rounded-full px-3 py-1 text-sm bg-black text-white transition";

/* utils compacité */
const truncate = (s = "", n = 170) => (s.length > n ? s.slice(0, n).trimEnd() + "…" : s);

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
   THEME / layout helpers  (pas de bouton Thème)
   ───────────────────────────────────────────────────────────── */

function Section({ id, title, icon, children }) {
  return (
    <section id={id} className="scroll-mt-20 max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-14">
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}
function Badge({ children }) {
  return <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs md:text-sm leading-6 mr-2 mb-2">{children}</span>;
}
function Card({ children }) {
  return (
    <div className="group rounded-2xl border p-5 md:p-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur transition shadow-sm hover:shadow-md hover:-translate-y-0.5">
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
        className={"w-36 h-36 md:w-56 md:h-56 rounded-full object-cover border shadow-inner " + className}
        onError={() => setOk(false)}
        loading="lazy"
        decoding="async"
      />
    );
  }
  return (
    <div className={"w-36 h-36 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center border shadow-inner " + className}>
      <span className="text-4xl md:text-6xl font-semibold select-none">{initials}</span>
    </div>
  );
}

function Header({ activeId }) {
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
            <a href="#education" className={linkCls("education")}>Formation</a>
            <a href="#contact" className={linkCls("contact")}>Contact</a>
            <a href={DATA.cvUrl} download className={BTN_SM} aria-label="Télécharger le CV">
              <Download className="h-4 w-4" /> CV
            </a>
            {/* Bouton Thème supprimé */}
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
      <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          <div>
            <div className="text-xs md:text-sm inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4">
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
   Projects — poster & theme
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
  const topTags = (tags || []).slice(0, 4);
  return (
    <div className={`relative h-40 md:h-44 bg-gradient-to-br ${theme.bg} rounded-xl ring-1 ${theme.ring} overflow-hidden`}>
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
   KPI + Onglets — réutilisables
   ───────────────────────────────────────────────────────────── */

function KPIGrid({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 mb-3 md:mb-4">
      {items.map((k, i) => (
        <div key={i} className="rounded-2xl border p-3 md:p-4 bg-white/70 dark:bg-zinc-900/60">
          <div className="text-[10px] md:text-xs uppercase tracking-wide opacity-70">{k.label}</div>
          <div className="text-base md:text-xl font-semibold">{k.value}</div>
          <div className="text-[10px] md:text-xs opacity-70 mt-1">{k.sub}</div>
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
    { id: "demo", label: "Demo" }
  ];

  const lists = {
    heatmap: {
      overview: [
        "Batteries : SOC/Temp/Current (client→asset→rack→module).",
        "Staging→étoile dbt→marts ClickHouse (heatmaps/KPI).",
        "Qualité : tests dbt + Great Expectations."
      ],
      architecture: [
        "Ingestion Python→ADLS (bronze) avec retries & logs.",
        "dbt : SCD, incrémental, docs & lineage.",
        "ClickHouse : MergeTree, ORDER BY, partitions, MV.",
        "Serving Streamlit/Power BI ; Airflow ; Grafana."
      ],
      benchmarks: [
        "Heatmap p95 < 500 ms (40M+, warm).",
        "dbt incrémental ≈ 3× plus rapide que full refresh.",
        "TTL & pruning → coût stockage ↓."
      ],
      demo: [
        "Streamlit (filtres hiérarchiques + KPI + heatmaps).",
        "`docker compose up` puis `dbt build`.",
        "CI : `dbt test` + GE (GitHub Actions)."
      ]
    },
    dbt: {
      overview: [
        "Ventes en étoile + snapshots SCD.",
        "Docs & lineage pour onboarding rapide."
      ],
      architecture: ["Sources→staging→marts dbt", "Airflow : SLA & backfills"],
      benchmarks: ["Build < 8 min (démo)", "Tests > 95% ok"],
      demo: ["`dbt build` ; `dbt docs serve`"]
    },
    spark: {
      overview: ["Batch + streaming Kafka", "Delta Lake : MERGE/OPTIMIZE"],
      architecture: ["Kafka→Structured Streaming", "Airflow orchestration"],
      benchmarks: ["Latence < 2s (micro-batch)", "ZORDER/OPTIMIZE = scans ↓"],
      demo: ["`docker compose` + jobs PySpark"]
    },
    cloud: {
      overview: ["Pipeline bronze/silver/gold (ADLS/DBX)", "KPI pour BI"],
      architecture: ["Ingestion ADLS ; dbt ; BI", "Terraform de base"],
      benchmarks: ["Freshness < 1h ; SR > 99%"],
      demo: ["dbt build + notebooks DBX"]
    },
    flask: {
      overview: ["API ML : /predict /metrics health", "CI + Docker"],
      architecture: ["Flask + Gunicorn ; readiness/liveness", "k8s (maquette)"],
      benchmarks: ["RPS stable ; cold start mesuré"],
      demo: ["`docker compose up` ; `pytest`"]
    },
    talend: {
      overview: ["ETL Talend (JAR) multi-env", "Audit/log centralisé"],
      architecture: ["tMap & routines ; orchestration Airflow/k8s"],
      benchmarks: ["Jobs < 10 min ; SR > 99%"],
      demo: ["Exec JAR + config externe"]
    },
    n8n: {
      overview: ["Workflows n8n (ingestion/enrichissement)"],
      architecture: ["Postgres + objet ; Kafka optionnel"],
      benchmarks: ["E2E court (démo)"],
      demo: ["Exporter/importer workflows"]
    },
    fraud: {
      overview: ["Fraude : features de base + API", "Carte simple"],
      architecture: ["sklearn train ; Flask serve ; SQL"],
      benchmarks: ["AUC/accuracy (démo) ; prédiction ms"],
      demo: ["Notebook + API ; compose"]
    },
    keras: {
      overview: ["NLP TF-IDF + CNN CIFAR-10"],
      architecture: ["Pipelines train ; tests ; packaging"],
      benchmarks: ["Scores de démo reproductibles"],
      demo: ["`pytest` ; scripts CLI"]
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
    <>
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
        <ul className="list-disc pl-5 space-y-1">
          {(mk[tab] || []).map((x, i) => <li key={i}>{x}</li>)}
        </ul>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   Carte projet + MODAL plein écran
   ───────────────────────────────────────────────────────────── */

function ProjectDetail({ p, onClose }) {
  /* disable scroll backg. */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm">
      <div className="absolute inset-0 overflow-y-auto">
        <div className="mx-auto max-w-5xl bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white rounded-none md:rounded-2xl my-0 md:my-10">
          {/* header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <span className="text-sm px-2 py-0.5 rounded-full border">{p.task}</span>
              <h3 className="text-lg md:text-xl font-semibold">{p.title}</h3>
            </div>
            <button className={BTN_SM} onClick={onClose}><X className="h-4 w-4" /> Fermer</button>
          </div>

          {/* poster */}
          <div className="p-4">
            <div className="overflow-hidden rounded-xl border bg-white mb-4">
              <ProjectPoster brand={p.brand || p.tags?.[0]} tags={p.tags} image={p.image} />
            </div>

            {/* full text */}
            <p className="text-sm md:text-base leading-7 mb-3">{p.pitch}</p>
            {p.highlights?.length ? (
              <ul className="list-disc pl-5 text-sm md:text-base space-y-1 mb-4">
                {p.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            ) : null}

            {p.kpis?.length ? <KPIGrid items={p.kpis} /> : null}
            {p.variant ? <ArchitectureTabs variant={p.variant} /> : null}

            {/* footer */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {p.tags.map((t) => <Badge key={t}>{t}</Badge>)}
              {p.link?.map((l, i) => (
                <a key={i} href={l.url} target="_blank" rel="noreferrer" className={BTN_SM}>
                  {l.name === "GitHub" ? <Github className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />} {l.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ p, onOpen }) {
  return (
    <Card>
      <div className="mb-4 overflow-hidden rounded-xl border bg-white">
        <ProjectPoster brand={p.brand || p.tags?.[0]} tags={p.tags} image={p.image} />
      </div>

      <div className="flex items-start justify-between gap-3 mb-1">
        <h3 className="text-base md:text-lg font-semibold leading-tight">{p.title}</h3>
        <span className="text-[11px] md:text-xs opacity-60 whitespace-nowrap">{p.task}</span>
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-6 mb-2">
        {truncate(p.pitch, 180)}
      </p>

      {p.highlights?.length ? (
        <div className="mb-3">
          <ul className="list-disc pl-5 text-sm space-y-1">
            {p.highlights.slice(0, 2).map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </div>
      ) : null}

      <div className="mb-3">
        {p.tags.slice(0, 4).map((t) => (<Badge key={t}>{t}</Badge>))}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm">
        {p.link?.map((l, i) => (
          <a key={i} href={l.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
            {l.name === "GitHub" ? <Github className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />} {l.name}
          </a>
        ))}
        <button onClick={() => onOpen(p)} className={BTN_SM}>Détails</button>
      </div>
    </Card>
  );
}


/* ─────────────────────────────────────────────────────────────
   Données — Projets (version pro, claire et cohérente)
   ───────────────────────────────────────────────────────────── */
const PROJECTS = [
  // 0) Plateforme IoT Smart City
  {
    id: 0,
    brand: "IoT",
    image: "/iot-smartcity.png",
    title: "Pipeline pour capteurs urbains",
    task: "Data Platform",
    context:
      "Plateforme locale pour capteurs urbains : ingestion, historisation et supervision (météo, trafic, pollution).",
    pitch:
      "Architecture conteneurisée (Docker Compose) : ingestion Python, traitements batch/stream PySpark, modèle dbt sur DuckDB, supervision Grafana et traçabilité OpenLineage (Marquez). Exécution possible sous Kubernetes (minikube).",
    highlights: [
      "Ingestion multi-capteurs avec contrôles de qualité",
      "DAGs Airflow (batch & streaming) pour l’orchestration",
      "Modèle dbt (staging → marts) sur DuckDB",
      "Observabilité as-code (Grafana) et traçabilité OpenLineage/Marquez",
      "Alternative Kubernetes (minikube)"
    ],
    kpis: [
      { label: "Fraîcheur", value: "≤ 15 min", sub: "flux démo" },
      { label: "Succès", value: "> 99 %", sub: "retries + alerting" },
      { label: "Traçabilité", value: "100 % des jobs", sub: "Marquez" }
    ],
    impact:
      "Délai de mise à disposition réduit et visibilité de bout-à-bout grâce à la traçabilité automatisée.",
    variant: "iot",
    tags: [
      "Python","Airflow","PySpark","dbt","DuckDB","Grafana","OpenLineage","Marquez","Docker","Kubernetes"
    ],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/iot-smartcity-data-platform" }]
  },

  // 1) BESS Analytics (ClickHouse)
  {
    id: 1,
    brand: "ClickHouse",
    image: "/projet.png",
    title: "Pipeline OLAP pour capteurs batteries",
    task: "OLAP / Entrepôt de données",
    context:
      "Analyse haute fréquence des mesures batteries (température, SOC, courant) avec latence stricte et agrégations multi-horizons.",
    pitch:
      "Entrepôt en étoile sous ClickHouse ; ingestion Databricks/Kafka ; agrégations via vues matérialisées/projections ; MergeTree optimisé (partitionnement, ORDER BY, index de saut) pour des requêtes OLAP rapides.",
    highlights: [
      "Schéma en étoile : fact_measurements + dim_pack/dim_cell/dim_time",
      "AggregatingMergeTree + vues matérialisées (minute/heure/jour)",
      "dbt (adaptateur ClickHouse) : incrémental, tests, documentation",
      "Paramétrage du stockage : partitionnement + index de saut"
    ],
    kpis: [
      { label: "Latence p95", value: "< 500 ms", sub: "≈ 40 M de lignes (démo)" },
      { label: "Fraîcheur", value: "< 5 min", sub: "pipeline incrémental" },
      { label: "Succès", value: "> 99 %", sub: "orchestration Airflow" }
    ],
    impact:
      "Exploration interactive de volumes importants et baisse du coût de calcul grâce aux agrégations pré-calculées.",
    variant: "heatmap",
    tags: [
      "ClickHouse","dbt","Airflow","Databricks","Kafka","Python","SQL","Azure Blob","Grafana","Streamlit"
    ],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/heatmap_migration" }]
  },

  // 3) Entrepôt Ventes (dbt)
  {
    id: 3,
    brand: "dbt",
    image: "/sales.png",
    title: "Pipeline d’entrepôt de ventes",
    task: "Modélisation de données",
    context:
      "Consolidation ventes/produits/clients pour reporting récurrent avec contraintes de qualité.",
    pitch:
      "Chaîne dbt (staging → marts) avec SCD, incrémental et tests (unicité, relations, fraîcheur) ; documentation/lineage automatiques et orchestration/backfills sous Airflow.",
    highlights: [
      "SCD + incrémental (macros dbt-utils)",
      "Tests dbt systématiques + dbt docs",
      "Marts métiers optimisés pour la BI",
      "Backfills contrôlés et dépendances explicites"
    ],
    kpis: [
      { label: "Build", value: "< 8 min", sub: "jeu démo" },
      { label: "Tests OK", value: "> 95 %", sub: "sur l’ensemble des modèles" },
      { label: "Fraîcheur", value: "< 1 h", sub: "contrainte opérationnelle" }
    ],
    impact:
      "Confiance accrue dans les indicateurs et cycle de publication BI accéléré grâce à des contrôles qualité codifiés.",
    variant: "dbt",
    tags: ["dbt","Airflow","PostgreSQL","SQL","Great Expectations"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/dbt_sales" }]
  },

  // 4) Datamart bancaire (Prefect)
  {
    id: 4,
    brand: "Prefect",
    image: "/Sa.png",
    title: "Pipeline de datamart bancaire",
    task: "Pipelines de données",
    context:
      "Alimentation d’un datamart bancaire depuis sources hétérogènes (API/CSV/SQL) avec exigence de traçabilité.",
    pitch:
      "Flows Prefect avec retries, dépendances et planification ; normalisation/enrichissement Python/SQL ; chargement du datamart (faits & dimensions). Supervision via Prefect ; packaging Docker pour la portabilité ; tableau de bord power bi.",
    highlights: [
      "Orchestration Prefect : planification, reprises, dépendances",
      "Transformations Python/SQL et contrôles d’intégrité",
      "Surveillance en temps réel (Orion) + logs détaillés",
      "Exécution conteneurisée reproductible",
      "Tableau de bord Power BI pour la restitution"
    ],
    kpis: [
      { label: "Fraîcheur", value: "< 1 h", sub: "jeu bancaire (démo)" },
      { label: "Succès", value: "> 99 %", sub: "runs supervisés" },
      { label: "Portabilité", value: "Docker", sub: "environnements alignés" }
    ],
    impact:
      "Alimentation fiabilisée et moins d’interventions manuelles grâce à une orchestration explicite et observable.",
    variant: "prefect",
    tags: ["Prefect","Python","SQL","PostgreSQL","Docker","Power BI", "PostgreSQL"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/prefect-banking-datamart" }]
  },

  // 5) Pipeline Finance (Talend)
  {
    id: 5,
    brand: "Talend",
    image: "/ta.png",
    title: "Pipeline ETL Talend DI",
    task: "ETL",
    context:
      "Intégration multi-sources vers ODS/Datamart finance pour restitution et conformité des reportings.",
    pitch:
      "Chaîne ETL Talend (tMap, routines) avec contexts par environnement et orchestration Airflow. Standardisation des données, contrôles d’exhaustivité et optimisation SQL pour des rapports réactifs.",
    highlights: [
      "Contexts Talend (DEV/TEST/PROD) et journalisation",
      "Orchestration Airflow + notifications d’incident",
      "Optimisations SQL au chargement et pour la BI",
      "Contrôles d’intégrité et de complétude à l’ingestion"
    ],
    kpis: [
      { label: "Succès jobs", value: "> 99 %", sub: "workflows de référence" },
      { label: "Durée pipeline", value: "< 10 min", sub: "scénario type" }
    ],
    impact:
      "Délais de production réduits et qualité perçue améliorée côté métiers.",
    variant: "talend",
    tags: ["Talend","PostgreSQL","SQL Server","Airflow","SQL"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/Projet_Talend" }]
  }
];



/* Filtres visibles dans le carrousel horizontal */
const FILTERS = [
  "All","ClickHouse","dbt","Airflow","Great Expectations","PySpark","Kafka",
  "Delta Lake","Flask","n8n","Kubernetes","Docker","Terraform","Prometheus",
  "Grafana","Python","SQL","BI","Talend","Java","Cloud"
];

/* ─────────────────────────────────────────────────────────────
   Projects (recherche + filtres + synchro URL + MODAL)
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
  const [selectedProject, setSelectedProject] = useState(null);
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
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1">
          <div className="relative">
            <input
              value={state.q}
              onChange={(e) => setState((s) => ({ ...s, q: e.target.value }))}
              placeholder="Rechercher (mots-clés, techno…)"
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
          >
            <ProjectCard p={p} onOpen={setSelectedProject} />
          </motion.div>
        ))}
      </div>

      {selectedProject && (
        <ProjectDetail
          p={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Skills
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
  { name: "Python", icon: <FaPython />, color: "text-yellow-500", category: "Data Engineering", rating: 5 },
  { name: "SQL", icon: <FaDatabase />, color: "text-blue-500", category: "Data Engineering", rating: 5 },
  { name: "dbt", icon: <FaCogs />, color: "text-orange-500", category: "Data Engineering", rating: 5 },
  { name: "Apache Spark", icon: <SiApachespark />, color: "text-orange-400", category: "Data Engineering", rating: 4 },
  { name: "ClickHouse", icon: <FaDatabase />, color: "text-yellow-500", category: "Data Engineering", rating: 5 },
  { name: "Delta Lake", icon: <FaDatabase />, color: "text-teal-500", category: "Data Engineering", rating: 4 },
  { name: "Talend", icon: <SiTalend />, color: "text-indigo-500", category: "Data Engineering", rating: 4 },
  { name: "n8n", icon: <FaNetworkWired />, color: "text-pink-500", category: "Data Engineering", rating: 4 },
  { name: "Elasticsearch", icon: <SiElasticsearch />, color: "text-yellow-500", category: "Data Engineering", rating: 3 },
  { name: "Hadoop (HDFS/Hive)", icon: <FaCogs />, color: "text-gray-600", category: "Data Engineering", rating: 3 },

  { name: "Apache Airflow", icon: <SiApacheairflow />, color: "text-emerald-600", category: "Streaming & Orchestration", rating: 5 },
  { name: "Apache Kafka", icon: <SiApachekafka />, color: "text-gray-600", category: "Streaming & Orchestration", rating: 4 },
  { name: "Spark Structured Streaming", icon: <SiApachespark />, color: "text-orange-500", category: "Streaming & Orchestration", rating: 4 },
  { name: "Prefect", icon: <FaCloud />, color: "text-blue-500", category: "Streaming & Orchestration", rating: 4 },

  { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-blue-400", category: "Databases & Storage", rating: 5 },
  { name: "MySQL", icon: <SiMysql />, color: "text-blue-600", category: "Databases & Storage", rating: 4 },
  { name: "MongoDB", icon: <SiMongodb />, color: "text-green-400", category: "Databases & Storage", rating: 4 },
  { name: "Object Storage (S3/ADLS)", icon: <FaCloud />, color: "text-cyan-500", category: "Databases & Storage", rating: 4 },

  { name: "Kimball / Star Schema", icon: <FaDatabase />, color: "text-emerald-600", category: "Data Modeling & Architectures", rating: 5 },
  { name: "Data Vault / Dimensional", icon: <FaDatabase />, color: "text-emerald-500", category: "Data Modeling & Architectures", rating: 3 },
  { name: "Modern Data Stack", icon: <FaCloud />, color: "text-sky-600", category: "Data Modeling & Architectures", rating: 4 },
  { name: "Lakehouse (Delta/DBX)", icon: <SiDatabricks />, color: "text-red-500", category: "Data Modeling & Architectures", rating: 4 },

  { name: "Scikit-learn", icon: <SiScikitlearn />, color: "text-blue-400", category: "AI Engineering", rating: 5 },
  { name: "TensorFlow", icon: <SiTensorflow />, color: "text-yellow-500", category: "AI Engineering", rating: 5 },
  { name: "PyTorch", icon: <SiPytorch />, color: "text-red-500", category: "AI Engineering", rating: 5 },
  { name: "NLP (spaCy/Transformers)", icon: <FaNetworkWired />, color: "text-indigo-600", category: "AI Engineering", rating: 5 },
  { name: "Computer Vision (CNN)", icon: <SiKeras />, color: "text-rose-500", category: "AI Engineering", rating: 5 },

  { name: "pytest", icon: <FaCogs />, color: "text-gray-600", category: "MLOps", rating: 5 },
  { name: "Serving (FastAPI/Flask)", icon: <FaServer />, color: "text-gray-700", category: "MLOps", rating: 5 },
  { name: "MLflow", icon: <FaCogs />, color: "text-amber-600", category: "MLOps", rating: 5 },
  { name: "DVC", icon: <FaCogs />, color: "text-fuchsia-600", category: "MLOps", rating: 4 },
  { name: "Feature Store (Feast)", icon: <FaDatabase />, color: "text-emerald-600", category: "MLOps", rating: 4 },
  { name: "Monitoring (Evidently)", icon: <FaCogs />, color: "text-purple-600", category: "MLOps", rating: 4 },

  { name: "Docker", icon: <SiDocker />, color: "text-blue-400", category: "DevOps", rating: 5 },
  { name: "Kubernetes", icon: <SiKubernetes />, color: "text-blue-500", category: "DevOps", rating: 4 },
  { name: "Jenkins", icon: <SiJenkins />, color: "text-blue-600", category: "DevOps", rating: 4 },
  { name: "GitHub Actions", icon: <FaServer />, color: "text-gray-600", category: "DevOps", rating: 4 },
  { name: "Terraform", icon: <FaServer />, color: "text-purple-600", category: "DevOps", rating: 4 },
  { name: "Prometheus", icon: <SiPrometheus />, color: "text-red-500", category: "DevOps", rating: 4 },
  { name: "Grafana", icon: <SiGrafana />, color: "text-yellow-500", category: "DevOps", rating: 4 },

  { name: "AWS", icon: <FaAws />, color: "text-orange-400", category: "Cloud", rating: 4 },
  { name: "Azure", icon: <FaCloud />, color: "text-blue-400", category: "Cloud", rating: 4 },
  { name: "Databricks", icon: <FaCloud />, color: "text-gray-500", category: "Cloud", rating: 4 },

  { name: "REST API", icon: <FaNetworkWired />, color: "text-gray-600", category: "API", rating: 5 },
  { name: "Express.js", icon: <SiExpress />, color: "text-gray-500", category: "API", rating: 4 },
  { name: "WebSocket", icon: <SiSocketdotio />, color: "text-gray-500", category: "API", rating: 4 },

  { name: "Pandas", icon: <FaPython />, color: "text-yellow-500", category: "Analytics", rating: 5 },
  { name: "NumPy", icon: <FaPython />, color: "text-yellow-600", category: "Analytics", rating: 4 },
  { name: "SQL Analytics", icon: <FaDatabase />, color: "text-blue-500", category: "Analytics", rating: 5 },
  { name: "Power BI", icon: <FaDatabase />, color: "text-yellow-400", category: "Analytics", rating: 4 },
  { name: "Tableau", icon: <FaDatabase />, color: "text-blue-400", category: "Analytics", rating: 4 },

  { name: "Great Expectations", icon: <FaCogs />, color: "text-purple-500", category: "Data Quality & Governance", rating: 4 },
  { name: "OpenLineage / DataHub", icon: <FaCogs />, color: "text-indigo-600", category: "Data Quality & Governance", rating: 3 },
];

/* ─────────────────────────────────────────────────────────────
   Formation (Académique à gauche / Certifications à droite)
   ───────────────────────────────────────────────────────────── */

   function Education() {
    return (
      <Section id="education" title="Formation" icon={<Database className="h-6 w-6" />}>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Gauche : Parcours académique */}
          <Card>
            <div className="font-medium mb-2">Formation académique</div>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>IA School — Master Expert Data & Ingénierie de l’Intelligence Artificielle</li>
            </ul>
          </Card>
        </div>
      </Section>
    );
  }
  

/* ─────────────────────────────────────────────────────────────
   Contact
   ───────────────────────────────────────────────────────────── */

function Contact() {
  return (
    <Section id="contact" title="Contact" icon={<Mail className="h-6 w-6" />}>
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="font-medium mb-1">Travaillons ensemble</div>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              {DATA.location} — disponible pour postes CDI / missions.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <a href={DATA.email} className={BTN}>
              <Mail className="h-4 w-4" /> Email
            </a>
            <a href={DATA.phone} className={BTN}>
              <Phone className="h-4 w-4" /> +33 6 11 27 91 53
            </a>
            <a href={DATA.github} target="_blank" rel="noreferrer" className={BTN}>
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href={DATA.linkedin} target="_blank" rel="noreferrer" className={BTN}>
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a href={DATA.cvUrl} download className={BTN}>
              <Download className="h-4 w-4" /> Télécharger le CV
            </a>
          </div>
        </div>
      </Card>
      <div className="mt-6 text-xs opacity-60">
        © {new Date().getFullYear()} {DATA.name}. Portfolio construit avec React & Tailwind.
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Scrollspy + navigation (flèches / PageUp-Down)
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

      {/* Compétences */}
      <Section id="skills" title="Compétences" icon={<Database className="h-6 w-6" />}>
        <div className="grid md:grid-cols-2 gap-6">
          {(() => {
            const map = new Map();
            for (const s of SKILLS) {
              if (!map.has(s.category)) map.set(s.category, []);
              map.get(s.category).push(s);
            }
            return Array.from(map.entries()).map(([cat, skills]) => (
              <Card key={cat}>
                <div className="mb-3 font-medium">{cat}</div>
                <div className="space-y-3">
                  {skills.map((s, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className={"text-lg " + (s.color || "")}>{s.icon}</span>
                        <span className="text-sm">{s.name}</span>
                      </div>
                      <SkillStars rating={s.rating} />
                    </div>
                  ))}
                </div>
              </Card>
            ));
          })()}
        </div>
      </Section>

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