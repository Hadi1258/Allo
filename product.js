
(async function(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || 'mtc-credit';
  const data = await fetch('products.json', {cache:'no-store'}).then(r=>r.json());
  const product = data.products.find(p => p.id === id) || data.products[0];

  const elName = document.getElementById('p-name');
  const elPrice = document.getElementById('p-price');
  const elVariant = document.getElementById('p-variant');
  const elFaq = document.getElementById('p-faq');

  elName.textContent = product.name;
  const fmt = new Intl.NumberFormat(undefined, {style:'currency', currency: product.currency || 'USD'});
  let current = product.variants?.[0] || {price: product.price};
  elPrice.textContent = fmt.format(current.price);

  if(product.variants && product.variants.length){
    product.variants.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.sku;
      opt.textContent = v.label + ' ' + fmt.format(v.price);
      elVariant.appendChild(opt);
    });
    elVariant.addEventListener('change', e => {
      const v = product.variants.find(x => x.sku === e.target.value);
      current = v || current;
      elPrice.textContent = fmt.format(current.price);
    });
  }else{
    elVariant.parentElement.style.display = 'none';
  }

  if(product.faq && product.faq.length){
    product.faq.forEach((item) => {
      const wrap = document.createElement('details');
      const sum = document.createElement('summary');
      sum.textContent = item.q;
      const ans = document.createElement('div');
      ans.innerHTML = '<p>' + item.a + '</p>';
      wrap.appendChild(sum);
      wrap.appendChild(ans);
      elFaq.appendChild(wrap);
    });
  }else{
    elFaq.textContent = 'No questions yet';
  }

  document.getElementById('p-buy').addEventListener('click', () => {
    alert('Added ' + product.name + ' ' + (current.label || '') + ' to cart');
  });
})();
