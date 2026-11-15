'use strict';
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ini=n=>n.split(' ').map(x=>x[0]).join('').slice(0,2);
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500)};


/* ---------- Photos (Unsplash demo images; swap for company-approved photos later) ---------- */
const U=(id,w=900)=>`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const IMG={hero:U('1521737711867-e3b97375f902',1500),team:U('1528605248644-14dd04022da1'),meeting:U('1556761175-b413da4baf72'),health:U('1576091160399-112ba8d25d1d'),ai:U('1677442136019-21780ecad995'),mobile:U('1551650975-87deedd944c3'),cloud:U('1451187580459-43490279c0fa'),office:U('1497366754035-f200968a6e72'),workshop:U('1517245386807-bb43f82c33c4'),web:U('1498050108023-c5249f4df085'),auto:U('1518432031352-d6fc5c10da5a'),
 p:['1534528741775-53994a69daeb','1500648767791-00dcc994a43e','1531123897727-8f129e1688ce','1506794778202-cad84cf45f1d','1544005313-94ddf0286df2'].map(i=>U(i,200))};
const NEWSIMG={1:IMG.team,2:IMG.meeting,3:IMG.workshop,4:IMG.team,5:IMG.health};
const EVIMG={1:IMG.workshop,2:IMG.team,3:IMG.meeting,4:IMG.office};
const PROJIMG={'Software Engineering':IMG.office,'Digital Healthcare':IMG.health,'Artificial Intelligence':IMG.ai,'Automation':IMG.auto,'Cloud Computing':IMG.cloud,'Mobile Applications':IMG.mobile,'Web Development':IMG.web};
const pic=(src,cls)=>src?`<img class="${cls}" src="${src}" alt="" loading="lazy" onerror="this.remove()">`:'';
/* colourful icons (white glyph on a gradient tile) */
const GL={dashboard:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',news:'<path d="M4 5h13v14H6a2 2 0 0 1-2-2z"/><path d="M17 9h3v8a2 2 0 0 1-2 2M8 9h5M8 13h5"/>',events:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/>',community:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5M16 4.8a3.4 3.4 0 0 1 0 6.4M18 14.8c2 .7 3.2 2.4 3.5 5.2"/>',recognition:'<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M12 14v4M8 21h8"/>',projects:'<path d="M12 3c3.5 1.5 6 5 6 9l-3 3H9l-3-3c0-4 2.5-7.5 6-9z"/><circle cx="12" cy="10" r="1.6"/><path d="M9 15l-2 5 4-2M15 15l2 5-4-2"/>',learning:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19a2 2 0 0 1 2-2h13M9 7h6"/>',profile:'<circle cx="12" cy="8" r="4"/><path d="M4 21c.8-4.2 4-6 8-6s7.2 1.8 8 6"/>',mega:'<path d="M3 10v4h4l8 5V5L7 10z"/><path d="M18 9a4 4 0 0 1 0 6"/>',chat:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9h8M8 12h5"/>'};
const GC={dashboard:'#e63946,#b3121c',news:'#ff9a56,#ff5e3a',events:'#ffcc4d,#ff9f0a',community:'#3ddc97,#13946a',recognition:'#ff7eb6,#d6246e',projects:'#5cb2ff,#2f6bff',learning:'#b794ff,#7c3aed',profile:'#5eead4,#0d9488',mega:'#ff9a56,#ff5e3a',chat:'#5eead4,#0d9488'};
const ico=k=>`<span class="ico" style="background:linear-gradient(135deg,${GC[k]})"><svg viewBox="0 0 24 24" aria-hidden="true">${GL[k]}</svg></span>`;

/* ---------- Fictional demo data ---------- */
const news=[
 {id:1,t:'Welcome to Cambio Connect',c:'Company Updates',d:'2026-11-10',pin:true,x:'Our new prototype brings news, events, people and projects together in one place.'},
 {id:2,t:'Quarterly all-hands meeting',c:'Important Notices',d:'2026-11-08',x:'Join the leadership team for a review of progress and priorities. Questions can be submitted in advance.'},
 {id:3,t:'Interoperability workshop recap',c:'Technology News',d:'2026-11-05',x:'Teams shared lessons on standards-based data exchange and clinical information models.'},
 {id:4,t:'Colombo team volunteer day',c:'Employee Activities',d:'2026-11-02',x:'Thank you to everyone who joined this year’s community volunteering day.'},
 {id:5,t:'Project Aurora delivered',c:'Achievements',d:'2026-10-28',x:'Congratulations to the team on completing the demo patient-portal project on schedule.'}];
const events=[
 {id:1,t:'Technical workshop: APIs in healthcare',d:'2026-11-20',type:'Technical workshops',loc:'Training Room A'},
 {id:2,t:'Team-building afternoon',d:'2026-11-27',type:'Team-building',loc:'Galle Face Green'},
 {id:3,t:'Knowledge-sharing session',d:'2026-12-04',type:'Knowledge sharing',loc:'Online'},
 {id:4,t:'Year-end celebration',d:'2026-12-18',type:'Company celebrations',loc:'Main Hall'}];
const people=[
 ['Samuel Perera','Software Engineer','Engineering','React, Java, SQL'],['Nadeesha Silva','Product Designer','Design','Figma, UX research'],
 ['Kasun Fernando','QA Lead','Quality','Test automation, Cypress'],['Ishara Jayasuriya','HR Partner','People & Culture','Recruitment, Engagement'],
 ['Ruwan Wickrama','Cloud Engineer','Infrastructure','AWS, Docker, CI/CD'],['Amaya Gunawardena','Project Manager','Delivery','Agile, Planning'],
 ['Dilshan Rodrigo','Data Analyst','Analytics','SQL, Power BI'],['Tharushi Abeysekera','Mobile Developer','Engineering','Flutter, Kotlin']];
const recog=[
 {n:'Nadeesha Silva',m:'Employee of the month – for a redesign that cut onboarding time for new staff.',k:'Employee of the month'},
 {n:'Team Aurora',m:'Delivered the demo patient-portal ahead of schedule.',k:'Team achievement'},
 {n:'Kasun Fernando',m:'Reached 90% automated test coverage across core modules.',k:'Professional milestone'}];
const projects=[
 {id:1,t:'Healthcare Management Solution',c:'Software Engineering',s:'Completed',tech:['Java','React','SQL'],team:['Samuel Perera','Amaya Gunawardena'],d:'A demonstration of a healthcare software solution.',o:'Delivered a working prototype with role-based access.'},
 {id:2,t:'Project Aurora Patient Portal',c:'Digital Healthcare',s:'Completed',tech:['React','Node.js','MySQL'],team:['Tharushi Abeysekera','Nadeesha Silva'],d:'Demo portal where patients view appointments and summaries (fictional data).',o:'Completed on schedule and approved for showcase.'},
 {id:3,t:'Smart Search Assistant',c:'Artificial Intelligence',s:'In progress',tech:['Python','NLP'],team:['Dilshan Rodrigo'],d:'Prototype search helper for finding internal knowledge articles.',o:'Early prototype under review.'},
 {id:4,t:'Release Pipeline Automation',c:'Automation',s:'Completed',tech:['Docker','CI/CD'],team:['Ruwan Wickrama'],d:'Automated build and deployment for internal tools.',o:'Release time reduced in internal trials.'},
 {id:5,t:'Cloud Migration Toolkit',c:'Cloud Computing',s:'Completed',tech:['AWS','Terraform'],team:['Ruwan Wickrama','Samuel Perera'],d:'Reusable templates for moving services to the cloud.',o:'Templates adopted by two teams.'},
 {id:6,t:'Clinician Mobile App',c:'Mobile Applications',s:'Pending approval',tech:['Flutter','REST'],team:['Tharushi Abeysekera'],d:'Mobile prototype for quick access to schedules.',o:'Awaiting manager review.'},
 {id:7,t:'Staff Intranet Website',c:'Web Development',s:'Completed',tech:['HTML','CSS','JavaScript'],team:['Nadeesha Silva'],d:'Responsive internal web pages with a shared design system.',o:'Used as the base for this prototype.'}];
const learn=[
 {t:'Intro to HL7 FHIR',k:'Tutorial',p:70},{t:'Secure coding essentials',k:'Course',p:35},
 {t:'Agile delivery in practice',k:'Course',p:100},{t:'Writing clear technical docs',k:'Article',p:0},
 {t:'React component patterns',k:'Tutorial',p:50},{t:'Data privacy at work',k:'Course',p:10}];
const regs=new Set();
const nav=[['dashboard','Dashboard'],['news','Company News'],['events','Events & Activities'],['community','Employee Community'],['recognition','Recognition & Achievements'],['projects','Project Showcase'],['learning','Learning & Development'],['profile','My Profile']];
let user={role:'Employee',name:'Samuel Perera'};
const can={admin:()=>/Admin/.test(user.role),mgr:()=>/Manager|Admin/.test(user.role),contrib:()=>/Contributor|Manager|Admin/.test(user.role)};
const fmt=d=>new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
const dateBox=d=>{const x=new Date(d);return `<div class="date"><b>${x.getDate()}</b>${x.toLocaleString('en-GB',{month:'short'})}</div>`};
const head=(t,p,btn='')=>`<div class="pagehead"><div><h1>${t}</h1><p>${p}</p></div>${btn}</div>`;
const newsCard=n=>`<article class="card ${n.pin?'pin':''}">${pic(NEWSIMG[n.id],'thumb')}<span class="tag">${n.c}</span>${n.pin?'<span class="tag gray">Pinned</span>':''}<h3>${esc(n.t)}</h3><p>${esc(n.x)}</p><span class="meta">${fmt(n.d)}</span></article>`;
const projCard=p=>`<article class="card">${pic(PROJIMG[p.c],'thumb')}<div><span class="tag">${p.c}</span><span class="tag gray">${p.s}</span></div><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p><div>${p.tech.map(t=>`<span class="tag gray">${t}</span>`).join('')}</div><button class="btn ghost sm" data-proj="${p.id}">View details</button></article>`;

/* ---------- Views ---------- */
const views={
dashboard(){
 const h=new Date().getHours(),g=h<12?'Good morning':h<18?'Good afternoon':'Good evening';
 return `<div class="hero">${pic(IMG.hero,'herobg')}<h1>${g}, ${user.name.split(' ')[0]}! Welcome to Cambio Connect.</h1><p>Catch up on company news, see what is coming up and explore what your colleagues have built.</p><a class="btn" href="#projects" style="text-decoration:none;display:inline-block">Explore projects</a></div>
 <div class="stats"><div class="stat">${ico('mega')}<div><b>${news.length}</b>Announcements</div></div><div class="stat">${ico('events')}<div><b>${events.length}</b>Upcoming events</div></div><div class="stat">${ico('projects')}<div><b>${projects.filter(p=>p.s==='Completed').length}</b>Showcased projects</div></div><div class="stat">${ico('community')}<div><b>${people.length}</b>Colleagues listed</div></div></div>
 <div class="cols"><div><h2>Latest announcements</h2>${news.slice(0,3).map(newsCard).join('')}<h2>Recently added projects</h2><div class="grid">${projects.slice(0,2).map(projCard).join('')}</div></div>
 <div><div class="card"><h2 class="hi">${ico('events')}Upcoming events</h2>${events.slice(0,3).map(e=>`<div class="row">${dateBox(e.d)}${pic(EVIMG[e.id],'evthumb')}<div><b>${e.t}</b><div class="meta">${e.loc}</div></div></div>`).join('')}</div>
 <div class="card"><h2 class="hi">${ico('recognition')}Achievements</h2>${recog.slice(0,2).map(r=>`<p><b>${r.n}</b><br><span class="meta">${r.m}</span></p>`).join('')}</div>
 <form class="card" id="fb"><h2 class="hi">${ico('chat')}Share feedback</h2><label>Your idea or comment<textarea rows="3" required></textarea></label><button class="btn sm">Send feedback</button></form></div></div>`},
news(){
 return head('Company News','Announcements and company updates',can.admin()?'<button class="btn" id="addNews">Publish announcement</button>':'')+
 `<div class="filters"><input id="nq" type="search" placeholder="Search announcements"><select id="nc"><option value="">All categories</option>${[...new Set(news.map(n=>n.c))].map(c=>`<option>${c}</option>`).join('')}</select></div><div id="nlist"></div>`},
events(){
 return head('Events & Activities','Register for workshops, activities and celebrations')+`<div class="card">${events.map(e=>`<div class="row">${dateBox(e.d)}${pic(EVIMG[e.id],'evthumb')}<div style="flex:1"><b>${e.t}</b><div class="meta">${e.type} • ${e.loc}</div></div><button class="btn sm ${regs.has(e.id)?'ghost':''}" data-reg="${e.id}">${regs.has(e.id)?'Registered':'Register'}</button></div>`).join('')}</div>`},
community(){
 return head('Employee Community','Find colleagues by name, role, department or skill')+`<div class="filters"><input id="pq" type="search" placeholder="Search employees"></div><div class="grid" id="plist"></div>`},
recognition(){
 return head('Recognition & Achievements','Celebrate the people and teams behind our work')+`<div class="cols"><div>${recog.map(r=>`<article class="card pin"><span class="tag">${r.k}</span><h3>${r.n}</h3><p>${r.m}</p></article>`).join('')}</div>
 <form class="card" id="nom"><h2>Nominate a colleague</h2><label>Colleague<select>${people.map(p=>`<option>${p[0]}</option>`).join('')}</select></label><label>Why do they deserve recognition?<textarea rows="4" required></textarea></label><button class="btn">Submit nomination</button><p class="meta">Nominations are reviewed before they appear.</p></form></div>`},
projects(){
 return head('Project Showcase','Explore approved company projects (fictional samples)',can.contrib()?'<button class="btn" id="addProj">Submit a project</button>':'')+
 `<div class="filters"><input id="jq" type="search" placeholder="Search projects or technologies"><select id="jc"><option value="">All categories</option>${['Artificial Intelligence','Software Engineering','Digital Healthcare','Web Development','Mobile Applications','Cloud Computing','Automation'].map(c=>`<option>${c}</option>`).join('')}</select></div><div class="grid" id="jlist"></div>`},
project(id){
 const p=projects.find(x=>x.id==id);if(!p)return views.projects();
 return `<button class="back" onclick="location.hash='projects'">← Back to projects</button>${pic(PROJIMG[p.c],'banner')}<h1>${esc(p.t)}</h1><div class="card"><table>
 <tr><th>Category</th><td>${p.c}</td></tr><tr><th>Description</th><td>${esc(p.d)}</td></tr><tr><th>Technologies</th><td>${p.tech.join(', ')}</td></tr><tr><th>Contributors</th><td>${p.team.join(', ')}</td></tr><tr><th>Status</th><td>${p.s}</td></tr><tr><th>Outcomes</th><td>${esc(p.o)}</td></tr></table>
 ${p.s==='Pending approval'&&can.mgr()?`<p><button class="btn" data-ok="${p.id}">Approve project</button> <button class="btn ghost" data-no="${p.id}">Reject</button></p>`:''}</div>`},
learning(){
 return head('Learning & Development','Resources, tutorials and your progress')+`<div class="grid">${learn.map(l=>`<article class="card"><span class="tag">${l.k}</span><h3>${l.t}</h3><div class="bar"><i style="width:${l.p}%"></i></div><span class="meta">${l.p===100?'Completed':l.p?l.p+'% complete':'Not started'}</span></article>`).join('')}</div>`},
profile(){
 return head('My Profile','Your details and activity')+`<div class="cols"><div class="card"><div class="row"><span class="avatar" style="width:64px;height:64px;font-size:1.4rem">${ini(user.name)}</span><div><h2>${user.name}</h2><span class="badge">${user.role}</span></div></div>
 <table><tr><th>Email</th><td>${esc($('#email').value)}</td></tr><tr><th>Department</th><td>Engineering</td></tr><tr><th>Job role</th><td>Software Engineer</td></tr><tr><th>Skills</th><td>React, Java, SQL</td></tr><tr><th>Projects</th><td>${projects.filter(p=>p.team.includes('Samuel Perera')).map(p=>p.t).join(', ')}</td></tr><tr><th>Events registered</th><td>${regs.size}</td></tr></table></div>
 <div class="card"><h2>Account settings</h2><label>Display name<input value="${user.name}" readonly></label><label>Notifications<select><option>Email and in-app</option><option>In-app only</option></select></label><button class="btn sm" id="save">Save settings</button></div></div>`}
};

/* ---------- Router ---------- */
function render(){
 if(!$('#app')||$('#app').hidden)return;
 const [page,arg]=(location.hash.slice(1)||'dashboard').split('/');
 const key=page==='project'?'projects':page;
 $('#nav').innerHTML=nav.map(([k,l])=>`<a href="#${k}" class="${k===key?'on':''}">${ico(k)}<span>${l}</span></a>`).join('');
 $('#view').innerHTML=(views[page]||views.dashboard)(arg);
 $('#side').classList.remove('open');window.scrollTo(0,0);
 bind(page);
}
function bind(page){
 const v=$('#view');
 v.querySelectorAll('[data-proj]').forEach(b=>b.onclick=()=>location.hash='project/'+b.dataset.proj);
 v.querySelectorAll('[data-reg]').forEach(b=>b.onclick=()=>{const i=+b.dataset.reg;regs.has(i)?regs.delete(i):regs.add(i);toast(regs.has(i)?'Registration confirmed.':'Registration cancelled.');render()});
 v.querySelectorAll('[data-ok]').forEach(b=>b.onclick=()=>{projects.find(p=>p.id==b.dataset.ok).s='Completed';toast('Project approved and published.');render()});
 v.querySelectorAll('[data-no]').forEach(b=>b.onclick=()=>{projects.find(p=>p.id==b.dataset.no).s='Rejected';toast('Project rejected.');render()});
 const f=$('#fb');if(f)f.onsubmit=e=>{e.preventDefault();f.reset();toast('Feedback sent. Thank you.')};
 const nm=$('#nom');if(nm)nm.onsubmit=e=>{e.preventDefault();nm.reset();toast('Nomination submitted for review.')};
 const sv=$('#save');if(sv)sv.onclick=()=>toast('Settings saved.');
 if(page==='news'){
  const draw=()=>{const q=$('#nq').value.toLowerCase(),c=$('#nc').value;
   const r=news.filter(n=>(!c||n.c===c)&&(n.t+n.x).toLowerCase().includes(q)).sort((a,b)=>(b.pin||0)-(a.pin||0)||b.d.localeCompare(a.d));
   $('#nlist').innerHTML=r.map(newsCard).join('')||'<p class="meta">No announcements match your search.</p>'};
  $('#nq').oninput=$('#nc').onchange=draw;draw();
  const a=$('#addNews');if(a)a.onclick=()=>{const t=prompt('Announcement title');if(!t)return;const x=prompt('Announcement text')||'';
   news.unshift({id:Date.now(),t,x,c:'Company Updates',d:new Date().toISOString().slice(0,10)});toast('Published.');render()};
 }
 if(page==='community'){
  const draw=()=>{const q=$('#pq').value.toLowerCase();
   $('#plist').innerHTML=people.filter(p=>p.join(' ').toLowerCase().includes(q)).map(p=>`<article class="card person"><span class="avatar">${IMG.p[people.indexOf(p)]?`<img class="avimg" src="${IMG.p[people.indexOf(p)]}" alt="" onerror="this.remove()">`:''}${ini(p[0])}</span><h3>${p[0]}</h3><span>${p[1]}</span><span class="meta">${p[2]}</span><span class="meta">${p[3]}</span></article>`).join('')||'<p class="meta">No employees found.</p>'};
  $('#pq').oninput=draw;draw();
 }
 if(page==='projects'){
  const draw=()=>{const q=$('#jq').value.toLowerCase(),c=$('#jc').value;
   $('#jlist').innerHTML=projects.filter(p=>(p.s==='Completed'||p.s==='In progress'||can.mgr())&&(!c||p.c===c)&&(p.t+p.d+p.tech.join(' ')).toLowerCase().includes(q)).map(projCard).join('')||'<p class="meta">No projects match. Try another filter.</p>'};
  $('#jq').oninput=$('#jc').onchange=draw;draw();
  const a=$('#addProj');if(a)a.onclick=()=>{const t=prompt('Project name');if(!t)return;
   projects.push({id:projects.length+1,t,c:'Software Engineering',s:'Pending approval',tech:['TBC'],team:[user.name],d:'Submitted for review.',o:'Awaiting manager review.'});toast('Submitted. A manager must approve it before it is shown.');render()};
 }
}

/* ---------- Login / shell ---------- */
$('#loginForm').onsubmit=e=>{
 e.preventDefault();user.role=$('#role').value;
 $('#whoRole').textContent=user.role;$('#whoAv').textContent=ini(user.name);
 $('#login').hidden=true;$('#app').hidden=false;render();
};
$('#logout').onclick=()=>{$('#app').hidden=true;$('#login').hidden=false;location.hash=''};
$('#menu').onclick=()=>$('#side').classList.toggle('open');
$('#gsearch').onkeydown=e=>{if(e.key==='Enter'&&e.target.value.trim()){location.hash='projects';render();$('#jq').value=e.target.value;$('#jq').dispatchEvent(new Event('input'))}};
window.addEventListener('hashchange',render);
