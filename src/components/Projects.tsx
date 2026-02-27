import { motion } from 'motion/react';
import { ArrowUpRight, Security, Cloud, ChartLine, SettingsAdjust, ArrowRight } from '@carbon/icons-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Projects() {
  const { t } = useLanguage();

  const projects = [
    {
      title: t('projects.p1.title'),
      icon: SettingsAdjust,
      problem: t('projects.p1.problem'),
      solution: t('projects.p1.solution'),
      impact: [t('projects.p1.i1'), t('projects.p1.i2'), t('projects.p1.i3')],
      tags: ['Power Apps', 'Governance', 'Automation']
    },
    {
      id: 'wazuh-ai',
      title: t('projects.p2.title'),
      icon: Security,
      problem: t('projects.p2.problem'),
      solution: t('projects.p2.solution'),
      impact: [t('projects.p2.i1'), t('projects.p2.i2'), t('projects.p2.i3')],
      tags: ['Wazuh SIEM', 'Gemini API', 'Python']
    },
    {
      id: 'power-bi',
      title: t('projects.p3.title'),
      icon: ChartLine,
      problem: t('projects.p3.problem'),
      solution: t('projects.p3.solution'),
      impact: [t('projects.p3.i1'), t('projects.p3.i2'), t('projects.p3.i3')],
      tags: ['Power BI', 'Data Analytics', 'Matrix42']
    },
    {
      title: t('projects.p4.title'),
      icon: Cloud,
      problem: t('projects.p4.problem'),
      solution: t('projects.p4.solution'),
      impact: [t('projects.p4.i1'), t('projects.p4.i2'), t('projects.p4.i3')],
      tags: ['Windows Server', 'pfSense', 'IAM', '2FA']
    }
  ];

  return (
    <section id="projects" className="py-24 bg-carbon-layer-1">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <h2 className="text-4xl font-semibold mb-4 text-carbon-text-primary">
              {t('projects.title')}
            </h2>
            <p className="text-lg text-carbon-text-secondary font-normal">
              {t('projects.desc')}
            </p>
          </div>
          <a href="https://github.com/charbel-eklu" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-carbon-blue hover:text-carbon-blue-hover font-medium transition-colors">
            {t('projects.seeAll')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const CardContent = (
              <>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-carbon-layer-1 flex items-center justify-center flex-shrink-0 border border-carbon-border-subtle group-hover:bg-carbon-blue group-hover:border-carbon-blue transition-colors">
                      <Icon className="w-6 h-6 text-carbon-blue group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-semibold text-carbon-text-primary group-hover:text-carbon-blue transition-colors pr-4">
                      {project.title}
                    </h3>
                  </div>
                  {project.id && (
                    <div className="w-10 h-10 bg-carbon-layer-1 flex items-center justify-center flex-shrink-0 group-hover:bg-carbon-blue group-hover:text-white transition-colors border border-carbon-border-subtle group-hover:border-carbon-blue">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 text-xs font-mono text-carbon-text-secondary bg-carbon-layer-1 border border-carbon-border-subtle">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-6 flex-grow">
                  <div>
                    <h4 className="text-sm font-semibold text-carbon-text-helper uppercase tracking-wider mb-2">{t('projects.problem')}</h4>
                    <p className="text-carbon-text-primary">{project.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-carbon-text-helper uppercase tracking-wider mb-2">{t('projects.solution')}</h4>
                    <p className="text-carbon-text-primary">{project.solution}</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-carbon-border-subtle">
                  <h4 className="text-sm font-semibold text-carbon-blue uppercase tracking-wider mb-3">{t('projects.impact')}</h4>
                  <ul className="space-y-2">
                    {project.impact.map((item, i) => (
                      <li key={i} className="text-carbon-text-primary flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-carbon-blue mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            );

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="bg-carbon-layer-2 border border-carbon-border-subtle p-8 flex flex-col h-full group hover:border-carbon-blue hover:shadow-2xl hover:shadow-carbon-blue/10 transition-all relative overflow-hidden"
              >
                {/* Subtle overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-carbon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                {project.id ? (
                  <Link to={`/project/${project.id}`} className="absolute inset-0 z-10">
                    <span className="sr-only">View {project.title} details</span>
                  </Link>
                ) : null}
                <div className="relative z-20 pointer-events-none">
                  {CardContent}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
