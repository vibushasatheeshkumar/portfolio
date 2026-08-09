export const profile = {
  name: 'Vibusha',
  title: 'Cybersecurity Student',
  bio: "Cybersecurity student pursuing a B.Tech in Computer Science and Engineering (Cybersecurity), with hands-on experience in penetration testing, detection engineering, and security monitoring. eJPT and CRTOM certified, with internship experience across offensive security and cloud security. I like taking things apart to see how they break — from building detection pipelines mapped to MITRE ATT&CK to hunting real vulnerabilities through responsible disclosure. Currently sharpening my red-teaming and cloud security skills, with an eye on a career in offensive security and threat detection.",
  email: 'vibushasatheeshkumar@gmail.com',
  github: 'https://github.com/vibushasatheeshkumar',
  linkedin: 'https://linkedin.com/in/vibushasatheeshkumar',
  medium: 'https://medium.com/@vibushasatheeshkumar',
}

export const skillGroups = [
  {
    label: 'Security',
    skills: [
      'Penetration Testing',
      'Vulnerability Assessment',
      'OWASP Top 10',
      'API Security Testing',
      'Detection Engineering',
      'Security Monitoring',
      'Incident Investigation',
      'Alert Management',
    ],
  },
  {
    label: 'SIEM & Analytics',
    skills: ['Elasticsearch', 'Kibana', 'Sysmon', 'Winlogbeat'],
  },
  {
    label: 'Tools',
    skills: ['Burp Suite', 'Nmap', 'Metasploit', 'Nessus', 'Wireshark'],
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
    period: '2026 — Present',
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

export const achievements = [
  {
    title: 'AI Web Solutions Ltd. – Hall of Fame',
    description:
      'Recognized for responsibly disclosing an unauthenticated privilege escalation vulnerability in the registration workflow that allowed unauthorized creation of a Superadmin account through improper role assignment during user registration.',
    badge: 'Hall of Fame',
    color: 'primary',
    tags: ['Bug Bounty', 'Responsible Disclosure', 'Privilege Escalation', 'Broken Access Control'],
  },
  {
    title: 'GenXploit Hall of Fame',
    description: 'Identified and responsibly disclosed a Broken Access Control vulnerability in GenXploit.',
    badge: 'Hall of Fame',
    color: 'primary',
    tags: ['Bug Bounty', 'Responsible Disclosure', 'Broken Access Control'],
  },
  {
    title: 'Appreciation Letter — Humphreys University',
    description: 'Reported a sensitive data exposure vulnerability affecting Humphreys University.',
    badge: 'Appreciated',
    color: 'secondary',
    tags: ['Vulnerability Research', 'Responsible Disclosure', 'Sensitive Data Exposure'],
  },
]
