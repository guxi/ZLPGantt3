import * as echarts from "echarts";


const setEcharts = function (source, divid) {
  var chartDom = document.getElementById(divid);
  var myChart = echarts.init(chartDom
    //   , null
    //   , {
    //   width: 600,
    //   height: 400,
    // }
  );
  window.onresize = function () {
    myChart.resize();
  }

  var option;
  var indata = source

  var color = [
    '#7b9ce1',
    '#bd6d6c',
    '#75d874',
    '#e0bc78',
    '#dc77dc',
    '#72b362'
  ]
  var data = []
  var partwork = []

  var machineWork = []
  var dataByMachine = () => {
    indata.machine.forEach((M, index1) => {
      let mw = []
      indata.item.forEach((work) => {
        if (index1 == work[0]) {
          let w = [];
          w = work;
          mw.push(w)
        }
      })
      machineWork.push(mw)
    })
  }

  var dataByPart = () => {
    indata.part.forEach((P, index1) => {
      let mw = []
      indata.item.forEach((work) => {
        if (index1 == work[1]) {
          let w = [];
          w = work;
          mw.push(w)
        }
      })
      machineWork.push(mw)
    })
  }
  // dataByPart();
  dataByMachine();
  // console.log("machineWork:")
  // console.log(machineWork)

  var setwork = (mindex, windex) => {
    let workunit = machineWork[mindex][windex]
    let partno = workunit[1]
    let workname = workunit[2]
    let unit = {}
    let normal = {}
    let itemStyle = {}
    let value = []
    value.push(mindex)
    value.push(workunit[3])
    value.push(workunit[4])
    let tt = workunit[4] - workunit[3]
    value.push(tt.toFixed(1)) //保留一位小数
    unit.value = value;

    normal.color = color[partno % 6]; // 颜色数组循环取值
    itemStyle.normal = normal
    unit.itemStyle = itemStyle;

    unit.name = indata.part[partno] + ":" + workname
    return unit;
  }

  machineWork.forEach((M, mindex) => {
    machineWork[mindex].forEach((W, windex) => {
      data.push(setwork(mindex, windex));
      // console.log(setwork(mindex, windex));     
    })
  })

  function renderItem(params, api) {
    var categoryIndex = api.value(0);
    var start = api.coord([api.value(1), categoryIndex]);
    var end = api.coord([api.value(2), categoryIndex]);
    var height = api.size([0, 1])[1] * 0.6;
    var rectShape = echarts.graphic.clipRectByRect(
      {
        x: start[0],
        y: start[1] - height / 2,
        width: end[0] - start[0],
        height: height
      },
      {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height
      }
    );
    return (
      rectShape && {
        type: 'rect',
        transition: ['shape'],
        shape: rectShape,
        style: api.style()
      }
    );
  }
  // 指定图表的配置项和数据
  var option = {
    tooltip: {
      formatter: function (params) {
        return params.marker + params.name + ': ' + params.value[3];
      }
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          show: true,
          type: 'png',
          name: '下载',
          title: '保存图形',
        },
      }
    },
    title: {
      text: indata.name + '   甘特图',
      left: 'center'
    },

    dataZoom: [
      {
        type: 'slider',
        filterMode: 'weakFilter',
        showDataShadow: false,
        top: 400,
        labelFormatter: ''
      },
      {
        type: 'inside',
        filterMode: 'weakFilter'
      }
    ],
    grid: {
      height: 300
    },
    xAxis: {
      scale: true,
    },
    yAxis: {
      data: indata.machine
    },
    series: [
      {
        type: 'custom',
        renderItem: renderItem,
        itemStyle: {
          opacity: 0.8
        },
        encode: {
          x: [1, 2],
          y: 0
        },
        data: data
      }
    ]
  };
  // console.log(data)
  // 使用刚指定的配置项和数据显示图表。
  option && myChart.setOption(option);
}

export { setEcharts };
