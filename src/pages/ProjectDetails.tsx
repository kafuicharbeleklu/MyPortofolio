import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Checkmark, Quotes } from '@carbon/icons-react';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import powerBI1 from '@/images/powerBI/PBI_1.png';
import powerBI2 from '@/images/powerBI/PBI_2.png';
import powerBI3 from '@/images/powerBI/PBI_3.png';

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();

  const projectsData: Record<string, any> = {
    'wazuh-ai': {
      title: t('projects.p2.title'),
      subtitle: 'Wazuh SIEM + Gemini API Integration',
      description: t('projects.p2.solution'),
      tags: ['Wazuh SIEM', 'Gemini API', 'Python', 'Automation'],
      impacts: [t('projects.p2.i1'), t('projects.p2.i2'), t('projects.p2.i3')],
      codeSnippet: `import requests
import json
import os

# Fetch alerts from Wazuh API
def get_wazuh_alerts():
    headers = {'Authorization': f'Bearer {os.environ.get("WAZUH_TOKEN")}'}
    response = requests.get('https://wazuh-manager/security/alerts', headers=headers)
    return response.json()

# Analyze alert with Gemini API
def analyze_with_ai(alert_data):
    prompt = f"Analyze this security alert and provide a risk assessment:\\n{json.dumps(alert_data)}"
    
    genai_payload = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    
    headers = {'Content-Type': 'application/json'}
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={os.environ.get('GEMINI_API_KEY')}"
    
    ai_response = requests.post(url, headers=headers, json=genai_payload)
    return ai_response.json()

# Main automation loop
if __name__ == "__main__":
    alerts = get_wazuh_alerts()
    for alert in alerts.get('data', []):
        if alert.get('rule', {}).get('level', 0) >= 7:
            analysis = analyze_with_ai(alert)
            print(f"Alert {alert['id']} Analysis: {analysis}")`,
      testimonial: {
        quote: "Charbel's integration of AI with our SIEM has drastically reduced our incident response time. The automated triage allows our team to focus on critical threats rather than drowning in false positives.",
        author: "IT Manager",
        company: "Neemba Togo"
      }
    },
    'power-bi': {
      title: t('projects.p3.title'),
      subtitle: 'Power BI Dashboards & Matrix42 Integration',
      description: t('projects.p3.solution'),
      tags: ['Power BI', 'Data Analytics', 'Matrix42', 'SQL'],
      impacts: [t('projects.p3.i1'), t('projects.p3.i2'), t('projects.p3.i3')],
      images: [
        powerBI1,
        powerBI2,
        powerBI3
      ],
      imageCaptions: language === 'en'
        ? [
            'Budget trend by department',
            'Asset lifecycle and allocation',
            'Operational KPI monitoring',
          ]
        : [
            'Tendance budgétaire par département',
            'Cycle de vie et allocation des actifs',
            'Suivi des KPI opérationnels',
          ],
      confidentialNote: language === 'en'
        ? 'Sensitive values are intentionally blurred for confidentiality.'
        : 'Les valeurs sensibles sont volontairement floutées pour la confidentialité.',
      testimonial: {
        quote: "The dashboards Charbel developed gave us unprecedented visibility into our IT spending and asset lifecycle. It transformed how we make strategic decisions.",
        author: "IT Director",
        company: "Neemba Togo"
      }
    }
  };

  const project = id ? projectsData[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-carbon-bg text-carbon-text-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-4">{t('project.notFound')}</h1>
          <Link to="/" className="text-carbon-blue hover:underline flex items-center justify-center gap-2">
            <ArrowLeft /> {t('project.backHome')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-carbon-bg text-carbon-text-primary selection:bg-carbon-blue selection:text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link to="/" className="inline-flex items-center gap-2 text-carbon-text-secondary hover:text-carbon-blue transition-colors mb-12">
            <ArrowLeft className="w-5 h-5" />
            {t('project.back')}
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-carbon-text-primary">
                {project.title}
              </h1>
              <p className="text-xl text-carbon-text-secondary font-medium">
                {project.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-12">
              {project.tags.map((tag: string, i: number) => (
                <span key={i} className="px-3 py-1.5 text-sm font-mono text-carbon-text-secondary bg-carbon-layer-2 border border-carbon-border-subtle">
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose prose-invert max-w-none mb-16">
              <p className="text-lg leading-relaxed text-carbon-text-secondary">
                {project.description}
              </p>
            </div>

            {project.impacts && project.impacts.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold mb-6 text-carbon-text-primary">{t('projects.impact')}</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {project.impacts.map((impact: string, idx: number) => (
                    <div key={idx} className="p-5 border border-carbon-border-subtle bg-carbon-layer-1">
                      <div className="flex items-start gap-3">
                        <Checkmark className="w-5 h-5 text-carbon-blue mt-0.5 flex-shrink-0" />
                        <p className="text-carbon-text-primary">{impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.images && project.images.length > 0 && (
              <div className="mb-16">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <h3 className="text-2xl font-semibold text-carbon-text-primary">{t('project.dashboard')}</h3>
                  <span className="px-3 py-1 text-xs font-mono border border-carbon-border-subtle bg-carbon-layer-1 text-carbon-text-secondary">
                    {t('project.confidential')}
                  </span>
                </div>
                {project.confidentialNote && (
                  <p className="text-sm text-carbon-text-secondary mb-6">{project.confidentialNote}</p>
                )}
                <div className="grid md:grid-cols-2 gap-6">
                  {project.images.map((img: string, idx: number) => (
                    <figure
                      key={idx}
                      className={`border border-carbon-border-subtle p-2 bg-carbon-layer-1 ${idx === 2 ? 'md:col-span-2' : ''}`}
                    >
                      <div className="relative overflow-hidden bg-carbon-layer-2">
                        <img 
                          src={img} 
                          alt={`Dashboard Screenshot ${idx + 1}`} 
                          className={`w-full object-cover object-top scale-[1.01] blur-[1.8px] brightness-90 saturate-75 ${idx === 2 ? 'h-[320px]' : 'h-[260px]'}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-carbon-bg/35 via-transparent to-carbon-blue/15" />
                        <div className="absolute top-3 right-3 px-2 py-1 text-[11px] font-mono border border-carbon-border-subtle bg-carbon-layer-1/85 backdrop-blur-sm text-carbon-text-secondary">
                          {t('project.confidential')}
                        </div>
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-carbon-bg/80 to-transparent">
                          <p className="text-xs font-medium text-carbon-text-primary">
                            {project.imageCaptions?.[idx] ?? `Dashboard ${idx + 1}`}
                          </p>
                        </div>
                      </div>
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {project.image && !project.images && (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold mb-6 text-carbon-text-primary">{t('project.dashboard')}</h3>
                <div className="border border-carbon-border-subtle p-2 bg-carbon-layer-1 rounded-sm">
                  <div className="relative aspect-video overflow-hidden bg-carbon-layer-2">
                    <img 
                      src={project.image} 
                      alt="Dashboard Screenshot" 
                      className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-carbon-blue/20 to-transparent mix-blend-overlay"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-carbon-layer-1/80 backdrop-blur-md px-4 py-2 text-sm font-mono border border-carbon-border-subtle">
                        {t('project.confidential')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {project.codeSnippet && (
              <div className="mb-16">
                <h3 className="text-2xl font-semibold mb-6 text-carbon-text-primary">{t('project.script')}</h3>
                <div className="bg-[#161616] border border-carbon-border-subtle overflow-hidden">
                  <div className="flex items-center px-4 py-2 bg-[#262626] border-b border-carbon-border-subtle">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#393939]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#393939]"></div>
                      <div className="w-3 h-3 rounded-full bg-[#393939]"></div>
                    </div>
                    <span className="ml-4 text-xs font-mono text-[#8d8d8d]">automation.py</span>
                  </div>
                  <pre className="p-6 overflow-x-auto text-sm font-mono text-[#f4f4f4] leading-relaxed">
                    <code>{project.codeSnippet}</code>
                  </pre>
                </div>
              </div>
            )}

            {project.testimonial && (
              <div className="mt-16 bg-carbon-layer-2 border-l-4 border-carbon-blue p-8 relative">
                <Quotes className="absolute top-6 right-8 w-12 h-12 text-carbon-border opacity-20" />
                <p className="text-xl italic text-carbon-text-primary mb-6 relative z-10">
                  "{project.testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-carbon-layer-1 flex items-center justify-center rounded-full border border-carbon-border-subtle">
                    <Checkmark className="w-5 h-5 text-carbon-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-carbon-text-primary">{project.testimonial.author}</p>
                    <p className="text-sm text-carbon-text-secondary">{project.testimonial.company}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      
      <footer className="py-8 text-center text-sm text-carbon-text-secondary border-t border-carbon-border-subtle bg-carbon-layer-1">
        <p>{t('footer.text')}</p>
      </footer>
    </div>
  );
}
