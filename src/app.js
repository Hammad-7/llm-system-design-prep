(function(){
"use strict";
var NS="http://www.w3.org/2000/svg";
var ORDER=["introduction","how-to-prepare","delivery-framework","core-concepts","key-technologies","common-patterns","question-breakdowns","design-chatgpt","design-support-assistant","design-inference-batching","design-coding-agent","question-bank","resources"];
function $(s,r){return (r||document).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))}
function el(tag,attrs,parent){var e=document.createElementNS(NS,tag);for(var k in attrs){if(attrs[k]!==undefined&&attrs[k]!==null)e.setAttribute(k,attrs[k])}if(parent)parent.appendChild(e);return e}
var store={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};

/* ---------- theme ---------- */
var saved=store.get("llmsd-theme"); if(saved)document.documentElement.setAttribute("data-theme",saved);
$("#themeBtn").addEventListener("click",function(){
  var cur=document.documentElement.getAttribute("data-theme");
  var dark=cur?cur==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;
  var next=dark?"light":"dark";document.documentElement.setAttribute("data-theme",next);store.set("llmsd-theme",next);
});

/* ---------- rough drawing helpers ---------- */
var R=null;
function rc(svg){ if(window.rough){ try{ return window.rough.svg(svg);}catch(e){} } return null; }
var seedN=7;
function opt(o){o=o||{};var b={roughness:1.05,bowing:.7,strokeWidth:1.6,seed:(seedN+=13)%2000+1,stroke:"#000"};for(var k in o)b[k]=o[k];return b}
function shapeRect(r,g,x,y,w,h,o){ if(r){g.appendChild(r.rectangle(x,y,w,h,opt(o)));} else { var p=el("path",{d:"M"+x+","+y+"h"+w+"v"+h+"h"+(-w)+"z","stroke-width":1.6},g); if(o&&o.strokeLineDash)p.setAttribute("stroke-dasharray",o.strokeLineDash.join(" ")); } }
function shapeLine(r,g,x1,y1,x2,y2,o){ if(r){g.appendChild(r.line(x1,y1,x2,y2,opt(o)));} else { var p=el("path",{d:"M"+x1+","+y1+"L"+x2+","+y2,"stroke-width":(o&&o.strokeWidth)||1.6},g); if(o&&o.strokeLineDash)p.setAttribute("stroke-dasharray",o.strokeLineDash.join(" ")); } }
function shapePath(r,g,d,o){ if(r){g.appendChild(r.path(d,opt(o)));} else { el("path",{d:d,"stroke-width":1.6},g);} }
function shapeEllipse(r,g,cx,cy,w,h,o){ if(r){g.appendChild(r.ellipse(cx,cy,w,h,opt(o)));} else { el("path",{d:"M"+(cx-w/2)+","+cy+"a"+(w/2)+","+(h/2)+" 0 1,0 "+w+",0a"+(w/2)+","+(h/2)+" 0 1,0 "+(-w)+",0","stroke-width":1.6},g);} }

function txt(g,x,y,s,cls,size,anchor,weight){
  var lines=String(s).split("\n"); var lh=size*1.22; var y0=y-(lines.length-1)*lh/2;
  var t=el("text",{x:x,y:y0,"text-anchor":anchor||"middle","dominant-baseline":"central","font-size":size,"class":cls||""},g);
  if(weight)t.setAttribute("font-weight",weight);
  lines.forEach(function(L,i){var ts=el("tspan",{x:x,dy:i===0?0:lh},t);ts.textContent=L;});
  return t;
}

