const e=function(){const e="TRIGGER|BEFORE|EXCEPTION|declare|begin|end|is|cursor|exit|fetch|when|replace|as|body|PROCEDURE|loop|create|select|update|delete|table|where|set|CONSTRAINT|order|by|BETWEEN|and|or|from|right|left|join|on|inner|group|having|full|NOT|NULL|UNIQUE",t={sc:{pattern:/^\/\/\s+.*|\s+\/\/\s+.*/g,color:"comment",stripHtml:!0},mc:{pattern:/(\/\*[\s\S]*?\*\/)/g,color:"comment",stripHtml:!0},hc:{pattern:/(^#.*)|[^-'\(]#\s+[^\)'].*/g,color:"comment",stripHtml:!0},dc:{pattern:/(^--.*|\s+--.*)\n/g,color:"comment",stripHtml:!0},qc:{pattern:/("""|''')[\s\S]*?\1/g,color:"comment",stripHtml:!0}},r={pattern:/((?<![\\])('|"))((?:.(?!(?<![\\])\1))*.?)\1/g,color:"string",stripHtml:!0};return{sql:{reserved:e,rules:[r,t.dc,t.sc,t.mc]},plsql:{reserved:"HIDDEN|OCICOLL|ELSIF|TRIGGER|BEFORE|EXCEPTION|declare|begin|end|is|cursor|exit|fetch|when|replace|as|body|PROCEDURE|loop|create|select|update|delete|table|where|set|CONSTRAINT|order|by|BETWEEN|and|or|from|right|left|join|on|inner|group|having|full|NOT|NULL|UNIQUE",rules:[r,t.dc]},python:{reserved:"def|except|False|True",rules:[r,t.hc,t.qc]},php:{reserved:"insteadof|yield from|__CLASS__|__DIR__",rules:[{pattern:/\$\w+/g,color:"variable"},{pattern:/(&lt;\?php|\?&gt;)/g,color:"comment"},r,t.hc,t.sc,t.mc]},rust:{reserved:"fn|become|macro",rules:[r,t.sc,t.mc]},javascript:{reserved:"defer|type|export|constructor|var",rules:[{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/g,color:"string",stripHtml:!0,inside:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/g,color:"pre-color"}},r,t.sc,t.mc]},clike:{reserved:"#include|defer|signed|sizeof|volatile|typedef|goto|export|var|delegate",rules:[{pattern:/#include &lt;.*&gt;/g,color:"sp-key"},{pattern:/\b(Map|Set|List|Stack|Queue|Tuple|Hashtable|Dictionary|SortedList|ArrayList)(?=[^\w])/g,color:"data-type"},r,t.sc,t.mc]},common:{reserved:"as|endl|final|struct|range|async|await|let|func|default|use|namespace|static|using|implements|case|import|from|try|catch|finally|throw|const|return|private|protected|new|public|if|else|do|function|while|switch|for|foreach|in|continue|break",rules:[{pattern:/\b(char|float|string|bool|boolean|double|long|integer|int|u32)(?=[^\w])/gi,color:"data-type"},{pattern:/\b(class|package|instanceof|echo|void)(?=\s+\w+)/gi,color:"sp-key"},{pattern:/(^|[^.])@\w+(?:\s*\.\s*\w+)*/g,color:"variable"},{pattern:/(?![.])[:$]{0,2}(\w+)(?=\(.)/g,color:"method",stripHtml:!0},{pattern:/(this)(?=\.\w+)/g,color:"method",italic:!0},{pattern:/[^\w+](\=|\||&amp;){2,3}[^"]/g,color:"operator"},{pattern:/\b([0-9]+(?:\.[0-9]+)?)\b/g,color:"num"},{pattern:/\b(false|true|undefined|True|False|nil|null)\b/gi,color:"num"},{pattern:/\s+\/.*\/[gim\)]\s+/g,color:"sp-key",stripHtml:!0}]}}}();export default class{options={};constructor({language:e,lineNum:t}){this.options.lineNum=t||!1,this.setLanguage(e)}setLanguage(e){e&&["java","go","csharp","cpp","c"].includes(e)?this.options.language="clike":this.options.language=e||"plaintext"}replaceSpan(e){return e.replace(/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g,"")}replaceChar(e){const t={"+":"&plus;","&":"&amp;","<":"&lt;",">":"&gt;","\\":"\\\\"};return e.replace(/[+&<>\\]/g,(e=>t[e]))}addRegex(t){e.common.rules.unshift(t)}addKeys(t){e.common.reserved+="|"+t}codeToHtml(t){if("plaintext"===this.options.language)return`<code>${t.trim()}</code>`;const r=(e,t)=>{let r=e.bold?" hixo-bold":"",o=e.italic?" hixo-italic":"";return`<span hixo=[hixo-${e.color+o+r}]>${t}</span>`};t=this.replaceChar(t);let o=e.common.reserved;o+="|"+e[this.options.language].reserved,t=t.replace(new RegExp("\\b("+o+")(?=[^w+])\\b","gi"),"<span hixo=[hixo-keyword]>$1</span>");const s=e.common.rules.concat(e[this.options.language].rules);for(let e=0;e<s.length;e++){const o=s[e];t=t.replace(o.pattern,((...e)=>{const t=Array.from(e);let s=t[0],n=t[o.group];return o.stripHtml&&(s=this.replaceSpan(s)),o.inside&&(s=s.replace(o.inside.pattern,(e=>r(o.inside,e)))),n?(n=this.replaceSpan(n),s.replace(new RegExp(n,"g"),(e=>r(o,e)))):r(o,s)}))}return t=(t=t.replace(/<.* .*=".*">.*<\/.*>/g,(e=>this.stripHtml(e)))).replace(/hixo=\[(hixo\-\w+(\-\w+)?)]/g,'class="$1"'),this.options.lineNum&&(t=t.split(/\n/g).map(((e,t)=>`<span class="hixo-line-num mr-${(""+(t+=1)).length}">${t}</span>${e}`)).join("\n")),`<code>${t.trim()}</code>`}highlightAll(){let e=document.querySelectorAll("pre");for(const t of e)t.dataset.language&&(this.setLanguage(t.dataset.language),t.innerHTML=this.codeToHtml(t.textContent))}}
