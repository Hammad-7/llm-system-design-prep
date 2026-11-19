D["gateway-reliability-arch"]={w:800,h:440,label:"LLM gateway: apps send requests through auth and virtual keys, token quotas backed by Redis counters, PII redaction and guardrails, a response cache, a router, and a retry, circuit-breaker and fallback layer that reaches provider A, provider B or a self-hosted model; every call writes tokens, cost and latency to a usage log.",
 zones:[{x:125,y:20,w:430,h:300,t:"LLM gateway",c:"purple"}],
 nodes:[
  {id:"ap",x:10,y:136,w:100,h:70,t:"Apps +\nagents",c:"gray",fs:15},
  {id:"au",x:150,y:56,w:170,h:56,t:"Auth +\nvirtual keys",c:"gray",fs:14},
  {id:"rl",x:150,y:144,w:170,h:56,t:"Token quotas\n+ rate limits",c:"red",fs:14},
  {id:"gd",x:150,y:232,w:170,h:56,t:"PII redaction\n+ guardrails",c:"red",fs:14},
  {id:"ca",x:365,y:56,w:170,h:56,t:"Response cache",c:"teal",fs:14},
  {id:"ro",x:365,y:144,w:170,h:56,t:"Router\nrules / learned",c:"purple",fs:14},
  {id:"rf",x:365,y:232,w:170,h:56,t:"Retries, breakers\n+ fallbacks",c:"orange",fs:14},
  {id:"pa",x:610,y:46,w:170,h:56,t:"Provider A",c:"blue",fs:15},
  {id:"pb",x:610,y:136,w:170,h:56,t:"Provider B",c:"blue",fs:15},
  {id:"sh",x:610,y:226,w:170,h:62,t:"Self-hosted",sub:"vLLM / SGLang",c:"blue",fs:15},
  {id:"rd",x:160,y:345,w:150,h:80,t:"Redis",sub:"counters",s:"db",c:"red",fs:15},
  {id:"lg",x:375,y:345,w:150,h:80,t:"Usage log",sub:"cost per team",s:"db",c:"gray",fs:15}
 ],
 edges:[{a:"ap",b:"au",as:"t0.5",bs:"l0.5",via:[[60,84]]},{a:"au",b:"rl"},{a:"rl",b:"gd"},{a:"gd",b:"ca",as:"r0.3",bs:"l0.7"},{a:"ca",b:"ro"},{a:"ro",b:"rf"},
  {a:"rf",b:"pa",as:"r0.2",bs:"l0.7"},{a:"rf",b:"pb",d:1,as:"r0.4",bs:"l0.7"},{a:"rf",b:"sh",d:1,as:"r0.7",bs:"l0.6"},
  {a:"rl",b:"rd",bi:1,as:"l0.5",via:[[136,172],[136,385]],bs:"l0.5"},{a:"rf",b:"lg",d:1,t:"tokens · cost · latency"}]};
D["gateway-reliability-ratelimit"]={w:800,h:330,label:"Reserve then reconcile: the gateway estimates a request's cost as input tokens plus max_tokens, atomically reserves that amount from the key's token bucket in Redis, rejects with 429 and Retry-After if the bucket is short, otherwise forwards and streams, then reconciles the actual usage and refunds the unused reservation.",
 nodes:[
  {id:"q",x:10,y:110,w:90,h:50,t:"request",c:"gray",fs:15,s:"pill"},
  {id:"es",x:130,y:100,w:150,h:70,t:"Estimate",sub:"input + max_tokens",c:"purple",fs:15},
  {id:"rs",x:320,y:100,w:150,h:70,t:"Reserve",sub:"atomic Lua script",c:"red",fs:15},
  {id:"rj",x:320,y:10,w:150,h:46,t:"429 + Retry-After",c:"red",fs:13,s:"pill"},
  {id:"rd",x:320,y:230,w:150,h:84,t:"Redis",sub:"bucket per key",s:"db",c:"red",fs:15},
  {id:"fw",x:510,y:100,w:120,h:70,t:"Forward\n+ stream",c:"blue",fs:15},
  {id:"rc",x:665,y:100,w:125,h:70,t:"Reconcile",sub:"refund unused",c:"green",fs:15}
 ],
 edges:[{a:"q",b:"es"},{a:"es",b:"rs"},{a:"rs",b:"rd",bi:1,t:"check + debit"},{a:"rs",b:"rj",c:"red",t:"short"},{a:"rs",b:"fw",t:"ok"},{a:"fw",b:"rc",t:"usage"},
  {a:"rc",b:"rd",d:1,t:"credit back",as:"b0.5",bs:"r0.5",via:[[727,272]]}]};
D["gateway-reliability-breaker"]={w:760,h:260,label:"Circuit breaker states: closed lets traffic flow; when the error rate crosses a threshold it opens and fails fast to a fallback; after a cooldown it goes half-open and sends a few probe requests; success closes it, failure reopens it.",
 nodes:[
  {id:"cl",x:40,y:30,w:180,h:74,t:"Closed",sub:"traffic flows",c:"green",fs:18},
  {id:"op",x:540,y:30,w:180,h:74,t:"Open",sub:"fail fast → fallback",c:"red",fs:18},
  {id:"ho",x:290,y:166,w:180,h:74,t:"Half-open",sub:"a few probe requests",c:"orange",fs:18}
 ],
 edges:[{a:"cl",b:"op",t:"error rate > threshold\nin rolling window"},
  {a:"op",b:"ho",as:"b0.25",bs:"r0.3",t:"cooldown elapses",lp:[530,150]},
  {a:"ho",b:"op",as:"r0.8",bs:"b0.75",t:"probe fails",lp:[630,136],c:"red"},
  {a:"ho",b:"cl",as:"l0.5",bs:"b0.5",t:"probes succeed",c:"teal"}]};
