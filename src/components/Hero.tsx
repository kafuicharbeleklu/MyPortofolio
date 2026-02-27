import { motion } from 'motion/react';
import { ArrowRight, DocumentDownload } from '@carbon/icons-react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-carbon-bg">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-4 mb-6"
          >
            <div className="flex gap-2">
              <span className="px-3 py-1 text-xs font-mono text-carbon-text-primary bg-carbon-layer-2 border border-carbon-border">
                {t('hero.badge1')}
              </span>
              <span className="px-3 py-1 text-xs font-mono text-carbon-text-primary bg-carbon-layer-2 border border-carbon-border">
                {t('hero.badge2')}
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-semibold tracking-tight mb-6 leading-tight text-carbon-text-primary"
          >
            {t('hero.title1')} <br />
            <span className="text-carbon-blue">
              {t('hero.title2')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-carbon-text-secondary mb-10 max-w-2xl font-normal leading-relaxed"
          >
            {t('hero.desc')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a href="/#projects" className="group flex items-center justify-between gap-8 bg-carbon-blue text-white px-6 py-4 font-medium hover:bg-carbon-blue-hover transition-colors min-w-[200px]">
              {t('hero.cta.projects')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-3 border border-carbon-blue text-carbon-link px-6 py-4 font-medium hover:bg-carbon-blue hover:text-white transition-colors">
              <DocumentDownload className="w-5 h-5" />
              {t('hero.cta.resume')}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
