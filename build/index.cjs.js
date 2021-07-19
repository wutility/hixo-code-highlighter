"use strict";const e=function(){const e="with|FOREIGN|INDEX|TOP|OUTER|PRIMARY|KEY|GRANT|LIMIT|REFERENCE|IMMEDIATE|DESC|EXISTS|DISTINCT|THEN|ALTER|DROP|TRIGGER|BEFORE|EXCEPTION|declare|begin|end|is|cursor|exit|fetch|when|replace|as|body|PROCEDURE|loop|create|select|update|delete|table|where|set|CONSTRAINT|order|by|BETWEEN|and|or|from|right|left|join|on|inner|group|having|full|NOT|NULL|UNIQUE",t={sc:{pattern:/^\/\/\s+.*|\s+\/\/\s+.*/g,color:"comment",stripHtml:!0},mc:{pattern:/(\/\*[\s\S]*?\*\/)/g,color:"comment",stripHtml:!0},hc:{pattern:/(^#.*)|[^-'\(]#\s+[^\)'].*/g,color:"comment",stripHtml:!0},dc:{pattern:/(?:--[^\r\n]*)\n/g,color:"comment",stripHtml:!0},qc:{pattern:/("""|''')[\s\S]*?\1/g,color:"comment",stripHtml:!0},htmlc:{pattern:/(?:<!--.*-->)/g,color:"comment",stripHtml:!0}},r={pattern:/(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/gm,color:"string",stripHtml:!0};return{sql:{reserved:e,rules:[r,t.dc,t.sc,t.mc]},plsql:{reserved:"OVERRIDING|FORM|HIDDEN|OCICOLL|ELSIF|with|FOREIGN|INDEX|TOP|OUTER|PRIMARY|KEY|GRANT|LIMIT|REFERENCE|IMMEDIATE|DESC|EXISTS|DISTINCT|THEN|ALTER|DROP|TRIGGER|BEFORE|EXCEPTION|declare|begin|end|is|cursor|exit|fetch|when|replace|as|body|PROCEDURE|loop|create|select|update|delete|table|where|set|CONSTRAINT|order|by|BETWEEN|and|or|from|right|left|join|on|inner|group|having|full|NOT|NULL|UNIQUE",rules:[r,t.dc]},python:{reserved:"lambda|def|except|False|True|elif",rules:[r,t.hc,t.qc]},php:{reserved:"(include|require)(_once)?|abstract|interface|insteadof|yield from|__CLASS__|__DIR__",rules:[{pattern:/\$\w+/g,color:"variable"},{pattern:/(&lt;\?php|\?&gt;)/g,color:"comment"},r,t.hc,t.sc,t.mc]},javascript:{reserved:"defer|type",rules:[{pattern:/((?<![\\])(`))((?:.(?!(?<![\\])\1))*.?)\1/g,color:"string",stripHtml:!0,inside:{pattern:/(\$\{.*\})/g,color:"pre-color",group:{1:"variable"}}},r,t.sc,t.mc]},clike:{reserved:"define|fun|val|defer|signed|sizeof|volatile|typedef|delegate|interface",rules:[{pattern:/\b(uint(8|16|32|64)|char(8|16|32)_t|wchar_t|short)(?=[^\w])/gi,color:"data-type"},{pattern:/#include &lt;.*&gt;\n/g,color:"comment"},r,t.sc,t.mc]},common:{reserved:"var|enum|export|UNION|GOTO|as|endl|final|struct|range|async|await|let|func|default|use|namespace|static|using|implements|case|import|from|try|catch|finally|throw|const|return|private|protected|new|public|if|else|do|function|while|switch|for|foreach|in|continue|break",rules:[{pattern:/\b(float|string|bool|boolean|double|char|long|integer|int)(?=[^\w])/gi,color:"data-type"},{pattern:/\b(class|package|instanceof|echo|void)(?=\s+\w+)/gi,color:"method"},{pattern:/(@\w+\s?)\(.*\)\n|[^/'](@\w+\s?)\n/g,color:"variable",stripHtml:!0,group:1},{pattern:/(?![.])[:$]{0,2}(\w+)(?=[\(!])/g,color:"method",stripHtml:!0},{pattern:/(this)(?=\.\w+)/g,color:"method",italic:!0},{pattern:/(\=|\-)&gt;|&lt;\-|\:\=/g,color:"operator"},{pattern:/\b([0-9]+(?:\.[0-9]+)?|0x[0-9a-f]+)[jf]?\b/g,color:"num"},{pattern:/\b(false|true|undefined|True|False|nil|null)\b/gi,color:"num"},{pattern:/(\/[^*(span)].*\/[gim\)])/g,color:"string",stripHtml:!0}]}}}();module.exports=class{options={};constructor({language:e,lineNum:t}){this.options.lineNum=t||!1,this.setLanguage(e)}setLanguage(e){e&&["java","go","csharp","cpp","c"].includes(e)?this.options.language="clike":this.options.language=e||"plaintext"}replaceSpan(e){return e.replace(/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g,"")}replaceChar(e){const t={"+":"&plus;","&":"&amp;","<":"&lt;",">":"&gt;"};return e.replace(/[+&<>]/g,(e=>t[e]))}addRegex(t){e.common.rules.unshift(t)}addKeys(t){e.common.reserved+="|"+t}applyRules(t){const r=(e,t)=>{let r=e.color;return e.italic&&(r+="+italic"),e.bold&&(r+="+bold"),`<span hixo~§${r}§>${t}</span>`};t=this.replaceChar(t);let o=e.common.reserved,n=e[this.options.language].reserved;if(n){o+="|"+n;const e=new RegExp("\\b("+o+")(?=[^w+])\\b","gi");t=t.replace(e,"<span hixo~§keyword§>$1</span>")}const l=e.common.rules.concat(e[this.options.language].rules),s=(e,t)=>t.replace(e.pattern,((...t)=>{if(e.group){const o=Array.from(t);return"object"==typeof e.group?o.slice(1,Object.keys(e.group).length+1).map(((t,o)=>(t=this.replaceSpan(t),e.color=e.group[o+1],t.replace(t,(t=>r(e,t)))))).join(""):o[0].replace(e.pattern,(t=>r(e,t)))}}));for(let e=0;e<l.length;e++){const o=l[e];t=t.replace(o.pattern,((...e)=>{const t=Array.from(e);let n=t[0],l=t[o.group];return"string"===o.color&&n.slice(0,1)!==n.slice(-1)?n:(o.stripHtml&&(n=this.replaceSpan(n)),o.inside&&(n=s(o.inside,n)),l?(l=this.replaceSpan(l),n.replace(new RegExp(l,"g"),(e=>r(o,e)))):r(o,n))}))}return t}codeToHtml(e){return"plaintext"===this.options.language||(e=(e=(e=this.applyRules(e)).replace(/<.* .*(=|§)".*">.*<\/.*>/g,(e=>this.replaceSpan(e)))).replace(/\<span hixo~\§(\w+[\-\+\w+]*)\§\>/g,((e,t)=>'<span class="hixo-'+t.replace(/\+/g," hixo-")+'">')),this.options.lineNum&&(e=e.split(/\n/g).map(((e,t)=>`<span class="hixo-line-num mr-${(""+(t+=1)).length}">${t}</span>${e}`)).join("\n"))),`<code>${e.trim()}</code>`}highlightAll(){const e=document.querySelectorAll("pre");for(const t of e)t.dataset.language&&(this.setLanguage(t.dataset.language),t.innerHTML=this.codeToHtml(t.textContent))}};
