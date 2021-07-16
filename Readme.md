# Hixo 
Simple and Lightweight code highlighter with 0 dependencies for modern browsers.

<div align="center" style="width:100%; text-align:center;">
<img src="https://badgen.net/bundlephobia/minzip/hixo" alt="hixo" />
  <img src="https://badgen.net/bundlephobia/dependency-count/hixo" alt="hixo" />
  <img src="https://badgen.net/npm/v/hixo" alt="hixo" />
  <img src="https://badgen.net/npm/dt/hixo" alt="hixo" />
  <img src="https://data.jsdelivr.com/v1/package/npm/hixo/badge" alt="hixo"/>
</div> 

[Official Website](https://hixo.onrender.com/)  
[Demo CodeSandbox](https://codesandbox.io/s/hixo-code-highlighter-cgddx)

## Installation
```
$ npm install hixo
// or via yarn 
$ yarn add hixo
```

## Usage
```js
import Hixo from "hixo";
import "hixo/build/index.css";
```

Or include it via jsDelivr CDN (UMD):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/hixo@1.0.6/build/index.min.css" />
<script src="https://cdn.jsdelivr.net/npm/hixo@1.0.6/build/index.umd.min.js"></script>
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

- **highlightAll(): void**
```js
// highlight all pre elements
// Html: <pre data-language="javascript"></pre>
hixo.highlightAll()
```

### How to override the current theme
```css 
/* 
  css code 
  Note: (themes are not built-in)
  just copy your favorite theme from the folder themes 
*/
[data-theme="material"] {
  --hixo-pre-bg: #263238;
  --hixo-pre-color: #EEFFFF;
  --hixo-line-num:#b1b1b1;
  --hixo-method: #82AAFF;
  --hixo-num: #FF5370;
  --hixo-string: #C3E88D;
  --hixo-comment: #6a737d;
  --hixo-keyword: #C792EA;
  --hixo-variable: #dc7c23;
  --hixo-operator:#f92672;
  --hixo-spkeys:#d2a8ff;
  --hixo-data-type:#b65611;
}
```

```js
// javascript code
preElement.dataset.theme = 'material';
```

### Todo
- [ ] Yaml in progress

### Notes
- Supported Languages check docs: [website](https://hixo.onrender.com/)
- Css [themes](https://github.com/wutility/hixo-code-highlighter/tree/main/themes) are not built-in.
- All pull requests are welcome, feel free.

# License
MIT