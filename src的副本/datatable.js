
const setdataTable = (data, divid) => {

  let name = data.name;
  let machines = data.machine;
  let parts = data.part;
  let items = data.item;
  // div层次  dragdiv 以下替换 data_div 
  let dragdiv = document.getElementById("drag");
  let data_div = document.getElementById("data");
  let table_div = document.getElementById("data_Table_div");


  let data_div_R = document.createElement("div");
  data_div_R.setAttribute("id", "data");

  //----标题------
  let name_R = document.createElement("h5");
  name_R.innerHTML = name;
  data_div_R.append(name_R);
  //data_div_R.append(name_R);

  //------ 表格数据  -------
  let table_R = document.createElement("table");
  let thead_R = document.createElement("thead");
  let tbody_R = document.createElement("tbody");
  table_R.setAttribute("class", "table table-hover");
  //-------- 表头
  let title = ['工位', '零件', '工艺', '开始', '结束']
  let trh = document.createElement("tr");
  title.forEach(e => {
    let th = document.createElement("th");
    th.innerHTML = e;
    trh.appendChild(th);
  })
  thead_R.appendChild(trh);

  // ------ 表体 
  items.forEach(e => {
    let trd = document.createElement("tr");
    // e[4] = e[4] - e[3]
    e.forEach((ee, index) => {
      let td = document.createElement("td");
      if (index == 0) ee = machines[ee]
      if (index == 1) ee = parts[ee]

      td.innerHTML = ee;
      trd.appendChild(td);
    })
    tbody_R.appendChild(trd)
    //console.log(tbody_R)
  })
  table_R.appendChild(thead_R)
  table_R.appendChild(tbody_R)
  console.log(table_R)
  // table_R.appendChild(tbody_R);

  data_div_R.append(table_R);
  dragdiv.replaceChild(data_div_R, data_div);

  //设置foot
  let foot1 = document.getElementById("file-path");
  let foot2 = document.getElementById("chartsinfo");
  foot1.innerHTML = "数据文件：" + data.filepath;
  foot2.innerHTML = "M:" + machines.length + "  P:" + parts.length + "  W:" + items.length;
  // foota.setAttribute("href", data.filepath)
}
export { setdataTable };

