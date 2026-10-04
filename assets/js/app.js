(function(){
const $ = (s, el=document) => el.querySelector(s);
const app = $('#app');
const LOGO = window.__LOGO__, LOGO_W = window.__LOGO_WHITE__;
const PHONE = '+91 96269 96260', TEL = 'tel:+919626996260', WA = 'https://wa.me/919626996260', MAIL = 'admin@thefutureconnect.com';
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const typeChip = t => `<span class="chip ${t==='Automated'?'chip-auto':t==='Manual'?'chip-man':'chip-semi'}">${t}</span>`;
const stars = r => '★★★★★'.slice(0, Math.round(r)) + ' ' + r.toFixed(1);

/* ---------- Visuals ---------- */
function heroRoute(){
  const C = [430, 330];
  const cities = [['Lagos',70,130],['Nairobi',40,300],['Addis Ababa',110,215],['Baghdad',175,70],['Muscat',260,120],['Tashkent',330,40],['Dhaka',520,110],['Malé',300,470],['Kuala Lumpur',560,440]];
  const paths = cities.map(([n,x,y],i) => {
    const mx = (x + C[0]) / 2 + (y < C[1] ? -30 : 40), my = Math.min(y, C[1]) - 70 + (y > C[1] ? 140 : 0);
    return `<path class="route-path route-draw" d="M${x} ${y} Q${mx} ${my} ${C[0]} ${C[1]}" stroke="url(#rg)" style="animation-delay:${i*0.12}s"/>
      <circle cx="${x}" cy="${y}" r="4" fill="#7FD0F2"/>
      <text class="city-label" x="${x + (x > 480 ? -10 : 10)}" y="${y - 10}" text-anchor="${x > 480 ? 'end' : 'start'}">${n}</text>`;
  }).join('');
  return `<svg class="route-svg" viewBox="0 0 600 540" role="img" aria-label="Routes from patients' home cities converging on Chennai">
    <defs>
      <linearGradient id="rg" x1="0" x2="1"><stop offset="0" stop-color="#7FD0F2" stop-opacity=".25"/><stop offset="1" stop-color="#7FD0F2"/></linearGradient>
      <radialGradient id="glow"><stop offset="0" stop-color="#E9C77B" stop-opacity=".55"/><stop offset="1" stop-color="#E9C77B" stop-opacity="0"/></radialGradient>
    </defs>
    ${[60,110,170,240].map(r => `<circle cx="${C[0]}" cy="${C[1]}" r="${r}" fill="none" stroke="#7FD0F2" stroke-opacity="${0.18 - r/2400}" />`).join('')}
    ${paths}
    <circle cx="${C[0]}" cy="${C[1]}" r="70" fill="url(#glow)"/>
    <circle class="pulse" cx="${C[0]}" cy="${C[1]}" r="10" fill="none" stroke="#E9C77B" stroke-width="2"/>
    <circle cx="${C[0]}" cy="${C[1]}" r="9" fill="#E9C77B"/>
    <text class="chennai-label" x="${C[0] + 22}" y="${C[1] + 9}">Chennai</text>
  </svg>`;
}

function scene(type, i=0){
  const id = 's' + type + i + Math.random().toString(36).slice(2,6);
  const skies = {temple:['#F6C982','#E99A6B'], shore:['#BFE6F7','#F8E3C4'], hills:['#DCEFF7','#F3F7F2'], heritage:['#F4D9A8','#E6B07A']};
  const [a,b] = skies[type];
  let body = '';
  if (type === 'temple') body = `<circle cx="300" cy="80" r="30" fill="#FFF3D6" opacity=".8"/>
    <g fill="#7A3B23"><polygon points="170,250 170,190 250,190 250,250"/><polygon points="160,190 260,190 250,160 170,160"/><polygon points="170,160 250,160 242,132 178,132"/><polygon points="178,132 242,132 235,106 185,106"/><polygon points="185,106 235,106 229,84 191,84"/><polygon points="191,84 229,84 222,66 198,66"/><rect x="200" y="54" width="20" height="12" rx="4"/><rect x="198" y="210" width="24" height="40" fill="#4A1F10"/></g>
    <g fill="#5C2A17" opacity=".7"><rect x="60" y="215" width="70" height="35"/><polygon points="55,215 135,215 120,195 70,195"/><rect x="290" y="210" width="90" height="40"/><polygon points="285,210 385,210 368,188 302,188"/></g>
    <rect y="240" width="400" height="10" fill="#4A1F10"/>`;
  if (type === 'shore') body = `<circle cx="80" cy="70" r="26" fill="#FFF6E0"/>
    <rect y="160" width="400" height="90" fill="#2BA3DD"/><path d="M0 175 Q50 168 100 175 T200 175 T300 175 T400 175" stroke="#BFE6F7" fill="none" stroke-width="2"/><path d="M0 200 Q50 193 100 200 T200 200 T300 200 T400 200" stroke="#7FD0F2" fill="none" stroke-width="2"/>
    <path d="M220 250 L400 250 L400 175 Q330 190 260 215 Z" fill="#E8D3A6"/>
    <g fill="#8A6A45"><polygon points="290,205 340,205 336,172 294,172"/><polygon points="296,172 334,172 326,148 304,148"/><polygon points="304,148 326,148 319,132 311,132"/><polygon points="345,210 375,210 372,188 348,188"/><polygon points="350,188 370,188 364,172 356,172"/></g>`;
  if (type === 'hills') body = `<circle cx="320" cy="60" r="22" fill="#FFFFFF"/>
    <path d="M0 150 L70 90 L130 140 L200 70 L280 135 L340 95 L400 140 L400 250 L0 250Z" fill="#9CC9C1"/>
    <path d="M0 185 L90 130 L170 180 L250 120 L330 175 L400 150 L400 250 L0 250Z" fill="#5E9E8B"/>
    <rect y="165" width="400" height="18" fill="#FFFFFF" opacity=".45"/>
    <path d="M0 215 Q100 185 200 210 T400 200 L400 250 L0 250Z" fill="#2F6F5A"/>
    ${Array.from({length:14},(_,k)=>`<path d="M${10+k*29} 232 q6 -10 12 0" stroke="#7DB89F" fill="none" stroke-width="2"/>`).join('')}`;
  if (type === 'heritage') body = `<rect x="40" y="90" width="320" height="160" fill="#F7E9D2"/><rect x="40" y="80" width="320" height="14" fill="#A0522D"/>
    ${[0,1,2,3,4].map(k=>`<path d="M${62+k*62} 250 V160 a24 24 0 0 1 48 0 V250Z" fill="#7A4A2A"/>`).join('')}
    <rect x="40" y="236" width="320" height="14" fill="#5C3A22"/>
    ${Array.from({length:10},(_,k)=>`<rect x="${40+k*32}" y="240" width="16" height="10" fill="${k%2?'#C9A24A':'#2B6E8F'}"/>`).join('')}`;
  return `<svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="400" height="250" fill="url(#${id})"/>${body}</svg>`;
}

function councilVisual(){
  const pts = Array.from({length:7}, (_,i) => { const a = -Math.PI/2 + i * 2*Math.PI/7; return [200 + 130*Math.cos(a), 200 + 130*Math.sin(a)]; });
  return `<svg viewBox="0 0 400 400" style="width:100%;height:100%" aria-hidden="true">
    ${pts.map(([x,y]) => `<line x1="${x}" y1="${y}" x2="200" y2="200" stroke="#BFE6F7" stroke-opacity=".35"/>`).join('')}
    <circle cx="200" cy="200" r="130" fill="none" stroke="#BFE6F7" stroke-opacity=".4"/>
    ${pts.map(([x,y]) => `<circle cx="${x}" cy="${y}" r="22" fill="#fff" fill-opacity=".14" stroke="#fff" stroke-opacity=".6"/><circle cx="${x}" cy="${y-4}" r="6" fill="#fff"/><path d="M${x-10} ${y+12} q10 -14 20 0" fill="#fff"/>`).join('')}
    <rect x="160" y="160" width="80" height="96" rx="8" fill="#fff"/>
    <rect x="172" y="176" width="56" height="6" rx="3" fill="#7FD0F2"/><rect x="172" y="190" width="40" height="6" rx="3" fill="#DCE6EE"/><rect x="172" y="204" width="50" height="6" rx="3" fill="#DCE6EE"/>
    <circle cx="214" cy="236" r="14" fill="#B8913F"/><path d="M207 236l5 5 9-10" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </svg>`;
}

/* ---------- Layout ---------- */
const NAV = [
  {label:'About', items:[['#/about','About Future Connect','Who we are and why Chennai'],['#/advisory-council','Advisory Council','Senior doctors who review every case']]},
  {label:'Treatments', items:[['#/departments','Departments','35 specialties, end to end'],['#/treatments','Treatments and procedures','Transplants, surgery, cancer care and more'],['#/doctors','Find a doctor','Verified specialists'],['#/hospitals','Partner hospitals','Accredited hospitals in Chennai']]},
  {label:'Your journey', items:[['#/how-it-works','How it works','Every step, every update'],['#/visa','Medical visa guide','e-Medical Visa, step by step'],['#/international','International patients','Countries and languages we serve'],['#/faq','Questions and answers','Cost, travel, stay and more']]},
  {label:'Explore Tamil Nadu', href:'#/tamil-nadu'},
  {label:'Contact', href:'#/contact'}
];
function header(){
  return `<header class="site-header"><div class="wrap header-row">
    <a class="brand" href="#/" aria-label="Future Connect home"><img src="${LOGO}" alt="Future Connect — The Perfect Health Partner"></a>
    <nav class="nav" id="nav" aria-label="Main">
      ${NAV.map(n => n.href ? `<div class="nav-item"><a class="nav-link" href="${n.href}">${n.label}</a></div>` :
        `<div class="nav-item"><button class="nav-link" aria-haspopup="true">${n.label}</button><div class="dropdown">${n.items.map(([h,t,s]) => `<a href="${h}">${t}<span>${s}</span></a>`).join('')}</div></div>`).join('')}
      <div class="nav-item mobile-only"><a class="nav-link" href="#/login">Patient login</a></div>
    </nav>
    <div class="header-actions">
      <select class="lang" id="lang" aria-label="Language">${LANGUAGES.map(l => `<option>${l}</option>`).join('')}</select>
      <a class="nav-link login-link" href="#/login">Patient login</a>
      <a class="btn btn-primary btn-sm" href="#/apply">Apply now</a>
    </div>
    <button class="menu-toggle" id="menuToggle" aria-expanded="false" aria-controls="nav">Menu</button>
  </div></header>`;
}
function footer(){
  return `<footer class="site-footer"><div class="wrap">
    <div class="footer-grid">
      <div><img class="footer-logo" src="${LOGO_W}" alt="Future Connect"><p>Doctor-reviewed treatment in Chennai for patients from Africa, the Middle East and Asia. One payment. Every step handled.</p>
        <div class="contact-lines" style="margin-top:22px;gap:10px"><a href="mailto:${MAIL}">${icon('mail',18)} ${MAIL}</a><a href="${TEL}">${icon('phone',18)} ${PHONE}</a><a href="${WA}" target="_blank" rel="noopener">${icon('wa',18)} WhatsApp us</a></div></div>
      <div><h4>Treatments</h4><ul><li><a href="#/departments">Departments</a></li><li><a href="#/treatments">Treatments</a></li><li><a href="#/doctors">Find a doctor</a></li><li><a href="#/hospitals">Partner hospitals</a></li><li><a href="#/advisory-council">Advisory Council</a></li></ul></div>
      <div><h4>Your journey</h4><ul><li><a href="#/how-it-works">How it works</a></li><li><a href="#/visa">Medical visa guide</a></li><li><a href="#/international">International patients</a></li><li><a href="#/tamil-nadu">Explore Tamil Nadu</a></li><li><a href="#/faq">Questions and answers</a></li></ul></div>
      <div><h4>Offices</h4><p><b style="color:#fff">India</b><br>211/102 Linghi Chetty Street, Mannady, Chennai 600001, Tamil Nadu, India</p><p style="margin-top:14px"><b style="color:#fff">Malaysia</b><br>75, Medan Bunus, Off Jalan Masjid India, 50100 Kuala Lumpur, Malaysia</p></div>
    </div>
    <div class="footer-bottom"><span>© ${new Date().getFullYear()} Future Connect. All rights reserved.</span><span><a href="#/policies/terms">Terms</a> &nbsp;|&nbsp; <a href="#/policies/privacy">Privacy</a> &nbsp;|&nbsp; <a href="#/policies/refund">Refund and cancellation</a> &nbsp;|&nbsp; <a href="#/policies/disclaimer">Medical disclaimer</a> &nbsp;|&nbsp; <a href="crm/">Staff login</a></span></div>
  </div></footer>`;
}
const pageHero = (crumb, title, lead, img) => `<div class="page-hero ${img && IMG[img] ? 'with-img' : ''}"><div class="wrap"><div><div class="crumbs"><a href="#/">Home</a> / ${crumb}</div><h1>${title}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</div>${img && IMG[img] ? `<div class="page-hero-img"><img src="${IMG[img]}" alt=""></div>` : ''}</div></div>`;
const ctaBand = (t='Ready to take the first step?', p='Start your application today. Our Advisory Council reviews every case before you pay anything.') =>
  `<section><div class="wrap"><div class="cta-band"><div><h2>${t}</h2><p>${p}</p></div><div class="actions"><a class="btn btn-gold" href="#/apply">Start your application</a><a class="btn btn-light" href="${WA}" target="_blank" rel="noopener">${icon('wa',18)} WhatsApp us</a></div></div></div></section>`;

/* ---------- Pages ---------- */
const P = {};
const pic = (k, alt, cls='') => IMG[k] ? `<img class="${cls}" src="${IMG[k]}" alt="${esc(alt)}" loading="lazy">` : '';
const photoCard = (k, alt, t, d, href) => `<${href?'a':'figure'} class="photo-card" ${href?`href="${href}"`:''}>${pic(k,alt)}<figcaption><h3>${t}</h3><p>${d}</p></figcaption></${href?'a':'figure'}>`;
const feature = (k, alt, title, body, reverse) => `<div class="feature ${reverse?'reverse':''}"><div class="feature-img">${pic(k,alt)}</div><div class="feature-text">${title}${body}</div></div>`;

P.home = () => `
<div class="hero hero-photo" style="background-image:linear-gradient(90deg,rgba(4,36,59,.96) 0%,rgba(4,36,59,.86) 42%,rgba(4,36,59,.55) 100%),url(${IMG['home-hero']})"><div class="wrap hero-grid">
  <div>
    <h1>World-class treatment in Chennai, reviewed by doctors before you travel</h1>
    <p class="lead">Future Connect brings patients from Africa, the Middle East and Asia to Chennai's leading accredited hospitals. Our Advisory Council of senior doctors studies every case first. You pay once, and we take care of your treatment, stay, travel and recovery.</p>
    <div class="hero-actions"><a class="btn btn-gold" href="#/apply">Start your application</a><a class="btn btn-light" href="#/how-it-works">See how it works</a></div>
    <div class="hero-note"><div>${icon('shield',20)} Advisory Council review</div><div>${icon('badge',20)} Verified doctors</div><div>${icon('card',20)} One secure payment</div></div>
  </div>
  <div>${heroRoute()}</div>
</div></div>

<div class="wrap promises">
  ${[['shield','Reviewed before you pay','Senior doctors study your reports as a full case study before anything is booked. You pay only after they approve your case, so you never pay for treatment that is not right for you.'],['badge','Check your doctor yourself','Every doctor profile shows their registration number with a link to India\u2019s official medical register. Ratings come only from patients we have actually treated.'],['card','One payment, nothing more to manage','You pay once, securely, and we pay the hospital, hotel, transport and every other bill on your behalf. Every bill is shown to you in your account.'],['people','Never alone','A dedicated Case Manager, an interpreter in your language and regular updates for your family stay with you from arrival until you return home.']]
    .map(([i,t,d]) => `<div class="promise"><div class="icon-ring">${icon(i)}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}
</div>

<section class="section-pearl"><div class="wrap">
  <div class="section-head"><h2>Cared for from the moment you land</h2><p>Travelling for treatment can feel overwhelming. Our team makes sure you are welcomed, looked after and never left wondering what happens next.</p></div>
  <div class="grid g3">
    ${photoCard('home-arrival','Our Case Manager greeting a mother and daughter at Chennai airport','We meet you at the airport','Your Case Manager meets you and your family at arrivals, helps with a local SIM card and currency, and takes you to your 5-star hotel. You receive their name, photo and number 48 hours before you fly.')}
    ${photoCard('home-care','A nurse caring for a smiling patient in a private hospital room','Cared for at every step','Experienced nurses, an interpreter in your language and a Case Manager who visits you daily. Your faith and food needs, including halal meals and prayer space, are always arranged.')}
    ${photoCard('home-family','A patient on a video call with his family from his hotel room','Your family stays close','With your permission, your family at home receives updates on your progress. Video calls, daily updates and a Family Dashboard keep everyone close, however far away they are.')}
  </div>
</div></section>

<section><div class="wrap council">
  <div class="council-visual photo">${pic('home-council','Senior doctors reviewing brain scans together around a table')}</div>
  <div><h2>Every case is studied by our Advisory Council first</h2>
  <p class="lead" style="margin-top:18px">Before any payment, a panel of senior doctors reviews your reports, your referral letter and the hospital\u2019s proposed treatment plan as a full case study.</p>
  <p style="margin-top:14px">This is what makes Future Connect different. Decisions are made on medical grounds, by experienced doctors, and you receive their decision on WhatsApp and email.</p>
  <div class="decision">
    <div><span class="dot" style="background:#3B8C4A"></span><div><b>Approved</b>You receive one estimate for your whole stay and can continue to payment.</div></div>
    <div><span class="dot" style="background:#2BA3DD"></span><div><b>More information needed</b>We tell you exactly which reports to add, and remind you if needed.</div></div>
    <div><span class="dot" style="background:#B8913F"></span><div><b>Not approved</b>You receive a clear reason in writing and can reply with any questions.</div></div>
  </div>
  <a class="btn btn-ghost" style="margin-top:30px" href="#/advisory-council">Meet the Advisory Council</a></div>
</div></section>

<section class="section-pearl"><div class="wrap">
  <div class="section-head"><h2>Complete care across every major specialty</h2><p>From heart surgery and organ transplants to cancer care, joint replacement and IVF, treated at accredited hospitals by experienced specialists. Every treatment plan is prepared for your case after review.</p></div>
  <div class="grid g3">${TREATMENT_GROUPS.slice(0,9).map(g => photoCard(g.img, g.name, `<span class="card-icon">${icon(g.icon)}</span>${g.name}`, g.about.split('. ').slice(0,2).join('. ').replace(/\.?$/,'.'), `#/treatments/${g.slug}`)).join('')}</div>
  <div style="margin-top:34px;display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn-primary" href="#/treatments">All treatments</a><a class="btn btn-ghost" href="#/departments">All 35 departments</a></div>
</div></section>

<section><div class="wrap">
  <div class="section-head"><h2>Your journey, from home to healed to home</h2><p>Twelve clear steps, from your first conversation with your doctor at home to your follow-up after you return. You receive a WhatsApp message and an email at every important moment, in your language.</p></div>
  <div class="grid g4">${JOURNEY.slice(0,8).map((s,i) => `<div class="tile"><div class="step-no">${i+1}</div><h3>${s.t}</h3><p>${s.d.split('. ').slice(0,2).join('. ').replace(/\.?$/,'.')}</p></div>`).join('')}</div>
  <a class="btn btn-ghost" style="margin-top:34px" href="#/how-it-works">See the full journey</a>
</div></section>

<section class="section-deep"><div class="wrap">
  <div class="section-head"><h2>Recover among temples, hills and the sea</h2><p>When your doctor says you are ready, we arrange a gentle guided trip through Tamil Nadu, from UNESCO heritage temples to cool hill stations and the southern tip of India.</p></div>
  <div class="grid g3">${DESTINATIONS.slice(0,3).map(d => `<div class="dest" style="border:0">${pic(d.img, d.name, 'dest-img')}<div class="dest-body"><h3 style="color:var(--heading)">${d.name}</h3><div class="dest-meta"><span class="chip">${d.ease} pace</span><span class="chip">${d.time}</span></div><p class="muted small">${d.text}</p></div></div>`).join('')}</div>
  <a class="btn btn-light" style="margin-top:34px" href="#/tamil-nadu">Explore Tamil Nadu</a>
</div></section>

<section><div class="wrap">
  <div class="section-head"><h2>Welcoming patients from four regions</h2><p>Our website, assistant and team speak your language, your messages arrive in your language, and an interpreter is with you at every hospital visit.</p></div>
  <div class="grid g4">${REGIONS.map(r => `<a class="tile" href="#/international"><div class="icon-ring">${icon('globe')}</div><h3>${r.name}</h3><p>${r.countries.slice(0,6).join(', ')} and more. Languages include ${r.langs.slice(0,3).join(', ')}.</p></a>`).join('')}</div>
</div></section>
${ctaBand()}`;

P.about = () => `${pageHero('About','A doctor-founded company built on trust','Future Connect was founded by a doctor to make treatment in India safe, transparent and simple for international patients and their families.','about-chennai')}
<section><div class="wrap">${feature('about-values','A doctor gently holding an elderly patient\u2019s hand','<h2>Why we exist</h2>',`<p class="lead" style="margin-top:18px">Travelling abroad for treatment is one of the biggest decisions a family can make. Too often, patients face unclear costs, unverified doctors and no one to call when they land.</p><p style="margin-top:16px">We built Future Connect to change that. Every case is reviewed by senior doctors before any payment. Every doctor can be verified on India\u2019s official medical register. Every bill is paid by us and shown to you. And from the airport to your return home, someone from our team is always with you.</p><p style="margin-top:16px">Our founder has seen first-hand how much good medical care depends on trust, clear information and support for the whole family. Those three things shape everything we do.</p>`)}</div></section>
<section class="section-pearl"><div class="wrap">
  <div class="section-head"><h2>Why Chennai</h2><p>Chennai has welcomed international patients for decades and is often described as one of India\u2019s leading medical cities.</p></div>
  <div class="grid g3">${[['award','Accredited hospitals','Our partner hospitals hold national (NABH) and international (JCI) accreditation, which means they meet strict standards for patient safety, infection control and quality of care.'],['stethoscope','Experienced specialists','Many Chennai specialists trained in India and abroad and have treated large numbers of complex cases, including patients referred from other countries.'],['coins','Fair cost','World-class treatment costs far less than in many other destinations, without compromising on technology, safety or experience.'],['clock','Short waiting times','Once your case is approved and your visa is ready, treatment can usually begin soon after you arrive, with no long waiting lists.'],['plane','Easy to reach','Chennai International Airport has direct and one-stop flights from across Africa, the Middle East and Asia.'],['palm','A place to recover','Warm hospitality, familiar food and peaceful destinations nearby, from the seaside to cool hill stations, make recovery more comfortable.']].map(([i,t,d]) => `<div class="tile"><div class="icon-ring">${icon(i)}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
</div></section>
<section><div class="wrap">${feature('about-team','Our multilingual care coordination team at work','<h2>A team that speaks your language</h2>',`<p class="lead" style="margin-top:18px">Our coordinators, Case Managers and interpreters speak the languages of the patients we serve, including Arabic, French, Swahili, Bengali and more.</p><p style="margin-top:16px">They answer your questions on WhatsApp, prepare your documents, guide your visa application and stay in touch with your family. When you arrive, the same team meets you at the airport and stays with you until you return home.</p>`, true)}</div></section>
<section class="section-pearl"><div class="wrap">
  <div class="section-head"><h2>Our values</h2><p>The principles that guide how we work with every patient, family and partner hospital.</p></div>
  <div class="grid g4">${[['stethoscope','Medical judgement first','Doctors decide whether a case is right for treatment. Decisions are never driven by sales targets.'],['doc','Full transparency','Every step, policy, document and bill is visible in your account, in plain language.'],['moon','Respect','For your faith, food, language and family, at every stage of your journey.'],['heart','Care that continues','Video follow-ups, medicine support and contact with your doctor after you return home.']].map(([i,t,d]) => `<div class="tile"><div class="icon-ring">${icon(i)}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
</div></section>
<section><div class="wrap"><h2 style="margin-bottom:34px">Our offices</h2>${offices()}</div></section>
${ctaBand()}`;

P['advisory-council'] = () => `${pageHero('Advisory Council','Senior doctors review every case before you pay','The Advisory Council is the heart of Future Connect. It makes sure every patient we accept is right for treatment in Chennai, and that every treatment plan makes medical sense.','council-review')}
<section><div class="wrap">${feature('home-council','Council members discussing scans together','<h2>How the review works</h2>',`<ol class="journey" style="margin-top:20px">${[['Your file is prepared','Our medical team checks that your reports, scans and referral letter are complete and readable.'],['The hospital proposes a plan','The partner hospital\u2019s specialist reviews your case and proposes a treatment plan and estimate.'],['Each member reviews','Council members study your case and the proposed plan, each from their own specialty.'],['They vote and record remarks','Every view, vote and remark is recorded with the member\u2019s name and the time.'],['The Chair confirms','The Council Chair confirms the decision, and you receive it on WhatsApp and email.']].map(([t,d],i) => `<li class="journey-step" style="grid-template-columns:60px 1fr;padding:20px 0"><div class="step-no">${i+1}</div><div><h3>${t}</h3><p class="muted">${d}</p></div></li>`).join('')}</ol>`)}</div></section>
<section class="section-pearl"><div class="wrap">
  <div class="section-head"><h2>What the Council looks at</h2><p>The Council considers your safety and your interests first, before any booking or payment.</p></div>
  <div class="grid g3">${[['clipboard','Is the diagnosis clear?','Do the reports and scans give a clear picture of your condition, or are more tests needed before travelling?'],['stethoscope','Is the plan right for you?','Does the proposed treatment suit your condition, age and general health, and is it the best available option?'],['plane','Is it safe to travel?','Can you travel safely by air, and what support will you need on the journey and on arrival?'],['hospital','Is the hospital the right fit?','Does the chosen hospital have the right specialists, technology and intensive care for your treatment?'],['calendar','How long will you stay?','How long are treatment and recovery likely to take, and when will it be safe to fly home?'],['heart','What happens after?','What follow-up care will you need at home, and how will your doctor at home stay involved?']].map(([i,t,d]) => `<div class="tile"><div class="icon-ring">${icon(i)}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
</div></section>
<section><div class="wrap">
  <div class="section-head"><h2>Council members</h2><p>Member profiles will be published here with their specialties, experience and registration details, so you can see exactly who reviews your case.</p></div>
  <div class="grid g4">${[['Chair, Advisory Council','stethoscope'],['Cardiac sciences','heart'],['Oncology','ribbon'],['Transplant medicine','transplant'],['Neurosciences','brain'],['Orthopaedics','bone'],['Internal medicine','clipboard'],['Paediatrics','baby']].map(([r,i],k) => `<div class="doc-card"><div class="doc-portrait" style="background:linear-gradient(150deg,#0B4F7C,${k%2?'#2BA3DD':'#7FD0F2'});aspect-ratio:1/1;color:#fff"><span class="sample-tag">Profile coming soon</span>${icon(i,44)}</div><div class="doc-body"><h3 style="font-size:1.1rem">${r}</h3><p class="muted small">Senior consultant</p></div></div>`).join('')}</div>
</div></section>
${ctaBand()}`;

P.departments = () => `${pageHero('Departments','35 departments, every major specialty','From the heart and brain to bones, eyes and fertility, our partner hospitals cover every major area of medicine. Choose a department to see the conditions treated, common procedures and what to expect.','treat-brain')}
<section><div class="wrap"><div class="filters"><input id="deptSearch" type="search" placeholder="Search departments" aria-label="Search departments"></div>
<div class="grid g3" id="deptGrid">${DEPARTMENTS.map(d => `<a class="tile dept-tile" data-name="${esc(d.name.toLowerCase())}" href="#/departments/${d.slug}"><div class="icon-ring">${icon(d.icon)}</div><div><h3>${d.name}</h3><p>${d.blurb}</p></div></a>`).join('')}</div></div></section>
${ctaBand()}`;

const expectBlock = name => `<h2>What to expect</h2><ol class="list"><li><b>Before you travel:</b> the partner hospital\u2019s ${name.toLowerCase()} specialist reviews your reports and proposes a plan, then our Advisory Council reviews your case.</li><li><b>Your estimate:</b> after approval you receive one estimate covering treatment, stay, travel and our services.</li><li><b>In Chennai:</b> your first consultation is usually the day after you arrive, followed by any tests and your treatment.</li><li><b>Recovery:</b> your doctor confirms when you are fit to travel home, and your stay is planned around that.</li><li><b>Back home:</b> video follow-ups and your discharge summary are shared with you and your doctor at home.</li></ol>
<h2>Before you travel</h2><ul class="list"><li>Your referral letter from your doctor at home</li><li>All recent reports, scans and test results (CDs or digital files)</li><li>A list of your current medicines and any allergies</li><li>A passport valid for at least six months</li></ul>`;

P.department = slug => {
  const d = DEPARTMENTS.find(x => x.slug === slug); if (!d) return P.notfound();
  const docs = SAMPLE_DOCTORS.filter(x => x.slug === slug);
  return `${pageHero(`<a href="#/departments">Departments</a> / ${d.name}`, d.name, d.blurb, d.img)}
  <section><div class="wrap detail"><div>
    <h2>About this department</h2><p>${d.about}</p>
    <div class="grid g2" style="margin-top:30px"><div class="tile"><div class="icon-ring">${icon(d.icon)}</div><h3>Conditions we treat</h3><ul class="list" style="margin-top:10px">${d.conditions.map(c => `<li>${c}</li>`).join('')}</ul></div>
    <div class="tile"><div class="icon-ring">${icon('stethoscope')}</div><h3>Common procedures</h3><ul class="list" style="margin-top:10px">${d.procedures.map(c => `<li>${c}</li>`).join('')}</ul></div></div>
    ${expectBlock(d.name)}
    ${docs.length ? `<h2>Specialists</h2><div class="grid g2">${docs.map(docCard).join('')}</div>` : ''}
  </div><aside class="aside-card"><h3>Ask about ${d.name.toLowerCase()}</h3><p>Send us your reports and our team will guide you through the next step. Applying costs nothing, and you pay only after approval.</p><a class="btn btn-gold" href="#/apply">Start your application</a><a class="btn btn-light" href="${WA}" target="_blank" rel="noopener">${icon('wa',18)} WhatsApp us</a></aside></div></section>`;
};

P.treatments = () => `${pageHero('Treatments','Treatments and procedures','There are no fixed packages. Every treatment plan and estimate is prepared for your case by the partner hospital\u2019s specialist and reviewed by our Advisory Council before you pay anything.','treat-transplant')}
<section><div class="wrap">${TREATMENT_GROUPS.map(g => `<div class="tgroup" id="${g.slug}"><div>${pic(g.img, g.name, 'tgroup-img')}<h3 style="margin-top:18px;display:flex;gap:12px;align-items:center"><span class="card-icon">${icon(g.icon)}</span>${g.name}</h3></div><div><p>${g.about}</p><ul style="margin-top:20px">${g.items.map(([it]) => `<li><a href="#/treatments/${g.slug}">${it}</a></li>`).join('')}</ul>${g.legal ? `<div class="notice" style="margin-top:20px"><b>No paid organ donation.</b> Indian law allows only related or legally approved donors, and a hospital authorisation committee approves every transplant.</div>` : ''}<a class="btn btn-ghost btn-sm" style="margin-top:20px" href="#/treatments/${g.slug}">Learn more about ${g.name.toLowerCase()}</a></div></div>`).join('')}</div></section>
${ctaBand()}`;

P.treatment = slug => {
  const g = TREATMENT_GROUPS.find(x => x.slug === slug); if (!g) return P.notfound();
  return `${pageHero(`<a href="#/treatments">Treatments</a> / ${g.name}`, g.name, g.intro, g.img)}
  <section><div class="wrap detail"><div>
    ${g.legal ? `<div class="notice" style="margin-bottom:30px"><b>No paid organ donation.</b> Under Indian law (the Transplantation of Human Organs and Tissues Act), only related or legally approved donors are permitted, and a hospital authorisation committee must approve each transplant. Your donor\u2019s documents are checked before Advisory Council review.</div>` : ''}
    <h2>Overview</h2><p>${g.about}</p>
    <h2>Procedures</h2><div class="grid g2">${g.items.map(([it,desc]) => `<div class="tile"><div class="icon-ring">${icon(g.icon)}</div><h3>${it}</h3><p>${desc} Your specialist confirms whether it is right for you after reviewing your reports.</p></div>`).join('')}</div>
    ${expectBlock(g.name)}
  </div><aside class="aside-card"><h3>Start with your reports</h3><p>No payment is needed to apply. You pay only after the Advisory Council approves your case and you accept your estimate.</p><a class="btn btn-gold" href="#/apply">Start your application</a><a class="btn btn-light" href="${WA}" target="_blank" rel="noopener">${icon('wa',18)} WhatsApp us</a></aside></div></section>`;
};

function docCard(d){
  const initials = d.name.replace('Dr. ','').split(' ').map(x => x[0]).join('');
  return `<div class="doc-card"><div class="doc-portrait" style="background:linear-gradient(150deg,#0B4F7C,${d.id%2?'#2BA3DD':'#4FB8E6'})"><span class="sample-tag">Sample profile</span><span class="initials">${initials}</span></div>
  <div class="doc-body"><h3>${d.name}</h3><p class="muted small">${d.role}</p><p class="small">${d.dept}<br>${d.years} years of experience · Speaks ${d.langs.join(', ')}</p><div class="stars" aria-label="Rated ${d.rating} out of 5">${stars(d.rating)} <span class="muted small">verified patients</span></div>
  <a class="verify" href="https://www.nmc.org.in/information-desk/indian-medical-register/" target="_blank" rel="noopener">${icon('badge',16)} Verify on the NMC register</a></div>
  <div class="doc-actions"><a class="btn btn-primary btn-sm" href="#/apply?doctor=${encodeURIComponent(d.name)}">Request this doctor</a></div></div>`;
}
P.doctors = () => `${pageHero('Find a doctor','Find and verify your specialist','Every profile shows the doctor\u2019s qualifications, experience, languages and registration with India\u2019s National Medical Commission, so you can check it yourself. Ratings come only from patients we have treated.','treat-heart')}
<section><div class="wrap"><div class="filters"><select id="docDept" aria-label="Specialty"><option value="">All specialties</option>${[...new Set(SAMPLE_DOCTORS.map(d => d.dept))].map(d => `<option>${d}</option>`).join('')}</select><select id="docLang" aria-label="Language"><option value="">Any language</option>${[...new Set(SAMPLE_DOCTORS.flatMap(d => d.langs))].map(l => `<option>${l}</option>`).join('')}</select></div>
<div class="grid g3" id="docGrid">${SAMPLE_DOCTORS.map(docCard).join('')}</div>
<div class="notice" style="margin-top:34px"><b>How to verify a doctor.</b> Click \u201cVerify on the NMC register\u201d on any profile, then search for the doctor\u2019s name or registration number on the official National Medical Commission website. If you need help, our team will guide you on WhatsApp.</div></div></section>${ctaBand()}`;

P.hospitals = () => `${pageHero('Partner hospitals','Accredited partner hospitals in Chennai','We work only with hospitals that hold national or international accreditation and run dedicated international patient services, so you are cared for to the highest standards.','hosp-exterior')}
<section class="section-pearl"><div class="wrap">
  <div class="section-head"><h2>What every partner hospital offers</h2><p>Before we partner with a hospital, we check its accreditation, specialists, intensive care and the comfort it offers international patients and their families.</p></div>
  <div class="grid g3">
    ${photoCard('hosp-lounge','International patient lounge with comfortable seating','International patient lounge','A dedicated desk and lounge for international patients, where your coordinator and interpreter meet you and handle admission, appointments and paperwork.')}
    ${photoCard('hosp-room','Premium private hospital room with sofa and city view','Comfortable private rooms','Private rooms with space for an attendant to stay, so a family member can be beside you throughout your hospital stay.')}
    ${photoCard('hosp-prayer','Quiet hospital prayer room with prayer mats','Faith and food respected','Prayer rooms, halal meals and dietary choices are available, and our team makes sure your needs are known before you arrive.')}
  </div>
</div></section>
<section><div class="wrap">
  <div class="section-head"><h2>Our partner hospitals</h2><p>Hospital names, photos and ratings will appear here as tie-ups are confirmed. Ratings come only from patients we have treated.</p></div>
  <div class="grid g3">${SAMPLE_HOSPITALS.map(([n,t,acc,sp,r]) => `<div class="doc-card"><div class="doc-body" style="padding:28px"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px"><div class="icon-ring">${icon('hospital')}</div><span class="chip">Sample profile</span></div><h3 style="margin-top:12px">${n}</h3><p class="muted small">${t}</p><p class="small"><b>${acc}</b></p><div class="dest-meta">${sp.map(s => `<span class="chip">${s}</span>`).join('')}</div><div class="stars">${stars(r)} <span class="muted small">verified patients</span></div><p class="small muted">International patient desk, interpreters, halal food, prayer room and attendant accommodation.</p></div></div>`).join('')}</div>
</div></section>${ctaBand()}`;

P['how-it-works'] = () => `${pageHero('How it works','Every step, and every update you receive','Here is exactly what happens, from your first conversation with your doctor at home until you are back with your family. At each important moment you receive a WhatsApp message and an email, in your language.','journey-hotel')}
<section><div class="wrap"><div class="filters" style="gap:10px;align-items:center"><span class="chip chip-wa">${icon('wa',16)} WhatsApp</span><span class="chip chip-mail">${icon('mail',16)} Email</span><span class="muted small">Both are sent together, with your name and Patient ID.</span></div>
<ol class="journey">${JOURNEY.map((s,i) => `<li class="journey-step with-img"><div class="step-no">${i+1}</div><div><h3>${s.t}</h3><p class="muted">${s.d}</p><div style="margin-top:12px">${typeChip(s.type)}</div><div class="notify" style="margin-top:16px">${s.n.length ? s.n.map(x => `<div class="notify-line"><span class="chip chip-wa" style="padding:4px 8px">${icon('wa',14)}</span> <span class="chip chip-mail" style="padding:4px 8px">${icon('mail',14)}</span> <b>${x.split(' \u2014 ')[0]}</b>${x.includes(' \u2014 ') ? ' \u2014 ' + x.split(' \u2014 ')[1] : ''}</div>`).join('') : '<div class="notify-line">No message at this step</div>'}</div></div><div class="step-img">${pic(s.img, s.t)}</div></li>`).join('')}</ol>
<p class="muted small" style="margin-top:30px">Automated: our system does it instantly. Semi-automated: our team confirms, then the system updates you. Manual: carried out personally by doctors or our team.</p></div></section>${ctaBand()}`;

P.visa = () => `${pageHero('Medical visa guide','The India e-Medical Visa, step by step','You apply on the official Government of India e-Visa website. We prepare your documents, arrange the hospital invitation letter and guide you through every field of the application.','visa-docs')}
<section><div class="wrap detail"><div>
  <h2>Which visa you need</h2><div class="grid g2"><div class="tile"><div class="icon-ring">${icon('passport')}</div><h3>e-Medical Visa</h3><p>For the patient travelling to India for medical treatment at a recognised hospital. The hospital\u2019s invitation letter is part of your application.</p></div><div class="tile"><div class="icon-ring">${icon('people')}</div><h3>e-Medical Attendant Visa</h3><p>For family members travelling with the patient. It is linked to the patient\u2019s visa, so both are prepared together.</p></div></div>
  <h2>Documents you will usually need</h2><ul class="list"><li>A passport valid for at least six months, with blank pages</li><li>A recent passport-size photograph with a plain background</li><li>An invitation letter from the Indian hospital (we arrange this after your payment)</li><li>Your medical reports and referral letter</li><li>For attendants: passport and photograph, and their relationship to you</li></ul>
  <h2>How it works with Future Connect</h2><ol class="journey">${[['We request your hospital invitation letter','It appears in your account and you are notified on WhatsApp and email.'],['Your Case Manager guides your application','We help you fill in each detail correctly on the official website, for you and your attendants.'],['You submit and pay the government fee','Add your application reference to your account so we can follow its progress.'],['Your visa is approved','Upload it, or we add it for you. Tickets and hotel are then confirmed and shared in your account.']].map(([t,d],i) => `<li class="journey-step" style="grid-template-columns:60px 1fr;padding:20px 0"><div class="step-no">${i+1}</div><div><h3>${t}</h3><p class="muted">${d}</p></div></li>`).join('')}</ol>
  <h2>If your treatment takes longer</h2><p>Sometimes recovery takes longer than planned. If you need to stay longer, our team helps you with visa extension and any registration required, and adjusts your hotel and flights.</p>
  <div class="notice" style="margin-top:30px">Visa rules can change. Always check the latest requirements on the official Indian e-Visa website. If your visa is refused, our Refund Policy explains what is returned to you.</div>
</div><aside class="aside-card"><h3>We guide you, start to finish</h3><p>Your Case Manager is one WhatsApp message away during your visa process, and every status change is sent to you automatically.</p><a class="btn btn-gold" href="#/apply">Start your application</a></aside></div></section>`;

P.international = () => `${pageHero('International patients','Welcoming patients from Africa, the Middle East and Asia','Our team, our assistant and our interpreters speak your language. Your messages arrive in your language too, and your family stays informed throughout.','intl-languages')}
<section><div class="wrap"><div class="grid g2">${REGIONS.map(r => `<div class="region"><div class="icon-ring">${icon('globe')}</div><h3 style="margin-top:14px">${r.name}</h3><p class="muted small">Languages: ${r.langs.join(', ')}</p><div class="countries">${r.countries.map(c => `<span class="chip">${c}</span>`).join('')}</div></div>`).join('')}</div></div></section>
<section class="section-pearl"><div class="wrap">${feature('journey-interpreter','Doctor, interpreter and patient in conversation','<h2>An interpreter at every hospital visit</h2>',`<p class="lead" style="margin-top:18px">Understanding your doctor matters as much as the treatment itself.</p><p style="margin-top:16px">A trained medical interpreter joins your consultations and important hospital conversations, so you can ask every question and understand every answer. Your medical reports can also be translated to and from your language.</p>`)}</div></section>
<section><div class="wrap"><div class="section-head"><h2>Everything arranged for you</h2><p>These services are included with every approved case, so you can focus on getting better.</p></div>
<div class="grid g3">${[['usercheck','Dedicated Case Manager','One named person looks after your case from approval to your return home. They meet you at the airport and visit you during your stay.'],['languages','Interpreter','A medical interpreter in your language joins hospital visits, so nothing is lost in translation.'],['moon','Faith and food','Halal food, prayer space and dietary needs are arranged at your hotel and hospital before you arrive.'],['shield','Travel medical insurance','Travel medical insurance is included in your estimate and its documents are in your account.'],['siren','24/7 emergency line','One number to call at any time of day or night, answered by our team.'],['doc','Report translation','Medical reports translated to and from your language, for you and your doctor at home.'],['bed','5-star hotel','Comfortable rooms for you and your family, close to your hospital.'],['plane','Airport pickup and drop-off','We meet you at arrivals and see you off at departures, with help for luggage and wheelchairs.'],['people','Family updates','With your permission, your family receives regular updates and can follow your progress.']].map(([i,t,d]) => `<div class="tile"><div class="icon-ring">${icon(i)}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}</div></div></section>${ctaBand()}`;

P['tamil-nadu'] = () => `${pageHero('Explore Tamil Nadu','Recover among temples, hills and the sea','When your doctor confirms you are fit to travel, we arrange a guided trip at a pace that suits your recovery. Choose from UNESCO heritage temples, cool hill stations, quiet lakes and the southern tip of India.','tn-mahabalipuram')}
<section><div class="wrap">
  <div class="dest-feature" style="margin-bottom:34px">${pic('tn-kodaikanal','Kodaikanal lake surrounded by pine forest','dest-feature-img')}<div class="dest-body"><h3>Planned around your recovery</h3><p>Every destination shows how gentle the trip is. Your treating doctor approves your tour first, your guide knows your needs, and rest stops, wheelchairs and dietary needs are arranged in advance.</p><p>You can add destinations to your wish list while applying, and your Case Manager will plan the tour with you during your stay.</p><a class="btn btn-gold" style="width:fit-content;margin-top:10px" href="#/apply">Start your application</a></div></div>
  <div class="grid g3">${DESTINATIONS.map(d => `<div class="dest">${pic(d.img, d.name, 'dest-img')}<div class="dest-body"><h3>${d.name}</h3><div class="dest-meta"><span class="chip">${d.ease} pace</span><span class="chip">Best: ${d.season}</span></div><p class="muted small">${d.text}</p><p class="small">${icon('pin',16).replace('<svg','<svg style="display:inline;vertical-align:-6px"')} ${d.km} · ${d.time}</p></div></div>`).join('')}</div>
</div></section>${ctaBand()}`;

P.faq = () => `${pageHero('Questions and answers','Questions patients ask us',`Clear answers about treatment, cost, travel and your stay. Can't find your answer? WhatsApp us on ${PHONE}.`,'faq-help')}
<section><div class="wrap faq">${Object.entries(FAQS).map(([cat, qs]) => `<h2 class="faq-cat">${cat}</h2>${qs.map(([q,a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}`).join('')}</div></section>${ctaBand()}`;

function offices(){
  return `<div class="offices"><div class="office"><div class="icon-ring">${icon('pin')}</div><h3 style="margin-top:14px">India office</h3><p>211/102 Linghi Chetty Street,<br>Mannady, Chennai 600001,<br>Tamil Nadu, India</p><p class="muted small" style="margin-top:12px">Our main office, where our coordination, visa and finance teams work.</p></div>
  <div class="office"><div class="icon-ring">${icon('pin')}</div><h3 style="margin-top:14px">Malaysia office</h3><p>75, Medan Bunus,<br>Off Jalan Masjid India,<br>50100 Kuala Lumpur, Malaysia</p><p class="muted small" style="margin-top:12px">Supporting patients from South East Asia and nearby regions.</p></div></div>`;
}
P.contact = () => `${pageHero('Contact','Talk to us','WhatsApp is the fastest way to reach us. Our team replies in your language, and you can send reports directly in the chat.','contact-office')}
<section><div class="wrap council" style="align-items:start">
  <div><h2>Reach us directly</h2><div class="contact-lines"><a href="${WA}" target="_blank" rel="noopener"><span class="icon-ring">${icon('wa')}</span> WhatsApp ${PHONE}</a><a href="${TEL}"><span class="icon-ring">${icon('phone')}</span> Call ${PHONE}</a><a href="mailto:${MAIL}"><span class="icon-ring">${icon('mail')}</span> ${MAIL}</a></div>
  <div style="margin-top:40px">${offices()}</div></div>
  <form class="form-card" id="contactForm" novalidate><h3>Send us a message</h3><p class="muted small" style="margin-top:6px">We reply on WhatsApp and email, usually within one working day.</p><div class="fields">
    <div class="field"><label for="cName">Full name</label><input id="cName" required></div>
    <div class="field"><label for="cCountry">Country</label><input id="cCountry" required></div>
    <div class="field"><label for="cWa">WhatsApp number</label><input id="cWa" type="tel" required></div>
    <div class="field"><label for="cMail">Email</label><input id="cMail" type="email" required></div>
    <div class="field full"><label for="cMsg">How can we help?</label><textarea id="cMsg" required></textarea></div></div>
    <p class="error" id="cErr" hidden></p>
    <button class="btn btn-primary" style="margin-top:24px" type="submit">Send message</button></form>
</div></section>`;

/* ---------- Apply ---------- */
const STEPS = ['Personal details','Contact','Medical details','Documents','Travel and preferences','Review and consent'];
let applyStep = 0, applyData = {};
function stepFields(i){
  const f = (id, label, type='text', opts={}) => {
    const v = esc(applyData[id] || opts.value || '');
    const req = opts.req === false ? '' : 'required';
    if (type === 'select') return `<div class="field ${opts.full?'full':''}"><label for="${id}">${label}</label><select id="${id}" ${req}><option value="">Choose</option>${opts.options.map(o => `<option ${applyData[id]===o?'selected':''}>${esc(o)}</option>`).join('')}</select></div>`;
    if (type === 'textarea') return `<div class="field full"><label for="${id}">${label}</label><textarea id="${id}" ${req}>${v}</textarea>${opts.hint?`<span class="hint">${opts.hint}</span>`:''}</div>`;
    if (type === 'file') return `<div class="field ${opts.full?'full':''}"><label for="${id}">${label}</label><div class="upload"><input id="${id}" type="file" ${opts.multi?'multiple':''} accept=".pdf,.jpg,.jpeg,.png" ${req}><span class="hint">${opts.hint||'PDF, JPG or PNG'}</span></div></div>`;
    return `<div class="field ${opts.full?'full':''}"><label for="${id}">${label}</label><input id="${id}" type="${type}" value="${v}" ${req}>${opts.hint?`<span class="hint">${opts.hint}</span>`:''}</div>`;
  };
  const countries = REGIONS.flatMap(r => r.countries).sort();
  if (i === 0) return f('fullName','Full name (as on passport)','text',{full:true}) + f('dob','Date of birth','date') + f('gender','Sex','select',{options:['Female','Male']}) + f('nationality','Nationality','select',{options:countries}) + f('passport','Passport number');
  if (i === 1) return f('whatsapp','WhatsApp number','tel',{hint:'With country code. We send your updates here.'}) + f('email','Email address','email',{hint:'We send the same updates here.'}) + f('city','City of residence') + f('pref','Preferred language','select',{options:['English','Arabic','French','Portuguese','Swahili','Bengali','Russian','Amharic','Somali','Hausa','Dari','Uzbek','Burmese','Indonesian','Vietnamese','Dhivehi']});
  if (i === 2) return f('dept','Department','select',{options:DEPARTMENTS.map(d => d.name),full:true}) + f('condition','Condition or diagnosis','text',{full:true}) + f('doctor','Preferred doctor','select',{options:['Please recommend a doctor',...SAMPLE_DOCTORS.map(d => d.name)],value:applyData.doctor}) + f('refName','Referring doctor\u2019s name') + f('refContact','Referring doctor\u2019s phone or email','text',{full:true}) + f('meds','Current medicines and allergies','textarea',{req:false,hint:'Optional. Leave blank if none.'});
  if (i === 3) return f('fRef','Referral letter from your doctor','file',{full:true}) + f('fReports','Medical reports and scans','file',{multi:true,full:true,hint:'You can select several files.'}) + f('fPassport','Passport (photo page)','file') + f('fPhoto','Recent photograph','file');
  if (i === 4) return f('attendants','Family members travelling with you','select',{options:['None','1','2']}) + f('month','Preferred month to travel','month') + f('attNames','Attendants\u2019 names and relationship','textarea',{req:false,hint:'Optional. We collect their passport details later.'}) +
    `<div class="field full"><label>Faith and food needs</label><div style="display:flex;gap:18px;flex-wrap:wrap">${['Halal food','Vegetarian','Prayer space','Other dietary needs'].map(x => `<label class="check"><input type="checkbox" name="faith" value="${x}" ${ (applyData.faith||[]).includes(x)?'checked':''}> ${x}</label>`).join('')}</div></div>`;
  return `<div class="field full"><div class="panel" style="margin:0"><h3>Your application</h3><p class="small"><b>${esc(applyData.fullName||'')}</b> · ${esc(applyData.nationality||'')} · ${esc(applyData.dept||'')}</p><p class="small muted">${esc(applyData.condition||'')}</p></div></div>
    <label class="check field full"><input type="checkbox" id="c1" required> I agree that Future Connect may store and use my personal and medical information to review my case, as described in the Privacy Policy.</label>
    <label class="check field full"><input type="checkbox" id="c2" required> I understand my case will be reviewed by the Advisory Council and that I pay nothing until it is approved.</label>
    <label class="check field full"><input type="checkbox" id="c3" required> I agree to receive updates on WhatsApp and email.</label>`;
}
P.apply = () => {
  const q = new URLSearchParams(location.hash.split('?')[1] || '');
  if (q.get('doctor')) applyData.doctor = q.get('doctor');
  return `${pageHero('Apply','Start your application','It takes about 10 minutes and costs nothing. Our Advisory Council reviews your case first, and you pay only after approval. Keep your referral letter, reports and passport ready to upload.','apply-start')}
  <section><div class="wrap form-shell"><ol class="steps-nav" id="stepsNav"></ol><form class="form-card" id="applyForm" novalidate></form></div></section>`;
};
function renderApply(){
  const nav = $('#stepsNav'), form = $('#applyForm'); if (!form) return;
  nav.innerHTML = STEPS.map((s,i) => `<li class="${i===applyStep?'active':i<applyStep?'done':''}"><span class="n">${i<applyStep?'✓':i+1}</span>${s}</li>`).join('');
  form.innerHTML = `<h2 style="font-size:2rem">${STEPS[applyStep]}</h2><p class="muted small">Step ${applyStep+1} of ${STEPS.length}</p><div class="fields">${stepFields(applyStep)}</div><p class="error" id="aErr" hidden></p>
    <div class="form-nav">${applyStep ? '<button type="button" class="btn btn-ghost" id="back">Back</button>' : '<span></span>'}<button type="submit" class="btn ${applyStep===STEPS.length-1?'btn-gold':'btn-primary'}">${applyStep===STEPS.length-1?'Submit application':'Continue'}</button></div>`;
  const back = $('#back'); if (back) back.onclick = () => { save(form); applyStep--; renderApply(); scrollTo({top:0}); };
  form.onsubmit = e => {
    e.preventDefault();
    const bad = [...form.querySelectorAll('[required]')].filter(el => el.type === 'checkbox' ? !el.checked : !el.value);
    const err = $('#aErr');
    if (bad.length){ err.hidden = false; err.textContent = bad[0].type === 'checkbox' ? 'Please tick all three boxes to submit.' : `Please complete: ${bad.map(b => form.querySelector(`label[for="${b.id}"]`)?.textContent || 'required field').join(', ')}.`; bad[0].focus(); return; }
    save(form);
    if (applyStep < STEPS.length - 1){ applyStep++; renderApply(); scrollTo({top:0}); return; }
    const pid = 'FC-2026-' + String(Math.floor(10000 + Math.random()*89999));
    form.innerHTML = `<div class="success"><div class="icon-ring" style="margin:0 auto;width:72px;height:72px">${icon('check',34)}</div><h2 style="margin-top:20px">Application received</h2><p class="lead" style="margin:12px auto 0">Thank you, ${esc(applyData.fullName.split(' ')[0])}. Your Patient ID is</p><div class="pid">${pid}</div>
      <p class="muted" style="margin:0 auto">We have sent a confirmation to your WhatsApp and email with your login link. Our medical team will check your documents and send your case to the Advisory Council.</p>
      <div style="display:flex;gap:12px;justify-content:center;margin-top:28px;flex-wrap:wrap"><a class="btn btn-primary" href="#/account">Go to your account</a><a class="btn btn-ghost" href="#/how-it-works">What happens next</a></div>
      <p class="small muted" style="margin-top:26px">Demo: in the live system, this step creates your account and sends the WhatsApp and email messages automatically.</p></div>`;
    nav.innerHTML = STEPS.map(s => `<li class="done"><span class="n">✓</span>${s}</li>`).join('');
    applyStep = 0; applyData = {};
  };
}
function save(form){
  form.querySelectorAll('input,select,textarea').forEach(el => { if (el.type !== 'file' && el.type !== 'checkbox' && el.id) applyData[el.id] = el.value; });
  const faith = [...form.querySelectorAll('input[name="faith"]:checked')].map(x => x.value); if (form.querySelector('input[name="faith"]')) applyData.faith = faith;
}

/* ---------- Login and account (demo) ---------- */
P.login = () => `${pageHero('Patient login','Log in to your account','Use the WhatsApp number or email you applied with. We send you a one-time code, so there is no password to remember.','journey-whatsapp')}
<section><div class="wrap" style="max-width:560px"><form class="form-card" id="loginForm" novalidate>
  <div id="loginStep1"><div class="field"><label for="lId">WhatsApp number or email</label><input id="lId" required></div><button class="btn btn-primary" style="margin-top:22px;width:100%;justify-content:center" type="submit">Send my code</button></div>
  <p class="error" id="lErr" hidden></p></form>
  <p class="muted small" style="margin-top:18px;text-align:center">New here? <a href="#/apply">Start your application</a></p></div></section>`;
function initLogin(){
  const form = $('#loginForm'); if (!form) return; let stage = 1;
  form.onsubmit = e => { e.preventDefault(); const err = $('#lErr');
    if (stage === 1){ if (!$('#lId').value){ err.hidden=false; err.textContent='Enter the WhatsApp number or email you applied with.'; return; }
      err.hidden = true; stage = 2; $('#loginStep1').innerHTML = `<p>We sent a 6-digit code to <b>${esc($('#lId').value)}</b>.</p><div class="field" style="margin-top:16px"><label for="otp">Enter your code</label><input id="otp" inputmode="numeric" maxlength="6" required></div><button class="btn btn-primary" style="margin-top:22px;width:100%;justify-content:center" type="submit">Log in</button><p class="small muted" style="margin-top:12px">Demo: enter any 6 digits.</p>`; $('#otp').focus(); return; }
    if (!/^\d{6}$/.test($('#otp').value)){ err.hidden=false; err.textContent='Enter the 6-digit code from your message.'; return; }
    location.hash = '#/account'; };
}
P.account = () => {
  const stage = 6;
  return `<div class="page-hero"><div class="wrap"><div class="crumbs">Your account · Demo</div><h1 style="font-size:clamp(2rem,4vw,3rem)">Welcome back, Amina</h1><p class="lead">Patient ID FC-2026-00125 · Knee replacement · Partner Hospital Three</p></div></div>
  <section style="padding-top:60px"><div class="wrap acct"><div>
    <div class="panel"><h3>Your journey</h3><ol class="tracker">${JOURNEY.map((s,i) => `<li class="${i<stage?'done':i===stage?'now':''}"><span class="t-dot"></span><span>${s.t}</span><span class="small muted">${i<stage?'Done':i===stage?'In progress':''}</span></li>`).join('')}</ol></div>
    <div class="panel"><h3>Messages sent to you</h3>${[['Visa Status Update — Invitation letter ready','Today, 10:42'],['Payment Received and Case Manager Assigned','2 days ago'],['Application Approved — Estimate Ready','5 days ago'],['Application Under Review','9 days ago'],['Application Received','10 days ago']].map(([t,d]) => `<div class="msg"><span class="chip chip-wa" style="padding:3px 7px">${icon('wa',13)}</span> <span class="chip chip-mail" style="padding:3px 7px">${icon('mail',13)}</span> <b>${t}</b> <span class="muted">· ${d}</span></div>`).join('')}</div>
  </div><div>
    <div class="panel" style="background:var(--harbour-deep);color:#D6E8F4;border:0"><h3 style="color:#fff">Your Case Manager</h3><p><b style="color:#fff">Priya Sundaram</b><br>Speaks English, Swahili</p><div style="display:grid;gap:10px;margin-top:16px"><a class="btn btn-light btn-sm" href="${WA}" target="_blank" rel="noopener">${icon('wa',16)} WhatsApp</a></div></div>
    <div class="panel"><h3>Documents</h3>${['Invoice INV-00125.pdf','Hospital invitation letter.pdf','Referral letter.pdf','Medical reports (4 files)'].map(d => `<div class="msg">${icon('doc',16).replace('<svg','<svg style="display:inline;vertical-align:-3px"')} ${d}</div>`).join('')}</div>
    <div class="panel"><h3>Your payments</h3><div class="msg">Received <b style="float:right">USD 8,400</b></div><div class="msg">Bills paid so far <b style="float:right">USD 1,150</b></div><div class="msg">Balance held for you <b style="float:right">USD 7,250</b></div></div>
    <p class="small muted">Demo account with sample data.</p>
  </div></div></section>`;
};

/* ---------- Policies ---------- */
const POLICIES = {
  terms:['Terms and conditions',[['Our role','Future Connect arranges and coordinates medical treatment, travel and stay in India. Treatment is provided by independent partner hospitals and doctors.'],['Case review','Every application is reviewed by our Advisory Council. Approval is at the Council\u2019s medical discretion.'],['Estimates','Your estimate is prepared for your case. The final cost may change if your treatment plan changes, which we explain to you before asking for any extra amount.'],['Your responsibilities','Provide complete and accurate medical information and follow your doctor\u2019s advice.']]],
  privacy:['Privacy policy',[['What we collect','Personal details, contact details, medical reports and travel documents you share with us.'],['How we use it','To review your case, coordinate your treatment and travel, and send you updates on WhatsApp and email.'],['How we protect it','Your data is stored securely in India, encrypted, and seen only by people who need it for your care. Every access is recorded.'],['Your rights','You can ask for a copy of your data or ask us to delete it, in line with India\u2019s Digital Personal Data Protection Act, 2023.']]],
  refund:['Refund and cancellation policy',[['If your case is not approved','You pay nothing, as payment is only requested after approval.'],['If your visa is refused','We refund your payment, minus any non-refundable costs already paid on your behalf, which we show you in your account.'],['If you cancel','Refunds depend on the costs already paid on your behalf. Your account shows these clearly.'],['Unused balance','Any balance left after your final statement is refunded to your original payment method.']]],
  disclaimer:['Medical disclaimer',[['Information only','Information on this website is general and is not medical advice. Your treatment is decided by your doctors after reviewing your reports.'],['Our assistant','Our online assistant answers general questions and does not diagnose or recommend treatment.'],['Organ donation','Future Connect never takes part in any paid organ donation. All transplants follow Indian law.']]]
};
P.policies = (key='terms') => `${pageHero('Policies','Our policies','Clear terms, written simply.')}
<section><div class="wrap" style="max-width:860px"><div class="tabs" role="tablist">${Object.entries(POLICIES).map(([k,[t]]) => `<a class="tab" role="tab" aria-selected="${k===key}" href="#/policies/${k}" style="text-decoration:none">${t}</a>`).join('')}</div>
<div class="prose"><h2>${POLICIES[key][0]}</h2>${POLICIES[key][1].map(([h,p]) => `<h3>${h}</h3><p>${p}</p>`).join('')}<div class="notice" style="margin-top:34px">Draft wording for review by Future Connect\u2019s legal advisor before launch.</div></div></div></section>`;

P.notfound = () => `${pageHero('Page not found','We couldn\u2019t find that page','The link may be old. Use the menu, or go back to the home page.')}<section><div class="wrap"><a class="btn btn-primary" href="#/">Go to the home page</a></div></section>`;

/* ---------- Chat assistant (demo) ---------- */
function chat(){
  const box = document.createElement('div');
  box.innerHTML = `<button class="chat-fab" id="chatFab" aria-controls="chatBox" aria-expanded="false">${icon('chat',20)} <span>Ask our assistant</span></button>
  <div class="chat-box" id="chatBox" role="dialog" aria-label="Future Connect assistant"><div class="chat-head"><div><b>Future Connect assistant</b><small>Replies in your language</small></div><button id="chatClose" aria-label="Close">×</button></div><div class="chat-log" id="chatLog" aria-live="polite"></div><form class="chat-input" id="chatForm"><input id="chatIn" placeholder="Type your answer" aria-label="Your message"><button type="submit">Send</button></form></div>`;
  document.body.appendChild(box);
  const log = $('#chatLog'), fab = $('#chatFab'), cb = $('#chatBox');
  const flow = [
    {q:'Hello, welcome to Future Connect. I can answer your questions and help you start. Are you asking for yourself or a family member?', quick:['For myself','For a family member'], key:'who'},
    {q:'Which country are you in?', key:'country'},
    {q:'Which area of treatment is it about?', quick:['Heart','Cancer','Transplant','Bones and joints','Something else'], key:'area'},
    {q:'Has your local doctor already given a diagnosis or referral letter?', quick:['Yes','Not yet'], key:'ref'},
    {q:'When would you like to travel?', quick:['As soon as possible','In 1 to 3 months','Just exploring'], key:'when'},
    {q:'What is your WhatsApp number, with country code? We will send your updates there.', key:'wa'},
    {q:'And your email address?', key:'email'}
  ];
  let i = 0, ans = {}, started = false;
  const say = (t, who='bot', quick) => { const b = document.createElement('div'); b.className = 'bubble ' + who; b.textContent = t; log.appendChild(b);
    if (quick){ const q = document.createElement('div'); q.className = 'quick'; q.innerHTML = quick.map(x => `<button type="button">${x}</button>`).join(''); q.onclick = e => { if (e.target.tagName === 'BUTTON'){ q.remove(); answer(e.target.textContent); } }; log.appendChild(q); }
    log.scrollTop = log.scrollHeight; };
  const ask = () => setTimeout(() => say(flow[i].q, 'bot', flow[i].quick), 350);
  const answer = t => { say(t, 'me'); ans[flow[i].key] = t; i++;
    if (i < flow.length) return ask();
    setTimeout(() => { say(`Thank you. I have saved your enquiry about ${ans.area.toLowerCase()} care from ${ans.country}. A member of our team will WhatsApp you soon. You have also received a welcome message with the next steps.`);
      const q = document.createElement('div'); q.className = 'quick'; q.innerHTML = `<button type="button" data-go="#/apply">Start my application</button><button type="button" data-go="#/how-it-works">How it works</button>`; q.onclick = e => { if (e.target.dataset.go) location.hash = e.target.dataset.go; }; log.appendChild(q);
      say('Demo: in the live system this conversation is saved to the CRM automatically. For medical emergencies please contact your local emergency services.'); }, 400); };
  const toggle = open => { cb.classList.toggle('open', open); fab.setAttribute('aria-expanded', open); if (open && !started){ started = true; ask(); } if (open) $('#chatIn').focus(); };
  fab.onclick = () => toggle(!cb.classList.contains('open'));
  $('#chatClose').onclick = () => toggle(false);
  $('#chatForm').onsubmit = e => { e.preventDefault(); const v = $('#chatIn').value.trim(); if (!v || i >= flow.length) return; $('#chatIn').value = ''; log.querySelectorAll('.quick').forEach(q => q.remove()); answer(v); };
}

/* ---------- Router ---------- */
const TITLES = {home:'World-class treatment in Chennai', about:'About us', 'advisory-council':'Advisory Council', departments:'Departments', treatments:'Treatments', doctors:'Find a doctor', hospitals:'Partner hospitals', 'how-it-works':'How it works', visa:'Medical visa guide', international:'International patients', 'tamil-nadu':'Explore Tamil Nadu', faq:'Questions and answers', contact:'Contact', apply:'Apply', login:'Patient login', account:'Your account', policies:'Policies'};
function toast(t){ const el = $('#toast'); el.textContent = t; el.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('show'), 3200); }
function route(){
  const [path] = location.hash.replace(/^#\/?/, '').split('?');
  const [a, b] = path.split('/');
  const key = a || 'home';
  let html;
  if (key === 'departments' && b) html = P.department(b);
  else if (key === 'treatments' && b) html = P.treatment(b);
  else if (key === 'policies') html = P.policies(b && POLICIES[b] ? b : 'terms');
  else html = (P[key] || P.notfound)();
  app.innerHTML = html;
  document.title = `${TITLES[key] || 'Future Connect'} | Future Connect — The Perfect Health Partner`;
  $('#nav').classList.remove('open'); $('#menuToggle').setAttribute('aria-expanded','false');
  document.querySelectorAll('.nav a.nav-link').forEach(l => l.setAttribute('aria-current', l.getAttribute('href') === '#/' + key ? 'page' : 'false'));
  window.scrollTo({top:0});
  if (key === 'apply') renderApply();
  if (key === 'login') initLogin();
  const ds = $('#deptSearch'); if (ds) ds.oninput = () => document.querySelectorAll('#deptGrid .tile').forEach(t => t.hidden = !t.dataset.name.includes(ds.value.toLowerCase()));
  const dd = $('#docDept'), dl = $('#docLang'); if (dd){ const f = () => { $('#docGrid').innerHTML = SAMPLE_DOCTORS.filter(d => (!dd.value || d.dept === dd.value) && (!dl.value || d.langs.includes(dl.value))).map(docCard).join('') || '<p class="muted">No doctors match these filters. Try another specialty or language.</p>'; }; dd.onchange = f; dl.onchange = f; }
  const cf = $('#contactForm'); if (cf) cf.onsubmit = e => { e.preventDefault(); const bad = [...cf.querySelectorAll('[required]')].filter(x => !x.value); const err = $('#cErr'); if (bad.length){ err.hidden = false; err.textContent = 'Please fill in every field so we can reply.'; bad[0].focus(); return; } cf.innerHTML = `<div class="success"><div class="icon-ring" style="margin:0 auto;width:64px;height:64px">${icon('check',30)}</div><h3 style="margin-top:16px">Message sent</h3><p class="muted" style="margin:10px auto 0">Thank you. Our team will reply on WhatsApp and email.</p></div>`; };
}
document.body.insertAdjacentHTML('afterbegin', header());
document.body.insertAdjacentHTML('beforeend', footer() + '<div class="toast" id="toast" role="status"></div>');
$('#menuToggle').onclick = () => { const n = $('#nav'); const o = n.classList.toggle('open'); $('#menuToggle').setAttribute('aria-expanded', o); };
$('#lang').onchange = e => toast(`${e.target.value} — full translations will be added in the live build.`);
chat();
window.addEventListener('hashchange', route);
route();
})();
