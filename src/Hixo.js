import regex from './regex';
import './hixo.css'

export default class Hixo {
  options = {};

  constructor ({ language }) {
    this.setLanguage(language);
  }

  setLanguage (language) {
    if (language && ['java', 'go', 'csharp', 'cpp', 'c'].includes(language)) {
      this.options.language = 'javascript'
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
    const chars = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '\\': '\\\\' };
    return text.replace(/[&<>]/g, chr => chars[chr]);
  }

  /**
   * @param {Object} regex 
   */
  addRegex(regex){
    regex.common.rules.unshift(regex);
  }

  /**
   * @param {String} keys 
   */
  addKeys (keys) {
    regex.common.reserved += '|' + keys
  }

  codeToHtml (text) {
    const setColor = (rule, match) => {
      let classN = rule.color + (rule.italic ? ' hixo-italic' : '');
      return `<span hixo=[hixo-${classN}]>${match}</span>`
    }

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
          match = this.replaceSpan(match)
        }

        if (rule.inside) {
          match = match.replace(rule.inside.pattern, v => setColor(rule.inside, v))
        }

        if (grp) {
          console.log(grp);
          let rgx = new RegExp(grp, 'g')
          console.log(rgx);
          return match.replace(new RegExp(grp, 'g'), v => setColor(rule, v))
        }
        else {
          return setColor(rule, match);
        }
      }
      );;
    }

    // remove span wrapper from classname: < class=""></>     
    text = text.replace(/<.* .*=".*">.*<\/.*>/g, match => this.stripHtml(match))

    text = text.replace(/hixo=(\[([^\][]*)])/g, v => {
      if (v.startsWith('hixo=[')) {
        v = v.match(/\[([^}]*)\]/)[1]
        return 'class="' + v + '"'
      }
    });

    return `<code>${text.trim()}</code>`;
  }
}
