D["inference-serving-forward"]={w:840,h:290,label:"One forward pass: the prompt is tokenized and embedded, flows through N transformer blocks (attention and MLP) that read and append to the KV cache, then the LM head and sampler pick the next token, which is appended and fed back for the next decode step.",
 nodes:[
  {id:"p",x:10,y:84,w:100,h:46,t:"Prompt",s:"pill",c:"gray",fs:15},
  {id:"tk",x:140,y:80,w:110,h:54,t:"Tokenizer",c:"gray",fs:15},
  {id:"em",x:280,y:80,w:100,h:54,t:"Embed",c:"blue",fs:15},
  {id:"bl",x:410,y:66,w:170,h:82,t:"N × transformer\nblock",sub:"attention + MLP",c:"orange",fs:15},
  {id:"hd",x:610,y:72,w:120,h:70,t:"LM head\n+ sampler",c:"purple",fs:15},
  {id:"o",x:758,y:85,w:72,h:44,t:"Token",s:"pill",c:"green",fs:15},
  {id:"kv",x:430,y:182,w:130,h:66,t:"KV cache",sub:"one entry per token",s:"db",c:"teal",fs:15}
 ],
 edges:[{a:"p",b:"tk"},{a:"tk",b:"em"},{a:"em",b:"bl"},{a:"bl",b:"hd"},{a:"hd",b:"o"},
  {a:"bl",b:"kv",bi:1,t:"read + append"},
  {a:"o",b:"em",as:"t",bs:"t",via:[[794,30],[330,30]],t:"append token, run again (decode)",lp:[560,30],c:"teal"}],
 notes:[{x:420,y:276,t:"Prefill: every prompt token in one parallel pass.  Decode: one new token per pass, reading every weight.",a:"middle",fs:13}]};

D["inference-serving-paged"]={w:780,h:300,label:"PagedAttention: two sequences share the physical KV blocks for their common prompt prefix (reference count 2) and own separate blocks for their divergent tokens; a per-sequence block table maps logical blocks to physical blocks in a pool with a free list.",
 zones:[{x:10,y:20,w:300,h:262,t:"Logical blocks (per sequence)",c:"gray"},{x:510,y:20,w:260,h:262,t:"Physical KV pool (GPU HBM)",c:"teal"}],
 nodes:[
  {id:"a0",x:30,y:76,w:76,h:44,t:"P0",c:"blue",fs:15},
  {id:"a1",x:120,y:76,w:76,h:44,t:"P1",c:"blue",fs:15},
  {id:"a2",x:210,y:76,w:76,h:44,t:"A2",c:"orange",fs:15},
  {id:"b0",x:30,y:186,w:76,h:44,t:"P0",c:"blue",fs:15},
  {id:"b1",x:120,y:186,w:76,h:44,t:"P1",c:"blue",fs:15},
  {id:"b2",x:210,y:186,w:76,h:44,t:"B2",c:"purple",fs:15},
  {id:"bt",x:350,y:112,w:126,h:84,t:"Block tables",sub:"logical → physical\nper sequence",c:"purple",fs:15},
  {id:"q0",x:528,y:60,w:68,h:48,t:"P0",sub:"ref 2",c:"blue",fs:14},
  {id:"q1",x:608,y:60,w:68,h:48,t:"free",c:"gray",fs:14},
  {id:"q2",x:688,y:60,w:68,h:48,t:"A2",c:"orange",fs:14},
  {id:"q3",x:528,y:130,w:68,h:48,t:"P1",sub:"ref 2",c:"blue",fs:14},
  {id:"q4",x:608,y:130,w:68,h:48,t:"B2",c:"purple",fs:14},
  {id:"q5",x:688,y:130,w:68,h:48,t:"free",c:"gray",fs:14},
  {id:"q6",x:528,y:200,w:68,h:48,t:"free",c:"gray",fs:14},
  {id:"q7",x:608,y:200,w:68,h:48,t:"free",c:"gray",fs:14},
  {id:"q8",x:688,y:200,w:68,h:48,t:"free",c:"gray",fs:14}
 ],
 edges:[{a:"a2",b:"bt"},{a:"b2",b:"bt"},{a:"bt",b:"q0",c:"blue"},{a:"bt",b:"q3",c:"blue"},{a:"bt",b:"q4",c:"purple"}],
 notes:[{x:30,y:60,t:"Seq A = shared prompt + answer A",fs:13},{x:30,y:170,t:"Seq B = shared prompt + answer B",fs:13},{x:640,y:268,t:"e.g. 16 tokens per block",a:"middle",fs:13}]};

