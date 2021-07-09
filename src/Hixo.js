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
    }

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      text = text.replace(
        rule.pattern,
        match => {
          if (rule.stripHtml) {
            match = this.stripHtml(match)
          }

          if (rule.inside) {
            match = match.replace(rule.inside.pattern, v => setColor(rule.inside, v))
          }

          return setColor(rule, match);
        }
      );
    }

    text = text.replace(/style=(\[([^\][]*)])/g, v => {
      if (v.startsWith('style=[')) {
        v = v.match(/\[([^}]*)\]/)[1]
        return 'class="' + v + '"'
      }
    });

    return `<code>${text.trim()}</code>`;
  }
}
