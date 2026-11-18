window.DIAGRAMS={};
var D=window.DIAGRAMS;
D["six-types"]={w:760,h:300,label:"Six families of LLM system design prompts: product design, retrieval and knowledge, agentic systems, inference infrastructure, evaluation and safety platforms, and AI-flavored classic design.",
 nodes:[
  {id:"a",x:20,y:30,w:226,h:110,t:"LLM Product\nDesign",sub:"Design ChatGPT / Playground",c:"orange",fs:18},
  {id:"b",x:267,y:30,w:226,h:110,t:"Retrieval &\nKnowledge",sub:"RAG, enterprise search",c:"blue",fs:18},
  {id:"c",x:514,y:30,w:226,h:110,t:"Agentic\nSystems",sub:"coding agent, tool use",c:"purple",fs:18},
  {id:"d",x:20,y:170,w:226,h:110,t:"Inference &\nPlatform Infra",sub:"batching, GPU scheduling",c:"red",fs:18},
  {id:"e",x:267,y:170,w:226,h:110,t:"Eval, Safety &\nGovernance",sub:"eval pipelines, guardrails",c:"teal",fs:18},
  {id:"f",x:514,y:170,w:226,h:110,t:"AI-flavored\nClassic",sub:"token rate limiter, search",c:"green",fs:18}
 ]};
D["rubric"]={w:760,h:150,label:"Four assessment areas: problem navigation, solution design, technical excellence, communication.",
 nodes:[
  {id:"a",x:10,y:20,w:170,h:110,t:"Problem\nNavigation",sub:"scope, success metric",c:"orange",fs:17},
  {id:"b",x:200,y:20,w:170,h:110,t:"Solution\nDesign",sub:"LLM vs deterministic",c:"blue",fs:17},
  {id:"c",x:390,y:20,w:170,h:110,t:"Technical\nExcellence",sub:"tokens, KV, retrieval",c:"teal",fs:17},
  {id:"d",x:580,y:20,w:170,h:110,t:"Communication",sub:"trade-offs out loud",c:"purple",fs:17}
 ]};
D["structure"]={w:640,h:330,label:"How the guide fits together: core concepts at the base, key technologies and patterns above, the delivery framework on top, and worked examples applying everything.",
 nodes:[
  {id:"q",x:120,y:10,w:400,h:56,t:"Worked Examples + Question Bank",c:"teal",fs:19},
  {id:"d",x:90,y:90,w:460,h:56,t:"Delivery Framework",c:"orange",fs:22},
  {id:"k",x:70,y:170,w:240,h:62,t:"Key Technologies",c:"blue",fs:21},
  {id:"p",x:330,y:170,w:240,h:62,t:"Common Patterns",c:"green",fs:21},
  {id:"c",x:50,y:256,w:540,h:62,t:"Core Concepts",c:"red",fs:24}
 ]};
D["prep-pipeline"]={w:760,h:250,label:"Preparation pipeline: identify your interview type, close classic gaps, learn LLM core concepts, study worked examples, build one small project, then timed practice and mocks, looping back to fix gaps.",
 nodes:[
  {id:"a",x:10,y:30,w:160,h:74,t:"1. Know your\ninterview",sub:"recruiter, reports",c:"orange",fs:15},
  {id:"b",x:205,y:30,w:160,h:74,t:"2. Classic\nfoundations",sub:"caching, queues, APIs",c:"gray",fs:15},
  {id:"c",x:400,y:30,w:160,h:74,t:"3. LLM building\nblocks",sub:"concepts, tech, patterns",c:"blue",fs:15},
  {id:"d",x:595,y:30,w:155,h:74,t:"4. Worked\nexamples",sub:"cold attempt first",c:"purple",fs:15},
  {id:"e",x:595,y:160,w:155,h:74,t:"5. Build one\nsmall thing",sub:"RAG + evals + tracing",c:"teal",fs:15},
  {id:"f",x:330,y:160,w:200,h:74,t:"6. Timed practice\n& mock interviews",sub:"45 min, out loud",c:"red",fs:15},
  {id:"g",x:40,y:170,w:220,h:54,t:"Interview ready",c:"green",fs:18,s:"pill"}
 ],
 edges:[{a:"a",b:"b"},{a:"b",b:"c"},{a:"c",b:"d"},{a:"d",b:"e"},{a:"e",b:"f"},{a:"f",b:"g"},
  {a:"f",b:"c",t:"fix gaps",d:1,as:"t0.35",bs:"b0.3",c:"red"}]};
D["delivery-timeline"]={w:770,h:200,label:"Delivery framework timeline: requirements 5 minutes, core entities 2, API 5, LLM pipeline 5, high-level design 10 to 15, deep dives 10.",
 zones:[{x:7,y:20,w:612,h:140,t:"Goal: a working system that meets the functional requirements",c:"gray"},{x:623,y:20,w:140,h:140,t:"Goal: meet NFRs",c:"red"}],
 nodes:[
  {id:"a",x:15,y:58,w:110,h:84,t:"Requirements",sub:"~5 min",c:"orange",fs:15},
  {id:"b",x:133,y:58,w:90,h:84,t:"Core\nEntities",sub:"~2 min",c:"blue",fs:15},
  {id:"c",x:231,y:58,w:110,h:84,t:"API /\nInterface",sub:"~5 min",c:"purple",fs:15},
  {id:"d",x:349,y:58,w:110,h:84,t:"LLM\nPipeline",sub:"~5 min",c:"teal",fs:15},
  {id:"e",x:467,y:58,w:145,h:84,t:"High-Level\nDesign",sub:"~10–15 min",c:"green",fs:15},
  {id:"f",x:631,y:58,w:124,h:84,t:"Deep\nDives",sub:"~10 min",c:"red",fs:15}
 ],
 notes:[{x:385,y:185,t:"≈ 37–42 minutes of structure, leaving room for questions at the end",a:"middle",fs:14}]};
