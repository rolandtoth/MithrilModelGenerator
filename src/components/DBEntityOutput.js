var OutputTemplates = require("../views/OutputTemplates")

module.exports = {
    onupdate: () => {
        document.getElementById("ModelOutputDBEntity").textContent = document.getElementById("ModelOutputDBEntityTextarea").value || ""
        Prism.highlightElement(document.getElementById("ModelOutputDBEntity"))
    },
    view: () => {
        return m("div", [
            m("textarea#ModelOutputDBEntityTextarea", {
                    style: "display: none !important;"
                },
                OutputTemplates.getDbEntityTemplate()
            ),
            m("pre", [m("code#ModelOutputDBEntity.language-csharp")])
        ])
    }
}
