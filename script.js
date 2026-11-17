const $=id=>document.getElementById(id);const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
$('y').textContent=new Date().getFullYear();
/* preloader */
const pre=$('pre'),pb=pre.querySelector('i'),pn=$('pn');let n=0;
const t0=setInterval(()=>{n=Math.min(100,n+Math.random()*12+4);pb.style.width=n+'%';pn.textContent=Math.floor(n)+'%';if(n>=100){clearInterval(t0);setTimeout(()=>{pre.classList.add('out');document.body.classList.remove('loading');document.body.classList.add('ready')},200)}},50);
/* menu mobile */
const bg=$('burger');function menu(o){document.body.classList.toggle('menu',o);bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Fechar menu':'Abrir menu')}
bg.addEventListener('click',()=>menu(!document.body.classList.contains('menu')));
document.querySelectorAll('#mmenu a').forEach(a=>a.addEventListener('click',()=>menu(false)));
addEventListener('keydown',e=>{if(e.key==='Escape')menu(false)});
/* rede de partículas */
const c=$('bg'),x=c.getContext('2d');let W,H,P=[],M={x:-999,y:-999};
function rs(){W=c.width=innerWidth;H=c.height=innerHeight;P=Array.from({length:Math.min(90,W/14|0)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,r:Math.random()*1.8+.5}))}
rs();addEventListener('resize',rs);
(function d(){x.clearRect(0,0,W,H);for(let i=0;i<P.length;i++){const p=P[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
const dx=p.x-M.x,dy=p.y-M.y,ds=Math.hypot(dx,dy);if(ds<140){p.x+=dx/ds*2;p.y+=dy/ds*2}
x.fillStyle='rgba(210,110,255,.7)';x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill();
for(let j=i+1;j<P.length;j++){const q=P[j],l=Math.hypot(p.x-q.x,p.y-q.y);if(l<120){x.strokeStyle=`rgba(190,80,255,${.22*(1-l/120)})`;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke()}}}
requestAnimationFrame(d)})();
/* cursor, brilho, holofote */
const g=$('glow'),cu=$('cur'),c2=$('cur2');let cx=0,cy=0,mx=0,my=0;
addEventListener('pointermove',e=>{M.x=mx=e.clientX;M.y=my=e.clientY;g.style.left=mx+'px';g.style.top=my+'px';cu.style.transform=`translate(${mx}px,${my}px)`;
const t=e.target.closest('.card,.steps li,.svc-vis');if(t){const r=t.getBoundingClientRect();t.style.setProperty('--mx',e.clientX-r.left+'px');t.style.setProperty('--my',e.clientY-r.top+'px')}
c2.classList.toggle('big',!!e.target.closest('a,button,summary,.scene'))});
(function f(){cx+=(mx-cx)*.15;cy+=(my-cy)*.15;c2.style.transform=`translate(${cx}px,${cy}px)`;requestAnimationFrame(f)})();
document.querySelectorAll('.btn3d').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.translate=`${(e.clientX-r.left-r.width/2)*.18}px ${(e.clientY-r.top-r.height/2)*.25}px`});b.addEventListener('pointerleave',()=>b.style.translate='')});
/* logo 3D */
const L=$('logo3d'),S=$('stage');if(S){S.addEventListener('pointermove',e=>{const r=S.getBoundingClientRect(),a=(e.clientX-r.left)/r.width-.5,b=(e.clientY-r.top)/r.height-.5;L.style.transform=`rotateY(${a*34}deg) rotateX(${-b*34}deg)`});S.addEventListener('pointerleave',()=>L.style.transform='')}
document.querySelectorAll('.tilt').forEach(t=>{t.addEventListener('pointermove',e=>{const r=t.getBoundingClientRect(),a=(e.clientX-r.left)/r.width-.5,b=(e.clientY-r.top)/r.height-.5;t.style.transform=`perspective(800px) rotateY(${a*10}deg) rotateX(${-b*10}deg) translateZ(6px)`});t.addEventListener('pointerleave',()=>t.style.transform='')});
/* palavra digitando */
const rt=$('rot');if(rt){const W2=['sites que impressionam','aplicativos sob medida','sistemas que organizam','automações que poupam tempo','campanhas que vendem','vídeos que marcam'];let wi=0,ci=0,del=false;
(function ty(){const w=W2[wi];ci+=del?-1:1;rt.textContent=w.slice(0,ci);let s=del?30:70;if(!del&&ci===w.length){del=true;s=1400}else if(del&&ci===0){del=false;wi=(wi+1)%W2.length;s=350}setTimeout(ty,s)})()}
/* revelar + contadores */
function count(el){const to=+el.dataset.to,s=el.dataset.s||'',st=performance.now();(function u(t){const v=Math.min(1,(t-st)/1500);el.textContent=Math.round(to*(1-Math.pow(1-v,3)))+s;if(v<1)requestAnimationFrame(u)})(st)}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');e.target.querySelectorAll('[data-to]').forEach(count);io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
/* barra de progresso + manifesto */
const pr=$('prog'),mt=$('mtxt');let ws=[];
if(mt){mt.innerHTML=mt.textContent.split(' ').map(w=>`<span class="w">${w}</span>`).join(' ');ws=[...mt.children]}
function mf(){if(!mt)return;const r=mt.getBoundingClientRect(),p=Math.min(1,Math.max(0,(innerHeight*.85-r.top)/(r.height+innerHeight*.35)));ws.forEach((w,i)=>w.classList.toggle('on',i<p*ws.length))}
addEventListener('scroll',()=>{pr.style.width=scrollY/(document.body.scrollHeight-innerHeight)*100+'%';mf()});mf();
/* chips ativos */
const ch=$('chips');if(ch){const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){ch.querySelectorAll('a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-40% 0px -50% 0px'});document.querySelectorAll('.svc').forEach(s=>so.observe(s))}
/* carrossel 3D */
const R=$('ring3');if(R){const SC=$('scene'),cards=[...R.children].filter(k=>k.classList.contains('c3')),N=cards.length,step=360/N;let ang=0,tgt=0,drag=false,lx=0,moved=0,hov=false;
const size=()=>R.style.setProperty('--z',Math.round(R.offsetWidth/2/Math.tan(Math.PI/N)*1.2)+'px');size();addEventListener('resize',size);
SC.addEventListener('pointerdown',e=>{if(e.target.closest('.arrow'))return;drag=true;lx=e.clientX;moved=0});
addEventListener('pointerup',()=>drag=false);
addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-lx;lx=e.clientX;moved+=Math.abs(dx);tgt+=dx*.3});
SC.addEventListener('mouseenter',()=>hov=true);SC.addEventListener('mouseleave',()=>hov=false);
const diff=(i,a)=>((((i*step+a)%360)+540)%360)-180;
cards.forEach((k,i)=>k.addEventListener('click',e=>{if(moved>6){e.preventDefault();return}const a=diff(i,tgt);if(Math.abs(a)>step/2){e.preventDefault();tgt-=a}}));
$('prev').addEventListener('click',()=>tgt=Math.round(tgt/step)*step+step);$('next').addEventListener('click',()=>tgt=Math.round(tgt/step)*step-step);
(function sp(){if(!drag&&!hov&&!RM)tgt-=.1;ang+=(tgt-ang)*.08;R.style.transform=`rotateX(-4deg) rotateY(${ang}deg)`;
cards.forEach((k,i)=>{const d=Math.abs(diff(i,ang));k.style.opacity=Math.max(.2,1-d/115);k.classList.toggle('front',d<step/2)});requestAnimationFrame(sp)})()}
/* formulário */
const f2=$('form');if(f2)f2.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(f2),m=$('msg');let ok=true;
['n','w'].forEach(k=>{const i=f2.elements[k];const bad=!String(d.get(k)).trim()||(k==='w'&&String(d.get(k)).replace(/\D/g,'').length<10);i.classList.toggle('bad',bad);if(bad)ok=false});
if(!ok){m.style.color='#ff9fb0';m.textContent='Preencha seu nome e um WhatsApp com DDD.';return}
const t=`Olá, AV TECH! Meu nome é ${d.get('n')}.\nWhatsApp: ${d.get('w')}\nPreciso de: ${d.get('s')}\nMinha ideia: ${d.get('m')||'quero conversar'}`;
m.style.color='#7dffb0';m.textContent='Abrindo o WhatsApp com a sua mensagem...';
open('https://wa.me/5561993985621?text='+encodeURIComponent(t),'_blank')});
