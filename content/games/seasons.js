const app = Vue.createApp({
  // Data
  data() {
    return {
      gaming: false,
      currentEra: 0,
      colors: [],
      crystals: {},
      computeds: {},
      histories: [],
      // 这里必须用唯一 ID，不能用数组，否则由于索引的变换 vue.js 将会错误渲染
      alertID: 0,
      alerts: {},
      modalID: 0,
      modals: {},
      // Constants
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
        Modal: {
          Restart: "确定要重新开始吗？",
          RestartTitle: "重新开始",
        },
        Cancel: "取消",
        Confirm: "确认",
        Restart: "重新开始",
        Start: "开始",
        Brand: "《四季物语》助手",
      },
    };
  },
  // Methods
  methods: {
    start() {
      for (let color of this.colors) {
        this.crystals[color] = 0;
        this.computeds[color] = 0;
      }
      this.record();
      this.gaming = true;
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
      });
    },
    // History
    undo() {
      let reset = false;
      for (let color in this.computeds)
        if (this.computeds[color] != 0) {
          this.reset(color);
          reset = true;
        }
      if (reset) return;
      if (this.currentEra < this.histories.length - 1)
        this.crystals = { ...this.histories[++this.currentEra] };
    },
    redo() {
      if (this.currentEra > 0)
        this.crystals = { ...this.histories[--this.currentEra] };
    },
    record() {
      // 只记录 50 次
      if (this.histories.length >= 50) this.histories.pop();
      if (this.currentEra == 0) this.histories.unshift({ ...this.crystals });
      else this.histories[--this.currentEra] = { ...this.crystals };
    },
    // Compute
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
    // Familiar
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
      if (sacrifice) this.alert("提图斯牺牲！", "danger");
    },
    // Alerts and Modals
    alert(message, type) {
      this.alerts[this.alertID] = { message: message, type: type };
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
    modal(message, title, method) {
      this.modals[this.modalID] = {
        message: message,
        title: title,
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
