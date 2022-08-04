const getXlsxFile = (filepath) => {
  const nodeXlsx = require("node-xlsx");
  try {
    let data = nodeXlsx.parse(filepath);
    let data00 = data[0].data;
    let machines = [];
    let parts = [];
    let items = [];

    let returnData = {};
    returnData.filepath = filepath;
    // console.log("data00:")
    // console.log(data00)
    data00.forEach((e, index) => {
      switch (index) {
        case 0: {
          returnData.name = e[1]; break
        }
        case 1: {
          e.forEach((ee, index) => {
            if (index >= 1) machines.push(ee)
          })
          break;
        };
        case 2: {
          e.forEach((ee, index) => {
            if (index >= 1) parts.push(ee)
          })
          break;
        };
        case 3: break;
        default: {
          e.shift()
          items.push(e)
        }
      }
    })
    returnData.machine = machines;
    returnData.part = parts;
    returnData.item = items;
    // console.log("returnData:");
    // console.log(returnData);

    return returnData;
  } catch (err) {
    console.log("getExcellFile error:" + err)
  };
}

const getJsonFile = (filepath) => {
  try {
    const fs = require("fs");
    let value = fs.readFileSync(filepath, "utf-8");

    let data = {};
    data.name = JSON.parse(value).name;
    data.machine = JSON.parse(value).machine;
    data.part = JSON.parse(value).part;
    data.item = JSON.parse(value).item;
    data.filepath = filepath;
    return data;
  } catch (err) {
    console.log("getJsonFile error:" + err)
  };

}
export { getXlsxFile, getJsonFile }