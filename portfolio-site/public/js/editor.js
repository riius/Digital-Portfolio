(()=>{
const KEY='luis-site-v1',PHOTO0=PHOTO,UI={hide:false};
const h=(t,a={},...c)=>{const e=document.createElement(t);for(const k in a){const v=a[k];if(k==='cls')e.className=v;else if(k==='on')for(const ev in v)e.addEventListener(ev,v[ev]);else if(k in e)e[k]=v;else e.setAttribute(k,v)}c.flat(9).forEach(x=>e.append(x&&x.nodeType?x:document.createTextNode(x==null?'':x)));return e};
const snapshot=()=>({v:1,work:works,motion:MOTION,hero:HERO,doItems:DO,about:{intro:ABOUT.intro,paras:ABOUT.paras,photo:PHOTO===PHOTO0?'':PHOTO},resume:RESUME,contact:CONTACT,links:LINKS,ui:UI,theme:Object.fromEntries(inputs.filter(i=>i.value!==def[i.dataset.v]).map(i=>[i.dataset.v,i.value]))});
function applyData(d){
 if(d.work)works.splice(0,works.length,...d.work);
 if(d.motion)Object.assign(MOTION,d.motion);
 if(d.hero)Object.assign(HERO,d.hero);
 if(d.doItems)DO.splice(0,DO.length,...d.doItems);
 if(d.about){if(d.about.intro!=null)ABOUT.intro=d.about.intro;if(d.about.paras)ABOUT.paras=d.about.paras;PHOTO=d.about.photo||PHOTO0}
 if(d.resume)Object.assign(RESUME,d.resume);
 if(d.contact)Object.assign(CONTACT,d.contact);
 if(d.links)Object.assign(LINKS,d.links);
 if(d.ui)Object.assign(UI,d.ui);
 if(d.theme)inputs.forEach(i=>{const v=d.theme[i.dataset.v];if(v){i.value=v;root.style.setProperty(i.dataset.v,v)}})}
function refresh(){renderHero();renderDo();renderGrid();renderPlay();renderAbout();applyLinks();$('bk').href=CONTACT.book||'#';
 const hs=location.hash;setCta(hs==='#/about'||hs==='#/dynamic-motion');
 if(!$('case').hidden){const m=hs.match(/^#\/work\/(.+)$/),i=m?works.findIndex(w=>slug(w.t)===m[1]):-1;if(i>-1)render(i)}}
const st=h('span',{cls:'est'});let timer;
function diff(){const cur=snapshot(),out={v:1};for(const k in cur){if(k!=='v'&&JSON.stringify(cur[k])!==JSON.stringify(DEFS[k]))out[k]=cur[k]}return out}
function save(){try{localStorage.setItem(KEY,JSON.stringify(diff()));st.textContent='Saved ✓'}catch(e){st.textContent='Storage full: use Data → Download'}}
function commit(){clearTimeout(timer);st.textContent='…';timer=setTimeout(()=>{refresh();save()},180)}
const btn=(t,f,c='')=>h('button',{type:'button',cls:'eb '+c,on:{click:e=>{e.preventDefault();e.stopPropagation();f(e)}}},t);
function F(label,get,set,o={}){const i=h(o.area?'textarea':'input',{rows:o.rows||3,placeholder:o.ph||''});const v=get();i.value=v==null?'':v;i.addEventListener('input',()=>{set(i.value);commit()});return h('label',{cls:'ef'},label,i)}
function shrink(f,max=1400){return new Promise(r=>{if(/gif|svg|webp/.test(f.type)&&f.size<3e6){const fr=new FileReader();fr.onload=()=>r(fr.result);fr.readAsDataURL(f);return}
 const im=new Image,u=URL.createObjectURL(f);im.onload=()=>{const k=Math.min(1,max/Math.max(im.width,im.height)),c=h('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);URL.revokeObjectURL(u);r(c.toDataURL('image/jpeg',.82))};im.src=u})}
const VMIME={mp4:'video/mp4',m4v:'video/x-m4v',webm:'video/webm',mov:'video/quicktime',mkv:'video/x-matroska',ogv:'video/ogg'};
const vext=f=>((f.name||'').split('.').pop()||'').toLowerCase();
const isVideoFile=f=>/^video\//.test(f.type)||!!VMIME[vext(f)];
const mb=n=>(n/1048576).toFixed(1)+' MB';
const VACCEPT='image/*,video/mp4,video/webm,video/quicktime,video/x-matroska,.mp4,.m4v,.webm,.mov,.mkv,.ogv';
async function putMedia(f){let tok='';try{tok=localStorage.getItem('luis-admin')||''}catch(e){}if(!tok)throw new Error('enter your admin token under Data → Publish first');
 const name=Date.now().toString(36)+'-'+f.name.replace(/[^\w.\-]+/g,'_'),mime=VMIME[vext(f)]||f.type||'application/octet-stream';
 const r=await fetch('/api/upload?name='+encodeURIComponent(name),{method:'PUT',headers:{Authorization:'Bearer '+tok,'Content-Type':mime},body:f});
 if(r.status===401)throw new Error('wrong admin token');if(!r.ok){let m='server said '+r.status;try{m=(await r.json()).error||m}catch(e){}throw new Error(m)}return (await r.json()).url}
async function ingestVideo(f,msg){msg('Checking video…');const u=URL.createObjectURL(f);
 const ok=await new Promise(res=>{const v=document.createElement('video');v.preload='metadata';v.muted=true;v.onloadedmetadata=()=>res(true);v.onerror=()=>res(false);setTimeout(()=>res(false),5000);v.src=u});URL.revokeObjectURL(u);
 const warn=ok?'':' Note: this browser could not read the file. MKV and some MOV files use codecs browsers cannot play. Convert to MP4 (H.264) for the best compatibility.';
 let tok='';try{tok=localStorage.getItem('luis-admin')||''}catch(e){}
 if(SITE&&tok){msg('Uploading '+mb(f.size)+'…');try{const url=await putMedia(f);msg('Uploaded ✓'+warn);return url}catch(e){msg('Upload failed: '+e.message);return null}}
 if(f.size>2.5e6){msg('That video is '+mb(f.size)+'. Without cloud storage the limit is about 2.5 MB. On your Cloudflare site, enter your admin token under Data → Publish, then upload again. Or paste a link to a hosted video.');return null}
 const du=await new Promise(res=>{const fr=new FileReader();fr.onload=()=>res(fr.result);fr.readAsDataURL(f)});msg('Added.'+warn);
 return du.replace(/^data:[^;,]*/,'data:'+(VMIME[vext(f)]||f.type||'video/mp4'))}
const takeFile=(f,msg)=>isVideoFile(f)?ingestVideo(f,msg):shrink(f);
function pick(cb,multi,video){const i=h('input',{type:'file',accept:video?VACCEPT:'image/*',multiple:!!multi});i.onchange=async()=>{for(const f of i.files)await cb(f)};i.click()}
function Img(label,get,set,hint,video){const w=h('div',{cls:'eimg'}),note=h('small',{cls:'est',style:'width:100%'}),msg=t=>{note.textContent=t};
 const draw=()=>{const g=get();w.replaceChildren(h('small',{cls:'est',style:'width:100%'},label+(hint?' ('+hint+')':'')),g?(isVid(g)?h('video',{src:g,muted:true,preload:'metadata',style:'width:96px;height:56px;object-fit:cover;border-radius:8px'}):h('img',{src:g})):'',
  btn(g?'Replace':'Upload',()=>pick(async f=>{const v=await takeFile(f,msg);if(v){set(v);draw();commit()}},false,video),'sm'),g?btn('Remove',()=>{set('');draw();commit()},'sm'):'',note)};draw();return w}
function Gal(w){const b=h('div',{cls:'eimg'}),note=h('small',{cls:'est',style:'width:100%'}),msg=t=>{note.textContent=t};const draw=()=>{b.replaceChildren(h('small',{cls:'est',style:'width:100%'},'Gallery images and videos (replace the built-in gallery on the case study)'),...(w.gal||[]).map((s,i)=>h('span',{},isVid(s)?h('video',{src:s,muted:true,preload:'metadata',style:'width:64px;height:48px;object-fit:cover;border-radius:8px'}):h('img',{src:s}),btn('✕',()=>{w.gal.splice(i,1);draw();commit()},'sm'))),btn('Add images or videos',()=>pick(async f=>{const v=await takeFile(f,msg);if(v){(w.gal=w.gal||[]).push(v);draw();commit()}},true,true),'sm'),note)};draw();return b}
function delBtn(fn){const b=btn('✕',()=>{if(b.dataset.arm){fn()}else{b.dataset.arm='1';b.textContent='Delete?';b.classList.add('danger');setTimeout(()=>{b.dataset.arm='';b.textContent='✕';b.classList.remove('danger')},3000)}},'sm');return b}
function List(arr,label,body,mk){const box=h('div');const draw=()=>{box.replaceChildren(...arr.map((it,i)=>{const d=h('details',{cls:'ei'}),ctl=h('span',{cls:'ctl'},
 btn('↑',()=>{if(i){[arr[i-1],arr[i]]=[arr[i],arr[i-1]];draw();commit()}},'sm'),btn('↓',()=>{if(i<arr.length-1){[arr[i+1],arr[i]]=[arr[i],arr[i+1]];draw();commit()}},'sm'),delBtn(()=>{arr.splice(i,1);draw();commit()}));
 d.append(h('summary',{},h('span',{},label(it,i)),ctl),h('div',{},body(it,i)));return d}),btn('+ Add',()=>{arr.push(mk());draw();commit()},'add'))};draw();return box}
const subToText=x=>x.replace(/<br[^>]*>\s*/g,' | ').replace(/<\/span>\s*/g,'\n').replace(/<[^>]+>/g,'').trim();
const textToSub=t=>t.split('\n').map(l=>l.trim()).filter(Boolean).map(l=>'<span>'+l.replace(/\s*\|\s*/g,'<br class="d"> ')+'</span>').join('');
const lines=v=>v.split('\n').map(x=>x.trim()).filter(Boolean);
function dl(txt,name,type){const a=h('a',{href:URL.createObjectURL(new Blob([txt],{type})),download:name});document.body.append(a);a.click();a.remove()}
function bakedHTML(){const c=document.documentElement.cloneNode(true);['ed','edtog'].forEach(id=>c.querySelector('#'+id)&&c.querySelector('#'+id).remove());
 ['nav','#cta','#tp'].forEach(q=>{const e=c.querySelector(q);e&&e.classList.remove('open')});const w=c.querySelector('#work');if(w){w.hidden=true;w.classList.remove('reveal')}['grid','case','play','about'].forEach(id=>{const e=c.querySelector('#'+id);if(e)e.innerHTML=''});
 c.querySelector('#site-data').textContent=JSON.stringify(snapshot()).replace(/<\/script/gi,'<\\/script');return '<!DOCTYPE html>\n'+c.outerHTML}
const SITE=!!window.SITE_CONFIG;
function pubUI(){const tok=h('input',{type:'password',placeholder:'Admin token'});try{tok.value=localStorage.getItem('luis-admin')||''}catch(e){}
 const pst=h('p',{cls:'est'},''),go=btn('Publish changes',async()=>{pst.textContent='Publishing…';
  try{const r=await fetch('/api/site-data',{method:'PUT',headers:{'Content-Type':'application/json',Authorization:'Bearer '+tok.value.trim()},body:JSON.stringify(diff())});
   if(r.status===401)throw new Error('wrong token');if(!r.ok)throw new Error('server said '+r.status);
   try{localStorage.setItem('luis-admin',tok.value.trim());localStorage.removeItem(KEY)}catch(e){}
   pst.textContent='Published ✓ Visitors will see your changes.'}catch(e){pst.textContent='Could not publish: '+e.message}},'pri');
 return[h('h4',{},'Publish to your live site'),h('p',{cls:'est'},'Your edits are drafts in this browser until you publish. Enter the admin token you set in Cloudflare and press Publish, and every visitor sees them.'),h('label',{cls:'ef'},'Admin token',tok),go,pst,h('h4',{},'Backup')]}
const T={
Home:()=>[F('Greeting (purple word)',()=>HERO.greet,v=>HERO.greet=v),F('Name line',()=>HERO.name,v=>HERO.name=v),F('Intro under the headline (HTML ok, <b>bold</b>)',()=>HERO.sub,v=>HERO.sub=v,{area:1,rows:4}),F('Logo: first name',()=>HERO.l1,v=>HERO.l1=v),F('Logo: last name',()=>HERO.l2,v=>HERO.l2=v),F('Footer text',()=>HERO.foot,v=>HERO.foot=v),F('"What I do" heading',()=>HERO.doTitle,v=>HERO.doTitle=v),
 h('h4',{},'What I do'),List(DO,x=>x[0],x=>[F('Title',()=>x[0],v=>x[0]=v),F('Text',()=>x[1],v=>x[1]=v,{area:1,rows:6})],()=>['New service','Describe it here.'])],
Work:()=>[h('p',{cls:'est'},'Add, reorder or delete projects. Open one to edit its details, images and case study text.'),
 List(works,w=>w.t,w=>{const cp=()=>w.copy||(w.copy={...COPY});return[
 F('Title',()=>w.t,v=>{const was=!$('case').hidden&&location.hash==='#/work/'+slug(w.t);w.t=v;if(was)history.replaceState(null,'','#/work/'+slug(w.t))}),
 F('Category',()=>w.c,v=>w.c=v),F('Year',()=>w.y,v=>w.y=v),F('Client',()=>w.cl,v=>w.cl=v),F('Services',()=>w.sv,v=>w.sv=v),F('Role',()=>w.r,v=>w.r=v),
 F('Live site link (adds a button on hover)',()=>w.link||'',v=>w.link=v,{ph:'https://…'}),
 Img('Thumbnail (image or video)',()=>w.img||'',v=>w.img=v,w.art?'leave empty to keep the built-in artwork':'',true),Gal(w),
 F('Intro',()=>(w.copy||COPY).intro,v=>cp().intro=v,{area:1,rows:4}),F('Purpose',()=>(w.copy||COPY).purpose,v=>cp().purpose=v,{area:1,rows:4}),
 F('Approach',()=>(w.copy||COPY).approach,v=>cp().approach=v,{area:1,rows:4}),F('Result',()=>(w.copy||COPY).result,v=>cp().result=v,{area:1,rows:4}),
 btn('Open case study →',()=>{location.hash='#/work/'+slug(w.t)},'pri')]},()=>({t:'New project',c:'Category',y:String(new Date().getFullYear()),cl:'Client',sv:'Services',r:'Role'}))],
Motion:()=>[F('Page title',()=>MOTION.title,v=>MOTION.title=v),F('Intro text',()=>MOTION.lead,v=>MOTION.lead=v,{area:1,rows:3}),h('h4',{},'Experiments (the first one shows wide)'),
 List(MOTION.items,(m,i)=>m.t||m.c||'Experiment '+(i+1),m=>[F('Tag line (small, above the title)',()=>m.k||'',v=>m.k=v),F('Title',()=>m.t||'',v=>m.t=v),F('Description',()=>m.d||m.c||'',v=>m.d=v,{area:1,rows:5}),Img('Image, GIF, animated WebP or video (MP4, WebM, MOV, MKV)',()=>m.img||'',v=>m.img=v,'',true),F('Or paste a link to an image or video',()=>/^data:/.test(m.img||'')?'':(m.img||''),v=>m.img=v,{ph:'https://…/clip.mp4'}),h('label',{cls:'ef'},h('input',{type:'checkbox',checked:!!m.ctrl,on:{change:e=>{m.ctrl=e.target.checked;commit()}}}),' Show video player controls (lets visitors pause and unmute)'),F('Or embed URL (Rive, iframe)',()=>m.embed||'',v=>m.embed=v,{ph:'https://…'})],()=>({t:'New piece',k:'Category',d:'Describe it here.'}))],
About:()=>[F('Intro (big text)',()=>ABOUT.intro,v=>ABOUT.intro=v,{area:1,rows:4}),F('Paragraphs (blank line between)',()=>ABOUT.paras.join('\n\n'),v=>ABOUT.paras=v.split(/\n{2,}/).map(x=>x.trim()).filter(Boolean),{area:1,rows:10}),
 Img('Photo',()=>PHOTO===PHOTO0?'':PHOTO,v=>{PHOTO=v||PHOTO0},'empty = original photo'),
 h('h4',{},'Resume'),F('Role title',()=>RESUME.role,v=>RESUME.role=v),F('Summary',()=>RESUME.summary,v=>RESUME.summary=v,{area:1,rows:5}),
 F('Contact lines (label | text | link)',()=>RESUME.contact.map(c=>c.join(' | ')).join('\n'),v=>RESUME.contact=lines(v).map(l=>l.split('|').map(x=>x.trim())).filter(c=>c[0]&&c[1]).map(c=>[c[0],c[1],c[2]||'#']),{area:1,rows:5}),
 h('h4',{},'Experience'),List(RESUME.jobs,j=>j[0],j=>[F('Title',()=>j[0],v=>j[0]=v),F('Location and dates',()=>j[1],v=>j[1]=v),F('Bullets (one per line)',()=>j[2].join('\n'),v=>j[2]=lines(v),{area:1,rows:8})],()=>['Job title at Company','City | Dates',['Bullet point']]),
 h('h4',{},'Skills, apps, education'),F('Core skills (comma separated)',()=>RESUME.skills.join(', '),v=>RESUME.skills=v.split(',').map(x=>x.trim()).filter(Boolean),{area:1}),
 F('Apps (one per line: Label: item, item)',()=>RESUME.apps.map(a=>a[0]+': '+a[1]).join('\n'),v=>RESUME.apps=lines(v).map(l=>{const i=l.indexOf(':');return i>0?[l.slice(0,i).trim(),l.slice(i+1).trim()]:null}).filter(Boolean),{area:1,rows:6}),
 F('Education (one per line)',()=>RESUME.edu.join('\n'),v=>RESUME.edu=lines(v),{area:1}),F('Languages',()=>RESUME.lang,v=>RESUME.lang=v)],
Contact:()=>[F('Heading (home page)',()=>CONTACT.main,v=>CONTACT.main=v),F('Heading (About and Motion pages)',()=>CONTACT.about,v=>CONTACT.about=v),
 F('Message under the heading (one line per row, use | for a line break on desktop)',()=>subToText(CONTACT.sub),v=>CONTACT.sub=textToSub(v),{area:1,rows:4}),
 F('“Book a call” link',()=>CONTACT.book,v=>CONTACT.book=v,{ph:'https://calendly.com/you'}),
 h('h4',{},'Contact form'),h('p',{cls:'est'},'A form service URL (Formspree, Netlify, etc.) sends messages in the background. Or add an email and the visitor’s mail app opens. With neither, the form only shows a thank-you.'),
 F('Form service URL (optional)',()=>CONTACT.endpoint,v=>CONTACT.endpoint=v,{ph:'https://formspree.io/f/…'}),F('Email address (optional)',()=>CONTACT.email,v=>CONTACT.email=v,{ph:'you@email.com'}),
 h('h4',{},'Footer links'),F('Instagram',()=>LINKS.instagram,v=>LINKS.instagram=v,{ph:'https://…'}),F('Calendly',()=>LINKS.calendly,v=>LINKS.calendly=v,{ph:'https://…'}),F('LinkedIn',()=>LINKS.linkedin,v=>LINKS.linkedin=v,{ph:'https://…'}),F('Contra',()=>LINKS.contra,v=>LINKS.contra=v,{ph:'https://…'})],
Data:()=>{const ta=h('textarea',{readOnly:true,rows:8,cls:'edata'}),upd=()=>ta.value=JSON.stringify(snapshot(),null,1),imp=h('textarea',{rows:5,cls:'edata',placeholder:'Paste exported JSON here'}),cb=h('input',{type:'checkbox',checked:!!UI.hide});upd();
 cb.addEventListener('change',()=>{UI.hide=cb.checked;commit()});
 return[h('p',{cls:'est'},'Edits save automatically in this browser. To keep them permanently or move the site, download the website file (single-file version) or publish to your Cloudflare site. You can also save the data as JSON and import it later.'),
 ...(SITE?pubUI():[btn('Download website file (.html)',()=>dl(bakedHTML(),'index.html','text/html'),'pri'),' ']),btn('Download data (.json)',()=>dl(JSON.stringify(snapshot(),null,1),'site-data.json','application/json')),' ',btn('Copy JSON',()=>{upd();ta.select();try{navigator.clipboard.writeText(ta.value)}catch(e){document.execCommand('copy')}}),
 h('p',{cls:'est'},'If downloads are blocked in a preview, use Copy JSON and paste it into the Import box on your copy.'),ta,
 h('h4',{},'Import'),imp,btn('Apply import',()=>{try{applyData(JSON.parse(imp.value));refresh();save();show('Data')}catch(e){st.textContent='That JSON could not be read'}}),
 h('h4',{},'Visitors'),h('label',{cls:'ef'},cb,' Hide the Edit and Colors buttons on my exported site (add ?edit to the address to bring them back)'),
 h('h4',{},'Reset'),(()=>{const b=btn('Reset everything to the original content',()=>{if(b.dataset.arm){try{localStorage.removeItem(KEY)}catch(e){}location.reload()}else{b.dataset.arm='1';b.textContent='Click again to erase all your edits';setTimeout(()=>{b.dataset.arm='';b.textContent='Reset everything to the original content'},4000)}});return b})()]}};
const ed=h('aside',{id:'ed','aria-label':'Edit site'}),body=h('div',{cls:'ebody'}),tabs=h('div',{cls:'etabs'});let cur='Home';
function show(n){cur=n;[...tabs.children].forEach(b=>b.classList.toggle('on',b.textContent===n));body.replaceChildren(...[].concat(T[n]()))}
Object.keys(T).forEach(n=>tabs.append(h('button',{type:'button',on:{click:()=>show(n)}},n)));
ed.append(h('div',{cls:'ehead'},h('strong',{},'Edit site'),st,btn('✕',()=>ed.classList.remove('open'),'sm')),tabs,body);document.body.append(ed);
document.body.append(h('button',{id:'edtog',type:'button',on:{click:()=>{ed.classList.toggle('open');if(ed.classList.contains('open'))show(cur)}}},'✏️ Edit site'));
let draft=null;try{draft=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){}
let baked=null;try{const t=$('site-data').textContent.trim();if(t&&t!=='{}')baked=JSON.parse(t)}catch(e){}
const DEFS=JSON.parse(JSON.stringify(snapshot()));DEFS.theme={};
const fix=d=>{if(d){const mo=d.motion;if(mo&&Array.isArray(mo.items)&&mo.items.every(x=>!x.img&&!x.embed&&!x.t&&!x.d))delete d.motion}return d};
function hideUI(){const cfg=window.SITE_CONFIG||{};if((cfg.hideEditor||UI.hide)&&!/[?&#]edit/.test(location.search+location.hash))['tp','edtog'].forEach(id=>{const e=$(id);e&&(e.style.display='none')})}
async function boot(){let server=null;
 if(typeof fetch==='function'&&location.protocol!=='file:'){for(const u of ['/api/site-data','site-data.json']){try{const ac=new AbortController(),t=setTimeout(()=>ac.abort(),3000),r=await fetch(u,{cache:'no-store',signal:ac.signal});clearTimeout(t);if(r.ok){const j=await r.json();if(j&&Object.keys(j).length>1){server=j;break}}}catch(e){}}}
 [baked,server,draft].forEach(d=>d&&applyData(fix(d)));
 refresh();route();hideUI();document.body.classList.add('ready')}
boot();
})();
