# Hixo 
Simple and Lightweight (<4K) code highlighter with 0 dependencies for modern browsers

Supported Languages check docs: [website](https://hixo.onrender.com/)

## Usage
```js
import Hixo from 'hixo';
import 'hixo/build/hixo.css';
```

Or include it via jsDelivr CDN (UMD):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/hixo@1.0.0/build/index.css" />
<script src="https://cdn.jsdelivr.net/npm/hixo@1.0.0/build/index.min.js"></script>
<!-- Access via global object : window.Hixo -->
```

### Methods && Examples
- **codeToHtml(String): HTMLString**
```js
const hixo = new Hixo({ language: 'java', lineNum: true }); 

const preElement = document.querySelector('pre');
preElement.innerHTML = hixo.codeToHtml('System.out.println("Hello");');
```

- **addKeys(String): void**
```js
// Add new keywords
hixo.addKeys('final|struct|range|async');
```

- **setLanguage(String): void**
```js
hixo.setLanguage('java');
```

- **addRegex(Object): void**
```js
// Add new regular expression
hixo.addRegex({
  pattern: /(?![.])[:$]{0,2}(\w+)(?=\(.)/g, // required
  color: 'method', // required
  italic: true, // optional
  bold: true, // optional
  stripHtml: true // optional: remove any html tag
});
```

### How to override the current theme
```css
/* css code */
[data-theme="material"] {
  --hixo-pre-bg: #263238;
  --hixo-pre-color: #EEFFFF;

  --hixo-method: #82AAFF;
  --hixo-num: #FF5370;
  --hixo-string: #C3E88D;
  --hixo-comment: #6a737d;
  --hixo-keyword: #C792EA;
  --hixo-variable: #dc7c23;

  --hixo-operator:#f92672;
  --hixo-sp-keys:#d2a8ff;
  --hixo-data-type:#b65611;
}
```
```js
// javascript code
preElement.dataset.theme = 'material';
```

### Notes
- All pull requests are welcome, feel free.

# License
MIT