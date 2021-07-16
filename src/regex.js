const regex = (function () {
  // reserved words
  const commonRvw = 'as|endl|final|struct|range|async|await|let|func|default|use|namespace|static|using|implements|case|import|from|try|catch|finally|throw|const|return|private|protected|new|public|if|else|do|function|while|switch|for|foreach|in|continue|break',
    ClikeRsw = '#include|defer|signed|sizeof|volatile|typedef|goto|export|var|delegate',
    JsRsw = 'defer|type|export|constructor|var',
    sqlRvw = 'ALTER|DROP|TRIGGER|BEFORE|EXCEPTION|declare|begin|end|is|cursor|exit|fetch|when|replace|as|body|PROCEDURE|loop|create|select|update|delete|table|where|set|CONSTRAINT|order|by|BETWEEN|and|or|from|right|left|join|on|inner|group|having|full|NOT|NULL|UNIQUE',
    plsqlRsw = 'HIDDEN|OCICOLL|ELSIF|' + sqlRvw,
    PhpRsw = 'insteadof|yield from|__CLASS__|__DIR__',
    PythonRsw = 'def|except|False|True',
    RustRsw = 'fn|become|macro|self|unsized|union';

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
    }
  };

  const quotes = {
    pattern: /((?<![\\])('|"))((?:.(?!(?<![\\])\1))*.?)\1/g,
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
    rust: {
      reserved: RustRsw,
      rules: [
        quotes,
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
          stripHtml: true
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
          pattern: /#include &lt;.*&gt;/g,
          color: 'pre-color'
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
          pattern: /\b(char|float|string|bool|boolean|double|long|integer|int|u32)(?=[^\w])/gi,
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
          group:1
        },
        { // match: method name
          pattern: /(?![.])[:$]{0,2}(\w+)(?=\(.)/g,
          color: 'method',
          stripHtml: true
        },
        { // match: this
          pattern: /(this)(?=\.\w+)/g,
          color: 'method',
          italic: true
        },
        { // operators: => -> <- := ?
          pattern: /(\=|\-)&gt;|&lt;\-|\:\=|::/g,
          color: 'operator'
        },
        { // match number and hexa: 12  15.2  0x878
          pattern: /\b([0-9]+(?:\.[0-9]+)?|0x[0-9a-f]+)\b/g,
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