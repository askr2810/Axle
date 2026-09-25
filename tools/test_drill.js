// Test av grunnbegrep-kortene (drill.js): unike id-er, fire ulike alternativer, KaTeX og ikke norsk i engelsk.
const fs=require('fs'),path=require('path'),os=require('os');const ROOT=path.join(__dirname,'..');
const katex=require(ROOT+'/vendor/katex.min.js');
const TMP=path.join(os.tmpdir(),'axle_dr_'+process.pid+'.js');
let src='var LANG="nb";const T=(a,b)=>LANG==="en"?b:a;const esc=s=>s;const shuffle=a=>a;const dayKey=()=>"2026-01-01";\n'+fs.readFileSync(ROOT+'/drill.js','utf8')+'\nmodule.exports={DRILL,DR_TAGS,setL:l=>LANG=l,drText};';
fs.writeFileSync(TMP,src);const M=require(TMP);fs.unlinkSync(TMP);
let n=0,bad=0;const ids=new Set();
for(const lang of ['nb','en']){M.setL(lang);
 for(const c of M.DRILL){ if(lang==='nb'){ if(ids.has(c[0])) {console.log('dup id',c[0]);bad++;} ids.add(c[0]); if(!M.DR_TAGS[c[1]]){console.log('tag',c[0]);bad++;} if(c[4].length!==3){console.log('wrongs',c[0]);bad++;} }
  const strs=[c[2],c[3],...c[4],c[5]].map(M.drText);
  const opts=[c[3],...c[4]].map(M.drText); if(new Set(opts).size!==4){console.log('dup opt',c[0]);bad++;}
  for(const s of strs){ if(typeof s!=='string'){console.log('nonstr',c[0]);bad++;continue;}
   const parts=s.replace(/\{,\}/g,lang==='en'?'.':'{,}').split('$'); if(parts.length%2===0){console.log('unbal $',lang,c[0],s.slice(0,60));bad++;}
   parts.forEach((p,i)=>{ if(i%2){ n++; try{katex.renderToString(p,{throwOnError:true,output:'mathml'});}catch(e){bad++;console.log('KX',lang,c[0],e.message.split('\n')[0].slice(0,90),'::',p.slice(0,60));} } });
   if(lang==='en'){ const tx=s.replace(/\\text\{[^}]*\}/g,''); if(/[æøåÆØÅ]/.test(tx)){console.log('NO in en',c[0],s.slice(0,70));bad++;} }
  }}}
console.log('cards',M.DRILL.length,'math',n,'bad',bad);
if(bad) process.exit(1);
