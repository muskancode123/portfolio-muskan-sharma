import { useState, useEffect } from "react";

// ── Change this after deploying to Render ──
const API_BASE = "http://127.0.0.1:8000";
// const API_BASE = "https://your-backend.onrender.com"; // ← uncomment after deploy

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [projects, setProjects] = useState([]);

  // ── Fetch projects from Django ──
  useEffect(() => {
    fetch(`${API_BASE}/api/projects/`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.log("Projects API Error:", err));
  }, []);

  // ── Email format validator ──
  const isValidEmail = (email) =>
    /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);

  // ── Validate form fields ──
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Enter a valid email (e.g. name@example.com).";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  // ── Contact form submit ──
  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch(`${API_BASE}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrors({ server: data.error || "Something went wrong." });
        setStatus("idle");
      }
    } catch {
      setErrors({ server: "Cannot connect to server. Make sure Django is running." });
      setStatus("idle");
    }
  };

  const navLinks = ["home", "about", "skills", "projects", "contact"];

  const staticProjects = [
    {
      id: 1, title: "Library Management System",
      description: "A comprehensive web application for managing library data, books, and student and teacher information with user authentication and role-based access control.",
      color: "from-blue-500 to-blue-600",
      tech: ["Python", "Django", "HTML5", "CSS3", "JavaScript"],
      features: ["User Authentication", "CRUD Operations", "Data Visualization", "Responsive Design"],
      github_url: null, demo_url: null,
    },
    {
      id: 2, title: "Automated Irrigation System",
      description: "A sustainable and efficient solution for agriculture that helps save water, reduce costs and improve yields.",
      color: "from-green-500 to-green-600",
      tech: ["Arduino UNO", "Python", "C/C++", "Weatherstack API", "Microcontroller"],
      features: ["Automated Watering", "Real-Time Sensor Monitoring", "Remote Access & Control", "Water Conservation"],
      github_url: null, demo_url: null,
    },
    {
      id: 3, title: "Face Recognition Using PCA",
      description: "This research highlights the effectiveness of Principal Component Analysis as a foundational technique for face recognition.",
      color: "from-purple-500 to-purple-600",
      tech: ["Python", "Algorithm", "OpenCV", "PCA"],
      features: ["Dimensionality Reduction Using PCA", "Face Recognition", "Accuracy Analysis", "User Friendly Interface"],
      github_url: null, demo_url: null,
    },
    {
      id: 4, title: "Personal Portfolio",
      description: "A responsive portfolio website showcasing my skills, projects, and achievements with modern design and smooth animations.",
      color: "from-pink-500 to-pink-600",
      tech: ["HTML5", "React", "Tailwind CSS", "Django"],
      features: ["Responsive Design", "Smooth Animations", "Dark Theme", "SEO Optimized"],
      github_url: null, demo_url: null,
    },
  ];

  const colors = ["from-blue-500 to-blue-600", "from-green-500 to-green-600", "from-purple-500 to-purple-600", "from-pink-500 to-pink-600"];
  const displayProjects = projects.length > 0
    ? projects.map((p, i) => ({
        ...p,
        color: colors[i % 4],
        tech: p.tech_stack ? p.tech_stack.split(",").map((t) => t.trim()) : [],
        features: [],
      }))
    : staticProjects;

  const skillGroups = [
    {
      title: "Programming Languages", barColor: "from-blue-500 to-cyan-500",
      skills: [{ name: "Python", pct: 85 }, { name: "Java", pct: 80 }, { name: "C++", pct: 75 }, { name: "JavaScript", pct: 70 }],
    },
    {
      title: "Web Technologies", barColor: "from-purple-500 to-pink-500",
      skills: [{ name: "HTML/CSS", pct: 90 }, { name: "React", pct: 80 }, { name: "Node.js", pct: 65 }, { name: "MongoDB", pct: 60 }],
    },
    {
      title: "Data & Analytics", barColor: "from-teal-300 to-teal-500",
      skills: [{ name: "SQL", pct: 70 }, { name: "Data Structures", pct: 80 }, { name: "Algorithms", pct: 58 }, { name: "Statistics", pct: 52 }],
    },
    {
      title: "Tools & Platforms", barColor: "from-orange-300 to-orange-500",
      skills: [{ name: "Git/GitHub", pct: 80 }, { name: "Linux", pct: 70 }, { name: "VS Code", pct: 94 }, { name: "Docker", pct: 52 }],
    },
  ];

  return (
    <div className="text-white font-sans min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-x-hidden">

      {/* ── Navbar ── */}
      <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-white/5 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          <h1 className="text-lg sm:text-xl font-bold text-teal-300 tracking-tight">Muskan Sharma</h1>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link} href={`#${link}`} className="capitalize text-sm text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/10 transition">{link}</a>
            ))}
          </nav>
          <button className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-white/10 transition" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            <span className={`block w-5 h-0.5 bg-gray-300 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-300 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-300 transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-slate-900/95 border-t border-white/10 px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a key={link} href={`#${link}`} onClick={() => setMenuOpen(false)} className="capitalize text-sm text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition">{link}</a>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section id="home" className="w-full flex flex-col items-center text-center pt-28 pb-16 px-4">
        <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-gradient-to-r from-blue-600 to-emerald-600 flex items-center justify-center text-3xl sm:text-4xl font-bold shadow-2xl ring-4 ring-white/10 mb-6">MS</div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-4 bg-gradient-to-r from-white via-purple-200 to-emerald-200 bg-clip-text text-transparent leading-tight">Muskan Sharma</h1>
        <h3 className="text-lg sm:text-2xl text-blue-300 mt-2 mb-6 font-medium">Computer Science Engineering Student</h3>
        <p className="max-w-2xl w-full text-sm sm:text-lg text-gray-300 bg-white/5 border border-white/10 p-6 rounded-xl shadow-md mb-8 leading-relaxed">
          Passionate about technology, innovation, and creating impactful solutions.
          <br className="hidden sm:block" />
          Currently pursuing CSE with a focus on software development and emerging technologies.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:w-auto mb-16">
          <a href="#contact" className="bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 text-white px-10 py-4 rounded-full font-semibold transition hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 text-center">✨ Get in Touch</a>
          <a href="/Muskan_Sharma_Resume.pdf" download="Muskan_Sharma_Resume.pdf" className="border-2 border-purple-500/50 text-gray-300 hover:text-white px-10 py-4 rounded-full font-semibold transition bg-white/5 hover:bg-white/10 hover:scale-105 text-center">⬇ Download Resume</a>
        </div>
        <p className="text-gray-400 animate-bounce">⬇ Scroll to explore</p>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">About Me</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mt-3 mb-5" />
            <p className="max-w-2xl mx-auto text-sm sm:text-lg text-gray-300 bg-white/5 border border-white/10 p-6 rounded-xl">
              I'm a dedicated Computer Science Engineering student with a passion for technology and innovation. My journey in tech is driven by curiosity and a desire to create solutions that make a difference.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-semibold mb-4">My Story</h3>
                <p className="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">As a second-year CSE student, I'm deeply immersed in the world of computer science, constantly learning and exploring new technologies. My academic journey has been marked by a genuine enthusiasm for programming and problem-solving.</p>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">I believe in the power of technology to transform lives and am committed to developing skills that will enable me to contribute meaningfully to the tech industry.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Academic Excellence", desc: "2nd Year CSE student with strong foundation in computer science fundamentals" },
                { title: "Programming Passion", desc: "Enthusiastic about coding, problem-solving, and building innovative solutions" },
                { title: "Innovation Focus", desc: "Always exploring new technologies and methodologies to create impactful projects" },
                { title: "Goal-Oriented", desc: "Dedicated to continuous learning and professional growth in the tech industry" },
              ].map((item) => (
                <div key={item.title} className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-xl rounded-2xl p-5 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <h4 className="text-base font-semibold mb-1 group-hover:text-purple-300 transition-colors">{item.title}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">Technical Skills</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mt-3 mb-4" />
            <p className="text-sm sm:text-lg text-gray-300">A comprehensive overview of my technical expertise and proficiency levels.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skillGroups.map((group) => (
              <div key={group.title} className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <h3 className="text-base sm:text-xl font-semibold mb-6 group-hover:text-purple-300 transition-colors">{group.title}</h3>
                  <div className="space-y-5">
                    {group.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 font-medium text-sm">{skill.name}</span>
                          <span className="text-purple-400 text-xs font-semibold bg-purple-400/10 px-3 py-1 rounded-full">{skill.pct}%</span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-2.5">
                          <div className={`bg-gradient-to-r ${group.barColor} h-2.5 rounded-full shadow-lg`} style={{ width: `${skill.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">Featured Projects</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full mt-3 mb-4" />
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300">A showcase of my technical projects demonstrating problem-solving skills and modern development practices.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {displayProjects.map((project) => (
              <div key={project.id} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 group">
                <div className="flex items-center gap-4 mb-5">
                  <div className={`bg-gradient-to-r ${project.color} w-3 h-10 rounded-full flex-shrink-0`} />
                  <h3 className="text-base sm:text-xl font-semibold group-hover:text-blue-400 transition-colors">{project.title}</h3>
                </div>
                <p className="text-gray-300 text-sm mb-5 leading-relaxed">{project.description}</p>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Technologies Used</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs border border-blue-500/20">{t}</span>
                  ))}
                </div>
                {project.features && project.features.length > 0 && (
                  <>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Key Features</p>
                    <ul className="space-y-1.5 mb-5">
                      {project.features.map((f) => (
                        <li key={f} className="text-gray-300 text-sm flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full flex-shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                <div className="flex gap-3 mt-4">
                  {project.github_url
                    ? <a href={project.github_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition text-sm">Code</a>
                    : <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition text-sm">Code</button>
                  }
                  {project.demo_url
                    ? <a href={project.demo_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm">Demo</a>
                    : <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm">Demo</button>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">Get In Touch</h2>
            <p className="text-sm sm:text-xl text-gray-300 mt-4">Let's connect and discuss opportunities, collaborations, or just have a conversation about technology!</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Left */}
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700">
                <h3 className="text-xl sm:text-2xl font-semibold mb-5">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: "📧", label: "Email", value: "muskansps45@gmail.com" },
                    { icon: "📞", label: "Phone", value: "+91 62846 11597" },
                    { icon: "📍", label: "Location", value: "Chandigarh, India" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="text-blue-400 bg-blue-400/10 p-3 rounded-xl text-lg">{item.icon}</div>
                      <div>
                        <p className="text-xs text-gray-400">{item.label}</p>
                        <p className="font-medium text-sm sm:text-base">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700">
                <h3 className="text-xl font-semibold mb-5">Connect With Me</h3>
                <div className="flex gap-4">
                  <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noreferrer" className="p-3 bg-gray-700 hover:bg-blue-600 rounded-xl transition text-sm font-bold">[in]</a>
                  <a href="https://github.com/your-username" target="_blank" rel="noreferrer" className="p-3 bg-gray-700 hover:bg-gray-600 rounded-xl transition text-sm font-bold">GH</a>
                  <a href="#" className="p-3 bg-gray-700 hover:bg-pink-600 rounded-xl transition text-sm font-bold">𝕏</a>
                </div>
              </div>
            </div>

            {/* Right — Contact Form */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700">
              <h3 className="text-xl sm:text-2xl font-semibold mb-5">Send a Message</h3>
              <div className="space-y-4">

                {/* Name */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 text-sm transition ${errors.name ? "ring-2 ring-red-500" : "focus:ring-blue-500"}`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">⚠ {errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Your Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                    placeholder="name@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 text-sm transition ${errors.email ? "ring-2 ring-red-500" : "focus:ring-blue-500"}`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">⚠ {errors.email}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                    placeholder="Enter your message"
                    className={`w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 text-sm resize-none transition ${errors.message ? "ring-2 ring-red-500" : "focus:ring-blue-500"}`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">⚠ {errors.message}</p>}
                </div>

                {/* Server error */}
                {errors.server && (
                  <p className="text-red-400 text-sm text-center bg-red-400/10 py-2 px-3 rounded-lg">❌ {errors.server}</p>
                )}

                {/* Success */}
                {status === "success" && (
                  <p className="text-emerald-400 text-sm text-center bg-emerald-400/10 py-2 px-3 rounded-lg">
                    ✅ Message sent! I'll get back to you soon.
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === "sending"}
                  className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 rounded-xl font-semibold text-sm transition hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === "sending" ? "⏳ Sending..." : "✈️ Send Message"}
                </button>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-black/60 py-8 border-t border-gray-800 text-center">
        <p className="text-gray-400 text-sm">Made with ♡ and 🖳 by Muskan Sharma</p>
        <p className="text-gray-600 text-xs mt-1">© 2025 Muskan Sharma. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default App;