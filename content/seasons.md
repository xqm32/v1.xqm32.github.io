---
title: "Seasons"
draft: false
---

<script src="https://unpkg.com/vue@next"></script>
<script src="https://unpkg.com/jquery@3.6.0"></script>
<!-- 计算器 -->
<!-- <script src="https://unpkg.com/mathjs@10.4.3"></script> -->

<div id="Seasons">
  <table style="border-left: none; border-right: none">
    <template v-for="player in players" :key="player.color">
      <tr v-if="!player.disabled">
        <td
          v-bind="{bgcolor: player.color}"
          style="border: none; width: 47%"
        ></td>
        <td
          v-bind="{bgcolor: player.color}"
          style="border: none; width: 6%"
        ></td>
        <td
          v-bind="{bgcolor: player.color}"
          style="border: none; width: 47%"
        ></td>
      </tr>
      <tr v-if="!player.disabled">
        <td class="button" style="border: none; text-align: right">
          <button @click="player.pre-=10">10</button>
          <button @click="player.pre-=5">5</button>
          <button @click="player.pre-=4">4</button>
          <button @click="player.pre-=3">3</button>
          <button @click="player.pre-=2">2</button>
          <button @click="player.pre-=1">1</button>
        </td>
        <td class="button" style="border: none; text-align: center">
          <span v-if="player.pre==0">{{player.mana}}</span>
          <button v-else @click="done(player)">
            {{player.mana}}<span v-if="player.pre>0">+</span>{{player.pre}}
          </button>
        </td>
        <td class="button" style="border: none; text-align: left">
          <button @click="player.pre+=1">1</button>
          <button @click="player.pre+=2">2</button>
          <button @click="player.pre+=3">3</button>
          <button @click="player.pre+=4">4</button>
          <button @click="player.pre+=5">5</button>
          <button @click="player.pre+=10">10</button>
        </td>
      </tr>
      <tr v-if="!player.disabled">
        <td class="button" style="border: none; text-align: right">
          <button @click="servant11(player)">菲格林</button>
          <button @click="servant16(player)">凯恩</button>
          <button @click="servant39(player)">提图斯</button>
        </td>
        <td class="button" style="border: none; text-align: center">
          <button @click="disable(player)">禁</button>
        </td>
        <td class="button" style="border: none; text-align: left">
          <button @click="reset(player)">重置</button>
          <button @click="undo">撤销</button>
          <button @click="redo">重做</button>
        </td>
        <!-- 计算器 -->
        <!-- <td class="button" style="border: none; text-align: left">
          <input type="text" @input="evaluate($event, player)" />
          ={{player.expression}}
        </td> -->
      </tr>
    </template>
  </table>
  <!-- 全部启用 -->
  <!-- <table>
    <td style="border: none; text-align: right; width: 30%"></td>
    <td style="border: none; text-align: center; width: 40%">
      <button @click="enableAll">全部启用</button>
    </td>
    <td style="border: none; text-align: right; width: 30%"></td>
  </table> -->
  <table id="histories"></table>
</div>