D["request-path"]={w:790,h:400,label:"LLM request path: client to admission, input guard, context assembly using history and retrieval, model routing, LLM with tool loop, output guard, streaming back to the client, and asynchronous tracing.",
 nodes:[
  {id:"cl",x:12,y:112,w:70,h:72,t:"Client",s:"person",c:"ink"},
  {id:"ad",x:105,y:118,w:110,h:62,t:"Admit",sub:"auth, quota",c:"gray"},
  {id:"gi",x:240,y:118,w:110,h:62,t:"Guard\ninput",c:"red"},
  {id:"as",x:375,y:118,w:130,h:62,t:"Assemble\ncontext",c:"blue"},
  {id:"rt",x:530,y:118,w:105,h:62,t:"Route\nmodel",c:"purple"},
  {id:"llm",x:660,y:112,w:115,h:74,t:"LLM",sub:"streams tokens",c:"orange",fs:18},
  {id:"hi",x:330,y:12,w:100,h:62,t:"History",s:"db",c:"gray"},
  {id:"ix",x:448,y:8,w:118,h:70,t:"Retrieval\nindex",s:"db",c:"blue"},
  {id:"tl",x:675,y:10,w:85,h:54,t:"Tools",c:"teal"},
  {id:"go",x:660,y:252,w:115,h:62,t:"Guard\noutput",c:"red"},
  {id:"st",x:420,y:252,w:150,h:62,t:"Stream to\nclient (SSE)",c:"green"},
  {id:"tr",x:600,y:335,w:150,h:58,t:"Trace + eval store",s:"db",c:"gray",fs:14}
 ],
 edges:[
  {a:"cl",b:"ad"},{a:"ad",b:"gi"},{a:"gi",b:"as"},{a:"as",b:"rt"},{a:"rt",b:"llm"},
  {a:"hi",b:"as",bs:"t0.3"},{a:"ix",b:"as",bs:"t0.75"},
  {a:"llm",b:"tl",bi:1,t:"tool calls",c:"teal"},
  {a:"llm",b:"go"},{a:"go",b:"st"},
  {a:"st",b:"cl",via:[[47,283]],bs:"b",t:"token deltas"},
  {a:"go",b:"tr",as:"b0.3",bs:"t0.6",d:1,t:"async"}
 ]};
D["reference-arch"]={w:870,h:460,label:"Reference high-level architecture: client, API gateway, orchestrator connected to conversation store, retrieval service with indexes, tool executor with internal APIs, LLM gateway in front of hosted and self-hosted models, and traces feeding evaluation.",
 nodes:[
  {id:"cl",x:10,y:198,w:70,h:72,t:"Client",s:"person"},
  {id:"gw",x:100,y:200,w:130,h:66,t:"API Gateway",sub:"auth, rate limit",c:"gray"},
  {id:"or",x:280,y:192,w:165,h:82,t:"Orchestrator",sub:"context, tool loop,\nguardrails",c:"orange",fs:17},
  {id:"cs",x:285,y:350,w:155,h:82,t:"Conversation\nstore",s:"db",c:"gray"},
  {id:"lg",x:510,y:192,w:150,h:82,t:"LLM Gateway",sub:"routing, quotas,\nprompt cache",c:"purple",fs:17},
  {id:"pa",x:715,y:150,w:145,h:62,t:"Hosted model\nAPI",c:"blue"},
  {id:"sh",x:715,y:250,w:145,h:62,t:"Self-hosted\nvLLM pool",c:"blue"},
  {id:"rs",x:510,y:40,w:150,h:66,t:"Retrieval\nservice",sub:"hybrid + rerank",c:"teal"},
  {id:"ix",x:715,y:30,w:145,h:86,t:"Vector +\nkeyword index",s:"db",c:"teal"},
  {id:"te",x:280,y:40,w:165,h:66,t:"Tool Executor",sub:"authz, idempotency",c:"red"},
  {id:"ia",x:100,y:40,w:130,h:66,t:"Internal APIs",sub:"orders, CRM",c:"gray"},
  {id:"tr",x:510,y:352,w:150,h:80,t:"Traces &\nfeedback",s:"db",c:"gray"},
  {id:"ev",x:715,y:360,w:145,h:64,t:"Eval &\nmonitoring",c:"green"}
 ],
 edges:[
  {a:"cl",b:"gw",t:"HTTPS / SSE",lp:[92,178]},{a:"gw",b:"or"},{a:"or",b:"cs",t:"history"},{a:"or",b:"lg",t:"prompt"},
  {a:"lg",b:"pa"},{a:"lg",b:"sh",d:1,t:"fallback"},{a:"or",b:"rs",t:"query"},{a:"rs",b:"ix"},
  {a:"or",b:"te",t:"tool calls"},{a:"te",b:"ia"},{a:"or",b:"tr",d:1,t:"async"},{a:"tr",b:"ev"},
  {a:"ev",b:"lg",d:1,as:"t0.5",bs:"b0.8",t:"release gates",c:"green"}
 ]};
