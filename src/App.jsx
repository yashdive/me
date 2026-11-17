import { useEffect, useRef, useState } from 'react';
import profileImage from '../assets/attention.jpg';
import transformerImage from '../assets/transformer1.png';
import sketch01 from '../assets/sketches/WhatsApp Image 2026-01-12 at 07.08.46.jpeg';
import sketch02 from '../assets/sketches/WhatsApp Image 2026-01-12 at 07.08.51 (1).jpeg';
import sketch03 from '../assets/sketches/WhatsApp Image 2026-01-12 at 07.08.52 (4).jpeg';
import sketch04 from '../assets/sketches/WhatsApp Image 2026-01-12 at 07.09.00 (5).jpeg';
import sketch05 from '../assets/sketches/WhatsApp Image 2026-01-12 at 07.09.04.jpeg';
import sketch06 from '../assets/sketches/WhatsApp Image 2026-01-12 at 07.09.05 (5).jpeg';
import sketch07 from '../assets/sketches/WhatsApp Image 2026-01-12 at 07.09.06 (5).jpeg';
import sketch08 from '../assets/sketches/WhatsApp Image 2026-01-12 at 07.09.07 (1).jpeg';
import sketch09 from '../assets/sketches/WhatsApp Image 2026-01-12 at 07.09.09 (2).jpeg';
import sketch10 from '../assets/sketches/WhatsApp Image 2026-01-12 at 07.09.09 (3).jpeg';
import sketch11 from '../assets/sketches/WhatsApp Image 2026-01-12 at 07.09.10 (5).jpeg';
import sketch12 from '../assets/sketches/WhatsApp Image 2026-01-12 at 07.09.11.jpeg';
import sketch13 from '../assets/sketches/WhatsApp Image 2026-01-12 at 07.09.12 (1).jpeg';
import sketch14 from '../assets/sketches/WhatsApp Image 2026-01-12 at 07.09.12.jpeg';
import sketch15 from '../assets/sketches/WhatsApp Image 2026-01-12 at 07.10.28 (1).jpeg';

const experiences = [
  {
    company: 'North Carolina State University',
    role: 'Graduate Research Assistant',
    dates: 'Sep 2025 - Present',
    summary:
      'At NC State, I build LLM tools for a live programming education app, working directly with the professors who use them. My main project is a system that writes grading rubrics: a professor enters a title, the topics, the problem statement and total marks, and it pulls the matching course material (LangChain, sentence embeddings, ChromaDB) and has GPT-3.5 draft a complete rubric grounded in it, so nobody has to write each one by hand. It runs as a FastAPI service in Docker, and about 20 professors have used and tested it. Their feedback shaped most of the design. On the research side, I study whether stronger chain-of-thought reasoning makes LLM representations more separable, by building CoT-conditioned embeddings across several models and measuring them with k-nearest-neighbor and clustering metrics.',
  },
  {
    company: 'Columbia Irving Medical Center',
    role: 'Research Intern',
    dates: 'May 2026 - Aug 2026',
    summary:
      'This summer I worked with Dr. Tian at Columbia on what single-cell RNA-seq data can tell us about disease. I built a transformer-based single-cell encoder, similar to scGPT, that turns each cell into an embedding, and used those embeddings for differential expression analysis across cancer, TNBC, COVID-19 and Alzheimer\'s datasets. On top of that, I trained an attention-based multiple-instance learning model that looks at all of a patient\'s cells together to classify the patient. It reached 95% accuracy and 0.94 AUROC on a held-out cancer cohort. I also tracked down the cause of unstable gradients in a contrastive model so it trained reliably, and set up stratified cross-validation with MLflow so results were reproducible across datasets.',
  },
  {
    company: 'Tata Consultancy Services',
    role: 'Systems Engineer',
    dates: 'Jul 2022 - Aug 2025',
    summary:
      'At Tata Consultancy Services, I built a production ML pipeline that read about 500 scanned invoices a day, replacing the manual work of people reading each one. I fine-tuned LayoutLMv3 alongside OCR to pull 10+ key fields from every invoice, then added a validation step that didn\'t exist before: statistical checks on each field plus fuzzy matching of vendor names against the ERP database. With it, 89% of invoices went through with no human fix. To keep up with the daily volume, I benchmarked TorchServe settings, added dynamic batching and exported the model to ONNX, which cut inference from over a second to 450 ms. The pipeline ran on AWS, and I shipped updates through CI/CD in small, tested releases as part of an Agile team.',
  },
];

