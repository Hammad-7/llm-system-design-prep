D["agents-tool-use-call"]={w:780,h:320,label:"Tool calling sequence: the agent runtime sends messages and tool schemas to the model; the model replies with a tool_use request naming a tool and arguments; the runtime executes it through a tool executor that validates and authorizes; the result goes back to the model as a tool_result message; this repeats until the model returns a final answer.",
 nodes:[
  {id:"app",x:40,y:120,w:175,h:90,t:"Agent runtime",sub:"your code",c:"gray",fs:17},
  {id:"m",x:520,y:14,w:230,h:80,t:"Model",sub:"messages + tool schemas",c:"purple",fs:18},
  {id:"tl",x:520,y:222,w:230,h:80,t:"Tool executor",sub:"validate · authorize · run",c:"teal",fs:17}
 ],
 edges:[
  {a:"app",b:"m",as:"r0.2",bs:"l0.3",t:"1 · messages + tools"},
  {a:"m",b:"app",as:"l0.8",bs:"r0.5",t:"2 · tool_use(name, args)"},
  {a:"app",b:"tl",as:"r0.75",bs:"l0.3",t:"3 · execute"},
  {a:"tl",b:"app",as:"l0.75",bs:"r0.95",t:"4 · tool_result message"}
 ],
 notes:[{x:40,y:268,t:"repeat 1–4 until the model returns\na final answer (stop_reason: end_turn)",fs:13}]};

D["agents-tool-use-archs"]={w:820,h:430,label:"Four agent architectures: a single agent loop between an LLM and tools; plan-and-execute where a planner writes a step list that an executor runs and replans on failure; orchestrator-workers where one orchestrator fans subtasks out to parallel workers; and handoffs where a triage agent transfers the conversation to specialist agents.",
 zones:[
  {x:10,y:10,w:395,h:200,t:"Single agent loop",c:"purple"},
  {x:415,y:10,w:395,h:200,t:"Plan-and-execute",c:"blue"},
  {x:10,y:220,w:395,h:200,t:"Orchestrator–workers",c:"orange"},
  {x:415,y:220,w:395,h:200,t:"Handoffs (multi-agent)",c:"teal"}
 ],
 nodes:[
  {id:"l1",x:45,y:70,w:120,h:56,t:"LLM",c:"purple",fs:17},
  {id:"t1",x:250,y:70,w:120,h:56,t:"Tools",c:"teal",fs:17},
  {id:"pl",x:435,y:55,w:105,h:52,t:"Planner",c:"purple",fs:15},
  {id:"pp",x:575,y:55,w:95,h:52,t:"Plan",sub:"step list",c:"gray",fs:15},
  {id:"ex",x:705,y:55,w:95,h:52,t:"Executor",c:"teal",fs:15},
  {id:"or",x:140,y:250,w:130,h:50,t:"Orchestrator",c:"purple",fs:15},
  {id:"w1",x:35,y:340,w:95,h:44,t:"Worker",c:"teal",fs:15},
  {id:"w2",x:157,y:340,w:95,h:44,t:"Worker",c:"teal",fs:15},
  {id:"w3",x:279,y:340,w:95,h:44,t:"Worker",c:"teal",fs:15},
  {id:"tr",x:445,y:282,w:100,h:52,t:"Triage",c:"purple",fs:15},
  {id:"b1",x:625,y:250,w:140,h:46,t:"Billing agent",c:"teal",fs:15},
  {id:"b2",x:625,y:322,w:140,h:46,t:"Tech agent",c:"teal",fs:15}
 ],
 edges:[
  {a:"l1",b:"t1",as:"r0.3",bs:"l0.3",t:"call"},
  {a:"t1",b:"l1",as:"l0.75",bs:"r0.75",t:"result"},
  {a:"pl",b:"pp"},{a:"pp",b:"ex"},
  {a:"ex",b:"pl",as:"b",bs:"b",via:[[752,140],[487,140]],d:1,t:"replan",lp:[620,140]},
  {a:"or",b:"w1"},{a:"or",b:"w2"},{a:"or",b:"w3"},
  {a:"tr",b:"b1"},{a:"tr",b:"b2"}
 ],
 notes:[
  {x:207,y:172,t:"default: open-ended tasks, modest tool count",a:"middle"},
  {x:612,y:180,t:"predictable steps; replan on failure",a:"middle"},
  {x:207,y:404,t:"parallel subtasks, clean contexts",a:"middle"},
  {x:612,y:395,t:"specialists take over the conversation",a:"middle"}
 ]};

