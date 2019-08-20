var PropertyType = require("../components/inputs/PropertyType")
var ModelClassName = require("../components/inputs/ModelClassName")
var Namespace = require("../components/inputs/Namespace")
var CustomDbEntityClassName = require("../components/inputs/CustomDbEntityClassName")

var props = []
var idCounter = 0

module.exports = {
  all: () => {
    return props
  },
  add: model => {
    let vm = model || module.exports.vm()

    vm.id = idCounter++
    props.push(vm)
  },
  isEmpty: () => {
    return module.exports.all().every(item => {
      return item.propertyName === ""
    })
  },
  import: data => {
    if (!data || !Array.isArray(data.properties)) return false

    Namespace.set(data.namespace)
    ModelClassName.set(data.modelClassName)
    CustomDbEntityClassName.set(data.customDbEntityClassName)

    data.properties.forEach(vm => {
      vm.id = idCounter++
      props.push(vm)
    });
  },
  processImport: e => {
    let input = e.target;
    let reader = new FileReader();

    reader.onload = function () {
      let text = reader.result
      let data = JSON.parse(text)

      if (data) {
        module.exports.removeAll()
        module.exports.import(data)
        m.redraw()
      } else {
        alert("Error importing entries")
      }
    }

    reader.readAsText(input.files[0])
  },
  export: () => {
    return JSON.stringify({
      namespace: Namespace.get(),
      modelClassName: ModelClassName.get(),
      customDbEntityClassName: CustomDbEntityClassName.get(),
      properties: module.exports.all(),
      created: new Date().toUTCString()
    })
  },
  processExport: () => {
    var entries = module.exports.export(),
      filename = "TWS-model-generator-" + (+new Date)

    function download(content, fileName, contentType) {
      var a = document.createElement("a");
      var file = new Blob([content], {
        type: contentType
      });

      a.href = URL.createObjectURL(file);
      a.download = fileName;
      a.click();
    }

    download(entries, filename + ".json", 'text/plain');
  },
  get: id => {
    return props.find(item => {
      return item.id == id
    })
  },
  removeLast: () => {
    props.splice(-1)
  },
  removeAt: id => {
    var item = props.find(item => {
      return item.id == id
    })

    props.splice(props.indexOf(item), 1)

    if (props.length === 0) {
      module.exports.add()
    }
  },
  removeAll: () => {
    props = []
  },
  vm: model => {
    return model || {
      id: idCounter,
      propertyName: "",
      propertyType: PropertyType.propertyTypes[0],
      displayName: "",
      dbFieldName: ""
    }
  }
}