const works = [
  {
    slug: 'unspoken',
    github: 'https://github.com/Aum3010/unspoken-nvidia-small-models-hack',
    title: 'Unspoken: Communication for Non-Speaking Patients',
    period: 'Hackathon · Winner',
    description:
      'An assistive system that turns weak voice, silent lip movements, eye tracking and deliberate blinks or nods into spoken text, for people who understand but cannot speak.',
    tags: ['PyTorch', 'vLLM', 'Multimodal', 'FastAPI'],
    fullDescription:
      'Unspoken is for people who understand everything around them but can no longer speak. It combines whatever signals they can still give, like a weak voice, silent lip movements, eye tracking and deliberate blinks or nods, into a phrase, and the person confirms it before it is spoken aloud. Each signal has its own small PyTorch model, and when the models disagree an NVIDIA Nemotron LLM served on vLLM acts as the coordinator, all sharing a single GPU. In loud noise, lips plus voice understood 76% of phrases compared to 8% with voice alone, which is exactly the gap we built it for. The models are served through FastAPI and WebSocket services, and under load testing vLLM handled 64 simultaneous requests with zero errors. It won the hackathon.',
    skills: ['PyTorch', 'vLLM', 'NVIDIA Nemotron', 'FastAPI', 'WebSockets', 'Eye Tracking'],
  },
  {
    slug: 'f1-pit-strategy',
    github: 'https://github.com/yashdive/pitwall-ml',
    title: 'F1 Pit Strategy',
    period: 'ML Systems Project',
    description:
      'A production-style ML system that predicts tyre degradation during a Formula 1 race and decides whether a driver should pit.',
    tags: ['XGBoost', 'Feature Store', 'Docker', 'AWS'],
    fullDescription:
      'This system predicts how a Formula 1 car\'s tyres degrade during a race and decides whether the driver should pit. The model is XGBoost trained on engineered lap, tyre, stint and track-condition features, and it reaches 86% accuracy. Most of the work went into treating it like a real production system. Data comes in through streaming ingestion into a point-in-time feature store, so the model only ever trains on information that would have been available at prediction time, which keeps data leakage out. It runs in Docker on AWS with automated retraining and drift monitoring, and new models go out in shadow deployment first, so they can be tested on live data without affecting the predictions anyone sees.',
    skills: ['XGBoost', 'Feature Engineering', 'Feature Store', 'Drift Monitoring', 'Docker', 'AWS'],
  },
  {
    slug: 'street-view-building-classification',
    github: 'https://github.com/yashdive/GIC_TEST_A',
    title: 'Street-View Building Type Classification',
    period: 'Computer Vision Project',
    description:
      'A vision system that sorts buildings into five types from about 24K Street View images, combining CLIP, GroundingDINO and OCR.',
    tags: ['CLIP', 'GroundingDINO', 'OCR', 'Computer Vision'],
    fullDescription:
      'This project classifies buildings into five types from about 24K Google Street View images. No single model was reliable enough, so it combines three signals: CLIP ViT-B/32 for whole-image classification, GroundingDINO to detect telling objects, and OCR to read signs. All the results for a location are then aggregated into one final label. To know what actually helped, I built a ground-truth set with manual and LLM-assisted labeling and evaluated each component one at a time, keeping only the parts that improved accuracy. The final system reached 87% precision and 89% recall.',
    skills: ['CLIP', 'GroundingDINO', 'OCR', 'Ensembling', 'Evaluation Design'],
  },
  {
    slug: 'multimodal-single-cell-instance-classification',
    github: 'https://github.com/yashdive/mosic_ncsu',
    title: 'MoSIC: Multimodal Single-cell Instance Classification',
    period: 'Research Internship',
    description:'A deep learning model that integrates scRNA-seq and scATAC-seq data to classify cell types with high accuracy.',
    tags: ['scRNA-seq', 'scATAC-seq', 'Multiple Instance Learning','Attention Mechanism', 'Transformers'],
    fullDescription:
      'MoSIC came out of my research internship at Columbia Irving Medical Center. It integrates scRNA-seq and scATAC-seq data to classify cells, using a transformer-based single-cell encoder to turn each cell into an embedding and attention-based multiple-instance learning on top. The attention weights also show which cells drive a prediction, which is what makes the model useful to researchers and not just accurate.',
    skills: ['PyTorch', 'Transformers', 'Multiple Instance Learning', 'Attention', 'MLflow'],
  },
  {
    slug: 'poultry-disease-classifier',
    github: 'https://github.com/yashdive/poultry-disease-classifier',
    title: 'Poultry Disease Classifier',
    period: 'Academic Project',
    description:
      'An image classifier that identifies six poultry diseases with a reproducible MLOps pipeline.',
    tags: ['ResNet50', 'Computer Vision', 'MLOps'],
    fullDescription:
      'This is an image classification model that identifies six poultry diseases from photographs, built with a full MLOps pipeline for reproducibility. I used transfer learning on ResNet50, replaced the final layer for six classes, and created a custom augmentation pipeline in PyTorch/TensorFlow with random flips, rotations, and brightness shifts to handle limited data. ResNet50 extracts visual features, a custom head maps them to disease classes, and GitHub Actions CI runs automated validation on every change. DVC versioned datasets and MLflow tracked 30+ runs so every experiment is tied to exact data and hyperparameters. The model reached 89% validation accuracy, and I learned that augmentation strategy matters as much as architecture and that MLOps tooling saves substantial time when comparing runs.',
    skills: ['ResNet50', 'Transfer Learning', 'DVC', 'MLflow', 'GitHub Actions'],
  },
];

