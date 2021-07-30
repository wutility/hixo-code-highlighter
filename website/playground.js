const txtArea = document.getElementById('txtcode')
const preElement = document.getElementById('pre-editor')
const selectThemes = document.getElementById('themes');
const selectLanguages = document.getElementById('language');
const selectFont = document.getElementById('fontsizes');

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
  { name: 'monokai-pro', type: 'dark' },
  { name: 'blackboard', type: 'dark' },
  { name: 'tomorrow', type: 'dark' },
  { name: 'coda', type: 'light' },
  { name: 'playpen', type: 'light' },
  { name: 'eclipse', type: 'light' },
  { name: 'chrome', type: 'light' },
  { name: 'ayu-light', type: 'light' },
  { name: 'horizon-light', type: 'light' }
];

const languages = ['go', 'javascript', 'java', 'kotlin', 'csharp', 'cpp', 'python', 'php', 'sql', 'plsql', 'plaintext'];

const fontSizes = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26]

languages.forEach(lang => {
  const option = document.createElement('option')
  option.value = lang;
  option.textContent = lang;
  selectLanguages.appendChild(option);
});

fontSizes.forEach(size => {
  const option = document.createElement('option')
  option.value = size;
  option.textContent = size + ' px';
  selectFont.appendChild(option);
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
let language = 'go';
let languageCode = langsTest[language].code;
let hixo = new window.Hixo({ language, lineNum: true });

window.SplitViews({
  parent: '.editor',
  direction: 'horizontal',
  gutterSize: 10,
  minSize: 1,
  sizes: [50, 50]
});

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
});

selectFont.addEventListener('change', e => {
  preElement.style.fontSize = e.target.value + 'px'
});

let editorAutoHeight = false;

document.querySelector('.btn-convert').addEventListener('click', (e) => {
  const imgType = e.target.dataset.img;

  console.log('Conversion start to ' + imgType);

  if (window.htmlToImage && ['Svg', 'Png', 'Jpeg'].includes(imgType)) {

    window.htmlToImage['to' + imgType](document.getElementById('pre-editor'))
      .then(function (dataUrl) {
        const img = new Image();
        img.src = dataUrl;

        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = "hixo." + (imgType.toLowerCase());
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }
  else {
    if (imgType === 'auto-height') {
      editorAutoHeight = !editorAutoHeight
      document.getElementById('editor').style.height = editorAutoHeight ? '100%' : 'calc(100vh - 60px)'
      document.querySelector('.playground').style.overflow = editorAutoHeight ? 'visible' : 'auto'
      document.querySelector('.playground').style.height = editorAutoHeight ? '100%' : '100vh'
    }
  }
})
