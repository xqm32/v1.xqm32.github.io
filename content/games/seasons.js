let historiesData = { datasets: [] };
let historiesChart = null;

const app = Vue.createApp({
  // 数据
  data() {
    return {
      gaming: false,
      historiesTable: true,
      currentEra: 0,
      currentColor: 0,
      maxEra: 0,
      colors: [],
      crystals: {},
      computeds: {},
      histories: {},
      // 这里必须用唯一 ID，不能用数组，否则由于索引的变换 vue.js 将会错误渲染
      alertID: 0,
      alerts: {},
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
          button: "重新开始",
          icon: "arrow-repeat",
          type: "success",

          title: "重新开始",
          message: "确定要重新开始吗？",

          cancel: "取消",
          confirm: "确认",

          method: this.restart,
        },
      },
      navs: {
        nextRound: {
          click: () => this.nextRound(),
          icon: "dice-6",
          type: "success",
        },
      },
      // 常量
      familiars: [
        { name: "凯", method: this.karin },
        { name: "菲", method: this.figrim },
        { name: "提", method: this.titus },
      ],
      operations: [
        { icon: "arrow-counterclockwise", method: this.undo },
        { icon: "arrow-clockwise", method: this.redo },
      ],
      message: {
        Start: "开始",
        Brand: "《四季物语》助手",
      },
    };
  },
  created() {
    this.navs.chart = this.modals.chart;
    this.navs.restart = this.modals.restart;
  },
  // 方法
  methods: {
    start() {
      for (let color of this.colors) {
        this.crystals[color] = 0;
        this.computeds[color] = 0;
        // 初始化历史记录
        this.histories[color] = {};
        historiesData.datasets.push({
          label: color,
          data: this.histories[color],
          backgroundColor: color,
          borderColor: color,
        });
      }
      this.gaming = true;
      this.$nextTick(() => {
        historiesChart = new Chart(document.getElementById("historiesChart"), {
          type: "line",
          data: historiesData,
          options: { pointRadius: 0, tension: 0.1, maintainAspectRatio: false },
        });
        this.record();
      });
    },
    restart() {
      // 等待 DOM 渲染完毕
      this.$nextTick(() => {
        this.gaming = false;
        this.currentEra = 0;
        this.colors = [];
        this.crystals = {};
        this.computeds = {};
        this.histories = [];
        this.alertID = 0;
        this.alerts = {};
        // modal 逻辑变更，现在不再清空 modal
        // this.modalID = 0;
        // this.modals = {};
        // 清空历史图标数据（实际是解绑，使得原对象 GC）
        historiesData = { datasets: [] };
        historiesChart.destroy();
        historiesChart = null;
      });
    },
    // 历史
    undo() {
      // 重置功能
      let reset = false;
      for (let color in this.computeds)
        if (this.computeds[color] != 0) {
          this.computeds[color] = 0;
          reset = true;
        }
      if (reset) return;
      // 撤销功能
      // vue 的范围计数从 1 开始，满足它 :)
      if (this.currentEra <= 1) return;
      --this.currentEra;
      for (let color of this.colors)
        this.crystals[color] = this.histories[color][this.currentEra];
    },
    redo() {
      if (this.currentEra >= this.maxEra) return;
      ++this.currentEra;
      for (let color of this.colors)
        this.crystals[color] = this.histories[color][this.currentEra];
    },
    record() {
      // 只记录 50 次
      ++this.currentEra;
      for (let color of this.colors)
        this.histories[color][this.currentEra] = this.crystals[color];
      if (this.currentEra < this.maxEra) {
        this.maxEra = this.currentEra;
        for (let color of this.colors)
          for (let index in this.histories[color])
            if (index > this.maxEra) delete this.histories[color][index];
      } else ++this.maxEra;
    },
    // 计算
    reset(color) {
      this.computeds[color] = 0;
    },
    resets() {
      for (let color in this.computeds) this.computeds[color] = 0;
    },
    compute(color) {
      if (this.crystals[color] + this.computeds[color] < 0)
        this.crystals[color] = 0;
      else this.crystals[color] += this.computeds[color];
      this.computeds[color] = 0;
    },
    computes() {
      for (let color in this.computeds) {
        if (this.crystals[color] + this.computeds[color] < 0)
          this.crystals[color] = 0;
        else this.crystals[color] += this.computeds[color];
        this.computeds[color] = 0;
      }
    },
    nextRound() {
      this.computes();
      if (this.currentColor + 1 >= this.colors.length) this.currentColor = 0;
      else ++this.currentColor;
      this.record();
    },
    bgComputed(color) {
      if (this.computeds[color] == 0) return "bg-secondary";
      else if (this.computeds[color] > 0) return "bg-danger";
      else return "bg-success";
    },
    btnComputed(color) {
      if (this.computeds[color] == 0) return "btn-outline-secondary";
      else if (this.computeds[color] > 0) return "btn-outline-danger";
      else return "btn-outline-success";
    },
    signComputed(color) {
      if (this.computeds[color] == 0) return ``;
      else if (this.computeds[color] > 0) return `+${this.computeds[color]}`;
      else return `${this.computeds[color]}`;
    },
    // 神仆
    karin(color) {
      for (let key in this.computeds)
        if (key != color) this.computeds[key] -= 4;
      this.computes();
    },
    figrim(color) {
      this.computes();
      for (let key in this.computeds)
        if (this.crystals[key] < 1) continue;
        else if (key != color) {
          this.computeds[key] -= 1;
          this.computeds[color] += 1;
        }
      this.computes();
    },
    titus(color) {
      let sacrifice = false;
      // Titus 需要先 compute，判断是否有对手无法支付
      this.computes();
      for (let key in this.computeds)
        if (this.crystals[key] < 1) sacrifice = true;
        else if (key != color) {
          this.computeds[key] -= 1;
          this.computeds[color] += 1;
        }
      this.computes();
      if (sacrifice) this.alert({ message: "提图斯牺牲", type: danger });
    },
    // Alerts 和 Modals
    alert(what) {
      this.alerts[this.alertID] = { what: what };
      ++this.alertID;
    },
    closeAlert(alertID) {
      let that = this;
      let element = document.getElementById(`alert-${alertID}`);
      element.addEventListener("closed.bs.alert", function () {
        delete that.alerts[alertID];
      });
      let alert = bootstrap.Alert.getOrCreateInstance(element);
      alert.close();
    },
    showModal(modalID) {
      let element = document.getElementById(`modal-${modalID}`);
      let modal = bootstrap.Modal.getOrCreateInstance(element);
      modal.show();
    },
    closeModal(modalID) {
      let element = document.getElementById(`modal-${modalID}`);
      let modal = bootstrap.Modal.getOrCreateInstance(element);
      modal.hide();
    },
  },
});

const vm = app.mount("#Seasons");
