(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var trae = style.getPropertyValue('--trae').trim();
  var workbuddy = style.getPropertyValue('--workbuddy').trim();
  var codex = style.getPropertyValue('--codex').trim();
  var claude = style.getPropertyValue('--claude').trim();

  // ── Chart 1: Radar ──
  var radarEl = document.getElementById('chart-radar');
  if (radarEl) {
    var radar = echarts.init(radarEl, null, { renderer: 'svg' });
    radar.setOption({
      animation: false,
      tooltip: { appendToBody: true },
      legend: {
        data: ['Trae', 'WorkBuddy', 'Codex', 'Claude Code'],
        bottom: 0,
        textStyle: { color: muted, fontSize: 12 },
        itemWidth: 14,
        itemHeight: 14
      },
      radar: {
        indicator: [
          { name: '自主编程能力', max: 5 },
          { name: '多端覆盖', max: 5 },
          { name: '模型生态', max: 5 },
          { name: '开发者体验', max: 5 },
          { name: '企业级能力', max: 5 },
          { name: '价格竞争力', max: 5 }
        ],
        shape: 'polygon',
        splitNumber: 5,
        axisName: {
          color: ink,
          fontSize: 12,
          fontWeight: 600
        },
        splitLine: {
          lineStyle: { color: rule }
        },
        splitArea: {
          areaStyle: {
            color: [bg2, '#ffffff']
          }
        },
        axisLine: {
          lineStyle: { color: rule }
        }
      },
      series: [{
        type: 'radar',
        data: [
          {
            value: [3, 4, 5, 4, 3, 5],
            name: 'Trae',
            itemStyle: { color: trae },
            lineStyle: { color: trae, width: 2 },
            areaStyle: { color: trae + '20' }
          },
          {
            value: [2, 5, 4, 3, 5, 4],
            name: 'WorkBuddy',
            itemStyle: { color: workbuddy },
            lineStyle: { color: workbuddy, width: 2 },
            areaStyle: { color: workbuddy + '20' }
          },
          {
            value: [5, 5, 3, 4, 4, 3],
            name: 'Codex',
            itemStyle: { color: codex },
            lineStyle: { color: codex, width: 2 },
            areaStyle: { color: codex + '20' }
          },
          {
            value: [5, 4, 4, 5, 4, 2],
            name: 'Claude Code',
            itemStyle: { color: claude },
            lineStyle: { color: claude, width: 2 },
            areaStyle: { color: claude + '20' }
          }
        ]
      }]
    });
    window.addEventListener('resize', function() { radar.resize(); });
  }

  // ── Chart 2: Pricing Bar ──
  var priceEl = document.getElementById('chart-pricing');
  if (priceEl) {
    var priceChart = echarts.init(priceEl, null, { renderer: 'svg' });
    priceChart.setOption({
      animation: false,
      tooltip: {
        appendToBody: true,
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: function(params) {
          var s = '<b>' + params[0].name + '</b><br/>';
          params.forEach(function(p) {
            s += p.marker + ' ' + p.seriesName + ': $' + p.value + '/月<br/>';
          });
          return s;
        }
      },
      legend: {
        data: ['免费版用量', '入门付费', '专业版'],
        bottom: 0,
        textStyle: { color: muted, fontSize: 12 }
      },
      grid: {
        left: '8%',
        right: '5%',
        top: '8%',
        bottom: '18%'
      },
      xAxis: {
        type: 'category',
        data: ['Trae', 'WorkBuddy', 'Codex', 'Claude Code'],
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: ink, fontSize: 13, fontWeight: 600 },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'value',
        name: '月费 (USD)',
        nameTextStyle: { color: muted, fontSize: 11 },
        axisLine: { show: false },
        axisLabel: { color: muted, fontSize: 11, formatter: '${value}' },
        splitLine: { lineStyle: { color: rule } }
      },
      series: [
        {
          name: '免费版用量',
          type: 'bar',
          data: [0, 0, 0, 0],
          itemStyle: { color: bg2 },
          barGap: '10%'
        },
        {
          name: '入门付费',
          type: 'bar',
          data: [
            { value: 3, itemStyle: { color: trae } },
            { value: 10, itemStyle: { color: workbuddy } },
            { value: 20, itemStyle: { color: codex } },
            { value: 20, itemStyle: { color: claude } }
          ],
          label: {
            show: true,
            position: 'top',
            color: ink,
            fontSize: 12,
            fontWeight: 700,
            formatter: '${c}'
          },
          barGap: '10%'
        },
        {
          name: '专业版',
          type: 'bar',
          data: [
            { value: 10, itemStyle: { color: trae + '99' } },
            { value: 14, itemStyle: { color: workbuddy + '99' } },
            { value: 200, itemStyle: { color: codex + '99' } },
            { value: 100, itemStyle: { color: claude + '99' } }
          ],
          label: {
            show: true,
            position: 'top',
            color: muted,
            fontSize: 11,
            fontWeight: 600,
            formatter: '${c}'
          }
        }
      ]
    });
    window.addEventListener('resize', function() { priceChart.resize(); });
  }

  // ── Chart 3: Positioning Scatter ──
  var posEl = document.getElementById('chart-position');
  if (posEl) {
    var posChart = echarts.init(posEl, null, { renderer: 'svg' });
    posChart.setOption({
      animation: false,
      tooltip: {
        appendToBody: true,
        formatter: function(params) {
          var d = params.data;
          return '<b>' + d.name + '</b><br/>' +
            '编程专注度: ' + d.value[0] + '/10<br/>' +
            '自主化程度: ' + d.value[1] + '/10<br/>' +
            '用户规模: ' + d.size + ' (相对值)';
        }
      },
      grid: {
        left: '10%',
        right: '10%',
        top: '8%',
        bottom: '12%'
      },
      xAxis: {
        type: 'value',
        name: '编程场景专注度 →',
        nameLocation: 'middle',
        nameGap: 30,
        nameTextStyle: { color: muted, fontSize: 12, fontWeight: 600 },
        min: 0,
        max: 11,
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: muted, fontSize: 11 },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } }
      },
      yAxis: {
        type: 'value',
        name: '自主化程度 →',
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: { color: muted, fontSize: 12, fontWeight: 600 },
        min: 0,
        max: 11,
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: muted, fontSize: 11 },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } }
      },
      series: [
        {
          name: 'Trae',
          type: 'scatter',
          data: [{
            name: 'Trae',
            value: [9, 7],
            size: 60,
            itemStyle: { color: trae, opacity: 0.85 }
          }],
          symbolSize: function(data) { return data.size; },
          label: {
            show: true,
            formatter: 'Trae',
            position: 'top',
            color: trae,
            fontSize: 13,
            fontWeight: 700
          }
        },
        {
          name: 'WorkBuddy',
          type: 'scatter',
          data: [{
            name: 'WorkBuddy',
            value: [4, 8],
            size: 45,
            itemStyle: { color: workbuddy, opacity: 0.85 }
          }],
          symbolSize: function(data) { return data.size; },
          label: {
            show: true,
            formatter: 'WorkBuddy',
            position: 'top',
            color: workbuddy,
            fontSize: 13,
            fontWeight: 700
          }
        },
        {
          name: 'Codex',
          type: 'scatter',
          data: [{
            name: 'Codex',
            value: [9, 9],
            size: 70,
            itemStyle: { color: codex, opacity: 0.85 }
          }],
          symbolSize: function(data) { return data.size; },
          label: {
            show: true,
            formatter: 'Codex',
            position: 'top',
            color: codex,
            fontSize: 13,
            fontWeight: 700
          }
        },
        {
          name: 'Claude Code',
          type: 'scatter',
          data: [{
            name: 'Claude Code',
            value: [10, 9],
            size: 50,
            itemStyle: { color: claude, opacity: 0.85 }
          }],
          symbolSize: function(data) { return data.size; },
          label: {
            show: true,
            formatter: 'Claude Code',
            position: 'top',
            color: claude,
            fontSize: 13,
            fontWeight: 700
          }
        }
      ]
    });
    window.addEventListener('resize', function() { posChart.resize(); });
  }
})();
