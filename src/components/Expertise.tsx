import { motion } from 'motion/react';
import { Firewall, BareMetalServer, Bot } from '@carbon/icons-react';
import { useLanguage } from '../context/LanguageContext';

export default function Expertise() {
  const { t } = useLanguage();

  const expertiseAreas = [
    {
      title: t('expertise.card1.title'),
      icon: Firewall,
      skills: [
        t('expertise.card1.s1'),
        t('expertise.card1.s2'),
        t('expertise.card1.s3'),
        t('expertise.card1.s4'),
        t('expertise.card1.s5')
      ]
    },
    {
      title: t('expertise.card2.title'),
      icon: BareMetalServer,
      skills: [
        t('expertise.card2.s1'),
        t('expertise.card2.s2'),
        t('expertise.card2.s3'),
        t('expertise.card2.s4'),
        t('expertise.card2.s5')
      ]
    },
    {
      title: t('expertise.card3.title'),
      icon: Bot,
      skills: [
        t('expertise.card3.s1'),
        t('expertise.card3.s2'),
        t('expertise.card3.s3'),
        t('expertise.card3.s4'),
        t('expertise.card3.s5')
      ]
    }
  ];

  return (
    <section id="expertise" className="py-24 bg-carbon-bg">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-2xl"
        >
          <h2 className="text-4xl font-semibold mb-4 text-carbon-text-primary">
            {t('expertise.title')}
          </h2>
          <p className="text-lg text-carbon-text-secondary font-normal">
            {t('expertise.desc')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-carbon-layer-1 border border-carbon-border-subtle p-8 hover:border-carbon-border transition-colors"
            >
              <div className="mb-6">
                <area.icon className="w-8 h-8 text-carbon-blue" />
              </div>
              <h3 className="text-2xl font-semibold mb-6 text-carbon-text-primary">{area.title}</h3>
              <ul className="space-y-4">
                {area.skills.map((skill, i) => (
                  <li key={i} className="flex items-start gap-3 text-carbon-text-secondary">
                    <div className="w-1.5 h-1.5 bg-carbon-blue mt-2 flex-shrink-0" />
                    <span className="leading-relaxed">{skill}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