D["prefill-decode"]={w:770,h:260,label:"Prefill processes all prompt tokens in parallel and writes the KV cache; decode then generates one token per step, reading the KV cache each time.",
 zones:[{x:405,y:22,w:355,h:128,t:"Decode: one token per step (memory-bound)",c:"purple"}],
 nodes:[
  {id:"p",x:10,y:60,w:170,h:72,t:"Prompt",sub:"e.g. 5,000 tokens",c:"blue",fs:17},
  {id:"pf",x:215,y:52,w:160,h:88,t:"Prefill",sub:"all tokens in parallel\n(compute-bound)",c:"orange",fs:18},
  {id:"t1",x:420,y:74,w:52,h:44,t:"tok 1",c:"purple",fs:13},
  {id:"t2",x:490,y:74,w:52,h:44,t:"tok 2",c:"purple",fs:13},
  {id:"t3",x:560,y:74,w:52,h:44,t:"tok 3",c:"purple",fs:13},
  {id:"t4",x:630,y:74,w:52,h:44,t:"tok 4",c:"purple",fs:13},
  {id:"dots",x:690,y:74,w:60,h:44,t:"…",s:"text",c:"purple",fs:22},
  {id:"kv",x:215,y:178,w:160,h:60,t:"KV cache",s:"db",c:"gray",fs:16}
 ],
 edges:[{a:"p",b:"pf"},{a:"pf",b:"t1"},{a:"t1",b:"t2"},{a:"t2",b:"t3"},{a:"t3",b:"t4"},
  {a:"pf",b:"kv",t:"writes"},{a:"kv",b:"t3",d:1,t:"read every step",bs:"b"}],
 notes:[{x:200,y:20,t:"TTFT = queue + prefill",a:"middle",fs:15,c:"orange"},{x:585,y:172,t:"TPOT ≈ 10–30 ms per token",a:"middle",fs:15,c:"purple"}]};
D["batching"]={w:770,h:340,label:"Static batching leaves GPU slots idle until the longest sequence finishes and makes new requests wait; continuous batching refills slots at every step as sequences finish.",
 zones:[{x:10,y:14,w:750,h:146,t:"Static batching",c:"red"},{x:10,y:176,w:750,h:146,t:"Continuous batching",c:"green"}],
 nodes:[
  {id:"sA",x:100,y:46,w:300,h:28,t:"A (long answer)",c:"orange",fs:13},
  {id:"sB",x:100,y:84,w:100,h:28,t:"B",c:"blue",fs:13},
  {id:"sBi",x:204,y:84,w:196,h:28,t:"slot idle",c:"gray",fs:13,dash:1},
  {id:"sD",x:410,y:84,w:160,h:28,t:"D (waited)",c:"teal",fs:13},
  {id:"sC",x:100,y:122,w:200,h:28,t:"C",c:"purple",fs:13},
  {id:"sCi",x:304,y:122,w:96,h:28,t:"idle",c:"gray",fs:13,dash:1},
  {id:"cA",x:100,y:208,w:300,h:28,t:"A (long answer)",c:"orange",fs:13},
  {id:"cB",x:100,y:246,w:100,h:28,t:"B",c:"blue",fs:13},
  {id:"cD",x:204,y:246,w:160,h:28,t:"D joins",c:"teal",fs:13},
  {id:"cC",x:100,y:284,w:200,h:28,t:"C",c:"purple",fs:13},
  {id:"cE",x:304,y:284,w:160,h:28,t:"E joins",c:"green",fs:13}
 ],
 notes:[{x:20,y:98,t:"slot 2",fs:13},{x:20,y:60,t:"slot 1",fs:13},{x:20,y:136,t:"slot 3",fs:13},
  {x:20,y:222,t:"slot 1",fs:13},{x:20,y:260,t:"slot 2",fs:13},{x:20,y:298,t:"slot 3",fs:13},
  {x:600,y:118,t:"new requests wait for\nthe whole batch",fs:14,c:"red"},{x:600,y:270,t:"finished slots refilled\nat the next decode step",fs:14,c:"green"},
  {x:385,y:334,t:"time →",fs:13,a:"middle"}]};
D["context-budget"]={w:770,h:175,label:"A context window split into system prompt and tools, retrieved documents, conversation history, the user message, and space reserved for output. The stable prefix is cacheable.",
 nodes:[
  {id:"s",x:10,y:52,w:160,h:66,t:"System prompt\n+ tool defs",c:"blue",fs:14},
  {id:"r",x:174,y:52,w:296,h:66,t:"Retrieved documents",c:"teal",fs:15},
  {id:"h",x:474,y:52,w:150,h:66,t:"History /\nsummary",c:"purple",fs:14},
  {id:"u",x:628,y:52,w:44,h:66,t:"User",c:"orange",fs:12},
  {id:"o",x:676,y:52,w:84,h:66,t:"Output\nreserve",c:"gray",fs:13,dash:1}
 ],
 notes:[{x:90,y:30,t:"stable → cacheable prefix",a:"middle",fs:14,c:"blue"},{x:570,y:30,t:"changes every turn",a:"middle",fs:14,c:"purple"},
  {x:90,y:140,t:"~2K",a:"middle"},{x:322,y:140,t:"~6K",a:"middle"},{x:549,y:140,t:"~3K",a:"middle"},{x:650,y:140,t:"0.3K",a:"middle"},{x:718,y:140,t:"≤1K",a:"middle"},
  {x:385,y:166,t:"one ~12K-token request: every token here is paid for and adds latency",a:"middle",fs:13}]};
D["tech-map"]={w:770,h:320,label:"Map of LLM technology categories: LLM gateway on top, orchestration and durable execution, retrieval and embeddings, hosted and self-hosted models at the bottom, with observability, guardrails and sandboxes as cross-cutting concerns.",
 nodes:[
  {id:"g",x:10,y:16,w:545,h:62,t:"LLM Gateway",sub:"LiteLLM · Portkey · Envoy AI Gateway",c:"purple",fs:17},
  {id:"o1",x:10,y:92,w:265,h:62,t:"Orchestration & agents",sub:"LangGraph · agent SDKs · MCP",c:"orange",fs:16},
  {id:"o2",x:290,y:92,w:265,h:62,t:"Durable execution",sub:"Temporal · Kafka · SQS",c:"orange",fs:16},
  {id:"r1",x:10,y:168,w:265,h:62,t:"Retrieval",sub:"pgvector · Qdrant · OpenSearch",c:"teal",fs:16},
  {id:"r2",x:290,y:168,w:265,h:62,t:"Embeddings & rerankers",sub:"Cohere · Voyage · BGE",c:"teal",fs:16},
  {id:"m1",x:10,y:244,w:265,h:62,t:"Hosted model APIs",sub:"Claude · GPT · Gemini",c:"blue",fs:16},
  {id:"m2",x:290,y:244,w:265,h:62,t:"Self-hosted serving",sub:"vLLM · SGLang · llm-d",c:"blue",fs:16},
  {id:"x1",x:580,y:16,w:180,h:110,t:"Observability\n& evals",sub:"Langfuse · Phoenix\nRagas · promptfoo",c:"green",fs:16},
  {id:"x2",x:580,y:140,w:180,h:80,t:"Guardrails",sub:"Llama Guard · Presidio",c:"red",fs:16},
  {id:"x3",x:580,y:234,w:180,h:72,t:"Sandboxes",sub:"Firecracker · gVisor",c:"red",fs:16}
 ]};
