"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { GitHubContributions } from "@/components/github-contributions";
import { Terminal } from "@/components/terminal";
import { 
  SiPython, 
  SiJavascript, 
  SiMysql, 
  SiMongodb, 
  SiPostgresql,
  SiTensorflow,
  SiFastapi,
  SiAmazon,
  SiDocker
} from "react-icons/si";
import { DiDatabase } from "react-icons/di";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check URL parameter for terminal mode
    const params = new URLSearchParams(window.location.search);
    if (params.get('terminal') === 'true') {
      setShowTerminal(true);
    }
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showTerminal) {
        setShowTerminal(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [showTerminal]);

  // Sync state → URL
  useEffect(() => {
    if (!mounted) return;
    const url = new URL(window.location.href);
    if (showTerminal) {
      url.searchParams.set('terminal', 'true');
    } else {
      url.searchParams.delete('terminal');
    }
    if (url.toString() !== window.location.href) {
      window.history.replaceState({}, '', url.toString());
    }
  }, [showTerminal, mounted]);

  // Sync URL → state on browser back/forward
  useEffect(() => {
    const onPop = () => {
      const params = new URLSearchParams(window.location.search);
      setShowTerminal(params.get('terminal') === 'true');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  if (!mounted) return null;

  if (showTerminal) {
    return <Terminal onClose={() => setShowTerminal(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-sm z-20">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">RA</h1>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">Experience</a>
            <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a>
            <a href="#skills" className="text-muted-foreground hover:text-foreground transition-colors">Skills</a>
            <a href="#education" className="text-muted-foreground hover:text-foreground transition-colors">Education</a>
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowTerminal(true)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              title="Open Terminal"
              aria-label="Open Terminal"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16 pb-20">
        {/* About */}
        <div id="about" className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Rupin Ajay</h2>
              <p className="text-lg text-muted-foreground">Software Engineer</p>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-justify">
              I'm a software engineer passionate about creating intelligent systems that solve real-world problems. 
              Currently working as an SDE Intern at <span className="font-medium">Linarc</span>, where I build scalable 
              solutions and contribute to cutting-edge projects.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground text-justify">
              My expertise spans AI/ML systems, RAG architectures, and full-stack development. I enjoy turning 
              complex technical challenges into elegant, user-friendly solutions. When I'm not coding, you'll 
              find me contributing to open source projects or exploring the latest developments in artificial intelligence.
            </p>
          </div>
        </div>

        {/* Experience */}
        <section id="experience" className="mb-16">
          <h3 className="text-xl font-semibold mb-6">Experience</h3>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-48 flex-shrink-0">
                <div className="text-sm text-muted-foreground font-mono">Jan 2026 - Present</div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-medium mb-1">SDE Intern</h4>
                <div className="text-muted-foreground mb-3">Linarc</div>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Working on software development and engineering projects</li>
                  <li>Contributing to product development and technical solutions</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-48 flex-shrink-0">
                <div className="text-sm text-muted-foreground font-mono">Jul 2025 - Dec 2025</div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-medium mb-1">Developer Advocate</h4>
                <div className="text-muted-foreground mb-3">Gravix Layer</div>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Created Automated GitHub Changelog and Text-to-SQL Multi-Agent systems</li>
                  <li>Authored MCP Server guides and documentation</li>
                  <li>Published open-source projects, demos, and educational content</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-48 flex-shrink-0">
                <div className="text-sm text-muted-foreground font-mono">May 2025 - Jul 2025</div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-medium mb-1">Software Engineer Intern (AI/ML)</h4>
                <div className="text-muted-foreground mb-3">Anand & Anand</div>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Implemented RAG architectures (HyDE, graph-based, hybrid indexing)</li>
                  <li>Built conversational legal AI assistant</li>
                  <li>Improved system accuracy through partner-validated pipelines</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-48 flex-shrink-0">
                <div className="text-sm text-muted-foreground font-mono">Jan 2025 - Feb 2025</div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-medium mb-1">AI Intern</h4>
                <div className="text-muted-foreground mb-3">Zyngate</div>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Reduced redundant API calls by 70%</li>
                  <li>Improved job-apply success rate to 85%</li>
                  <li>Automated LinkedIn job applications with Python & Selenium</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-48 flex-shrink-0">
                <div className="text-sm text-muted-foreground font-mono">May 2024 - Jul 2024</div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-medium mb-1">Data Engineer Intern</h4>
                <div className="text-muted-foreground mb-3">Glencore International AG</div>
                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                  <li>Replaced VBA workflows with automated pipelines</li>
                  <li>Reduced 30 minutes of manual work to 15 seconds</li>
                  <li>Improved reliability through automated email/Excel integration</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mb-16">
          <h3 className="text-xl font-semibold mb-6">Projects</h3>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-lg font-medium">Sustain: ESG Analytics Platform</h4>
                <a href="https://github.com/rupinajay" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
              <p className="text-muted-foreground mb-2">
                AI-powered ESG analytics platform with RAG, sentiment analysis, and real-time dashboards.
              </p>
              <div className="text-xs text-muted-foreground">
                Python • LangChain • FastAPI • PostgreSQL
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-lg font-medium">StatIQ</h4>
                <a href="https://github.com/rupinajay" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
              <p className="text-muted-foreground mb-2">
                No-code AI business intelligence tool for automated data analysis and dashboarding.
              </p>
              <div className="text-xs text-muted-foreground">
                Python • Streamlit • Pandas • OpenAI
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-lg font-medium">Text-to-SQL Engine</h4>
                <a href="https://github.com/rupinajay" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
              <p className="text-muted-foreground mb-2">
                Schema-aware natural language to SQL engine using multi-agent orchestration.
              </p>
              <div className="text-xs text-muted-foreground">
                Python • LangGraph • CrewAI • SQLAlchemy
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mb-16">
          <h3 className="text-xl font-semibold mb-6">Skills & Technologies</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Languages & Databases</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-2 text-xs bg-accent rounded flex items-center gap-2">
                  <SiPython className="w-4 h-4 text-[#3776ab]" />
                  Python
                </span>
                <span className="px-3 py-2 text-xs bg-accent rounded flex items-center gap-2">
                  <SiJavascript className="w-4 h-4 text-[#f7df1e]" />
                  JavaScript
                </span>
                <span className="px-3 py-2 text-xs bg-accent rounded flex items-center gap-2">
                  <DiDatabase className="w-4 h-4 text-[#336791]" />
                  SQL
                </span>
                <span className="px-3 py-2 text-xs bg-accent rounded flex items-center gap-2">
                  <SiMysql className="w-4 h-4 text-[#4479a1]" />
                  MySQL
                </span>
                <span className="px-3 py-2 text-xs bg-accent rounded flex items-center gap-2">
                  <SiMongodb className="w-4 h-4 text-[#47a248]" />
                  MongoDB
                </span>
                <span className="px-3 py-2 text-xs bg-accent rounded flex items-center gap-2">
                  <SiPostgresql className="w-4 h-4 text-[#336791]" />
                  PostgreSQL
                </span>
                <span className="px-3 py-2 text-xs bg-accent rounded flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#00d4aa" d="M12 0L2.524 6v12L12 24l9.476-6V6L12 0zm0 2.5l7.5 4.5v9L12 21.5 4.5 16V7L12 2.5z"/>
                    <path fill="#00d4aa" d="M12 6l-6 3.5v7L12 20l6-3.5v-7L12 6z"/>
                  </svg>
                  PineconeDB
                </span>
                <span className="px-3 py-2 text-xs bg-accent rounded flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#dc244c" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/>
                    <circle fill="#dc244c" cx="12" cy="12" r="4"/>
                  </svg>
                  Qdrant
                </span>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">AI/ML & Tools</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-2 text-xs bg-accent rounded flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff6b6b"/>
                        <stop offset="50%" stopColor="#4ecdc4"/>
                        <stop offset="100%" stopColor="#45b7d1"/>
                      </linearGradient>
                    </defs>
                    <path fill="url(#aiGradient)" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"/>
                    <circle fill="white" cx="12" cy="12" r="4"/>
                  </svg>
                  Gen AI
                </span>
                <span className="px-3 py-2 text-xs bg-accent rounded flex items-center gap-2">
                  <SiTensorflow className="w-4 h-4 text-[#ff6f00]" />
                  TensorFlow
                </span>
                <span className="px-3 py-2 text-xs bg-accent rounded flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#1c3c3c" d="M12 0l3.708 7.292L24 8.584l-6 5.854L19.416 24 12 20.292 4.584 24 6 14.438 0 8.584l8.292-1.292z"/>
                  </svg>
                  LangChain
                </span>
                <span className="px-3 py-2 text-xs bg-accent rounded flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#1c3c3c" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  LangGraph
                </span>
                <span className="px-3 py-2 text-xs bg-accent rounded flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#ff4757" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/>
                    <path fill="white" d="M8 8h8v8H8z"/>
                    <path fill="#ff4757" d="M10 10h4v4h-4z"/>
                  </svg>
                  CrewAI
                </span>
                <span className="px-3 py-2 text-xs bg-accent rounded flex items-center gap-2">
                  <SiFastapi className="w-4 h-4 text-[#009688]" />
                  FastAPI
                </span>
                <span className="px-3 py-2 text-xs bg-accent rounded flex items-center gap-2">
                  <SiAmazon className="w-4 h-4 text-[#ff9900]" />
                  AWS
                </span>
                <span className="px-3 py-2 text-xs bg-accent rounded flex items-center gap-2">
                  <SiDocker className="w-4 h-4 text-[#2496ed]" />
                  Docker
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* GitHub Contributions */}
        <section id="activity" className="mb-16">
          <h3 className="text-xl font-semibold mb-6">Activity</h3>
          <GitHubContributions />
        </section>

        {/* Education */}
        <section id="education" className="mb-16">
          <h3 className="text-xl font-semibold mb-6">Education</h3>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-48 flex-shrink-0">
                <div className="text-sm text-muted-foreground font-mono">Aug 2022 - Apr 2026</div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-medium mb-1">B.Tech Computer Science and Engineering</h4>
                <div className="text-muted-foreground mb-3">Shiv Nadar University Chennai</div>
                <div className="text-muted-foreground">
                  <span className="font-medium">CGPA:</span> 8.3/10.0
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-48 flex-shrink-0">
                <div className="text-sm text-muted-foreground font-mono">Jul 2020 - Mar 2022</div>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-medium mb-1">Senior Secondary (CBSE)</h4>
                <div className="text-muted-foreground mb-3">Sri Chaitanya Techno School</div>
                <div className="text-muted-foreground">
                  <span className="font-medium">Score:</span> 88.2%
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Awards */}
        <section className="mb-16">
          <h3 className="text-xl font-semibold mb-6">Recognition</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>AI/ML Senior Core, SNU Coding Club</span>
              <span className="text-sm text-muted-foreground">Dec 2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Top 10: IndustriAI Hackathon, IIT Madras</span>
              <span className="text-sm text-muted-foreground">2025</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Top 10: Google Hack4Change</span>
              <span className="text-sm text-muted-foreground">2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Top 12: OpenHack Hackathon, IISc</span>
              <span className="text-sm text-muted-foreground">2024</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-background z-10">
        <div className="max-w-4xl mx-auto px-6 py-2 text-center">
          <div className="flex justify-center gap-4 text-xs">
            <a href="mailto:rupinajay@gmail.com" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              rupinajay@gmail.com
            </a>
            <a href="https://github.com/rupinajay" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              github.com/rupinajay
            </a>
            <a href="https://linkedin.com/in/rupinajay" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              linkedin.com/in/rupinajay
            </a>
            <a href="https://x.com/RupinAjay" className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              x.com/RupinAjay
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}