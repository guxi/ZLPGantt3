import * as echarts from "echarts";

const setEcharts = function (source, divid) {
  const chartDom = document.getElementById(divid);
  const myChart = echarts.init(chartDom
    , null
    , {
      // width: 600,
      height: 600,
    }
  );
  window.onresize = function () {
    myChart.resize();
  }
  const color = [
    '#7b9ce1',
    '#bd6d6c',
    '#75d874',
    '#e0bc78',
    '#dc77dc',
    '#72b362'
  ]

  let data = getData(source, color);
  console.log(data);
  //  0 : {value: Array(4), itemStyle: {…}, name: '壳:切角0.5'}
  // 1: {value: Array(4), itemStyle: {…}, name: '壳:磨边2'}
  // 2: {value: Array(4), itemStyle: {…}, name: '架:磨边2'}
  // 3: {value: Array(4), itemStyle: {…}, name: '架:切上边'}
  // 4: {value: Array(4), itemStyle: {…}, name: '颈:磨边2'}
  // 5: {value: Array(4), itemStyle: {…}, name: '壳:磨边'}
  // 指定图表的配置项和数据
  let option = {
    legend: {
      orient: 'horizontal',
      right: 'auto',
      top: 'auto',
      bottom: 'auto',
      data: data.value,//source.part,
      show: true
      // show: legend.show
    },
    tooltip: {
      formatter: function (params) {
        return params.marker + params.name + ' 持续时间:' + params.value[3];
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
      text: source.name + '   甘特图',
      left: 'center'
    },

    // dataZoom: [
    //   // {   // 这个dataZoom组件，默认控制x轴。
    //   //   type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
    //   //   // start: 10,      // 左边在 10% 的位置。
    //   //   // end: 60         // 右边在 60% 的位置。
    //   // },
    //   {   // 这个dataZoom组件，也控制x轴。
    //     type: 'inside', // 这个 dataZoom 组件是 inside 型 dataZoom 组件
    //     // start: 10,      // 左边在 10% 的位置。
    //     // end: 60         // 右边在 60% 的位置。
    //   }],
    // dataZoom: [
    //   {
    //     type: 'slider',
    //     filterMode: 'weakFilter',
    //     showDataShadow: false,
    //     top: 400,
    //     labelFormatter: ''
    //   },
    //   {
    //     type: 'inside',
    //     filterMode: 'weakFilter'
    //   }
    // ],
    grid: {
      height: 300
    },
    xAxis: {
      //type: 'value',
      // name: '时间',
      //data: source.part,
      axisLable: {
        show: true,
        // formatter: '{value}秒',
        // align: 'bottom'

      },
      axisLine: {
        symbol: 'arrow',
        lineStyle: {
          type: 'dashed'
        }
      },
      axisTick: {
        alignWithLabel: true
      }
      // scale: true,
    },
    yAxis: {
      name: "工位",
      data: source.machine
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
  // 使用刚指定的配置项和数据显示图表。
  option && myChart.setOption(option);
}

const getData = (source, color) => {
  let data = []
  let machineWork = []
  let dataByMachine = () => {
    source.machine.forEach((M, index1) => {
      let mw = []
      source.item.forEach((work) => {
        if (index1 == work[0]) {
          let w = [];
          w = work;
          mw.push(w)
        }
      })
      machineWork.push(mw)
    })
  }
  dataByMachine();

  const setwork = (W, mindex) => {
    let workunit = W;
    let partno = workunit[1]
    let workname = workunit[2]
    let unit = {}
    let itemStyle = {}
    let value = []
    value.push(mindex)
    value.push(workunit[3])
    value.push(workunit[4])
    let tt = workunit[4] - workunit[3]
    value.push(tt.toFixed(1)) //保留一位小数
    unit.value = value;

    itemStyle.color = color[partno % 6];// 颜色数组循环取值
    unit.itemStyle = itemStyle;
    unit.name = source.part[partno] + ":" + workname
    // unit.name = source.part[partno]
    // unit.work = workname
    return unit;
  }
  machineWork.forEach((M, mindex) => {
    M.forEach((W) => {
      data.push(setwork(W, mindex));
    })
  })
  return data;
}

const renderItem = (params, api) => {
  let categoryIndex = api.value(0);
  let start = api.coord([api.value(1), categoryIndex]);
  let end = api.coord([api.value(2), categoryIndex]);
  let height = api.size([0, 1])[1] * 0.6;
  let rectShape = echarts.graphic.clipRectByRect(
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

export { setEcharts };