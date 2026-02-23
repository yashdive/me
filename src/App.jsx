import { useEffect, useState } from 'react';

const skills = [
  'Machine Learning',
  'LLM Applications',
  'MLOps',
  'Data Engineering',
  'Backend Systems',
  'Cloud Deployment',
];

const navLinkClass =
  'text-base text-zinc-400 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:text-zinc-300';
const socialIconClass =
  'inline-flex h-12 w-12 items-center justify-center text-zinc-400 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:text-zinc-300';

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
          className="text-lg font-semibold lowercase tracking-tight text-zinc-400 transition-colors duration-500 ease-out hover:text-zinc-300"
        >
          yash dive
        </a>
        <div className="flex flex-wrap items-center gap-4">
          <a href="#home" className={navLinkClass}>
            Home
          </a>
          <a href="#work" className={navLinkClass}>
            Work
          </a>
          <a href="#focus" className={navLinkClass}>
            Focus
          </a>
          <a href="#contact" className={navLinkClass}>
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
            src="/attention.jpg"
            alt="Yash Dive portrait"
            className="aspect-[5/4] w-full max-w-[560px] object-cover"
          />
        </div>
      </header>

      <main>
        <section id="work" className="grid grid-cols-1 items-center gap-6 border-t border-zinc-900 pt-8 lg:grid-cols-2">
          <div className="flex justify-center lg:justify-start">
            <img
              src="/transformer1.png"
              alt="Transformer architecture graphic"
              className="w-full max-w-[460px] object-contain"
            />
          </div>
          <div>
            <div className="max-w-[60ch] space-y-4 text-lg font-semibold leading-relaxed text-zinc-400">
              <p>
                I didn&apos;t fall in love with computer science because of code. I fell in love
                with the quiet idea that a thought, something invisible, can become real. A
                structure. A system. A solution that didn&apos;t exist before.
              </p>
              <p>
                There is something powerful about reading an idea on paper and asking,
                <em> what would it take to bring this to life?</em> So I read. I experiment. I
                translate theory into behavior, equations into programs, research into working
                systems.
              </p>
              <p>
                I&apos;m drawn to the space between curiosity and creation, where questions become
                architecture and learning becomes building. Contributing to open source, designing
                systems, refining approaches... it&apos;s not just practice, it&apos;s a way of thinking. A
                way of understanding the world through structure and possibility.
              </p>
              <p>
                Right now, as a master&apos;s student at NC State, I&apos;m learning not just how to build
                technology, but how to build it with intention, thoughtfully, patiently, and with
                respect for both logic and creativity.
              </p>
              <p>
                For me, computer science isn&apos;t only a discipline. It&apos;s a medium. A language for
                shaping ideas into something that can move, adapt, and endure.
              </p>
            </div>
          </div>
        </section>

        <section id="focus" className="mt-11 grid grid-cols-1 gap-4 border-t border-zinc-900 pt-5 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="mb-3 text-[clamp(1.25rem,2.6vw,1.85rem)] tracking-[-0.015em] text-zinc-400">What I focus on</h2>
            <p className="leading-relaxed text-zinc-400">
              I enjoy solving product-level AI problems: trustworthy generation, model serving,
              observability, and clean developer experience.
            </p>
          </div>

          <ul className="flex list-none flex-wrap content-center gap-2 self-center p-0" aria-label="skills">
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-zinc-900 bg-zinc-950 px-[0.56rem] py-[0.28rem] text-xs font-semibold leading-[1.35] text-zinc-400"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer id="contact" className="mt-10 flex flex-wrap items-center gap-4 border-t border-zinc-900 pt-4">
        <p className="leading-relaxed text-zinc-400">Open to software engineering and AI/ML roles.</p>
        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-zinc-400 transition-colors duration-500 ease-out hover:text-zinc-300"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-zinc-400 transition-colors duration-500 ease-out hover:text-zinc-300"
        >
          LinkedIn
        </a>
      </footer>
    </div>
  );
}
