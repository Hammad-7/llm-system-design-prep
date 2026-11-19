# LLM System Design Prep

**Read it here: https://Hammad-7.github.io/llm-system-design-prep/**

I really loved Hello Interview's [system design prep](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction), and I wanted the same thing for the new kind of interview: designing AI and LLM systems. The thinking is mostly the same (requirements, high-level design, deep dives), but the technical details are different: tokens, KV caches, batching, RAG, agents, evals.

So I put this together (claude did 🤫). It has a fast track (core concepts, key technologies, common patterns), 13 in-depth concept pages (inference and serving, context and memory, vector search, RAG, caching, agents and MCP, evaluation, security, streaming APIs, gateways, observability, fine-tuning, numbers to know), eleven worked designs (ChatGPT, a support assistant, inference batching, a cloud coding agent, Claude Code, Copilot-style autocomplete, a Perplexity-style answer engine, a deep research agent, an LLM gateway, a real-time voice agent and a document extraction pipeline), 58 reported interview questions and a reading list. Feel free to add more if you would like to help others.

Not affiliated with Hello Interview, just a fan.

## Editing

Change files in `src/`, then run:

```bash
python3 build.py
```

That rebuilds `docs/index.html`, which is the whole site in one file.

## License

[CC BY 4.0](LICENSE): share it and adapt it, just give credit 😊.
