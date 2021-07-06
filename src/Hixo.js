class Hixo {
  constructor () {
    this.rules = [
      { regex: /\b(default|use|def|int|namespace|static|using|implements|case|import|from|constructor|try|catch|let|const|export|return|private|protected|new|public|var|if|do|function|while|switch|for|foreach|in|continue|break)(?=[^\w])/g, replacement: keywords },
      { regex: /\b(echo|void|String|package|Long)(?=[^\w])/g, replacement: methodName },

      { regex: /\$\w+/g, replacement: variable }, // $variable

      { regex: /(?=[^.])(\w+)(?=\(.)/g, replacement: methodName },

      { regex: /(class)(?=\s\w+)/g, replacement: methodName },
      { regex: /(this)(?=\.\w+)/g, replacement: methodName },

      { regex: /\s(=|\+|\/|\-|%|^|>>|<<|<|>|\*=|\+=|\-=|\+)\s/g, replacement: keywords }, // operators
      { regex: /(\+|\-|\*|\:){2}/g, replacement: keywords }, // operators       

      // { regex: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/g, replacement: methodName },
      // { regex: /&lt;\/?[\w\s="/.':;#-\/]+&gt;/gi, replacement: generic }, // <Node> <Object, Long>

      //{ regex: /\(\d*?\)/g, replacement: num }, // numbers 1 2 3 497
      { regex: /\b(false|true|undefined|True|False|null)\b/gi, replacement: num },

      { regex: /&#39;(.*)&#39;/g, replacement: quotes }, // '
      { regex: /&quot;(.*)&quot;/g, replacement: quotes }, // "      

      { regex: /^\/\/.*/g, replacement: comments }, // single comment  
      { regex: /\s+\/\/.*/g, replacement: comments }, // single comment  
      { regex: /(\/\*[\s\S]*?\*\/)/g, replacement: comments }, // multi comment /* */
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
      return '<span style=[hixo-pink]>' + text + '</span>'
    }

    function comments (text) {
      text = stripHtml(text)
      return '<span style=[hixo-gray]>' + text + '</span>'
    }

    function quotes (text) {
      console.log(text);
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
    const htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    text = text.replace(/[&<>"']/g, chr => htmlEscapes[chr])

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