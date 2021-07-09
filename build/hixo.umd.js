(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Hixo = factory());
}(this, (function () { 'use strict';

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
  };

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
        { // match: @Entity   @Get(
          pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/g,
          color: 'variable'
        },
        {
          pattern: /(?=[^.])(\w+)(?=\s?\(.)/g,
          color: 'method'
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
          pattern: /\s?(:=|&lt;-|-&gt;|\+=|\:\:)(?=[^\w])/g,
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

  class Hixo {
    options = {};

    constructor ({ language }) {
      this.setLanguage(language);
    }

    setLanguage (language) {
      if (language && ['java', 'go', 'csharp', 'cpp', 'c'].includes(language)) {
        this.options.language = 'javascript';
      }
      else {
        this.options.language = language || '';
      }
    }

    stripHtml (text) {
      let tmp = document.createElement("div");
      tmp.innerHTML = text;
      return tmp.textContent || tmp.innerText || "";
    }

    replaceSpanTag (text) {
      return text.replace(/<\/?span[^>]*>/ig, "")
    }

    htmlEscapes (text) {
      const htmlEscapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;'
      };

      return text.replace(/[&<>"']/g, chr => htmlEscapes[chr]);
    }

    codeToHtml (text) {
      text = this.htmlEscapes(text);
      text = text.replace(/\\/, "\\\\");

      // reserved words /\b()(?=[^\w])/g
      let rw = regex.common.reserved;
      rw += '|' + regex[this.options.language].reserved;

      text = text.replace(
        new RegExp('\\b(' + rw + ')(?=[^\w+])\\b', 'gi'),
        '<span style=[hixo-keyword]>$1</span>'
      );

      // apply regex rules
      const rules = regex.common.rules.concat(regex[this.options.language].rules);

      const setColor = (rule, match) => {
        let classN = rule.color + (rule.italic ? ' hixo-italic' : '');
        return `<span style=[hixo-${classN}]>${match}</span>`
      };

      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        text = text.replace(
          rule.pattern,
          match => {
            if (rule.stripHtml) {
              match = this.stripHtml(match);
            }

            if (rule.inside) {
              match = match.replace(rule.inside.pattern, v => setColor(rule.inside, v));
            }

            return setColor(rule, match);
          }
        );
      }

      text = text.replace(/style=(\[([^\][]*)])/g, v => {
        if (v.startsWith('style=[')) {
          v = v.match(/\[([^}]*)\]/)[1];
          return 'class="' + v + '"'
        }
      });

      return `<code>${text.trim()}</code>`;
    }
  }

  return Hixo;

})));
