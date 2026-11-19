D["context-engineering-compaction"]={w:780,h:300,label:"Compaction: before, an agent's context is about 92 percent full, mostly with old turns and tool results; after compaction, the system prompt, tools and memory file are unchanged, older turns are replaced by a short summary, the last few turns stay verbatim, and roughly half the window is free again.",
 nodes:[
  {id:"s1",x:10,y:50,w:150,h:64,t:"System prompt\n+ tool defs",c:"blue",fs:14},
  {id:"m1",x:166,y:50,w:86,h:64,t:"Memory\nfile",c:"teal",fs:14},
  {id:"h1",x:258,y:50,w:420,h:64,t:"Turns 1…N: messages + raw tool results",c:"purple",fs:15},
  {id:"o1",x:684,y:50,w:86,h:64,t:"Output\nreserve",c:"gray",fs:13,dash:1},
  {id:"s2",x:10,y:200,w:150,h:64,t:"System prompt\n+ tool defs",c:"blue",fs:14},
  {id:"m2",x:166,y:200,w:86,h:64,t:"Memory\nfile",c:"teal",fs:14},
  {id:"sm",x:258,y:200,w:120,h:64,t:"Summary of\nolder turns",c:"orange",fs:14},
  {id:"rc",x:384,y:200,w:150,h:64,t:"Last few turns\nverbatim",c:"purple",fs:14},
  {id:"fr",x:540,y:200,w:138,h:64,t:"free space",c:"gray",fs:14,dash:1},
  {id:"o2",x:684,y:200,w:86,h:64,t:"Output\nreserve",c:"gray",fs:13,dash:1}
 ],
 edges:[{a:"h1",b:"sm",as:"b0.15",bs:"t0.5",t:"summarize",lp:[318,157]},{a:"h1",b:"rc",as:"b0.75",bs:"t0.5",t:"keep recent",lp:[520,157]}],
 notes:[{x:390,y:24,t:"before: ~92% full, mostly stale tool output",a:"middle",fs:14,c:"red"},
  {x:131,y:157,t:"unchanged → cache still hits",a:"middle",fs:13,c:"blue"},
  {x:390,y:288,t:"after: ~50% full; the prefix cache for system + tools survives, the history cache does not",a:"middle",fs:13}]};
D["context-engineering-subagents"]={w:780,h:370,label:"Sub-agent isolation: a lead agent with a small context sends task briefs to three sub-agents; each sub-agent explores with tools in its own fresh context window and returns only a short summary to the lead.",
 nodes:[
  {id:"m",x:280,y:16,w:220,h:84,t:"Lead agent",sub:"plan + synthesis\nstays ~30K tokens",c:"orange",fs:17},
  {id:"a",x:30,y:170,w:200,h:80,t:"Sub-agent A",sub:"fresh context\nreads ~100K tokens",c:"blue",fs:16},
  {id:"b",x:290,y:170,w:200,h:80,t:"Sub-agent B",sub:"fresh context\nreads ~100K tokens",c:"blue",fs:16},
  {id:"c",x:550,y:170,w:200,h:80,t:"Sub-agent C",sub:"fresh context\nreads ~100K tokens",c:"blue",fs:16},
  {id:"t",x:30,y:300,w:720,h:50,t:"Search · file reads · web fetches · logs",c:"gray",fs:15}
 ],
 edges:[{a:"m",b:"a",bi:1,t:"brief ↓  summary ↑"},{a:"m",b:"b",bi:1},{a:"m",b:"c",bi:1,t:"≈1–2K tokens back"},
  {a:"a",b:"t",bi:1,bs:"t0.18"},{a:"b",b:"t",bi:1,bs:"t0.5"},{a:"c",b:"t",bi:1,bs:"t0.82"}]};
D["context-engineering-memory"]={w:780,h:400,label:"Long-term memory: the turn handler retrieves relevant memories and sends them with the conversation to the LLM; after the turn, the transcript goes through a queue to an asynchronous memory writer that extracts, deduplicates and resolves conflicts before upserting to the memory store; users can view, edit and delete memories directly.",
 nodes:[
  {id:"u",x:10,y:112,w:70,h:72,t:"User",s:"person"},
  {id:"app",x:120,y:116,w:150,h:70,t:"Turn handler",sub:"assembles context",c:"orange",fs:16},
  {id:"llm",x:330,y:20,w:130,h:56,t:"LLM",c:"blue",fs:17},
  {id:"rt",x:570,y:60,w:190,h:66,t:"Memory retrieval",sub:"relevance + recency",c:"teal",fs:15},
  {id:"q",x:120,y:240,w:130,h:56,t:"Event queue",c:"gray",fs:15},
  {id:"ex",x:330,y:230,w:170,h:72,t:"Memory writer",sub:"extract · dedupe · resolve",c:"purple",fs:15},
  {id:"st",x:570,y:200,w:190,h:100,t:"Memory store",sub:"facts · episodes · rules",s:"db",c:"teal",fs:16},
  {id:"ui",x:330,y:334,w:170,h:52,t:"User controls",sub:"view · edit · delete",c:"green",fs:14}
 ],
 edges:[{a:"u",b:"app",t:"message"},{a:"app",b:"llm",bi:1,t:"context +\nmemories",lp:[262,62]},{a:"app",b:"rt",t:"query"},{a:"rt",b:"st",bi:1,t:"search"},
  {a:"app",b:"q",d:1,t:"transcript (async)"},{a:"q",b:"ex"},{a:"ex",b:"st",t:"upsert"},{a:"ui",b:"st",c:"red",t:"hard delete",lp:[560,352]}]};
