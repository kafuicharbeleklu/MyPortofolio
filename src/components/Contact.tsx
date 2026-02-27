import { useState } from 'react';
import { motion } from 'motion/react';
import { LogoGithub, LogoLinkedin, Email, Location, ArrowRight } from '@carbon/icons-react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { language, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const email = 'charbelkafuieklu@gmail.com';

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-carbon-layer-1">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-carbon-layer-2 border border-carbon-border-subtle p-12 md:p-16"
        >
          <h2 className="text-4xl md:text-5xl font-semibold text-carbon-text-primary mb-6">{t('contact.title')}</h2>
          <p className="text-lg text-carbon-text-secondary font-normal mb-10 max-w-2xl mx-auto">
            {t('contact.desc')}
          </p>

          <div className="mb-10 border border-carbon-border-subtle bg-carbon-layer-1 p-5 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-wider text-carbon-text-helper mb-3">
              {language === 'en' ? 'Direct Email' : 'Email direct'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <a href={`mailto:${email}`} className="text-carbon-link hover:text-carbon-blue transition-colors break-all font-mono text-sm">
                {email}
              </a>
              <button
                onClick={copyEmail}
                className="px-4 py-2 border border-carbon-border-subtle text-carbon-text-primary hover:border-carbon-blue hover:text-carbon-blue transition-colors text-sm"
              >
                {copied ? (language === 'en' ? 'Copied' : 'Copie') : (language === 'en' ? 'Copy email' : "Copier l'email")}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a href={`mailto:${email}`} className="group flex items-center justify-between gap-8 bg-carbon-blue text-white px-6 py-4 font-medium hover:bg-carbon-blue-hover transition-colors w-full sm:w-auto min-w-[220px]">
              <span className="flex items-center gap-3">
                <Email className="w-5 h-5" />
                {language === 'en' ? 'Open Mail App' : 'Ouvrir messagerie'}
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-center">
              <a href="https://www.linkedin.com/in/kafui-charbel-eklu" target="_blank" rel="noreferrer" className="p-4 border border-carbon-border-subtle text-carbon-text-secondary hover:bg-carbon-layer-1 hover:text-carbon-text-primary transition-colors">
                <LogoLinkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/charbel-eklu" target="_blank" rel="noreferrer" className="p-4 border border-carbon-border-subtle text-carbon-text-secondary hover:bg-carbon-layer-1 hover:text-carbon-text-primary transition-colors">
                <LogoGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-carbon-text-secondary font-medium">
            <span className="flex items-center gap-2">
              <Location className="w-4 h-4 text-carbon-blue" />
              Segbe, Lome-Togo
            </span>
            <span className="hidden sm:block text-carbon-border-subtle">|</span>
            <span>+228 70664225</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
