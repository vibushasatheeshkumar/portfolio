export const profile = {
  name: 'Vibusha',
  fullName: 'Vibusha Satheeshkumar',
  title: 'Security Researcher',
  roles: ['Security Researcher', 'Application Security', 'Detection Engineering'],
  kicker: 'B.Tech CSE (Cybersecurity) · Chennai, India',
  tagline:
    'Cybersecurity-focused developer and security researcher working across vulnerability research, application security, and detection engineering.',
  email: 'vibushasatheeshkumar@gmail.com',
  github: 'https://github.com/vibushasatheeshkumar',
  linkedin: 'https://linkedin.com/in/vibushasatheeshkumar',
  medium: 'https://medium.com/@vibushasatheeshkumar',
  resume: 'Vibusha-Resume.pdf',
}

export const about = {
  lead: [
    "I'm a cybersecurity student pursuing a B.Tech in Computer Science and Engineering (Cybersecurity) at Vel Tech Rangarajan Dr. Sagunthala R&D Institute, and I work on both sides of the problem — breaking software through coordinated disclosure, and building the tooling that catches the same classes of bugs before they ship.",
    'Most of my work starts with reading code and protocols until something stops lining up: a certificate check that never happens, an authorization check on the wrong object, an environment variable that crosses a trust boundary. I report what I find through vendor disclosure programs and follow it through to a patch. I am eJPT and CRTOM certified, and I turn the workflows I rely on into real software rather than one-off scripts.',
  ],
  focus: [
    {
      title: 'Vulnerability Research & Disclosure',
      body: 'Finding real flaws in open-source and vendor software, writing them up with reproducible evidence, and taking them through coordinated disclosure to a published fix.',
      tags: ['Coordinated disclosure', 'Advisory writing', 'Root-cause analysis'],
    },
    {
      title: 'Application & API Security',
      body: 'Manual web and API testing against the OWASP Top 10 — authentication and access-control flaws, injection, and business-logic abuse — supported by Burp Suite, Nmap, and Nessus.',
      tags: ['OWASP Top 10', 'Access control', 'API testing'],
    },
    {
      title: 'Security Operations & Detection Engineering',
      body: 'Building Windows telemetry pipelines on Sysmon, Winlogbeat, and the Elastic stack, then writing Sigma detections mapped to MITRE ATT&CK with alerting and investigation workflows.',
      tags: ['Sigma', 'MITRE ATT&CK', 'Elastic stack'],
    },
    {
      title: 'Static Malware Analysis & Threat Intelligence',
      body: 'Examining suspicious files without executing them — PE metadata, entropy scoring, suspicious strings, and YARA signature matching — to produce triage-ready indicators.',
      tags: ['PE analysis', 'YARA', 'Triage'],
    },
    {
      title: 'Security Tooling & Platforms',
      body: 'Turning analysis and detection workflows into working platforms with Python, Flask, FastAPI, React, and Docker, so the process is repeatable instead of manual.',
      tags: ['Python', 'FastAPI', 'Docker'],
    },
  ],
}

// Decorative, pre-scripted output for the hero terminal. Nothing here executes.
export const terminalLines = [
  { command: 'whoami', output: 'vibusha — security researcher & cybersecurity developer' },
  { command: 'cat focus.txt', output: 'vulnerability research · appsec · detection engineering' },
  {
    command: 'ls recognition/',
    output: 'nokia-hall-of-fame  GHSA-jqwv-p97j-cxxj  GHSA-472p-2cfj-h7h7  woodpecker-ci',
  },
]

export const skillGroups = [
  {
    label: 'Security',
    skills: [
      'Penetration Testing',
      'Vulnerability Assessment',
      'OWASP Top 10',
      'API Security Testing',
      'Static Malware Analysis',
      'Responsible Disclosure',
      'Detection Engineering',
      'Security Monitoring',
      'Incident Investigation',
      'Alert Management',
    ],
  },
  {
    label: 'SIEM & Analytics',
    skills: ['Elasticsearch', 'Kibana', 'Sysmon', 'Winlogbeat', 'Sigma', 'MITRE ATT&CK'],
  },
  {
    label: 'Tools',
    skills: ['Burp Suite', 'Nmap', 'Metasploit', 'Nessus', 'Wireshark', 'YARA'],
  },
  {
    label: 'Platforms',
    skills: ['Linux', 'Kali Linux', 'Docker', 'Git', 'GitHub'],
  },
  {
    label: 'Programming',
    skills: ['Python', 'Bash', 'SQL', 'Java', 'C'],
  },
]

