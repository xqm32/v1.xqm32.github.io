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
      familiars: [
        { name: "Karin", method: this.karin },
        { name: "Figrim", method: this.figrim },
        { name: "Titus", method: this.titus },
      ],
      operations: [
        { name: "Reset", method: this.reset },
        { name: "Undo", method: this.undo },
        { name: "Redo", method: this.redo },
      ],
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
    // History
    undo() {
      if (this.currentEra < this.histories.length - 1)
        this.crystals = { ...this.histories[++this.currentEra] };
    },
    redo() {
      if (this.currentEra > 0)
        this.crystals = { ...this.histories[--this.currentEra] };
    },
    record() {
      if (this.currentEra == 0) this.histories.unshift({ ...this.crystals });
      else this.histories[--this.currentEra] = { ...this.crystals };
    },
    // Compute
    reset(color) {
      this.computeds[color] = 0;
    },
    compute(color) {
      if (this.crystals[color] + this.computeds[color] < 0)
        this.crystals[color] = 0;
      else this.crystals[color] += this.computeds[color];
      this.computeds[color] = 0;
      this.record();
    },
    computes() {
      for (let key in this.computeds) this.compute(key);
    },
    btnComputed(color) {
      if (this.computeds[color] == 0) return "btn-outline-secondary";
      else if (this.computeds[color] > 0) return "btn-outline-danger";
      else return "btn-outline-success";
    },
    signComputed(color) {
      if (this.computeds[color] == 0) return "";
      else if (this.computeds[color] > 0) return "+" + this.computeds[color];
      else return this.computeds[color];
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
      if (sacrifice) alert("Sacrifice Titus!");
    },
  },
});

const vm = app.mount("#Seasons");
