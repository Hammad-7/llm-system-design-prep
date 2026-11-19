D["llm-caching-where"]={w:790,h:330,label:"Where to cache in an LLM system: a CDN at the edge for static AI outputs; semantic and retrieval caches beside the app server; an exact response cache in the LLM gateway; and inside the model server a KV prefix cache that spills from GPU memory to CPU memory to SSD.",
 nodes:[
  {id:"u",x:10,y:36,w:70,h:72,t:"User",s:"person"},
  {id:"cdn",x:105,y:42,w:115,h:62,t:"CDN / edge",sub:"static AI output",c:"gray",fs:15},
  {id:"app",x:255,y:42,w:120,h:62,t:"App server",c:"orange",fs:16},
  {id:"gw",x:410,y:42,w:130,h:62,t:"LLM gateway",c:"purple",fs:16},
  {id:"ms",x:580,y:36,w:190,h:74,t:"Model server",sub:"or provider API",c:"blue",fs:17},
  {id:"c1",x:245,y:170,w:140,h:84,t:"Semantic +\nretrieval caches",s:"db",c:"teal",fs:14},
  {id:"c2",x:405,y:170,w:140,h:84,t:"Exact response\ncache",s:"db",c:"teal",fs:14},
  {id:"k1",x:600,y:150,w:150,h:40,t:"GPU HBM (hot KV)",c:"teal",fs:14},
  {id:"k2",x:600,y:210,w:150,h:40,t:"CPU DRAM",c:"teal",fs:14},
  {id:"k3",x:600,y:270,w:150,h:40,t:"Local SSD / remote",c:"teal",fs:14}
 ],
 edges:[{a:"u",b:"cdn"},{a:"cdn",b:"app"},{a:"app",b:"gw"},{a:"gw",b:"ms"},{a:"app",b:"c1",bi:1},{a:"gw",b:"c2",bi:1},
  {a:"ms",b:"k1",bi:1},{a:"k1",b:"k2",t:"offload",lp:[700,200]},{a:"k2",b:"k3",lp:[700,260],t:"spill"}],
 notes:[{x:180,y:290,t:"each tier: cheaper and bigger, but slower to load",a:"middle",fs:14,c:"gray"}]};
D["llm-caching-prefix-tree"]={w:770,h:320,label:"Prefix tree of cached KV state: every request shares the system prompt and tools at the root; tenants branch with their own knowledge; conversations branch below that. A new request reuses the longest cached path and pays prefill only for its new suffix.",
 nodes:[
  {id:"r",x:255,y:16,w:260,h:62,t:"System prompt + tools",sub:"shared by every request",c:"blue",fs:16},
  {id:"a",x:80,y:122,w:220,h:56,t:"Tenant A knowledge",c:"teal",fs:15},
  {id:"b",x:470,y:122,w:220,h:56,t:"Tenant B knowledge",c:"teal",fs:15},
  {id:"a1",x:10,y:228,w:150,h:52,t:"Conversation 1",c:"purple",fs:14},
  {id:"a2",x:190,y:228,w:150,h:52,t:"Conversation 2",c:"purple",fs:14},
  {id:"b1",x:420,y:228,w:150,h:52,t:"Conversation 3",c:"purple",fs:14},
  {id:"b2",x:605,y:228,w:155,h:52,t:"new request",sub:"only this is prefilled",c:"orange",fs:14,dash:1}
 ],
 edges:[{a:"r",b:"a"},{a:"r",b:"b"},{a:"a",b:"a1"},{a:"a",b:"a2"},{a:"b",b:"b1"},{a:"b",b:"b2",c:"orange",t:"hit up to here"}],
 notes:[{x:385,y:306,t:"evict leaves first (LRU): the shared root is the last thing to go",a:"middle",fs:14}]};
D["llm-caching-semantic"]={w:790,h:300,label:"Semantic cache: the query is normalized and scoped by tenant, embedded, and looked up in a per-tenant cache index; if the best match's similarity is above a threshold the cached answer is returned, otherwise the LLM answers and the result is written back if it is cacheable.",
 nodes:[
  {id:"q",x:10,y:100,w:90,h:50,t:"query",c:"gray",fs:15,s:"pill"},
  {id:"sc",x:130,y:92,w:135,h:66,t:"Scope +\nnormalize",sub:"tenant · model",c:"purple",fs:15},
  {id:"em",x:295,y:92,w:100,h:66,t:"Embed",c:"teal",fs:16},
  {id:"an",x:425,y:84,w:150,h:84,t:"Cache index",sub:"per tenant",s:"db",c:"teal",fs:15},
  {id:"dec",x:610,y:92,w:160,h:66,t:"similarity ≥ τ ?",c:"orange",fs:15},
  {id:"hit",x:630,y:10,w:120,h:44,t:"return cached",c:"green",fs:14,s:"pill"},
  {id:"llm",x:610,y:214,w:160,h:60,t:"LLM",c:"blue",fs:17},
  {id:"wb",x:390,y:214,w:180,h:60,t:"Write back",sub:"if cacheable · TTL",c:"gray",fs:15}
 ],
 edges:[{a:"q",b:"sc"},{a:"sc",b:"em"},{a:"em",b:"an"},{a:"an",b:"dec",t:"top-1"},{a:"dec",b:"hit",t:"yes",c:"teal"},{a:"dec",b:"llm",t:"no"},{a:"llm",b:"wb"},{a:"wb",b:"an",d:1}]};
