let historiesData = { datasets: [] };
let historiesChart = null;

const app = Vue.createApp({
  // 数据
  data() {
    return {
      gaming: false,
      historiesChart: true,
      historiesTable: false,
      currentEra: 0,
      maxEra: 0,
      colors: [],
      crystals: {},
      computeds: {},
      histories: {},
      // 这里必须用唯一 ID，不能用数组，否则由于索引的变换 vue.js 将会错误渲染
      alertID: 0,
      alerts: {},
      modalID: 0,
      modals: {},
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
        Restart: {
          button: "重新开始",
          message: "确定要重新开始吗？",
          title: "重新开始",
          cancel: "取消",
          confirm: "确认",
        },
        Start: "开始",
        Brand: "《四季物语》助手",
      },
    };
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
          options: { pointRadius: 0, tension: 0.1 },
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
        this.modalID = 0;
        this.modals = {};
        // 清空历史图标数据（实际是解绑，使得原对象 GC）
        historiesData = { datasets: [] };
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
      historiesChart.update();
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
      this.record();
    },
    computes() {
      for (let color in this.computeds) {
        if (this.crystals[color] + this.computeds[color] < 0)
          this.crystals[color] = 0;
        else this.crystals[color] += this.computeds[color];
        this.computeds[color] = 0;
      }
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
    modal(what, method) {
      this.modals[this.modalID] = {
        what: what,
        method: method,
      };
      // 需要等待 modal 渲染完毕
      this.$nextTick(() => {
        let element = document.getElementById(`modal-${this.modalID}`);
        let modal = bootstrap.Modal.getOrCreateInstance(element);
        modal.show();
        ++this.modalID;
      });
    },
    closeModal(modalID) {
      let that = this;
      let element = document.getElementById(`modal-${modalID}`);
      element.addEventListener("hidden.bs.modal", function () {
        // 此处有一个 DOM 渲染
        delete that.modals[modalID];
      });
      let modal = bootstrap.Modal.getOrCreateInstance(element);
      modal.hide();
    },
  },
});

const vm = app.mount("#Seasons");