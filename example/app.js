const txtArea = document.getElementById('txtcode')
const codeDisplay = document.querySelector('code')

let currentTheme = 'dark';
let isTextareaHide = false;

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

document.querySelector('.btn-theme').addEventListener('click', () => {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  codeDisplay.parentElement.dataset.theme = currentTheme === 'light' ? 'dark' : 'light';
});

document.querySelector('.btn-hide-txtarea').addEventListener('click', () => {
  isTextareaHide = !isTextareaHide;
  txtArea.style.display = isTextareaHide ? 'block' : 'none'  
  codeDisplay.parentElement.dataset.theme = isTextareaHide;
});

//codeDisplay.parentElement.setAttribute('data-theme', 'light');