D["vector-choice"]={w:775,h:310,label:"Decision tree for picking a vector store: pgvector if you are already on Postgres at moderate scale; a search engine like OpenSearch or Vespa if keyword ranking matters as much as semantics; otherwise a managed or self-run vector database.",
 nodes:[
  {id:"q1",x:10,y:110,w:175,h:90,t:"On Postgres and\n< tens of millions\nof chunks?",c:"gray",fs:14},
  {id:"pg",x:240,y:22,w:150,h:56,t:"pgvector",c:"teal",fs:17},
  {id:"q2",x:240,y:150,w:180,h:84,t:"Keyword ranking\nas important as\nsemantic?",c:"gray",fs:14},
  {id:"os",x:475,y:96,w:185,h:62,t:"OpenSearch /\nElasticsearch / Vespa",c:"teal",fs:14},
  {id:"q3",x:475,y:206,w:135,h:70,t:"Managed or\nself-run?",c:"gray",fs:14},
  {id:"mg",x:655,y:156,w:112,h:66,t:"Managed:\nPinecone /\nturbopuffer",c:"teal",fs:12},
  {id:"sr",x:655,y:236,w:112,h:66,t:"Self-run:\nQdrant / Milvus\n/ Weaviate",c:"teal",fs:12}
 ],
 edges:[{a:"q1",b:"pg",t:"yes"},{a:"q1",b:"q2",t:"no"},{a:"q2",b:"os",t:"yes"},{a:"q2",b:"q3",t:"no"},{a:"q3",b:"mg"},{a:"q3",b:"sr"}]};
D["rag"]={w:800,h:400,label:"RAG architecture: an offline path ingests documents through a change queue, parsing, chunking, enrichment and embedding into a vector and BM25 index; the online path rewrites the query, runs permission-filtered hybrid search, reranks, and has the LLM answer with citations.",
 zones:[{x:10,y:10,w:580,h:140,t:"Offline: ingestion",c:"blue"},{x:10,y:172,w:580,h:220,t:"Online: query",c:"orange"}],
 nodes:[
  {id:"src",x:24,y:52,w:110,h:78,t:"Docs, tickets,\nwikis",s:"db",c:"gray",fs:14},
  {id:"q",x:160,y:60,w:90,h:60,t:"Change\nqueue",c:"gray",fs:14},
  {id:"pc",x:278,y:60,w:125,h:60,t:"Parse +\nchunk",c:"blue",fs:15},
  {id:"ee",x:430,y:60,w:140,h:60,t:"Enrich + embed",sub:"context, ACLs",c:"blue",fs:15},
  {id:"ix",x:620,y:140,w:165,h:100,t:"Vector +\nBM25 index",s:"db",c:"teal",fs:17},
  {id:"u",x:22,y:205,w:66,h:72,t:"User",s:"person"},
  {id:"rw",x:110,y:212,w:110,h:58,t:"Query\nrewrite",c:"purple",fs:15},
  {id:"hs",x:250,y:212,w:130,h:58,t:"Hybrid search",sub:"vector + BM25",c:"teal",fs:15},
  {id:"rr",x:410,y:212,w:150,h:58,t:"Rerank",sub:"top 50 → best 8",c:"teal",fs:15},
  {id:"llm",x:410,y:306,w:150,h:66,t:"LLM answer",sub:"+ citations",c:"orange",fs:16}
 ],
 edges:[{a:"src",b:"q"},{a:"q",b:"pc"},{a:"pc",b:"ee"},{a:"ee",b:"ix",t:"upsert"},
  {a:"u",b:"rw"},{a:"rw",b:"hs"},{a:"hs",b:"ix",t:"ACL-filtered",as:"t0.5",bs:"l0.5",via:[[315,192]],lp:[465,192]},{a:"hs",b:"rr"},{a:"rr",b:"llm",t:"chunks"},
  {a:"llm",b:"u",via:[[55,339]],bs:"b",t:"streamed answer"}]};
D["streaming"]={w:770,h:270,label:"Resumable streaming: a generation worker streams model tokens into a sequence-numbered buffer; the edge server relays deltas to the client over SSE and can replay from the last event ID after a reconnect; the final message is persisted.",
 nodes:[
  {id:"c",x:10,y:92,w:70,h:72,t:"Client",s:"person"},
  {id:"e",x:130,y:92,w:150,h:66,t:"Edge / API\nserver",c:"gray",fs:16},
  {id:"g",x:350,y:24,w:160,h:66,t:"Generation\nworker",c:"blue",fs:16},
  {id:"m",x:590,y:24,w:160,h:66,t:"LLM",c:"orange",fs:18},
  {id:"b",x:350,y:170,w:160,h:80,t:"Stream buffer",sub:"Redis stream",s:"db",c:"teal",fs:15},
  {id:"d",x:590,y:170,w:160,h:80,t:"Message store",s:"db",c:"gray",fs:15}
 ],
 edges:[{a:"c",b:"e",bi:1,t:"SSE"},{a:"e",b:"g",t:"start"},{a:"g",b:"m",bi:1,t:"tokens"},{a:"g",b:"b",t:"seq-numbered\ndeltas"},
  {a:"b",b:"e",t:"relay / replay\nfrom Last-Event-ID",as:"l0.5",bs:"b0.5",via:[[205,210]],lp:[272,210]},{a:"g",b:"d",d:1,t:"final message"}]};
