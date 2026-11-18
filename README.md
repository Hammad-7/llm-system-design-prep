# LLM System Design Prep

**Read it here: https://Hammad-7.github.io/llm-system-design-prep/**

I really loved Hello Interview's [system design prep](https://www.hellointerview.com/learn/system-design/in-a-hurry/introduction), and I wanted the same thing for the new kind of interview: designing AI and LLM systems. The thinking is mostly the same (requirements, high-level design, deep dives), but the technical details are different: tokens, KV caches, batching, RAG, agents, evals.

So I put this together (claude did btw). It has core concepts, common patterns, four worked designs (ChatGPT, a support assistant, an inference batching service and a coding agent), 55 reported interview questions and a reading list. Feel free to add more if you would like to help others.

Not affiliated with Hello Interview, just a fan.

## Editing

Change files in `src/`, then run:

```bash
python3 build.py
```

That rebuilds `docs/index.html`, which is the whole site in one file.

## License

[CC BY 4.0](LICENSE): share it and adapt it, just give credit :).
