const preDoc = document.querySelectorAll('.pre-doc')

Array.from(preDoc).forEach(pre =>{
  let hixo = new window.Hixo({ language:'javascript' });
  pre.innerHTML = hixo.codeToHtml(pre.textContent)
})

const txtArea = document.getElementById('txtcode')
const codeElement = document.getElementById('pre-editor')
const selectThemes = document.getElementById('themes');
const selectLanguages = document.getElementById('language');

const themes = ['default', 'material','dracula', 'github-dark','vscode-dark','deepdark','night', 'hackpot', 'chroma', 'blackboard','playpen', 'eclipse'];
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

txtArea.value = languageCode
codeElement.innerHTML = hixo.codeToHtml(languageCode)

txtArea.addEventListener('keyup', e => {
  codeElement.innerHTML = hixo.codeToHtml(e.target.value)
});

selectLanguages.addEventListener('change', e => {
  language = e.target.value;
  languageCode = langsTest[language].code
  txtArea.value = languageCode;

  hixo.setLanguage(language)
  codeElement.innerHTML = hixo.codeToHtml(languageCode)
});

selectThemes.addEventListener('change', e => {
  codeElement.dataset.theme = e.target.value
});