D["agent-loop"]={w:770,h:340,label:"Agent loop: the orchestrator sends context and tool definitions to the LLM, which returns a tool call or a final answer; tool calls go through an executor that authorizes, validates and routes irreversible actions to a human; results return to the orchestrator as untrusted input; state is checkpointed.",
 nodes:[
  {id:"u",x:30,y:136,w:70,h:72,t:"User",s:"person"},
  {id:"o",x:270,y:130,w:190,h:80,t:"Orchestrator",sub:"loop · budgets · stop rules",c:"orange",fs:18},
  {id:"l",x:270,y:10,w:190,h:62,t:"LLM",c:"blue",fs:18},
  {id:"x",x:585,y:130,w:180,h:80,t:"Tool executor",sub:"authz · validate · idempotency",c:"red",fs:17},
  {id:"t",x:590,y:268,w:170,h:56,t:"APIs, DBs, search",c:"gray",fs:15},
  {id:"h",x:585,y:10,w:180,h:58,t:"Human approval",c:"purple",fs:16,s:"pill"},
  {id:"s",x:270,y:262,w:190,h:66,t:"Run state /\ncheckpoints",s:"db",c:"gray",fs:15}
 ],
 edges:[{a:"u",b:"o",t:"task"},
  {a:"o",b:"l",as:"t0.3",bs:"b0.3",t:"context + tools"},{a:"l",b:"o",as:"b0.72",bs:"t0.72",t:"tool call\nor answer"},
  {a:"o",b:"x",as:"r0.3",bs:"l0.3",t:"proposed call"},{a:"x",b:"o",as:"l0.72",bs:"r0.72",t:"result\n(untrusted)"},
  {a:"x",b:"t"},{a:"x",b:"h",d:1,t:"irreversible?",bi:1,c:"purple"},{a:"o",b:"s",d:1,t:"checkpoint"}]};
D["workflows"]={w:780,h:470,label:"Five agentic workflow patterns: prompt chaining with gates, routing to specialized calls, parallelization with aggregation, orchestrator delegating to workers then synthesizing, and an evaluator-optimizer loop.",
 zones:[{x:10,y:10,w:245,h:210,t:"Prompt chaining",c:"blue"},{x:268,y:10,w:245,h:210,t:"Routing",c:"purple"},{x:526,y:10,w:245,h:210,t:"Parallelization",c:"teal"},
  {x:10,y:236,w:375,h:224,t:"Orchestrator-workers",c:"orange"},{x:396,y:236,w:375,h:224,t:"Evaluator-optimizer",c:"red"}],
 nodes:[
  {id:"c1",x:30,y:60,w:80,h:38,t:"LLM 1",c:"blue",fs:14},{id:"cg",x:150,y:60,w:80,h:38,t:"gate",c:"gray",fs:14,dash:1},
  {id:"c2",x:30,y:150,w:80,h:38,t:"LLM 2",c:"blue",fs:14},{id:"co",x:150,y:150,w:80,h:38,t:"output",c:"green",fs:14,s:"pill"},
  {id:"ri",x:282,y:110,w:56,h:38,t:"input",c:"gray",fs:13},{id:"rr",x:358,y:110,w:66,h:38,t:"router",c:"purple",fs:14},
  {id:"ra",x:444,y:52,w:58,h:36,t:"LLM A",c:"blue",fs:13},{id:"rb",x:444,y:111,w:58,h:36,t:"LLM B",c:"blue",fs:13},{id:"rc",x:444,y:170,w:58,h:36,t:"LLM C",c:"blue",fs:13},
  {id:"pi",x:538,y:110,w:52,h:38,t:"input",c:"gray",fs:13},
  {id:"p1",x:612,y:52,w:56,h:36,t:"LLM",c:"blue",fs:13},{id:"p2",x:612,y:111,w:56,h:36,t:"LLM",c:"blue",fs:13},{id:"p3",x:612,y:170,w:56,h:36,t:"LLM",c:"blue",fs:13},
  {id:"pa",x:690,y:108,w:72,h:42,t:"aggre-\ngate",c:"teal",fs:13},
  {id:"oo",x:28,y:328,w:110,h:46,t:"orchestrator",c:"orange",fs:14},
  {id:"w1",x:178,y:272,w:76,h:36,t:"worker",c:"blue",fs:13},{id:"w2",x:178,y:333,w:76,h:36,t:"worker",c:"blue",fs:13},{id:"w3",x:178,y:394,w:76,h:36,t:"worker",c:"blue",fs:13},
  {id:"os",x:288,y:328,w:86,h:46,t:"synthesize",c:"orange",fs:13},
  {id:"eg",x:420,y:300,w:120,h:52,t:"generator",c:"orange",fs:15},{id:"ee",x:620,y:300,w:120,h:52,t:"evaluator",c:"purple",fs:15},
  {id:"eo",x:630,y:404,w:100,h:38,t:"output",c:"green",fs:14,s:"pill"}
 ],
 edges:[{a:"c1",b:"cg"},{a:"cg",b:"c2",t:"pass"},{a:"c2",b:"co"},
  {a:"ri",b:"rr"},{a:"rr",b:"ra"},{a:"rr",b:"rb"},{a:"rr",b:"rc"},
  {a:"pi",b:"p1"},{a:"pi",b:"p2"},{a:"pi",b:"p3"},{a:"p1",b:"pa"},{a:"p2",b:"pa"},{a:"p3",b:"pa"},
  {a:"oo",b:"w1"},{a:"oo",b:"w2"},{a:"oo",b:"w3"},{a:"w1",b:"os"},{a:"w2",b:"os"},{a:"w3",b:"os"},
  {a:"eg",b:"ee",as:"r0.3",bs:"l0.3",t:"draft"},{a:"ee",b:"eg",as:"l0.75",bs:"r0.75",t:"feedback"},{a:"ee",b:"eo",t:"pass"}]};