D["inference-serving-disagg"]={w:800,h:280,label:"Prefill/decode disaggregation: a KV-aware router sends new prompts to a compute-bound prefill pool; the resulting KV blocks move over RDMA or NVLink, optionally via a cluster-wide KV store in DRAM and SSD, to a memory-bound decode pool that streams tokens to the client.",
 nodes:[
  {id:"c",x:10,y:100,w:70,h:72,t:"Client",s:"person"},
  {id:"r",x:110,y:104,w:126,h:64,t:"KV-aware\nrouter",c:"purple",fs:15},
  {id:"pf",x:290,y:28,w:170,h:86,t:"Prefill pool",sub:"compute-bound\nbig chunks",c:"orange",fs:16},
  {id:"dc",x:290,y:170,w:170,h:86,t:"Decode pool",sub:"memory-bound\nlarge batches",c:"teal",fs:16},
  {id:"kv",x:540,y:96,w:160,h:84,t:"KV store",sub:"HBM · DRAM · SSD",s:"db",c:"blue",fs:16}
 ],
 edges:[{a:"c",b:"r"},{a:"r",b:"pf",t:"new prompt"},{a:"pf",b:"kv",t:"KV blocks"},{a:"kv",b:"dc",t:"RDMA / NVLink"},
  {a:"dc",b:"c",as:"l",bs:"b",via:[[45,213]],t:"token stream",lp:[170,213],c:"teal"}],
 notes:[{x:620,y:222,t:"Mooncake-style: reuse KV\nacross requests and nodes",a:"middle",fs:13}]};

D["inference-serving-stack"]={w:820,h:335,label:"Self-hosted serving stack: clients go through an API gateway to a KV-aware inference router, which picks a replica; each replica runs a scheduler doing continuous batching, a paged KV manager, and a model executor sharded across GPUs; an autoscaler reads queue depth, KV utilization and TTFT to add or remove replicas.",
 zones:[{x:450,y:18,w:360,h:236,t:"Replica (one engine, e.g. 8 GPUs, TP=8)",c:"gray"}],
 nodes:[
  {id:"c",x:10,y:128,w:70,h:72,t:"Clients",s:"person"},
  {id:"g",x:104,y:134,w:120,h:60,t:"API gateway",sub:"auth · quotas",c:"gray",fs:15},
  {id:"r",x:262,y:124,w:150,h:80,t:"Inference router",sub:"prefix-aware\nload balancing",c:"purple",fs:15},
  {id:"s",x:470,y:52,w:150,h:66,t:"Scheduler",sub:"continuous batching",c:"orange",fs:15},
  {id:"k",x:644,y:52,w:150,h:66,t:"KV manager",sub:"paged blocks\nprefix tree",c:"teal",fs:15},
  {id:"x",x:470,y:156,w:150,h:76,t:"Model executor",sub:"TP shards\nCUDA graphs",c:"blue",fs:15},
  {id:"gp",x:644,y:156,w:150,h:76,t:"GPUs",sub:"weights + KV in HBM",c:"red",fs:15},
  {id:"a",x:262,y:256,w:150,h:68,t:"Autoscaler",sub:"queue, KV util,\nTTFT p95",c:"green",fs:15}
 ],
 edges:[{a:"c",b:"g"},{a:"g",b:"r"},{a:"r",b:"s"},{a:"s",b:"k",bi:1},{a:"s",b:"x"},{a:"x",b:"gp"},
  {a:"x",b:"a",d:1,t:"metrics",as:"b",bs:"r",via:[[545,290]]},{a:"a",b:"r",d:1,t:"replica set"}]};
