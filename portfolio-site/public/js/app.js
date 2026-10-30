/* ---- PARKWAY THUMBNAIL IMAGES (embedded) ---- */
const IMG={"hero": "assets/cb495150a655.jpg", "s2": "assets/faa46d7dba50.jpg", "s3": "assets/c1113a2094a9.jpg", "gpk": "assets/4f3c948535b5.jpg", "ggv": "assets/d70910f60e2a.jpg", "gbk": "assets/f980e36421f9.jpg"};
const scn=(c,src)=>`<div class="scn ${c}"><div class="bar"><i></i><i></i><i></i></div><div class="vp"><img src="${src}" alt=""></div></div>`;
function thumb(link){return `<div class="thumb"><div class="tilt">${scn('s1',IMG.hero)}${scn('s2',IMG.s2)}${scn('s3',IMG.s3)}</div>${link?`<span class="live-pop" role="link" data-href="${link}">View live site ↗</span>`:''}</div>`}
const artGal=()=>`<div class="gal"><figure class="span"><img src="${IMG.gpk}" alt="Parkway Orlando landing page"><figcaption>Parkway Orlando</figcaption></figure><figure><img src="${IMG.ggv}" alt="The Grandview Las Vegas landing page"><figcaption>The Grandview Las Vegas</figcaption></figure><figure><img src="${IMG.gbk}" alt="The Berkley Orlando landing page"><figcaption>The Berkley Orlando</figcaption></figure></div>`;
Object.assign(IMG,{"c1": ["assets/69e2683e94db.jpg", "assets/dd60edd30b07.jpg", "assets/a1956a869930.jpg", "assets/2af5296af21c.jpg"], "c2": ["assets/998a9755e3e6.jpg", "assets/6fd1c86fd3a3.jpg", "assets/c1513708b07f.jpg", "assets/eb4027c75edf.jpg"], "sl_board": "assets/6e09999ac9b6.jpg"});
function thumbSL(){const sl=src=>`<div class="sc"><img src="${src}" alt=""></div>`;return `<div class="thumb sl"><div class="tilt"><div class="rw r1">${IMG.c2.map(sl).join('')}</div><div class="rw r2">${IMG.c1.map(sl).join('')}</div></div></div>`}
const slRow=a=>`<div class="srow">${a.map(src=>`<img src="${src}" alt="">`).join('')}</div>`;
const slGal=()=>`<div class="gal"><figure class="span">${slRow(IMG.c1)}<figcaption>Concept 1: a seamless flow of pets that continues and blends across each panel of the carousel.</figcaption></figure><figure class="span">${slRow(IMG.c2)}<figcaption>Concept 2: simple shapes and dogs combine into a visual narrative that feels playful and intentional.</figcaption></figure><figure class="span"><img src="${IMG.sl_board}" alt="Fonts, colors and animation notes"><figcaption>Type, color and a subtle animation prototyped in Cavalry.</figcaption></figure></div><p class="note">No pets were harmed in the making of this design… though a few demanded treats and creative approval.</p>`;
Object.assign(IMG,{"cv":{"tall300": "assets/117c962d091c.jpg", "tall160": "assets/45058c8a8f49.jpg", "s250": "assets/c4dabdaec7bb.jpg", "es728": "assets/b3dff1020d32.jpg", "en728": "assets/5b3ec4c72fbe.jpg", "es320": "assets/39699e866b64.jpg", "en320": "assets/a03bd62e4085.jpg", "boardES": "assets/08424c50dffa.jpg", "boardEN": "assets/41e087f2885d.jpg"}});
function thumbCV(){const c=(k,x,y,w,h,pos)=>`<div class="bn" style="left:${x}cqw;top:${y}cqw;width:${w}cqw;height:${h}cqw"><img src="${IMG.cv[k]}" alt=""${pos?` style="object-position:${pos}"`:''}></div>`;return `<div class="thumb cv"><div class="tilt">${[c('tall300',10,2,24,48),c('es320',10,51.2,24,3.77),c('en320',10,56.2,24,3.77),c('tall160',35.2,2,12.9,48.1),c('s250',35.2,51.2,12.9,10.8),c('es728',49.3,2,40.7,5.05),c('en728',49.3,8.25,40.7,5.05),c('s250',49.3,14.5,26,21.7),c('tall160',76.5,14.5,13.5,47.5),c('tall300',49.3,37.4,26,24.6,'50% 0%')].join('')}</div></div>`}
const cvGal=()=>`<div class="gal"><figure class="span"><img src="${IMG.cv.boardES}" alt="Spanish banner set"><figcaption>Spanish set: five standard sizes, from the 160×600 skyscraper to the 320×50 mobile strip.</figcaption></figure><figure class="span"><img src="${IMG.cv.boardEN}" alt="English banner set"><figcaption>English set: the same system and layouts with a new headline and call to action.</figcaption></figure></div>`;
const ARTS={pk:{thumb:thumb,gal:artGal},sl:{thumb:thumbSL,gal:slGal},cv:{thumb:thumbCV,gal:cvGal}};
/* ---- EDIT PROJECT DATA HERE: t=title, c=category, y=year, cl=client, sv=services, r=role ---- */
const works=[
{t:"Parkway Orlando",c:"Landing pages",y:"2026–2027",cl:"Vacatia",sv:"Landing Page, Interactive, Design",r:"Designer-Developer",art:"pk",link:"https://rough-resonance-a6fa.rayflect5.workers.dev/",copy:{
 intro:"Parkway Orlando is a landing page built to help owners move their ownership to a nearby sister resort. The goal: turn a maintenance-fee headline into an easy, inviting decision.",
 purpose:"Owners at nearby resorts were facing rising maintenance fees. Each page had to explain the offer quickly, show off the resort, surface the numbers that matter (fees, RCI points, amenities) and guide visitors from curiosity to a transfer payment.",
 approach:"I designed and built a modular page system: a soft sky-blue hero with a collage of resort photography, quick-scan highlights, an amenities carousel, a video gallery, an RCI points table and an inline payment step. The same system flexed across Parkway Orlando, The Grandview Las Vegas and The Berkley Orlando, each with its own photography, copy and brand moments.",
 result:"[Add the outcome here: conversions, launch dates, or feedback from the team.]"}},
{t:"Synergy Labs",c:"Social media carousels",y:"2026",cl:"Synergy Labs",sv:"Social Media Carousels, Figma, Animation",r:"Figma Designer, Layout",art:"sl",copy:{
 intro:"Synergy Labs is a Fort Lauderdale pet-care company behind Veterinary Formula and its Smart Vitality line of vet-formulated soft chew supplements for dogs. For this project I designed Instagram carousels that make gut health, calm and anal gland support feel friendly, clear and worth a swipe.",
 purpose:"Supplements are easy to scroll past and hard to explain in a thumb-swipe. The carousels needed to introduce the Smart Vitality line, spotlight what each formula does (Anal Gland Support, Gut Health, Pet Calm) and carry the brand’s trust signals (soft chews, pork flavor, made in the USA) inside a 1080×1440 feed format that keeps people swiping.",
 approach:"I explored two directions in Figma. Concept 1 tells one story: a seamless flow of dogs that continues and blends across every panel, so the carousel reads as a single illustration as you swipe. Concept 2 goes graphic: simple shapes, bold color blocks and hand-drawn dogs build a playful narrative. Both share a navy, white, blue and yellow palette, with Manrope for headings and URW DIN for bold headlines, plus a subtle animation prototyped in Cavalry.",
 result:"The carousels gave Smart Vitality a flexible, swipeable system. Each slide leads with a clear headline, shows one benefit and closes on a trust signal, so the message lands even if someone only sees the first frame. Concept 1 rewards the swipe with pets that flow from panel to panel, while Concept 2’s bold shapes and color blocks stand out in a crowded feed. Built as reusable layouts in Figma, the structure lets new formulas and future posts drop in and stay on brand."}},
{t:"Conviva Care Center",c:"Paid media banners",y:"2025",cl:"Conviva Care Center",sv:"Paid Media Banners, Figma, Photoshop, HTML5 Animation, GSAP",r:"Figma Designer, HTML Animator",art:"cv",copy:{
 intro:"Conviva Care Centers is a physician-led network of senior-focused primary care centers across Florida and Texas, part of Humana’s primary care organization. For this project I designed and animated paid media banners that invite older adults to learn more about care that is centered on them.",
 purpose:"Medicare’s Annual Enrollment Period is a short, crowded window when seniors compare plans and choose doctors. The banners had to cut through that noise with one clear promise, primary care centered on you, show real people in a real exam room, and earn the click on “Learn more.” The campaign was built in English and Spanish across five standard ad sizes, so every placement and audience got the same warm, trustworthy message.",
 approach:"I designed one flexible system in Figma: a deep teal headline with a single coral highlighted word (“you” and “usted”), a soft peach call-to-action, and an arched photo crop that echoes the wave in the Conviva logo. I retouched and cut out the photography in Photoshop, then adapted the layout to every size, from the 728×90 leaderboard and 300×250 box to the 300×600 half page, 160×600 skyscraper and 320×50 mobile strip. In HTML5 I animated each banner with GSAP timelines, keeping the files light and the motion gentle so the message stays easy to read.",
 result:"The result was a complete bilingual banner set that stays recognizably Conviva at every size: the same headline hierarchy, the same warm photography and the same clear call to action, whether it appears as a tall skyscraper or a thin mobile strip. Built from reusable Figma layouts and GSAP templates, the set can take new headlines or languages without rebuilding each ad, which suits a network of 100+ centers across Florida and Texas."}},
{t:"Spending Unfolded",c:"In-App Explainer",y:"2025",cl:"Client Name",sv:"Explainer Animation, UI Motion",r:"Motion Designer"},
{t:"Day & Night",c:"Interactive Animation",y:"2025",cl:"Personal",sv:"Rive, Interaction Design, Illustration",r:"Designer & Animator"},
{t:"Jazz",c:"Character Animation / Rive",y:"2024",cl:"Client Name",sv:"Character Animation, Rive",r:"Animator"},
];
/* ---- EDIT GENERIC COPY HERE ({t}=title, {c}=category) ---- */
const COPY={
intro:"{t} is a {c} project where playful design meets thoughtful motion. This is placeholder copy: replace it with a short, punchy summary of what you made and why it matters.",
purpose:"Every project starts with a question: what does this piece need to communicate? Describe the client's goal, the audience, and the problem the animation was meant to solve.",
approach:"Describe your process here: references and moodboards, character design, storyboarding, rigging and animation. Mention the tools you used and the creative decisions that shaped the final result.",
result:"Share the outcome: where the piece lives, how people responded, and any numbers or feedback worth highlighting. Swap this text for the real story."
};
const slug=t=>t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const fill=(x,w)=>x.replace('{t}',w.t).replace('{c}',w.c.toLowerCase());
const $=id=>document.getElementById(id);
const HERO={l1:$('l1').textContent,l2:$('l2').textContent,greet:$('hg').textContent,name:$('hn').textContent,sub:$('hs').innerHTML,foot:$('ft').textContent,doTitle:$('dh').textContent};
const DO=[...document.querySelectorAll('#do>div')].map(d=>[d.querySelector('h3').textContent,d.querySelector('p').textContent]);
function renderHero(){$('l1').textContent=HERO.l1;$('l2').textContent=HERO.l2;$('hg').textContent=HERO.greet;$('hn').textContent=HERO.name;$('hs').innerHTML=HERO.sub;$('ft').textContent=HERO.foot;$('dh').textContent=HERO.doTitle}
function renderDo(){$('do').innerHTML=DO.map(x=>`<div><h3>${x[0]}</h3><p>${x[1]}</p></div>`).join('')}
const isVid=s=>/^data:video\/|\.(mp4|webm|mov|m4v|mkv|ogv)([?#]|$)/i.test(s||'');
const media=(s,alt='',ctrl)=>isVid(s)?`<video src="${s}" autoplay muted loop playsinline preload="metadata"${ctrl?' controls':''} aria-label="${alt}"></video>`:`<img src="${s}" alt="${alt}">`;
const tm=w=>w.img?`<div class="timg">${media(w.img)}${w.link?`<span class="live-pop" role="link" data-href="${w.link}">View live site ↗</span>`:''}</div>`:w.art?ARTS[w.art].thumb(w.link):'';
const galImgs=w=>`<div class="gal">${w.gal.map((s,i)=>`<figure${i%3==0?' class="span"':''}>${media(s)}</figure>`).join('')}</div>`;
function renderGrid(){$('grid').innerHTML=works.map(w=>`<a href="#/work/${slug(w.t)}" class="card${w.wide?' wide':''}">${tm(w)||`<div class="ph"><span>${/Rive|Interactive|Character/.test(w.c)?'Rive / image':'Image'} placeholder</span></div>`}<h3>${w.t}</h3><small>${w.c}</small></a>`).join('');}
renderGrid();

function render(i){
 const w=works[i],n=works[(i+1)%works.length],reel=w.wide;
 $('case').innerHTML=`<article class="cs">
 <a class="back" href="#work">← All work</a>
 <p class="tag">${w.c}</p><h1>${w.t}</h1>
 ${tm(w)?`<div class="hero-art">${tm(w)}</div>`:`<div class="ph hero-ph"><div>${reel?'<div class="play">▶</div>':''}<span>${reel?'Video / reel placeholder':'Rive / image placeholder'}</span></div></div>`}
 <div class="meta"><div><small>Year</small><b>${w.y}</b></div><div><small>Client</small><b>${w.cl}</b></div><div><small>Services</small><b>${w.sv}</b></div><div><small>Role</small><b>${w.r}</b></div></div>
 <div class="sec intro"><h4>Intro</h4><p>${fill((w.copy||COPY).intro,w)}</p></div>
 <div class="sec"><h4>Purpose</h4><p>${fill((w.copy||COPY).purpose,w)}</p></div>
 ${w.gal&&w.gal.length?galImgs(w):w.art?ARTS[w.art].gal():`<div class="gal"><div class="ph full"><span>Image / Rive placeholder</span></div><div class="ph"><span>Image placeholder</span></div><div class="ph"><span>Image placeholder</span></div></div>`}
 <div class="sec"><h4>Approach</h4><p>${fill((w.copy||COPY).approach,w)}</p></div>
 <div class="sec"><h4>Result</h4><p>${fill((w.copy||COPY).result,w)}</p></div>
 <a class="next" href="#/work/${slug(n.t)}"><small>Next project →</small><h2>${n.t}</h2></a>
 </article>`;
}
/* ---- EDIT DYNAMIC MOTION BOXES HERE ---- */
const PLAY=["Click to strike · Parallax on hover","Hover to make him talk","Hover to walk · Click to jump","Press to dive · Switch between day and night","Move your cursor around · Click for a surprise"];
Object.assign(IMG,{mo:{"anniv": "assets/971ee5042c17.webp", "zombie": "assets/1623a0d11f8b.webp", "pie": "assets/64f466c5aad0.webp", "fall": "assets/3367cc22cf0c.webp", "galaga": "assets/015c874ca528.webp", "july": "assets/a90ae8a4b2bc.webp"}});
const MOTION_ITEMS=[
{k:"Email animation · Vitacost × iHerb",t:"Happy Anniversary",d:"An animated anniversary email for Vitacost and iHerb. Floating balloons, falling confetti and bold type turned a simple 15% off offer into a celebration, and the campaign performed well for the brand.",img:IMG.mo.anniv},
{k:"Illustration · iPad",t:"Face Experiment",d:"An illustration drawn on my iPad. I loved layering in lots of small details, from the hand-inked texture in the background to the wrinkles and expressions, and experimenting with how far I could push the face.",img:IMG.mo.zombie},
{k:"Email animation · Vitacost × iHerb · After Effects",t:"Thankful for You",d:"A Thanksgiving email for Vitacost and iHerb, animated frame by frame in After Effects. A steaming pie with a tiny smile, surrounded by autumn leaves, set a warm tone, and the campaign drove strong sales.",img:IMG.mo.pie},
{k:"Email animation · Vitacost × iHerb",t:"Happy Fall Y’all",d:"A fall email promoting up to 50% off health and wellness essentials. Hand-drawn trees, leaves and berries around bouncy, hand-lettered type gave the sale a cozy seasonal feel, and it performed well for Vitacost and iHerb.",img:IMG.mo.fall},
{k:"Experimental animation · Vitacost × iHerb",t:"Start Saving",d:"An experiment inspired by Galaga and classic Atari arcade games. A little ship collects coins while a savings counter climbs and Vitacost badges stand in for lives, turning a coupon into a game. A one-of-a-kind idea for Vitacost and iHerb.",img:IMG.mo.galaga},
{k:"Email animation · Vitacost",t:"Happy 4th of July",d:"A Fourth of July email for Vitacost. The hand-lettered type draws itself on in red and blue, a sparkler fizzles on the last letter, and a “from Vitacost” sticker pops in. It was another strong performer for the brand.",img:IMG.mo.july}
];
const MOTION={title:"Motion",lead:"Email animations, illustration and experiments. Some drove real results for Vitacost and iHerb, others exist purely for fun.",items:MOTION_ITEMS};
function renderPlay(){$('play').innerHTML=`<section class="pl"><h1>${MOTION.title}</h1><p class="lead">${MOTION.lead}</p><div class="pgrid">${MOTION.items.map(m=>`<div class="pc${m.wide?' full':''}">${m.embed?`<div class="ph has"><iframe src="${m.embed}" loading="lazy" allowfullscreen allow="autoplay;fullscreen" style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe></div>`:m.img?`<div class="mimg">${media(m.img,(m.t||'').replace(/"/g,''),m.ctrl)}</div>`:`<div class="ph"><span>Rive / interaction placeholder</span></div>`}${m.k?`<p class="mk">${m.k}</p>`:''}${m.t?`<h3 class="mt">${m.t}</h3>`:''}<p class="cap">${m.d||m.c||''}</p></div>`).join('')}</div></section>`}
renderPlay();
function revealWork(){const w=$('work');if(w.hidden){w.hidden=false;w.classList.add('reveal')}}
function route(){
 $('cta').classList.remove('open');
 const m=location.hash.match(/^#\/work\/(.+)$/),isPlay=location.hash==='#/dynamic-motion',isAbout=location.hash==='#/about';
 const i=m?works.findIndex(w=>slug(w.t)===m[1]):-1;
 $('home').hidden=i>-1||isPlay||isAbout;$('case').hidden=i<0;$('play').hidden=!isPlay;$('about').hidden=!isAbout;
 if(i>-1){render(i);scrollTo(0,0)}
 else if(isPlay||isAbout)scrollTo(0,0);
 else{const id=location.hash.slice(1);if(id==='work')revealWork();const el=id&&id[0]!=='/'&&$(id);if(el)el.scrollIntoView();else scrollTo(0,0)}
 document.querySelectorAll('[data-nav]').forEach(a=>a.classList.toggle('on',(a.dataset.nav==='work'&&i>-1)||(a.dataset.nav==='play'&&isPlay)||(a.dataset.nav==='about'&&isAbout)));
 setCta(isAbout||isPlay);
}
const cta=$('cta'),cf=$('cf'),ok=cta.querySelector('.cform-ok');
function openForm(){setNav(false);if(!cta.classList.contains('open')){cf.hidden=false;ok.hidden=true;cf.reset();cta.classList.add('open')}
 cta.scrollIntoView({behavior:'smooth',block:'start'});setTimeout(()=>{if(!cf.hidden)cf.name.focus({preventScroll:true})},500)}
function closeForm(){cta.classList.remove('open')}
document.querySelectorAll('[data-open-form]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();
 if(cta.contains(a)&&cta.classList.contains('open'))closeForm();else openForm()}));
addEventListener('keydown',e=>{if(e.key==='Escape')closeForm()});
/* mockup only: no message is actually sent. Hook up your form service here. */
cf.addEventListener('submit',async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(cf));
  if(CONTACT.endpoint){try{const r=await fetch(CONTACT.endpoint,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(d)});if(!r.ok)throw 0}catch(_){cf.querySelector('button').textContent='Could not send. Please email '+(CONTACT.email||'me directly')+'.';return}}
  else if(CONTACT.email){location.href='mailto:'+CONTACT.email+'?subject='+encodeURIComponent('Message from '+d.name)+'&body='+encodeURIComponent(d.message+'\n\n'+d.name+' ('+d.email+')')}
  cf.hidden=true;ok.hidden=false});
