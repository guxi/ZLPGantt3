//import './index.css';
//import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

//////// file_drog ////////
const dragWrapper = document.getElementById("drag");
//const dataTable = document.getElementById("data_Table");

dragWrapper.addEventListener("drop", (e) => {
  console.log("begain drop!");
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files && files.length > 0) {
    const path = files[0].path;
    //  console.log(path);
    window.electronAPI.setDrogFile(path);
    console.log("end drop!");
  }
})
dragWrapper.addEventListener("dragover", (e) => {
  e.preventDefault();
}
)

////////// end file drog ////////////


window.electronAPI.handleGetData(
  (_event, value) => {
    let data = {};
    data.name = JSON.parse(value).name;
    data.machine = JSON.parse(value).machine;
    data.part = JSON.parse(value).part;
    data.item = JSON.parse(value).item;
    //console.log("data:" + data);

    setDataTable(data);

    ff(data);
  }
);

const setDataTable = (data) => {

  const table = require('./datatable.js');
  table.setdataTable(data, "data_Table");
}

const ff = (s) => {
  const charts = require('./chart.js')
  charts.setEcharts(s, 'echarts');

}
//ff(s)
//ff(source1);
//////////// end echarts ///////////




