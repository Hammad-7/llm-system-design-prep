D["api-streaming-modes"]={w:800,h:290,label:"Three API shapes: synchronous request-response holds the connection and returns one JSON body; streaming returns server-sent event deltas over one response; an async job returns 202 with a job ID and later delivers the result by webhook or polling.",
 zones:[{x:10,y:14,w:250,h:236,t:"Synchronous",c:"gray"},{x:275,y:14,w:250,h:236,t:"Streaming (SSE)",c:"teal"},{x:540,y:14,w:250,h:236,t:"Async job",c:"orange"}],
 nodes:[
  {id:"c1",x:40,y:46,w:190,h:44,t:"Client",c:"ink",fs:15,s:"pill"},
  {id:"s1",x:40,y:170,w:190,h:62,t:"API → model",sub:"connection held",c:"gray",fs:15},
  {id:"c2",x:305,y:46,w:190,h:44,t:"Client",c:"ink",fs:15,s:"pill"},
  {id:"s2",x:305,y:170,w:190,h:62,t:"API → model",sub:"flushes each delta",c:"teal",fs:15},
  {id:"c3",x:570,y:46,w:190,h:44,t:"Client",c:"ink",fs:15,s:"pill"},
  {id:"s3",x:570,y:170,w:190,h:62,t:"Job API + workers",sub:"queue · durable",c:"orange",fs:15}
 ],
 edges:[{a:"c1",b:"s1",as:"b0.25",bs:"t0.25",t:"POST"},{a:"s1",b:"c1",as:"t0.75",bs:"b0.75",t:"200 JSON"},
  {a:"c2",b:"s2",as:"b0.25",bs:"t0.25",t:"POST"},{a:"s2",b:"c2",as:"t0.75",bs:"b0.75",t:"event × N"},
  {a:"c3",b:"s3",as:"b0.25",bs:"t0.25",t:"POST"},{a:"s3",b:"c3",as:"t0.75",bs:"b0.75",t:"202 + id",d:1}],
 notes:[{x:135,y:272,t:"short output, server-to-server",a:"middle",fs:13},{x:400,y:272,t:"chat UX: TTFT is what users feel",a:"middle",fs:13},{x:665,y:272,t:"minutes+: agents, batch, docs",a:"middle",fs:13}]};
D["api-streaming-resumable"]={w:790,h:350,label:"Resumable, cancellable streaming: a generation worker appends sequence-numbered events to a per-response event log and checks a cancel flag; the stream endpoint relays events to the client over SSE and replays from Last-Event-ID after a reconnect; a cancel request sets the flag; the final message is persisted.",
 nodes:[
  {id:"c",x:10,y:110,w:70,h:72,t:"Client",s:"person"},
  {id:"lb",x:110,y:116,w:110,h:60,t:"Load\nbalancer",c:"gray",fs:15},
  {id:"e",x:255,y:116,w:140,h:60,t:"Stream\nendpoint",c:"teal",fs:15},
  {id:"ctl",x:470,y:16,w:150,h:58,t:"Cancel flag",sub:"short-TTL key",c:"red",fs:15},
  {id:"g",x:470,y:116,w:150,h:60,t:"Generation\nworker",c:"blue",fs:15},
  {id:"m",x:680,y:116,w:100,h:60,t:"Model",c:"orange",fs:16},
  {id:"buf",x:230,y:240,w:160,h:90,t:"Event log",sub:"Redis Stream\nper response",s:"db",c:"teal",fs:15},
  {id:"db",x:520,y:240,w:150,h:90,t:"Message\nstore",s:"db",c:"gray",fs:15}
 ],
 edges:[{a:"c",b:"lb",bi:1,t:"SSE"},{a:"lb",b:"e"},{a:"g",b:"m",bi:1,t:"tokens"},
  {a:"g",b:"buf",t:"append (seq n)"},{a:"buf",b:"e",t:"read from\nLast-Event-ID"},
  {a:"e",b:"ctl",d:1,c:"red",t:"cancel"},{a:"ctl",b:"g",d:1,c:"red"},{a:"g",b:"db",d:1,t:"final message"}]};
D["api-streaming-events"]={w:790,h:280,label:"Typed event sequence for one streamed turn with a tool call: response created, text deltas, tool call start, partial JSON argument deltas, tool call done, the tool runs, more text deltas, and a completed event carrying token usage.",
 nodes:[
  {id:"e1",x:10,y:40,w:170,h:58,t:"response.created",c:"gray",fs:14,s:"pill"},
  {id:"e2",x:206,y:40,w:170,h:58,t:"text.delta × N",c:"teal",fs:14},
  {id:"e3",x:402,y:40,w:170,h:58,t:"tool_call.start",sub:"name, id",c:"purple",fs:14},
  {id:"e4",x:598,y:40,w:180,h:58,t:"tool_call.args.delta",sub:"partial JSON",c:"purple",fs:14},
  {id:"e5",x:598,y:156,w:180,h:58,t:"tool_call.done",sub:"args now valid JSON",c:"purple",fs:14},
  {id:"e6",x:402,y:156,w:170,h:58,t:"tool runs",sub:"server or client",c:"red",fs:14,dash:1},
  {id:"e7",x:206,y:156,w:170,h:58,t:"text.delta × N",c:"teal",fs:14},
  {id:"e8",x:10,y:156,w:170,h:58,t:"response.completed",sub:"usage, stop reason",c:"green",fs:14}
 ],
 edges:[{a:"e1",b:"e2"},{a:"e2",b:"e3"},{a:"e3",b:"e4"},{a:"e4",b:"e5"},{a:"e5",b:"e6"},{a:"e6",b:"e7"},{a:"e7",b:"e8"}],
 notes:[{x:395,y:254,t:"render text deltas immediately; act on tool arguments only after tool_call.done",a:"middle",fs:14}]};