/* ---------- diagrams ---------- */
function clip(n,tx,ty){
  var cx=n.x+n.w/2, cy=n.y+n.h/2, dx=tx-cx, dy=ty-cy;
  if(dx===0&&dy===0)return [cx,cy];
  var hw=n.w/2+5, hh=n.h/2+5;
  if(n.s==="text"){hw=n.w/2;hh=n.h/2}
  var t=Math.min(dx!==0?hw/Math.abs(dx):1e9, dy!==0?hh/Math.abs(dy):1e9);
  return [cx+dx*t, cy+dy*t];
}
function center(n){return [n.x+n.w/2,n.y+n.h/2]}
function anchorPt(n,side){
  if(!side)return null;
  var m={t:[n.x+n.w/2,n.y-5],b:[n.x+n.w/2,n.y+n.h+5],l:[n.x-5,n.y+n.h/2],r:[n.x+n.w+5,n.y+n.h/2]};
  if(side.length>1){var s=side[0],f=parseFloat(side.slice(1));
    if(s==="t")return [n.x+n.w*f,n.y-5]; if(s==="b")return [n.x+n.w*f,n.y+n.h+5]; if(s==="l")return [n.x-5,n.y+n.h*f]; if(s==="r")return [n.x+n.w+5,n.y+n.h*f];}
  return m[side];
}
function renderDiagram(fig){
  var id=fig.getAttribute("data-diagram"); var D=(window.DIAGRAMS||{})[id]; if(!D)return;
  fig.innerHTML="";
  var svg=el("svg",{viewBox:"0 0 "+D.w+" "+D.h,width:D.w,role:"img","aria-label":D.label||id},null);
  fig.appendChild(svg);
  var r=rc(svg); seedN=id.length*31;
  var byId={};
  (D.zones||[]).forEach(function(z){
    var g=el("g",{"class":"zone c-"+(z.c||"gray")},svg);
    shapeRect(r,g,z.x,z.y,z.w,z.h,{strokeLineDash:[6,6],roughness:.6,strokeWidth:1.2});
    if(z.t)txt(svg,z.x+12,z.y+16,z.t,"ztitle c-"+(z.c||"gray"),14,"start");
  });
  (D.nodes||[]).forEach(function(n){ byId[n.id]=n; });
  // edges first (under nodes)
  var eg=el("g",{},svg); var lg=el("g",{},svg);
  (D.edges||[]).forEach(function(e){
    var a=byId[e.a], b=byId[e.b]; if(!a||!b)return;
    var pts=[]; var via=e.via||[];
    var p0=anchorPt(a,e.as)|| (via.length?clip(a,via[0][0],via[0][1]):clip(a,center(b)[0],center(b)[1]));
    var pN=anchorPt(b,e.bs)|| (via.length?clip(b,via[via.length-1][0],via[via.length-1][1]):clip(b,center(a)[0],center(a)[1]));
    if(!via.length && e.as && !e.bs){pN=clip(b,p0[0],p0[1]);}
    if(!via.length && e.bs && !e.as){p0=clip(a,pN[0],pN[1]);}
    pts.push(p0); via.forEach(function(v){pts.push(v)}); pts.push(pN);
    var g=el("g",{"class":"edge c-"+(e.c||"gray")},eg);
    var o={strokeWidth:1.5,roughness:.8,bowing:.4}; if(e.d)o.strokeLineDash=[6,5];
    for(var i=0;i<pts.length-1;i++) shapeLine(r,g,pts[i][0],pts[i][1],pts[i+1][0],pts[i+1][1],o);
    function head(p,q){var ang=Math.atan2(p[1]-q[1],p[0]-q[0]),L=10,s=.45;
      shapeLine(r,g,p[0],p[1],p[0]-L*Math.cos(ang-s),p[1]-L*Math.sin(ang-s),{strokeWidth:1.5,roughness:.4});
      shapeLine(r,g,p[0],p[1],p[0]-L*Math.cos(ang+s),p[1]-L*Math.sin(ang+s),{strokeWidth:1.5,roughness:.4});}
    if(!e.noh)head(pts[pts.length-1],pts[pts.length-2]);
    if(e.bi)head(pts[0],pts[1]);
    if(e.t){
      var mi=Math.floor((pts.length-1)/2); var m=e.lp||[(pts[mi][0]+pts[mi+1][0])/2,(pts[mi][1]+pts[mi+1][1])/2];
      var lines=String(e.t).split("\n"); var wmax=0; lines.forEach(function(l){wmax=Math.max(wmax,l.length)});
      var w=wmax*6.6+10, h=lines.length*15+4;
      el("rect",{x:m[0]-w/2,y:m[1]-h/2,width:w,height:h,rx:4,"class":"elbl-bg"},lg);
      txt(lg,m[0],m[1],e.t,"elbl",12.5);
    }
  });
  (D.nodes||[]).forEach(function(n){
    var c="c-"+(n.c||"ink"); var g=el("g",{"class":c},svg);
    var fs=n.fs||15;
    if(n.s==="text"){ txt(svg,n.x+n.w/2,n.y+n.h/2,n.t,c,fs,"middle"); return; }
    if(n.s==="db"){
      var ry=Math.min(10,n.h*.16);
      el("path",{d:"M"+n.x+","+(n.y+ry)+" L"+n.x+","+(n.y+n.h-ry)+" A"+n.w/2+","+ry+" 0 0 0 "+(n.x+n.w)+","+(n.y+n.h-ry)+" L"+(n.x+n.w)+","+(n.y+ry)+" A"+n.w/2+","+ry+" 0 0 0 "+n.x+","+(n.y+ry)+"Z","class":"bg "+c,style:"fill:var(--dg-fill-"+(n.c||"gray")+");stroke:none"},g);
      shapeEllipse(r,g,n.x+n.w/2,n.y+ry,n.w,ry*2,{});
      shapePath(r,g,"M"+n.x+","+(n.y+ry)+" L"+n.x+","+(n.y+n.h-ry)+" A"+n.w/2+","+ry+" 0 0 0 "+(n.x+n.w)+","+(n.y+n.h-ry)+" L"+(n.x+n.w)+","+(n.y+ry),{});
      txt(svg,n.x+n.w/2,n.y+n.h/2+ry/2,n.t,c,fs);
      return;
    }
    if(n.s==="person"){
      var cx=n.x+n.w/2; shapeEllipse(r,g,cx,n.y+10,18,18,{});
      shapePath(r,g,"M"+(cx-14)+","+(n.y+38)+" Q"+cx+","+(n.y+12)+" "+(cx+14)+","+(n.y+38),{});
      txt(svg,cx,n.y+n.h-8,n.t,c,fs); return;
    }
    el("rect",{x:n.x,y:n.y,width:n.w,height:n.h,rx:n.s==="pill"?n.h/2:6,"class":"bg "+c},g);
    if(n.s==="pill"){ shapePath(r,g,"M"+(n.x+n.h/2)+","+n.y+" L"+(n.x+n.w-n.h/2)+","+n.y+" A"+n.h/2+","+n.h/2+" 0 0 1 "+(n.x+n.w-n.h/2)+","+(n.y+n.h)+" L"+(n.x+n.h/2)+","+(n.y+n.h)+" A"+n.h/2+","+n.h/2+" 0 0 1 "+(n.x+n.h/2)+","+n.y,{}); }
    else shapeRect(r,g,n.x,n.y,n.w,n.h,n.dash?{strokeLineDash:[5,5]}:{});
    if(n.sub){ var nl=String(n.t).split("\n").length, th=nl*fs*1.22, sl=String(n.sub).split("\n").length, sh=sl*14.6, blk=th+5+sh, top=n.y+n.h/2-blk/2;
      txt(svg,n.x+n.w/2,top+th/2,n.t,c,fs); txt(svg,n.x+n.w/2,top+th+5+sh/2,n.sub,"c-gray",12); }
    else txt(svg,n.x+n.w/2,n.y+n.h/2,n.t,c,fs);
  });
  (D.notes||[]).forEach(function(n){ txt(svg,n.x,n.y,n.t,"c-"+(n.c||"gray"),n.fs||13,n.a||"start"); });
}

