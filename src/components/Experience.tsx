import { motion } from 'motion/react';
import { Enterprise, Education } from '@carbon/icons-react';
import { useLanguage } from '../context/LanguageContext';

export default function Experience() {
  const { language, t } = useLanguage();

  const experiences = [
    {
      type: 'work',
      date: language === 'en' ? 'Aug 2024 - Present' : 'Août 2024 - Présent',
      role: language === 'en' ? 'Digital Workplace Administrator' : 'Administrateur Digital Workplace',
      company: 'Neemba Togo',
      description: language === 'en' 
        ? 'Managing IT budget, vendor relations, and telecom projects (mobile network portability). Supervising access rights and maintaining IT infrastructure.' 
        : 'Pilotage du budget informatique, relation fournisseurs et projets télécoms. Supervision des droits d\'accès et maintenance du parc informatique.'
    },
    {
      type: 'edu',
      date: language === 'en' ? '2024 - Present' : '2024 - Présent',
      role: language === 'en' ? 'Master II in IT & Networks' : 'MASTER II en Informatique & Réseaux',
      company: 'Collège de Paris Supérieur, Lomé',
      description: ''
    },
    {
      type: 'work',
      date: language === 'en' ? 'Aug 2023 - Aug 2024' : 'Août 2023 - Août 2024',
      role: language === 'en' ? 'IT Technician' : 'Technicien Informatique',
      company: 'Neemba Togo',
      description: language === 'en' 
        ? 'Maintenance, installation, and technical support of IT equipment. Inventory management and performance monitoring.' 
        : 'Maintenance, installation et support technique des équipements informatiques. Gestion de l\'inventaire et surveillance des performances.'
    },
    {
      type: 'work',
      date: language === 'en' ? 'May 2023 - Aug 2023' : 'Mai 2023 - Août 2023',
      role: language === 'en' ? 'IT Technician (Internship)' : 'Technicien Informatique (Stage)',
      company: 'Togo Equipements',
      description: language === 'en' 
        ? 'Deployed Wazuh SIEM/XDR system and implemented automated security incident responses.' 
        : 'Déploiement d\'un système de détection d\'intrusion (SIEM/XDR) avec Wazuh et mise en place de réponses automatiques.'
    },
    {
      type: 'edu',
      date: '2022 - 2023',
      role: language === 'en' ? 'Bachelor in Systems & Network Admin' : 'Licence (Bac+3) Administration Système et Réseau',
      company: 'IAI-TOGO',
      description: ''
    },
    {
      type: 'work',
      date: language === 'en' ? 'Jun 2022 - Oct 2022' : 'Juin 2022 - Oct. 2022',
      role: language === 'en' ? 'IT Support & Systems (Internship)' : 'Technicien Support & Système (Stage)',
      company: 'Orabank Togo',
      description: language === 'en' 
        ? 'Installed and configured a Windows Server domain controller (AD, GPO, DHCP, VPN). Provided N2/N3 support.' 
        : 'Installation et configuration d’un contrôleur de domaine Windows Server (AD, GPO, DHCP, VPN). Support N2/N3.'
    }
  ];

  return (
    <section id="experience" className="py-24 bg-carbon-bg">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-semibold mb-4 text-carbon-text-primary">
            {t('exp.title')}
          </h2>
        </motion.div>

        <div className="relative border-l border-carbon-border-subtle ml-4 md:ml-0">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="mb-12 pl-8 md:pl-12 relative"
            >
              {/* Timeline dot/icon */}
              <div className="absolute -left-5 md:-left-6 top-0 w-10 h-10 md:w-12 md:h-12 bg-carbon-layer-1 border border-carbon-border-subtle rounded-full flex items-center justify-center shadow-sm">
                {exp.type === 'work' ? (
                  <Enterprise className="w-5 h-5 md:w-6 md:h-6 text-carbon-blue" />
                ) : (
                  <Education className="w-5 h-5 md:w-6 md:h-6 text-carbon-text-secondary" />
                )}
              </div>

              <div className="bg-carbon-layer-2 border border-carbon-border-subtle p-6 hover:border-carbon-border transition-colors">
                <span className="text-sm font-mono text-carbon-blue mb-2 block">
                  {exp.date}
                </span>
                <h3 className="text-xl font-semibold text-carbon-text-primary mb-1">
                  {exp.role}
                </h3>
                <h4 className="text-md font-medium text-carbon-text-secondary mb-4">
                  {exp.company}
                </h4>
                {exp.description && (
                  <p className="text-carbon-text-primary leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
