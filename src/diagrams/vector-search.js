D["vector-search-hnsw"]={w:760,h:350,label:"HNSW search: the query enters at the top layer, which has few nodes and long links, greedily hops toward the query, drops down a layer at the closest node, and repeats until layer 0, which holds every vector, where it finds the best match.",
 zones:[{x:10,y:10,w:740,h:85,t:"Layer 2: few nodes, long hops",c:"purple"},{x:10,y:115,w:740,h:95,t:"Layer 1",c:"blue"},{x:10,y:230,w:740,h:110,t:"Layer 0: every vector, short hops",c:"teal"}],
 nodes:[
  {id:"e2",x:60,y:40,w:70,h:32,t:"entry",c:"purple",fs:14,s:"pill"},
  {id:"a2",x:330,y:40,w:54,h:32,t:"A",c:"purple",fs:14,s:"pill"},
  {id:"d1",x:60,y:150,w:54,h:32,t:"D",c:"gray",fs:14,s:"pill"},
  {id:"b1",x:190,y:150,w:54,h:32,t:"B",c:"gray",fs:14,s:"pill"},
  {id:"a1",x:330,y:150,w:54,h:32,t:"A",c:"blue",fs:14,s:"pill"},
  {id:"c1",x:520,y:150,w:54,h:32,t:"C",c:"blue",fs:14,s:"pill"},
  {id:"f1",x:660,y:150,w:54,h:32,t:"F",c:"gray",fs:14,s:"pill"},
  {id:"n1",x:40,y:275,w:54,h:32,t:"G",c:"gray",fs:14,s:"pill"},
  {id:"n2",x:140,y:275,w:54,h:32,t:"H",c:"gray",fs:14,s:"pill"},
  {id:"n3",x:240,y:275,w:54,h:32,t:"I",c:"gray",fs:14,s:"pill"},
  {id:"a0",x:330,y:275,w:54,h:32,t:"A",c:"gray",fs:14,s:"pill"},
  {id:"n4",x:425,y:275,w:54,h:32,t:"J",c:"gray",fs:14,s:"pill"},
  {id:"c0",x:520,y:275,w:54,h:32,t:"C",c:"teal",fs:14,s:"pill"},
  {id:"q",x:630,y:272,w:110,h:38,t:"best match",c:"green",fs:14}
 ],
 edges:[
  {a:"e2",b:"a2",t:"greedy hop",c:"orange"},{a:"a2",b:"a1",d:1,c:"orange",t:"descend"},{a:"a1",b:"c1",t:"closer",c:"orange"},{a:"c1",b:"c0",d:1,c:"orange"},{a:"c0",b:"q",c:"orange"},
  {a:"d1",b:"b1",noh:1},{a:"b1",b:"a1",noh:1},{a:"c1",b:"f1",noh:1},
  {a:"n1",b:"n2",noh:1},{a:"n2",b:"n3",noh:1},{a:"n3",b:"a0",noh:1},{a:"a0",b:"n4",noh:1},{a:"n4",b:"c0",noh:1}
 ],
 notes:[{x:560,y:56,t:"query q: start at the top,\nfinish on layer 0",a:"middle",fs:13,c:"orange"}]};