/* ---------- banners ---------- */
function renderBanner(b){
  var title=b.getAttribute("data-bt"), sub=b.getAttribute("data-bs")||"";
  var svg=el("svg",{viewBox:"0 0 760 190",role:"img","aria-label":title+" banner"},null); b.appendChild(svg);
  var r=rc(svg); seedN=title.length*17;
  var g=el("g",{style:"--x:1"},svg); g.setAttribute("class","bn");
  var W="rgba(255,255,255,.85)";
  function L(x1,y1,x2,y2){ if(r)g.appendChild(r.line(x1,y1,x2,y2,opt({stroke:W,strokeWidth:2,roughness:1.3}))); }
  function Rr(x,y,w,h){ if(r)g.appendChild(r.rectangle(x,y,w,h,opt({stroke:W,strokeWidth:2,roughness:1.4}))); }
  function E(x,y,w,h){ if(r)g.appendChild(r.ellipse(x,y,w,h,opt({stroke:W,strokeWidth:2,roughness:1.3}))); }
  // doodles: token stream, gpu box, cylinder, arrows
  for(var i=0;i<6;i++){Rr(30+i*22,30,16,16)}
  L(30,62,150,62); L(140,56,150,62); L(140,68,150,62);
  Rr(36,100,90,56); L(50,116,112,116); L(50,128,100,128); L(50,140,108,140);
  E(675,40,70,18); L(640,40,640,92); L(710,40,710,92); E(675,92,70,18);
  Rr(610,120,48,40); Rr(668,120,48,40); L(634,140,668,140);
  L(560,40,600,70); L(590,70,600,70); L(596,60,600,70);
  for(var j=0;j<4;j++){E(170+j*16,160,9,9)}
  // card
  var cw=Math.max(300,Math.min(440,title.length*17+70)), cx=380-cw/2;
  el("rect",{x:cx,y:52,width:cw,height:86,rx:6,fill:"#fff"},svg);
  if(r)svg.appendChild(r.rectangle(cx,52,cw,86,opt({stroke:"#2b2b2b",strokeWidth:2.2,roughness:1.1})));
  var t=el("text",{x:380,y:sub?88:97,"text-anchor":"middle","font-size":34,fill:"#2b2b2b","font-family":"Architects Daughter, cursive","dominant-baseline":"central"},svg); t.textContent=title;
  if(sub){var s=el("text",{x:380,y:120,"text-anchor":"middle","font-size":19,fill:"#2b2b2b","font-family":"Architects Daughter, cursive","dominant-baseline":"central"},svg); s.textContent=sub;}
}

