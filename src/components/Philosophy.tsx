import { motion } from 'motion/react';
import { IbmCloudSecurity, Network_1, MachineLearningModel, Microservices_1 } from '@carbon/icons-react';
import { useLanguage } from '../context/LanguageContext';
import philosophyBackground from '@/images/background/background_cent_ans.webp';

export default function Philosophy() {
  const { t } = useLanguage();

  const visionItems = [
    { text: t('philosophy.vision.i1'), icon: IbmCloudSecurity },
    { text: t('philosophy.vision.i2'), icon: Network_1 },
    { text: t('philosophy.vision.i3'), icon: MachineLearningModel },
    { text: t('philosophy.vision.i4'), icon: Microservices_1 }
  ];

  return (
    <section className="py-24 bg-carbon-bg relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src={philosophyBackground} 
          alt="Background" 
          className="w-full h-full object-cover grayscale" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-carbon-bg via-transparent to-carbon-bg"></div>
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-carbon-layer-1 border border-carbon-border-subtle p-10 relative overflow-hidden flex flex-col justify-center"
          >
            <h2 className="text-3xl font-semibold mb-8 text-carbon-text-primary relative z-10">
              {t('philosophy.title')}
            </h2>
            <blockquote className="relative z-10 border-l-4 border-carbon-blue pl-6">
              <p className="text-3xl font-medium leading-tight text-carbon-text-primary mb-6">
                {t('philosophy.quote')}
              </p>
              <p className="text-lg text-carbon-text-secondary">
                {t('philosophy.desc')}
              </p>
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-carbon-layer-1 border border-carbon-border-subtle p-10 flex flex-col justify-center"
          >
            <h2 className="text-3xl font-semibold mb-6 text-carbon-text-primary">
              {t('philosophy.vision.title')}
            </h2>
            <div className="space-y-8">
              <p className="text-lg text-carbon-text-secondary font-normal">
                {t('philosophy.vision.desc1')}
                <strong className="text-carbon-text-primary font-medium">{t('philosophy.vision.desc2')}</strong>
                {t('philosophy.vision.desc3')}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {visionItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-carbon-layer-2 border border-carbon-border-subtle hover:border-carbon-border transition-colors group">
                    <div className="flex-shrink-0">
                      <item.icon className="w-6 h-6 text-carbon-blue group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-sm font-medium text-carbon-text-primary">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
