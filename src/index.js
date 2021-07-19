import regex from './regex';
import './index.css'

export default class Hixo {
  options = {};

  constructor ({ language, lineNum }) {
    this.options.lineNum = lineNum || false;
    this.setLanguage(language)
  }

  setLanguage (language) {
    if (language && ['java', 'go', 'csharp', 'cpp', 'c'].includes(language)) {
      this.options.language = 'clike'
    }
    else {
      this.options.language = language || 'plaintext';
    }
  }

  replaceSpan (text) {
    const rmSpanTag = /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/g;
    return text.replace(rmSpanTag, "")
  }

  replaceChar (text) {
    const chars = {
      '+': '&plus;',
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;'
    };
    return text.replace(/[+&<>]/g, chr => chars[chr]);
  }

  addRegex (rule) { regex.common.rules.unshift(rule); }

  addKeys (keys) { regex.common.reserved += '|' + keys; }

  applyRules (text) {
    const setStyle = (rule, match) => {
      let classN = rule.color;
      if (rule.italic) classN += '+italic';
      if (rule.bold) classN += '+bold';
      return `<span hixo~§${classN}§>${match}</span>`
    }

    text = this.replaceChar(text);

    // reserved words /\b()(?=[^\w])/g
    let rw = regex.common.reserved;
    let lrw = regex[this.options.language].reserved;

    if (lrw) {
      rw += '|' + lrw;
      const nRegx = new RegExp('\\b(' + rw + ')(?=[^\w+])\\b', 'gi');
      text = text.replace(nRegx, '<span hixo~§keyword§>$1</span>');
    }

    // apply regex rules
    const rules = regex.common.rules.concat(regex[this.options.language].rules);

    const setInside = (rule, text) => text.replace(rule.pattern, (...args) => {
      if (rule.group) {
        const matches = Array.from(args);
        if (typeof rule.group === 'object') {
          return matches.slice(1, Object.keys(rule.group).length + 1).map((mi, i) => {
            mi = this.replaceSpan(mi);
            rule.color = rule.group[i + 1];
            return mi.replace(mi, v => setStyle(rule, v))
          }).
            join('');
        }
        else {
          return matches[0].replace(rule.pattern, v => setStyle(rule, v))
        }
      }
    });

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];

      text = text.replace(rule.pattern, (...args) => {

        const matches = Array.from(args);
        let match = matches[0];
        let grp = matches[rule.group];

        // check the start and the end of quotes the same: "" ''
        if (rule.color === 'string') {
          if (match.slice(0, 1) !== match.slice(-1)) return match
        }

        if (rule.stripHtml) {
          match = this.replaceSpan(match)
        }

        if (rule.inside) {
          match = setInside(rule.inside, match);
        }

        if (grp) { // group not inside
          grp = this.replaceSpan(grp);
          return match.replace(new RegExp(grp, 'g'), v => setStyle(rule, v))
        }
        else {
          return setStyle(rule, match);
        }
      });
    }

    return text
  }

  codeToHtml (text) {
    if (this.options.language === 'plaintext') return `<code>${text.trim()}</code>`;
    else {
      // replace: \' \" by space
      text = text.replace(/\w+(\\['"])\w+/g, (m, g) => {
        return m.replace(g, " ")
      });

      text = this.applyRules(text);

      // remove span wrapper from classname: < class=""></>     
      text = text.replace(/<.* .*(=|§)".*">.*<\/.*>/g, match => this.replaceSpan(match))

      // replace: hixo~§string+italic§  by class="hixo-string hixo-italic"
      text = text.replace(/\<span hixo~\§(\w+[\-\+\w+]*)\§\>/g, (m, g) => {
        return '<span class="hixo-' + g.replace(/\+/g, ' hixo-') + '">';
      });

      // Set each line a number (left bar)
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

  highlightAll () {
    const allPre = document.querySelectorAll('pre')
    for (const pre of allPre) {
      if (pre.dataset.language) {
        this.setLanguage(pre.dataset.language)
        pre.innerHTML = this.codeToHtml(pre.textContent)
      }
    }
  }
}
