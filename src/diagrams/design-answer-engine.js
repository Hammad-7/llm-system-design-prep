D["design-answer-engine-basic"]={w:800,h:240,label:"Basic answer pipeline: the user's question is rewritten, sent to a search API, the top pages are fetched and extracted, the LLM writes an answer from numbered sources, and the answer streams back to the user with citations.",
 nodes:[
  {id:"u",x:10,y:62,w:70,h:72,t:"User",s:"person"},
  {id:"rw",x:110,y:66,w:120,h:64,t:"Query\nrewrite",c:"purple",fs:15},
  {id:"se",x:260,y:66,w:120,h:64,t:"Search API",sub:"top 10 URLs",c:"teal",fs:15},
  {id:"fe",x:410,y:66,w:120,h:64,t:"Fetch +\nextract",c:"blue",fs:15},
  {id:"ll",x:560,y:66,w:120,h:64,t:"LLM answer",sub:"numbered sources",c:"orange",fs:15},
  {id:"ci",x:700,y:150,w:90,h:56,t:"[1] [2]\ncitations",c:"green",fs:13}
 ],
 edges:[{a:"u",b:"rw",t:"question"},{a:"rw",b:"se"},{a:"se",b:"fe"},{a:"fe",b:"ll",t:"text"},{a:"ll",b:"ci",d:1},
  {a:"ll",b:"u",as:"b0.5",via:[[620,200],[45,200]],bs:"b",t:"streamed answer (SSE)",lp:[330,200]}]};
D["design-answer-engine-crawl"]={w:760,h:310,label:"Indexing pipeline: sitemaps, RSS and news feeds seed a URL frontier prioritized by change rate; a polite crawler fleet fetches pages; parsing extracts text and new links back to the frontier; quality and spam scoring dedupes and scores pages; chunking and embedding write news into a fresh tier within minutes and everything into the main index, which periodically absorbs the fresh tier.",
 nodes:[
  {id:"sd",x:10,y:36,w:140,h:76,t:"Sitemaps, RSS,\nnews feeds",c:"gray",fs:14},
  {id:"fr",x:190,y:36,w:140,h:76,t:"URL frontier",sub:"priority by\nchange rate",c:"purple",fs:15},
  {id:"cr",x:370,y:36,w:160,h:76,t:"Crawler fleet",sub:"robots.txt · politeness",c:"blue",fs:15},
  {id:"pa",x:570,y:36,w:170,h:76,t:"Parse + extract",sub:"text, links, dates",c:"blue",fs:15},
  {id:"qs",x:570,y:186,w:170,h:76,t:"Quality + spam",sub:"dedupe · authority",c:"red",fs:15},
  {id:"em",x:370,y:186,w:160,h:76,t:"Chunk + embed",c:"teal",fs:15},
  {id:"fi",x:190,y:178,w:140,h:92,t:"Fresh tier\n(minutes)",s:"db",c:"teal",fs:14},
  {id:"mi",x:10,y:178,w:140,h:92,t:"Main index\n(days–weeks)",s:"db",c:"teal",fs:14}
 ],
 edges:[{a:"sd",b:"fr"},{a:"fr",b:"cr"},{a:"cr",b:"pa"},{a:"pa",b:"qs"},{a:"qs",b:"em"},{a:"em",b:"fi",t:"news"},
  {a:"em",b:"mi",as:"b0.5",via:[[450,292],[80,292]],bs:"b",t:"everything",lp:[265,292]},
  {a:"pa",b:"fr",d:1,as:"t0.5",via:[[655,14],[260,14]],bs:"t",t:"new links",lp:[455,14]},
  {a:"fi",b:"mi",d:1}]};
D["design-answer-engine-final"]={w:860,h:450,label:"Final answer engine design: an API edge checks an answer cache, then an answer orchestrator calls a small-model query planner and fans out queries to a search service over the web index, which is fed by crawlers and a news lane. Top URLs go to a fetch and extract service with a page cache, a chunk ranker picks the best chunks for the LLM gateway in front of the answer models, a citation verifier checks the token stream before it is relayed, and logs and feedback are written asynchronously.",
 nodes:[
  {id:"qc",x:100,y:26,w:125,h:86,t:"Answer\ncache",s:"db",c:"gray",fs:15},
  {id:"pl",x:262,y:36,w:170,h:66,t:"Query planner",sub:"small LLM",c:"purple",fs:16},
  {id:"si",x:478,y:36,w:160,h:66,t:"Search service",sub:"own index + API",c:"teal",fs:16},
  {id:"ix",x:680,y:22,w:165,h:92,t:"Web index\n(BM25 + vector)",s:"db",c:"teal",fs:14},
  {id:"u",x:10,y:186,w:70,h:72,t:"User",s:"person"},
  {id:"api",x:100,y:192,w:125,h:62,t:"API / Edge",sub:"auth · limits",c:"gray",fs:16},
  {id:"or",x:262,y:180,w:170,h:86,t:"Answer\nOrchestrator",sub:"deadlines · fan-out",c:"orange",fs:16},
  {id:"fe",x:478,y:190,w:160,h:66,t:"Fetch + extract",sub:"page cache",c:"blue",fs:16},
  {id:"rk",x:680,y:190,w:165,h:66,t:"Chunk ranker",sub:"cross-encoder",c:"teal",fs:16},
  {id:"ev",x:100,y:340,w:125,h:86,t:"Logs +\nfeedback",s:"db",c:"gray",fs:15},
  {id:"cv",x:262,y:348,w:170,h:66,t:"Citation verifier",sub:"sentence-level",c:"red",fs:15},
  {id:"lg",x:478,y:348,w:160,h:66,t:"LLM Gateway",sub:"prefix cache",c:"purple",fs:16},
  {id:"md",x:680,y:348,w:165,h:66,t:"Answer models",c:"blue",fs:16}
 ],
 edges:[{a:"u",b:"api",bi:1,t:"SSE",lp:[90,170]},{a:"api",b:"or",bi:1},{a:"api",b:"qc",d:1,t:"hit?"},{a:"or",b:"pl",t:"plan"},
  {a:"or",b:"si",t:"parallel\nqueries",lp:[470,140]},{a:"si",b:"ix"},{a:"or",b:"fe",t:"top URLs"},{a:"fe",b:"rk"},
  {a:"rk",b:"lg",t:"best chunks",lp:[640,300]},{a:"lg",b:"md"},{a:"lg",b:"cv",t:"tokens"},{a:"cv",b:"or",t:"verified"},{a:"or",b:"ev",d:1,t:"async"}],
 notes:[{x:762,y:150,t:"fed by crawlers + news lane",a:"middle",fs:13}]};
