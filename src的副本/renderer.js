import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

//-------- file_drog ---------//
const dragWrapper = document.getElementById("drag");
dragWrapper.addEventListener("drop", (e) => {
  console.log("begain drop!");
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files && files.length > 0) {
    let path = files[0].path;
    window.electronAPI.setDrogFile(path);
  }
})
dragWrapper.addEventListener("dragover", (e) => {
  e.preventDefault();
})
///------ end file drog ---------//

//------ 获取数据，设置描述和图形界面
window.electronAPI.handleGetData(
  (_event, data) => {
    const table = require('./datatable.js');
    table.setdataTable(data, "data_Table");
    const charts = require('./chart2.js')
    charts.setEcharts(data, 'echarts');
  });
//--------- end 界面设置 ----------//

//--------  菜单事件  --------//
const menu_sample = document.getElementById('sample')
const menu_openfile = document.getElementById('openfile')
const menu_home = document.getElementById('home')

menu_sample.addEventListener('click', () => {
  window.electronAPI.menu_getSample();
});

menu_openfile.addEventListener('click', () => {
  window.electronAPI.menu_openfile();
});
menu_home.addEventListener('click', () => {
  window.electronAPI.menu_home();
});



