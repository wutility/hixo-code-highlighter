const txtArea = document.getElementById('txtcode')
const codeDisplay = document.querySelector('code')

let hixo = new window.Hixo({ language: 'java' });

txtArea.value = langsTest['javascript'].code
codeDisplay.innerHTML = hixo.codeToHtml(langsTest['javascript'].code)

txtArea.addEventListener('keyup', e => {
  codeDisplay.innerHTML = hixo.codeToHtml(e.target.value)
});

txtArea.addEventListener('change', e => {
  codeDisplay.innerHTML = hixo.codeToHtml(e.target.value)
});

document.getElementById('language').addEventListener('change', e => {
  let selectLang = langsTest[e.target.value].code
  txtArea.value = selectLang;

  hixo.setLanguage(e.target.value)
  codeDisplay.innerHTML = hixo.codeToHtml(selectLang)
});

//codeDisplay.parentElement.setAttribute('data-theme', 'light');
