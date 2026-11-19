D["numbers-to-know-ladder"]={w:820,h:250,label:"Latency ladder for one RAG chat turn: auth and rate limiting take about 1 to 5 milliseconds, query embedding 10 to 50, vector search 5 to 50, reranking 50 to 200, time to first token 0.2 to 2 seconds, and decoding a few hundred tokens takes several seconds at 30 to 150 tokens per second.",
 nodes:[
  {id:"a",x:10,y:70,w:112,h:76,t:"Auth + limits",sub:"~1–5 ms",c:"gray",fs:14},
  {id:"b",x:146,y:70,w:112,h:76,t:"Embed query",sub:"~5–200 ms",c:"blue",fs:14},
  {id:"c",x:282,y:70,w:112,h:76,t:"Vector + BM25",sub:"~5–50 ms",c:"blue",fs:14},
  {id:"d",x:418,y:70,w:112,h:76,t:"Rerank",sub:"~50–200 ms",c:"purple",fs:14},
  {id:"e",x:554,y:70,w:112,h:76,t:"TTFT",sub:"~0.2–2 s",c:"orange",fs:15},
  {id:"f",x:690,y:70,w:120,h:76,t:"Decode",sub:"30–150 tok/s\n→ seconds",c:"red",fs:15}
 ],
 edges:[{a:"a",b:"b"},{a:"b",b:"c"},{a:"c",b:"d"},{a:"d",b:"e"},{a:"e",b:"f"}],
 zones:[{x:4,y:30,w:534,h:150,t:"retrieval: tens to hundreds of ms",c:"blue"},{x:546,y:30,w:270,h:150,t:"generation: seconds",c:"red"}],
 notes:[{x:410,y:220,t:"Output length usually dominates: 400 tokens at 50 tok/s is 8 s, more than everything else combined.",a:"middle",fs:13}]};

D["numbers-to-know-method"]={w:820,h:230,label:"Estimation chain: from daily active users to requests per second at peak, to input and output tokens per second, then split into prefill compute and decode memory, which give GPUs or API dollars, followed by a sanity check.",
 nodes:[
  {id:"u",x:10,y:70,w:118,h:80,t:"Users",sub:"DAU × actions/day",c:"gray",fs:15},
  {id:"r",x:158,y:70,w:118,h:80,t:"Requests/s",sub:"÷ 86,400\n× 2–3 for peak",c:"orange",fs:15},
  {id:"t",x:306,y:70,w:130,h:80,t:"Tokens/s",sub:"in vs out\ncached vs not",c:"purple",fs:15},
  {id:"p",x:470,y:16,w:150,h:70,t:"Prefill",sub:"FLOPs → compute",c:"blue",fs:15},
  {id:"d",x:470,y:134,w:150,h:70,t:"Decode",sub:"KV + bandwidth",c:"teal",fs:15},
  {id:"g",x:660,y:70,w:150,h:80,t:"GPUs or $",sub:"+ headroom\n+ sanity check",c:"green",fs:15}
 ],
 edges:[{a:"u",b:"r"},{a:"r",b:"t"},{a:"t",b:"p"},{a:"t",b:"d"},{a:"p",b:"g"},{a:"d",b:"g"}]};
