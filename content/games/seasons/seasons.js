let historiesData = { datasets: [] };
let historiesChart = null;

const app = Vue.createApp({
  // 数据
  data() {
    return {
      // 游戏设置
      gaming: false,
      showHelp: false,
      // 游戏数据
      colors: [], // 遍历 colors 一定要用 of
      crystals: {},
      stageds: {},
      effecteds: {},
      // 历史数据
      currentEra: 0, // 当前纪元
      maxEra: 0, // 最大纪元
      histories: {}, // 历史变化
      effectedsHistories: {},
      // 这里必须用唯一 ID，不能用数组，否则由于索引的变换 vue.js 将会错误渲染
      alertID: 0,
      alerts: {},
      // 预设弹窗
      modals: {
        chart: {
          // 点击图表时才进行更新
          click: () => {
            historiesChart.update();
            this.showModal("chart");
          },
          icon: "graph-up",
          type: "success",

          title: "图表",
          class: "modal-fullscreen",
          message: `<canvas id="historiesChart"></canvas>`,
        },
        restart: {
          click: () => this.showModal("restart"),
          icon: "arrow-repeat",
          type: "success",

          title: "重新开始",
          message: "确定要重新开始吗？",

          cancel: "取消",
          confirm: "确认",

          method: this.restart,
        },
      },
      // 预设导航
      buttons: {
        undo: {
          click: () => this.undo(),
          icon: "arrow-left",
          type: "success",
        },
        redo: {
          click: () => this.redo(),
          icon: "arrow-right",
          type: "success",
        },
        nextRound: {
          click: () => {
            this.applyAll();
            this.commitAll();
            this.record();
          },
          icon: "dice-6",
          type: "success",
        },
      },
      familiars: {
        karin: { message: "凯", method: this.karin },
        figrim: { message: "菲", method: this.figrim },
        titus: { message: "提", method: this.titus },
      },
      operations: [
        { icon: "x-lg", method: this.discard },
        { icon: "check-lg", method: this.apply },
      ],
      message: {
        Start: "开始",
        Brand: "《四季物语》助手",
      },
      guides: [
        { type: "success", icon: "arrow-left", message: "返回上一回合" },
        { type: "success", icon: "dice-6", message: "进行下一回合" },
        { type: "success", icon: "arrow-right", message: "前往下一回合" },
        { type: "success", icon: "graph-up", message: "查看数据图表" },
        { type: "success", icon: "arrow-repeat", message: "重新开始游戏" },
        {
          type: "primary",
          icon: "x-lg",
          message: "取消神仆技能",
        },
        {
          type: "primary",
          icon: "check-lg",
          message: "应用神仆技能",
        },
      ],
    };
  },
  // 计算属性
  computed: {
    tabs() {
      return [
        this.buttons.undo,
        this.buttons.nextRound,
        this.buttons.redo,
        this.modals.chart,
        this.modals.restart,
      ];
    },
    currentColor() {
      // currentEra 从 1 开始
      return (this.currentEra - 1) % this.colors.length;
    },
  },
  // 方法
  methods: {
    start() {
      for (let color of this.colors) {
        this.crystals[color] = 0;
        this.stageds[color] = 0;
        this.effecteds[color] = {};
        // 初始化历史记录
        this.histories[color] = {};
        this.effectedsHistories[color] = [];
        historiesData.datasets.push({
          label: color,
          data: this.histories[color],
          backgroundColor: color,
          borderColor: color,
        });
      }
      // 一切就绪，开始游戏
      this.gaming = true;
      this.buttons.undo.disabled = true;
      this.buttons.redo.disabled = true;
      // 等待 DOM 树渲染完毕
      this.$nextTick(() => {
        historiesChart = new Chart(document.getElementById("historiesChart"), {
          type: "line",
          data: historiesData,
          options: {
            // 图表比例设置为可以变化，以填充不同比例的屏幕
            maintainAspectRatio: false,
            // 关闭精确点击/触摸
            interaction: { intersect: false },
            // 不显示圆点
            radius: 0,
            // 贝塞尔曲线精度
            tension: 0.1,
            // 在图表上使用一条竖线显示当前 Era
            scales: {
              x: {
                grid: {
                  color: (x) => {
                    // #d1e7dd 为 success 的颜色，var(--bs-table-bg)
                    if (x.tick.value + 1 == this.currentEra) return "#d1e7dd";
                    return Chart.borderColor;
                  },
                },
              },
            },
          },
        });
        this.record();
      });
    },
    restart() {
      // 等待 DOM 树渲染完毕
      this.$nextTick(() => {
        // 重置游戏设置
        this.gaming = false;
        this.showHelp = false;
        this.buttons.undo.disabled = true;
        this.buttons.redo.disabled = true;
        // 重置游戏数据
        this.colors = [];
        this.crystals = {};
        this.stageds = {};
        this.effecteds = {};
        // 重置历史数据
        this.currentEra = 0;
        this.maxEra = 0;
        this.histories = {};
        this.effectedsHistories = {};
        // 重置提示
        this.alertID = 0;
        this.alerts = {};
        // 重置图表数据
        historiesData = { datasets: [] };
        historiesChart.destroy();
        historiesChart = null;
      });
    },
    // 上一回合
    undo() {
      // vue 的范围计数从 1 开始，满足它 :)
      if (this.currentEra <= 1) return;
      --this.currentEra;
      for (let color of this.colors)
        this.crystals[color] = this.histories[color][this.currentEra];
      if (this.currentEra <= 1) this.buttons.undo.disabled = true;
      if (this.currentEra < this.maxEra) this.buttons.redo.disabled = false;
    },
    // 下一回合
    redo() {
      if (this.currentEra >= this.maxEra) return;
      ++this.currentEra;
      for (let color of this.colors)
        this.crystals[color] = this.histories[color][this.currentEra];
      if (this.currentEra > 1) this.buttons.undo.disabled = false;
      if (this.currentEra >= this.maxEra) this.buttons.redo.disabled = true;
    },
    // 记录历史
    record() {
      ++this.currentEra;
      for (let color of this.colors)
        this.histories[color][this.currentEra] = this.crystals[color];
      if (this.currentEra < this.maxEra) {
        this.maxEra = this.currentEra;
        for (let color of this.colors)
          for (let index in this.histories[color])
            if (index > this.maxEra) delete this.histories[color][index];
      } else if (this.currentEra > this.maxEra) ++this.maxEra;
      if (this.currentEra > 1) this.buttons.undo.disabled = false;
      else this.buttons.undo.disabled = true;
      if (this.currentEra < this.maxEra) this.buttons.redo.disabled = false;
      else this.buttons.redo.disabled = true;
    },
    // 重置暂存水晶
    reset(color) {
      this.stageds[color] = 0;
    },
    // 重置所有暂存水晶
    resetAll() {
      for (let color of this.colors) this.reset(color);
    },
    // 提交暂存水晶
    commit(color) {
      if (this.crystals[color] + this.stageds[color] < 0)
        this.crystals[color] = 0;
      else this.crystals[color] += this.stageds[color];
      this.reset(color);
    },
    // 提交所有暂存水晶
    commitAll() {
      for (let color of this.colors) this.commit(color);
    },
    // 召唤神仆
    effect(color, familiar) {
      this.effectedsHistories[color].push({ ...this.effecteds[color] });
      if (this.effecteds[color].hasOwnProperty(familiar))
        this.effecteds[color][familiar] += 1;
      else this.effecteds[color][familiar] = 1;
    },
    // 取消召唤
    discard(color) {
      if (this.effectedsHistories[color].length > 0)
        this.effecteds[color] = this.effectedsHistories[color].pop();
    },
    // 应用召唤
    apply(color) {
      for (let name in this.effecteds[color]) {
        for (let i = 0; i < this.effecteds[color][name]; i++)
          this.familiars[name].method(color);
        delete this.effecteds[color][name];
      }
    },
    applyAll() {
      for (let color of this.colors) this.apply(color);
    },
    // 凯恩
    karin(color) {
      for (let i of this.colors) if (i != color) this.stageds[i] -= 4;
    },
    // 菲格林
    figrim(color) {
      for (let i of this.colors)
        if (this.crystals[i] + this.stageds[i] < 1) continue;
        else if (i != color) {
          this.stageds[i] -= 1;
          this.stageds[color] += 1;
        }
    },
    // 提图斯
    titus(color) {
      let sacrifice = false;
      for (let i of this.colors)
        if (this.crystals[i] + this.stageds[i] < 1) sacrifice = true;
        else if (i != color) {
          this.stageds[i] -= 1;
          this.stageds[color] += 1;
        }
      if (sacrifice) this.alert({ message: "提图斯牺牲", type: "danger" });
    },
    // 提示
    alert(what) {
      this.alerts[this.alertID] = { what: what };
      ++this.alertID;
    },
    // 关闭提示
    closeAlert(alertID) {
      let that = this;
      let element = document.getElementById(`alert-${alertID}`);
      element.addEventListener("closed.bs.alert", function () {
        delete that.alerts[alertID];
      });
      let alert = bootstrap.Alert.getOrCreateInstance(element);
      alert.close();
    },
    // 弹窗
    showModal(modalID) {
      let element = document.getElementById(`modal-${modalID}`);
      let modal = bootstrap.Modal.getOrCreateInstance(element);
      modal.show();
    },
    // 关闭弹窗
    closeModal(modalID) {
      let element = document.getElementById(`modal-${modalID}`);
      let modal = bootstrap.Modal.getOrCreateInstance(element);
      modal.hide();
    },
    // 背景颜色
    bgColor(color) {
      if (this.stageds[color] == 0) return "secondary";
      else if (this.stageds[color] > 0) return "danger";
      else return "success";
    },
    // 按钮颜色
    btnColor(color) {
      if (this.stageds[color] == 0) return "secondary";
      else if (this.stageds[color] > 0) return "danger";
      else return "success";
    },
    // 有符号的暂存水晶
    signedStage(color) {
      if (this.stageds[color] == 0) return ``;
      else if (this.stageds[color] > 0) return `+${this.stageds[color]}`;
      else return `${this.stageds[color]}`;
    },
  },
});

const vm = app.mount("#Seasons");