addEventListener('hashchange',route);

/* ---- PASTE YOUR LINKS HERE ---- */
const LINKS={instagram:"",calendly:"",linkedin:"",contra:""};
function applyLinks(){document.querySelectorAll('[data-link]').forEach(a=>{const u=LINKS[a.dataset.link];
 if(u){a.href=u;a.target='_blank';a.rel='noopener';a.onclick=null}else{a.removeAttribute('target');a.href='#';a.onclick=e=>e.preventDefault()}})}
applyLinks();
/* ---- ABOUT PHOTO (embedded). Replace with your own data URI or image ---- */
let PHOTO="assets/2ba6a487f45f.jpg";
/* ---- EDIT ABOUT COPY HERE ---- */
const ABOUT={
intro:"I'm Luis, a motion designer and interactive animator who makes pixels move for a living. Basically, I give computers very specific instructions on how to have a personality.",
paras:["With 10+ years in digital design, I've spent my time bringing ideas to life through motion, interactive experiences, animated ads, and digital campaigns. My toolkit includes Adobe Creative Suite, Figma, Rive, and a healthy disregard for how many layers one project actually needs.","When I'm not moving pixels around, I'm probably chasing a new creative idea, experimenting with something I probably didn't need to learn, or opening another browser tab I'll definitely get back to later."]
};
/* ---- EDIT RESUME HERE ---- */
const RESUME={
role:"Digital Designer / Motion",
contact:[["phone","626 780 1244","tel:6267801244"],["mail","rayflect5@gmail.com","mailto:rayflect5@gmail.com"],["web","riius.portfoliobox.net","https://riius.portfoliobox.net"],["linkedin","linkedin.com/in/rayflectx","https://linkedin.com/in/rayflectx"]],
summary:"Experienced Digital Motion Designer with over 10 years in digital media design, specializing in Adobe Creative Suite (Illustrator, Photoshop, Animate, After Effects, and Figma ). Proven expertise in technical graphic design, schematic creation, and production file preparation. Strong knowledge of typography, color theory, and layout design.",
jobs:[
["Digital Marketing Designer at Vacatia","Fort Lauderdale, FL | June 2026 - Present",["Design digital and print marketing materials for the marketing team, including emails, social media assets, fact sheets, retractable banners, and magazines.","Design and test A/B email variations in Figma to improve engagement and performance.","Created a Figma design system to support consistent, efficient design across marketing materials.","Produce videos from long-form to short-form content, along with social media assets and animations for the web.","Worked on websites, landing pages, and digital assets across email, social media, digital advertising, web banners, e-commerce, and digital campaigns."]],
["Digital Motion Designer at Kroger","Boca Raton, FL | August 2019 - May 2026 | Full Time",["Used Adobe Creative Suite, Figma, and Rive to design on-brand, story-driven assets for emails, landing pages, videos, interactive experiences, and paid media, using minimalist layouts, clear hierarchy, and strong typography.","Retouched stock photography to produce weekly B2B and B2C landing pages and designed e-commerce web experiences optimized for conversion, usability, and responsive design. Managed Shopify content updates and publishing.","Built paid media mockups in Adobe Photoshop and transformed them into interactive assets using Google Web Designer, Adobe Animate, and Hype 4. Produced animated paid social assets for Vitacost and Kroger that supported revenue growth.","Supported award-winning Vitacost email campaigns (AMP, dynamic, and responsive), with primary responsibility for graphics and GIF animations. Developed assets for product launches, promotions, and integrated campaigns across web, email, social, paid, and retail-partner channels.","Created wireframes, user flows, and Figma prototypes, partnering with marketing, developers, project managers, and stakeholders from concept through launch. Integrated AI-assisted workflows, including generative AI and prompt engineering, to speed up concepting and production."]],
["Digital Media Designer at Cendyn","Boca Raton, FL | May 2015 - October 2020 | Full Time",["Design, animate, and code interactive paid search ads tailored for the hospitality industry, using Adobe Animate, Illustrator, Photoshop, and Google Web Designer to deliver engaging digital experiences.","Retouch and resize stock photography for paid search ad formats. Build lightweight animated ads using GSAP (GreenSock Animation Platform) timelines to ensure optimal performance.","Cleaned up paid media assets to meet CDN and Google specifications, ensuring all files were optimized, compressed, and properly formatted for smooth web delivery and display.","Used Google Ad Validator, Rich Media Previewer, and Display & Video 360 Ad Tester to test paid media assets, troubleshoot issues, and ensure error-free code."]]
],
skills:["Email Designer","Illustration","UX/UI","Motion Designer","Paid Media/Social","Landing Pages","Klaviyo","Shopify","Storyboard Enthusiast","Video Editor","Art Direction","AI-Assisted Design Workflows"],
apps:[["Design","Adobe Photoshop, Adobe Illustrator, Affinity"],["Animation","Moho, Adobe AE"],["Interactive","Figma, Rive"],["Coding","HTML5, CSS3, MJML"],["Video editing","Davinci Resolve, Adobe Premiere"],["AI / LLM","Claude, Gemini"]],
edu:["BA in Media Arts and Animation - Art Institute","Continued Education - Udemy - Domestika - Motiondesign.school"],
lang:"Spanish - Fluently | English - Fluently"
};
function renderAbout(){const R=RESUME,hd=t=>`<h3 class="rs-h">${t}</h3>`;
const resumeHTML=`<section class="rs"><div class="rs-top"><div><h2>Resume</h2><p class="role">${R.role}</p></div><div class="rs-contact">${R.contact.map(c=>`<div><span>${c[0]}</span><a href="${c[2]}" ${c[2].startsWith('http')?'target="_blank" rel="noopener"':''}>${c[1]}</a></div>`).join('')}</div></div>
${hd('Summary')}<p class="rs-sum">${R.summary}</p>
${hd('Experience')}<div>${R.jobs.map(j=>`<div class="job"><h3>${j[0]}</h3><p class="m">${j[1]}</p><ul>${j[2].map(b=>`<li>${b}</li>`).join('')}</ul></div>`).join('')}</div>
<div class="rs-cols"><div>${hd('Core skills')}<div class="chips">${R.skills.map(x=>`<span>${x}</span>`).join('')}</div></div><div>${hd('Apps')}<div class="apps">${R.apps.map(a=>`<div><b>${a[0].toUpperCase()}</b>${a[1]}</div>`).join('')}</div></div>
<div class="edu">${hd('Education')}${R.edu.map(e=>`<p>${e}</p>`).join('')}</div><div class="edu">${hd('Languages')}<p>${R.lang}</p></div></div></section>`;
$('about').innerHTML=`<section class="ab"><h1>About</h1><div class="ab-top"><div class="ab-ph ab-img"><img src="${PHOTO}" alt="Luis Lopez smiling in front of palm trees"></div><div class="ab-copy"><p class="big">${ABOUT.intro}</p>${ABOUT.paras.map(t=>`<p>${t}</p>`).join('')}</div></div></section>`+'<hr class="sep">'+resumeHTML;
}
renderAbout();
/* Say hi / Reach out heading with wavy hover */
const SUB="<span>I’ll reveal why moving one pixel to the left is a<br class=\"d\"> perfectly reasonable use of 20 minutes. 🎨</span>";
const CONTACT={main:"Say hi.",about:"Reach out.",sub:SUB,book:"https://calendly.com/",email:"",endpoint:""};
function setCta(about){const c=[about?CONTACT.about:CONTACT.main,CONTACT.sub],h=document.querySelector('.cta h2');h.classList.add('wavy');
 h.innerHTML=[...c[0]].map((ch,i)=>`<span style="--i:${i}">${ch===' '?'&nbsp;':ch}</span>`).join('');h.nextElementSibling.innerHTML=c[1]}
