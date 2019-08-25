var Icons = require("./Icons")

module.exports = {
  upperCaseFirst: (str, separator = " ") => {
    var strArr = str.indexOf(separator) !== -1 ? str.split(separator) : [str]

    return strArr.map(s => {
      return s.charAt(0).toUpperCase() + s.slice(1)
    }).join(separator)
  },
  removeWhiteSpace: (str = "") => {
    return str.replace(" ", "")
  },
  removeDoubleWhiteSpace: (str = "") => {
    return str.replace(/  +/g, " ")
  },
  removeStartingDigits: (str = "") => {
    return str.replace(/^\d+/, "")
  },
  startsWithDigit: str => {
    return str && str[0].match(/\d/)
  },
  getIcon: name => {
    return Icons[name]
  },
  copyToClipboard: el => {
    var range, selection;

    if (!el) return false

    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(el);
      range.select();
      copy();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(el);
      selection.removeAllRanges();
      selection.addRange(range);
      copy();
      selection.removeAllRanges();
    }

    function copy() {
      document.execCommand("Copy");
    }
  },
  removeDuplicates: (myArr, prop) => {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  },
  isNumberKey: (e) => {
    var charCode = (e.which) ? e.which : event.keyCode

    return !(charCode > 31 && (charCode < 48 || charCode > 57))
}
}