import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail, Github, Linkedin, Download, ExternalLink, Briefcase, Database,
  Rocket, Filter, Phone
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

/* ─────────────────────────────────────────────────────────────
   Styles boutons réutilisables
   ───────────────────────────────────────────────────────────── */

const BTN = "inline-flex items-center gap-2 rounded-full px-4 py-2 bg-black text-white hover:bg-zinc-800 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black";
const BTN_CHIP = "inline-flex items-center rounded-full px-3 py-1 text-sm bg-black text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black";

/* ─────────────────────────────────────────────────────────────
   Images / Logos (fallback local + brand icons)
   ───────────────────────────────────────────────────────────── */

function BrandLogo({ brand }) {
  const label = (brand || "Data").toUpperCase();
  return (
    <svg viewBox="0 0 400 140" className="w-full h-36" role="img" aria-label={label}>
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
      width="640"
      height="144"
      className="w-full h-36 object-contain"
      onError={() => setOk(false)}
      loading="lazy"
      decoding="async"
      sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   Data — Projects / Filters / Skills
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

/* ── Projets (clairs, objectifs explicites, démos crédibles) ── */

const PROJECTS = [
  {
    id: 0,
    brand: "ClickHouse",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Clickhouse.png",
    title: "Entrepôt analytique (démo) — ClickHouse + dbt",
    task: "Data Engineering (démo)",
    pitch:
      "Concevoir un entrepôt simple et reproductible pour requêtes rapides, avec modèle en étoile géré par dbt et orchestration Airflow.",
    highlights: [
      "Modélisation dbt (tests & documentation).",
      "Qualité & observabilité (Great Expectations, Grafana).",
      "Conteneurisation & IaC de base.",
    ],
    tags: ["ClickHouse", "dbt", "Airflow", "Grafana", "Python"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/heatmap_migration" }],
  },
  {
    id: 1,
    brand: "dbt",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/79/Star-schema.png",
    title: "Modèle ventes (démo) — dbt + Airflow",
    task: "Data/BI (démo)",
    pitch:
      "Structurer un domaine ventes en modèle en étoile, industrialisé avec dbt et planifié par Airflow.",
    highlights: [
      "Chaîne staging → marts, snapshots SCD, tests automatiques.",
      "DAGs reproductibles et backfills contrôlés.",
      "Lineage & docs pour accélérer les revues.",
    ],
    tags: ["dbt", "Airflow", "Great Expectations", "SQL", "Docker"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/dbt_sales" }],
  },
  {
    id: 2,
    brand: "Talend",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Talend_logo_2021.svg/1024px-Talend_logo_2021.svg.png",
    title: "ETL Talend (démo) — ODS & reporting",
    task: "ETL (maquette)",
    pitch:
      "Ingestion multi-sources et alimentation d’un ODS de reporting, orchestrée et journalisée.",
    highlights: [
      "tMap/routines, contextes dev/recette/prod.",
      "Audit/logging et gestion d’incidents.",
      "Exécution conteneurisée.",
    ],
    tags: ["Talend", "Java", "PostgreSQL", "Airflow", "Terraform"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/Projet_Talend" }],
  },
  {
    id: 3,
    brand: "Spark",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Apache_Spark_logo.svg",
    title: "Batch & streaming (démo) — Spark + Kafka",
    task: "Big Data (démo)",
    pitch:
      "Illustrer des traitements PySpark batch & temps réel avec Kafka et Delta Lake.",
    highlights: [
      "Structured Streaming + Kafka.",
      "Delta Lake (MERGE/OPTIMIZE).",
      "Orchestration avec Airflow.",
    ],
    tags: ["PySpark", "Kafka", "Delta Lake", "Airflow", "Python"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/mini_spark_project" }],
  },
  {
    id: 4,
    brand: "Cloud",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/63/Databricks_Logo.png",
    title: "Pipeline BI cloud (démo) — bronze/silver/gold",
    task: "Cloud (démo)",
    pitch:
      "Mettre en place un pipeline cloud b/s/g et exposer des indicateurs pour la BI.",
    highlights: [
      "Transformations dbt + tests.",
      "Alerting fraîcheur/latence (Grafana).",
      "IaC de base (Terraform).",
    ],
    tags: ["Cloud", "dbt", "Airflow", "Terraform", "SQL"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/Data_Engineering_BI" }],
  },
  {
    id: 5,
    brand: "Flask",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg",
    title: "Microservice ML (démo) — API Flask",
    task: "MLOps (démo)",
    pitch:
      "Exposer un modèle via une API REST conteneurisée, testée et instrumentée.",
    highlights: [
      "Endpoints /predict & /metrics, health checks.",
      "Tests pytest + CI GitHub Actions.",
      "Déploiement k8s (maquette).",
    ],
    tags: ["Flask", "pytest", "Docker", "Kubernetes", "Python"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/flask_docker_app" }],
  },
  {
    id: 6,
    brand: "Talend",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Talend_logo_2021.svg/1024px-Talend_logo_2021.svg.png",
    title: "Module ETL packagé (démo) — JAR Talend",
    task: "ETL (maquette)",
    pitch:
      "Fournir un module ETL autonome (JAR) avec configuration externe et logs.",
    highlights: [
      "Packaging JAR & log4j2.",
      "Orchestration Airflow/k8s.",
      "Monitoring centralisé (démo).",
    ],
    tags: ["Talend", "Java", "Airflow", "Kubernetes", "Grafana"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/Projet_Talend_2" }],
  },
  {
    id: 7,
    brand: "n8n",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3b/N8n-logo.png",
    title: "Workflows d’automatisation (démo) — n8n",
    task: "Automation (démo)",
    pitch:
      "Automatiser ingestion, enrichissement et recherche sémantique par workflows n8n.",
    highlights: [
      "Intégrations webhooks/Kafka.",
      "PostgreSQL + stockage objet.",
      "Déploiement k8s (maquette).",
    ],
    tags: ["n8n", "Kafka", "PostgreSQL", "Docker", "Python"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/Agent_n8n" }],
  },
  {
    id: 8,
    brand: "Fraud",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/World_map_blank_without_borders.svg/1024px-World_map_blank_without_borders.svg.png",
    title: "Détection de fraude (démo) — API Flask",
    task: "Data/ML (démo)",
    pitch:
      "Entraîner un modèle de base et l’exposer via API, avec visualisation géographique.",
    highlights: [
      "EDA & features essentielles.",
      "Dockerisation & instrumentation.",
      "Prêt pour pipeline CI/CD (démo).",
    ],
    tags: ["Python", "Flask", "Docker", "SQL", "BI"],
    link: [{ name: "GitHub", url: "https://github.com/IADJALILProject/detection_fraude_bancaire" }],
  },
  {
    id: 9,
    brand: "Keras",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Keras_logo.svg",
    title: "AI Labs (démo) — NLP & vision",
    task: "AI/MLOps (démo)",
    pitch:
      "Deux maquettes pédagogiques : classification de texte et CNN d’image.",
    highlights: [
      "NLP TF-IDF (CLI/GUI).",
      "CNN Keras (CIFAR-10).",
      "Tests pytest & packaging.",
    ],
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
   Skills (MLOps enrichi, AI = jauges complètes)
   ───────────────────────────────────────────────────────────── */

const SKILLS = [
  // Data Engineering
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

  // Streaming & Orchestration
  { name: "Apache Airflow", icon: <SiApacheairflow />, color: "text-emerald-600", category: "Streaming & Orchestration", rating: 5 },
  { name: "Apache Kafka", icon: <SiApachekafka />, color: "text-gray-600", category: "Streaming & Orchestration", rating: 4 },
  { name: "Spark Structured Streaming", icon: <SiApachespark />, color: "text-orange-500", category: "Streaming & Orchestration", rating: 4 },
  { name: "Prefect", icon: <FaCloud />, color: "text-blue-500", category: "Streaming & Orchestration", rating: 4 },

  // Databases & Storage
  { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-blue-400", category: "Databases & Storage", rating: 5 },
  { name: "MySQL", icon: <SiMysql />, color: "text-blue-600", category: "Databases & Storage", rating: 4 },
  { name: "MongoDB", icon: <SiMongodb />, color: "text-green-400", category: "Databases & Storage", rating: 4 },
  { name: "Object Storage (S3/ADLS)", icon: <FaCloud />, color: "text-cyan-500", category: "Databases & Storage", rating: 4 },

  // Data Modeling & Architectures
  { name: "Kimball / Star Schema", icon: <FaDatabase />, color: "text-emerald-600", category: "Data Modeling & Architectures", rating: 5 },
  { name: "Data Vault / Dimensional", icon: <FaDatabase />, color: "text-emerald-500", category: "Data Modeling & Architectures", rating: 3 },
  { name: "Modern Data Stack", icon: <FaCloud />, color: "text-sky-600", category: "Data Modeling & Architectures", rating: 4 },
  { name: "Lakehouse Data Stack (Delta/DBX)", icon: <SiDatabricks />, color: "text-red-500", category: "Data Modeling & Architectures", rating: 4 },

  // AI Engineering (jauges complètes)
  { name: "Scikit-learn", icon: <SiScikitlearn />, color: "text-blue-400", category: "AI Engineering", rating: 5 },
  { name: "TensorFlow", icon: <SiTensorflow />, color: "text-yellow-500", category: "AI Engineering", rating: 5 },
  { name: "PyTorch", icon: <SiPytorch />, color: "text-red-500", category: "AI Engineering", rating: 5 },
  { name: "NLP (spaCy/Transformers)", icon: <FaNetworkWired />, color: "text-indigo-600", category: "AI Engineering", rating: 5 },
  { name: "Computer Vision (CNN)", icon: <SiKeras />, color: "text-rose-500", category: "AI Engineering", rating: 5 },

  // MLOps (enrichi)
  { name: "pytest", icon: <FaCogs />, color: "text-gray-600", category: "MLOps", rating: 5 },
  { name: "Model Serving (FastAPI/Flask)", icon: <FaServer />, color: "text-gray-700", category: "MLOps", rating: 5 },
  { name: "MLflow (tracking & registry)", icon: <FaCogs />, color: "text-amber-600", category: "MLOps", rating: 5 },
  { name: "DVC (data versioning)", icon: <FaCogs />, color: "text-fuchsia-600", category: "MLOps", rating: 4 },
  { name: "Feature Store (Feast)", icon: <FaDatabase />, color: "text-emerald-600", category: "MLOps", rating: 4 },
  { name: "Monitoring modèles (Evidently)", icon: <FaCogs />, color: "text-purple-600", category: "MLOps", rating: 4 },

  // DevOps
  { name: "Docker", icon: <SiDocker />, color: "text-blue-400", category: "DevOps", rating: 5 },
  { name: "Kubernetes", icon: <SiKubernetes />, color: "text-blue-500", category: "DevOps", rating: 4 },
  { name: "CI/CD (Jenkins)", icon: <SiJenkins />, color: "text-blue-600", category: "DevOps", rating: 4 },
  { name: "CI/CD (GitHub Actions)", icon: <FaServer />, color: "text-gray-600", category: "DevOps", rating: 4 },
  { name: "Terraform", icon: <FaServer />, color: "text-purple-600", category: "DevOps", rating: 4 },
  { name: "Prometheus", icon: <SiPrometheus />, color: "text-red-500", category: "DevOps", rating: 4 },
  { name: "Grafana", icon: <SiGrafana />, color: "text-yellow-500", category: "DevOps", rating: 4 },

  // Cloud
  { name: "AWS", icon: <FaAws />, color: "text-orange-400", category: "Cloud", rating: 4 },
  { name: "Azure", icon: <FaCloud />, color: "text-blue-400", category: "Cloud", rating: 4 },
  { name: "Databricks", icon: <FaCloud />, color: "text-gray-500", category: "Cloud", rating: 4 },

  // API
  { name: "REST API", icon: <FaNetworkWired />, color: "text-gray-600", category: "API", rating: 5 },
  { name: "Express.js", icon: <SiExpress />, color: "text-gray-500", category: "API", rating: 4 },
  { name: "WebSocket", icon: <SiSocketdotio />, color: "text-gray-500", category: "API", rating: 4 },

  // Analytics
  { name: "Pandas", icon: <FaPython />, color: "text-yellow-500", category: "Analytics", rating: 5 },
  { name: "NumPy", icon: <FaPython />, color: "text-yellow-600", category: "Analytics", rating: 4 },
  { name: "SQL Analytics", icon: <FaDatabase />, color: "text-blue-500", category: "Analytics", rating: 5 },
  { name: "Power BI", icon: <FaDatabase />, color: "text-yellow-400", category: "Analytics", rating: 4 },
  { name: "Tableau", icon: <FaDatabase />, color: "text-blue-400", category: "Analytics", rating: 4 },

  // Data Quality & Governance
  { name: "Great Expectations", icon: <FaCogs />, color: "text-purple-500", category: "Data Quality & Governance", rating: 4 },
  { name: "OpenLineage / DataHub", icon: <FaCogs />, color: "text-indigo-600", category: "Data Quality & Governance", rating: 3 },
];

/* ─────────────────────────────────────────────────────────────
   Helpers UX
   ───────────────────────────────────────────────────────────── */

function Section({ id, title, icon, children }) {
  return (
    <section id={id} className="scroll-mt-24 max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16">
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
        width="224" height="224"
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

/* ScrollSpy pour nav active */
function useScrollSpy(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/* ─────────────────────────────────────────────────────────────
   Header / Hero (bannière supprimée)
   ───────────────────────────────────────────────────────────── */

function Header() {
  const active = useScrollSpy(["projects","skills","responsibilities","experience","education","contact"]);
  const link = (id, label) => (
    <a
      href={`#${id}`}
      aria-current={active===id ? "page" : undefined}
      className={"hover:opacity-70 " + (active===id ? "font-semibold underline underline-offset-4" : "")}
    >
      {label}
    </a>
  );

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60 border-b">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="font-semibold tracking-tight">{DATA.name}</div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {link("projects","Projets")}
          {link("skills","Compétences")}
          {link("responsibilities","Missions & Réalisations")}
          {link("experience","Expériences")}
          {link("education","Formation")}
          {link("contact","Contact")}
          <a href={DATA.cvUrl} download className={BTN} aria-label="Télécharger le CV">
            <Download className="h-4 w-4" /> CV
          </a>
        </nav>
      </div>
    </header>
  );
}

/* Lien d'évitement (accessibilité) */
function SkipToContent() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:bg-black focus:text-white focus:px-3 focus:py-2 rounded"
    >
      Aller au contenu
    </a>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-zinc-50 to-transparent dark:from-zinc-950" />
      <section id="main" className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6 }}
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
   Projects
   ───────────────────────────────────────────────────────────── */

function Projects() {
  const [selected, setSelected] = useState("All");
  const [q, setQ] = useState("");

  // Init from URL
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("tag")) setSelected(p.get("tag"));
    if (p.get("q")) setQ(p.get("q"));
  }, []);

  // Sync to URL
  useEffect(() => {
    const p = new URLSearchParams();
    if (selected !== "All") p.set("tag", selected);
    if (q) p.set("q", q);
    const qs = p.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [selected, q]);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchFilter = selected === "All" || p.tags.includes(selected);
      const haystack = (p.title + " " + p.pitch + " " + (p.highlights || []).join(" ") + " " + p.tags.join(" ")).toLowerCase();
      const matchQuery = q.trim() === "" || haystack.includes(q.toLowerCase());
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
              placeholder="Rechercher un projet (mots-clés, techno…)"
              className="w-full rounded-xl border px-4 py-2 pr-10"
              aria-label="Recherche de projets"
            />
            <Filter className="absolute right-3 top-2.5 h-5 w-5 opacity-60" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { setSelected("All"); setQ(""); }} className={BTN}>
            Réinitialiser
          </button>
        </div>
      </div>

      <div className="overflow-x-auto no-scrollbar whitespace-nowrap mb-4">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setSelected(f)}
            className={`${BTN_CHIP} mr-2 mb-2 ${selected === f ? "opacity-100" : "opacity-75 hover:opacity-100"}`}
            aria-pressed={selected===f}
          >
            {f}
          </button>
        ))}
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
            <Card>
              <div className="mb-4 overflow-hidden rounded-xl border bg-white">
                <ProjectPoster brand={p.brand || p.tags?.[0]} tags={p.tags} image={p.image} />
              </div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-lg font-semibold leading-tight">{p.title}</h3>
                <span className="text-xs opacity-60 whitespace-nowrap">{p.task}</span>
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-6 mb-3">
                <span className="font-medium">Objectif — </span>{p.pitch}
              </p>
              {p.highlights?.length ? (
                <div className="mb-4">
                  <div className="text-xs uppercase tracking-wide opacity-70 mb-1">Ce que contient</div>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {p.highlights.slice(0, 3).map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
                </div>
              ) : null}

              <div className="mb-4">
                {p.tags.slice(0, 6).map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                {p.link?.map((l, i) => (
                  <a
                    key={i}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className={BTN}
                  >
                    {l.name === "GitHub" ? <Github className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />} {l.name}
                  </a>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Skills
   ───────────────────────────────────────────────────────────── */

function SkillBars({ rating }) {
  return (
    <div className="flex gap-1" aria-hidden="true">
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
                    <span className={"text-lg " + (s.color || "")}>{s.icon}</span>
                    <span className="text-sm">{s.name}</span>
                  </div>
                  <SkillBars rating={s.rating} />
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
   Responsibilities
   ───────────────────────────────────────────────────────────── */

const RESPONSIBILITIES = [
  {
    title: "Architecture & Modélisation",
    items: [
      "Cadrage archi (MDS/Lakehouse, batch/stream).",
      "Modèles en étoile (Kimball), Data Vault, 3NF → Star.",
      "Contrats de données & schémas (JSONSchema/dbt).",
      "Partitionnement/cluster (ORDER BY, Z-Order).",
    ],
  },
  {
    title: "Ingestion & Connectivité",
    items: [
      "Connecteurs API/JDBC, S3/ADLS, webhooks.",
      "Batch & temps réel (Kafka), CDC/incrémental.",
      "Idempotence, retries, backoff, gestion des secrets.",
      "Normalisation & chiffrement à l'entrée.",
    ],
  },
  {
    title: "Transformations (dbt/Spark)",
    items: [
      "Staging/cleansing, tests & docs dbt.",
      "Snapshots SCD, modèles incrémentaux.",
      "Optimisations SQL (fenêtres/CTE), Delta MERGE/OPTIMIZE.",
      "Marts métier & métriques réutilisables.",
    ],
  },
  {
    title: "Orchestration & Scheduling",
    items: [
      "DAGs Airflow (sensors, SLAs, pools, XCom).",
      "Déploiement sur k8s/CronJobs, dépendances/ressources.",
      "Calendriers, priorités & backfills contrôlés.",
      "Hooks/Operators custom & secrets backends.",
    ],
  },
  {
    title: "Qualité & Gouvernance",
    items: [
      "Great Expectations (suites, checkpoints, coverage).",
      "Data lineage (OpenLineage/DataHub).",
      "Data contracts, SLAs/SLOs, stewardship & glossaire.",
      "Gestion des définitions KPI.",
    ],
  },
  {
    title: "Observabilité & Monitoring",
    items: [
      "Métriques Prometheus, dashboards Grafana.",
      "Logs structurés, traceids, corrélation d'incidents.",
      "Alerting (lag, échecs DAG, dérives qualité).",
      "Runbooks & auto-remédiation de base.",
    ],
  },
  {
    title: "Performance & Coût",
    items: [
      "Benchmarks froid/chaud, p95/p99.",
      "ClickHouse : ORDER BY, vues matérialisées, TTL.",
      "Dimensionnement clusters, cache & pruning.",
      "Optimisation stockage/compute & coûts Cloud.",
    ],
  },
  {
    title: "Sécurité & Conformité",
    items: [
      "RBAC, rôles & secrets (Vault/KeyVault).",
      "Chiffrement at-rest/in-transit, masquage PII.",
      "RGPD/retention policies, purges & anonymisation.",
      "Revue d'accès & journaux d'audit.",
    ],
  },
  {
    title: "DevOps & CI/CD",
    items: [
      "Images Docker multi-stages, SBOM.",
      "CI GitHub Actions (lint, tests, dbt build).",
      "IaC Terraform (réseaux, DB, monitoring).",
      "Versioning, releases & canary.",
    ],
  },
  {
    title: "Cloud & Infra",
    items: [
      "Azure (ADLS/Blob, Databricks), AWS (S3).",
      "Kubernetes, CronJobs, ingress & autoscaling.",
      "Stockage objet, file systems, quotas.",
      "Gestion coûts & étiquetage ressources.",
    ],
  },
  {
    title: "Data Products & Serving",
    items: [
      "APIs Flask/Express, endpoints /predict & /metrics.",
      "Apps Streamlit & intégrations BI.",
      "Caching, pagination, versionnement schémas.",
      "SLAs d'exposition & contrats de consommation.",
    ],
  },
  {
    title: "Support, Run & Documentation",
    items: [
      "Astreinte légère, post-mortems.",
      "Playbooks, READMEs, ADRs, dbt docs/lineage.",
      "Formations internes & mentoring.",
      "Suivi backlog & priorisation métiers.",
    ],
  },
];

function Responsibilities() {
  return (
    <Section id="responsibilities" title="Missions & Réalisations" icon={<Briefcase className="h-6 w-6" />}>
      <div className="grid md:grid-cols-2 gap-6">
        {RESPONSIBILITIES.map((r, i) => (
          <Card key={i}>
            <div className="font-medium mb-2">{r.title}</div>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {r.items.map((it, idx) => (
                <li key={idx}>{it}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Experience (pro, SkyOps freelance ajouté, dates ajustées)
   ───────────────────────────────────────────────────────────── */

function Experience() {
  const rows = useMemo(
    () => [
      {
        role: "Data Engineer",
        company: "PowerUp Technology",
        brand: "Cloud",
        period: "Avr. 2025 → 7 oct. 2025 · Paris",
        details: [
          "Migration analytique ClickHouse (étoile dbt) alimentant des heatmaps produit.",
          "Chaîne Azure Blob → dbt (tests & docs) → Airflow, observabilité Prometheus + Grafana.",
          "Exécution Docker & IaC Terraform, benchmarks automatisés.",
          "SLAs et data contracts ; alerting proactif (qualité/lag).",
          "DAGs Airflow (sensors, pools, SLA), backfills contrôlés, hooks custom.",
          "Tests (dbt + GE), documentation & lineage pour sécuriser les évolutions.",
          "Optimisations via vues matérialisées, TTL et pruning de partitions.",
        ],
      },
      {
        role: "Data Engineer — Freelance",
        company: "SkyOps",
        brand: "Cloud",
        period: "Nov. 2024 → Mars 2025 · Remote",
        details: [
          "Pipelines d’ingestion vers data lake (S3/ADLS) avec validations et reprise sur incident.",
          "Modèles analytiques dbt (schéma en étoile), tests Great Expectations et documentation.",
          "Orchestration Airflow (DAGs, calendriers, backfills) et déploiement Docker.",
          "Métriques & alertes Prometheus/Grafana (fraîcheur, latence, volumétrie).",
          "Optimisation coûts/performances (partitionnement, TTL, dimensionnement jobs).",
        ],
      },
      {
        role: "Data Engineer",
        company: "Koacher · SportTech",
        brand: "Cloud",
        period: "Sept. 2022 → Août 2024 · Lyon",
        details: [
          "Modélisation domaine et entrepôt PostgreSQL exposé via APIs.",
          "Pipelines ETL Python + APIs Node/Express pour front React & dashboards internes.",
          "Métriques produit/marketing, Docker et CI GitHub Actions.",
          "Schémas en étoile & vues analytiques.",
          "Contrôles de qualité, logs structurés.",
          "Optimisation SQL pour reporting & facturation.",
          "Documentation usages data et formation SQL.",
        ],
      },
      {
        role: "Data Analyst",
        company: "HSBC",
        brand: "Cloud",
        period: "Fév. 2021 → Mai 2021 · Alger",
        details: [
          "Analyses exploratoires, reporting et automatisations SQL/Excel.",
          "Standardisation des extractions et contrôles de qualité.",
          "Scripts paramétrables pour demandes ad-hoc.",
        ],
      },
      {
        role: "Data Analyst",
        company: "BNP Paribas",
        brand: "Cloud",
        period: "Mars 2020 → Juin 2020 · Alger",
        details: [
          "Qualité de données, requêtes SQL et extractions standardisées.",
          "Amélioration de la traçabilité et harmonisation des référentiels.",
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
              <div className="shrink-0 w-24 h-10 border rounded-xl overflow-hidden bg-white">
                <BrandMark brand={e.brand} />
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
            <li>Licence — Banque & Finance</li>
            <li>Master 1 & 2 — AFI & Système d'information</li>
            <li>Master 1 & 2 — Data Engineer</li>
          </ul>
        </Card>
        <Card>
          <div className="font-medium mb-2">Certifications & formations</div>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Certification Cloud Microsoft Azure</li>
            <li>Udemy — cours Data/Engineering</li>
            <li>Kaggle — notebooks & compétitions</li>
          </ul>
        </Card>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Contact + FAB mobile
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
            <a href={DATA.email} className={BTN}><Mail className="h-4 w-4" /> Email</a>
            <a href={DATA.phone} className={BTN}><Phone className="h-4 w-4" /> +33 6 11 27 91 53</a>
            <a href={DATA.github} target="_blank" rel="noreferrer" className={BTN}><Github className="h-4 w-4" /> GitHub</a>
            <a href={DATA.linkedin} target="_blank" rel="noreferrer" className={BTN}><Linkedin className="h-4 w-4" /> LinkedIn</a>
            <a href={DATA.cvUrl} download className={BTN}><Download className="h-4 w-4" /> Télécharger le CV</a>
          </div>
        </div>
      </Card>
      <div className="mt-6 text-xs opacity-60">
        © {new Date().getFullYear()} {DATA.name}. Portfolio construit avec React & Tailwind.
      </div>
    </Section>
  );
}

/* Bouton flottant mobile */
function ContactFAB() {
  return (
    <a href="#contact" className={`${BTN} md:hidden fixed bottom-4 right-4 shadow-lg`}>
      <Mail className="h-4 w-4" /> Contact
    </a>
  );
}

/* ─────────────────────────────────────────────────────────────
   Root
   ───────────────────────────────────────────────────────────── */

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white scroll-smooth">
      <SkipToContent />
      <Header />
      <Hero />
      <Projects />
      <Skills />
      <Responsibilities />
      <Experience />
      <Education />
      <Contact />
      <ContactFAB />
    </div>
  );
}
