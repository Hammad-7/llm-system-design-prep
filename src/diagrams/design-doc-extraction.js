D["design-doc-extraction-routing"]={w:770,h:250,label:"Confidence routing: extracted fields pass schema checks, business rules, cross-document checks and model agreement to produce a confidence score. High confidence is auto-accepted, low confidence or conflicts go to human review, and unreadable or wrong documents trigger a re-upload request.",
 nodes:[
  {id:"ex",x:10,y:90,w:128,h:70,t:"Extracted\nfields",c:"purple",fs:15},
  {id:"ck",x:172,y:76,w:180,h:98,t:"Checks",sub:"schema · business rules\ncross-document\nmodel agreement",c:"teal",fs:16},
  {id:"sc",x:388,y:90,w:124,h:70,t:"Confidence\nper field",c:"blue",fs:15},
  {id:"ok",x:560,y:12,w:200,h:60,t:"Auto-accept",sub:"all checks pass",c:"green",fs:15},
  {id:"rv",x:560,y:96,w:200,h:60,t:"Human review",sub:"low confidence / conflict",c:"orange",fs:15},
  {id:"rj",x:560,y:180,w:200,h:60,t:"Ask to re-upload",sub:"unreadable / wrong type",c:"red",fs:15}
 ],
 edges:[{a:"ex",b:"ck"},{a:"ck",b:"sc"},{a:"sc",b:"ok",as:"r0.2",bs:"l"},{a:"sc",b:"rv"},{a:"sc",b:"rj",as:"r0.8",bs:"l"}]};
D["design-doc-extraction-final"]={w:840,h:470,label:"Document extraction high-level design: the client gets a presigned URL from the upload API and stores the file in an encrypted blob store; a job record is written and a message enqueued with a dead-letter queue. Extraction workers classify and split, extract to a schema through a model gateway with fallback providers and batch mode, validate fields, and run cross-document checks. Low-confidence results go to a human review queue. Results and an audit log are stored, and webhooks notify the client.",
 zones:[{x:400,y:14,w:250,h:340,t:"Extraction workers",c:"gray"}],
 nodes:[
  {id:"u",x:10,y:192,w:70,h:72,t:"Client",s:"person"},
  {id:"api",x:100,y:198,w:126,h:62,t:"Upload API",sub:"presigned URLs",c:"gray",fs:15},
  {id:"blob",x:100,y:36,w:126,h:86,t:"Blob store\n(encrypted)",s:"db",c:"gray",fs:14},
  {id:"jobs",x:262,y:36,w:112,h:80,t:"Jobs DB",s:"db",c:"gray",fs:15},
  {id:"q",x:262,y:198,w:112,h:62,t:"Queue",sub:"+ dead letters",c:"orange",fs:15},
  {id:"cls",x:420,y:48,w:210,h:50,t:"1. Classify + split",c:"blue",fs:15},
  {id:"ext",x:420,y:122,w:210,h:60,t:"2. Extract to schema",sub:"OCR / vision LLM",c:"purple",fs:15},
  {id:"val",x:420,y:206,w:210,h:50,t:"3. Validate fields",c:"teal",fs:15},
  {id:"cons",x:420,y:280,w:210,h:60,t:"4. Cross-doc checks",sub:"per case",c:"red",fs:15},
  {id:"prov",x:690,y:20,w:140,h:60,t:"LLM / OCR\nproviders",c:"gray",fs:14},
  {id:"gw",x:690,y:112,w:140,h:72,t:"Model Gateway",sub:"fallback · batch",c:"purple",fs:15},
  {id:"rv",x:690,y:236,w:140,h:66,t:"Review queue",sub:"human in the loop",c:"orange",fs:15},
  {id:"rp",x:725,y:340,w:70,h:72,t:"Reviewer",s:"person"},
  {id:"res",x:462,y:376,w:150,h:84,t:"Results +\naudit log",s:"db",c:"gray",fs:15},
  {id:"hook",x:100,y:352,w:130,h:62,t:"Webhooks /\nstatus API",c:"green",fs:14}
 ],
 edges:[{a:"u",b:"api"},{a:"api",b:"blob",t:"presign",d:1},{a:"api",b:"jobs"},{a:"api",b:"q"},
  {a:"q",b:"cls",as:"r",bs:"l"},{a:"cls",b:"ext"},{a:"ext",b:"val"},{a:"val",b:"cons"},
  {a:"ext",b:"gw"},{a:"gw",b:"prov"},{a:"cons",b:"rv"},{a:"rp",b:"rv"},
  {a:"cons",b:"res",as:"b0.4"},{a:"rv",b:"res",d:1},{a:"res",b:"hook",bs:"r"},{a:"hook",b:"u",via:[[45,383]],bs:"b"}]};
