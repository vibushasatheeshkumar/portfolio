export const profile = {
  name: 'Vibusha',
  title: 'Cybersecurity Student',
  bio: "Cybersecurity student pursuing a B.Tech in Computer Science and Engineering (Cybersecurity), with hands-on experience in penetration testing, detection engineering, and security monitoring. eJPT certified, with internship experience in offensive security and cloud security.",
  email: 'vibushasatheeshkumar@gmail.com',
  github: 'https://github.com/vibushasatheeshkumar',
  linkedin: 'https://linkedin.com/in/vibushasatheeshkumar',
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
    title: 'GenXploit Hall of Fame',
    description: 'Identified and responsibly disclosed a Broken Access Control vulnerability in GenXploit.',
  },
  {
    title: 'Appreciation Letter — Humphreys University',
    description: 'Reported a sensitive data exposure vulnerability affecting Humphreys University.',
  },
]
