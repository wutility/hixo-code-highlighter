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

const quotes = {
  pattern: /((?<![\\])(&#39;|&quot;))((?:.(?!(?<![\\])\1))*.?)\1/g,
  color: 'yellow',
  stripHtml: true
};

const regex = {
  sql: {
    reserved: 'create|select|update|delete|table|from|right|left|join|on|inner|group|having|full|NOT|NULL|UNIQUE',
    rules: [
      quotes,
      { // comment
        pattern: /--.*?\n/g,
        color: 'gray',
        stripHtml: true
      }
    ]
  },
  python: {
    reserved: 'def|False|True',
    rules: [
      quotes,
      { // comment
        pattern: /#.*/g,
        color: 'gray',
        stripHtml: true
      }
    ]
  },
  php: {
    reserved: 'insteadof|yield from|__CLASS__',
    rules: [
      { // $variable
        pattern: /\$\w+/g,
        color: 'orange'
      },
      { // <?php  ?>
        pattern: /(&lt;\?php|\?&gt;)/g,
        color: 'gray'
      },
      quotes,
      ...classicComments
    ]
  },
  javascript: { // rules for: javascript - java - cpp/c - csharp
    reserved: 'signed|sizeof|volatile|typedef|goto|let|export|constructor|var',
    rules: [
      { // operators: ++ -- ** ::
        pattern: /(\+|\-|\*|\:){2}/g,
        color: 'pink'
      },
      { // backticks
        pattern: /`[^`]*`/g,
        color: 'yellow',
        stripHtml: true
      },
      quotes,
      ...classicComments
    ]
  },
  common: {
    reserved: 'throw|default|use|int|namespace|static|using|implements|case|import|from|try|catch|const|return|private|protected|new|public|if|do|function|while|switch|for|foreach|in|continue|break',
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
        pattern: /\s(=|\+|\/|\-|%|^|>>|<<|<|>|\*=|\+=|\-=|\+)\s/g,
        color: 'pink'
      },
      {
        pattern: /\b(false|true|undefined|True|False|nil|null)\b/gi,
        color: 'violet'
      }
    ]
  }
}