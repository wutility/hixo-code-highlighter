const regex = (function () {
  const classicComments = [
    { // single comment
      pattern: /^\/\/\s+.*|\s+\/\/\s+.*/g,
      color: 'comment',
      stripHtml: true
    },
    { // multi comment /* */
      pattern: /(\/\*[\s\S]*?\*\/)/g,
      color: 'comment',
      stripHtml: true
    }
  ];

  const hashComment = { // match: # any comment
    pattern: /(^#.*)|[^-'\(]#\s+[^\)'].*/g,
    color: 'comment',
    stripHtml: true
  };

  const dashComment = { // match: -- any comment
    pattern: /(^--.*|\s+--.*)\n/g,
    color: 'comment',
    stripHtml: true
  }

  const quotes = {
    pattern: /((?<![\\])('|"))((?:.(?!(?<![\\])\1))*.?)\1/g,
    color: 'string',
    stripHtml: true
  };

  const matchRegx = { // match regexp: /.*/g
    pattern: /[\(|\s+]\/.*\/[gim\)]\b/g,
    color: 'regex'
  }

  // sql/plsql reseved words
  const commonRvWords = 'endl|final|struct|range|async|await|let|func|default|use|namespace|static|using|implements|case|import|from|try|catch|finally|throw|const|return|private|protected|new|public|if|else|do|function|while|switch|for|foreach|in|continue|break';
  const sqlRvWords = 'TRIGGER|BEFORE|EXCEPTION|declare|begin|end|is|cursor|exit|fetch|when|replace|as|body|PROCEDURE|loop|create|select|update|delete|table|where|set|CONSTRAINT|order|by|BETWEEN|and|or|from|right|left|join|on|inner|group|having|full|NOT|NULL|UNIQUE';

  return {
    sql: {
      reserved: sqlRvWords,
      rules: [
        quotes,
        dashComment,
        ...classicComments
      ]
    },
    plsql: {
      reserved: 'HIDDEN|OCICOLL|ELSIF|' + sqlRvWords,
      rules: [
        quotes,
        dashComment
      ]
    },
    python: {
      reserved: 'def|False|True',
      rules: [
        quotes,
        hashComment,
        { // match: ''' any comment '''
          pattern: /("""|''')[\s\S]*?\1/g,
          color: 'comment',
          stripHtml: true
        }
      ]
    },
    php: {
      reserved: 'insteadof|yield from|__CLASS__|__DIR__',
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
        hashComment,
        ...classicComments
      ]
    },
    rust: {
      reserved: 'fn|become|macro',
      rules: [
        quotes,
        ...classicComments
      ]
    },
    javascript: { // rules for: javascript - java - cpp/c - csharp - go
      reserved: '#include|defer|signed|sizeof|volatile|type|typedef|goto|export|constructor|var',
      rules: [
        { // match: ` any string here `
          pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/g,
          color: 'string',
          stripHtml: true,
          inside: { // operators: ${ }
            pattern: /[\$\#]\{.*\}/g,
            color: 'pre-color'
          },
        },
        quotes,
        ...classicComments
      ]
    },
    common: { // comment regexp for all languages
      reserved: commonRvWords,
      rules: [
        {
          pattern: /\b(char|float|string|bool|boolean|double|long|integer|int|u32)(?=[^\w])/gi,
          color: 'data-type'
        },
        {
          pattern: /\b(class|package|instanceof|echo|void)(?=\s+\w+)/gi,
          color: 'sp-keys'
        },
        { // match: @Entity   @Get
          pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/g,
          color: 'variable'
        },
        { // match: 
          pattern: /(?![.])[:$]{0,2}(\w+)(?=\(.)/g,
          color: 'method',
          stripHtml: true
        },
        { // match: this
          pattern: /(this)(?=\.\w+)/g,
          color: 'method',
          italic: true
        },
        { // operators: == ===
          pattern: /[^\w+](\=|\||&amp;){2,3}[^"]/g,
          color: 'operator'
        },
        { // operators: %
          pattern: /(\w+|\s+)(%|\\+)(\w+|\s+)/g,
          color: 'operator',
          group: 2
        },
        { // match number: 12 15.2
          pattern: /\b([0-9]+(?:\.[0-9]+)?)\b/g,
          color: 'num'
        },
        {
          pattern: /\b(false|true|undefined|True|False|nil|null)\b/gi,
          color: 'num'
        },
        matchRegx
      ]
    }
  };
})();

export default regex;