!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).Hixo=t()}(this,(function(){"use strict";const e=[{pattern:/^\/\/.*/g,color:"gray",stripHtml:!0},{pattern:/\s+\/\/.*/g,color:"gray",stripHtml:!0},{pattern:/(\/\*[\s\S]*?\*\/)/g,color:"gray",stripHtml:!0}],t={pattern:/((?<![\\])(&apos;|&quot;))((?:.(?!(?<![\\])\1))*.?)\1/g,color:"yellow",stripHtml:!0},r={sql:{reserved:"TRIGGER|BEFORE|EXCEPTION|declare|begin|end|is|cursor|exit|fetch|when|replace|as|body|PROCEDURE|loop|create|select|update|delete|table|where|set|CONSTRAINT|order|by|BETWEEN|and|or|from|right|left|join|on|inner|group|having|full|NOT|NULL|UNIQUE",rules:[t,{pattern:/(--.*?\n)|(\/\*[\s\S]*?\*\/)/g,color:"gray",stripHtml:!0}]},python:{reserved:"def|False|True",rules:[t,{pattern:/#.*/g,color:"gray",stripHtml:!0},{pattern:/(\'\'\'[\s\S]*?\'\'\')/g,color:"gray",stripHtml:!0}]},php:{reserved:"insteadof|yield from|__CLASS__",rules:[{pattern:/\$\w+/g,color:"orange"},{pattern:/(&lt;\?php|\?&gt;)/g,color:"gray"},t,...e]},javascript:{reserved:"signed|sizeof|volatile|typedef|goto|let|export|constructor|var",rules:[{pattern:/`[^`]*`/g,color:"yellow",stripHtml:!0},t,...e]},common:{reserved:"default|use|int|namespace|static|using|implements|case|import|from|try|catch|throw|const|return|private|protected|new|public|if|else|do|function|while|switch|for|foreach|in|continue|break",rules:[{pattern:/\b(echo|void|String|package|Long)(?=[^\w])/gi,color:"blue",italic:!0},{pattern:/(?=[^.])(\w+)(?=\(.)/g,color:"blue"},{pattern:/(class)(?=\s\w+)/g,color:"blue"},{pattern:/(this)(?=\.\w+)/g,color:"blue",italic:!0},{pattern:/\s+[:|%^\=]{1}\s+/g,color:"pink"},{pattern:/(\=|\+|\*|\:|\||&lt;|&gt;){2,3}/g,color:"pink"},{pattern:/\b([0-9]+(?:\.[0-9]+)?)\b/gi,color:"violet"},{pattern:/\b(false|true|undefined|True|False|nil|null)\b/gi,color:"violet"},{pattern:/[\(|\s+]\/.*\/[gim\)]\b/gi,color:"gray"}]}};return class{options={};constructor({language:e}){this.setLanguage(e)}setLanguage(e){e&&["java","csharp","cpp","c"].includes(e)?this.options.language="javascript":this.options.language=e||""}stripHtml(e){let t=document.createElement("div");return t.innerHTML=e,t.textContent||t.innerText||""}replaceSpanTag(e){return e.replace(/<\/?span[^>]*>/gi,"")}htmlEscapes(e){const t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"};return e.replace(/[&<>"']/g,(e=>t[e]))}codeToHtml(e){e=this.htmlEscapes(e);let t=r.common.reserved;t+="|"+r[this.options.language].reserved,e=e.replace(new RegExp("\\b("+t+")(?=[^w+])\\b","gi"),"<span style=[hixo-pink]>$1</span>");return r.common.rules.concat(r[this.options.language].rules).forEach((t=>{e=e.replace(t.pattern,(e=>(t.stripHtml&&(console.log(e),e=this.stripHtml(e)),`<span style=[hixo-${t.color+(t.italic?" hixo-italic":"")}]>${e}</span>`)))})),(e=e.replace(/style=(\[([^\][]*)])/g,(e=>{if(e.startsWith("style=["))return'class="'+(e=e.match(/\[([^}]*)\]/)[1])+'"'}))).trim()}}}));
