D["design-deep-research-loop"]={w:800,h:420,label:"Orchestrator-workers research loop: the user's question goes to a lead agent that saves its plan to memory, delegates task specs to parallel subagents with their own contexts, which call search, fetch and browse tools and write full notes and sources to a findings store while returning condensed findings to the lead; the lead sends the draft report to a citation agent, which returns the cited report to the user.",
 nodes:[
  {id:"u",x:10,y:150,w:70,h:72,t:"User",s:"person"},
  {id:"ld",x:130,y:140,w:170,h:92,t:"Lead agent",sub:"plan · delegate\nsynthesize",c:"orange",fs:18},
  {id:"mem",x:130,y:16,w:170,h:84,t:"Plan + memory",s:"db",c:"gray",fs:15},
  {id:"s1",x:385,y:30,w:150,h:64,t:"Subagent A",sub:"own context",c:"blue",fs:15},
  {id:"s2",x:385,y:154,w:150,h:64,t:"Subagent B",sub:"own context",c:"blue",fs:15},
  {id:"s3",x:385,y:278,w:150,h:64,t:"Subagent C",sub:"own context",c:"blue",fs:15},
  {id:"tl",x:610,y:140,w:175,h:92,t:"Search, fetch,\nbrowse tools",c:"teal",fs:15},
  {id:"fs",x:610,y:270,w:175,h:84,t:"Findings +\nsources",s:"db",c:"gray",fs:15},
  {id:"ca",x:130,y:300,w:170,h:66,t:"Citation agent",sub:"claims → spans",c:"red",fs:16}
 ],
 edges:[{a:"u",b:"ld",t:"question"},{a:"ld",b:"mem",d:1,bi:1,t:"save plan"},
  {a:"ld",b:"s1",t:"task spec"},{a:"ld",b:"s2",bi:1},{a:"ld",b:"s3",bi:1,t:"condensed\nfindings",lp:[338,286]},
  {a:"s1",b:"tl"},{a:"s2",b:"tl"},{a:"s3",b:"tl"},{a:"s3",b:"fs",d:1,t:"full notes"},
  {a:"ld",b:"ca",t:"draft"},{a:"ca",b:"u",as:"b0.3",via:[[181,400],[45,400]],bs:"b",t:"cited report",lp:[110,400]}]};
D["design-deep-research-final"]={w:860,h:460,label:"Final deep research design: a research API starts a durable workflow that runs the lead and subagents as activities and checkpoints to workflow history; model calls go through an LLM gateway with budgets to the lead and subagent models; tool calls go through a rate-limited tool service to search APIs and the web, saving raw pages to an artifact store; a citation pass maps claims to stored spans; progress events stream to the user.",
 nodes:[
  {id:"hi",x:262,y:16,w:170,h:90,t:"Workflow\nhistory",s:"db",c:"gray",fs:15},
  {id:"lg",x:480,y:36,w:160,h:66,t:"LLM Gateway",sub:"budgets · priority",c:"purple",fs:16},
  {id:"md",x:680,y:30,w:165,h:78,t:"Models",sub:"lead: strongest\nsubagents: fast",c:"blue",fs:16},
  {id:"u",x:10,y:186,w:70,h:72,t:"User",s:"person"},
  {id:"api",x:100,y:192,w:125,h:62,t:"Research API",c:"gray",fs:15},
  {id:"wf",x:262,y:176,w:170,h:92,t:"Durable workflow",sub:"lead + subagents\nas activities",c:"orange",fs:16},
  {id:"tq",x:480,y:188,w:160,h:68,t:"Tool service",sub:"search · fetch · browse",c:"teal",fs:16},
  {id:"web",x:680,y:184,w:165,h:76,t:"Search APIs\n+ the web",c:"gray",fs:15},
  {id:"ev",x:100,y:350,w:125,h:62,t:"Event stream",sub:"SSE · notify",c:"green",fs:15},
  {id:"ci",x:262,y:348,w:170,h:66,t:"Citation pass",sub:"claim → span",c:"red",fs:16},
  {id:"as",x:480,y:336,w:160,h:92,t:"Artifact store\n(pages, notes)",s:"db",c:"gray",fs:14}
 ],
 edges:[{a:"u",b:"api"},{a:"api",b:"wf"},{a:"wf",b:"hi",d:1,t:"checkpoint"},{a:"wf",b:"lg"},{a:"lg",b:"md"},
  {a:"wf",b:"tq",t:"tool calls"},{a:"tq",b:"web",t:"rate-limited",lp:[660,160]},{a:"tq",b:"as",t:"raw pages"},
  {a:"wf",b:"ci"},{a:"ci",b:"as",t:"spans"},{a:"wf",b:"ev",t:"events"},{a:"ev",b:"u",via:[[45,381]],bs:"b"}]};
