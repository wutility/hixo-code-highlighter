const regex = (function () {
  // reserved words
  const commonRvw = 'var|enum|export|UNION|GOTO|as|endl|final|struct|range|async|await|let|func|default|use|namespace|static|using|implements|case|import|from|try|catch|finally|throw|const|return|private|protected|new|public|if|else|do|function|while|switch|for|foreach|in|continue|break',
    ClikeRsw = 'define|fun|val|defer|signed|sizeof|volatile|typedef|delegate|interface',
    JsRsw = 'defer|type',
    sqlRvw = 'with|FOREIGN|INDEX|TOP|OUTER|PRIMARY|KEY|GRANT|LIMIT|REFERENCE|IMMEDIATE|DESC|EXISTS|DISTINCT|THEN|ALTER|DROP|TRIGGER|BEFORE|EXCEPTION|declare|begin|end|is|cursor|exit|fetch|when|replace|as|body|PROCEDURE|loop|create|select|update|delete|table|where|set|CONSTRAINT|order|by|BETWEEN|and|or|from|right|left|join|on|inner|group|having|full|NOT|NULL|UNIQUE',
    plsqlRsw = 'OVERRIDING|FORM|HIDDEN|OCICOLL|ELSIF|' + sqlRvw,
    PhpRsw = '(include|require)(_once)?|abstract|interface|insteadof|yield from|__CLASS__|__DIR__',
    PythonRsw = 'lambda|def|except|False|True|elif';

  const comment = {
    sc: { // single comment
      pattern: /^\/\/\s+.*|\s+\/\/\s+.*/g,
      color: 'comment',
      stripHtml: true
    },
    mc: { // multi comment /* */
      pattern: /(\/\*[\s\S]*?\*\/)/g,
      color: 'comment',
      stripHtml: true
    },
    hc: { // match: # any comment
      pattern: /(^#.*)|[^-'\(]#\s+[^\)'].*/g,
      color: 'comment',
      stripHtml: true
    },
    dc: { // match: -- any comment
      pattern: /(?:--[^\r\n]*)\n/g,
      color: 'comment',
      stripHtml: true
    },
    qc: { // match: ''' any comment '''
      pattern: /("""|''')[\s\S]*?\1/g,
      color: 'comment',
      stripHtml: true
    },
    htmlc: {
      pattern: /(?:<!--.*-->)/g,
      color: 'comment',
      stripHtml: true
    }
  };

  const quotes = {
    // pattern: /((?<![\\])('|"))((?:.(?!(?<![\\])\1))*.?)\1/g,
    // origin pattern from https://github.com/googlearchive/code-prettify/blob/master/src/run_prettify.js
    pattern: /(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/gm,
    color: 'string',
    stripHtml: true
  };

  return {
    sql: {
      reserved: sqlRvw,
      rules: [
        quotes,
        comment.dc,
        comment.sc,
        comment.mc
      ]
    },
    plsql: {
      reserved: plsqlRsw,
      rules: [
        quotes,
        comment.dc
      ]
    },
    python: {
      reserved: PythonRsw,
      rules: [
        quotes,
        comment.hc,
        comment.qc
      ]
    },
    php: {
      reserved: PhpRsw,
      rules: [
        { // match: $variable
          pattern: /\$\w+/g,
          color: 'variable'
        },
        { // match: <?php  ?>
          pattern: /(&lt;\?php|\?&gt;)/g,
          color: 'comment'
        },
        quotes,
        comment.hc,
        comment.sc,
        comment.mc
      ]
    },
    javascript: {
      reserved: JsRsw,
      rules: [
        { // match: ` any string here `
          pattern: /((?<![\\])(`))((?:.(?!(?<![\\])\1))*.?)\1/g,
          color: 'string',
          stripHtml: true,
          inside: {
            pattern: /(\$\{.*\})/g,
            color: 'pre-color',
            group: { 1: 'variable' }
          }
        },
        quotes,
        comment.sc,
        comment.mc
      ]
    },
    clike: { // rules for: java - cpp/c - csharp - go
      reserved: ClikeRsw,
      rules: [
        {
          pattern: /\b(uint(8|16|32|64)|char(8|16|32)_t|wchar_t|short)(?=[^\w])/gi,
          color: 'data-type'
        },
        {
          pattern: /#include &lt;.*&gt;\n/g,
          color: 'comment'
        },
        quotes,
        comment.sc,
        comment.mc
      ]
    },
    common: { // comment regexp for all languages
      reserved: commonRvw,
      rules: [
        {
          pattern: /\b(float|string|bool|boolean|double|char|long|integer|int)(?=[^\w])/gi,
          color: 'data-type'
        },
        {
          pattern: /\b(class|package|instanceof|echo|void)(?=\s+\w+)/gi,
          color: 'method'
        },
        { // match: @Entity   @Get
          pattern: /(@\w+\s?)\(.*\)\n|[^/'](@\w+\s?)\n/g,
          color: 'variable',
          stripHtml: true,
          group: 1
        },
        { // match: method name
          pattern: /(?![.])[:$]{0,2}(\w+)(?=[\(!])/g,
          color: 'method',
          stripHtml: true
        },
        { // match: this
          pattern: /(this)(?=\.\w+)/g,
          color: 'method',
          italic: true
        },
        { // operators: => -> <- := ?
          pattern: /(\=|\-)&gt;|&lt;\-|\:\=/g,
          color: 'operator'
        },
        { // match number and hexa: 12  15.2  0x878
          pattern: /\b([0-9]+(?:\.[0-9]+)?|0x[0-9a-f]+)[jf]?\b/g,
          color: 'num'
        },
        {
          pattern: /\b(false|true|undefined|True|False|nil|null)\b/gi,
          color: 'num'
        },
        { // match regexp: /.*/gmi
          pattern: /(\/[^*(span)].*\/[gim\)])/g,
          color: 'string',
          stripHtml: true
        }
      ]
    }
  };
})();

export default regex;