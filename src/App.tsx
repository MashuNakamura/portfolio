import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Mail, Phone, GraduationCap, School, Award, ExternalLink } from 'lucide-react';

const useIntersectionObserver = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.fade-in-section').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
};

export const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string, callback?: () => void) => {
  e.preventDefault();
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
  if (callback) {
    callback();
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'About', 'Experience', 'Projects', 'Education', 'Certifications'];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg py-4 border-b border-white/10' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" onClick={(e) => scrollToSection(e, 'home', () => setIsOpen(false))} className="font-heading text-2xl font-bold tracking-wider text-white">Mashu</a>

        <ul className="hidden md:flex gap-8">
          {links.map(link => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={(e) => scrollToSection(e, link.toLowerCase(), () => setIsOpen(false))}
                className="text-sm font-medium text-slate-300 hover:text-sky-400 transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <button className="md:hidden text-slate-200" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
        <ul className="flex flex-col py-4">
          {links.map(link => (
            <li key={link} className="text-center w-full">
              <a
                href={`#${link.toLowerCase()}`}
                onClick={(e) => scrollToSection(e, link.toLowerCase(), () => setIsOpen(false))}
                className="block py-3 text-slate-300 hover:text-sky-400 hover:bg-slate-800/50 transition-all"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = "Informatics Student & Software Engineer";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
    return () => clearInterval(typing);
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center px-6 overflow-hidden pt-20">
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.15)_0%,transparent_70%)] animate-float -z-10"></div>
      <div className="absolute top-[40%] right-[-300px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.15)_0%,transparent_70%)] animate-float-reverse -z-10"></div>

      <div className="max-w-4xl mx-auto z-10 fade-in-section opacity-0 translate-y-8 transition-all duration-1000">
        <h1 className="font-heading text-5xl md:text-7xl font-bold mb-4 text-white leading-tight">Federico Matthew Pratama</h1>
        <div className="text-xl md:text-2xl text-slate-300 mb-10 h-8">
          {text}<span className="inline-block w-[3px] h-6 bg-sky-400 ml-1 animate-blink"></span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="group flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-8 py-4 rounded-full font-heading font-medium hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:-translate-y-1 transition-all duration-300">
            View Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="flex items-center justify-center px-8 py-4 rounded-full font-heading font-medium border border-white/20 hover:border-sky-400 hover:bg-white/5 hover:-translate-y-1 transition-all duration-300">
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const skills = {
    Languages: [
      { name: 'Python', icon: 'devicon-python-plain colored' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
      { name: 'PHP', icon: 'devicon-php-plain colored' },
      { name: 'Java', icon: 'devicon-java-plain colored' },
      { name: 'C++', icon: 'devicon-cplusplus-plain colored' },
    ],
    'Frameworks & Core': [
      { name: 'React', icon: 'devicon-react-original colored' },
      { name: 'Next.js', icon: 'devicon-nextjs-original' },
      { name: 'Tailwind', icon: 'devicon-tailwindcss-plain colored' },
      { name: 'Laravel', icon: 'devicon-laravel-plain colored' },
      { name: 'Node.js', icon: 'devicon-nodejs-plain colored' },
      { name: 'Express', icon: 'devicon-express-original' },
    ],
    Tools: [
      { name: 'Git', icon: 'devicon-git-plain colored' },
      { name: 'MySQL', icon: 'devicon-mysql-plain colored' },
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
      { name: 'Docker', icon: 'devicon-docker-plain colored' },
    ]
  };

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-4xl font-bold mb-16 text-gradient inline-block">About Me</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-card fade-in-section opacity-0 translate-y-8 transition-all duration-1000 delay-100">
            <h3 className="font-heading text-2xl font-bold mb-4 text-white">Professional Summary</h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              Highly motivated Informatics student (Current GPA: 3.65) with a strong passion for software
              engineering, artificial intelligence, and web development. Adept at problem-solving, creating
              efficient algorithms, and building scalable applications. Constantly exploring new technologies
              and eager to contribute to innovative projects.
            </p>

            <div className="flex gap-4 mt-8">
              <a href="#" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-sky-500 hover:border-sky-500 hover:-translate-y-1 transition-all text-slate-300 hover:text-white">
                <i className="devicon-linkedin-plain text-xl"></i>
              </a>
              <a href="mailto:email@example.com" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-sky-500 hover:border-sky-500 hover:-translate-y-1 transition-all text-slate-300 hover:text-white">
                <Mail size={20} />
              </a>
              <a href="tel:+6281234567890" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-sky-500 hover:border-sky-500 hover:-translate-y-1 transition-all text-slate-300 hover:text-white">
                <Phone size={20} />
              </a>
            </div>
          </div>

          <div className="glass-card fade-in-section opacity-0 translate-y-8 transition-all duration-1000 delay-300">
            <h3 className="font-heading text-2xl font-bold mb-6 text-white">Tech Stack</h3>
            <div className="space-y-6">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category}>
                  <h4 className="text-sm font-medium text-slate-400 mb-3">{category}</h4>
                  <div className="flex flex-wrap gap-3">
                    {items.map(skill => (
                      <div key={skill.name} className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-indigo-400/50 transition-all text-sm">
                        <i className={`${skill.icon} text-lg`}></i>
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const experiences = [
    {
      date: 'Mar 2026 - Aug 2026',
      role: 'Web Programming Intern',
      company: 'Flashcom',
      desc: 'Developed and maintained scalable software solutions. Collaborated with cross-functional teams to design and implement new features, improving overall system performance and user experience.'
    },
    {
      date: 'Jan 2025 - Jan 2026',
      role: 'President HIMA Informatika',
      company: 'Universitas Katolik Darma Cendika',
      desc: 'Led the Informatics Student Association, organizing technical workshops, seminars, and community events. Managed a team of students to foster a collaborative and innovative learning environment.'
    },
    {
      date: 'Jan 2024 - Jan 2025',
      role: 'Active Member, HIMA Informatika',
      company: 'Universitas Katolik Darma Cendika',
      desc: 'Contributed to the Research and Development division, supporting the execution of student activities and initiatives. Collaborated with the team to ensure the success of department-wide events.'
    },
    {
      date: 'Mar 2022 - Aug 2022',
      role: 'IT Support Intern',
      company: 'Java Paragon Hotel & Residence',
      desc: 'Provided technical support for hardware and software troubleshooting, resolving issues promptly. Maintained network infrastructure and monitored internet connectivity to ensure smooth hotel operations. Assisted in the installation and configuration of IT equipment for hotel staff and guests.'
    }
  ];

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-4xl font-bold mb-16 text-center text-gradient">Career Journey</h2>

        <div className="relative border-l-2 border-white/10 ml-4 md:ml-0 md:pl-0">
          {experiences.map((exp, idx) => (
            <div key={idx} className={`mb-12 relative pl-8 md:pl-12 fade-in-section opacity-0 translate-y-8 transition-all duration-1000 delay-${idx * 200}`}>
              <div className="absolute w-5 h-5 bg-slate-900 border-4 border-sky-400 rounded-full -left-[11px] top-6"></div>
              <div className="glass-card">
                <span className="inline-block px-3 py-1 rounded-md bg-sky-500/10 text-sky-400 text-sm font-bold mb-3">{exp.date}</span>
                <h3 className="font-heading text-2xl font-bold text-white mb-1">{exp.role}</h3>
                <h4 className="text-lg text-indigo-300 font-medium mb-4">{exp.company}</h4>
                <p className="text-slate-300 leading-relaxed">{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    // Featured (Large)
    {
      img: 'smartkitchen-ai-recipe-generator.png',
      title: 'SmartKitchen AI Intelligent Recipe',
      tag: 'AI & Web App',
      size: 'col-span-1 md:col-span-2 row-span-2'
    },
    {
      img: 'flashcom-sistem-informasi-dashboard.png',
      title: 'Flashcom Dashboard',
      tag: 'Web Dashboard',
      size: 'col-span-1 md:col-span-2 row-span-2'
    },
    {
      img: 'flashcom-hris-loker.png',
      title: 'Flashcom HRIS & Job Portal',
      tag: 'Enterprise System',
      size: 'col-span-1 md:col-span-2 row-span-2'
    },
    {
      img: 'webinar-rpl.jpg',
      title: 'UKDC Webinar Portal',
      tag: 'Web Portal',
      size: 'col-span-1 md:col-span-2 row-span-2'
    },
    // Archive (Medium)
    {
      img: 'perpustakaan-ukdc-php.png',
      title: 'UKDC Digital Library',
      tag: 'Web App',
      size: 'col-span-1 md:col-span-2 row-span-1'
    },
    {
      img: 'imaginary-tales-apps-baca-buku-js.png',
      title: 'Imaginary Tales',
      tag: 'Web App',
      size: 'col-span-1 md:col-span-2 row-span-1'
    },
    {
      img: 'notepad-apps.png',
      title: 'Android Notepad (Kotlin)',
      tag: 'Mobile App',
      size: 'col-span-1 md:col-span-2 row-span-1 md:row-start-5'
    },
    // Experiments (Small)
    {
      img: 'yolov11-face-blur-opencv.png',
      title: 'YOLOv11 Face Blur',
      tag: 'Computer Vision',
      size: 'col-span-1 row-span-1'
    },
    {
      img: 'nlp-news-summarizer-cli.png',
      title: 'News Summarizer',
      tag: 'NLP / CLI',
      size: 'col-span-1 row-span-1'
    },
    {
      img: 'yarn-color-detection.png',
      title: 'Yarn Color Detection',
      tag: 'Computer Vision',
      size: 'col-span-1 row-span-1'
    },
    {
      img: 'mbti-expert-system-result.png',
      title: 'MBTI Classifier',
      tag: 'Expert System',
      size: 'col-span-1 row-span-1'
    },
    {
      img: 'xanel-survivor-godot-game.png',
      title: 'Godot Survivor Clone',
      tag: 'Game Dev',
      size: 'col-span-1 md:col-span-2 row-span-1'
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-4xl font-bold mb-16 text-gradient inline-block">Featured Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-6">
          {projects.map((proj, idx) => (
            <div
              key={idx}
              className={`${proj.size} group relative rounded-2xl overflow-hidden border border-white/10 bg-slate-800 cursor-pointer fade-in-section opacity-0 translate-y-8 transition-all duration-1000 delay-${(idx % 4) * 100}`}
            >
              <div className="w-full h-full relative">
                <img
                  src={`/image/${proj.img}`}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold mb-2 backdrop-blur-sm">
                  {proj.tag}
                </span>
                <h3 className={`font-heading font-bold text-white drop-shadow-md ${proj.size.includes('row-span-2') ? 'text-2xl' : 'text-lg'}`}>
                  {proj.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  const educations = [
    {
      icon: <School size={28} />,
      uni: 'Universitas Katolik Darma Cendika',
      degree: 'Bachelor of Informatics',
      date: 'Aug 2023 - Present'
    },
    {
      icon: <GraduationCap size={28} />,
      uni: 'SMK St. Louis',
      degree: 'Computer and Network Engineering (TKJ)',
      date: 'Jul 2020 - May 2023'
    }
  ];

  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-heading text-4xl font-bold mb-16 text-center text-gradient">Academic Background</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {educations.map((edu, idx) => (
            <div key={idx} className={`glass-card flex gap-6 fade-in-section opacity-0 translate-y-8 transition-all duration-1000 delay-${idx * 200}`}>
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                {edu.icon}
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-white mb-2 leading-tight">{edu.uni}</h3>
                <p className="text-slate-400 font-medium mb-3">{edu.degree}</p>
                <span className="inline-block px-3 py-1 rounded-md bg-sky-500/10 text-sky-400 text-sm font-bold">{edu.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-8 border-t border-white/10 mt-12 text-center text-slate-400 text-sm">
    <p>&copy; {new Date().getFullYear()} Federico Matthew Pratama | All rights reserved.</p>
  </footer>
);

const Certifications = () => {
  const certs = [
    {
      title: 'Data Science & AI Masters 2026 - From Python To Gen AI',
      issuer: 'Udemy',
      date: 'Issued 2026',
      credentialId: 'UC-45317aca-9c1c-4e8e-928c-60d9b6a4ca12',
      image: 'udemy-ai-2026.jpg',
      url: 'https://www.udemy.com/certificate/UC-45317aca-9c1c-4e8e-928c-60d9b6a4ca12/'
    },
    {
      title: 'Belajar Dasar Data Science',
      issuer: 'Dicoding Indonesia',
      date: 'Issued Sep 2024 · Expires Sep 2027',
      credentialId: 'QLZ97MYJDP5D',
      image: 'dicoding-belajar-data-science.png',
      url: 'https://www.dicoding.com/certificates/QLZ97MYJDP5D'
    },
    {
      title: 'Belajar Dasar Pemrograman Web',
      issuer: 'Dicoding Indonesia',
      date: 'Issued Oct 2023 · Expires Oct 2026',
      credentialId: 'EYX4YO87OZDL',
      image: 'dicoding-belajar-dasar-pemweb.png',
      url: 'https://www.dicoding.com/certificates/EYX4YO87OZDL'
    },
    {
      title: 'Scientific Computing with Python',
      issuer: 'freeCodeCamp',
      date: 'Issued Nov 2023',
      credentialId: 'fcc5a74d0d6-29be-4079-8614-eea6221754e4-scwp',
      image: 'freecodecamp-python.png',
      url: 'https://freecodecamp.org/certification/fcc5a74d0d6-29be-4079-8614-eea6221754e4/scientific-computing-with-python-v7'
    },
    {
      title: 'Legacy Responsive Web Design V8',
      issuer: 'freeCodeCamp',
      date: 'Issued Nov 2023',
      credentialId: 'fcc5a74d0d6-29be-4079-8614-eea6221754e4-rwd',
      image: 'freecodecamp-web-design.png',
      url: 'https://freecodecamp.org/certification/fcc5a74d0d6-29be-4079-8614-eea6221754e4/responsive-web-design'
    },
    {
      title: 'SQL (Basic)',
      issuer: 'HackerRank',
      date: 'Verified Skill',
      credentialId: 'ac6e7f2c3314',
      image: 'hackerrank-basic-sql.png',
      url: 'https://www.hackerrank.com/certificates/ac6e7f2c3314'
    }
  ];

  return (
    <section id="certifications" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-4xl font-bold mb-16 text-gradient inline-block">Certifications</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certs.map((cert, idx) => (
            <div key={idx} className={`glass-card p-5 group fade-in-section opacity-0 translate-y-8 transition-all duration-1000 delay-${(idx % 3) * 150}`}>
              <div className="rounded-xl overflow-hidden mb-6 border border-white/10 relative aspect-[4/3]">
                <img src={`/image/${cert.image}`} alt={cert.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                  {cert.url && (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="bg-sky-500 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2 hover:bg-sky-400 transition-colors">
                      <ExternalLink size={16} /> Show Credential
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-lg leading-tight mb-2">{cert.title}</h3>
                  <p className="text-sky-400 font-medium text-sm mb-1">{cert.issuer}</p>
                  <p className="text-slate-400 text-xs mb-1">{cert.date}</p>
                  <p className="text-slate-500 text-xs truncate max-w-[200px]" title={cert.credentialId}>ID: {cert.credentialId}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  useIntersectionObserver();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Education />
      <Certifications />
      <Footer />
    </div>
  );
}