<script>
  const Seasons = {
    data() {
      return {
        era: 0,
        histories: [[0, 0, 0, 0]],
        // expression: "",
        // players: [
        //   { color: "purple", mana: 0, disabled: false, expression: "" },
        //   { color: "gold", mana: 0, disabled: false, expression: "" },
        //   { color: "orange", mana: 0, disabled: false, expression: "" },
        //   { color: "gray", mana: 0, disabled: false, expression: "" },
        // ],
        players: [
          { color: "purple", mana: 0, disabled: false, pre: 0 },
          { color: "gold", mana: 0, disabled: false, pre: 0 },
          { color: "gray", mana: 0, disabled: false, pre: 0 },
          { color: "orange", mana: 0, disabled: false, pre: 0 },
        ],
      };
    },
    mounted() {
      this.newEra(0);
    },
    methods: {
      servant11(player) {
        that = this;
        this.players.forEach(function (i) {
          if (!i.disabled && i.color != player.color && i.mana > 0) {
            that.add(i, -1, false);
            that.add(player, 1, false);
          }
        });
        this.recordHistory();
      },
      servant16(player) {
        that = this;
        this.players.forEach(function (i) {
          if (!i.disabled && i.color != player.color) that.add(i, -4, false);
        });
        this.recordHistory();
      },
      servant39(player) {
        that = this;
        for (let i = 0; i < this.players.length; ++i)
          if (
            this.players[i].mana <= 0 &&
            this.players[i].color != player.color
          ) {
            alert("提图斯牺牲");
            return;
          }
        this.players.forEach(function (i) {
          if (!i.disabled && i.color != player.color) {
            that.add(i, -1, false);
            that.add(player, 1, false);
          }
        });
        this.recordHistory();
      },
      disable(player) {
        const r = confirm(`确定要禁用 ${player.color} 玩家吗？`);
        if (!r) return;
        player.disabled = true;
        for (let i = 0; i < this.players.length; ++i)
          if (!this.players[i].disabled) return;
        this.enableAll();
      },
      enableAll() {
        this.players.forEach(function (i) {
          i.disabled = false;
        });
      },
      add(player, n, record = true) {
        if (player.mana + n < 0) player.mana = 0;
        else player.mana += n;
        if (record) this.recordHistory();
      },
      done(player) {
        this.add(player, player.pre);
        player.pre = 0;
      },
      reset(player) {
        player.pre = 0;
      },
      recordHistory() {
        let history = [];
        for (let i = 0; i < this.players.length; ++i)
          history.push(this.players[i].mana);
        if (0 <= this.era && this.era < this.histories.length - 1) {
          this.histories[++this.era] = history;
        } else {
          ++this.era;
          this.histories.push(history);
          this.newEra(this.era);
        }
        this.rotateEra(this.era - 1, this.era);
      },
      undo() {
        if (this.era - 1 < 0) return;
        let history = this.histories[--this.era];
        for (let i = 0; i < this.players.length; ++i)
          this.players[i].mana = history[i];
        this.rotateEra(this.era + 1, this.era);
      },
      redo() {
        if (this.era + 1 >= this.histories.length) return;
        let history = this.histories[++this.era];
        for (let i = 0; i < this.players.length; ++i)
          this.players[i].mana = history[i];
        this.rotateEra(this.era - 1, this.era);
      },
      newEra(era) {
        $("#histories").prepend(
          `<tr id=${era}>
            <td class="history"><font color="purple">${this.histories[era][0]}</font></td>
            <td class="history"><font color="gold">${this.histories[era][1]}</font></td>
            <td class="history"><font color="gray">${this.histories[era][2]}</font></td>
            <td class="history"><font color="orange">${this.histories[era][3]}</font></td>
            </tr>`
        );
      },
      rotateEra(from, to) {
        $(`#histories>#${from}`).html(
          `<td class="history"><font color="purple">${this.histories[from][0]}</font></td>
            <td class="history"><font color="gold">${this.histories[from][1]}</font></td>
            <td class="history"><font color="gray">${this.histories[from][2]}</font></td>
            <td class="history"><font color="orange">${this.histories[from][3]}</font></td>`
        );
        $(`#histories>#${to}`).html(
          `<td class="gaming"><font color="purple">${this.histories[to][0]}</font></td>
            <td class="gaming"><font color="gold">${this.histories[to][1]}</font></td>
            <td class="gaming"><font color="gray">${this.histories[to][2]}</font></td>
            <td class="gaming"><font color="orange">${this.histories[to][3]}</font></td>`
        );
      },
      // 计算器
      // evaluate(event, player) {
      //   player.expression = math.evaluate(event.target.value);
      // },
    },
  };
  Vue.createApp(Seasons).mount("#Seasons");
</script>
<style>
  td.button {
    background-color: whitesmoke;
  }
  td.history {
    background-color: whitesmoke;
    border: none;
    text-align: center;
  }
  td.gaming {
    background-color: lightgray;
    border: none;
    text-align: center;
  }
</style>
