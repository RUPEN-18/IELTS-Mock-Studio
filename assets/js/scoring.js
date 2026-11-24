/* Original scoring utilities. Conversion thresholds are approximate. */
(function(root){
 'use strict';
 const listeningBands=[[39,9],[37,8.5],[35,8],[32,7.5],[30,7],[26,6.5],[23,6],[18,5.5],[16,5],[13,4.5],[11,4],[8,3.5],[6,3],[4,2.5],[3,2],[2,1.5],[1,1],[0,0]];
 const readingBands=[[39,9],[37,8.5],[35,8],[33,7.5],[30,7],[27,6.5],[23,6],[19,5.5],[15,5],[13,4.5],[10,4],[8,3.5],[6,3],[4,2.5],[3,2],[2,1.5],[1,1],[0,0]];
 const bandFromRaw=(raw,skill)=>{if(!Number.isInteger(raw)||raw<0||raw>40)return null;const table=skill==='reading'?readingBands:listeningBands;return table.find(([min])=>raw>=min)[1]};
 const nearestHalf=n=>Math.round(n*2)/2;
 const officialRound=n=>{const a=Math.floor(n);const f=n-a;return f<.25?a:f<.75?a+.5:a+1};
 const norm=s=>String(s??'').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
 const correct=(given,answer,accept=[])=>[answer,...accept].some(x=>norm(given)===norm(x));
 const mean=values=>values.length?values.reduce((a,b)=>a+b,0)/values.length:null;
 const validBand=n=>n!==''&&n!==null&&n!==undefined&&Number.isFinite(Number(n))&&Number(n)>=0&&Number(n)<=9;
 const speaking=(vals)=>{if(!Array.isArray(vals)||vals.length!==4||!vals.every(validBand))return null;return nearestHalf(mean(vals.map(Number)))};
 const writing=(t1,t2)=>{if(!Array.isArray(t1)||!Array.isArray(t2)||t1.length!==4||t2.length!==4||![...t1,...t2].every(validBand))return null;return nearestHalf((mean(t1.map(Number))+2*mean(t2.map(Number)))/3)};
 root.IELTS_SCORING={bandFromRaw,nearestHalf,officialRound,norm,correct,mean,validBand,speaking,writing};
})(typeof window==='undefined'?globalThis:window);
