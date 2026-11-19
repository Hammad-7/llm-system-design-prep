D["design-voice-agent-cascade"]={w:820,h:300,label:"Two voice architectures. Cascaded: user audio flows through voice activity and turn detection, streaming speech-to-text, the LLM and streaming text-to-speech back to the user. Speech-to-speech: user audio goes straight into one realtime model that returns audio.",
 zones:[{x:8,y:8,w:804,h:128,t:"Cascaded pipeline",c:"blue"},{x:8,y:160,w:804,h:128,t:"Speech-to-speech (realtime model)",c:"purple"}],
 nodes:[
  {id:"a",x:24,y:52,w:100,h:66,t:"User\naudio",c:"gray",fs:15},
  {id:"b",x:152,y:52,w:118,h:66,t:"VAD + turn\ndetection",sub:"local, ~10–100 ms",c:"orange",fs:14},
  {id:"c",x:298,y:52,w:112,h:66,t:"Streaming\nSTT",sub:"partials",c:"teal",fs:14},
  {id:"d",x:438,y:52,w:104,h:66,t:"LLM",sub:"streams text",c:"purple",fs:15},
  {id:"e",x:570,y:52,w:112,h:66,t:"Streaming\nTTS",sub:"per sentence",c:"teal",fs:14},
  {id:"f",x:710,y:52,w:92,h:66,t:"Agent\naudio",c:"gray",fs:15},
  {id:"g",x:24,y:206,w:100,h:66,t:"User\naudio",c:"gray",fs:15},
  {id:"h",x:250,y:200,w:320,h:78,t:"Realtime speech model",sub:"audio in → audio out\nbuilt-in VAD, tool calls",c:"purple",fs:16},
  {id:"i",x:710,y:206,w:92,h:66,t:"Agent\naudio",c:"gray",fs:15}
 ],
 edges:[{a:"a",b:"b"},{a:"b",b:"c"},{a:"c",b:"d"},{a:"d",b:"e"},{a:"e",b:"f"},{a:"g",b:"h",t:"audio frames"},{a:"h",b:"i",t:"audio frames"}]};
D["design-voice-agent-bargein"]={w:790,h:250,label:"Barge-in handling: the user starts speaking while the agent talks, voice activity detection fires, the agent stops text-to-speech playback and flushes buffers, cancels the in-flight LLM generation, and truncates its history to the words the user actually heard. Short backchannels like mm-hm can resume playback instead.",
 nodes:[
  {id:"a",x:10,y:50,w:132,h:76,t:"User speaks\nover agent",c:"gray",fs:15},
  {id:"b",x:170,y:50,w:132,h:76,t:"VAD fires",sub:"user speech\n> ~150–250 ms",c:"orange",fs:15},
  {id:"c",x:330,y:50,w:132,h:76,t:"Stop TTS +\nflush buffers",sub:"server and client",c:"red",fs:15},
  {id:"d",x:490,y:50,w:132,h:76,t:"Cancel LLM\nstream",sub:"stop paying",c:"purple",fs:15},
  {id:"e",x:650,y:50,w:132,h:76,t:"Truncate\nhistory",sub:"to audio played",c:"blue",fs:15},
  {id:"f",x:170,y:172,w:132,h:60,t:"Backchannel?",sub:"mm-hm, cough",c:"gray",fs:14,dash:1},
  {id:"g",x:330,y:172,w:132,h:60,t:"Resume or\nkeep talking",c:"green",fs:14}
 ],
 edges:[{a:"a",b:"b"},{a:"b",b:"c"},{a:"c",b:"d"},{a:"d",b:"e"},{a:"b",b:"f",d:1},{a:"f",b:"g",d:1}]};
D["design-voice-agent-final"]={w:840,h:470,label:"Voice agent high-level design: callers reach a media edge through a telephony SIP trunk or a WebRTC web client. The edge notifies a dispatcher, which assigns a per-call agent worker. The worker runs voice activity and turn detection, barge-in and TTS chunking, and calls streaming STT, an LLM gateway, streaming TTS and business tools. It writes to a session store, encrypted recordings and transcripts, and traces for evaluation.",
 nodes:[
  {id:"u",x:10,y:196,w:70,h:72,t:"Caller",s:"person"},
  {id:"tel",x:105,y:84,w:132,h:64,t:"Telephony",sub:"SIP trunk · PSTN",c:"gray",fs:15},
  {id:"web",x:105,y:300,w:132,h:64,t:"Web / app",sub:"WebRTC client",c:"gray",fs:15},
  {id:"edge",x:272,y:180,w:140,h:100,t:"Media Edge",sub:"WebRTC SFU\nSIP bridge\njitter buffer",c:"blue",fs:16},
  {id:"disp",x:272,y:24,w:140,h:62,t:"Dispatcher",sub:"assign worker",c:"gray",fs:15},
  {id:"wk",x:452,y:150,w:190,h:136,t:"Agent Worker",sub:"one per call\nVAD · turn detection\nbarge-in · TTS chunking\ndialogue state",c:"orange",fs:17},
  {id:"stt",x:690,y:16,w:140,h:56,t:"Streaming STT",c:"teal",fs:15},
  {id:"llm",x:690,y:96,w:140,h:56,t:"LLM Gateway",sub:"fast model",c:"purple",fs:15},
  {id:"tts",x:690,y:176,w:140,h:56,t:"Streaming TTS",c:"teal",fs:15},
  {id:"tools",x:690,y:256,w:140,h:64,t:"Tools / APIs",sub:"calendar · CRM",c:"red",fs:15},
  {id:"ss",x:470,y:360,w:150,h:76,t:"Session\nstore",s:"db",c:"gray",fs:15},
  {id:"rec",x:690,y:360,w:140,h:90,t:"Recordings +\ntranscripts",s:"db",c:"gray",fs:14},
  {id:"obs",x:272,y:372,w:140,h:62,t:"Traces + evals",c:"green",fs:15}
 ],
 edges:[{a:"u",b:"tel"},{a:"u",b:"web"},{a:"tel",b:"edge",t:"SIP/RTP",lp:[262,148]},{a:"web",b:"edge",t:"WebRTC",lp:[262,318]},
  {a:"edge",b:"disp",t:"new call"},{a:"disp",b:"wk",t:"assign"},{a:"edge",b:"wk",bi:1,t:"audio",lp:[432,214]},
  {a:"wk",b:"stt",as:"r0.12",bs:"l"},{a:"wk",b:"llm",as:"r0.35",bs:"l"},{a:"wk",b:"tts",as:"r0.6",bs:"l"},{a:"wk",b:"tools",as:"r0.88",bs:"l"},
  {a:"wk",b:"ss",as:"b0.3"},{a:"wk",b:"rec",as:"b0.85",d:1},{a:"wk",b:"obs",as:"b0.05",d:1}]};
