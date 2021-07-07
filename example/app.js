const txtArea = document.getElementById('txtcode')
const codeElement = document.querySelector('code')
const selectThemes = document.getElementById('themes');
const selectLanguages = document.getElementById('language');

const themes = ['default', 'material','dracula', 'github-dark', 'hackpot', 'chroma', 'blackboard', 'eclipse'];
const languages = ['javascript', 'java','go', 'rust','csharp', 'cpp','python', 'php', 'sql'];

languages.forEach(lang => {
  const option = document.createElement('option')
  option.value = lang;
  option.textContent = lang;
  selectLanguages.appendChild(option);
});

themes.forEach(theme => {
  const option = document.createElement('option')
  option.value = theme;
  option.textContent = theme;
  selectThemes.appendChild(option);
});


let isTextareaHide = false;
let hixo = new window.Hixo({ language: 'java' });

txtArea.value = langsTest['javascript'].code
codeElement.innerHTML = hixo.codeToHtml(langsTest['javascript'].code)

txtArea.addEventListener('keyup', e => {
  codeElement.innerHTML = hixo.codeToHtml(e.target.value)
});

txtArea.addEventListener('change', e => {
  codeElement.innerHTML = hixo.codeToHtml(e.target.value)
});

selectLanguages.addEventListener('change', e => {
  let selectLang = langsTest[e.target.value].code
  txtArea.value = selectLang;

  hixo.setLanguage(e.target.value)
  codeElement.innerHTML = hixo.codeToHtml(selectLang)
});

selectThemes.addEventListener('change', e => {
  codeElement.parentElement.dataset.theme = e.target.value
});

document.querySelector('.btn-hide-txtarea').addEventListener('click', () => {
  isTextareaHide = !isTextareaHide;
  txtArea.style.display = isTextareaHide ? 'block' : 'none'
  codeElement.parentElement.dataset.theme = isTextareaHide;
});