/* ---------- charts ---------- */
function fmt(n,d){return n.toLocaleString("en-US",{maximumFractionDigits:d===undefined?0:d,minimumFractionDigits:d===undefined?0:d})}
function niceMax(v){var p=Math.pow(10,Math.floor(Math.log10(v)));var m=v/p;var s=m<=1?1:m<=2?2:m<=2.5?2.5:m<=5?5:10;return s*p}
function tipFor(box){var t=box.querySelector(".tip");if(!t){t=document.createElement("div");t.className="tip";box.appendChild(t)}return t}
function showTip(box,html,x,y){var t=tipFor(box);t.innerHTML=html;t.style.left=x+"px";t.style.top=y+"px";t.classList.add("on")}
function hideTip(box){var t=box.querySelector(".tip");if(t)t.classList.remove("on")}
function pos(box,svg,x,y){var br=box.getBoundingClientRect(),sr=svg.getBoundingClientRect(),vb=svg.viewBox.baseVal;var k=sr.width/vb.width;return [sr.left-br.left+x*k, sr.top-br.top+y*k]}

function barH(box,c){
  var W=680,rowH=40,top=8,left=c.left||210,right=70,H=top+c.data.length*rowH+30;
  var svg=el("svg",{viewBox:"0 0 "+W+" "+H,role:"img","aria-label":c.aria},null); box.appendChild(svg);
  var max=c.max||niceMax(Math.max.apply(null,c.data.map(function(d){return d.v})));
  var x=function(v){return left+(W-left-right)*v/max};
  var ticks=c.ticks||5;
  for(var i=0;i<=ticks;i++){var v=max*i/ticks;var X=x(v);el("line",{x1:X,x2:X,y1:top,y2:H-26,"class":"gl"},svg);var t=el("text",{x:X,y:H-8,"text-anchor":"middle"},svg);t.textContent=(c.tickFmt||function(v){return fmt(v)})(v)}
  c.data.forEach(function(d,i){
    var y=top+i*rowH+8, h=rowH-16, w=Math.max(2,x(d.v)-left);
    var lab=el("text",{x:left-12,y:y+h/2,"text-anchor":"end","dominant-baseline":"central","class":"lab"},svg);lab.textContent=d.l;
    var col=d.hi?"var(--series-1)":"var(--series-1)";
    var op=c.highlight===undefined||c.highlight===i?1:.45;
    var p="M"+left+","+y+"h"+(w-4)+"q4,0 4,4v"+(h-8)+"q0,4 -4,4h"+(-(w-4))+"z";
    var bar=el("path",{d:p,fill:col,opacity:op},svg);
    var vt=el("text",{x:left+w+8,y:y+h/2,"dominant-baseline":"central","class":"v"},svg);vt.textContent=c.valFmt(d.v);
    var hit=el("rect",{x:0,y:y-6,width:W,height:h+12,fill:"transparent"},svg);
    hit.addEventListener("mousemove",function(){var p2=pos(box,svg,left+w,y);showTip(box,"<b>"+d.l+"</b><br>"+c.valFmt(d.v)+(d.n?"<br>"+d.n:""),p2[0],p2[1])});
    hit.addEventListener("mouseleave",function(){hideTip(box)});
  });
  el("line",{x1:left,x2:left,y1:top,y2:H-26,"class":"ax"},svg);
}

