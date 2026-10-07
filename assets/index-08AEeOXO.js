import{f as s,l as y,C as k,j as e,m as g,u,r as d,S as w}from"./index-BkKkI8kY.js";import{P as b}from"./PageTransition-Bl9yn1zJ.js";import{S as f}from"./SectionTitle-CZrJFBJe.js";import{S as j}from"./SkillCard-BsyTRWv3.js";import{L as x}from"./layers-B0fW_aXH.js";import{S as N}from"./sparkles-B7EjFyUa.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]],S=s("Database",v);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=[["line",{x1:"6",x2:"6",y1:"3",y2:"15",key:"17qcm7"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["path",{d:"M18 9a9 9 0 0 1-9 9",key:"n2h4wq"}]],L=s("GitBranch",C);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=[["rect",{x:"16",y:"16",width:"6",height:"6",rx:"1",key:"4q2zg0"}],["rect",{x:"2",y:"16",width:"6",height:"6",rx:"1",key:"8cvhb9"}],["rect",{x:"9",y:"2",width:"6",height:"6",rx:"1",key:"1egb70"}],["path",{d:"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",key:"1jsf9p"}],["path",{d:"M12 12V8",key:"2874zd"}]],M=s("Network",_);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M9 21V9",key:"1oto5p"}]],P=s("PanelsTopLeft",T);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}]],z=s("Server",q);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]],$=s("Wrench",A),V={Code2:k,Layout:P,Server:z,Database:S,GitBranch:L,FileText:y,Network:M,Wrench:$,Sparkles:N,Layers:x},E=({categoryData:a})=>{const c=V[a.icon]||x;return e.jsxs(g.div,{initial:{opacity:0,y:16},whileInView:{opacity:1,y:0},viewport:{once:!0},transition:{duration:.35},className:"p-6 sm:p-8 rounded-2xl border border-charcoal-200 dark:border-charcoal-800 bg-white/40 dark:bg-charcoal-900/40 backdrop-blur-md shadow-sm",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx("div",{className:"p-2.5 rounded-xl bg-charcoal-900 text-white dark:bg-white dark:text-charcoal-950 shadow-sm",children:e.jsx(c,{className:"w-5 h-5"})}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-bold text-charcoal-950 dark:text-white",children:a.category}),a.description&&e.jsx("p",{className:"text-xs text-charcoal-500 dark:text-charcoal-400 mt-0.5",children:a.description})]})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4",children:a.skills.map((l,o)=>e.jsx(j,{skill:l},o))})]})},D=()=>{const{skills:a}=u(),[c,l]=d.useState("All"),[o,m]=d.useState(""),p=["All",...a.map(t=>t.category)],h=a.map(t=>{if(c!=="All"&&t.category!==c)return null;if(!o.trim())return t;const r=o.toLowerCase().trim(),i=t.skills.filter(n=>n.name.toLowerCase().includes(r)||n.level.toLowerCase().includes(r)||n.highlight.toLowerCase().includes(r));return i.length>0||t.category.toLowerCase().includes(r)?{...t,skills:i.length>0?i:t.skills}:null}).filter(Boolean);return e.jsxs(b,{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12",children:[e.jsx(f,{badge:"Technical Expertise",title:"Skills & Technologies",subtitle:"Practical competencies across full-stack software development, database modeling, and networking infrastructure."}),e.jsxs("div",{className:"space-y-4 max-w-3xl mx-auto",children:[e.jsxs("div",{className:"relative",children:[e.jsx(w,{className:"absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400"}),e.jsx("input",{type:"text",value:o,onChange:t=>m(t.target.value),placeholder:"Search skills (e.g. Python, React, MySQL, Django, REST)...",className:"w-full pl-10 pr-4 py-2.5 rounded-xl border border-charcoal-300 dark:border-charcoal-700 bg-white/70 dark:bg-charcoal-900/70 backdrop-blur-md text-charcoal-950 dark:text-white placeholder-charcoal-400 text-sm focus:outline-none focus:ring-2 focus:ring-charcoal-400 transition-all shadow-sm"})]}),e.jsx("div",{className:"flex flex-wrap items-center justify-center gap-1.5 pt-1",children:p.map(t=>{const r=c===t;return e.jsx("button",{onClick:()=>l(t),className:`px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${r?"bg-charcoal-900 text-white dark:bg-white dark:text-charcoal-950 font-semibold shadow-sm":"bg-charcoal-100/80 dark:bg-charcoal-900/80 text-charcoal-600 dark:text-charcoal-400 hover:text-black dark:hover:text-white border border-charcoal-200 dark:border-charcoal-800"}`,children:t},t)})})]}),e.jsx("div",{className:"space-y-8 min-h-[350px]",children:h.length===0?e.jsxs("div",{className:"py-20 text-center space-y-2",children:[e.jsx("p",{className:"text-sm font-bold text-charcoal-900 dark:text-white",children:"No matching skills found"}),e.jsx("p",{className:"text-xs text-charcoal-500",children:"Try searching with another keyword or resetting the category filter."})]}):h.map((t,r)=>e.jsx(E,{categoryData:t},r))})]})};export{D as SkillsPage};
