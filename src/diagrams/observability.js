D["observability-trace"]={w:780,h:330,label:"An LLM request trace as a waterfall: a root span for the chat request contains a guard span, a retrieval span with embed, search and rerank children, a first model call that requests a tool, a CRM tool span, and a second model call; the first model span carries attributes such as model, input and output tokens, cached tokens, prompt version and cost.",
 nodes:[
  {id:"root",x:20,y:20,w:740,h:36,t:"POST /chat · trace 7f3a · 2.9 s",c:"gray",fs:14},
  {id:"g",x:20,y:68,w:70,h:32,t:"guard",c:"red",fs:13},
  {id:"rt",x:95,y:68,w:180,h:32,t:"retrieve 310 ms",c:"teal",fs:13},
  {id:"em",x:95,y:112,w:42,h:30,t:"emb",c:"teal",fs:11},
  {id:"se",x:142,y:112,w:58,h:30,t:"search",c:"teal",fs:11},
  {id:"rr",x:205,y:112,w:70,h:30,t:"rerank",c:"teal",fs:11},
  {id:"l1",x:280,y:68,w:230,h:32,t:"llm.chat #1 → tool_use",c:"orange",fs:13},
  {id:"tool",x:515,y:68,w:90,h:32,t:"tool: crm",c:"purple",fs:13},
  {id:"l2",x:610,y:68,w:150,h:32,t:"llm.chat #2",c:"orange",fs:13},
  {id:"att",x:280,y:175,w:330,h:120,t:"gen_ai.request.model = …\ngen_ai.usage.input_tokens = 5,812\ngen_ai.usage.output_tokens = 214\ngen_ai.usage.cache_read.input_tokens = 4,900\nprompt.version = support-v14\ncost_usd = 0.0071",c:"gray",fs:12}
 ],
 edges:[{a:"l1",b:"att",d:1,t:"span attributes"}],
 notes:[{x:20,y:318,t:"0 s",a:"start",fs:12},{x:760,y:318,t:"2.9 s",a:"end",fs:12}]};
D["observability-pipeline"]={w:860,h:360,label:"LLM telemetry pipeline: the app and LLM gateway emit OpenTelemetry spans and usage to a collector that redacts PII, samples and batches; data lands in a trace store, a metrics time-series database and a cost and usage warehouse; dashboards and alerts read metrics and cost; online evals score sampled traces, and failures they surface are triaged into eval dataset cases.",
 nodes:[
  {id:"gw",x:10,y:20,w:140,h:66,t:"LLM gateway",sub:"usage, cost",c:"purple",fs:15},
  {id:"app",x:10,y:135,w:140,h:80,t:"App + SDK",sub:"OTel spans\nper call",c:"blue",fs:15},
  {id:"col",x:210,y:135,w:150,h:80,t:"Collector",sub:"redact PII\nsample, batch",c:"red",fs:15},
  {id:"ts",x:430,y:20,w:150,h:84,t:"Trace store",s:"db",c:"gray",fs:15},
  {id:"mt",x:430,y:135,w:150,h:84,t:"Metrics\nTSDB",s:"db",c:"gray",fs:15},
  {id:"wh",x:430,y:250,w:150,h:84,t:"Cost +\nusage DW",s:"db",c:"gray",fs:15},
  {id:"ev",x:650,y:20,w:160,h:76,t:"Online evals",sub:"sampled judge",c:"orange",fs:15},
  {id:"dash",x:650,y:138,w:160,h:76,t:"Dashboards\n+ alerts",c:"green",fs:15},
  {id:"fb",x:650,y:262,w:160,h:66,t:"Eval datasets",sub:"failures → cases",c:"teal",fs:15}
 ],
 edges:[{a:"gw",b:"col"},{a:"app",b:"col"},{a:"col",b:"ts"},{a:"col",b:"mt"},{a:"col",b:"wh"},{a:"ts",b:"ev"},{a:"ev",b:"dash",t:"scores"},{a:"mt",b:"dash"},{a:"wh",b:"dash"},{a:"ev",b:"fb",as:"r",bs:"r",via:[[835,58],[835,295]],d:1,t:"triage",lp:[835,240]}]};
D["observability-rollout"]={w:780,h:240,label:"Rolling out a prompt or model change: a new version in the prompt registry passes offline evals, runs in shadow mode against live traffic, goes to a canary of 5 to 25 percent, then to everyone; the canary auto-rolls back on SLO or quality drops.",
 nodes:[
  {id:"reg",x:10,y:90,w:130,h:76,t:"Prompt\nregistry",sub:"v15",c:"purple",fs:15},
  {id:"off",x:180,y:90,w:120,h:76,t:"Offline\nevals",c:"teal",fs:15},
  {id:"sh",x:340,y:90,w:120,h:76,t:"Shadow",sub:"0% of users",c:"blue",fs:15},
  {id:"ca",x:500,y:90,w:120,h:76,t:"Canary",sub:"5% → 25%",c:"orange",fs:15},
  {id:"fl",x:660,y:90,w:110,h:76,t:"100%",c:"green",fs:16}
 ],
 edges:[{a:"reg",b:"off"},{a:"off",b:"sh"},{a:"sh",b:"ca"},{a:"ca",b:"fl"},
  {a:"ca",b:"reg",as:"t",bs:"t",via:[[560,36],[75,36]],t:"auto-rollback on SLO or quality drop",lp:[318,36],c:"red",d:1}],
 notes:[{x:390,y:212,t:"gates: quality score, refusal rate, TTFT p95, cost per request",a:"middle",fs:14,c:"gray"}]};
