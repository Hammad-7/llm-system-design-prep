import html, os
HERE = os.path.dirname(os.path.abspath(__file__))
S={
 'igo':('IGotAnOffer','https://igotanoffer.com/en/advice/generative-ai-system-design-interview'),
 'aced':('Exponent','https://www.aced.io/blog/anthropic-system-design-interview'),
 'ph':('PracHub','https://prachub.com/companies/openai/categories/system-design'),
 'pha':('PracHub','https://prachub.com/interview-questions/design-a-high-concurrency-llm-inference-service'),
 'dg':('DesignGurus','https://www.designgurus.io/answers/detail/what-to-expect-in-the-openai-system-design-interview'),
 'dga':('DesignGurus','https://www.designgurus.io/answers/detail/what-to-expect-in-the-anthropic-system-design-interview'),
 'fg':('AI Eng. Field Guide','https://github.com/alexeygrigorev/ai-engineering-field-guide/blob/main/interview/questions/04-ai-system-design.md'),
 'kd':('KDnuggets','https://www.kdnuggets.com/how-to-answer-ai-system-design-interview-questions'),
 'gf':('GreatFrontEnd','https://greatfrontend.com/interviews/company/openai/questions-guides'),
 'pt':('1Point3Acres','https://www.1point3acres.com/interview/thread/1156508'),
}
# (question, cat, lvl, company, srckey or None, focus, link)
Q=[
("Design ChatGPT","product","m","OpenAI","igo","Streaming, conversation state, context management, GPU admission","#design-chatgpt"),
("Design the Claude chat service","product","m","Anthropic","igo","Same as ChatGPT plus safety layers and capacity under load","#design-chatgpt"),
("Design the OpenAI Playground with saved, shareable presets","product","m","OpenAI","gf","Parameter controls, preset versioning and sharing, streaming, model comparison",None),
("Design a ChatGPT-style homepage with streaming","product","m","OpenAI","ph","Client architecture, SSE, optimistic UI, reconnection",None),
("Design a prompt playground","product","m","Anthropic","pha","Prompt versioning, side-by-side runs, rate limits, sharing",None),
("Design ChatGPT's cross-conversation memory","product","h","Common","fg","Extraction, storage, retrieval by relevance, user control and deletion",None),
("Scale an AI chat feature to 1M daily users","product","m","Common","fg","Capacity math in tokens, caching, routing, cost",None),
("Your app gets 1M LLM queries/day. How do you cut cost?","product","m","Common","fg","Routing, prompt caching, semantic caching, batch APIs, context trimming",None),
("Design a multi-tenant ChatGPT-like service with reusable presets","product","h","OpenAI","ph","Tenant isolation, quotas, preset storage, auditability",None),
("Design a RAG system for a customer-support chatbot","rag","m","Common","kd","Hybrid retrieval, citations, actions, escalation, eval","#design-support-assistant"),
("Design an LLM-powered enterprise search system","rag","h","OpenAI","dg","Connectors, permission-aware indexing, ranking, freshness",None),
("Design a RAG system with evaluation over a private corpus","rag","m","OpenAI","ph","Chunking, retrieval metrics, faithfulness, regression gates",None),
("Design a document Q&A assistant","rag","e","Common","fg","Ingestion, chunking, embeddings, citations",None),
("Design a Perplexity-style real-time answer engine","rag","h","Common","fg","Web search, crawling, freshness, source ranking, latency",None),
("Design a unified query engine across email, calendar, docs and chat","rag","h","Google","fg","Federated retrieval, ACLs per source, query planning",None),
("Design a legal document assistant","rag","m","Common","kd","Long documents, citations, hallucination risk, audit",None),
("Design a conversational recommender combining chat, retrieval and a database","rag","m","Common","igo","Structured + unstructured retrieval, tool calls, ranking",None),
("Design a distributed search system over ~1B documents at ~1M QPS with LLM inference in the path","rag","h","Anthropic","dga","Sharding, replication, caching, where the model sits",None),
("Design an AI coding agent","agent","h","Common","kd","Sandboxes, codebase context, durable runs, evals","#design-coding-agent"),
("Design GitHub Copilot","agent","h","Common","kd","Sub-second completions, fill-in-the-middle prompts, small models, cancellation",None),
("Design an AI code reviewer","agent","m","Common","kd","Diff context, comment quality, false positives, cost per PR",None),
("Architect an AI agent system: loop, tools, memory, orchestration, safety","agent","m","Salesforce","igo","Agent loop, tool contracts, budgets, human-in-the-loop",None),
("Design an agentic AI system","agent","h","Anthropic","aced","Orchestration, failure modes, safety; reported for ML roles",None),
("Design a multi-step agent workflow (meeting scheduling, email campaigns)","agent","m","Common","fg","Workflows vs agents, durable state, confirmations",None),
("Design a deep-research agent that searches the web and writes a cited report","agent","h","Common",None,"Orchestrator-workers, parallel subagents, citations, token cost",None),
("Process 10K monthly uploads (payslips, IDs, references) and flag inconsistencies","agent","m","Common","igo","Document AI pipeline, validation, human review, provider downtime",None),
("Send billing info to insurers automatically from doctors' patient notes","agent","h","Common","igo","Extraction, compliance, human approval, audit trail",None),
("Design a hospital voice assistant","agent","h","Common","fg","Speech pipeline latency, noise, privacy, domain vocabulary",None),
("Design an inference batching system","infra","h","Anthropic","aced","Batch formation, response routing, failover, overload","#design-inference-batching"),
("Review a junior engineer's inference batching design","infra","h","Anthropic","igo","Spot failure modes, deadlines, backpressure, partial failures","#design-inference-batching"),
("Design a high-concurrency LLM inference service","infra","h","Anthropic","pha","Continuous batching, KV memory, routing, autoscaling",None),
("Design a scalable token-generation service at ~100K requests/s","infra","h","Anthropic","aced","Throughput math, batching, sharding, rate limits",None),
("Distribute a large file (e.g. model weights) to thousands of machines","infra","h","Anthropic","aced","Peer-to-peer fan-out, bandwidth limits, verification",None),
("Design a model downloader","infra","m","Anthropic","pha","Chunked downloads, resume, integrity, caching",None),
("Design a large-scale model deployment system (serving, GPU scaling, versioning, caching)","infra","h","OpenAI","fg","Rollouts, canaries, capacity, multi-model routing",None),
("Design GPU scheduling for a video-generation platform","infra","h","OpenAI","ph","Job queues, preemption, fairness, utilization",None),
("Design a GPU credit allocation system for a multi-tenant compute platform","infra","h","OpenAI","ph","Quotas, accounting, fairness, admission",None),
("Design a distributed job queue for 100K+ GPU training jobs with preemption and checkpointing","infra","h","xAI","fg","Scheduling, preemption, checkpoint storage, failure recovery",None),
("Design a scalable system for training an LLM under compute and data constraints","infra","h","OpenAI","igo","Data pipeline, parallelism, checkpointing, evaluation",None),
("Design a small language model that runs on a phone and stays polite","eval","h","Google","igo","Distillation, quantization, on-device safety, evaluation",None),
("Design a language model that minimizes harmful outputs while staying useful","eval","h","Anthropic","igo","Safety training and eval, classifiers, over-refusal trade-off",None),
("Design a model that solves math problems (data, SFT, post-training, eval)","eval","h","Cohere","igo","Data collection, fine-tuning, verifiable rewards, benchmarks",None),
("Design an LLM evaluation platform for prompt and model releases","eval","m","Common",None,"Golden sets, LLM judges, regression gates, dashboards",None),
("Design a content-policy violation detection system","eval","m","Common","fg","Classifier cascades, LLM review, appeals, latency",None),
("Design guardrails for an enterprise AI assistant","eval","m","Common",None,"Injection defenses, PII, output validation, tool authorization",None),
("Design an LLM gateway used by every team in the company","classic","m","Common",None,"Routing, fallback, quotas, cost attribution, logging",None),
("Design a token-based rate limiter for an LLM API","classic","m","Common",None,"Token buckets, reservation and reconciliation, tiers",None),
("Design a semantic cache for LLM responses","classic","m","Common",None,"Similarity thresholds, tenancy, invalidation, hit-rate measurement",None),
("Design a prompt management and versioning platform","classic","e","Common",None,"Registry, rollout, A/B tests, audit, eval hooks",None),
("Design a webhook delivery system","classic","m","OpenAI","pt","Retries, ordering, idempotency, fan-out",None),
("Design a CI/CD system like GitHub Actions","classic","h","OpenAI","pt","Job scheduling, runners, isolation, logs",None),
("Design a distributed rate limiter","classic","m","OpenAI","ph","Algorithms, consistency, low latency",None),
("Design a web crawler","classic","m","Anthropic","aced","Politeness, deduplication, concurrency",None),
("Design a key-value store","classic","h","Anthropic","aced","Replication, partitioning, consistency",None),
("Design a scalable image-generation pipeline for millions of users","infra","h","Common","fg","Async jobs, GPU queues, storage, moderation",None),
]
CAT={'product':'LLM product','rag':'Retrieval','agent':'Agentic','infra':'Infrastructure','eval':'Eval & safety','classic':'AI-flavored classic'}
LV={'e':('Easy','e'),'m':('Medium','m'),'h':('Hard','h')}
rows=[]
for q,c,l,co,sk,f,link in Q:
    qt=html.escape(q)
    if link: qt='<a href="%s">%s</a>'%(link,qt)
    src=''
    if sk:
        n,u=S[sk]; src=' <a href="%s" title="source">(%s)</a>'%(u,n)
    rows.append('<tr data-cat="%s" data-lvl="%s"><td>%s</td><td>%s</td><td><span class="lvl %s">%s</span></td><td>%s%s</td><td>%s</td></tr>'%(c,l,qt,CAT[c],LV[l][1],LV[l][0],html.escape(co),src,html.escape(f)))
chips=''.join('<button class="chip" data-cat="%s" aria-pressed="%s">%s</button>'%(k,'true' if k=='all' else 'false',v) for k,v in [('all','All types')]+list(CAT.items()))
lchips=''.join('<button class="chip" data-lvl="%s" aria-pressed="%s">%s</button>'%(k,'true' if k=='all' else 'false',v) for k,v in [('all','Any level'),('e','Easy'),('m','Medium'),('h','Hard')])
out=open(os.path.join(HERE,'template.html')).read().replace('{{CHIPS}}',chips).replace('{{LCHIPS}}',lchips).replace('{{ROWS}}','\n'.join(rows)).replace('{{N}}',str(len(Q)))
open(os.path.join(HERE,'..','pages','12-question-bank.html'),'w').write(out)
print(len(Q),'questions')
