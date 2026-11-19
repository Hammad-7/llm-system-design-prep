"""Build the single-file site: python3 build.py  ->  docs/index.html"""
import glob, os, re, runpy

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'src')

BULB = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1 2V16h5.2v-.2c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/></svg>'
WARN = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17.5v.5"/></svg>'

def read(*p):
    with open(os.path.join(SRC, *p), encoding='utf-8') as f:
        return f.read()

# 1) regenerate the question bank page from src/question-bank/questions.py
runpy.run_path(os.path.join(SRC, 'question-bank', 'questions.py'))

# 2) assemble pages in filename order
files = sorted(glob.glob(os.path.join(SRC, 'pages', '*.html')))
pages = ''.join(open(f, encoding='utf-8').read() for f in files)
pages = (pages.replace('<span class="ci w"></span>', '<span class="ci">' + WARN + '</span>')
              .replace('<span class="ci"></span>', '<span class="ci">' + BULB + '</span>'))

diagrams = read('diagrams.js') + ''.join('\n' + open(f, encoding='utf-8').read()
    for f in sorted(glob.glob(os.path.join(SRC, 'diagrams', '*.js'))))
out = (read('shell.html').replace('{{CONTENT}}', pages)
       .replace('{{DIAGRAMS}}', diagrams).replace('{{APP}}', read('app.js')))

os.makedirs(os.path.join(ROOT, 'docs'), exist_ok=True)
with open(os.path.join(ROOT, 'docs', 'index.html'), 'w', encoding='utf-8') as f:
    f.write(out)

# 3) sanity check: every referenced diagram has a definition
refs = set(re.findall(r'data-diagram="([^"]+)"', pages))
defs = set(re.findall(r'D\["([^"]+)"\]\s*=', diagrams))
print(f'built docs/index.html: {len(files)} pages, {len(out)//1024} KB')
if refs - defs:
    raise SystemExit(f'missing diagram definitions: {sorted(refs - defs)}')
