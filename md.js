
(function(){
  function mdToHtml(src){
    let s = src.replace(/\r\n/g, '\n');
    s = s.replace(/[&<>]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[ch]));
    s = s.replace(/^\s*>\s?(.*)$/gm, '<blockquote>$1</blockquote>');
    s = s.replace(/^###\s+(.*)$/gm, '<h3>$1</h3>');
    s = s.replace(/^##\s+(.*)$/gm, '<h2>$1</h2>');
    s = s.replace(/^#\s+(.*)$/gm, '<h1>$1</h1>');
    s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*(.+?)\*/g, '<em>$1</em>');
    s = s.replace(/^\s*-\s+(.*)$/gm, '<li>$1</li>');
    s = s.replace(/(<li>.*<\/li>\n?)+/g, m => '<ul>' + m + '</ul>');
    s = s.replace(/^\s*\d+\.\s+(.*)$/gm, '<li>$1</li>');
    s = s.replace(/^(?!<h\d|<ul>|<li>|<blockquote>|\s*$)(.+)$/gm, '<p>$1</p>');
    s = s.replace(/(?<!<\/ul>)\s*(<li>.*<\/li>)(?!\s*<\/ul>)/g, '<ul>$1</ul>');
    return s;
  }
  async function renderMarkdownInto(el, slug){
    const map = await fetch('index.json', {cache: 'no-store'}).then(r=>r.json()).catch(()=>[]);
    const md = await fetch(slug + '.md', {cache:'no-store'}).then(r=>r.text());
    el.innerHTML = mdToHtml(md);
    const found = map.find(p => p.slug === slug);
    return found || {title: slug, date: ''};
  }
  window.mdToHtml = mdToHtml;
  window.renderMarkdownInto = renderMarkdownInto;
})();
