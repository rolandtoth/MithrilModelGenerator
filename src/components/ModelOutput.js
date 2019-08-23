var OutputTemplates = require("../views/OutputTemplates")

module.exports = {
    onupdate: () => {
        document.getElementById("ModelOutput").textContent = document.getElementById("ModelOutputTextarea").value || "";
        Prism.highlightElement(document.getElementById("ModelOutput"));
    },
    view: () => {
        return m("div", [
            m("textarea#ModelOutputTextarea", {
                    style: "display: none !important;"
                },
                OutputTemplates.getModelTemplate("model")
            ),
            m("pre", [m("code#ModelOutput.language-csharp")])
        ])
    }
}