const researchItems = [
  {
    title: 'A Smart Tile with a Health Monitoring Device',
    area: 'Issued by: Government of India',
    proof: 'Patent No. 551932',
    summary:
      'This is my granted patent for a smart-tile based home health monitoring system. The invention embeds a temperature sensor, fall detection logic, and an accelerometer into smart tiles, then processes signals via a microcontroller and IoT pipeline to alert authorized users during abnormal events. We designed it to help families monitor elderly people and children at home without interrupting their daily routine.',
  },
  {
    title: 'Innovating Remote Learning: The Next Frontier in Education and Experimentation',
    area: 'IGI Global',
    summary:
      'Research publication focused on innovation in remote learning and the evolving intersection of education, technology, and experimentation.',
    url: 'https://www.igi-global.com/viewtitlesample.aspx?id=373613&ptid=352050&t=Innovating%20Remote%20Learning:%20The%20Next%20Frontier%20in%20Education%20and%20Experimentation&isxn=9798369385937',
  },
  {
    title: 'IJCSE Research Paper',
    area: 'International Journal of Computer Sciences and Engineering',
    summary:
      'In this paper, we built a multilingual university chatbot that can answer student queries naturally. We used NLP and cosine similarity to find the most relevant responses, and added speech-to-text plus translation support so it is easier for more students to use. The goal was to make university information accessible online, especially when visiting campus was difficult during the pandemic.',
    url: 'https://ijcseonline.org/index.php/j/article/view/6390',
  },
  {
    title: 'HBRP Research Paper',
    area: 'Journal of Advancement in Software Engineering and Testing',
    summary:
      'In this paper, we focused on solving a real pandemic-era problem: students could not travel to campuses for basic academic information. We proposed a university-focused chatbot that can be accessed anytime on the college website, supports multiple users, and provides details like fees, schedules, and department-related queries. The system is designed with AI/ML and supports multilingual input and output for broader accessibility.',
    url: 'http://hbrppublication.com/OJS/index.php/JASET/article/view/2175',
  },
];