const root=document.documentElement,inputs=[...document.querySelectorAll('input[type=color]')];
const def={};
function hex(v){const c=document.createElement('canvas').getContext('2d');c.fillStyle=v.trim();return c.fillStyle}
inputs.forEach(i=>{const k=i.dataset.v;def[k]=hex(getComputedStyle(root).getPropertyValue(k));i.value=def[k];
  i.addEventListener('input',()=>{root.style.setProperty(k,i.value);save()})});
function save(){try{const o={};inputs.forEach(i=>o[i.dataset.v]=i.value);localStorage.setItem('luis-theme-v4',JSON.stringify(o))}catch(e){}}
try{const s=JSON.parse(localStorage.getItem('luis-theme-v4')||'null');if(s)inputs.forEach(i=>{if(s[i.dataset.v]){i.value=s[i.dataset.v];root.style.setProperty(i.dataset.v,i.value)}})}catch(e){}
document.getElementById('reset').onclick=()=>{inputs.forEach(i=>{i.value=def[i.dataset.v];root.style.removeProperty(i.dataset.v)});try{localStorage.removeItem('luis-theme-v4')}catch(e){}};
const nav=document.querySelector('nav'),bg=document.getElementById('burger');
function setNav(o){nav.classList.toggle('open',o);bg.setAttribute('aria-expanded',o)}
bg.onclick=()=>setNav(!nav.classList.contains('open'));
document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>setNav(false)));
document.getElementById('tog').onclick=()=>document.getElementById('tp').classList.toggle('open');
document.addEventListener('click',e=>{const a=e.target.closest('a[href="#work"]');if(!a)return;e.preventDefault();if(location.hash!=='#work')location.hash='#work';else route()});
document.addEventListener('click',e=>{const b=e.target.closest('.live-pop');if(!b)return;e.preventDefault();e.stopPropagation();window.open(b.dataset.href,'_blank','noopener')},true);
route();
