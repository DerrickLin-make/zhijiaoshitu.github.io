
import re

html_path = 'index.html'
css_path = 'css/main.css'

with open(html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

style_match = re.search(r'<style>(.*?)</style>', html_content, re.DOTALL)
if style_match:
    styles = style_match.group(1).strip()
    
    with open(css_path, 'a', encoding='utf-8') as f:
        f.write('\n\n/* Extracted from index.html */\n' + styles + '\n')
        
    new_html = re.sub(r'\s*<style>.*?</style>', '', html_content, flags=re.DOTALL)
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_html)

