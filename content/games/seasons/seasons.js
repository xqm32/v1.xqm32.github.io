let historiesData = { datasets: [] };
let historiesChart = null;

const app = Vue.createApp({
  // 数据
  data() {
    return {
      showHelp: false,
      gaming: false,
      colors: [],
      crystals: {},
      computeds: {},
      // 历史记录
      currentEra: 0,
      maxEra: 0,
      histories: {},
      // 这里必须用唯一 ID，不能用数组，否则由于索引的变换 vue.js 将会错误渲染
      alertID: 0,
      alerts: {},
      // 渲染
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
      tabs: ["undo", "redo", "nextRound", "chart", "restart"],
      navs: {
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
            this.computes();
            this.record();
          },
          icon: "dice-6",
          type: "success",
        },
      },
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
      guides: [
        { type: "success", icon: "dice-6", message: "进行下一回合" },
        { type: "success", icon: "graph-up", message: "查看数据图表" },
        { type: "success", icon: "arrow-repeat", message: "重新开始" },
        {
          type: "primary",
          icon: "arrow-counterclockwise",
          message: "取消神仆/重置变更/上一回合",
        },
        {
          type: "primary",
          icon: "arrow-counterclockwise",
          message: "下一回合",
        },
      ],
    };
  },
  // 参见 https://v3.cn.vuejs.org/guide/composition-api-lifecycle-hooks.html
  created() {
    this.navs.chart = this.modals.chart;
    this.navs.restart = this.modals.restart;
  },
  // 计算属性
  computed: {
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
      // 一切就绪，开始游戏
      this.gaming = true;
      // 等待 DOM 树渲染完毕
      this.$nextTick(() => {
        historiesChart = new Chart(document.getElementById("historiesChart"), {
          type: "line",
          data: historiesData,
          options: {
            // 不保持比例
            maintainAspectRatio: false,
            // 无需点击即可显示 Tooltips
            interaction: { intersect: false },
            // 不显示点
            radius: 0,
            // 贝塞尔曲线
            tension: 0.1,
            // 显示当前历史
            scales: {
              x: {
                grid: {
                  color: (x) => {
                    // success 的颜色，var(--bs-table-bg)
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
      // 等待 DOM 渲染完毕
      this.$nextTick(() => {
        this.gaming = false;
        this.colors = [];
        this.crystals = {};
        this.computeds = {};

        this.currentEra = 0;
        this.maxEra = 0;
        this.histories = {};

        this.alertID = 0;
        this.alerts = {};
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
      ++this.currentEra;
      for (let color of this.colors)
        this.histories[color][this.currentEra] = this.crystals[color];
      if (this.currentEra < this.maxEra) {
        this.maxEra = this.currentEra;
        for (let color of this.colors)
          for (let index in this.histories[color])
            if (index > this.maxEra) delete this.histories[color][index];
      } else if (this.currentEra > this.maxEra) ++this.maxEra;
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
      }
      this.resets();
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
    karin(color) {
      for (let key in this.computeds)
        if (key != color) this.computeds[key] -= 4;
    },
    figrim(color) {
      for (let key in this.computeds)
        if (this.crystals[key] + this.computeds[key] < 1) continue;
        else if (key != color) {
          this.computeds[key] -= 1;
          this.computeds[color] += 1;
        }
    },
    titus(color) {
      let sacrifice = false;
      for (let key in this.computeds)
        if (this.crystals[key] + this.computeds[key] < 1) sacrifice = true;
        else if (key != color) {
          this.computeds[key] -= 1;
          this.computeds[color] += 1;
        }
      if (sacrifice) this.alert({ message: "提图斯牺牲", type: "danger" });
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