function lineChart(box,c){
  var W=680,H=300,l=64,r=110,t=14,b=44;
  var svg=el("svg",{viewBox:"0 0 "+W+" "+H,role:"img","aria-label":c.aria},null); box.appendChild(svg);
  var xs=c.x, n=xs.length;
  var ymax=c.ymax||niceMax(Math.max.apply(null,c.series.map(function(s){return Math.max.apply(null,s.v)})));
  var X=function(i){return c.xNum? l+(W-l-r)*(xs[i]-xs[0])/(xs[n-1]-xs[0]) : l+(W-l-r)*i/(n-1)};
  var Y=function(v){return H-b-(H-t-b)*v/ymax};
  for(var k=0;k<=5;k++){var v=ymax*k/5;el("line",{x1:l,x2:W-r,y1:Y(v),y2:Y(v),"class":"gl"},svg);var tt=el("text",{x:l-8,y:Y(v),"text-anchor":"end","dominant-baseline":"central"},svg);tt.textContent=c.yFmt(v)}
  (c.xTicks||xs.map(function(_,i){return i})).forEach(function(i){var tx=el("text",{x:X(i),y:H-b+18,"text-anchor":"middle"},svg);tx.textContent=c.xFmt?c.xFmt(xs[i]):xs[i]});
  if(c.xLabel){var xl=el("text",{x:(l+W-r)/2,y:H-6,"text-anchor":"middle"},svg);xl.textContent=c.xLabel}
  if(c.yLabel){var yl=el("text",{x:14,y:(t+H-b)/2,"text-anchor":"middle",transform:"rotate(-90 14 "+((t+H-b)/2)+")"},svg);yl.textContent=c.yLabel}
  el("line",{x1:l,x2:W-r,y1:H-b,y2:H-b,"class":"ax"},svg);
  c.series.forEach(function(s,si){
    var d=s.v.map(function(v,i){return (i?"L":"M")+X(i)+","+Y(v)}).join("");
    el("path",{d:d,fill:"none",stroke:s.col,"stroke-width":2,"stroke-linejoin":"round","stroke-linecap":"round"},svg);
    var li=n-1; el("circle",{cx:X(li),cy:Y(s.v[li]),r:4,fill:s.col,stroke:"var(--chart-surface)","stroke-width":2},svg);
    var lt=el("text",{x:X(li)+10,y:Y(s.v[li]),"dominant-baseline":"central","class":"v"},svg);lt.textContent=s.name+" "+c.yFmt(s.v[li],true);
    if(s.pts){s.v.forEach(function(v,i){el("circle",{cx:X(i),cy:Y(v),r:4,fill:s.col,stroke:"var(--chart-surface)","stroke-width":2},svg)})}
  });
  var cross=el("line",{x1:0,x2:0,y1:t,y2:H-b,stroke:"var(--muted)","stroke-dasharray":"3 3",opacity:0},svg);
  var hit=el("rect",{x:l,y:t,width:W-l-r,height:H-t-b,fill:"transparent"},svg);
  hit.addEventListener("mousemove",function(ev){
    var sr=svg.getBoundingClientRect(),k=W/sr.width,mx=(ev.clientX-sr.left)*k;var best=0,bd=1e9;for(var i=0;i<n;i++){var dd=Math.abs(X(i)-mx);if(dd<bd){bd=dd;best=i}}
    cross.setAttribute("x1",X(best));cross.setAttribute("x2",X(best));cross.setAttribute("opacity",1);
    var html="<b>"+(c.tipX?c.tipX(xs[best]):xs[best])+"</b>";c.series.forEach(function(s){html+="<br>"+s.name+": "+c.yFmt(s.v[best],true)});
    var p=pos(box,svg,X(best),Y(Math.max.apply(null,c.series.map(function(s){return s.v[best]}))));showTip(box,html,p[0],p[1]);
  });
  hit.addEventListener("mouseleave",function(){cross.setAttribute("opacity",0);hideTip(box)});
}

function scatterCurve(box,c){
  var W=680,H=320,l=64,r=40,t=20,b=46;
  var svg=el("svg",{viewBox:"0 0 "+W+" "+H,role:"img","aria-label":c.aria},null); box.appendChild(svg);
  var xmax=c.xmax, ymax=c.ymax;
  var X=function(v){return l+(W-l-r)*v/xmax}, Y=function(v){return H-b-(H-t-b)*v/ymax};
  for(var k=0;k<=5;k++){var v=ymax*k/5;el("line",{x1:l,x2:W-r,y1:Y(v),y2:Y(v),"class":"gl"},svg);var tt=el("text",{x:l-8,y:Y(v),"text-anchor":"end","dominant-baseline":"central"},svg);tt.textContent=fmt(v)}
  for(var q=0;q<=5;q++){var xv=xmax*q/5;var tx=el("text",{x:X(xv),y:H-b+18,"text-anchor":"middle"},svg);tx.textContent=fmt(xv)}
  var xl=el("text",{x:(l+W-r)/2,y:H-6,"text-anchor":"middle"},svg);xl.textContent=c.xLabel;
  var yl=el("text",{x:14,y:(t+H-b)/2,"text-anchor":"middle",transform:"rotate(-90 14 "+((t+H-b)/2)+")"},svg);yl.textContent=c.yLabel;
  el("line",{x1:l,x2:W-r,y1:H-b,y2:H-b,"class":"ax"},svg);
  var d=c.pts.map(function(p,i){return (i?"L":"M")+X(p.x)+","+Y(p.y)}).join("");
  el("path",{d:d,fill:"none",stroke:"var(--series-1)","stroke-width":2},svg);
  c.pts.forEach(function(p){
    var cc=el("circle",{cx:X(p.x),cy:Y(p.y),r:5,fill:"var(--series-1)",stroke:"var(--chart-surface)","stroke-width":2},svg);
    if(p.lab){var lt=el("text",{x:X(p.x)+(p.dx||8),y:Y(p.y)+(p.dy||-10),"class":"v","text-anchor":p.anchor||"start"},svg);lt.textContent=p.lab}
    var hit=el("circle",{cx:X(p.x),cy:Y(p.y),r:16,fill:"transparent"},svg);
    hit.addEventListener("mousemove",function(){var pp=pos(box,svg,X(p.x),Y(p.y));showTip(box,"<b>Batch size "+p.b+"</b><br>Step time "+fmt(p.t,1)+" ms<br>Aggregate "+fmt(p.x)+" tok/s<br>Per user "+fmt(p.y)+" tok/s",pp[0],pp[1])});
    hit.addEventListener("mouseleave",function(){hideTip(box)});
  });
}

