# Hixo 
Simple and Lightweight (<3K) code highlighter with 0 dependencies

### Supported Languages
- [x] Javascript
- [x] Java
- [x] C#
- [x] PHP
- [x] C++ / C
- [x] SQL
- [x] Python
- [x] Go
- Css and HTML are not supported for now.

## Usage
```js
import Hixo from 'Hixo';
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
const hixo = new Hixo({ language: 'java' }); 

const codeElement = document.querySelector('code')
codeElement.innerHTML = hixo.codeToHtml('System.out.println("Hello");')
```

### How to override the current theme
```css
[data-theme="light"] {
  --hixo-pre-bg: #fff;
  --hixo-pre-color: #141414;
  --hixo-blue: #6f42c1;
  --hixo-violet: #005cc5;
  --hixo-yellow: #17c700;
  --hixo-gray: #6a737d;
  --hixo-pink: #f92672;
  --hixo-orange: #dc7c23;
}
```
```js
codeElement.parentElement.dataset.theme = 'light';
```

### Notes
- All pull requests are welcome, feel free.

### Todo
- [ ] match regexp: /anything/g

# License
MIT