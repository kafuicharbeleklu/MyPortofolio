import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

export default function TechStack() {
  const { language, t } = useLanguage();

  const techCategories = [
    {
      title: language === 'en' ? 'Systems & Virtualization' : 'Systèmes & Virtualisation',
      skills: ['Linux (Debian, Ubuntu)', 'Windows Server', 'VMware ESXi', 'Hyper-V', 'Docker']
    },
    {
      title: language === 'en' ? 'Security & Network' : 'Sécurité & Réseau',
      skills: ['Wazuh (SIEM/XDR)', 'pfSense', 'Veeam', 'IAM', 'TCP/IP, DNS, DHCP']
    },
    {
      title: language === 'en' ? 'Cloud & Automation' : 'Cloud & Automatisation',
      skills: ['Microsoft Azure', 'AWS', 'Python', 'Bash', 'PowerShell']
    },
    {
      title: language === 'en' ? 'Data & AI' : 'Data & IA',
      skills: ['Power BI', 'Gemini API', 'SQL Server / Oracle', 'Matrix42']
    }
  ];

  return (
    <section className="py-24 bg-carbon-layer-1 border-t border-carbon-border-subtle">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-semibold mb-4 text-carbon-text-primary">
            {t('tech.title')}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-6 text-carbon-blue uppercase tracking-wider text-sm">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-2 text-sm font-medium text-carbon-text-secondary bg-carbon-layer-2 border border-carbon-border-subtle hover:border-carbon-blue hover:text-carbon-text-primary transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
