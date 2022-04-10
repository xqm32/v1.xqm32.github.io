---
title: "Seasons"
draft: false
---

<script src="https://unpkg.com/vue@next"></script>

<div id="Seasons">
  <template v-for="player in players" :key="players.color">
    <table
      v-if="!player.disabled"
      style="border-left: none; border-right: none"
    >
      <tr>
        <td
          v-bind="{bgcolor: player.color}"
          style="border: none; width: 45%"
        ></td>
        <td
          v-bind="{bgcolor: player.color}"
          style="border: none; width: 10%"
        ></td>
        <td
          v-bind="{bgcolor: player.color}"
          style="border: none; width: 45%"
        ></td>
      </tr>
      <tr>
        <td style="border: none; text-align: right">
          <button @click="minus(player, 5)">5</button>
          <button @click="minus(player, 3)">3</button>
          <button @click="minus(player, 2)">2</button>
          <button @click="minus(player, 1)">1</button>
        </td>
        <td style="border: none; text-align: center">{{player.mana}}</td>
        <td style="border: none; text-align: left">
          <button @click="add(player, 1)">1</button>
          <button @click="add(player, 2)">2</button>
          <button @click="add(player, 3)">3</button>
          <button @click="add(player, 5)">5</button>
        </td>
      </tr>
      <tr>
        <td style="border: none; text-align: right">
          <button @click="servant33(player)">邪术魔蛭</button>
          <button @click="servant39(player)">凝望者提图斯</button>
        </td>
        <td style="border: none; text-align: center">
          <button @click="disable(player)">禁用</button>
        </td>
      </tr>
    </table>
  </template>
  <table>
    <td style="border: none; text-align: right; width: 40%"></td>
    <td style="border: none; text-align: center; width: 10%">
      <button @click="enableAll">全部启用</button>
    </td>
    <td style="border: none; text-align: right; width: 40%"></td>
  </table>
</div>

<script>
  const Seasons = {
    data() {
      return {
        players: [
          { color: "purple", mana: 0, disabled: false },
          { color: "yellow", mana: 0, disabled: false },
          { color: "orange", mana: 0, disabled: false },
          { color: "gray", mana: 0, disabled: false },
        ],
      };
    },
    watch: {
      players(newPlayers, oldPlyaers) {
        players.forEach((player) => {
          if (player.mana < 0) player.mana = 0;
        });
      },
    },
    methods: {
      servant33(player) {
        that = this;
        this.players.forEach(function (i) {
          if (!i.disabled && i.color != player.color && i.mana>0) {
            that.minus(i, 1);
            that.add(player, 1);
          }
        });
      },
      servant39(player) {
        that = this;
        for (let i = 0; i < this.players.length; ++i)
          if (this.players[i].mana <= 0 && i.color != player.color) {
            alert("凝望者提图斯将牺牲");
            return;
          }
        this.players.forEach(function (i) {
          if (!i.disabled && i.color != player.color) {
            that.minus(i, 1);
            that.add(player, 1);
          }
        });
      },
      disable(player) {
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
      minus(player, n) {
        player.mana -= n;
        if (player.mana < 0) player.mana = 0;
      },
      add(player, n) {
        player.mana += n;
      },
    },
  };
  Vue.createApp(Seasons).mount("#Seasons");
</script>
