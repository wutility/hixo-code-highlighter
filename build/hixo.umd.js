(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Hixo = factory());
}(this, (function () { 'use strict';

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
    };

    const quotes = {
      pattern: /((?<![\\])('|"))((?:.(?!(?<![\\])\1))*.?)\1/g,
      color: 'string',
      stripHtml: true
    };

    const matchRegx = { // match regexp: /.*/g
      pattern: /\s+\/.*\/[gim\)]\s+/g,
      color: 'sp-key',
      stripHtml:true
    };

    // sql/plsql reseved words
    const commonRvWords = 'as|endl|final|struct|range|async|await|let|func|default|use|namespace|static|using|implements|case|import|from|try|catch|finally|throw|const|return|private|protected|new|public|if|else|do|function|while|switch|for|foreach|in|continue|break';
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
      javascript: {
        reserved: 'defer|type|export|constructor|var',
        rules: [
          { // match: ` any string here `
            pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/g,
            color: 'string',
            stripHtml: true,
            inside: { // operators: ${ } #{ }
              pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/g,
              color: 'pre-color'
            },
          },
          quotes,
          ...classicComments
        ]
      },
      clike: { // rules for: java - cpp/c - csharp - go
        reserved: '#include|defer|signed|sizeof|volatile|typedef|goto|export|var',
        rules: [
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
            color: 'sp-key'
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
            pattern: /\w+(\-|&plus;){2}/g,
            color: 'operator',
            group: 1
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

  class Hixo {
    options = {};

    constructor ({ language, lineNum }) {
      this.options.lineNum = lineNum || false;
      this.setLanguage(language);
    }

    setLanguage (language) {
      if (language && ['java', 'go', 'csharp', 'cpp', 'c'].includes(language)) {
        this.options.language = 'clike';
      }
      else {
        this.options.language = language || '';
      }
    }

    replaceSpan (text) {
      const rmSpanTag = /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g;
      return text.replace(rmSpanTag, "")
    }

    replaceChar (text) {
      const chars = { '+': '&plus;', '&': '&amp;', '<': '&lt;', '>': '&gt;', '\\': '\\\\' };
      return text.replace(/[+&<>\\]/g, chr => chars[chr]);
    }

    /**
     * @param {Object} regex 
     */
    addRegex (rule) {
      regex.common.rules.unshift(rule);
    }

    /**
     * @param {String} keys 
     */
    addKeys (keys) {
      regex.common.reserved += '|' + keys;
    }

    codeToHtml (text) {
      const setStyle = (rule, match) => {
        let bold = rule.bold ? ' hixo-bold' : '',
          italic = rule.italic ? ' hixo-italic' : '',
          classN = rule.color + italic + bold;
        return `<span hixo=[hixo-${classN}]>${match}</span>`
      };

      text = this.replaceChar(text);

      // reserved words /\b()(?=[^\w])/g
      let rw = regex.common.reserved;
      rw += '|' + regex[this.options.language].reserved;

      text = text.replace(
        new RegExp('\\b(' + rw + ')(?=[^\w+])\\b', 'gi'),
        '<span hixo=[hixo-keyword]>$1</span>'
      );

      // apply regex rules
      const rules = regex.common.rules.concat(regex[this.options.language].rules);

      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        text = text.replace(rule.pattern, (...args) => {

          const matches = Array.from(args);
          let match = matches[0];
          let grp = matches[rule.group];

          if (rule.stripHtml) {
            match = this.replaceSpan(match);
          }

          if (rule.inside) {
            match = match.replace(rule.inside.pattern, v => setStyle(rule.inside, v));
          }

          if (grp) {
            grp = this.replaceSpan(grp);
            return match.replace(new RegExp(grp, 'g'), v => setStyle(rule, v))
          }
          else {
            return setStyle(rule, match);
          }
        }
        );    }

      // remove span wrapper from classname: < class=""></>     
      text = text.replace(/<.* .*=".*">.*<\/.*>/g, match => this.stripHtml(match));

      text = text.replace(/hixo=(\[([^\][]*)])/g, v => {
        if (v.startsWith('hixo=[')) {
          v = v.match(/\[([^}]*)\]/)[1];
          return 'class="' + v + '"'
        }
      });

      // set line number
      if (this.options.lineNum) {
        text = text.split(/\n/g).map((line, i) => {
          i = i + 1;
          return `<span class="hixo-line-num mr-${('' + i).length}">${i}</span>${line}`
        })
          .join('\n');
      }

      return `<code>${text.trim()}</code>`;
    }
  }

  return Hixo;

})));
