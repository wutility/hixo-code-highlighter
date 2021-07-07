const classicComments = [
  { // single comment
    pattern: /^\/\/.*/g,
    color: 'gray',
    stripHtml: true
  },
  { // single comment
    pattern: /\s+\/\/.*/g,
    color: 'gray',
    stripHtml: true
  },
  { // multi comment /* */
    pattern: /(\/\*[\s\S]*?\*\/)/g,
    color: 'gray',
    stripHtml: true
  }
];

const dashComment = { // match: # any comment
  pattern: /#.*/g,
  color: 'gray',
  stripHtml: true
};

const quotes = {
  pattern: /((?<![\\])(&apos;|&quot;))((?:.(?!(?<![\\])\1))*.?)\1/g,
  color: 'yellow',
  stripHtml: true
};

const regex = {
  sql: {
    reserved: 'TRIGGER|BEFORE|EXCEPTION|declare|begin|end|is|cursor|exit|fetch|when|replace|as|body|PROCEDURE|loop|create|select|update|delete|table|where|set|CONSTRAINT|order|by|BETWEEN|and|or|from|right|left|join|on|inner|group|having|full|NOT|NULL|UNIQUE',
    rules: [
      quotes,
      { // match: -- any comment
        pattern: /(--.*?\n)|(\/\*[\s\S]*?\*\/)/g,
        color: 'gray',
        stripHtml: true
      }
    ]
  },
  python: {
    reserved: 'def|False|True',
    rules: [
      quotes,
      dashComment,
      { // match: ''' any comment '''
        pattern: /(\'\'\'[\s\S]*?\'\'\')/g,
        color: 'gray',
        stripHtml: true
      }
    ]
  },
  php: {
    reserved: 'insteadof|yield from|__CLASS__',
    rules: [
      { // match: $variable
        pattern: /\$\w+/g,
        color: 'orange'
      },
      { // match: <?php  ?>
        pattern: /(&lt;\?php|\?&gt;)/g,
        color: 'gray'
      },
      quotes,
      dashComment,
      ...classicComments
    ]
  },
  javascript: { // rules for: javascript - java - cpp/c - csharp
    reserved: 'signed|sizeof|volatile|typedef|goto|let|export|constructor|var',
    rules: [
      { // match: ` any string here `
        pattern: /`[^`]*`/g,
        color: 'yellow',
        stripHtml: true
      },
      quotes,
      ...classicComments
    ]
  },
  common: { // comment regexp for all languages
    reserved: 'async|await|func|default|use|int|namespace|static|using|implements|case|import|from|try|catch|throw|const|return|private|protected|new|public|if|else|do|function|while|switch|for|foreach|in|continue|break',
    rules: [
      {
        pattern: /\b(echo|void|String|package|Long)(?=[^\w])/gi,
        color: 'blue'
      },
      {
        pattern: /(?=[^.])(\w+)(?=\(.)/g,
        color: 'blue'
      },
      {
        pattern: /(class)(?=\s\w+)/g,
        color: 'blue'
      },
      {
        pattern: /(this)(?=\.\w+)/g,
        color: 'blue',
        italic: true
      },
      { // operators
        pattern: /\s+[:|%^\=]{1}\s+/g,
        color: 'pink'
      },
      { // double operators
        pattern: /(\=|\+|\*|\:|\||&lt;|&gt;){2,3}/g,
        color: 'pink'
      },
      { // match number
        pattern: /\b([0-9]+(?:\.[0-9]+)?)\b/gi,
        color: 'violet'
      },
      {
        pattern: /\b(false|true|undefined|True|False|nil|null)\b/gi,
        color: 'violet'
      },
      { // match regexp: /.*/g
        pattern: /[\(|\s+]\/.*\/[gim\)]\b/gi,
        color: 'gray'
      }
    ]
  }
}

export default regex;