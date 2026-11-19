D["evaluation-ladder"]={w:780,h:250,label:"The grader ladder: from cheap, fast assertions run on every commit, through reference matching, LLM judges and human review, to online signals from real traffic, which are slow, costly and sampled but highest fidelity.",
 nodes:[
  {id:"a",x:10,y:50,w:136,h:96,t:"Assertions",sub:"schema, regex,\ncode runs",c:"green",fs:15},
  {id:"b",x:166,y:50,w:136,h:96,t:"Reference\nmatch",sub:"exact, F1,\nexecution",c:"teal",fs:15},
  {id:"c",x:322,y:50,w:136,h:96,t:"LLM judge",sub:"rubric or\npairwise",c:"blue",fs:15},
  {id:"d",x:478,y:50,w:136,h:96,t:"Human\nreview",sub:"experts,\ncalibration",c:"purple",fs:15},
  {id:"e",x:634,y:50,w:136,h:96,t:"Online",sub:"A/B, feedback,\nsampled judging",c:"orange",fs:15},
  {id:"l",x:10,y:190,w:200,h:30,t:"cheap · fast · every commit",s:"text",c:"green",fs:13},
  {id:"r",x:580,y:190,w:190,h:30,t:"slow · costly · sampled",s:"text",c:"orange",fs:13}
 ],
 edges:[{a:"l",b:"r",t:"fidelity and cost per case rise"}],
 notes:[{x:390,y:24,t:"use the cheapest grader that measures what you care about",a:"middle",fs:14,c:"gray"}]};
D["evaluation-judge"]={w:760,h:300,label:"Calibrating an LLM judge: the same eval cases are labeled by humans and by the judge; agreement and Cohen's kappa are compared; if kappa is high the judge is trusted for scale, otherwise the rubric is fixed and the judge re-run.",
 nodes:[
  {id:"ds",x:10,y:105,w:120,h:86,t:"Eval\ncases",s:"db",c:"teal",fs:16},
  {id:"hl",x:190,y:20,w:180,h:66,t:"Human labels",sub:"2 raters, adjudicated",c:"purple",fs:16},
  {id:"jg",x:190,y:200,w:180,h:66,t:"LLM judge",sub:"rubric v3",c:"orange",fs:16},
  {id:"cmp",x:440,y:110,w:150,h:76,t:"Compare",sub:"agreement, κ",c:"blue",fs:16},
  {id:"ok",x:640,y:40,w:115,h:52,t:"trust judge",s:"pill",c:"green",fs:15},
  {id:"fix",x:640,y:200,w:115,h:66,t:"Fix rubric",sub:"examples, scale",c:"red",fs:15}
 ],
 edges:[{a:"ds",b:"hl"},{a:"ds",b:"jg"},{a:"hl",b:"cmp"},{a:"jg",b:"cmp"},{a:"cmp",b:"ok",t:"κ high"},{a:"cmp",b:"fix",t:"κ low",c:"red"},{a:"fix",b:"jg",d:1,t:"re-run",c:"red"}]};
D["evaluation-infra"]={w:820,h:380,label:"Eval infrastructure: sampled production traces are curated into a versioned dataset store; a CI trigger on any prompt, model or retrieval change starts the eval runner, which calls the system under test, sends outputs to a grader pool of code checks, LLM judges and humans, writes scores to a results warehouse, and dashboards report a pass or block verdict back to CI.",
 nodes:[
  {id:"tr",x:10,y:40,w:130,h:66,t:"Prod traces",sub:"sampled",c:"gray",fs:15},
  {id:"ds",x:10,y:180,w:130,h:84,t:"Dataset\nstore",s:"db",c:"teal",fs:15},
  {id:"ci",x:190,y:290,w:160,h:70,t:"CI / PR",sub:"prompt, model,\nretrieval change",c:"gray",fs:15},
  {id:"rn",x:220,y:170,w:150,h:76,t:"Eval runner",sub:"parallel, cached",c:"orange",fs:16},
  {id:"sut",x:440,y:50,w:160,h:72,t:"System under\ntest",c:"blue",fs:15},
  {id:"jp",x:440,y:200,w:160,h:72,t:"Grader pool",sub:"code · judge · human",c:"purple",fs:15},
  {id:"wh",x:660,y:110,w:150,h:90,t:"Results\nwarehouse",s:"db",c:"teal",fs:15},
  {id:"db",x:660,y:270,w:150,h:66,t:"Dashboards\n+ verdict",c:"green",fs:15}
 ],
 edges:[{a:"tr",b:"ds",t:"curate"},{a:"ds",b:"rn"},{a:"ci",b:"rn",t:"trigger"},{a:"rn",b:"sut"},{a:"sut",b:"jp",t:"outputs"},{a:"jp",b:"wh",t:"scores"},{a:"wh",b:"db"},{a:"db",b:"ci",d:1,t:"pass / block",c:"green"}]};
