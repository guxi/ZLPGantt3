const { dialog } = require('electron');

const setMenu = (openFile, openXlsxSample, menuHelp) => {

  const template = [{
    label: '文件',
    submenu: [
      {
        label: '打开',
        click: () => {
          openFile();
        }
      },
      {
        label: '示例',
        click: () => {
          openXlsxSample();
        }
      },
      { label: '退出', role: 'quit' }
    ]
  },
  {
    label: '编辑',
    submenu: [
      { label: '复制', role: 'copy' },
      { label: '全选', role: 'selectAll' },
    ]
  },
  {
    label: '视图',
    submenu: [
      { label: '重载', role: 'reload' },
      { label: '强制重载', role: 'forceReload' },
      // { label: '开发工具',
      // role: 'toggleDevTools' },
      { type: 'separator' },
      { label: '恢复', role: 'resetZoom' },
      { label: '放大', role: 'zoomIn' },
      { label: '缩小', role: 'zoomOut' },
      { type: 'separator' },
      { label: '全屏', role: 'togglefullscreen' }

    ]
  },
  {
    label: '帮助',
    submenu: [{
      label: '帮助',
      click: () => {
        menuHelp()
      }
    }, {
      label: '关于',
      click: () => {
        dialog.showMessageBox({
          title: "关于",
          button: "确定",
          type: "info",
          message: "甘特图生成器"
        });
      }
    }]
  },
  ];
  return template
}

export { setMenu }