import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail, Github, Linkedin, Download, ExternalLink, Briefcase, Database,
  Rocket, Filter, Phone, Target, Clock3, Star
} from "lucide-react";
import {
  FaPython, FaDatabase, FaCogs, FaNetworkWired, FaCloud, FaServer, FaDocker, FaAws
} from "react-icons/fa";
import {
  SiElasticsearch, SiPostgresql, SiMysql, SiMongodb, SiJenkins, SiPrometheus, SiGrafana,
  SiScikitlearn, SiTensorflow, SiPytorch, SiApacheairflow,
  SiDocker, SiKubernetes, SiApachespark, SiApachekafka, SiFlask, SiTalend,
  SiDatabricks
} from "react-icons/si";

/* ─────────────────────────────────────────────────────────────
   Portfolio — Djalil Salah-Bey (Data / Analytics Engineer)
   Version orientée recrutement (sans “À propos” ni “Résumé”)
   ───────────────────────────────────────────────────────────── */

const DATA = {
  name: "Djalil Salah-Bey",
  title: "Ingénieur en science des données",
  location: "Marseille · Paris · Lille",
  email: "mailto:ad.salahbey@gmail.com?subject=Candidature%20Data%20Engineer%20-%20Djalil%20Salah-Bey",
  phone: "tel:+33611279153",
  github: "https://github.com/IADJALILProject",
  linkedin: "https://www.linkedin.com/in/djalil-salah-bey/",
  cvUrl: "/CV_2025-09-18_Djalil_Salah-bey.pdf",
  avatar: "/avatar.jpg",
  blurb:
    "Je conçois des plateformes analytiques mesurées (p95, SLO) et monitorées (Prom/Graf) pour livrer des KPIs fiables et économiques.",
};

/* SEO minimal depuis l'app (pas de nouvelle dépendance) */
function useBasicSEO() {
  useEffect(() => {
    document.title = "Djalil Salah-Bey — Data/Analytics Engineer";
    const ensure = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    ensure(
      "description",
      "Portfolio Data/Analytics Engineer — dbt, Airflow, ClickHouse, Spark, Kafka, Prometheus/Grafana. Projets avec tests, métriques et résultats chiffrés."
    );
  }, []);
}

/* ─────────────────────────────────────────────────────────────
   Utilities
   ───────────────────────────────────────────────────────────── */

function Section({ id, title, icon, children }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-14">
      <div className="flex items-center gap-3 mb-8">
        {icon}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm leading-6 mr-2 mb-2">
      {children}
    </span>
  );
}

function Card({ children }) {
  return (
    <div className="group rounded-2xl border p-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur transition shadow-sm hover:shadow-md hover:-translate-y-0.5">
      {children}
    </div>
  );
}

/* Avatar avec fallback initiales + dimensions pour éviter le CLS */
function Avatar({ src, name, className = "" }) {
  const [ok, setOk] = useState(true);
  const initials = useMemo(() => name.split(" ").map(w => w[0]).join(""), [name]);
  if (ok && src) {
    return (
      <img
        src={src}
        alt={name}
        width={224}
        height={224}
        className={"w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border shadow-inner " + className}
        onError={() => setOk(false)}
        loading="lazy"
        decoding="async"
      />
    );
  }
  return (
    <div
      className={
        "w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-zinc-200 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center border shadow-inner " +
        className
      }
    >
      <span className="text-4xl md:text-6xl font-semibold select-none">{initials}</span>
    </div>
  );
}

/* Safe external link */
const ext = { target: "_blank", rel: "noopener noreferrer" };

