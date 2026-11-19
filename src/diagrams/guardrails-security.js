D["guardrails-security-trifecta"]={w:800,h:360,label:"The lethal trifecta: an agent that can read private data, also reads untrusted content that an attacker has planted instructions in, and also has an exfiltration channel such as HTTP requests, email or image URLs. With all three, injected instructions can make the agent send private data to the attacker.",
 nodes:[
  {id:"pd",x:40,y:30,w:200,h:70,t:"Private data",sub:"email, files, databases",c:"blue",fs:17},
  {id:"un",x:560,y:30,w:200,h:70,t:"Untrusted content",sub:"web, docs, issues, email",c:"red",fs:17},
  {id:"ag",x:320,y:145,w:160,h:70,t:"Agent",sub:"LLM + tools",c:"purple",fs:18},
  {id:"ex",x:300,y:270,w:200,h:70,t:"Exfiltration channel",sub:"HTTP, email, image URL",c:"orange",fs:16},
  {id:"at",x:690,y:160,w:70,h:72,t:"Attacker",s:"person",c:"red"}
 ],
 edges:[
  {a:"pd",b:"ag",t:"reads"},
  {a:"un",b:"ag",t:"reads"},
  {a:"at",b:"un",t:"plants instructions",lp:[690,128]},
  {a:"ag",b:"ex",t:"sends"},
  {a:"ex",b:"at",d:1,c:"red",t:"data leaves"}
 ],
 notes:[{x:40,y:300,t:"remove any one leg\nand the attack fails",fs:14,c:"gray"}]};

D["guardrails-security-dual"]={w:840,h:340,label:"Dual LLM pattern: plain controller code sits between the user, a privileged LLM and a quarantined LLM. The privileged LLM plans and calls tools but only ever sees symbolic variables such as $VAR1. The quarantined LLM reads untrusted data and returns results as variables. Code, not a model, dereferences variables when passing them to tools.",
 nodes:[
  {id:"u",x:10,y:124,w:70,h:72,t:"User",s:"person"},
  {id:"ct",x:110,y:128,w:140,h:64,t:"Controller",sub:"plain code",c:"gray",fs:17},
  {id:"pl",x:400,y:20,w:190,h:72,t:"Privileged LLM",sub:"plans · calls tools",c:"purple",fs:17},
  {id:"ql",x:400,y:228,w:190,h:72,t:"Quarantined LLM",sub:"reads untrusted text",c:"red",fs:17},
  {id:"tl",x:670,y:20,w:160,h:72,t:"Tools",sub:"send email, calendar",c:"teal",fs:17},
  {id:"ud",x:670,y:228,w:160,h:72,t:"Untrusted data",sub:"emails, web pages",c:"orange",fs:16}
 ],
 edges:[
  {a:"u",b:"ct"},
  {a:"ct",b:"pl",bi:1,t:"symbols only: $VAR1"},
  {a:"ct",b:"ql",bi:1,t:"text in, $VAR out"},
  {a:"pl",b:"tl"},
  {a:"ud",b:"ql"}
 ],
 notes:[{x:420,y:326,t:"the privileged LLM never sees untrusted tokens; code dereferences variables",a:"middle",fs:13}]};

D["guardrails-security-layers"]={w:840,h:430,label:"Defense in depth for an LLM application: requests pass a gateway with auth and quotas, input checks for moderation and injection, a context builder that applies ACLs and trust labels, then the model. Model output passes output filters for PII, links and safety before returning to the user. Tool calls go through a tool policy engine with allowlists and approvals, run in a sandbox with no secrets whose network goes through an egress allowlist proxy, and use scoped short-lived tokens from a credential broker. Everything is written to an audit log.",
 nodes:[
  {id:"u",x:10,y:30,w:70,h:72,t:"User",s:"person"},
  {id:"gw",x:110,y:40,w:120,h:60,t:"Gateway",sub:"auth · quotas",c:"gray",fs:16},
  {id:"in",x:260,y:40,w:150,h:60,t:"Input checks",sub:"moderation · injection",c:"red",fs:16},
  {id:"cb",x:440,y:40,w:150,h:60,t:"Context builder",sub:"ACLs · trust labels",c:"blue",fs:16},
  {id:"m",x:625,y:40,w:110,h:60,t:"Model",c:"purple",fs:18},
  {id:"of",x:430,y:190,w:160,h:64,t:"Output filters",sub:"PII · links · safety",c:"red",fs:16},
  {id:"tp",x:625,y:190,w:170,h:64,t:"Tool policy",sub:"allowlist · approvals",c:"orange",fs:16},
  {id:"sb",x:625,y:330,w:170,h:70,t:"Sandbox",sub:"microVM · no secrets",c:"teal",fs:16},
  {id:"eg",x:420,y:335,w:160,h:60,t:"Egress proxy",sub:"allowlist",c:"red",fs:16},
  {id:"cr",x:200,y:335,w:175,h:60,t:"Credential broker",sub:"scoped, short-lived",c:"gray",fs:15},
  {id:"au",x:20,y:320,w:140,h:80,t:"Audit log\n& traces",s:"db",c:"gray",fs:15}
 ],
 edges:[
  {a:"u",b:"gw"},{a:"gw",b:"in"},{a:"in",b:"cb"},{a:"cb",b:"m"},
  {a:"m",b:"of"},{a:"m",b:"tp"},
  {a:"of",b:"u",via:[[45,222]],bs:"b",t:"safe response",lp:[250,222]},
  {a:"tp",b:"sb"},{a:"sb",b:"eg"},
  {a:"cr",b:"tp",as:"t0.8",bs:"b0.15",d:1,t:"scoped token",lp:[520,290]}
 ]};