var CHARTS={
  "kv-capacity":function(box){barH(box,{aria:"Bar chart: concurrent sequences that fit in KV cache memory for Llama 3 70B on 8 H100s drops from 647 at 2K context to 10 at 128K context.",
    data:[{l:"2K tokens per sequence",v:647},{l:"4K tokens",v:323},{l:"8K tokens",v:161},{l:"32K tokens",v:40},{l:"128K tokens",v:10}],
    valFmt:function(v){return fmt(v)+" seqs"},left:190,max:700,ticks:7,highlight:undefined})},
  "contextual-retrieval":function(box){barH(box,{aria:"Bar chart: top-20 retrieval failure rate falls from 5.7% with plain embeddings to 1.9% with contextual embeddings, contextual BM25 and reranking.",
    data:[{l:"Plain embeddings",v:5.7},{l:"+ Contextual embeddings",v:3.7,n:"35% fewer failures"},{l:"+ Contextual BM25 (hybrid)",v:2.9,n:"49% fewer failures"},{l:"+ Reranking",v:1.9,n:"67% fewer failures"}],
    max:6,ticks:6,tickFmt:function(v){return fmt(v)+"%"},valFmt:function(v){return fmt(v,1)+"%"},left:220,highlight:3})},
  "prompt-cache":function(box){
    var x=[1,2,5,10,20,50,100];
    lineChart(box,{aria:"Line chart: cumulative cost of a 20,000-token shared prefix at $3 per million input tokens. Without caching it reaches $6.00 after 100 requests; with caching it reaches $0.67.",
      x:x,xNum:false,series:[{name:"No cache",v:[0.06,0.12,0.30,0.60,1.20,3.00,6.00],col:"var(--series-2)",pts:true},{name:"Cached",v:[0.075,0.081,0.099,0.129,0.189,0.369,0.669],col:"var(--series-1)",pts:true}],
      yFmt:function(v,full){return "$"+fmt(v,2)},xLabel:"Requests reusing the same prefix (within cache lifetime)",yLabel:"Cumulative prefix cost (USD)",tipX:function(v){return v+" request"+(v>1?"s":"")}});
  },
  "batch-curve":function(box){
    var B=[1,4,8,16,32,64,128,256],T=[4.88,5.19,5.6,6.42,8.07,11.37,17.96,31.14];
    var pts=B.map(function(b,i){return {b:b,t:T[i],x:b/T[i]*1000,y:1000/T[i]}});
    pts.forEach(function(p){ if([1,16,64,128,256].indexOf(p.b)>=0) p.lab="B="+p.b; });
    pts[0].dx=10;pts[0].dy=-12; pts[7].anchor="middle"; pts[7].dx=0; pts[7].dy=24; pts[6].anchor="end"; pts[6].dx=-10; pts[6].dy=-10;
    scatterCurve(box,{aria:"Curve: as decode batch size grows from 1 to 256, aggregate throughput rises from about 205 to 8,221 tokens per second while each user's speed falls from 205 to 32 tokens per second.",
      pts:pts,xmax:10000,ymax:250,xLabel:"Aggregate throughput (tokens/s per GPU)",yLabel:"Per-user speed (tokens/s)"});
  },
  "latency-budget":function(box){
    var steps=[["Auth + rate limit",0,8],["Input guardrail",8,40],["Load history + memory",8,30],["Retrieval (if needed)",40,160],["Queue + prefill (TTFT)",160,550],["Decode 400 tokens",550,6250],["Output guard (streamed, chunked)",600,6300],["Persist + trace (async)",6250,6290]];
    var W=680,rowH=34,l=230,r=30,t=8,H=t+steps.length*rowH+34,max=6400;
    var svg=el("svg",{viewBox:"0 0 "+W+" "+H,role:"img","aria-label":"Gantt-style latency budget: the user sees the first token at about 550 ms, and decoding 400 tokens dominates the total of about 6.3 seconds."},null);box.appendChild(svg);
    var X=function(v){return l+(W-l-r)*v/max};
    [0,1000,2000,3000,4000,5000,6000].forEach(function(v){el("line",{x1:X(v),x2:X(v),y1:t,y2:H-26,"class":"gl"},svg);var tx=el("text",{x:X(v),y:H-8,"text-anchor":"middle"},svg);tx.textContent=(v/1000)+" s"});
    steps.forEach(function(s,i){var y=t+i*rowH+7,h=rowH-14;var lab=el("text",{x:l-10,y:y+h/2,"text-anchor":"end","dominant-baseline":"central","class":"lab"},svg);lab.textContent=s[0];
      var w=Math.max(3,X(s[2])-X(s[1]));el("rect",{x:X(s[1]),y:y,width:w,height:h,rx:3,fill:i===4?"var(--series-2)":"var(--series-1)",opacity:i===4||i===5?1:.75},svg);
      var hit=el("rect",{x:0,y:y-5,width:W,height:h+10,fill:"transparent"},svg);
      hit.addEventListener("mousemove",function(){var p=pos(box,svg,X(s[1])+w/2,y);showTip(box,"<b>"+s[0]+"</b><br>"+fmt(s[1])+"–"+fmt(s[2])+" ms ("+fmt(s[2]-s[1])+" ms)",p[0],p[1])});
      hit.addEventListener("mouseleave",function(){hideTip(box)});});
    var mk=X(550);el("line",{x1:mk,x2:mk,y1:t,y2:H-26,stroke:"var(--series-2)","stroke-dasharray":"4 3"},svg);
    var mt=el("text",{x:mk+6,y:t+steps.length*rowH-4,"class":"v"},svg);mt.textContent="first token ≈ 550 ms";
  }
};
function renderChart(box){var id=box.getAttribute("data-chart");if(CHARTS[id]&&!box.querySelector("svg"))CHARTS[id](box)}