/* ─────────────────────────────────────────────────────────────
   Données projets (avec highlights chiffrés)
   ───────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: 0,
    brand: "ClickHouse",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Clickhouse.png",
    title: "Heatmaps batterie — ClickHouse & dbt",
    role: "Data Engineer",
    description:
      "Entrepôt analytique ClickHouse (étoile dbt) + Airflow. Heatmaps REST/CHARGE/DISCHARGE à faible latence.",
    highlights: [
      "p95 < 1s sur 40M+ lignes (ORDER BY + vues matérialisées + TTL)",
      "150+ tests (dbt + GE) · lineage & docs automatiques",
      "Observabilité fraîcheur/latence (Prometheus + Grafana)",
    ],
    tags: ["ClickHouse", "dbt", "Airflow", "Prometheus", "Grafana", "Python", "SQL"],
    links: [
      { name: "Demo/README", url: "https://github.com/IADJALILProject/heatmap_migration#readme" },
      { name: "GitHub", url: "https://github.com/IADJALILProject/heatmap_migration" },
    ],
  },
  {
    id: 1,
    brand: "dbt",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Star-schema.png",
    title: "Entrepôt ventes — dbt & Airflow",
    role: "Data Engineer / BI",
    description:
      "Modèle en étoile (staging→marts), snapshots SCD, orchestration Airflow. Docker + Terraform.",
    highlights: [
      "Rapports SQL p95 < 500ms sur dimensions clés",
      "Tests dbt + GE (contrats de données, SCD, fraîcheur)",
      "Docs & lineage publiés · CI ‘dbt build’",
    ],
    tags: ["dbt", "Airflow", "SQL", "Great Expectations", "Docker"],
    links: [
      { name: "Demo/README", url: "https://github.com/IADJALILProject/dbt_sales#readme" },
      { name: "GitHub", url: "https://github.com/IADJALILProject/dbt_sales" },
    ],
  },
  {
    id: 2,
    brand: "Spark",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg",
    title: "Batch & streaming — Spark/Kafka/Delta",
    role: "Big Data Engineer",
    description:
      "PySpark batch & streaming, Delta Lake (MERGE/OPTIMIZE), Airflow + tests pytest.",
    highlights: [
      "Débits stables (backpressure) · exactly-once sur flux clés",
      "OPTIMIZE/ Z-Order : -25% temps lecture",
      "Alertes lag & qualité · dashboards Grafana",
    ],
    tags: ["PySpark", "Kafka", "Delta Lake", "Airflow", "pytest", "Docker"],
    links: [
      { name: "Demo/README", url: "https://github.com/IADJALILProject/mini_spark_project#readme" },
      { name: "GitHub", url: "https://github.com/IADJALILProject/mini_spark_project" },
    ],
  },
];

/* Filtre (limité à quelques tags pertinents) */
const FILTERS = ["All", "ClickHouse", "dbt", "Airflow", "PySpark", "Kafka", "SQL", "Python"];

/* Compétences : contexte d’usage + dernière année d’usage */
const SKILLS = [
  // Data Engineering
  { name: "Python", icon: <FaPython />, category: "Data Engineering", context: "Prod", last: 2025 },
  { name: "SQL", icon: <FaDatabase />, category: "Data Engineering", context: "Prod", last: 2025 },
  { name: "dbt", icon: <FaCogs />, category: "Data Engineering", context: "Prod", last: 2025 },
  { name: "Apache Spark", icon: <SiApachespark />, category: "Data Engineering", context: "Lab/Prod", last: 2025 },
  { name: "ClickHouse", icon: <FaDatabase />, category: "Data Engineering", context: "Prod", last: 2025 },
  { name: "Delta Lake", icon: <FaDatabase />, category: "Data Engineering", context: "Lab", last: 2025 },
  { name: "Talend", icon: <SiTalend />, category: "Data Engineering", context: "Prod", last: 2024 },
  { name: "n8n", icon: <FaNetworkWired />, category: "Data Engineering", context: "Lab", last: 2025 },

  // Orchestration / Streaming
  { name: "Apache Airflow", icon: <SiApacheairflow />, category: "Streaming & Orchestration", context: "Prod", last: 2025 },
  { name: "Apache Kafka", icon: <SiApachekafka />, category: "Streaming & Orchestration", context: "Lab/Prod", last: 2025 },

  // Databases & Storage
  { name: "PostgreSQL", icon: <SiPostgresql />, category: "Databases & Storage", context: "Prod", last: 2025 },
  { name: "MongoDB", icon: <SiMongodb />, category: "Databases & Storage", context: "Lab", last: 2024 },

  // MLOps / API
  { name: "Flask (Model Serving)", icon: <SiFlask />, category: "MLOps & API", context: "Prod/Lab", last: 2025 },
  { name: "pytest", icon: <FaCogs />, category: "MLOps & API", context: "Prod/Lab", last: 2025 },

  // DevOps
  { name: "Docker", icon: <SiDocker />, category: "DevOps", context: "Prod", last: 2025 },
  { name: "Kubernetes", icon: <SiKubernetes />, category: "DevOps", context: "Lab", last: 2025 },
  { name: "Prometheus", icon: <SiPrometheus />, category: "DevOps", context: "Prod", last: 2025 },
  { name: "Grafana", icon: <SiGrafana />, category: "DevOps", context: "Prod", last: 2025 },

  // Cloud
  { name: "AWS", icon: <FaAws />, category: "Cloud", context: "Lab", last: 2024 },
  { name: "Azure", icon: <FaCloud />, category: "Cloud", context: "Prod/Lab", last: 2025 },
  { name: "Databricks", icon: <SiDatabricks />, category: "Cloud", context: "Lab", last: 2025 },
];