D["vector-search-filtering"]={w:780,h:300,label:"Three ways to combine a metadata filter with vector search: pre-filtering runs an exact search over the matching subset; post-filtering runs ANN then drops non-matching rows and can return fewer than k results; filtered traversal checks the predicate during graph search and keeps expanding until k matches are found.",
 zones:[{x:10,y:10,w:245,h:280,t:"Pre-filter",c:"blue"},{x:267,y:10,w:245,h:280,t:"Post-filter",c:"red"},{x:524,y:10,w:245,h:280,t:"Filtered traversal",c:"green"}],
 nodes:[
  {id:"f1",x:30,y:50,w:205,h:60,t:"Metadata filter",sub:"tenant = 42",c:"blue",fs:15},
  {id:"f2",x:30,y:145,w:205,h:60,t:"Exact search over\nthe matching subset",c:"blue",fs:14},
  {id:"f3",x:30,y:225,w:205,h:50,t:"exact, but slow when\nthe subset is large",c:"gray",fs:13,s:"text"},
  {id:"p1",x:287,y:50,w:205,h:60,t:"ANN top-k",sub:"ignores the filter",c:"red",fs:15},
  {id:"p2",x:287,y:145,w:205,h:60,t:"Drop rows that\nfail the filter",c:"red",fs:14},
  {id:"p3",x:287,y:225,w:205,h:50,t:"can return fewer\nthan k (even zero)",c:"red",fs:13,s:"text"},
  {id:"t1",x:544,y:50,w:205,h:60,t:"Graph search checks\npredicate per node",c:"green",fs:14},
  {id:"t2",x:544,y:145,w:205,h:60,t:"Keep expanding until\nk matches found",c:"green",fs:14},
  {id:"t3",x:544,y:225,w:205,h:50,t:"default in good engines;\nplanner falls back to\npre-filter for rare values",c:"gray",fs:12,s:"text"}
 ],
 edges:[{a:"f1",b:"f2"},{a:"p1",b:"p2"},{a:"t1",b:"t2"}]};
D["vector-search-sharding"]={w:780,h:320,label:"Sharded vector search: a query router embeds the query and fans out to every shard; each shard has its own HNSW index and replicas and returns its local top-k; a merge step re-sorts into a global top-k, which then goes to a reranker.",
 nodes:[
  {id:"r",x:20,y:120,w:140,h:76,t:"Query router",sub:"embed, fan out",c:"purple",fs:16},
  {id:"s1",x:250,y:15,w:180,h:84,t:"Shard 1\n(+ 2 replicas)",s:"db",c:"teal",fs:15},
  {id:"s2",x:250,y:118,w:180,h:84,t:"Shard 2\n(+ 2 replicas)",s:"db",c:"teal",fs:15},
  {id:"s3",x:250,y:221,w:180,h:84,t:"Shard N\n(+ 2 replicas)",s:"db",c:"teal",fs:15},
  {id:"m",x:525,y:120,w:130,h:76,t:"Merge",sub:"global top-k",c:"blue",fs:16},
  {id:"rr",x:690,y:120,w:85,h:76,t:"Rerank",c:"orange",fs:15}
 ],
 edges:[{a:"r",b:"s1"},{a:"r",b:"s2"},{a:"r",b:"s3"},{a:"s1",b:"m"},{a:"s2",b:"m",t:"local top-k"},{a:"s3",b:"m"},{a:"m",b:"rr"}]};
D["vector-search-migration"]={w:780,h:300,label:"Re-embedding migration: document changes are dual-written to the serving v1 index and a new v2 index while a backfill job re-embeds the full corpus into v2; shadow reads compare v2 against v1, and the read alias flips to v2 once quality metrics hold, keeping v1 for rollback.",
 nodes:[
  {id:"w",x:10,y:40,w:110,h:60,t:"Doc\nchanges",c:"gray",fs:15},
  {id:"d",x:160,y:40,w:140,h:60,t:"Dual write",sub:"embed v1 + v2",c:"purple",fs:15},
  {id:"v1",x:360,y:20,w:150,h:84,t:"Index v1\n(serving)",s:"db",c:"teal",fs:15},
  {id:"v2",x:360,y:160,w:150,h:84,t:"Index v2\n(new model)",s:"db",c:"blue",fs:15},
  {id:"bf",x:160,y:172,w:140,h:60,t:"Backfill job",sub:"re-embed corpus",c:"orange",fs:15},
  {id:"rd",x:590,y:32,w:170,h:60,t:"Read alias",sub:"→ v1 today",c:"gray",fs:15},
  {id:"sh",x:590,y:172,w:170,h:60,t:"Shadow reads",sub:"compare recall@k",c:"green",fs:15}
 ],
 edges:[{a:"w",b:"d"},{a:"d",b:"v1"},{a:"d",b:"v2"},{a:"bf",b:"v2",t:"batch"},{a:"rd",b:"v1",t:"serve"},{a:"sh",b:"v2"},{a:"sh",b:"rd",d:1,t:"flip when\nmetrics hold",c:"green"}],
 notes:[{x:390,y:282,t:"keep v1 until the rollback window passes",a:"middle",fs:14,c:"gray"}]};
