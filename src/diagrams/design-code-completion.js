D["design-code-completion-client"]={w:800,h:240,label:"Client-side completion pipeline in the IDE extension: a keystroke resets the debounce timer and cancels any in-flight request; the typed-through cache is checked first and a hit renders ghost text immediately; on a miss the extension gathers prefix, suffix and snippets, streams a request, post-filters the tokens and renders ghost text.",
 nodes:[
  {id:"k",x:10,y:40,w:110,h:50,t:"Keystroke",c:"gray",fs:15,s:"pill"},
  {id:"d",x:150,y:34,w:120,h:62,t:"Debounce\n+ cancel",c:"purple",fs:15},
  {id:"c",x:300,y:34,w:130,h:62,t:"Typed-through\ncache",c:"teal",fs:14},
  {id:"g",x:460,y:34,w:160,h:62,t:"Gather context",sub:"prefix · suffix · snippets",c:"blue",fs:15},
  {id:"s",x:650,y:34,w:140,h:62,t:"Stream request",sub:"HTTP/2",c:"orange",fs:15},
  {id:"f",x:650,y:160,w:140,h:62,t:"Post-filter",sub:"trim · dedupe suffix",c:"red",fs:15},
  {id:"r",x:420,y:160,w:170,h:62,t:"Render ghost text",c:"green",fs:15}
 ],
 edges:[{a:"k",b:"d"},{a:"d",b:"c"},{a:"c",b:"g",t:"miss"},{a:"g",b:"s"},{a:"s",b:"f",t:"tokens"},{a:"f",b:"r"},
  {a:"c",b:"r",t:"hit",c:"teal"}]};
D["design-code-completion-prompt"]={w:780,h:200,label:"A fill-in-the-middle completion prompt: file path and language, snippets retrieved from other open files, relevant symbols and imports, then the prefix before the cursor and the suffix after it, wrapped in sentinel tokens; the model generates the missing middle.",
 nodes:[
  {id:"a",x:10,y:60,w:90,h:70,t:"File path\n+ language",c:"gray",fs:13},
  {id:"b",x:104,y:60,w:170,h:70,t:"Snippets from\nopen tabs",c:"teal",fs:14},
  {id:"c",x:278,y:60,w:100,h:70,t:"Symbols /\nimports",c:"teal",fs:13},
  {id:"p",x:382,y:60,w:190,h:70,t:"<PRE> prefix\n(code above cursor)",c:"blue",fs:14},
  {id:"s",x:576,y:60,w:110,h:70,t:"<SUF> suffix\n(below)",c:"purple",fs:13},
  {id:"m",x:690,y:60,w:80,h:70,t:"<MID>\noutput",c:"orange",fs:13,dash:1}
 ],
 notes:[{x:194,y:36,t:"retrieved context: dropped first",a:"middle",fs:14,c:"teal"},
  {x:534,y:36,t:"the current file: highest priority",a:"middle",fs:14,c:"blue"},
  {x:390,y:162,t:"the model reads prefix and suffix, then writes the missing middle at the cursor",a:"middle",fs:13},
  {x:390,y:188,t:"everything is cut to a fixed token budget, most valuable pieces first",a:"middle",fs:13}]};
D["design-code-completion-final"]={w:860,h:440,label:"Final autocomplete design: the IDE extension streams requests to a regional edge proxy that authenticates, rate limits and applies org policy; a router with session affinity sends each developer's requests to the GPU replica that holds their prefix cache; a small fill-in-the-middle model runs with continuous batching; content filters check the token stream before it returns; telemetry on shown, accepted and retained suggestions feeds a metrics store, offline evals and training, which ship new models back to the pool.",
 nodes:[
  {id:"u",x:10,y:180,w:70,h:72,t:"Developer",s:"person"},
  {id:"ext",x:100,y:170,w:150,h:92,t:"IDE extension",sub:"debounce · cache\ncontext · render",c:"purple",fs:16},
  {id:"pol",x:300,y:30,w:150,h:84,t:"Org policy +\nentitlements",s:"db",c:"gray",fs:14},
  {id:"ed",x:300,y:176,w:150,h:80,t:"Edge proxy",sub:"auth · rate limit\nregional",c:"gray",fs:16},
  {id:"flt",x:500,y:36,w:150,h:72,t:"Content filters",sub:"secrets · public code",c:"red",fs:15},
  {id:"rt",x:500,y:176,w:150,h:80,t:"Router",sub:"session affinity\n(prefix cache)",c:"orange",fs:16},
  {id:"gp",x:700,y:160,w:150,h:112,t:"GPU pool",sub:"small FIM model\ncontinuous batching\nprefix cache",c:"blue",fs:17},
  {id:"tel",x:300,y:330,w:150,h:76,t:"Telemetry",sub:"shown · accepted\nretained",c:"green",fs:16},
  {id:"met",x:500,y:326,w:150,h:84,t:"Metrics +\neval store",s:"db",c:"gray",fs:14},
  {id:"off",x:700,y:330,w:150,h:76,t:"Offline evals\n+ training",c:"teal",fs:15}
 ],
 edges:[{a:"u",b:"ext"},{a:"ext",b:"ed",t:"request\n/ cancel"},{a:"ed",b:"pol",d:1,t:"policy"},{a:"ed",b:"rt"},{a:"rt",b:"gp"},
  {a:"gp",b:"flt",t:"tokens"},{a:"flt",b:"ed",t:"stream"},
  {a:"ext",b:"tel",d:1,t:"events"},{a:"tel",b:"met"},{a:"met",b:"off"},{a:"off",b:"gp",t:"ship model",c:"teal"}]};
