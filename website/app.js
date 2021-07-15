const preContainer = document.querySelector('.pre-container')
const txtArea = document.getElementById('txtcode')
const preElement = document.getElementById('pre-editor')
const selectThemes = document.getElementById('themes');
const selectLanguages = document.getElementById('language');

const themes = [
  { name: 'default', type: 'dark' },
  { name: 'material', type: 'dark' },
  { name: 'dracula', type: 'dark' },
  { name: 'github-dark', type: 'dark' },
  { name: 'vscode-dark', type: 'dark' },
  { name: 'onedark', type: 'dark' },
  { name: 'deepdark', type: 'dark' },
  { name: 'night', type: 'dark' },
  { name: 'hackpot', type: 'dark' },
  { name: 'chroma', type: 'dark' },
  { name: 'blackboard', type: 'dark' },
  { name: 'tomorrow', type: 'dark' },
  { name: 'coda', type: 'light' },
  { name: 'playpen', type: 'light' },
  { name: 'eclipse', type: 'light' },
  { name: 'chrome', type: 'light' }
];

const languages = ['plaintext','javascript', 'java', 'go', 'rust', 'csharp', 'cpp', 'python', 'php', 'sql', 'plsql'];

languages.forEach(lang => {
  const option = document.createElement('option')
  option.value = lang;
  option.textContent = lang;
  selectLanguages.appendChild(option);
});

// select element of themes
const optgroupD = document.createElement('optgroup');
const optgroupL = document.createElement('optgroup');
optgroupD.label = 'dark themes';
optgroupL.label = 'light themes';

themes.forEach(theme => {
  const option = document.createElement('option');
  option.value = theme.name;
  option.textContent = theme.name;

  if (theme.type === 'dark') optgroupD.appendChild(option)
  else optgroupL.appendChild(option)
});

selectThemes.appendChild(optgroupD);
selectThemes.appendChild(optgroupL);

// 
let language = 'plaintext';
let languageCode = langsTest[language].code;
let hixo = new window.Hixo({ language, lineNum: true });

window.SplitViews({
  parent: 'editor',
  direction: 'vertical',
  gutterSize: 10,
  minSize: 1,
  sizes: [50, 50]
});

hixo.highlightAll()

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
