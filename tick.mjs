// Public scheduler only: application code/data and credentials stay private.
const origin='https://uzbeknewssdr.vercel.app',interval=300000,cycles=66;
const secret=process.env.WORKER_SECRET;
if(!secret)throw Error('Worker credential unavailable');
const started=Date.now();
for(let tick=0;tick<cycles;tick++){
 const delay=started+tick*interval-Date.now();if(delay>0)await new Promise(resolve=>setTimeout(resolve,delay));
 const results=await Promise.all(['crawl','worker'].map(async endpoint=>{
  try{const r=await fetch(origin+'/api/'+endpoint,{method:'POST',headers:{authorization:'Bearer '+secret,'x-sdr-scheduler':'github-actions','x-sdr-run-id':process.env.GITHUB_RUN_ID??''},signal:AbortSignal.timeout(280000)});
   let body;try{body=await r.json();}catch{}
   return {endpoint,status:r.status,...(endpoint==='worker'&&r.ok?{receipt:body?.id}:{})};
  }catch{return {endpoint,status:'unconfirmed'};}
 }));
 console.log(JSON.stringify({at:new Date().toISOString(),tick:tick+1,results}));
 // An unconfirmed result is not immediately retried; durable queues reconcile next tick.
}
