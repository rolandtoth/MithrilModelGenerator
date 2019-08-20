module.exports = {
  upperCaseFirst: (str, separator = " ") => {
    var strArr = str.indexOf(separator) !== -1 ? str.split(separator) : [str]

    return strArr.map(s => {
      return s.charAt(0).toUpperCase() + s.slice(1)
    }).join(separator)
  },
  removeWhiteSpace: (str) => {
    return str.replace(" ", "")
  },
  removeDoubleWhiteSpace: (str) => {
    return str.replace(/  +/g, " ")
  },
  copyToClipboard: (el) => {
    var range, selection;

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
  }
}