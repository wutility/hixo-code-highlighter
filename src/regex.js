const classicComments = [
  { // single comment
    pattern: /^\/\/.*/g,
    color: 'comment',
    stripHtml: true
  },
  { // single comment
    pattern: /\s+\/\/.*/g,
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
  pattern: /(--.*?\n)|(\/\*[\s\S]*?\*\/)/g,
  color: 'comment',
  stripHtml: true
}

const quotes = {
  pattern: /((?<![\\])(&apos;|&quot;))((?:.(?!(?<![\\])\1))*.?)\1/g,
  color: 'string',
  stripHtml: true
};

const sqlRvWords = 'TRIGGER|BEFORE|EXCEPTION|declare|begin|end|is|cursor|exit|fetch|when|replace|as|body|PROCEDURE|loop|create|select|update|delete|table|where|set|CONSTRAINT|order|by|BETWEEN|and|or|from|right|left|join|on|inner|group|having|full|NOT|NULL|UNIQUE';

const regex = {
  sql: {
    reserved: sqlRvWords,
    rules: [
      quotes,
      dashComment
    ]
  },
  plsql: {
    reserved: 'HIDDEN|OCICOLL|' + sqlRvWords,
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
        pattern: /(\'\'\'[\s\S]*?\'\'\')/g,
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
          pattern: /\$\{.*\}/g,
          color: 'pre-color'
        },
      },
      quotes,
      ...classicComments
    ]
  },
  common: { // comment regexp for all languages
    reserved: 'final|struct|range|async|await|let|func|default|use|namespace|static|using|implements|case|import|from|try|catch|finally|throw|const|return|private|protected|new|public|if|else|do|function|while|switch|for|foreach|in|continue|break',
    rules: [
      {
        pattern: /\b(echo|void|int|Bool|Boolean|double|String|package|Long|u32)(?=[^\w])/gi,
        color: 'sp-keys'
      },
      { // match: @Entity   @Get
        pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/g,
        color: 'variable'
      },
      {
        pattern: /(?![.])[:$]{0,2}(\w+)(?=\(.)/g,
        color: 'method',
        stripHtml: true
      },
      {
        pattern: /(class)(?=\s+\w+)/g,
        color: 'method'
      },
      {
        pattern: /(this)(?=\.\w+)/g,
        color: 'method',
        italic: true
      },
      { // double operators
        pattern: /\s?(:=|&lt;-|-&gt;|\+=)(?=[^\w])/g,
        color: 'operator'
      },
      { // double operators
        pattern: /\s+[\=\|]{2,3}\s+/g,
        color: 'operator'
      },
      { // match number
        pattern: /\b([0-9]+(?:\.[0-9]+)?)\b/g,
        color: 'num'
      },
      {
        pattern: /\b(false|true|undefined|True|False|nil|null)\b/gi,
        color: 'num'
      },
      { // match regexp: /.*/g
        pattern: /[\(|\s+]\/.*\/[gim\)]\b/g,
        color: 'comment'
      }
    ]
  }
};

export default regex;