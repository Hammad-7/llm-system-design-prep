D["design-llm-gateway-pipeline"]={w:760,h:370,label:"Request pipeline inside the gateway: the client's request is authenticated by virtual key, checked against policy and redacted, a token budget is reserved, the response cache is checked, the request is routed with fallback, the response is streamed back without buffering through an optional output guard, and on finish usage is reconciled and a usage event is emitted.",
 nodes:[
  {id:"au",x:20,y:30,w:150,h:70,t:"Authenticate",sub:"virtual key → policy",c:"gray",fs:15},
  {id:"po",x:200,y:30,w:150,h:70,t:"Policy + redact",sub:"model allowlist, PII",c:"red",fs:15},
  {id:"rs",x:380,y:30,w:150,h:70,t:"Reserve budget",sub:"input + max_tokens",c:"teal",fs:15},
  {id:"ca",x:560,y:30,w:170,h:70,t:"Cache lookup",sub:"opt-in, per tenant",c:"gray",fs:15},
  {id:"cl",x:20,y:160,w:70,h:72,t:"Client",s:"person"},
  {id:"og",x:200,y:166,w:150,h:70,t:"Output guard",sub:"optional, windowed",c:"red",fs:15},
  {id:"sp",x:380,y:166,w:150,h:70,t:"Stream proxy",sub:"flush every chunk",c:"orange",fs:15},
  {id:"rt",x:560,y:166,w:170,h:70,t:"Route + fallback",sub:"health · retries",c:"purple",fs:15},
  {id:"rc",x:380,y:282,w:150,h:70,t:"Reconcile",sub:"refund · usage event",c:"green",fs:15},
  {id:"pv",x:600,y:290,w:130,h:56,t:"Provider",c:"blue",fs:16}
 ],
 edges:[{a:"cl",b:"au",t:"request"},{a:"au",b:"po"},{a:"po",b:"rs"},{a:"rs",b:"ca"},{a:"ca",b:"rt",t:"miss"},
  {a:"rt",b:"pv",bi:1},{a:"rt",b:"sp",t:"chunks"},{a:"sp",b:"og"},{a:"og",b:"cl",t:"SSE"},{a:"sp",b:"rc",d:1,t:"on finish"}]};
D["design-llm-gateway-final"]={w:860,h:470,label:"Final LLM gateway design: team services call stateless gateway pods through a regional load balancer; pods check budgets and limits in a Redis cluster, consult an opt-in response cache, and stream requests to model providers including Anthropic, OpenAI, Gemini, Bedrock and self-hosted vLLM; a config service fed by an admin UI pushes keys, routes and policies to pods for hot reload; pods emit usage events to Kafka, which loads a warehouse for cost attribution.",
 zones:[{x:90,y:8,w:400,h:112,t:"Control plane",c:"purple"},{x:90,y:140,w:400,h:318,t:"Data plane (per region, multi-AZ)",c:"orange"}],
 nodes:[
  {id:"ad",x:110,y:40,w:150,h:64,t:"Admin UI / API",c:"gray",fs:15},
  {id:"cf",x:310,y:36,w:165,h:72,t:"Config service",sub:"keys · routes · policies",c:"purple",fs:15},
  {id:"sv",x:10,y:220,w:70,h:72,t:"Teams",s:"person"},
  {id:"lb",x:110,y:226,w:110,h:62,t:"Regional\nLB",c:"gray",fs:15},
  {id:"gw",x:290,y:200,w:180,h:112,t:"Gateway pods",sub:"stateless · streaming\nproxy · policy",c:"orange",fs:17},
  {id:"rd",x:110,y:350,w:150,h:90,t:"Redis cluster\n(limits, budgets)",s:"db",c:"teal",fs:14},
  {id:"rc",x:300,y:350,w:160,h:90,t:"Response\ncache",s:"db",c:"gray",fs:15},
  {id:"pv",x:560,y:190,w:285,h:132,t:"Model providers",sub:"Anthropic · OpenAI · Gemini\nBedrock · self-hosted vLLM",c:"blue",fs:17},
  {id:"kf",x:560,y:372,w:130,h:66,t:"Kafka",sub:"usage events",c:"green",fs:16},
  {id:"wh",x:720,y:360,w:125,h:90,t:"Warehouse",s:"db",c:"gray",fs:15}
 ],
 edges:[{a:"ad",b:"cf"},{a:"cf",b:"gw",d:1,t:"push (hot reload)",lp:[390,152]},{a:"sv",b:"lb"},{a:"lb",b:"gw"},
  {a:"gw",b:"rd",t:"reserve /\nreconcile",lp:[230,322]},{a:"gw",b:"rc",d:1,t:"opt-in"},{a:"gw",b:"pv",t:"stream"},
  {a:"gw",b:"kf",t:"async",lp:[520,352]},{a:"kf",b:"wh"}]};
