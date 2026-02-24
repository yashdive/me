import { useEffect, useRef, useState } from 'react';
import profileImage from '../assets/attention.jpg';
import transformerImage from '../assets/transformer1.png';

const experiences = [
  {
    company: 'Game2Learn Labs',
    role: 'Student Researcher',
    dates: 'Sep 2025 - Dec 2025',
    summary:
      'At Game2Learn Labs, I built an end-to-end LLM-powered rubric generation system for Snapclass, a block-based programming platform, to help instructors evaluate student work more consistently and efficiently. I designed and fine-tuned the model using over 500 labeled student submissions so it could distinguish between partial solutions, conceptual misunderstandings, and complete implementations. The system was deployed as a web application used by instructors and over 150 students, generating real-time evaluation rubrics that aligned with instructor expectations 92% of the time, reduced manual grading effort by 65%, and improved grading consistency from 72% to 89%.',
  },
  {
    company: 'Tata Consultancy Services',
    role: 'Software Engineer',
    dates: 'Jan 2022 - Aug 2025',
    summary:
      'At Tata Consultancy Services, I built an AI-powered Invoice Validation System from the ground up to automate billing compliance across large-scale enterprise workflows. I combined a BERT-based classifier with a configurable rule engine and developed a spaCy NER pipeline to extract key invoice entities with high precision, transforming unstructured data into actionable insights and significantly reducing false positives. I architected and deployed the system on AWS with Airflow-based orchestration, automated retraining for data drift, and real-time monitoring to ensure reliability in production. Alongside the ML system, I led development of a Contract and Demand Management dashboard used across multiple business units, designed secure and scalable REST APIs, optimized database performance through indexing and caching, and built CI/CD pipelines that accelerated releases and improved system stability. Together, this work reduced manual review effort, improved operational efficiency, and delivered a robust, production-grade platform handling high daily traffic.'
  },
];

