import {
  SiPython,
  SiDocker,
  SiLinux,
  SiGit,
  SiGithub,
  SiWireshark,
  SiElasticsearch,
  SiKibana,
  SiC,
  SiGnubash,
  SiKalilinux,
  SiOwasp,
  SiPortswigger,
  SiMetasploit,
  SiElastic,
} from 'react-icons/si'
import { FaJava, FaDatabase, FaTerminal, FaShieldHalved, FaNetworkWired } from 'react-icons/fa6'

export const skillIcons = {
  'OWASP Top 10': SiOwasp,
  'Burp Suite': SiPortswigger,
  Metasploit: SiMetasploit,
  Wireshark: SiWireshark,
  Elasticsearch: SiElasticsearch,
  Kibana: SiKibana,
  Winlogbeat: SiElastic,
  Linux: SiLinux,
  'Kali Linux': SiKalilinux,
  Docker: SiDocker,
  Git: SiGit,
  GitHub: SiGithub,
  Python: SiPython,
  Bash: SiGnubash,
  Java: FaJava,
  C: SiC,
  SQL: FaDatabase,
  Nmap: FaNetworkWired,
  Nessus: FaShieldHalved,
  Sysmon: FaTerminal,
}

export const defaultSkillIcon = FaShieldHalved
