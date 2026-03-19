import{r as n,j as e}from"./index-MGAWEDt5.js";import{m as U}from"./PortfolioRoot-CqAuvuFo.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),E=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(s,r,a)=>a?a.toUpperCase():r.toLowerCase()),C=t=>{const s=E(t);return s.charAt(0).toUpperCase()+s.slice(1)},L=(...t)=>t.filter((s,r,a)=>!!s&&s.trim()!==""&&a.indexOf(s)===r).join(" ").trim(),M=t=>{for(const s in t)if(s.startsWith("aria-")||s==="role"||s==="title")return!0};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var z={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=n.forwardRef(({color:t="currentColor",size:s=24,strokeWidth:r=2,absoluteStrokeWidth:a,className:i="",children:l,iconNode:p,...u},m)=>n.createElement("svg",{ref:m,...z,width:s,height:s,stroke:t,strokeWidth:a?Number(r)*24/Number(s):r,className:L("lucide",i),...!l&&!M(u)&&{"aria-hidden":"true"},...u},[...p.map(([b,d])=>n.createElement(b,d)),...Array.isArray(l)?l:[l]]));/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=(t,s)=>{const r=n.forwardRef(({className:a,...i},l)=>n.createElement(_,{ref:l,iconNode:s,className:L(`lucide-${I(C(t))}`,`lucide-${t}`,a),...i}));return r.displayName=C(t),r};/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]],P=j("message-circle",R);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]],$=j("send",S);/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],k=j("x",B),g="".trim(),O="Bonjour ! Je suis l'assistant virtuel de Kafui. Comment puis-je vous aider aujourd'hui ?",K="Le chatbot n'est pas configure. Ajoutez VITE_CHATBOT_API_URL dans .env.local, puis redemarrez l'application.",T="Le chatbot IA n'est pas disponible sur cette version GitHub Pages. Utilisez plutot l'email ou LinkedIn pour me contacter.",N="chatbot-panel",A="chatbot-title",F=()=>{const t=typeof window<"u"&&window.location.hostname.endsWith("github.io"),s=!!g||!t,r=t?T:K,a=!!g,[i,l]=n.useState(!1),[p,u]=n.useState([{text:a?O:r,isUser:!1}]),[m,b]=n.useState(""),[d,y]=n.useState(!1),v=n.useRef(null);n.useEffect(()=>{var o;(o=v.current)==null||o.scrollIntoView({behavior:"smooth"})},[p]);const w=async()=>{if(!m.trim()||d)return;const o=m.trim();if(b(""),u(c=>[...c,{text:o,isUser:!0}]),!a){u(c=>[...c,{text:r,isUser:!1}]);return}y(!0);try{const c=p.slice(1).map(x=>({role:x.isUser?"user":"assistant",text:x.text})),f=await fetch(g,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:o,history:c})}),h=await f.json().catch(()=>null);if(!f.ok)throw new Error((h==null?void 0:h.error)||"La requete du chatbot a echoue.");u(x=>[...x,{text:(h==null?void 0:h.reply)||"Desole, je n'ai pas pu generer de reponse.",isUser:!1}])}catch(c){console.error("Erreur chatbot:",c),u(f=>[...f,{text:"Une erreur reseau est survenue. Verifiez l'URL du worker Cloudflare puis reessayez.",isUser:!1}])}finally{y(!1)}};return s?e.jsxs(e.Fragment,{children:[i&&e.jsxs("div",{className:"chat-window",id:N,role:"dialog","aria-modal":"false","aria-labelledby":A,children:[e.jsxs("div",{className:"chat-header",children:[e.jsxs("div",{className:"chat-header-left",children:[e.jsx("div",{className:`chat-status-dot ${a?"online":"offline"}`}),e.jsx("h3",{id:A,children:"Assistant Virtuel"})]}),e.jsx("button",{type:"button",className:"chat-close-btn",onClick:()=>l(!1),"aria-label":"Fermer le chatbot",children:e.jsx(k,{size:20})})]}),e.jsxs("div",{className:"chat-messages","aria-live":"polite","aria-busy":d,children:[p.map((o,c)=>e.jsx("div",{className:`chat-bubble ${o.isUser?"user":"bot"}`,children:o.text},c)),d&&e.jsx("div",{className:"chat-loading",children:e.jsx(U.span,{animate:{opacity:[0,1,0]},transition:{repeat:1/0,duration:1,delay:0},children:"..."})}),e.jsx("div",{ref:v})]}),a?e.jsxs("div",{className:"chat-input-area",children:[e.jsx("input",{type:"text",className:"chat-input",value:m,onChange:o=>b(o.target.value),onKeyDown:o=>o.key==="Enter"&&w(),placeholder:"Ecrivez un message...",disabled:d,"aria-label":"Message a envoyer"}),e.jsx("button",{type:"button",className:"chat-send-btn",onClick:w,disabled:d,"aria-label":"Envoyer le message",children:e.jsx($,{size:18})})]}):e.jsx("div",{className:"chat-unavailable",children:e.jsx("p",{className:"chat-unavailable-copy",children:t?"Le chatbot IA n'est pas disponible tant que le worker Cloudflare n'est pas configure.":"Ajoutez une URL de worker Cloudflare pour activer l'assistant."})})]}),e.jsx("button",{type:"button",className:"chat-fab",onClick:()=>l(!i),"aria-label":i?"Fermer le chatbot":"Ouvrir le chatbot","aria-expanded":i,"aria-controls":N,children:i?e.jsx(k,{size:28}):e.jsx(P,{size:28})})]}):null};export{F as default};