/* ---------- routing / page chrome ---------- */
var pages={}; $$(".page").forEach(function(p){pages[p.id.replace(/^p-/,"")]=p});
function done(){var s=store.get("llmsd-done");try{return s?JSON.parse(s):{}}catch(e){return {}}}
function setDone(id,v){var d=done();if(v)d[id]=1;else delete d[id];store.set("llmsd-done",JSON.stringify(d));paintDone()}
function paintDone(){var d=done();$$("nav.side a").forEach(function(a){a.classList.toggle("done",!!d[a.getAttribute("href").slice(1)])});
  $$(".btn.mark").forEach(function(b){var id=b.getAttribute("data-id");b.classList.toggle("done",!!d[id]);b.textContent=d[id]?"Marked as read ✓":"Mark as read"})}
function slug(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}
function buildChrome(){
  Object.keys(pages).forEach(function(id){
    var p=pages[id];
    $$("h2,h3",p).forEach(function(h){ if(!h.id) h.id=id+"--"+slug(h.textContent).slice(0,60); });
    var i=ORDER.indexOf(id), next=ORDER[i+1], prev=ORDER[i-1];
    var f=document.createElement("div");f.className="pfoot";
    var title=function(k){var pp=pages[k];return pp?pp.getAttribute("data-title"):k};
    f.innerHTML='<button class="btn ghost mark" data-id="'+id+'">Mark as read</button>'+(next?'<a class="btn" href="#'+next+'">Next: '+title(next)+' →</a>':(prev?'<a class="btn ghost" href="#introduction">Back to the start</a>':''));
    p.appendChild(f);
  });
  $$(".btn.mark").forEach(function(b){b.addEventListener("click",function(){var id=b.getAttribute("data-id");setDone(id,!done()[id])})});
  $$(".banner").forEach(renderBanner);
}
var current=null;
function show(id){
  var target=null;
  if(id && id.indexOf("--")>0){target=id;id=id.split("--")[0]}
  if(!pages[id])id="introduction";
  if(current!==id){
    Object.keys(pages).forEach(function(k){pages[k].classList.toggle("on",k===id)});
    current=id;
    $$("nav.side a").forEach(function(a){a.classList.toggle("active",a.getAttribute("href")==="#"+id)});
    $$("figure.dg[data-diagram]",pages[id]).forEach(function(f){if(!f.querySelector("svg"))renderDiagram(f)});
    $$(".chart[data-chart]",pages[id]).forEach(renderChart);
    buildToc(); document.title=pages[id].getAttribute("data-title")+" · LLM System Design Prep";
    if(!target)window.scrollTo(0,0);
  }
  if(target){var t=document.getElementById(target);if(t)t.scrollIntoView()}
  document.body.classList.remove("nav-open");
  onScroll();
}
function buildToc(){
  var toc=$("#toc");toc.innerHTML="";
  $$("h2,h3",pages[current]).forEach(function(h){var a=document.createElement("a");a.href="#"+h.id;a.textContent=h.textContent;a.className=h.tagName==="H3"?"h3":"h2";a.addEventListener("click",function(e){e.preventDefault();h.scrollIntoView({behavior:"smooth"})});toc.appendChild(a)});
}
function onScroll(){
  var p=pages[current];if(!p)return;
  var r=p.getBoundingClientRect(),vh=window.innerHeight;var tot=r.height-vh+100;var pct=tot>0?Math.min(1,Math.max(0,(-r.top+60)/tot)):1;
  $("#progBar").style.width=(pct*100)+"%";
  var hs=$$("h2,h3",p),cur=null;hs.forEach(function(h){if(h.getBoundingClientRect().top<120)cur=h});
  $$("#toc a").forEach(function(a){a.classList.toggle("cur",cur&&a.getAttribute("href")==="#"+cur.id)});
}
window.addEventListener("scroll",onScroll,{passive:true});
window.addEventListener("hashchange",function(){show(location.hash.slice(1))});
$$(".grp>button").forEach(function(b){b.addEventListener("click",function(){var g=b.parentNode;g.classList.toggle("closed");b.setAttribute("aria-expanded",!g.classList.contains("closed"))})});
$("#menuBtn").addEventListener("click",function(){document.body.classList.toggle("nav-open")});
$("#scrim").addEventListener("click",function(){document.body.classList.remove("nav-open")});