D["durable-run"]={w:770,h:290,label:"Long-running agent tasks: the client starts a run and gets a run ID; a durable workflow schedules LLM and tool activities on workers, checkpoints each step to event history, waits for human approval signals, and pushes progress over SSE or webhooks.",
 nodes:[
  {id:"c",x:10,y:34,w:70,h:72,t:"Client",s:"person"},
  {id:"a",x:160,y:40,w:120,h:60,t:"Runs API",c:"gray",fs:16},
  {id:"w",x:335,y:30,w:170,h:80,t:"Durable workflow",sub:"e.g. Temporal",c:"orange",fs:17},
  {id:"k",x:575,y:30,w:190,h:80,t:"Activity workers",sub:"LLM calls · tools · sandboxes",c:"blue",fs:17},
  {id:"h",x:310,y:180,w:180,h:84,t:"Event history /\ncheckpoints",s:"db",c:"gray",fs:15},
  {id:"p",x:560,y:190,w:200,h:62,t:"Human approval\n(signal)",c:"purple",fs:15},
  {id:"n",x:110,y:190,w:150,h:62,t:"Progress SSE /\nwebhook",c:"green",fs:15}
 ],
 edges:[{a:"c",b:"a",t:"202 + runId",lp:[122,22]},{a:"a",b:"w",t:"start"},{a:"w",b:"k",bi:1,t:"schedule /\nresults"},{a:"w",b:"h",t:"checkpoint\neach step"},
  {a:"p",b:"w",d:1,t:"approve / deny",c:"purple"},{a:"w",b:"n",t:"events"},{a:"n",b:"c"}]};
D["cache-layers"]={w:780,h:210,label:"Layered caching: a request checks an exact response cache, then a semantic cache, then the model server's prefix cache, before paying for full prefill and decode.",
 nodes:[
  {id:"r",x:10,y:82,w:82,h:56,t:"request",c:"gray",fs:15,s:"pill"},
  {id:"e",x:120,y:76,w:120,h:68,t:"Exact\nresponse cache",c:"teal",fs:15},
  {id:"s",x:290,y:76,w:115,h:68,t:"Semantic\ncache",c:"teal",fs:15},
  {id:"p",x:455,y:76,w:135,h:68,t:"Prefix / prompt\ncache",c:"teal",fs:15},
  {id:"f",x:640,y:76,w:128,h:68,t:"Full prefill\n+ decode",c:"orange",fs:15}
 ],
 edges:[{a:"r",b:"e"},{a:"e",b:"s",t:"miss"},{a:"s",b:"p",t:"miss"},{a:"p",b:"f",t:"miss"}],
 notes:[{x:180,y:38,t:"hit: ~ms, free",a:"middle",fs:14,c:"teal"},{x:347,y:38,t:"hit: strict threshold",a:"middle",fs:14,c:"teal"},{x:522,y:38,t:"hit: ~0.1× input,\nlower TTFT",a:"middle",fs:14,c:"teal"},{x:704,y:38,t:"full price",a:"middle",fs:14,c:"orange"},
  {x:390,y:186,t:"every key scoped by tenant (and user for personal data)",a:"middle",fs:14,c:"red"}]};
D["cascade"]={w:770,h:250,label:"Model routing and cascades: a router sends easy requests to a small model whose output is checked; failures escalate to a frontier model; hard requests go straight to the frontier model, which falls back to another provider on errors.",
 nodes:[
  {id:"q",x:10,y:100,w:82,h:54,t:"request",c:"gray",fs:15,s:"pill"},
  {id:"r",x:122,y:92,w:130,h:70,t:"Router",sub:"task + difficulty",c:"purple",fs:17},
  {id:"sm",x:300,y:20,w:150,h:60,t:"Small model",c:"blue",fs:16},
  {id:"ck",x:500,y:20,w:120,h:60,t:"Check",sub:"validator / score",c:"gray",fs:15},
  {id:"lg",x:440,y:166,w:155,h:62,t:"Frontier model",c:"blue",fs:16},
  {id:"ok",x:676,y:24,w:84,h:52,t:"answer",c:"green",fs:15,s:"pill"},
  {id:"fb",x:672,y:166,w:90,h:62,t:"Provider B",c:"gray",fs:13,dash:1}
 ],
 edges:[{a:"q",b:"r"},{a:"r",b:"sm",t:"easy"},{a:"sm",b:"ck"},{a:"ck",b:"ok",t:"pass"},{a:"ck",b:"lg",t:"fail → escalate",c:"red"},{a:"r",b:"lg",t:"hard"},
  {a:"lg",b:"ok",as:"t0.8",bs:"b0.3"},{a:"lg",b:"fb",d:1,t:"5xx / 429"}]};
D["guard-sandwich"]={w:770,h:240,label:"Guardrail sandwich: input guards before the model, a tool gate enforcing authorization and confirmation around tool calls, and output guards checking schema, policy and citations before the response.",
 nodes:[
  {id:"u",x:10,y:50,w:70,h:72,t:"User",s:"person"},
  {id:"ig",x:110,y:44,w:160,h:84,t:"Input guards",sub:"moderation · PII\n· injection signals",c:"red",fs:16},
  {id:"m",x:310,y:50,w:130,h:72,t:"LLM",c:"orange",fs:18},
  {id:"tg",x:295,y:164,w:160,h:64,t:"Tool gate",sub:"authz · confirm",c:"red",fs:16},
  {id:"og",x:480,y:44,w:160,h:84,t:"Output guards",sub:"schema · policy\n· citation check",c:"red",fs:16},
  {id:"o",x:672,y:62,w:90,h:48,t:"response",c:"green",fs:14,s:"pill"}
 ],
 edges:[{a:"u",b:"ig"},{a:"ig",b:"m"},{a:"m",b:"tg",bi:1,t:"tool calls"},{a:"m",b:"og"},{a:"og",b:"o"}],
 notes:[{x:640,y:200,t:"strongest controls live\nin code, not the prompt",a:"middle",fs:14,c:"red"}]};
