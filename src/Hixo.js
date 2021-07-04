class Hixo {
  constructor () {
    this.rules = [
     { regex: /\b(int|namespace|static|using|implements|case|import|constructor|try|catch|let|const|export|return|private|new|public|var|if|do|function|while|switch|for|foreach|in|continue|break)(?=[^\w])/g, replacement: keywords },
     { regex: /\b(class|void)(?=[^\w])/g, replacement: usedMethod },

      { regex: /\s(=|\-|%|^|>>|<<|<|>)\s/g, replacement: keywords }, // operators

       { regex: /\.\w+/g, replacement: usedMethod },

      { regex: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/g, replacement: usedMethod },


      { regex: /\s\d+\s/g, replacement: num },
      { regex: /\s+(this)\./g, replacement: keywords },
      

      { regex: /"[^"]*"|'[^']*'/g, replacement: quotes },
      { regex: /\/\*[\s\S]*?\*\//g, replacement: comment }, // multi comment
      { regex: /(\/\/.*)/g, replacement: comment }, // single comment
    ];

    function stripHtml (html) {
      let tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    }

    function keywords (text) {
      return '<span style=[color:#f92672]>' + text + '</span>'
    }

    function comment (text) {
      text = stripHtml(text)
      return '<span style=[color:#848484]>' + text + '</span>'
    }

    function quotes (text) {
      text = stripHtml(text)
      return '<span style=[color:#f3e880]>' + text + '</span>'

    }

    function usedMethod (text) {
      return '<span style=[color:#5fe6ff]>' + text + '</span>'
    }

    function num (text) {
      text = stripHtml(text)
      return '<span style=[color:#ae81ff]>' + text + '</span>'
    }
  }

  addRule (regex, replacement) {
    regex.global = true;
    regex.multiline = false;
    this.rules.push({ regex, replacement });
  }

  render (text) {
    this.rules.forEach((rule) => {
      text = text.replace(rule.regex, rule.replacement);
    });

    text = text.replace(/style=(\[([^\][]*)])/g, v => {
      if (v.startsWith('style=[')) {
        let color = v.match(/#(.*)]/)[1]
        return 'style="color:#' + color + '"'
      }
    });

    return text.trim();
  }
}