export const projects = [
  {
    name: 'CogniShield AI',
    tagline: 'Enterprise AI Security Intelligence & Cloud Governance Platform',
    repo: 'https://github.com/vibushasatheeshkumar/CogniShield-AI',
    points: [
      'Built a full-stack SOC dashboard where AI thinks like a security analyst — combining threat detection, simulated cloud security posture, and a data-engineering ETL pipeline.',
      'Implemented hybrid ML + rule-based detection with anomaly detection, risk scoring, MITRE ATT&CK mapping, and automated compliance checks.',
      'Added a generative AI copilot for chat-based investigation, with one-click synthetic dataset generation or custom login/auth-log CSV upload — no API key, login, or cloud account required.',
    ],
    stack: ['Python', 'Machine Learning', 'ETL', 'MITRE ATT&CK', 'Generative AI', 'Cloud Security'],
  },
  {
    name: 'Watchtower',
    tagline: 'AI-Powered SOC & Detection Engineering Platform',
    repo: 'https://github.com/vibushasatheeshkumar/Watchtower-AI-Security-Operations-Detection-Engineering-Platform',
    points: [
      'Built a Dockerized SOC pipeline using Sysmon, Winlogbeat, Elasticsearch, Kibana, and Python.',
      'Implemented Sigma rule-based detections mapped to the MITRE ATT&CK framework for real-time threat detection.',
      'Automated alerting with contextual email notifications and interactive security dashboards.',
    ],
    stack: ['Docker', 'Sysmon', 'Winlogbeat', 'Elasticsearch', 'Kibana', 'Python', 'Sigma', 'MITRE ATT&CK'],
  },
  {
    name: 'MallnSight',
    tagline: 'Static Malware Analysis Platform',
    repo: 'https://github.com/vibushasatheeshkumar/mallnsight',
    points: [
      'Built a static malware analysis platform that analyzes suspicious files without executing them.',
      'Provides PE analysis, entropy scoring, YARA signature matching, and threat indicators.',
      'Generates downloadable PDF reports with optional cloud-based analysis history.',
    ],
    stack: ['Python', 'Flask', 'YARA', 'pefile', 'MongoDB Atlas', 'ReportLab', 'Bootstrap'],
  },
]

export const certifications = [
  'eLearnSecurity Junior Penetration Tester (eJPT)',
  'Certified Red Team Operations Management (CRTOM)',
  'Fortinet Certified Associate in Cybersecurity',
  'AI in DFIR — Belkasoft',
  'Advanced SQLite Queries — Belkasoft',
]

export const experience = [
  {
    role: 'Cloud Security Intern',
    org: 'SITER Norway Academy',
    period: 'June 2026 — July 2026',
    status: 'Completed',
    points: [
      'Learning cloud security, IAM, monitoring, and threat detection concepts through hands-on labs and practical exercises.',
    ],
  },
]

export const education = [
  {
    school: 'Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology',
    program: 'B.Tech Computer Science Engineering (Cybersecurity)',
    period: '2024 — 2028',
  },
  {
    school: 'The High Range School',
    program: 'Higher Secondary Education',
    period: '2014 — 2024',
  },
]

// Severity scores and patched versions below reflect the public advisories as
// published; see the linked evidence for each entry.
export const research = {
  recognition: [
    {
      title: 'Nokia Security Hall of Fame',
      org: 'Nokia Coordinated Vulnerability Disclosure',
      date: 'August 2026',
      status: 'Recognition',
      summary:
        "Recognized for responsibly disclosing a high-severity vulnerability through Nokia's security disclosure program.",
      link: {
        label: 'Official recognition',
        href: 'https://www.nokia.com/we-are-nokia/security/products/cvd/hall-of-fame/',
      },
    },
  ],
  advisories: [
    {
      title: 'Nokia mcp-redfish',
      advisoryId: 'GHSA-jqwv-p97j-cxxj',
      status: 'Published advisory',
      severity: { score: '9.3', label: 'Critical' },
      role: 'Credited reporter',
      summary:
        'Credited researcher on a published security advisory covering TLS certificate verification and unauthenticated SSDP host injection.',
      meta: ['CWE-295 · CWE-923', 'Affected ≤ 0.3.12', 'Patched in 0.4.0'],
      link: {
        label: 'View advisory',
        href: 'https://github.com/nokia-steward/mcp-redfish/security/advisories/GHSA-jqwv-p97j-cxxj',
      },
    },
    {
      title: 'Nokia ncm-issuer',
      advisoryId: 'GHSA-472p-2cfj-h7h7',
      status: 'Published advisory',
      severity: { score: '6.4', label: 'Moderate' },
      role: 'Credited reporter',
      summary: 'Reported a missing authorization check in the certificate renewal workflow.',
      meta: ['CWE-862 · CWE-441', 'Affected 1.2.2', 'Patched in 1.2.3'],
      link: {
        label: 'View advisory',
        href: 'https://github.com/nokia/ncm-issuer/security/advisories/GHSA-472p-2cfj-h7h7',
      },
    },
  ],
  resolved: [
    {
      title: 'Woodpecker CI',
      status: 'Fixed in v3.19.0',
      summary:
        'Reported matrix environment variable injection in the default clone step, addressed in v3.19.0 and acknowledged in the release notes.',
      meta: ['Acknowledged in release notes'],
      link: {
        label: 'Release notes',
        href: 'https://github.com/woodpecker-ci/woodpecker/releases/tag/v3.19.0',
      },
    },
  ],
  disclosures: [
    {
      title: 'AI Web Solutions',
      status: 'Hall of Fame',
      summary:
        'Critical vulnerability and remediation verification — an unauthenticated privilege escalation in the registration workflow that allowed unauthorized creation of a Superadmin account through improper role assignment.',
      tags: ['Privilege Escalation', 'Broken Access Control'],
    },
    {
      title: 'GenXploit',
      status: 'Hall of Fame',
      summary: 'Broken Access Control Hall of Fame — identified and responsibly disclosed a broken access control vulnerability.',
      tags: ['Broken Access Control'],
    },
    {
      title: 'Humphreys University',
      status: 'Appreciation letter',
      summary: 'Exposed email credentials — reported a sensitive data exposure affecting the university.',
      tags: ['Sensitive Data Exposure'],
    },
  ],
}
