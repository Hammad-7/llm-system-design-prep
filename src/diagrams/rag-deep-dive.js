D["rag-deep-dive-ingest"]={w:800,h:330,label:"RAG ingestion pipeline: connectors feed a change feed of webhooks, CDC and polling; documents are parsed with layout analysis and OCR, cleaned and deduplicated, chunked by structure, enriched with context headers, metadata and ACLs, embedded as dense and sparse vectors, and upserted into a vector and BM25 index backed by a document store. A separate ACL and deletion sync path tombstones or re-permissions chunks.",
 nodes:[
  {id:"src",x:10,y:30,w:130,h:76,t:"Connectors",sub:"Drive · Confluence\nZendesk · S3",c:"gray",fs:15},
  {id:"ev",x:180,y:30,w:120,h:76,t:"Change feed",sub:"webhooks · CDC\n· polling",c:"gray",fs:15},
  {id:"ps",x:340,y:30,w:130,h:76,t:"Parse",sub:"layout · OCR\ntables · images",c:"blue",fs:16},
  {id:"cl",x:510,y:30,w:115,h:76,t:"Clean +\ndedup",c:"blue",fs:15},
  {id:"ch",x:665,y:30,w:125,h:76,t:"Chunk",sub:"structure-aware",c:"blue",fs:16},
  {id:"en",x:665,y:160,w:125,h:80,t:"Enrich",sub:"context header\nmetadata · ACL",c:"purple",fs:16},
  {id:"em",x:510,y:160,w:115,h:80,t:"Embed",sub:"dense + sparse",c:"purple",fs:16},
  {id:"ix",x:300,y:150,w:160,h:96,t:"Vector +\nBM25 index",s:"db",c:"teal",fs:16},
  {id:"ds",x:60,y:155,w:150,h:86,t:"Doc + chunk\nstore",s:"db",c:"gray",fs:15},
  {id:"acl",x:520,y:272,w:210,h:46,t:"ACL + deletion sync",c:"red",fs:15}
 ],
 edges:[{a:"src",b:"ev"},{a:"ev",b:"ps"},{a:"ps",b:"cl"},{a:"cl",b:"ch"},{a:"ch",b:"en"},{a:"en",b:"em"},{a:"em",b:"ix",t:"upsert"},{a:"ix",b:"ds",bi:1},
  {a:"ev",b:"acl",via:[[240,295]],as:"b",bs:"l",c:"red",d:1},{a:"acl",b:"ix",t:"tombstone",c:"red",d:1}]};
D["rag-deep-dive-query"]={w:820,h:370,label:"RAG query pipeline: the user's question is understood (rewritten, split, routed, optionally expanded with HyDE), then dense ANN, BM25 and structured SQL or API retrieval run in parallel; results are fused with reciprocal rank fusion, reranked by a cross-encoder from about 50 to 8 chunks, and assembled into a prompt for a cited, verified answer.",
 nodes:[
  {id:"u",x:10,y:126,w:70,h:72,t:"User",s:"person"},
  {id:"qu",x:105,y:124,w:135,h:76,t:"Understand",sub:"rewrite · split\nHyDE · route",c:"purple",fs:16},
  {id:"vs",x:295,y:20,w:135,h:58,t:"Dense ANN",c:"teal",fs:15},
  {id:"bm",x:295,y:133,w:135,h:58,t:"BM25 / sparse",c:"teal",fs:15},
  {id:"sq",x:295,y:246,w:135,h:58,t:"SQL / API tool",c:"teal",fs:15},
  {id:"fu",x:480,y:124,w:110,h:76,t:"Fuse",sub:"RRF",c:"blue",fs:16},
  {id:"rr",x:630,y:124,w:180,h:76,t:"Rerank",sub:"cross-encoder\ntop 50 → 8",c:"blue",fs:16},
  {id:"as",x:630,y:262,w:180,h:72,t:"Assemble + answer",sub:"cite · verify",c:"orange",fs:15}
 ],
 edges:[{a:"u",b:"qu"},{a:"qu",b:"vs"},{a:"qu",b:"bm"},{a:"qu",b:"sq"},{a:"vs",b:"fu"},{a:"bm",b:"fu"},{a:"sq",b:"fu"},{a:"fu",b:"rr"},{a:"rr",b:"as",t:"best chunks"}],
 notes:[{x:362,y:346,t:"every retriever applies the caller's ACL filter inside the search",a:"middle",fs:13,c:"red"}]};
D["rag-deep-dive-agentic"]={w:760,h:290,label:"Agentic RAG: an agent model receives the question, plans and calls search, read-document and SQL tools in a loop under a step budget, and returns a cited answer once it has enough evidence.",
 nodes:[
  {id:"q",x:10,y:100,w:95,h:56,t:"question",s:"pill",c:"gray",fs:15},
  {id:"ag",x:150,y:84,w:170,h:90,t:"Agent LLM",sub:"plan next step",c:"orange",fs:17},
  {id:"t1",x:420,y:14,w:160,h:56,t:"search(query)",c:"teal",fs:15},
  {id:"t2",x:420,y:100,w:160,h:56,t:"read(doc_id)",c:"teal",fs:15},
  {id:"t3",x:420,y:186,w:160,h:56,t:"sql(query)",c:"teal",fs:15},
  {id:"ans",x:630,y:96,w:120,h:64,t:"cited\nanswer",c:"green",fs:15}
 ],
 edges:[{a:"q",b:"ag"},{a:"ag",b:"t1",bi:1},{a:"ag",b:"t2",bi:1},{a:"ag",b:"t3",bi:1},
  {a:"ag",b:"ans",as:"b",bs:"b",via:[[235,268],[690,268]],t:"enough evidence",lp:[470,268],c:"green"}],
 notes:[{x:235,y:40,t:"loop until done\nor budget spent",a:"middle",fs:13,c:"orange"}]};