/* ---------- search ---------- */
var idx=[];
function buildIndex(){Object.keys(pages).forEach(function(id){var p=pages[id];var pt=p.getAttribute("data-title");idx.push({t:pt,s:"Page",h:"#"+id,k:(pt+" "+(p.getAttribute("data-kw")||"")).toLowerCase()});
  $$("h2,h3",p).forEach(function(h){var nxt=h.nextElementSibling;var body=nxt?nxt.textContent.slice(0,240):"";idx.push({t:h.textContent,s:pt,h:"#"+h.id,k:(h.textContent+" "+body).toLowerCase()})})})}
var q=$("#q"),res=$("#results"),sel=-1;
function runSearch(){var v=q.value.trim().toLowerCase();if(!v){res.classList.remove("open");return}
  var terms=v.split(/\s+/);var hits=idx.filter(function(e){return terms.every(function(t){return e.k.indexOf(t)>=0})}).sort(function(a,b){var at=a.t.toLowerCase().indexOf(terms[0])>=0?0:1,bt=b.t.toLowerCase().indexOf(terms[0])>=0?0:1;return at-bt}).slice(0,12);
  res.innerHTML=hits.length?hits.map(function(h,i){return '<a href="'+h.h+'" role="option">'+h.t.replace(/</g,"&lt;")+'<small>'+h.s+'</small></a>'}).join(""):'<div class="none">No matches. Try "KV cache", "RAG" or "guardrails".</div>';
  res.classList.add("open");sel=-1}
q.addEventListener("input",runSearch);
q.addEventListener("keydown",function(e){var as=$$("a",res);if(e.key==="ArrowDown"){sel=Math.min(as.length-1,sel+1);e.preventDefault()}else if(e.key==="ArrowUp"){sel=Math.max(0,sel-1);e.preventDefault()}else if(e.key==="Enter"){if(as[Math.max(0,sel)]){location.hash=as[Math.max(0,sel)].getAttribute("href");res.classList.remove("open");q.blur()}}else if(e.key==="Escape"){res.classList.remove("open");q.blur()}
  as.forEach(function(a,i){a.classList.toggle("sel",i===sel)})});
res.addEventListener("click",function(){res.classList.remove("open");q.value=""});
document.addEventListener("click",function(e){if(!e.target.closest(".search"))res.classList.remove("open")});
document.addEventListener("keydown",function(e){if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();q.focus();q.select()}});

/* ---------- question bank ---------- */
function initQB(){
  var t=$("#qb-table");if(!t)return;var rows=$$("tbody tr",t);var cat="all",lvl="all";
  function apply(){var v=($("#qb-search").value||"").toLowerCase();var n=0;rows.forEach(function(r){var ok=(cat==="all"||r.getAttribute("data-cat")===cat)&&(lvl==="all"||r.getAttribute("data-lvl")===lvl)&&(!v||r.textContent.toLowerCase().indexOf(v)>=0);r.style.display=ok?"":"none";if(ok)n++});$("#qb-count").textContent=n+" of "+rows.length+" questions"}
  $$(".chip[data-cat]").forEach(function(c){c.addEventListener("click",function(){cat=c.getAttribute("data-cat");$$(".chip[data-cat]").forEach(function(x){x.setAttribute("aria-pressed",x===c)});apply()})});
  $$(".chip[data-lvl]").forEach(function(c){c.addEventListener("click",function(){lvl=c.getAttribute("data-lvl");$$(".chip[data-lvl]").forEach(function(x){x.setAttribute("aria-pressed",x===c)});apply()})});
  $("#qb-search").addEventListener("input",apply);apply();
}

buildChrome();buildIndex();paintDone();initQB();
show(location.hash.slice(1));
})();