D["agents-tool-use-mcp"]={w:820,h:410,label:"MCP architecture: a host application such as an IDE or chat app runs the agent and one MCP client per server. Client 1 talks to a remote server over Streamable HTTP after obtaining an OAuth 2.1 token from an authorization server; client 2 talks to another remote server; client 3 launches a local server as a stdio subprocess. Each server wraps a backend such as a SaaS API, a database or local files.",
 zones:[{x:10,y:20,w:300,h:340,t:"Host (IDE, CLI agent, chat app)",c:"gray"}],
 nodes:[
  {id:"ag",x:40,y:60,w:240,h:56,t:"Agent + model",c:"purple",fs:17},
  {id:"c1",x:40,y:150,w:240,h:50,t:"MCP client 1",c:"blue",fs:15},
  {id:"c2",x:40,y:220,w:240,h:50,t:"MCP client 2",c:"blue",fs:15},
  {id:"c3",x:40,y:290,w:240,h:50,t:"MCP client 3",c:"blue",fs:15},
  {id:"au",x:400,y:30,w:170,h:60,t:"Authorization\nserver",c:"orange",fs:15},
  {id:"s1",x:400,y:130,w:170,h:60,t:"Remote server",sub:"Streamable HTTP · OAuth",c:"teal",fs:15},
  {id:"s2",x:400,y:215,w:170,h:60,t:"Remote server",sub:"Streamable HTTP",c:"teal",fs:15},
  {id:"s3",x:400,y:300,w:170,h:60,t:"Local server",sub:"stdio subprocess",c:"teal",fs:15},
  {id:"b1",x:650,y:130,w:150,h:60,t:"SaaS API",c:"gray",fs:15},
  {id:"b2",x:650,y:212,w:150,h:66,t:"Database",s:"db",c:"gray",fs:15},
  {id:"b3",x:650,y:300,w:150,h:60,t:"Local files / git",c:"gray",fs:15}
 ],
 edges:[
  {a:"c1",b:"au",d:1,t:"OAuth 2.1",lp:[335,118],c:"orange"},
  {a:"c1",b:"s1",bi:1},{a:"c2",b:"s2",bi:1},{a:"c3",b:"s3",bi:1},
  {a:"s1",b:"b1"},{a:"s2",b:"b2"},{a:"s3",b:"b3"}
 ],
 notes:[{x:410,y:392,t:"servers expose tools · resources · prompts;  clients offer elicitation (sampling, roots deprecated)",a:"middle",fs:13}]};

D["agents-tool-use-durable"]={w:820,h:360,label:"Durable agent run: a trigger starts a durable workflow that runs the agent loop as deterministic code and appends every step to an event history. LLM calls and tool calls run as retried activities, tool calls carry idempotency keys to external systems, and human approvals arrive as signals with timeouts. After a crash the workflow replays its history and resumes at the last completed step.",
 nodes:[
  {id:"tr",x:10,y:140,w:115,h:60,t:"Trigger",sub:"API / schedule",c:"gray",fs:15},
  {id:"wf",x:170,y:120,w:200,h:100,t:"Durable workflow",sub:"agent loop as code\ndeterministic",c:"orange",fs:16},
  {id:"hi",x:180,y:265,w:180,h:72,t:"Event history",s:"db",c:"gray",fs:15},
  {id:"lm",x:440,y:20,w:185,h:62,t:"LLM call",sub:"activity · retry",c:"purple",fs:15},
  {id:"tc",x:440,y:122,w:185,h:62,t:"Tool call",sub:"activity · idem. key",c:"teal",fs:15},
  {id:"ap",x:440,y:224,w:185,h:62,t:"Human approval",sub:"signal · timeout",c:"red",fs:15},
  {id:"ex",x:680,y:122,w:130,h:62,t:"External\nsystem",c:"gray",fs:15},
  {id:"u",x:705,y:218,w:70,h:72,t:"Approver",s:"person"}
 ],
 edges:[
  {a:"tr",b:"wf"},{a:"wf",b:"hi",d:1,t:"append"},
  {a:"wf",b:"lm"},{a:"wf",b:"tc"},{a:"wf",b:"ap"},
  {a:"tc",b:"ex"},{a:"u",b:"ap",t:"approve"}
 ],
 notes:[{x:590,y:322,t:"crash → replay history → resume at the last completed step",a:"middle",fs:13}]};