const sketches = [
  { src: sketch01, alt: 'Sketch 1' },
  { src: sketch02, alt: 'Sketch 2' },
  { src: sketch03, alt: 'Sketch 3' },
  { src: sketch04, alt: 'Sketch 4' },
  { src: sketch05, alt: 'Sketch 5' },
  { src: sketch06, alt: 'Sketch 6' },
  { src: sketch07, alt: 'Sketch 7' },
  { src: sketch08, alt: 'Sketch 8' },
  { src: sketch09, alt: 'Sketch 9' },
  { src: sketch10, alt: 'Sketch 10' },
  { src: sketch11, alt: 'Sketch 11' },
  { src: sketch12, alt: 'Sketch 12' },
  { src: sketch13, alt: 'Sketch 13' },
  { src: sketch14, alt: 'Sketch 14' },
  { src: sketch15, alt: 'Sketch 15' },
];

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/yashdive',
    path: 'M12 .5a12 12 0 0 0-3.79 23.38c.6.11.82-.26.82-.58v-2.05c-3.34.72-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.74-1.33-1.74-1.09-.75.08-.73.08-.73 1.2.09 1.83 1.22 1.83 1.22 1.07 1.82 2.8 1.29 3.48.99.11-.76.42-1.29.76-1.58-2.67-.3-5.47-1.32-5.47-5.87 0-1.3.47-2.37 1.23-3.2-.12-.3-.53-1.53.12-3.19 0 0 1.01-.32 3.3 1.22a11.6 11.6 0 0 1 6 0c2.29-1.54 3.29-1.22 3.29-1.22.65 1.66.24 2.89.12 3.19.77.83 1.23 1.9 1.23 3.2 0 4.56-2.8 5.57-5.47 5.87.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 12 .5Z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    path: 'M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.55a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/yash2131',
    path: 'M6.94 8.5a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM5.4 9.8h3.1V19H5.4V9.8Zm5.1 0h3v1.26h.04c.41-.78 1.44-1.6 2.96-1.6 3.16 0 3.74 2.08 3.74 4.78V19h-3.1v-4.2c0-1 0-2.28-1.39-2.28-1.4 0-1.62 1.08-1.62 2.2V19h-3.1V9.8Z',
  },
  {
    label: 'Email',
    href: 'mailto:yash.b.m.v@gmail.com',
    path: 'M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.4l9 5.4 9-5.4V7H3Zm18 10V9.73l-8.48 5.1a1 1 0 0 1-1.04 0L3 9.73V17h18Z',
  },
];

const navLinkClass =
  'body-text text-muted transition-all duration-500 ease-out hover:-translate-y-0.5 hover-soft';
