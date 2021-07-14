# Hixo 
Simple and Lightweight code highlighter with 0 dependencies for modern browsers.

<div align="center" style="width:100%; text-align:center;">
<img src="https://badgen.net/bundlephobia/minzip/hixo" alt="hixo" />
  <img src="https://badgen.net/bundlephobia/dependency-count/hixo" alt="hixo" />
  <img src="https://badgen.net/npm/v/hixo" alt="hixo" />
  <img src="https://badgen.net/npm/dt/hixo" alt="hixo" />
  <img src="https://data.jsdelivr.com/v1/package/npm/hixo/badge" alt="hixo"/>
</div> 

## Usage
```js
import Hixo from 'hixo';
import 'hixo/build/hixo.css';
```

Or include it via jsDelivr CDN (UMD):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/hixo@1.0.1/build/index.css" />
<script src="https://cdn.jsdelivr.net/npm/hixo@1.0.1/build/index.min.js"></script>
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

### Notes
- Supported Languages check docs: [website](https://hixo.onrender.com/)
- [Example](https://hixo.onrender.com) of how to override the current theme.
- Css [themes](https://github.com/wutility/hixo-code-highlighter/tree/main/themes) are not built-in.
- All pull requests are welcome, feel free.

# License
MIT