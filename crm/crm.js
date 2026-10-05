(function(){
const $ = (s, el=document) => el.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const I = {
  dash:'<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>',
  lead:'<path d="M4 5h16v11H9l-5 4z"/>', case:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3"/>',
  council:'<circle cx="12" cy="8" r="3"/><circle cx="5" cy="11" r="2"/><circle cx="19" cy="11" r="2"/><path d="M6 20c0-3 3-5 6-5s6 2 6 5"/>',
  visa:'<path d="M2 16l20-6-3-2-7 2-6-5H4l3 6-4 1z"/>', cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  people:'<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3 3-6 6-6s6 3 6 6M15 14c3 0 6 2 6 5"/>',
  pay:'<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>', bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
  tpl:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>', auto:'<path d="M13 3L4 14h7l-1 7 9-11h-7z"/>',
  chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>', users:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>',
  wa:'<path d="M4 20l1.4-4A8 8 0 1 1 8 18.6L4 20z"/>', mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>', alert:'<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>'
};
const ic = (n, s=18) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]}</svg>`;

/* ---------- Reference data ---------- */
const STAGES = ['Application Received','Council Review','More Info Needed','Approved','Paid','Visa and Travel','Arrived','In Treatment','On Tour','Departed','Closed'];
const RAIL = ['Application Received','Council Review','Approved','Paid','Visa and Travel','Arrived','In Treatment','On Tour','Departed','Closed'];
const STAGE_PILL = {'Application Received':'grey','Council Review':'','More Info Needed':'warn','Approved':'gold','Not Approved':'bad','Paid':'ok','Visa and Travel':'','Arrived':'ok','In Treatment':'','On Tour':'gold','Departed':'grey','Closed':'grey'};
const TEMPLATES = [
 ['N01','Application Received','Application','Patient submits application','Instant'],['N02','Application Under Review','Review','Case forwarded to Council','Instant'],
 ['N03','Application Not Approved','Review','Council rejects','Instant'],['N04','More Information Required','Review','Council asks for more','Instant; reminders 48 h and 5 days'],
 ['N05','Documents Received','Review','Patient uploads requested items','Instant'],['N06','Application Approved – Estimate Ready','Payment','Team sends approval and estimate','Instant; reminders day 2, 5, 10'],
 ['N07','Payment Received and Case Manager Assigned','Payment','Razorpay confirms payment','Instant'],['N08','Visa Status Update','Visa','Visa status changed','Instant'],
 ['N09','Tickets Ready','Travel','Tickets uploaded','Instant'],['N10','Itinerary Ready','Travel','Itinerary uploaded','Instant'],
 ['N11','Pre-Travel Checklist','Travel','Flight date','7 days before flight'],['N12','Arrival Details','Travel','Flight date','48 hours before flight'],
 ['N13','Welcome to Chennai','Stay','Marked Arrived','Instant'],['N14','Treatment Update','Treatment','Treatment status changed','Instant'],
 ['N15','Tour Plan Ready','Stay','Tour plan uploaded','Instant'],['N16','Top-up Required','Billing','Top-up requested','Instant; reminder 24 h'],
 ['N17','Top-up Payment Received','Billing','Razorpay confirms top-up','Instant'],['N18','Final Statement Ready','Billing','Finance approves statement','Instant'],
 ['N19','Safe Travels','Departure','Marked Departed','Instant'],['N20','Welcome Home – Share Your Review','Feedback','Departure date','3 days after departure; reminder day 7'],
 ['N21','Thank You for Your Review','Feedback','Review submitted','Instant']
];
const TPL = Object.fromEntries(TEMPLATES.map(t => [t[0], t[1]]));
const WORKFLOWS = [
 ['WF-01','Application Intake','Application submitted','N01, A01'],['WF-02','Council Routing','Forward to Council clicked','N02, A02'],
 ['WF-03','Council Decision','Chair confirms decision / estimate sent','N03–N06, A03, A04'],['WF-04','Payment and Invoice','Razorpay payment confirmed','N07, A05'],
 ['WF-05','Case Status Updates','Status changed or document uploaded','N08–N10, N13–N15, N18, N19'],['WF-06','Travel Reminders','Hourly check of flight dates','N11, N12, A08'],
 ['WF-07','Top-up','Top-up requested or paid','N16, N17, A09'],['WF-08','Reminders and Escalations','Daily check','Reminders, A06, A07, A11'],
 ['WF-09','Review','3 days after departure / review submitted','N20, N21, A10'],['WF-10','Activity Logger','Every workflow','—']
];
const STAFF = [['Dr. Founder','Admin','All modules'],['Priya Sundaram','Case Manager','Assigned cases, schedule, attendants'],['Ahmed Faizal','Case Manager','Assigned cases, schedule, attendants'],['Kavitha R.','Visa and Travel Team','Visa, flights, hotels'],['Suresh M.','Finance','Payments, ledger, statements, refunds'],['Council members (7)','Advisory Council','Council portal only'],['Content Editor','Content','Website doctors, hospitals, pages']];
const CMS = ['Priya Sundaram','Ahmed Faizal'];

/* ---------- Sample data ---------- */
const now = new Date('2026-10-02T11:00:00');
const d = (days, h=10) => { const x = new Date(now); x.setDate(x.getDate()+days); x.setHours(h,0,0,0); return x; };
const fmt = x => x.toLocaleDateString('en-GB',{day:'numeric',month:'short'});
const fmtT = x => x.toLocaleDateString('en-GB',{day:'numeric',month:'short'}) + ', ' + x.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
let seq = 117;
function mk(name, country, lang, dept, proc, hospital, doctor, stage, extra={}){
  seq++;
  const c = {id:`FC-2026-00${seq}`, name, country, lang, dept, proc, hospital, doctor, stage,
    wa:'+' + (200 + seq) + ' 7' + String(seq*731).padStart(8,'0').slice(0,8), email: name.split(' ')[0].toLowerCase() + '@example.com',
    referrer: extra.referrer || 'Dr. ' + ['Otieno','Al-Rawi','Hossain','Okafor','Warsame','Karimov','Ibrahim','Bekele','Al-Harthy','Mugisha'][seq % 10],
    applied: d(-(30 - seq % 20)), cm: ['Paid','Visa and Travel','Arrived','In Treatment','On Tour','Departed','Closed'].includes(stage) ? CMS[seq % 2] : null,
    estimate: extra.estimate || null, paid: extra.paid || 0, bills: extra.bills || [], visa: extra.visa || 'Not started', flight: extra.flight || null,
    treat: extra.treat || null, attendants: extra.attendants || [], votes: extra.votes || null, reason: extra.reason || '', faith: extra.faith || ['Halal food'],
    docs: ['Referral letter','Medical reports (3 files)','Passport','Photo'], msgs: [], activity: [], schedule: extra.schedule || []};
  return c;
}
const CASES = [
 mk('Dilshod Karimov','Uzbekistan','Russian','Neurosurgery','Brain tumour surgery','Partner Hospital Six','Dr. Farhan Siddiqui','Application Received',{attendants:[['Nodira Karimova','Wife']]}),
 mk('Rahima Begum','Bangladesh','Bengali','Medical Oncology','Chemotherapy and surgery','Partner Hospital Two','Dr. Meera Krishnan','Council Review',{votes:[['Chair','Approve'],['Cardiac sciences','Approve'],['Oncology','Approve'],['Transplant medicine',null],['Neurosciences',null],['Orthopaedics','Approve'],['Internal medicine',null]],attendants:[['Abdul Karim','Son']]}),
 mk('Chukwuemeka Obi','Nigeria','English','Nephrology','Kidney transplant','Partner Hospital One','Dr. Karthik Subramanian','More Info Needed',{reason:'Donor relationship documents and recent HLA typing report',attendants:[['Ngozi Obi','Sister (donor)']],faith:[]}),
 mk('Fatima Yusuf','Somalia','Somali','IVF and Fertility','IVF','Partner Hospital Four','Dr. Ayesha Rahman','Approved',{estimate:6800,attendants:[['Abdi Yusuf','Husband']]}),
 mk('Samuel Tesfaye','Ethiopia','Amharic','Haematology','Bone marrow transplant','Partner Hospital Two','Dr. Nikhil Menon','Paid',{estimate:24500,paid:24500,visa:'Invitation Letter Ready',attendants:[['Hanna Tesfaye','Mother'],['Dawit Tesfaye','Brother (donor)']],faith:[]}),
 mk('Amina Hassan','Kenya','Swahili','Orthopaedics','Knee replacement','Partner Hospital Three','Dr. Lakshmi Narayanan','Visa and Travel',{estimate:8400,paid:8400,visa:'Visa Approved',flight:d(4,6),bills:[['Flights (2 passengers)',1150]],attendants:[['Halima Hassan','Daughter']],schedule:[[d(4,6),'Arrival','Chennai airport pickup'],[d(5,10),'Consultation','Dr. Lakshmi Narayanan'],[d(6,8),'Surgery','Knee replacement']]}),
 mk('Aishath Shifa','Maldives','Dhivehi','Ophthalmology','Retina surgery','Partner Hospital Five','Dr. Sarah Thomas','Arrived',{estimate:5200,paid:5200,visa:'Visa Approved',flight:d(0,7),bills:[['Flights',620],['Hotel deposit',900]],attendants:[['Mohamed Rasheed','Husband']],schedule:[[d(1,9),'Consultation','Dr. Sarah Thomas'],[d(2,8),'Surgery','Retina surgery']]}),
 mk('Mohammed Al-Jubouri','Iraq','Arabic','Cardiology','Bypass surgery (CABG)','Partner Hospital One','Dr. Arvind Raman','In Treatment',{estimate:12800,paid:12800,visa:'Visa Approved',flight:d(-6),treat:'In Recovery',bills:[['Flights (3 passengers)',1980],['Hotel (6 nights)',1440],['Hospital — surgery and ICU',7200]],attendants:[['Zainab Al-Jubouri','Wife'],['Ali Al-Jubouri','Son']],schedule:[[d(0,16),'Doctor review','Dr. Arvind Raman'],[d(3,10),'Discharge','Partner Hospital One']]}),
 mk('Salim Al-Busaidi','Oman','Arabic','Spine Surgery','Spinal fusion','Partner Hospital Three','Dr. Lakshmi Narayanan','On Tour',{estimate:11200,paid:11200,visa:'Visa Approved',flight:d(-16),treat:'Discharged',bills:[['Flights',1200],['Hotel (14 nights)',3360],['Hospital',5600],['Tour — Mahabalipuram and Kanchipuram',420]],attendants:[['Khalid Al-Busaidi','Brother']],schedule:[[d(1,10),'Tour','Kanchipuram day trip'],[d(3,21),'Departure','Chennai airport drop-off']]}),
 mk('Grace Nakato','Uganda','English','Cardiology','Valve replacement','Partner Hospital One','Dr. Arvind Raman','Not Approved',{reason:'Current heart function is too low for safe long-distance air travel. The Council advises stabilisation at home first and a review in 3 months.',faith:[]}),
 mk('Aditya Rahman','Bangladesh','Bengali','Ophthalmology','Cataract surgery','Partner Hospital Five','Dr. Sarah Thomas','Closed',{estimate:2100,paid:2100,visa:'Visa Approved',treat:'Discharged',bills:[['All bills settled',1980]],attendants:[]})
];
// seed messages and activity
const SEED = {'Application Received':['N01'],'Council Review':['N01','N02'],'More Info Needed':['N01','N02','N04'],'Approved':['N01','N02','N06'],'Paid':['N01','N02','N06','N07','N08'],'Visa and Travel':['N01','N02','N06','N07','N08','N09','N10'],'Arrived':['N01','N02','N06','N07','N08','N09','N10','N11','N12','N13'],'In Treatment':['N01','N02','N06','N07','N08','N09','N10','N11','N12','N13','N14'],'On Tour':['N01','N02','N06','N07','N08','N09','N10','N11','N12','N13','N14','N15'],'Not Approved':['N01','N02','N03'],'Closed':['N01','N02','N06','N07','N08','N09','N10','N11','N12','N13','N14','N18','N19','N20','N21']};
CASES.forEach(c => { const list = SEED[c.stage] || []; const span = Math.max(1, now - c.applied - 3600000); list.forEach((n,i) => c.msgs.unshift({n, name:TPL[n], t: new Date(c.applied.getTime() + (list.length > 1 ? i*span/(list.length-1) : 0))})); c.activity.unshift({t:c.applied, who:'System', what:'Application submitted, Patient ID and account created'}); });
const LEADS = [
 ['Joseph Mwangi','Kenya','Heart','Hot','Meta ad (WhatsApp)',d(0,9),'New'],['Layla Hamid','Iraq','Cancer','Hot','Website chat',d(0,8),'New'],
 ['Rafiq Islam','Bangladesh','Bones and joints','Warm','Google search',d(-1,15),'Contacted'],['Hodan Ali','Somalia','IVF','Warm','Agent — Mogadishu',d(-1,11),'Contacted'],
 ['Bekzod Tursunov','Uzbekistan','Transplant','Hot','Doctor referral',d(-2,10),'Applied'],['Ama Mensah','Ghana','Something else','Cold','Website chat',d(-3,17),'Nurture'],
 ['Nasser Al-Rashdi','Oman','Spine','Warm','Instagram ad',d(-3,12),'Contacted'],['Mariam Diallo','Senegal','Cancer','Warm','Expo QR — Africa Health',d(-4,14),'Contacted']
].map(([name,country,area,score,source,t,status]) => ({name,country,area,score,source,t,status}));

/* ---------- State and helpers ---------- */
let route = 'dashboard', caseTab = 'overview', caseView = 'table';
const findCase = id => CASES.find(c => c.id === id);
const pill = s => `<span class="pill ${STAGE_PILL[s] ?? ''}">${esc(s)}</span>`;
const scorePill = s => `<span class="pill ${s==='Hot'?'bad':s==='Warm'?'warn':'grey'}">${s}</span>`;
const money = n => 'USD ' + Number(n).toLocaleString('en-US');
const billsTotal = c => c.bills.reduce((a,b) => a + b[1], 0);
function toast(title, body){ const t = $('#toast'); t.innerHTML = `<b>${esc(title)}</b>${esc(body)}`; t.classList.add('show'); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('show'), 4200); }
function notify(c, n, extra=''){
  c.msgs.unshift({n, name:TPL[n] + (extra ? ` — ${extra}` : ''), t:new Date()});
  log(c, 'n8n', `Sent ${n} ${TPL[n]}${extra ? ' (' + extra + ')' : ''} on WhatsApp and email`);
  toast(`${n} sent on WhatsApp and email`, `${TPL[n]}${extra ? ' — ' + extra : ''} → ${c.name} (${c.id})`);
}
function log(c, who, what){ c.activity.unshift({t:new Date(), who, what}); }
function setStage(c, s){ log(c, 'Staff', `Stage changed: ${c.stage} → ${s}`); c.stage = s; }
function modal(html, onOk){
  const w = $('#modal'); w.querySelector('.modal').innerHTML = html; w.classList.add('open');
  const close = () => w.classList.remove('open');
  w.querySelector('[data-cancel]').onclick = close;
  w.querySelector('[data-ok]').onclick = () => { if (onOk(w) !== false) close(); };
  w.querySelector('input,select,textarea,button[data-ok]')?.focus();
}

/* ---------- Layout ---------- */
const NAV = [
 ['Overview',[['dashboard','Dashboard','dash']]],
 ['Patients',[['leads','Leads (AI assistant)','lead'],['cases','Cases','case'],['council','Advisory Council','council']]],
 ['Operations',[['travel','Visa and travel','visa'],['schedule','Schedule','cal'],['attendants','Attendants','people'],['payments','Payments and ledger','pay']]],
 ['Communication',[['messages','Notification log','bell'],['templates','Message templates','tpl'],['automations','Automations','auto']]],
 ['Admin',[['reports','Reports','chart'],['users','Users and roles','users']]]
];
function counts(){ return {leads:LEADS.filter(l=>l.status==='New').length, cases:CASES.filter(c=>!['Closed','Not Approved'].includes(c.stage)).length, council:CASES.filter(c=>c.stage==='Council Review').length}; }
function shell(){
  const k = counts();
  return `<div class="app"><aside class="side" id="side"><div class="side-logo"><img src="${window.__LOGO_WHITE__}" alt="Future Connect"><small>Back office · CRM</small></div><nav aria-label="CRM">
    ${NAV.map(([g,items]) => `<div class="grp">${g}</div>` + items.map(([r,l,i]) => `<a href="#/${r}" data-r="${r}">${ic(i)} ${l}${k[r] ? `<span class="count">${k[r]}</span>` : ''}</a>`).join('')).join('')}
  </nav><div class="side-foot">Signed in as Dr. Founder<br><a href="#/logout" style="color:#9CC6E2">Sign out</a></div></aside>
  <div class="main"><header class="top"><button class="menu-btn" id="menuBtn" aria-label="Open menu">☰</button><input class="search" id="search" placeholder="Search by name or Patient ID" aria-label="Search cases"><span class="demo-flag">Demo data</span><div class="me"><span class="avatar">DF</span><span>Dr. Founder<br><span class="sub">Admin</span></span></div></header>
  <div class="view" id="view"></div></div></div>`;
}

/* ---------- Views ---------- */
const V = {};
V.dashboard = () => {
  const active = CASES.filter(c => !['Closed','Not Approved'].includes(c.stage));
  const inIndia = CASES.filter(c => ['Arrived','In Treatment','On Tour'].includes(c.stage));
  const received = CASES.reduce((a,c) => a + c.paid, 0);
  const upcoming = CASES.flatMap(c => c.schedule.map(s => ({c, t:s[0], type:s[1], what:s[2]}))).filter(x => x.t >= d(0,0)).sort((a,b) => a.t - b.t).slice(0,6);
  const recent = CASES.flatMap(c => c.msgs.map(m => ({c, ...m}))).sort((a,b) => b.t - a.t).slice(0,6);
  const alerts = [['A02','Case awaiting Council votes for 2 days','Rahima Begum','FC-2026-00119'],['A07','More information not received for 5 days','Chukwuemeka Obi','FC-2026-00120'],['A06','Estimate sent, payment pending','Fatima Yusuf','FC-2026-00121'],['A08','Patient arrives in 4 days — confirm pickup','Amina Hassan','FC-2026-00123']];
  const byStage = STAGES.map(s => [s, CASES.filter(c => c.stage === s).length]).filter(x => x[1]);
  return `<div class="page-title"><div><h1>Good morning</h1><p>Here is what needs attention today.</p></div><a class="btn" href="#/cases">Open cases</a></div>
  <div class="grid k4">
    <div class="card kpi"><b>${LEADS.filter(l=>l.status==='New').length}</b><span>New leads today</span></div>
    <div class="card kpi"><b>${active.length}</b><span>Active cases</span></div>
    <div class="card kpi"><b>${inIndia.length}</b><span>Patients in India now</span></div>
    <div class="card kpi"><b>${money(received)}</b><span>Payments received</span></div>
  </div>
  <div class="grid c2" style="margin-top:16px">
    <div class="card"><h2>Needs attention</h2><div class="log">${alerts.map(([a,t,n,id]) => `<div class="log-item"><span class="ch"><span class="in">${ic('alert',13)}</span></span><div><b>${t}</b><div class="sub">${a} · ${n} · ${id}</div></div><a class="btn ghost sm" href="#/case/${id}">Open</a></div>`).join('')}</div></div>
    <div class="card"><h2>Cases by stage</h2>${byStage.map(([s,n]) => `<div class="row-bar"><span>${s}</span><div class="bar"><i style="width:${n/Math.max(...byStage.map(x=>x[1]))*100}%"></i></div><b>${n}</b></div>`).join('')}</div>
  </div>
  <div class="grid c2e" style="margin-top:16px">
    <div class="card"><h2>Coming up</h2><div class="log">${upcoming.map(x => `<div class="log-item"><span class="pill grey">${fmtT(x.t)}</span><div><b>${x.type}</b> · ${esc(x.what)}<div class="sub">${esc(x.c.name)} · ${x.c.id}</div></div><a class="btn ghost sm" href="#/case/${x.c.id}">Open</a></div>`).join('')}</div></div>
    <div class="card"><h2>Latest messages sent</h2><div class="log">${recent.map(m => `<div class="log-item"><span class="ch"><span class="wa">${ic('wa',13)}</span><span class="em">${ic('mail',13)}</span></span><div><b>${m.n} ${esc(m.name)}</b><div class="sub">${esc(m.c.name)} · ${m.c.id}</div></div><span class="sub">${fmt(m.t)}</span></div>`).join('')}</div></div>
  </div>`;
};

V.leads = () => `<div class="page-title"><div><h1>Leads</h1><p>Every enquiry captured by the AI assistant, ads, referrals and agents, scored automatically.</p></div></div>
 <div class="tbl"><table><thead><tr><th>Name</th><th>Country</th><th>Treatment area</th><th>Score</th><th>Source</th><th>Received</th><th>Status</th><th></th></tr></thead><tbody>
 ${LEADS.map((l,i) => `<tr><td><b>${esc(l.name)}</b></td><td>${l.country}</td><td>${l.area}</td><td>${scorePill(l.score)}</td><td class="sub">${l.source}</td><td class="sub">${fmtT(l.t)}</td><td><span class="pill ${l.status==='Applied'?'ok':l.status==='New'?'':'grey'}">${l.status}</span></td><td>${l.status==='New'?`<button class="btn ghost sm" data-contact="${i}">Mark contacted</button>`:''}</td></tr>`).join('')}
 </tbody></table></div>
 <p class="sub" style="margin-top:12px">Leads move to Cases automatically when the person submits an application. Hot leads alert the Lead Desk instantly.</p>`;

function caseRow(c){ return `<tr class="click" data-case="${c.id}"><td><b>${esc(c.name)}</b><div class="sub">${c.id}</div></td><td>${c.country}</td><td>${esc(c.proc)}<div class="sub">${esc(c.dept)}</div></td><td>${pill(c.stage)}</td><td>${c.cm ? esc(c.cm) : '<span class="sub">Not assigned</span>'}</td><td class="sub">${fmt(c.applied)}</td></tr>`; }
V.cases = () => {
  const q = ($('#search')?.value || '').toLowerCase();
  const list = CASES.filter(c => !q || (c.name + c.id).toLowerCase().includes(q));
  return `<div class="page-title"><div><h1>Cases</h1><p>Every patient application, from submission to return home.</p></div><div class="toggle" role="group" aria-label="View"><button data-view="table" aria-pressed="${caseView==='table'}">Table</button><button data-view="board" aria-pressed="${caseView==='board'}">Board</button></div></div>
  ${caseView === 'table' ? `<div class="filters"><select id="stageFilter" aria-label="Filter by stage"><option value="">All stages</option>${[...STAGES,'Not Approved'].map(s => `<option>${s}</option>`).join('')}</select></div>
  <div class="tbl"><table><thead><tr><th>Patient</th><th>Country</th><th>Treatment</th><th>Stage</th><th>Case Manager</th><th>Applied</th></tr></thead><tbody id="caseBody">${list.map(caseRow).join('')}</tbody></table></div>` :
  `<div class="board">${[...STAGES,'Not Approved'].map(s => { const cs = list.filter(c => c.stage === s); return `<div class="col"><h3>${s}<span class="sub">${cs.length}</span></h3>${cs.map(c => `<button class="mini" data-case="${c.id}"><b>${esc(c.name)}</b><span class="sub">${c.id} · ${c.country}</span><br><span class="sub">${esc(c.proc)}</span></button>`).join('') || '<p class="sub">No cases</p>'}</div>`; }).join('')}</div>`}`;
};

V.council = () => {
  const list = CASES.filter(c => c.stage === 'Council Review');
  return `<div class="page-title"><div><h1>Advisory Council</h1><p>Cases waiting for review. Members vote in their own portal; the Chair confirms the decision here or there.</p></div></div>
  ${list.length ? `<div class="tbl"><table><thead><tr><th>Patient</th><th>Treatment</th><th>Hospital plan</th><th>Votes</th><th>Waiting</th></tr></thead><tbody>${list.map(c => { const v = c.votes || []; const done = v.filter(x => x[1]).length; return `<tr class="click" data-case="${c.id}"><td><b>${esc(c.name)}</b><div class="sub">${c.id} · ${c.country}</div></td><td>${esc(c.proc)}</td><td><span class="pill ok">Received</span></td><td>${done} of ${v.length}<div class="bar" style="width:120px;margin-top:6px"><i style="width:${done/(v.length||1)*100}%"></i></div></td><td class="sub">2 days</td></tr>`; }).join('')}</tbody></table></div>` : '<div class="card empty">No cases are waiting for the Council. New cases appear here when the team forwards them.</div>'}`;
};

V.travel = () => `<div class="page-title"><div><h1>Visa and travel</h1><p>Visa status, flights and hotel for every paid case. Each status change messages the patient automatically.</p></div></div>
 <div class="tbl"><table><thead><tr><th>Patient</th><th>Visa status</th><th>Attendant visas</th><th>Flight</th><th>Hotel</th><th>Case Manager</th></tr></thead><tbody>
 ${CASES.filter(c => ['Paid','Visa and Travel','Arrived','In Treatment','On Tour'].includes(c.stage)).map(c => `<tr class="click" data-case="${c.id}"><td><b>${esc(c.name)}</b><div class="sub">${c.id}</div></td><td><span class="pill ${c.visa==='Visa Approved'?'ok':'warn'}">${c.visa}</span></td><td>${c.attendants.length ? c.attendants.length + (c.visa==='Visa Approved' ? ' approved' : ' in progress') : '<span class="sub">None</span>'}</td><td>${c.flight ? fmtT(c.flight) : '<span class="sub">Not booked</span>'}</td><td>${c.flight ? '5-star, ' + (c.attendants.length ? 2 : 1) + ' room(s)' : '<span class="sub">—</span>'}</td><td>${esc(c.cm || '')}</td></tr>`).join('')}
 </tbody></table></div>`;

V.schedule = () => {
  const items = CASES.flatMap(c => c.schedule.map(s => ({c, t:s[0], type:s[1], what:s[2]}))).sort((a,b) => a.t - b.t);
  const days = [...new Set(items.map(x => x.t.toDateString()))];
  return `<div class="page-title"><div><h1>Schedule</h1><p>Arrivals, consultations, surgeries, tours and departures for all patients.</p></div></div>
  ${days.map(dd => `<div class="card" style="margin-bottom:14px"><h2>${new Date(dd).toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})}</h2><div class="log">${items.filter(x => x.t.toDateString() === dd).map(x => `<div class="log-item"><span class="pill ${x.type==='Surgery'?'gold':x.type==='Arrival'||x.type==='Departure'?'ok':''}">${x.t.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}</span><div><b>${x.type}</b> · ${esc(x.what)}<div class="sub">${esc(x.c.name)} · ${x.c.id} · ${esc(x.c.cm || '')}</div></div><a class="btn ghost sm" href="#/case/${x.c.id}">Open</a></div>`).join('')}</div></div>`).join('')}`;
};

V.attendants = () => `<div class="page-title"><div><h1>Attendants</h1><p>Family members travelling with patients, each with their own visa, flight and room.</p></div></div>
 <div class="tbl"><table><thead><tr><th>Attendant</th><th>Relationship</th><th>Patient</th><th>Visa (e-Medical Attendant)</th><th>Flight</th><th>Room</th></tr></thead><tbody>
 ${CASES.flatMap(c => c.attendants.map(a => ({c,a}))).map(({c,a}) => `<tr class="click" data-case="${c.id}"><td><b>${esc(a[0])}</b></td><td>${esc(a[1])}</td><td>${esc(c.name)}<div class="sub">${c.id}</div></td><td>${['Paid','Visa and Travel','Arrived','In Treatment','On Tour'].includes(c.stage) ? `<span class="pill ${c.visa==='Visa Approved'?'ok':'warn'}">${c.visa==='Visa Approved'?'Approved':'In progress'}</span>` : '<span class="sub">After payment</span>'}</td><td>${c.flight ? fmt(c.flight) : '<span class="sub">—</span>'}</td><td>${c.flight ? 'Shared with patient' : '<span class="sub">—</span>'}</td></tr>`).join('')}
 </tbody></table></div>`;

V.payments = () => {
  const paid = CASES.filter(c => c.paid);
  return `<div class="page-title"><div><h1>Payments and ledger</h1><p>Money received through Razorpay, every bill paid on the patient's behalf, and the balance held.</p></div></div>
  <div class="grid k4" style="margin-bottom:16px"><div class="card kpi"><b>${money(paid.reduce((a,c)=>a+c.paid,0))}</b><span>Received</span></div><div class="card kpi"><b>${money(paid.reduce((a,c)=>a+billsTotal(c),0))}</b><span>Bills paid</span></div><div class="card kpi"><b>${money(paid.reduce((a,c)=>a+c.paid-billsTotal(c),0))}</b><span>Balance held for patients</span></div><div class="card kpi"><b>${CASES.filter(c=>c.stage==='Approved').length}</b><span>Estimates awaiting payment</span></div></div>
  <div class="tbl"><table><thead><tr><th>Patient</th><th>Estimate</th><th>Received</th><th>Bills paid</th><th>Balance</th><th>Invoice</th></tr></thead><tbody>
  ${CASES.filter(c => c.estimate).map(c => `<tr class="click" data-case="${c.id}"><td><b>${esc(c.name)}</b><div class="sub">${c.id}</div></td><td>${money(c.estimate)}</td><td>${c.paid ? money(c.paid) : '<span class="pill warn">Awaiting</span>'}</td><td>${money(billsTotal(c))}</td><td><b>${money(c.paid - billsTotal(c))}</b></td><td>${c.paid ? `INV-${c.id.slice(-5)}` : '—'}</td></tr>`).join('')}
  </tbody></table></div>`;
};

V.messages = () => {
  const all = CASES.flatMap(c => c.msgs.map(m => ({c, ...m}))).sort((a,b) => b.t - a.t);
  return `<div class="page-title"><div><h1>Notification log</h1><p>Every WhatsApp and email sent to patients. Each one is also saved in the patient's account.</p></div></div>
  <div class="tbl"><table><thead><tr><th>Sent</th><th>Template</th><th>Patient</th><th>WhatsApp</th><th>Email</th></tr></thead><tbody>
  ${all.slice(0,60).map(m => `<tr class="click" data-case="${m.c.id}"><td class="sub">${fmtT(m.t)}</td><td><b>${m.n}</b> ${esc(m.name)}</td><td>${esc(m.c.name)}<div class="sub">${m.c.id} · ${m.c.lang}</div></td><td><span class="pill ok">Read</span></td><td><span class="pill ok">Delivered</span></td></tr>`).join('')}
  </tbody></table></div>`;
};

V.templates = () => `<div class="page-title"><div><h1>Message templates</h1><p>21 pre-designed templates. Each has a WhatsApp and a matching email version in every language. Name, Patient ID and occasion are filled in automatically.</p></div></div>
 <div class="grid c2"><div class="tbl"><table><thead><tr><th>ID</th><th>Template</th><th>Category</th><th>Sent when</th><th>Timing</th></tr></thead><tbody>
 ${TEMPLATES.map(t => `<tr class="click" data-tpl="${t[0]}"><td><b>${t[0]}</b></td><td>${t[1]}</td><td><span class="pill grey">${t[2]}</span></td><td class="sub">${t[3]}</td><td class="sub">${t[4]}</td></tr>`).join('')}
 </tbody></table></div><div class="card" id="tplPreview"><h2>Preview</h2><p class="sub">Select a template to preview it.</p></div></div>`;

V.automations = () => `<div class="page-title"><div><h1>Automations</h1><p>The n8n workflows that send messages, reminders and alerts, and keep the activity log.</p></div></div>
 <div class="tbl"><table><thead><tr><th>Workflow</th><th>Starts when</th><th>Sends</th><th>Status</th><th>Last run</th></tr></thead><tbody>
 ${WORKFLOWS.map((w,i) => `<tr><td><b>${w[0]}</b> ${w[1]}</td><td class="sub">${w[2]}</td><td class="sub">${w[3]}</td><td><span class="pill ok">Active</span></td><td class="sub">${i*7+2} min ago</td></tr>`).join('')}
 </tbody></table></div>`;

V.reports = () => {
  const by = key => { const m = {}; CASES.forEach(c => m[c[key]] = (m[c[key]]||0)+1); return Object.entries(m).sort((a,b) => b[1]-a[1]); };
  const src = {}; LEADS.forEach(l => { const s = l.source.split(' —')[0].split(' (')[0]; src[s] = (src[s]||0)+1; });
  const bars = arr => { const mx = Math.max(...arr.map(x=>x[1])); return arr.map(([k,v]) => `<div class="row-bar"><span>${esc(k)}</span><div class="bar"><i style="width:${v/mx*100}%"></i></div><b>${v}</b></div>`).join(''); };
  const decided = CASES.filter(c => !['Application Received','Council Review','More Info Needed'].includes(c.stage));
  return `<div class="page-title"><div><h1>Reports</h1><p>Where patients come from, what they need, and how cases move.</p></div></div>
  <div class="grid k4" style="margin-bottom:16px"><div class="card kpi"><b>${LEADS.length}</b><span>Leads this month</span></div><div class="card kpi"><b>${CASES.length}</b><span>Applications</span></div><div class="card kpi"><b>${Math.round(decided.filter(c=>c.stage!=='Not Approved').length/decided.length*100)}%</b><span>Council approval rate</span></div><div class="card kpi"><b>4.8</b><span>Average patient rating</span></div></div>
  <div class="grid c2e"><div class="card"><h2>Cases by country</h2>${bars(by('country'))}</div><div class="card"><h2>Cases by department</h2>${bars(by('dept'))}</div><div class="card"><h2>Leads by source</h2>${bars(Object.entries(src).sort((a,b)=>b[1]-a[1]))}</div><div class="card"><h2>Cases by hospital</h2>${bars(by('hospital'))}</div></div>`;
};

V.users = () => `<div class="page-title"><div><h1>Users and roles</h1><p>Each person sees only what their role needs. Two-step login is required for every staff member.</p></div></div>
 <div class="tbl"><table><thead><tr><th>Name</th><th>Role</th><th>Can access</th><th>Two-step login</th></tr></thead><tbody>
 ${STAFF.map(s => `<tr><td><b>${s[0]}</b></td><td><span class="pill">${s[1]}</span></td><td class="sub">${s[2]}</td><td><span class="pill ok">On</span></td></tr>`).join('')}
 </tbody></table></div>`;

/* ---------- Case detail ---------- */
function actionsFor(c){
  const a = [];
  if (c.stage === 'Application Received') a.push(['forward','Forward to Advisory Council','']);
  if (c.stage === 'Council Review') a.push(['decide','Record Council decision','gold']);
  if (c.stage === 'More Info Needed') a.push(['docsIn','Mark documents received','']);
  if (c.stage === 'Approved' && !c.estimateSent) a.push(['estimate', c.estimate ? 'Resend approval and estimate' : 'Send approval and estimate','gold']);
  if (c.stage === 'Approved') a.push(['pay','Simulate Razorpay payment','']);
  if (['Paid','Visa and Travel'].includes(c.stage)) a.push(['visa','Update visa status',''],['tickets','Upload tickets',''],['itinerary','Upload itinerary',''],['arrived','Mark arrived','gold']);
  if (['Arrived','In Treatment'].includes(c.stage)) a.push(['treat','Update treatment status','gold'],['topup','Request top-up','']);
  if (['In Treatment'].includes(c.stage)) a.push(['tour','Upload tour plan','']);
  if (['In Treatment','On Tour'].includes(c.stage)) a.push(['final','Approve final statement',''],['departed','Mark departed','gold']);
  return a;
}
V.case = id => {
  const c = findCase(id); if (!c) return '<div class="card empty">Case not found. Check the Patient ID and try again.</div>';
  const railIdx = RAIL.indexOf(c.stage === 'More Info Needed' ? 'Council Review' : c.stage);
  const tabs = [['overview','Overview'],['documents','Documents'],['council','Council'],['payments','Payments'],['travel','Visa and travel'],['attendants',`Attendants (${c.attendants.length})`],['schedule','Schedule'],['messages',`Messages (${c.msgs.length})`],['activity','Activity log']];
  let body = '';
  if (caseTab === 'overview') body = `<div class="grid c2e"><div class="card"><h2>Patient</h2><dl class="dl"><dt>Patient ID</dt><dd>${c.id}</dd><dt>Country</dt><dd>${c.country}</dd><dt>Language</dt><dd>${c.lang}</dd><dt>WhatsApp</dt><dd>${c.wa}</dd><dt>Email</dt><dd>${c.email}</dd><dt>Faith and food</dt><dd>${c.faith.join(', ') || 'None stated'}</dd></dl></div>
    <div class="card"><h2>Medical</h2><dl class="dl"><dt>Department</dt><dd>${esc(c.dept)}</dd><dt>Treatment</dt><dd>${esc(c.proc)}</dd><dt>Referred by</dt><dd>${esc(c.referrer)} (home country)</dd><dt>Referred to</dt><dd>${esc(c.doctor)}</dd><dt>Hospital</dt><dd>${esc(c.hospital)}</dd><dt>Case Manager</dt><dd>${esc(c.cm || 'Assigned automatically after payment')}</dd>${c.treat ? `<dt>Treatment status</dt><dd>${c.treat}</dd>` : ''}</dl></div></div>
    ${c.reason ? `<div class="card" style="margin-top:16px"><h2>${c.stage === 'Not Approved' ? 'Reason shared with patient' : 'Information requested'}</h2><p>${esc(c.reason)}</p></div>` : ''}`;
  if (caseTab === 'documents') body = `<div class="card"><h2>Documents</h2><div class="log">${[...c.docs, ...(c.paid ? ['Invoice INV-' + c.id.slice(-5)] : []), ...(c.visa === 'Visa Approved' ? ['Hospital invitation letter','e-Medical Visa'] : []), ...(c.flight ? ['Flight tickets','Itinerary'] : [])].map(x => `<div class="log-item"><span class="ch"><span class="em">${ic('tpl',13)}</span></span><div>${esc(x)}<div class="sub">Encrypted · visible in patient account</div></div><button class="btn ghost sm" data-toast="Download link created — it expires in 10 minutes.">Download</button></div>`).join('')}</div></div>`;
  if (caseTab === 'council') body = c.votes ? `<div class="card"><h2>Votes</h2>${c.votes.map(v => `<div class="vote"><span class="avatar" style="width:30px;height:30px;font-size:.75rem">${v[0][0]}</span><span>${v[0]}</span>${v[1] ? `<span class="pill ${v[1]==='Approve'?'ok':v[1]==='Reject'?'bad':'warn'}">${v[1]}</span>` : '<span class="pill grey">Not voted</span>'}</div>`).join('')}</div>` : `<div class="card"><p class="sub">${['Application Received'].includes(c.stage) ? 'The case has not been sent to the Council yet.' : 'Council decision recorded. ' + (c.stage === 'Not Approved' ? 'Not approved.' : 'Approved.')}</p></div>`;
  if (caseTab === 'payments') body = `<div class="grid c2e"><div class="card"><h2>Summary</h2><dl class="dl"><dt>Estimate</dt><dd>${c.estimate ? money(c.estimate) : 'Not set'}</dd><dt>Received</dt><dd>${money(c.paid)}</dd><dt>Bills paid</dt><dd>${money(billsTotal(c))}</dd><dt>Balance held</dt><dd><b>${money(c.paid - billsTotal(c))}</b></dd><dt>Payment method</dt><dd>${c.paid ? 'Razorpay (international card)' : '—'}</dd></dl></div>
    <div class="card"><h2>Bills paid for the patient</h2>${c.bills.length ? `<div class="log">${c.bills.map(b => `<div class="log-item"><span></span><div>${esc(b[0])}</div><b>${money(b[1])}</b></div>`).join('')}</div>` : '<p class="sub">No bills yet.</p>'}${c.paid ? '<button class="btn ghost sm" style="margin-top:12px" data-addbill="1">Add bill</button>' : ''}</div></div>`;
  if (caseTab === 'travel') body = `<div class="card"><h2>Visa and travel</h2><dl class="dl"><dt>Patient visa</dt><dd>${c.visa}</dd><dt>Attendant visas</dt><dd>${c.attendants.length ? c.attendants.length + ' × e-Medical Attendant Visa' : 'None'}</dd><dt>Flight</dt><dd>${c.flight ? fmtT(c.flight) : 'Not booked'}</dd><dt>Hotel</dt><dd>${c.flight ? '5-star hotel, near ' + esc(c.hospital) : '—'}</dd><dt>Airport pickup</dt><dd>${c.flight ? 'Driver and ' + esc(c.cm || 'Case Manager') : '—'}</dd><dt>Insurance</dt><dd>${c.paid ? 'Travel medical insurance' : '—'}</dd></dl></div>`;
  if (caseTab === 'attendants') body = c.attendants.length ? `<div class="tbl"><table><thead><tr><th>Name</th><th>Relationship</th><th>Passport</th><th>Visa</th><th>Room</th></tr></thead><tbody>${c.attendants.map(a => `<tr><td><b>${esc(a[0])}</b></td><td>${esc(a[1])}</td><td><span class="pill ok">Uploaded</span></td><td>${c.visa==='Visa Approved'?'<span class="pill ok">Approved</span>':'<span class="pill grey">Pending</span>'}</td><td>${c.flight?'Shared with patient':'—'}</td></tr>`).join('')}</tbody></table></div><button class="btn ghost sm" style="margin-top:12px" data-addatt="1">Add attendant</button>` : `<div class="card empty">No attendants. <button class="btn ghost sm" data-addatt="1">Add attendant</button></div>`;
  if (caseTab === 'schedule') body = `<div class="card"><h2>Schedule</h2>${c.schedule.length ? `<div class="log">${c.schedule.map(s => `<div class="log-item"><span class="pill grey">${fmtT(s[0])}</span><div><b>${s[1]}</b> · ${esc(s[2])}</div><span></span></div>`).join('')}</div>` : '<p class="sub">Nothing scheduled yet.</p>'}<button class="btn ghost sm" style="margin-top:12px" data-addsched="1">Add to schedule</button></div>`;
  if (caseTab === 'messages') body = `<div class="card"><h2>Messages sent to this patient</h2><div class="log">${c.msgs.map(m => `<div class="log-item"><span class="ch"><span class="wa">${ic('wa',13)}</span><span class="em">${ic('mail',13)}</span></span><div><b>${m.n}</b> ${esc(m.name)}<div class="sub">WhatsApp ${c.wa} · Email ${c.email} · ${c.lang}</div></div><span class="sub">${fmtT(m.t)}</span></div>`).join('')}</div></div>`;
  if (caseTab === 'activity') body = `<div class="card"><h2>Activity log</h2><div class="log">${c.activity.map(a => `<div class="log-item"><span class="pill grey">${esc(a.who)}</span><div>${esc(a.what)}</div><span class="sub">${fmtT(a.t)}</span></div>`).join('')}</div></div>`;
  return `<a href="#/cases" class="sub" style="text-decoration:none">← All cases</a>
  <div class="case-head" style="margin-top:10px"><div><h1>${esc(c.name)}</h1><div class="meta">${pill(c.stage)}<span class="pill grey">${c.id}</span><span class="pill grey">${c.country}</span><span class="pill grey">${esc(c.proc)}</span></div></div>
  <div class="action-bar">${actionsFor(c).map(([k,l,s]) => `<button class="btn ${s} sm" data-act="${k}">${l}</button>`).join('')}</div></div>
  ${c.stage !== 'Not Approved' ? `<div class="stage-rail">${RAIL.map((s,i) => `<div class="${i<railIdx?'done':i===railIdx?'now':''}">${s}</div>`).join('')}</div>` : ''}
  <div class="tabs" role="tablist">${tabs.map(([k,l]) => `<button class="tab" role="tab" aria-selected="${k===caseTab}" data-tab="${k}">${l}</button>`).join('')}</div>${body}`;
};

/* ---------- Case actions ---------- */
const ACT = {
  forward: c => { setStage(c,'Council Review'); c.votes = [['Chair',null],['Cardiac sciences',null],['Oncology',null],['Transplant medicine',null],['Neurosciences',null],['Orthopaedics',null],['Internal medicine',null]]; notify(c,'N02'); log(c,'n8n','Alert A02 sent to 7 Council members'); },
  decide: c => modal(`<h2>Record Council decision</h2><p class="sub">Confirmed by the Council Chair.</p><div class="field" style="margin-top:14px"><label for="dec">Decision</label><select id="dec"><option>Approve</option><option>More information needed</option><option>Not approved</option></select></div><div class="field" style="margin-top:12px"><label for="rsn">Reason or request (shared with the patient)</label><textarea id="rsn" rows="3"></textarea></div><div class="acts"><button class="btn ghost" data-cancel>Cancel</button><button class="btn" data-ok>Confirm decision</button></div>`, w => {
    const dec = w.querySelector('#dec').value, r = w.querySelector('#rsn').value.trim();
    if (dec !== 'Approve' && !r){ w.querySelector('#rsn').focus(); toast('Add a reason','The patient sees this text, so it is required.'); return false; }
    c.votes = (c.votes||[]).map(v => [v[0], v[1] || (dec==='Approve'?'Approve':dec==='Not approved'?'Reject':'More info')]);
    if (dec === 'Approve'){ setStage(c,'Approved'); log(c,'Council','Approved by the Advisory Council'); log(c,'n8n','Alert A04 sent: enter estimate'); toast('Case approved','Next: enter the estimate and send approval to the patient.'); }
    else if (dec === 'Not approved'){ c.reason = r; setStage(c,'Not Approved'); notify(c,'N03'); }
    else { c.reason = r; setStage(c,'More Info Needed'); notify(c,'N04'); }
    render(); }),
  docsIn: c => { notify(c,'N05'); setStage(c,'Council Review'); c.reason=''; },
  estimate: c => modal(`<h2>Send approval and estimate</h2><p class="sub">The patient sees the estimate with Terms and Refund Policy and must accept them before paying.</p><div class="field" style="margin-top:14px"><label for="est">Ballpark total estimate (USD)</label><input id="est" type="number" value="${c.estimate || ''}"></div><div class="acts"><button class="btn ghost" data-cancel>Cancel</button><button class="btn gold" data-ok>Send to patient</button></div>`, w => {
    const v = Number(w.querySelector('#est').value); if (!v){ toast('Enter the estimate','The amount is shown to the patient before payment.'); return false; }
    c.estimate = v; notify(c,'N06', money(v)); render(); }),
  pay: c => { if (!c.estimate){ toast('Send the estimate first','The patient pays only after accepting the estimate.'); return; } c.paid = c.estimate; c.cm = CMS[Math.floor(Math.random()*2)]; setStage(c,'Paid'); log(c,'Razorpay','Payment received ' + money(c.paid) + ' — invoice INV-' + c.id.slice(-5) + ' created'); notify(c,'N07', 'Case Manager ' + c.cm); log(c,'n8n','Documents emailed to Visa Team; alert A05 to Finance and ' + c.cm); },
  visa: c => modal(`<h2>Update visa status</h2><div class="field" style="margin-top:14px"><label for="vs">Status</label><select id="vs">${['Invitation Letter Ready','Visa Application Guidance','Visa Applied','Visa Approved','Visa Issue'].map(s => `<option ${s===c.visa?'selected':''}>${s}</option>`).join('')}</select></div><div class="acts"><button class="btn ghost" data-cancel>Cancel</button><button class="btn" data-ok>Save and notify patient</button></div>`, w => { c.visa = w.querySelector('#vs').value; if (c.stage === 'Paid') setStage(c,'Visa and Travel'); notify(c,'N08', c.visa); render(); }),
  tickets: c => modal(`<h2>Upload tickets</h2><div class="field" style="margin-top:14px"><label for="fl">Flight arrival in Chennai</label><input id="fl" type="datetime-local"></div><div class="field" style="margin-top:12px"><label for="tf">Ticket files</label><input id="tf" type="file" multiple></div><div class="acts"><button class="btn ghost" data-cancel>Cancel</button><button class="btn" data-ok>Upload and notify</button></div>`, w => { const v = w.querySelector('#fl').value; if (!v){ toast('Add the flight date','It schedules the 7-day and 48-hour reminders.'); return false; } c.flight = new Date(v); c.schedule.push([c.flight,'Arrival','Chennai airport pickup']); if (c.stage==='Paid') setStage(c,'Visa and Travel'); notify(c,'N09'); log(c,'n8n','Reminders N11 (7 days before) and N12 (48 hours before) scheduled'); render(); }),
  itinerary: c => { notify(c,'N10'); },
  arrived: c => { if (!c.flight){ toast('Upload tickets first','The arrival date comes from the flight.'); return; } setStage(c,'Arrived'); notify(c,'N13'); log(c,'n8n','Hospital alerted: patient arrived'); },
  treat: c => modal(`<h2>Update treatment status</h2><div class="field" style="margin-top:14px"><label for="ts">Status</label><select id="ts">${['Consultation Scheduled','Admitted','Procedure Scheduled','Procedure Completed','In Recovery','Discharged'].map(s => `<option ${s===c.treat?'selected':''}>${s}</option>`).join('')}</select></div><div class="acts"><button class="btn ghost" data-cancel>Cancel</button><button class="btn" data-ok>Save and notify patient</button></div>`, w => { c.treat = w.querySelector('#ts').value; if (c.stage==='Arrived') setStage(c,'In Treatment'); notify(c,'N14', c.treat); render(); }),
  topup: c => modal(`<h2>Request top-up</h2><p class="sub">Explain the change to the patient in person first.</p><div class="field" style="margin-top:14px"><label for="ta">Amount (USD)</label><input id="ta" type="number"></div><div class="field" style="margin-top:12px"><label for="tr">Reason (shared with the patient)</label><textarea id="tr" rows="3"></textarea></div><div class="acts"><button class="btn ghost" data-cancel>Cancel</button><button class="btn" data-ok>Send payment link</button></div>`, w => { const a = Number(w.querySelector('#ta').value), r = w.querySelector('#tr').value.trim(); if (!a || !r){ toast('Add amount and reason','Both are shown to the patient.'); return false; } notify(c,'N16', money(a)); log(c,'Razorpay','Payment link created for ' + money(a)); setTimeout(() => { c.paid += a; notify(c,'N17', money(a)); log(c,'Razorpay','Top-up received ' + money(a)); render(); }, 2500); render(); }),
  tour: c => { setStage(c,'On Tour'); c.treat = 'Discharged'; notify(c,'N15'); },
  final: c => { notify(c,'N18', 'Balance ' + money(c.paid - billsTotal(c))); log(c,'Finance','Final statement approved'); },
  departed: c => { setStage(c,'Departed'); notify(c,'N19'); log(c,'n8n','Review request N20 scheduled for 3 days after departure'); }
};

/* ---------- Render and routing ---------- */
function render(){
  const v = $('#view'); if (!v) return;
  const [r, id] = route.split('/');
  v.innerHTML = r === 'case' ? V.case(id) : (V[r] || V.dashboard)();
  document.querySelectorAll('.side a[data-r]').forEach(a => a.setAttribute('aria-current', a.dataset.r === (r === 'case' ? 'cases' : r) ? 'page' : 'false'));
  const k = counts(); document.querySelectorAll('.side a[data-r]').forEach(a => { const c = a.querySelector('.count'); if (c && k[a.dataset.r] !== undefined) c.textContent = k[a.dataset.r]; });
}
function go(){
  const h = location.hash.replace(/^#\/?/, '') || 'dashboard';
  if (h === 'logout'){ sessionStorage.removeItem('fc_crm'); return boot(); }
  if (route.split('/')[1] !== h.split('/')[1]) caseTab = 'overview';
  route = h; $('#side')?.classList.remove('open'); render(); $('#view') && ($('#view').scrollTop = 0);
}
function bindApp(){
  document.addEventListener('click', e => {
    const t = e.target.closest('[data-case],[data-tab],[data-act],[data-view],[data-tpl],[data-contact],[data-toast],[data-addbill],[data-addatt],[data-addsched]'); if (!t) return;
    if (t.dataset.case){ location.hash = '#/case/' + t.dataset.case; return; }
    const c = findCase(route.split('/')[1]);
    if (t.dataset.tab){ caseTab = t.dataset.tab; render(); return; }
    if (t.dataset.act && c){ ACT[t.dataset.act](c); render(); return; }
    if (t.dataset.view){ caseView = t.dataset.view; render(); return; }
    if (t.dataset.contact){ LEADS[t.dataset.contact].status = 'Contacted'; toast('Lead updated','Marked as contacted.'); render(); return; }
    if (t.dataset.toast){ toast('Done', t.dataset.toast); return; }
    if (t.dataset.tpl){ const tp = TEMPLATES.find(x => x[0] === t.dataset.tpl); $('#tplPreview').innerHTML = `<h2>${tp[0]} · ${tp[1]}</h2><p class="sub" style="margin-bottom:10px">WhatsApp version</p><div class="tpl">Hello {Patient Name},\n\n${tp[1]}.\nYour Patient ID: {Patient ID}\n\nView details in your account: {Login Link}\n\nFuture Connect — The Perfect Health Partner</div><p class="sub" style="margin:14px 0 10px">Sent when: ${tp[3]} · ${tp[4]}</p><p class="sub">The email version uses the same text with Future Connect branding. Both are sent together in the patient's language.</p>`; return; }
    if (t.dataset.addbill && c) return modal(`<h2>Add bill paid</h2><div class="field" style="margin-top:14px"><label for="bn">Description</label><input id="bn"></div><div class="field" style="margin-top:12px"><label for="ba">Amount (USD)</label><input id="ba" type="number"></div><div class="acts"><button class="btn ghost" data-cancel>Cancel</button><button class="btn" data-ok>Add to ledger</button></div>`, w => { const n = w.querySelector('#bn').value.trim(), a = Number(w.querySelector('#ba').value); if (!n || !a){ toast('Add description and amount','Both appear in the patient ledger.'); return false; } c.bills.push([n,a]); log(c,'Finance','Bill paid: ' + n + ' ' + money(a)); render(); });
    if (t.dataset.addatt && c) return modal(`<h2>Add attendant</h2><div class="field" style="margin-top:14px"><label for="an">Full name</label><input id="an"></div><div class="field" style="margin-top:12px"><label for="ar">Relationship</label><input id="ar"></div><div class="field" style="margin-top:12px"><label for="ap">Passport copy</label><input id="ap" type="file"></div><div class="acts"><button class="btn ghost" data-cancel>Cancel</button><button class="btn" data-ok>Add attendant</button></div>`, w => { const n = w.querySelector('#an').value.trim(), r = w.querySelector('#ar').value.trim(); if (!n || !r){ toast('Add name and relationship','Both are needed for the attendant visa.'); return false; } c.attendants.push([n,r]); log(c,'Staff','Attendant added: ' + n + ' (' + r + ')'); render(); });
    if (t.dataset.addsched && c) return modal(`<h2>Add to schedule</h2><div class="field" style="margin-top:14px"><label for="st">Type</label><select id="st"><option>Consultation</option><option>Tests</option><option>Surgery</option><option>Doctor review</option><option>Tour</option><option>Departure</option></select></div><div class="field" style="margin-top:12px"><label for="sd">Date and time</label><input id="sd" type="datetime-local"></div><div class="field" style="margin-top:12px"><label for="sw">Details</label><input id="sw"></div><div class="acts"><button class="btn ghost" data-cancel>Cancel</button><button class="btn" data-ok>Add</button></div>`, w => { const dt = w.querySelector('#sd').value; if (!dt){ toast('Choose a date and time','It appears on the team schedule.'); return false; } c.schedule.push([new Date(dt), w.querySelector('#st').value, w.querySelector('#sw').value || '']); c.schedule.sort((a,b)=>a[0]-b[0]); log(c,'Staff','Schedule updated'); render(); });
  });
  document.addEventListener('change', e => { if (e.target.id === 'stageFilter'){ const s = e.target.value; $('#caseBody').innerHTML = CASES.filter(c => !s || c.stage === s).map(caseRow).join('') || '<tr><td colspan="6" class="empty">No cases at this stage.</td></tr>'; } });
  document.addEventListener('input', e => { if (e.target.id === 'search'){ if (!route.startsWith('cases')) location.hash = '#/cases'; else render(); setTimeout(() => { const s = $('#search'); s.focus(); s.setSelectionRange(s.value.length, s.value.length); }); } });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') $('#modal').classList.remove('open'); });
}
let bound = false;
function boot(){
  const root = $('#root');
  let signed = false; try { signed = sessionStorage.getItem('fc_crm') === '1'; } catch(e){}
  if (!signed){
    root.innerHTML = `<div class="login"><form class="box" id="login" novalidate><img src="${window.__LOGO__}" alt="Future Connect"><h1>Back office</h1><p class="sub">Staff sign-in · two-step verification</p>
      <div class="field" style="margin-top:20px"><label for="u">Work email</label><input id="u" type="email" value="info@thefutureconnect.com"></div>
      <div class="field" style="margin-top:12px"><label for="p">Password</label><input id="p" type="password" value="demo-password"></div>
      <div class="field" style="margin-top:12px"><label for="o">6-digit code from your authenticator</label><input id="o" inputmode="numeric" maxlength="6" placeholder="Any 6 digits in this demo"></div>
      <p class="sub" id="lerr" style="color:var(--bad);margin-top:10px" hidden></p>
      <button class="btn" style="width:100%;justify-content:center;margin-top:18px;padding:12px" type="submit">Sign in</button></form></div>`;
    $('#login').onsubmit = e => { e.preventDefault(); if (!/^\d{6}$/.test($('#o').value)){ const er = $('#lerr'); er.hidden = false; er.textContent = 'Enter the 6-digit code. In this demo, any 6 digits work.'; $('#o').focus(); return; } try { sessionStorage.setItem('fc_crm','1'); } catch(e){} location.hash = '#/dashboard'; boot(); };
    return;
  }
  root.innerHTML = shell();
  $('#menuBtn').onclick = () => $('#side').classList.toggle('open');
  if (!bound){ bindApp(); window.addEventListener('hashchange', go); bound = true; }
  go();
}
boot();
})();
