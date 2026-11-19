D["fine-tuning-ladder"]={w:820,h:250,label:"Adaptation ladder, cheapest first: prompting, few-shot examples, retrieval (RAG), supervised fine-tuning with LoRA, preference or reinforcement tuning, and continued pre-training; each step up costs more data, compute and operational burden.",
 nodes:[
  {id:"a",x:10,y:150,w:118,h:70,t:"Prompting",sub:"hours",c:"green",fs:15},
  {id:"b",x:146,y:126,w:118,h:70,t:"Few-shot",sub:"examples in context",c:"green",fs:15},
  {id:"c",x:282,y:102,w:118,h:70,t:"RAG",sub:"knowledge",c:"blue",fs:15},
  {id:"d",x:418,y:78,w:118,h:70,t:"SFT / LoRA",sub:"behavior, format",c:"orange",fs:15},
  {id:"e",x:554,y:54,w:118,h:70,t:"DPO / RL",sub:"preferences,\nverifiable tasks",c:"purple",fs:15},
  {id:"f",x:690,y:30,w:122,h:70,t:"Continued\npre-training",sub:"new domain/lang",c:"red",fs:14}
 ],
 edges:[{a:"a",b:"b"},{a:"b",b:"c"},{a:"c",b:"d"},{a:"d",b:"e"},{a:"e",b:"f"}],
 notes:[{x:20,y:40,t:"cost, data needed, ops burden ↑",fs:14,c:"red"},{x:420,y:236,t:"Climb only when evals show the cheaper rung can't reach the bar.",a:"middle",fs:13}]};

D["fine-tuning-lora"]={w:760,h:280,label:"LoRA: the pretrained weight matrix W of size d by k stays frozen; a trainable low-rank path multiplies the input by A (r by k) and then B (d by r), scales it, and adds it to W times x. Only A and B are trained, r times d plus k parameters per matrix.",
 nodes:[
  {id:"x",x:10,y:108,w:90,h:56,t:"input x",s:"pill",c:"gray",fs:15},
  {id:"w",x:180,y:24,w:200,h:76,t:"W  (d × k)",sub:"frozen pretrained weights",c:"blue",fs:17},
  {id:"a",x:180,y:170,w:110,h:70,t:"A  (r × k)",sub:"trainable",c:"orange",fs:15},
  {id:"b",x:330,y:170,w:110,h:70,t:"B  (d × r)",sub:"trainable, init 0",c:"orange",fs:15},
  {id:"s",x:500,y:106,w:70,h:60,t:"+",c:"ink",fs:24},
  {id:"h",x:630,y:108,w:120,h:56,t:"output h",s:"pill",c:"green",fs:15}
 ],
 edges:[{a:"x",b:"w"},{a:"x",b:"a"},{a:"a",b:"b",t:"r ≪ d, k"},{a:"w",b:"s",t:"W·x"},{a:"b",b:"s",t:"(α/r)·B·A·x"},{a:"s",b:"h"}],
 notes:[{x:380,y:266,t:"After training, B·A can be merged into W (zero latency) or kept separate (hot-swappable adapter).",a:"middle",fs:13}]};

D["fine-tuning-pipeline"]={w:840,h:300,label:"Fine-tuning pipeline: data sources (production logs, expert labels, teacher-model synthetic data) are cleaned (dedup, PII scrubbing, quality filters), split into train and a frozen eval set with a contamination check, trained with SFT, LoRA or DPO, gated by task and regression evals, registered with lineage, rolled out by shadow and canary, and production failures feed back into the data.",
 nodes:[
  {id:"src",x:10,y:40,w:140,h:84,t:"Sources",sub:"prod logs · experts\nteacher model",c:"gray",fs:15},
  {id:"cl",x:190,y:40,w:140,h:84,t:"Clean",sub:"dedup · PII\nquality filter",c:"blue",fs:15},
  {id:"sp",x:370,y:40,w:140,h:84,t:"Split",sub:"train / frozen eval\ncontamination check",c:"purple",fs:15},
  {id:"tr",x:550,y:40,w:130,h:84,t:"Train",sub:"SFT · LoRA · DPO",c:"orange",fs:15},
  {id:"ev",x:700,y:150,w:130,h:84,t:"Eval gate",sub:"task + regression\n+ safety",c:"red",fs:15},
  {id:"rg",x:510,y:166,w:140,h:72,t:"Registry",sub:"base + adapter +\ndata hash",s:"db",c:"gray",fs:14},
  {id:"ro",x:300,y:166,w:150,h:72,t:"Rollout",sub:"shadow → canary → A/B",c:"green",fs:15}
 ],
 edges:[{a:"src",b:"cl"},{a:"cl",b:"sp"},{a:"sp",b:"tr"},{a:"tr",b:"ev"},{a:"ev",b:"rg",t:"pass"},{a:"rg",b:"ro"},
  {a:"ro",b:"src",as:"l",bs:"b",via:[[80,202]],t:"failures → new data",lp:[170,202],d:1,c:"teal"},
  {a:"ev",b:"tr",d:1,t:"fail",as:"t",bs:"r",via:[[765,82]],c:"red"}]};

D["fine-tuning-multilora"]={w:800,h:270,label:"Multi-LoRA serving: requests tagged with a tenant's adapter ID hit a router, which sends them to a replica running one shared base model; hot adapters sit in a GPU adapter cache, cold ones load from CPU memory or object storage, and batched kernels apply different adapters to different requests in the same batch.",
 nodes:[
  {id:"c",x:10,y:96,w:70,h:72,t:"Tenants",s:"person"},
  {id:"r",x:110,y:100,w:130,h:66,t:"Router",sub:"adapter-affinity",c:"purple",fs:15},
  {id:"bm",x:290,y:40,w:220,h:84,t:"Shared base model",sub:"one copy in HBM",c:"blue",fs:16},
  {id:"gc",x:290,y:160,w:220,h:76,t:"GPU adapter cache",sub:"hot adapters, LRU",c:"orange",fs:15},
  {id:"st",x:590,y:150,w:180,h:90,t:"Adapter store",sub:"CPU RAM · object store\n(~10–200 MB each)",s:"db",c:"gray",fs:15},
  {id:"k",x:590,y:40,w:180,h:84,t:"Batched kernels",sub:"mixed adapters\nin one batch",c:"teal",fs:15}
 ],
 edges:[{a:"c",b:"r",t:"adapter_id"},{a:"r",b:"bm"},{a:"bm",b:"gc",bi:1},{a:"st",b:"gc",t:"load on miss"},{a:"bm",b:"k"}]};
