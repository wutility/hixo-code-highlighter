const preDoc = document.querySelectorAll('.pre-doc')

Array.from(preDoc).forEach(pre =>{
  let hixo = new window.Hixo({ language:'javascript' });
  pre.innerHTML = hixo.codeToHtml(pre.textContent)
});

const preContainer = document.querySelector('.pre-container')
const txtArea = document.getElementById('txtcode')
const preElement = document.getElementById('pre-editor')
const selectThemes = document.getElementById('themes');
const selectLanguages = document.getElementById('language');

const themes = ['default', 'material','dracula', 'github-dark','vscode-dark','onedark','deepdark','night', 'hackpot', 'chroma', 'blackboard','playpen', 'eclipse'];
const languages = ['javascript', 'java','go', 'rust','csharp', 'cpp','python', 'php', 'sql','plsql'];

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

let language = 'javascript';
let languageCode = langsTest[language].code;
let hixo = new window.Hixo({ language });

window.Split(['#txtcode', '.pre-container'])

txtArea.value = languageCode
preElement.innerHTML = hixo.codeToHtml(languageCode)

txtArea.addEventListener('keyup', e => {
  preElement.innerHTML = hixo.codeToHtml(e.target.value)
});

selectLanguages.addEventListener('change', e => {
  language = e.target.value;
  languageCode = langsTest[language].code
  txtArea.value = languageCode;

  hixo.setLanguage(language)
  preElement.innerHTML = hixo.codeToHtml(languageCode)
});

selectThemes.addEventListener('change', e => {
  let theme = e.target.value;
  preElement.dataset.theme = theme
  preContainer.dataset.theme = theme
});
