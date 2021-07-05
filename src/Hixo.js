class Hixo {
  constructor () {

    this.htmlEscapes = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

    this.rules = [
      { regex: /\b(use|def|int|namespace|static|using|implements|case|import|constructor|try|catch|let|const|export|return|private|new|public|var|if|do|function|while|switch|for|foreach|in|continue|break)(?=[^\w])/g, replacement: keywords },
      { regex: /\b(echo|void|String|package|Long)(?=[^\w])/g, replacement: methodName },

      { regex: /(class)(?=\s+\w+)/g, replacement: methodName },

      { regex: /\s(=|\-|%|^|>>|<<|<|>|\*=|\+=|\-=|\+)\s/g, replacement: keywords }, // operators
      { regex: /(\+|\-|\*|\:){2}/g, replacement: keywords }, // operators       

      { regex: /\.\w+/g, replacement: methodName },

      { regex: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/g, replacement: methodName },
      { regex: /&lt;\/?[\w\s="/.':;#-\/]+&gt;/gi, replacement: generic }, // <Node> <Object, Long>

      { regex: /\b(\d+)\b/g, replacement: num }, // numbers 1 2 3 497
      { regex: /\b(false|true|undefined|null)\b/gi, replacement: num },

      { regex: /"[^"]*"|'[^']*'|`[^`]*`/g, replacement: quotes }, // " ' `

      { regex: /\$\w+/g, replacement: variable }, // $variable

      { regex: /\/\*[\s\S]*?\*\//g, replacement: comments }, // multi comment
      { regex: /'''[\s\S]*?'''/g, replacement: comments }, // multi comment python

      { regex: /(\/\/.*)/g, replacement: comments }, // single comment  
      { regex: /(#.*)/g, replacement: comments }, // single comment python, ruby 
    ];

    function stripHtml (text) {
      let tmp = document.createElement("div");
      tmp.innerHTML = text;
      return tmp.textContent || tmp.innerText || "";
    }

    function replaceSpanTag (text) {
      return text.replace(/<\/?span[^>]*>/ig, "")
    }

    function variable (text) {
      text = stripHtml(text)
      return '<span style=[hixo-orange]>' + text + '</span>'
    }

    function keywords (text) {
      return '<span style=[hixo-rose]>' + text + '</span>'
    }

    function comments (text) {
      text = replaceSpanTag(text)
      return '<span style=[hixo-gray]>' + text + '</span>'
    }

    function quotes (text) {
      text = stripHtml(text)
      return '<span style=[hixo-yellow]>' + text + '</span>'
    }

    function methodName (text) {
      return '<span style=[hixo-blue]>' + text + '</span>'
    }

    function num (text) {
      text = stripHtml(text)
      return '<span style=[hixo-violet]>' + text + '</span>'
    }

    function generic (text) {
      if (text !== '</span>') {
        return '<span style=[hixo-blue]>' + text + '</span>'
      }
      return text
    }
  }

  codeToHtml (text) {
    text = text.replace(/>/g, '&gt;').replace(/</g, '&lt;')

    this.rules.forEach((rule) => {
      text = text.replace(rule.regex, rule.replacement);
    });

    text = text.replace(/style=(\[([^\][]*)])/g, v => {
      if (v.startsWith('style=[')) {
        v = v.match(/\[([^}]*)\]/)[1]
        return 'class="' + v + '"'
      }
    });

    return text.trim();
  }
}