D["eval-flywheel"]={w:660,h:390,label:"The eval flywheel: production traffic produces traces and feedback, failures are triaged and labeled into a golden eval set, every change must pass the release gate, and shipped changes go back to production.",
 nodes:[
  {id:"p",x:240,y:14,w:180,h:62,t:"Production\ntraffic",c:"blue",fs:16},
  {id:"t",x:450,y:120,w:190,h:66,t:"Traces + feedback",sub:"thumbs, escalations",c:"gray",fs:15},
  {id:"f",x:390,y:290,w:190,h:66,t:"Failure triage",sub:"cluster, label",c:"orange",fs:16},
  {id:"g",x:80,y:290,w:190,h:66,t:"Golden eval set",sub:"grows every week",c:"teal",fs:16},
  {id:"r",x:20,y:120,w:190,h:66,t:"Release gate",sub:"prompt / model / RAG",c:"green",fs:16}
 ],
 edges:[{a:"p",b:"t"},{a:"t",b:"f"},{a:"f",b:"g",t:"new cases"},{a:"g",b:"r"},{a:"r",b:"p",t:"ship if no\nregression"}],
 notes:[{x:330,y:200,t:"every production failure\nbecomes a test",a:"middle",fs:16,c:"teal"}]};
D["chatgpt-1"]={w:770,h:230,label:"First-pass ChatGPT design: client streams over SSE from a Chat Service, which builds the prompt and calls an LLM gateway in front of an inference pool, with moderation in parallel.",
 nodes:[
  {id:"c",x:10,y:70,w:70,h:72,t:"Client",s:"person"},
  {id:"s",x:120,y:66,w:170,h:80,t:"Chat Service",sub:"load history, build prompt",c:"orange",fs:17},
  {id:"g",x:395,y:66,w:145,h:80,t:"LLM Gateway",sub:"tier → model",c:"purple",fs:17},
  {id:"p",x:595,y:60,w:165,h:92,t:"Inference pool",sub:"vLLM replicas",c:"blue",fs:17},
  {id:"m",x:120,y:176,w:170,h:46,t:"Moderation",c:"red",fs:15}
 ],
 edges:[{a:"c",b:"s",bi:1,t:"SSE"},{a:"s",b:"g",bi:1,t:"prompt /\ntokens"},{a:"g",b:"p",bi:1},{a:"s",b:"m",d:1,t:"in parallel",c:"red"}]};
D["chatgpt-final"]={w:820,h:450,label:"Final ChatGPT design: API gateway, Chat Service with moderation, generation workers writing deltas to a Redis stream buffer that the Chat Service relays, an LLM gateway with quotas and priority routing to default and strong tier pools, a partitioned conversation store, and an async title and summary worker.",
 nodes:[
  {id:"c",x:10,y:186,w:70,h:72,t:"Client",s:"person"},
  {id:"a",x:105,y:190,w:125,h:66,t:"API Gateway",sub:"auth, LB",c:"gray",fs:16},
  {id:"s",x:270,y:182,w:150,h:82,t:"Chat Service",sub:"SSE, prompt build",c:"orange",fs:17},
  {id:"m",x:105,y:46,w:125,h:56,t:"Moderation",c:"red",fs:15},
  {id:"r",x:465,y:30,w:145,h:84,t:"Stream buffer\n(Redis)",s:"db",c:"teal",fs:14},
  {id:"w",x:465,y:182,w:145,h:82,t:"Generation\nworkers",c:"blue",fs:16},
  {id:"g",x:655,y:182,w:150,h:82,t:"LLM Gateway",sub:"quotas, priority,\ncache-aware routing",c:"purple",fs:16},
  {id:"p1",x:655,y:32,w:150,h:66,t:"Default tier\npool",c:"blue",fs:15},
  {id:"p2",x:655,y:350,w:150,h:66,t:"Strong tier\npool",c:"blue",fs:15},
  {id:"d",x:270,y:338,w:150,h:90,t:"Conversation\nstore",s:"db",c:"gray",fs:15},
  {id:"t",x:465,y:350,w:145,h:66,t:"Title & summary\nworker",c:"gray",fs:14}
 ],
 edges:[{a:"c",b:"a",t:"SSE",lp:[92,172]},{a:"a",b:"s"},{a:"s",b:"m",d:1,c:"red",t:"parallel"},{a:"s",b:"d",t:"history"},{a:"s",b:"w",t:"start"},
  {a:"w",b:"g"},{a:"g",b:"p1"},{a:"g",b:"p2"},{a:"w",b:"r",t:"deltas"},{a:"r",b:"s",t:"relay /\nreplay"},{a:"d",b:"t",d:1,t:"async"}]};