/* ─────────────────────────────────────────────────────────────
   Header / Hero
   ───────────────────────────────────────────────────────────── */

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60 border-b">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="font-semibold tracking-tight">{DATA.name}</div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#projects" className="hover:opacity-70">Projets</a>
          <a href="#skills" className="hover:opacity-70">Compétences</a>
          <a href="#roadmap" className="hover:opacity-70">30/60/90</a>
          <a href="#experience" className="hover:opacity-70">Expériences</a>
          <a href="#education" className="hover:opacity-70">Formation</a>
          <a href="#contact" className="hover:opacity-70">Contact</a>
          <a
            href={DATA.cvUrl}
            download
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-black text-white hover:bg-zinc-900 transition"
          >
            <Download className="h-4 w-4" /> CV
          </a>
        </nav>
      </div>
    </header>
  );
}

function TopBanner() {
  return (
    <div className="w-full border-b bg-amber-50/80 text-amber-900">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-2 text-sm flex flex-wrap items-center justify-between gap-3">
        <div>🟡 Ouvert à <b>CDI / Mission</b> — Paris · Lille · Marseille · Hybrid</div>
        <div className="flex gap-2">
          <a {...ext} href={DATA.github} className="inline-flex items-center gap-1.5 rounded-full border border-amber-900 px-3 py-1 hover:bg-amber-900 hover:text-white transition"><Github className="h-4 w-4" /> GitHub</a>
          <a {...ext} href={DATA.linkedin} className="inline-flex items-center gap-1.5 rounded-full border border-amber-900 px-3 py-1 hover:bg-amber-900 hover:text-white transition"><Linkedin className="h-4 w-4" /> LinkedIn</a>
        </div>
      </div>
    </div>
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
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.1]">{DATA.title}</h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">{DATA.blurb}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border px-4 py-2 hover:bg-black hover:text-white transition"><Mail className="h-4 w-4" /> Me contacter</a>
              <a href={DATA.cvUrl} download className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-black text-white hover:bg-zinc-900 transition"><Download className="h-4 w-4" /> Télécharger le CV</a>
            </div>
            <div className="mt-6 flex flex-wrap">
              {["ClickHouse","dbt","Airflow","Spark","Kafka","Prometheus","Grafana","Python","SQL"].map((b) => (<Badge key={b}>{b}</Badge>))}
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
   Projects
   ───────────────────────────────────────────────────────────── */

function ProjectCard({ p }) {
  return (
    <Card>
      <div className="mb-4 overflow-hidden rounded-xl border bg-white">
        <img
          src={p.image}
          alt={p.brand || "project"}
          width={640}
          height={240}
          className="w-full h-44 md:h-48 object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
        <span className="text-xs opacity-60 whitespace-nowrap">{p.role}</span>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-6 mb-3">{p.description}</p>
      <ul className="text-sm list-disc pl-5 space-y-1 mb-4">
        {p.highlights?.map((h, i) => <li key={i}>{h}</li>)}
      </ul>
      <div className="mb-4">
        {p.tags.slice(0, 6).map((t) => (<Badge key={t}>{t}</Badge>))}
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm">
        {p.links?.map((l, i) => (
          <a key={i} {...ext} href={l.url} className="inline-flex items-center gap-1 hover:underline">
            {l.name === "GitHub" ? <Github className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />} {l.name}
          </a>
        ))}
      </div>
    </Card>
  );
}

function Projects() {
  const [selected, setSelected] = useState("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchFilter = selected === "All" || p.tags.includes(selected);
      const matchQuery =
        q.trim() === "" ||
        (p.title + " " + p.description + " " + p.tags.join(" ") + " " + (p.highlights || []).join(" "))
          .toLowerCase()
          .includes(q.toLowerCase());
      return matchFilter && matchQuery;
    });
  }, [selected, q]);

  return (
    <Section id="projects" title="Projets sélectionnés" icon={<Briefcase className="h-6 w-6" />}>
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1">
          <div className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher (mots-clés, techno…)"
              className="w-full rounded-xl border px-4 py-2 pr-10"
            />
            <Filter className="absolute right-3 top-2.5 h-5 w-5 opacity-60" />
          </div>
        </div>
        <div className="overflow-x-auto no-scrollbar whitespace-nowrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setSelected(f)}
              className={
                "inline-flex items-center rounded-full border px-3 py-1 text-sm mr-2 mb-2 " +
                (selected === f ? "bg-black text-white" : "hover:bg-zinc-100 dark:hover:bg-zinc-800")
              }
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
            transition={{ duration: 0.4 }}
          >
            <ProjectCard p={p} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Skills — Contexte d’usage / Dernier usage
   ───────────────────────────────────────────────────────────── */

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
    <Section id="skills" title="Compétences (contexte & récence)" icon={<Database className="h-6 w-6" />}>
      <Card>
        <div className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">
          🧪 Projets <b>testés</b> (dbt/pytest) & <b>monitorés</b> (Prometheus/Grafana). Les niveaux indiquent le <b>contexte d’usage</b> et la <b>dernière année</b> de pratique.
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {grouped.map(([cat, skills]) => (
            <div key={cat}>
              <div className="mb-3 font-medium">{cat}</div>
              <div className="space-y-3">
                {skills.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{s.icon}</span>
                      <span className="text-sm">{s.name}</span>
                    </div>
                    <div className="text-xs opacity-70 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5">{s.context}</span>
                      <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5">
                        <Clock3 className="h-3 w-3" /> {s.last}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Roadmap 30 / 60 / 90
   ───────────────────────────────────────────────────────────── */

function Roadmap() {
  const blocks = [
    {
      title: "30 jours",
      icon: <Target className="h-5 w-5" />,
      items: [
        "Cartographie des flux & SLOs fraîcheur/latence",
        "dbt init + tests de base (qualité/contrats)",
        "Premiers DAGs Airflow & dashboard Prom/Graf",
      ],
    },
    {
      title: "60 jours",
      icon: <Star className="h-5 w-5" />,
      items: [
        "Modèle en étoile prioritaire en prod (docs/lineage)",
        "Alerting sur fraîcheur, latence et volumes",
        "Benchmarks froid/chaud & quick wins coût/perf",
      ],
    },
    {
      title: "90 jours",
      icon: <Rocket className="h-5 w-5" />,
      items: [
        "Contrats de données & SLOs signés",
        "Vues matérialisées optimisées (p95 & coût)",
        "Playbooks d’exploitation & CI ‘dbt build’",
      ],
    },
  ];

  return (
    <Section id="roadmap" title="Plan 30 / 60 / 90 jours" icon={<Target className="h-6 w-6" />}>
      <div className="grid md:grid-cols-3 gap-6">
        {blocks.map((b, i) => (
          <Card key={i}>
            <div className="flex items-center gap-2 font-medium mb-2">{b.icon}{b.title}</div>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {b.items.map((it, idx) => <li key={idx}>{it}</li>)}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Experience
   ───────────────────────────────────────────────────────────── */

function Experience() {
  const rows = useMemo(
    () => [
      {
        role: "Data Engineer — R&D",
        company: "PowerUp Technology",
        period: "Avr. 2025 → Aujourd'hui · Paris",
        details: [
          "Migration analytique ClickHouse (étoile dbt) — p95 < 1s / 40M+ lignes",
          "Airflow en prod, monitoring Prom/Graf (fraîcheur, latence, volumétrie)",
          "TTLs & vues matérialisées : ~-30% coût · 150+ tests dbt/GE",
        ],
      },
      {
        role: "Data Engineer (alternance)",
        company: "Koacher · SportTech",
        period: "Sept. 2022 → Août 2024 · Lyon",
        details: [
          "Modèle domaine & APIs (PostgreSQL/Express) · dashboards internes",
          "ETL Python, CI GitHub Actions, conteneurisation Docker",
          "Optimisations SQL (index, partitions) · data quality",
        ],
      },
      {
        role: "Data Analyst (stage)",
        company: "HSBC",
        period: "Fév. 2021 → Mai 2021 · Alger",
        details: [
          "Analyses exploratoires, reporting, automatisations SQL/Excel",
          "Standardisation des extractions et contrôles de qualité",
        ],
      },
    ],
    []
  );

  return (
    <Section id="experience" title="Expériences" icon={<Briefcase className="h-6 w-6" />}>
      <div className="space-y-6">
        {rows.map((e, idx) => (
          <div key={idx} className="relative pl-6">
            <div className="absolute left-0 top-1.5 size-2 rounded-full bg-zinc-400" />
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-baseline gap-x-3">
                <h3 className="font-medium">{e.role}</h3>
                <span className="opacity-70">— {e.company}</span>
                <span className="text-sm opacity-60">{e.period}</span>
              </div>
            </div>
            <ul className="mt-2 list-disc pl-5 text-sm space-y-2">
              {e.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Education
   ───────────────────────────────────────────────────────────── */

function Education() {
  return (
    <Section id="education" title="Formation & Certifications" icon={<Briefcase className="h-6 w-6" />}>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <div className="font-medium mb-2">Diplômes</div>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Licence — Banque & Finance (Année)</li>
            <li>Master 1 & 2 — AFI & Systèmes d'information (Années)</li>
            <li>Master 1 & 2 — Data Engineer (Années)</li>
          </ul>
        </Card>
        <Card>
          <div className="font-medium mb-2">Certifications & formations</div>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Microsoft Azure (ID/URL si possible)</li>
            <li>Udemy — Data/Engineering</li>
            <li>Kaggle — notebooks & compétitions</li>
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
            <a href={DATA.email} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 hover:bg-black hover:text-white transition">
              <Mail className="h-4 w-4" /> Email
            </a>
            <a href={DATA.phone} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 hover:bg-black hover:text-white transition">
              <Phone className="h-4 w-4" /> +33 6 11 27 91 53
            </a>
            <a {...ext} href={DATA.github} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 hover:bg-black hover:text-white transition">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a {...ext} href={DATA.linkedin} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 hover:bg-black hover:text-white transition">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a href={DATA.cvUrl} download className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-black text-white hover:bg-zinc-900 transition">
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
   Root
   ───────────────────────────────────────────────────────────── */

export default function Portfolio() {
  useBasicSEO();
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
      <Header />
      <TopBanner />
      <Hero />
      <Projects />
      <Skills />
      <Roadmap />
      <Experience />
      <Education />
      <Contact />
    </div>
  );
}