const socialIconClass =
  'inline-flex h-12 w-12 items-center justify-center text-muted transition-all duration-500 ease-out hover:-translate-y-0.5 hover-soft';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [timelineTarget, setTimelineTarget] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');
  const [activeSketch, setActiveSketch] = useState(null);
  const [sketchMotion, setSketchMotion] = useState(null);
  const experienceRef = useRef(null);
  const nextSectionRef = useRef(null);
  const modalContentRef = useRef(null);

  const selectedWork = currentHash.startsWith('#project/')
    ? works.find((work) => `#project/${work.slug}` === currentHash)
    : null;

  const slowScrollToHash = (hash) => {
    const target = document.querySelector(hash);
    if (!target) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const navOffset = 96;
    const startY = window.scrollY;
    const endY = target.getBoundingClientRect().top + window.scrollY - navOffset;

    if (prefersReducedMotion) {
      window.scrollTo(0, endY);
      window.location.hash = hash;
      return;
    }

    const duration = 1400;
    const startTime = performance.now();
    const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeInOut(progress);
      const nextY = startY + (endY - startY) * eased;
      window.scrollTo(0, nextY);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        window.location.hash = hash;
      }
    };

    requestAnimationFrame(tick);
  };

  const handleSlowNav = (e, hash) => {
    e.preventDefault();
    slowScrollToHash(hash);
  };

  useEffect(() => {
    const onHashChange = () => setCurrentHash(window.location.hash || '#home');
    window.addEventListener('hashchange', onHashChange);

    const updateScrollState = () => {
      setScrolled(window.scrollY > 8);

      if (!experienceRef.current) return;
      const viewport = window.innerHeight || 1;
      const scrollY = window.scrollY || window.pageYOffset;

      const experienceTop = experienceRef.current.offsetTop;
      const nextTop = nextSectionRef.current
        ? nextSectionRef.current.offsetTop
        : experienceTop + experienceRef.current.offsetHeight;

      // Dynamically map fill from experience-entering viewport to next-section entering viewport.
      const start = experienceTop - viewport * 0.9;
      const end = nextTop - viewport * 0.15;
      const denominator = Math.max(1, end - start);
      const raw = ((scrollY - start) / denominator) * 100;
      const clamped = Math.max(0, Math.min(100, raw));
      setTimelineTarget(clamped);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  useEffect(() => {
    let frameId;

    const animate = () => {
      setTimelineProgress((current) => {
        const next = current + (timelineTarget - current) * 0.06;
        if (Math.abs(next - timelineTarget) < 0.08) return timelineTarget;
        return next;
      });
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [timelineTarget]);

  useEffect(() => {
    if (activeSketch) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
    return undefined;
  }, [activeSketch]);

  useEffect(() => {
    if (!activeSketch) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveSketch(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSketch]);

  useEffect(() => {
    if (!activeSketch || !modalContentRef.current || !activeSketch.rect) {
      setSketchMotion(null);
      return;
    }

    const updateMotion = () => {
      const modalRect = modalContentRef.current.getBoundingClientRect();
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;
      const fromCenterX = activeSketch.rect.left + activeSketch.rect.width / 2;
      const fromCenterY = activeSketch.rect.top + activeSketch.rect.height / 2;
      const deltaX = fromCenterX - viewportCenterX;
      const deltaY = fromCenterY - viewportCenterY;
      const scaleX = activeSketch.rect.width / modalRect.width;
      const scaleY = activeSketch.rect.height / modalRect.height;
      const scale = Math.min(scaleX, scaleY, 1);

      setSketchMotion({
        x: `${deltaX.toFixed(2)}px`,
        y: `${deltaY.toFixed(2)}px`,
        scale: scale.toFixed(3),
      });
    };

    const rafId = requestAnimationFrame(updateMotion);
    return () => cancelAnimationFrame(rafId);
  }, [activeSketch]);

  useEffect(() => {
    if (selectedWork) window.scrollTo(0, 0);
  }, [selectedWork]);

  if (selectedWork) {
    return (
      <div className="min-h-screen w-full app-root px-4 pb-14 pt-12 md:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <button
            type="button"
            onClick={() => {
              window.location.hash = '#my-work';
            }}
            className="mb-8 body-text text-link transition-colors duration-300 hover-soft"
          >
            ← Back to My Work
          </button>

          <p className="body-text text-muted">{selectedWork.period}</p>
          <h1 className="mt-2 heading-2 tracking-tight text-primary">
            {selectedWork.title}
          </h1>

          <div className="mt-6 card p-6 sm:p-7">
            <p className="body-text text-primary">
              {selectedWork.fullDescription}
            </p>
            <div className="mt-6">
              <p className="body-text text-muted uppercase tracking-[0.22em]">
                Skills
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {selectedWork.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-subtle px-3 py-1 body-text text-muted"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
            {selectedWork.github ? (
              <a
                href={selectedWork.github}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block body-text text-link transition-colors duration-300 hover-soft"
              >
                View on GitHub ↗
              </a>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden app-root px-4 pb-14 md:px-10 lg:px-16">
      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b px-4 pb-5 pt-4 transition-all duration-300 md:px-10 lg:px-16 ${
          scrolled ? 'nav-scrolled' : 'nav-clear'
        }`}
      >
        <a
          href="#home"
          onClick={(e) => handleSlowNav(e, '#home')}
          className="heading-4 text-primary lowercase tracking-tight transition-colors duration-500 ease-out hover-soft"
        >
          yash dive
        </a>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#home" onClick={(e) => handleSlowNav(e, '#home')} className={navLinkClass}>
            Home
          </a>
          <a href="#contact" onClick={(e) => handleSlowNav(e, '#contact')} className={navLinkClass}>
            Contact
          </a>
        </div>
      </nav>
      <div className="h-28" />

      <header
        id="home"
        className="grid min-h-[72vh] grid-cols-1 items-center gap-6 pb-12 pt-8 md:grid-cols-[1fr_minmax(240px,34vw)]"
      >
        <div className="flex min-h-full max-w-[560px] flex-col items-center justify-center gap-5 md:items-center">
          <p className="hero-name text-primary lowercase tracking-tight text-center">
            yash dive
          </p>

          <div className="mt-2 flex w-full max-w-[520px] flex-wrap justify-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noreferrer' })}
                className={socialIconClass}
                aria-label={link.label}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[22px] w-[22px] fill-current">
                  <path d={link.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <figure className="flex flex-col items-center">
          <img
            src={profileImage}
            alt="The first page of the paper Attention Is All You Need"
            className="aspect-[5/4] w-full max-w-[560px] object-cover image-pop"
          />
          <figcaption className="mt-3 w-full max-w-[560px] text-center body-text text-muted italic">
            Attention Is All You Need. I love this paper. It kind of changed everything, and
            it&apos;s the first thing I&apos;d recommend anyone read.
          </figcaption>
        </figure>
      </header>

      <main>
        <section id="work" className="grid grid-cols-1 items-center gap-6 border-t border-subtle pt-8 lg:grid-cols-2">
          <figure className="flex flex-col items-center lg:items-start">
            <img
              src={transformerImage}
              alt="Diagram of the Transformer architecture"
              className="w-full max-w-[460px] object-contain"
            />
            <figcaption className="mt-3 w-full max-w-[460px] text-center body-text text-muted italic">
              The Transformer architecture. It changed everything too, and it&apos;s my
              favourite diagram.
            </figcaption>
          </figure>
          <div>
            <div className="max-w-[60ch] space-y-4 body-text text-muted">
              <p>I think hope is the best tool a man can have. Stopping is not an option and until death all defeat is psychological.</p>
              <p>
                When I learn something new, I wanna build it and see it work. I like turning
                theory into programs and ideas into real systems.
              </p>
              <p>
                Right now, I&apos;m pursuing my master&apos;s at North Carolina State
                University (graduating May 2027), where I build LLM tools for teaching and
                research how language models represent reasoning.
              </p>
              <p>
                For me, computer science is a way to turn ideas into things that can grow and
                last.
              </p>
            </div>
          </div>
        </section>

        <section
          id="experience"
          ref={experienceRef}
          className="mt-12 border-t border-subtle pt-8"
        >
          <h2 className="mb-8 text-center heading-2 text-primary">
            My Experiences
          </h2>

          <div className="relative mx-auto max-w-5xl px-6 sm:px-10">
            <div className="absolute left-3 top-1 h-[calc(100%-0.5rem)] w-px timeline-track" />
            <div
              className="absolute left-3 top-1 w-px timeline-progress"
              style={{ height: `${timelineProgress}%` }}
            />

            <div className="space-y-10">
              {experiences.map((item, index) => {
                const threshold = ((index + 0.35) / experiences.length) * 100;
                const active = timelineProgress >= threshold;

                return (
                <article
                  key={`${item.company}-${item.role}`}
                  className="relative p-5 transition-all duration-500 ease-out card-outline"
                >
                  <h3 className="heading-3 text-primary">{item.company}</h3>
                  <p className="mt-2 body-text text-muted">
                    {item.role} · {item.dates}
                  </p>
                  <p className="mt-4 w-full body-text text-muted">
                    {item.summary}
                  </p>
                </article>
              )})}
            </div>
          </div>
        </section>

        <section id="my-work" ref={nextSectionRef} className="mt-12 border-t border-subtle pt-8">
          <h2 className="mb-8 text-center heading-2 text-primary">
            Check Out My Work
          </h2>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 px-2 py-4">
            {works.map((item) => (
              <article
                key={item.title}
                className="flex min-h-[340px] flex-col card-outline p-6"
              >
                <p className="body-text text-muted">{item.period}</p>
                <h3 className="mt-2 heading-3 text-primary">{item.title}</h3>
                <p className="mt-4 body-text text-muted">{item.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-subtle px-3 py-1 body-text text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      window.location.hash = `#project/${item.slug}`;
                    }}
                    className="body-text text-link transition-colors duration-300 hover-soft"
                  >
                    View Details →
                  </button>
                  {item.github ? (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noreferrer"
                      className="body-text text-link transition-colors duration-300 hover-soft"
                    >
                      GitHub ↗
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="research" className="mt-12 border-t border-subtle pt-8">
          <h2 className="mb-8 text-center heading-2 text-primary">
            Some Side Research Quests
          </h2>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5">
            {researchItems.map((item) => (
              <article
                key={item.title}
                className="card-outline p-6"
              >
                <p className="body-text text-muted">{item.area}</p>
                <h3 className="mt-2 heading-3 text-primary">{item.title}</h3>
                <p className="mt-4 body-text text-muted">
                  {item.summary}
                </p>
                {item.proof ? (
                  <p className="mt-4 body-text text-muted">{item.proof}</p>
                ) : null}
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-block body-text text-link transition-colors duration-300 hover-soft"
                  >
                    Read Paper →
                  </a>
                ) : (
                  <p className="mt-6 body-text text-muted">Granted Patent</p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="sketches" className="mt-12 border-t border-subtle pb-12 pt-8">
          <h2 className="mb-8 text-center heading-2 text-primary">
            and of course, some sketches I did for fun and cause I could...
          </h2>

          <div className="mx-auto grid w-full grid-cols-3 gap-14 px-2 sketch-grid">
            {sketches.map((sketch) => (
              <figure key={sketch.src} className="sketch-card">
                <button
                  type="button"
                  className="sketch-button"
                  onClick={(event) => {
                    const img = event.currentTarget.querySelector('img');
                    const rect = img ? img.getBoundingClientRect() : null;
                    setActiveSketch(rect ? { ...sketch, rect } : sketch);
                  }}
                >
                  <img
                    src={sketch.src}
                    alt={sketch.alt}
                    className="aspect-[2/3] w-[64%] object-cover mx-auto sketch-image"
                    loading="lazy"
                  />
                </button>
              </figure>
            ))}
          </div>
        </section>

      </main>

      {activeSketch ? (
        <div className="sketch-modal" role="dialog" aria-modal="true">
          <button
            type="button"
            className="sketch-modal-backdrop"
            aria-label="Close sketch preview"
            onClick={() => setActiveSketch(null)}
          />
          <div
            ref={modalContentRef}
            className="sketch-modal-content"
            style={
              sketchMotion
                ? {
                  '--sketch-from-x': sketchMotion.x,
                  '--sketch-from-y': sketchMotion.y,
                  '--sketch-from-scale': sketchMotion.scale,
                }
                : undefined
            }
          >
            <button
              type="button"
              className="sketch-modal-close"
              aria-label="Close sketch preview"
              onClick={() => setActiveSketch(null)}
            >
              ×
            </button>
            <img
              src={activeSketch.src}
              alt={activeSketch.alt}
              className="sketch-modal-image"
            />
          </div>
        </div>
      ) : null}

      <footer id="contact" className="mt-10 flex justify-center border-t border-subtle pt-4">
        <div className="flex items-center gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noreferrer' })}
              className="inline-flex h-9 w-9 items-center justify-center text-muted transition-colors duration-500 ease-out hover-soft"
              aria-label={link.label}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
                <path d={link.path} />
              </svg>
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