D["support-final"]={w:860,h:450,label:"Support assistant design: help-center change events feed ingestion workers that build a hybrid index; the assistant orchestrator calls a retrieval service, an LLM gateway in front of model APIs, a tool executor with customer-scoped credentials in front of order APIs, a handoff service, and a conversation and trace store.",
 nodes:[
  {id:"cms",x:100,y:30,w:130,h:64,t:"Help-center\nCMS",c:"gray",fs:15},
  {id:"ing",x:262,y:28,w:170,h:68,t:"Ingestion workers",sub:"chunk · contextualize · embed",c:"blue",fs:15},
  {id:"ix",x:470,y:18,w:150,h:88,t:"Hybrid index\n(public docs)",s:"db",c:"teal",fs:14},
  {id:"ret",x:672,y:30,w:175,h:66,t:"Retrieval service",sub:"hybrid + rerank",c:"teal",fs:15},
  {id:"c",x:10,y:186,w:70,h:72,t:"Customer",s:"person"},
  {id:"api",x:100,y:192,w:125,h:62,t:"API Gateway",c:"gray",fs:15},
  {id:"or",x:258,y:178,w:170,h:90,t:"Assistant\nOrchestrator",sub:"intent · rewrite · guards",c:"orange",fs:16},
  {id:"lg",x:470,y:186,w:150,h:76,t:"LLM Gateway",sub:"small + main model",c:"purple",fs:16},
  {id:"pv",x:672,y:192,w:175,h:64,t:"Model APIs",c:"blue",fs:16},
  {id:"ex",x:470,y:330,w:150,h:76,t:"Tool Executor",sub:"scoped token · policy",c:"red",fs:16},
  {id:"oa",x:672,y:336,w:175,h:64,t:"Orders / Returns\nAPIs",c:"gray",fs:15},
  {id:"ho",x:262,y:352,w:170,h:62,t:"Handoff →\nagent queue",c:"green",fs:15},
  {id:"cs",x:100,y:340,w:125,h:86,t:"Conversations\n+ traces",s:"db",c:"gray",fs:14}
 ],
 edges:[{a:"cms",b:"ing"},{a:"ing",b:"ix"},{a:"ret",b:"ix",t:"ACL filter",lp:[646,124]},
  {a:"c",b:"api"},{a:"api",b:"or"},{a:"or",b:"ret",t:"query"},{a:"or",b:"lg"},{a:"lg",b:"pv"},
  {a:"or",b:"ex",t:"tool calls"},{a:"ex",b:"oa"},{a:"or",b:"ho"},{a:"or",b:"cs",d:1}]};
D["batch-hld"]={w:830,h:330,label:"Inference batching design: callers reach stateless API servers that keep a map of request IDs to pending futures; requests go to a deadline-ordered queue; GPU workers pull up to 100 requests when free and run a 100 ms pass; results go to a reply channel for the originating server, which completes the future.",
 zones:[{x:640,y:8,w:182,h:314,t:"GPU worker pool",c:"blue"}],
 nodes:[
  {id:"c",x:10,y:126,w:70,h:72,t:"Callers",s:"person"},
  {id:"lb",x:100,y:132,w:90,h:60,t:"LB",c:"gray",fs:16},
  {id:"api",x:225,y:108,w:180,h:108,t:"API servers",sub:"requestId → future\n(in-memory map)",c:"orange",fs:17},
  {id:"q",x:450,y:30,w:150,h:72,t:"Request queue",sub:"ordered by deadline",c:"gray",fs:15},
  {id:"pool",x:640,y:8,w:182,h:314,t:"",s:"text"},
  {id:"w1",x:654,y:40,w:155,h:66,t:"GPU worker 1",sub:"pull ≤100 when free",c:"blue",fs:15},
  {id:"w2",x:654,y:136,w:155,h:66,t:"GPU worker 2",sub:"~100 ms per pass",c:"blue",fs:15},
  {id:"w3",x:654,y:232,w:155,h:66,t:"GPU worker N",sub:"lease + watchdog",c:"blue",fs:15},
  {id:"rp",x:450,y:226,w:150,h:76,t:"Reply channel\nper API server",c:"teal",fs:15}
 ],
 edges:[{a:"c",b:"lb"},{a:"lb",b:"api"},{a:"api",b:"q",t:"enqueue"},{a:"q",b:"pool",as:"r0.5",bs:"l0.21",t:"pull"},{a:"pool",b:"rp",as:"l0.84",bs:"r0.5",t:"results"},{a:"rp",b:"api",t:"complete\nfuture"}]};
D["coding-final"]={w:840,h:450,label:"Coding agent design: the user creates a task through the Task API; a durable run orchestrator checkpoints to workflow history, calls the LLM gateway, executes tools through a tool proxy into a microVM sandbox whose network goes through an egress allowlist proxy, streams events to the user, and opens a pull request through a GitHub app with a scoped token.",
 nodes:[
  {id:"u",x:10,y:186,w:70,h:72,t:"Developer",s:"person"},
  {id:"api",x:100,y:192,w:120,h:62,t:"Task API",c:"gray",fs:16},
  {id:"or",x:260,y:178,w:170,h:90,t:"Run Orchestrator",sub:"durable workflow\nagent loop",c:"orange",fs:16},
  {id:"hi",x:100,y:30,w:130,h:84,t:"Workflow\nhistory",s:"db",c:"gray",fs:15},
  {id:"lg",x:480,y:38,w:150,h:72,t:"LLM Gateway",sub:"budgets · caching",c:"purple",fs:16},
  {id:"m",x:680,y:44,w:150,h:60,t:"Model API",c:"blue",fs:16},
  {id:"tp",x:480,y:186,w:150,h:76,t:"Tool Proxy",sub:"read · search\nedit · run",c:"red",fs:16},
  {id:"sb",x:680,y:170,w:150,h:108,t:"Sandbox",sub:"microVM per run\nrepo + toolchain",c:"teal",fs:17},
  {id:"eg",x:680,y:330,w:150,h:62,t:"Egress proxy",sub:"allowlist",c:"red",fs:15},
  {id:"gh",x:480,y:340,w:150,h:66,t:"GitHub App",sub:"branch + PR",c:"gray",fs:16},
  {id:"ev",x:260,y:350,w:170,h:58,t:"Event stream (SSE)",c:"green",fs:15}
 ],
 edges:[{a:"u",b:"api"},{a:"api",b:"or"},{a:"or",b:"hi",d:1,t:"checkpoint"},{a:"or",b:"lg"},{a:"lg",b:"m"},
  {a:"or",b:"tp",t:"tool calls",lp:[455,172]},{a:"tp",b:"sb"},{a:"sb",b:"eg"},{a:"or",b:"gh",t:"scoped token"},{a:"or",b:"ev"},{a:"ev",b:"u",via:[[45,379]],bs:"b"}]};
