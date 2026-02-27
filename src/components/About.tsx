import { motion } from 'motion/react';
import { BareMetalServer, Firewall, Chip, Network_1 } from '@carbon/icons-react';
import { useLanguage } from '../context/LanguageContext';
import profilePhoto from '@/images/me/Kafui Charbel EKLU.jpeg';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-carbon-layer-1">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4"
          >
            <div className="relative p-2 bg-carbon-layer-2 border border-carbon-border-subtle inline-block">
              <img 
                src={profilePhoto} 
                alt="Charbel Kafui Eklu" 
                className="w-full max-w-sm mx-auto grayscale hover:grayscale-0 transition-all duration-500 object-cover"
              />
              <div className="absolute inset-0 bg-carbon-blue/10 mix-blend-overlay pointer-events-none"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8"
          >
            <h2 className="text-4xl font-semibold mb-6 text-carbon-text-primary">
              {t('about.title')}
            </h2>
            <div className="space-y-4 text-carbon-text-secondary font-normal leading-relaxed text-lg mb-12">
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
              <p>{t('about.p3')}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: BareMetalServer, title: t('about.card1.title'), desc: t('about.card1.desc') },
                { icon: Firewall, title: t('about.card2.title'), desc: t('about.card2.desc') },
                { icon: Chip, title: t('about.card3.title'), desc: t('about.card3.desc') },
                { icon: Network_1, title: t('about.card4.title'), desc: t('about.card4.desc') },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-carbon-layer-2 border border-carbon-border-subtle hover:border-carbon-border transition-colors group">
                  <div className="mb-4">
                    <item.icon className="w-8 h-8 text-carbon-link group-hover:text-carbon-blue transition-colors" />
                  </div>
                  <h3 className="font-semibold text-carbon-text-primary mb-1">{item.title}</h3>
                  <p className="text-sm text-carbon-text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