const works = [
  {
    slug: 'llm-rubric-generation',
    title: 'LLM Rubric Generation System',
    period: '2025',
    description:
      'Designed and shipped a GPT-4 based rubric generation workflow for block-based coding assignments with high instructor alignment and lower manual grading effort.',
    tags: ['GPT-4', 'Evaluation', 'EdTech'],
    details: [
      'Built an end-to-end rubric generation pipeline for Snapclass to evaluate block-based student submissions consistently.',
      'Fine-tuned behavior using curated instructor examples and 500+ labeled submissions to improve rubric specificity.',
      'Integrated the system into grading workflows used by instructors and 150+ students with real-time rubric generation.',
      'Improved alignment with instructor expectations and reduced manual grading time while increasing grading consistency.',
    ],
  },
  {
    slug: 'ai-invoice-validation',
    title: 'AI Invoice Validation Platform',
    period: '2022 - 2025',
    description:
      'Built an enterprise invoice validation stack with classifier + rules + NER extraction, deployed on AWS with retraining and monitoring for production reliability.',
    tags: ['BERT', 'spaCy', 'AWS'],
    details: [
      'Designed a hybrid system combining ML classification, rules, and NER extraction for invoice compliance.',
      'Implemented backend APIs and model-serving services for high-volume enterprise validation workflows.',
      'Deployed on AWS with orchestration, retraining strategy, and monitoring for reliability under production traffic.',
      'Reduced false positives and manual review effort through iterative model and pipeline improvements.',
    ],
  },
  {
    slug: 'contract-demand-dashboard',
    title: 'Contract & Demand Dashboard',
    period: '2024',
    description:
      'Developed secure backend APIs and analytics workflows for operations teams, with optimization and CI/CD improvements to speed up releases.',
    tags: ['REST APIs', 'CI/CD', 'Performance'],
    details: [
      'Built secure REST services with role-based access and robust data contracts for operations use cases.',
      'Improved query performance via indexing, caching, and endpoint-level optimizations for better responsiveness.',
      'Designed CI/CD workflows with quality checks and deployment automation to shorten release cycles.',
      'Delivered a more reliable and maintainable backend platform for cross-team dashboard usage.',
    ],
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

const navLinkClass =
  'text-base text-zinc-400 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:text-zinc-300';
const socialIconClass =
  'inline-flex h-12 w-12 items-center justify-center text-zinc-400 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:text-zinc-300';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [timelineTarget, setTimelineTarget] = useState(0);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#home');
  const experienceRef = useRef(null);
  const nextSectionRef = useRef(null);

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

  if (selectedWork) {
    return (
      <div className="min-h-screen w-full bg-black px-4 pb-14 pt-12 text-zinc-400 md:px-10 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <button
            type="button"
            onClick={() => {
              window.location.hash = '#my-work';
            }}
            className="mb-8 text-sm font-semibold text-zinc-400 transition-colors duration-300 hover:text-zinc-300"
          >
            ← Back to My Work
          </button>

          <p className="text-sm text-zinc-500">{selectedWork.period}</p>
          <h1 className="mt-2 text-[clamp(2rem,4.8vw,3.4rem)] font-semibold tracking-tight text-zinc-300">
            {selectedWork.title}
          </h1>

          <p className="mt-6 max-w-[70ch] text-lg leading-relaxed text-zinc-400">
            {selectedWork.description}
          </p>

          <ul className="mt-8 space-y-4">
            {selectedWork.details.map((point) => (
              <li key={point} className="rounded-xl bg-zinc-950/45 p-4 leading-relaxed text-zinc-400">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-black px-4 pb-14 text-zinc-400 md:px-10 lg:px-16">
      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b px-4 pb-5 pt-4 transition-all duration-300 md:px-10 lg:px-16 ${
          scrolled
            ? 'border-zinc-800/70 bg-zinc-950/45 backdrop-blur-md'
            : 'border-zinc-900 bg-transparent'
        }`}
      >
        <a
          href="#home"
          onClick={(e) => handleSlowNav(e, '#home')}
          className="text-lg font-semibold lowercase tracking-tight text-zinc-400 transition-colors duration-500 ease-out hover:text-zinc-300"
        >
          yash dive
        </a>
        <div className="flex flex-wrap font-semibold items-center gap-4">
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
        <div className="flex min-h-full max-w-[560px] flex-col justify-center gap-5">
          <p className="whitespace-nowrap text-[clamp(3.2rem,11vw,8.8rem)] font-semibold lowercase leading-[0.9] tracking-[-0.03em] text-zinc-400">
            yash dive
          </p>

          <div className="mt-2 flex w-full max-w-[520px] flex-wrap justify-center gap-3">
            <a href="https://github.com/" target="_blank" rel="noreferrer" className={socialIconClass} aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[22px] w-[22px] fill-current">
                <path d="M12 .5a12 12 0 0 0-3.79 23.38c.6.11.82-.26.82-.58v-2.05c-3.34.72-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.74-1.33-1.74-1.09-.75.08-.73.08-.73 1.2.09 1.83 1.22 1.83 1.22 1.07 1.82 2.8 1.29 3.48.99.11-.76.42-1.29.76-1.58-2.67-.3-5.47-1.32-5.47-5.87 0-1.3.47-2.37 1.23-3.2-.12-.3-.53-1.53.12-3.19 0 0 1.01-.32 3.3 1.22a11.6 11.6 0 0 1 6 0c2.29-1.54 3.29-1.22 3.29-1.22.65 1.66.24 2.89.12 3.19.77.83 1.23 1.9 1.23 3.2 0 4.56-2.8 5.57-5.47 5.87.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 12 .5Z" />
              </svg>
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className={socialIconClass} aria-label="Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[22px] w-[22px] fill-current">
                <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.55a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
              </svg>
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className={socialIconClass} aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[22px] w-[22px] fill-current">
                <path d="M6.94 8.5a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM5.4 9.8h3.1V19H5.4V9.8Zm5.1 0h3v1.26h.04c.41-.78 1.44-1.6 2.96-1.6 3.16 0 3.74 2.08 3.74 4.78V19h-3.1v-4.2c0-1 0-2.28-1.39-2.28-1.4 0-1.62 1.08-1.62 2.2V19h-3.1V9.8Z" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="mailto:youremail@example.com" className={socialIconClass} aria-label="Email">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[22px] w-[22px] fill-current">
                <path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.4l9 5.4 9-5.4V7H3Zm18 10V9.73l-8.48 5.1a1 1 0 0 1-1.04 0L3 9.73V17h18Z" />
              </svg>
              <span className="sr-only">Mail</span>
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={profileImage}
            alt="Yash Dive portrait"
            className="aspect-[5/4] w-full max-w-[560px] object-cover"
          />
        </div>
      </header>

      <main>
        <section id="work" className="grid grid-cols-1 items-center gap-6 border-t border-zinc-900 pt-8 lg:grid-cols-2">
          <div className="flex justify-center lg:justify-start">
            <img
              src={transformerImage}
              alt="Transformer architecture graphic"
              className="w-full max-w-[460px] object-contain"
            />
          </div>
          <div>
            <div className="max-w-[60ch] space-y-4 text-lg font-semibold leading-relaxed text-zinc-400">
              <p>
                I didn&apos;t fall in love with computer science because of code. I loved the idea
                that a thought can become something real, a system or solution that didn&apos;t exist
                before.
              </p>
              <p>
                When I learn something new, I wanna build it and see it work. I like turning
                theory into programs and ideas into real systems. Contributing to open source and
                designing projects is how I learn and understand the world.
              </p>
              <p>
                Right now, I&apos;m on a new adventure pursuing my master&apos;s at North Carolina State
                University, exploring parts of the computing world I always wanted to reach.
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
          className="mt-12 border-t border-zinc-900 pt-8"
        >
          <h2 className="mb-8 text-center text-[clamp(2rem,4.8vw,3.2rem)] tracking-[-0.015em] text-zinc-400">
            My Experiences
          </h2>

          <div className="relative mx-auto max-w-5xl pl-10 pr-10">
            <div className="absolute left-3 top-1 h-[calc(100%-0.5rem)] w-px bg-zinc-900" />
            <div
              className="absolute left-3 top-1 w-px bg-zinc-400"
              style={{ height: `${timelineProgress}%` }}
            />

            <div className="space-y-10">
              {experiences.map((item, index) => {
                const threshold = ((index + 0.35) / experiences.length) * 100;
                const active = timelineProgress >= threshold;

                return (
                <article
                  key={`${item.company}-${item.role}`}
                  className={`relative rounded-2xl p-5 transition-all duration-500 ease-out ${
                    active
                      ? 'bg-zinc-950/70'
                      : 'bg-zinc-950/35'
                  }`}
                >
                  <h3 className="text-2xl font-semibold text-zinc-300">{item.company}</h3>
                  <p className="mt-2 text-lg font-semibold text-zinc-400/90">
                    {item.role} · {item.dates}
                  </p>
                  <p className="mt-4 max-w-[70ch] text-lg font-semibold leading-relaxed text-zinc-400/95">
                    {item.summary}
                  </p>
                </article>
              )})}
            </div>
          </div>
        </section>

        <section id="my-work" ref={nextSectionRef} className="mt-12 border-t border-zinc-900 pt-8">
          <h2 className="mb-8 text-center text-[clamp(2rem,4.8vw,3.2rem)] tracking-[-0.015em] text-zinc-400">
            Check Out My Work
          </h2>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 px-2 py-4">
            {works.map((item) => (
              <article
                key={item.title}
                className="flex min-h-[340px] flex-col rounded-2xl border border-zinc-800 bg-zinc-950/45 p-6"
              >
                <p className="text-sm text-zinc-500">{item.period}</p>
                <h3 className="mt-2 text-3xl font-semibold text-zinc-300">{item.title}</h3>
                <p className="mt-4 text-lg font-semibold leading-relaxed text-zinc-400">{item.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-400"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    window.location.hash = `#project/${item.slug}`;
                  }}
                  className="mt-auto pt-6 text-sm font-semibold text-zinc-400 transition-colors duration-300 hover:text-zinc-300"
                >
                  View Details →
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="research" className="mt-12 border-t border-zinc-900 pt-8">
          <h2 className="mb-8 text-center text-[clamp(2rem,4.8vw,3.2rem)] tracking-[-0.015em] text-zinc-400">
            Some Side Research Quests
          </h2>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5">
            {researchItems.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-zinc-800 bg-zinc-950/45 p-6"
              >
                <p className="text-sm font-semibold text-zinc-500">{item.area}</p>
                <h3 className="mt-2 text-2xl font-semibold text-zinc-300">{item.title}</h3>
                <p className="mt-4 text-lg font-semibold leading-relaxed text-zinc-400">
                  {item.summary}
                </p>
                {item.proof ? (
                  <p className="mt-4 text-sm font-semibold text-zinc-500">{item.proof}</p>
                ) : null}
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-block text-sm font-semibold text-zinc-400 transition-colors duration-300 hover:text-zinc-300"
                  >
                    Read Paper →
                  </a>
                ) : (
                  <p className="mt-6 text-sm font-semibold text-zinc-500">Granted Patent</p>
                )}
              </article>
            ))}
          </div>
        </section>

      </main>

      <footer id="contact" className="mt-10 flex justify-center border-t border-zinc-900 pt-4">
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center text-zinc-400 transition-colors duration-500 ease-out hover:text-zinc-300"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
              <path d="M12 .5a12 12 0 0 0-3.79 23.38c.6.11.82-.26.82-.58v-2.05c-3.34.72-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.74-1.33-1.74-1.09-.75.08-.73.08-.73 1.2.09 1.83 1.22 1.83 1.22 1.07 1.82 2.8 1.29 3.48.99.11-.76.42-1.29.76-1.58-2.67-.3-5.47-1.32-5.47-5.87 0-1.3.47-2.37 1.23-3.2-.12-.3-.53-1.53.12-3.19 0 0 1.01-.32 3.3 1.22a11.6 11.6 0 0 1 6 0c2.29-1.54 3.29-1.22 3.29-1.22.65 1.66.24 2.89.12 3.19.77.83 1.23 1.9 1.23 3.2 0 4.56-2.8 5.57-5.47 5.87.43.37.82 1.1.82 2.22v3.29c0 .32.22.69.83.58A12 12 0 0 0 12 .5Z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center text-zinc-400 transition-colors duration-500 ease-out hover:text-zinc-300"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
              <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.55a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center text-zinc-400 transition-colors duration-500 ease-out hover:text-zinc-300"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
              <path d="M6.94 8.5a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM5.4 9.8h3.1V19H5.4V9.8Zm5.1 0h3v1.26h.04c.41-.78 1.44-1.6 2.96-1.6 3.16 0 3.74 2.08 3.74 4.78V19h-3.1v-4.2c0-1 0-2.28-1.39-2.28-1.4 0-1.62 1.08-1.62 2.2V19h-3.1V9.8Z" />
            </svg>
          </a>
          <a
            href="mailto:youremail@example.com"
            className="inline-flex h-9 w-9 items-center justify-center text-zinc-400 transition-colors duration-500 ease-out hover:text-zinc-300"
            aria-label="Email"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
              <path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v.4l9 5.4 9-5.4V7H3Zm18 10V9.73l-8.48 5.1a1 1 0 0 1-1.04 0L3 9.73V17h18Z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
}
