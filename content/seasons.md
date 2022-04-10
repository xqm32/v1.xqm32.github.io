---
title: "Seasons"
draft: false
---

<script src="https://unpkg.com/vue@next"></script>

<div id="Seasons">
  <table v-for="player in players" style="border-left:none;border-right:none;">
    <tr>
    <td v-bind="{bgcolor: player.color}" style="border:none;width:45%"></td>
    <td v-bind="{bgcolor: player.color}" style="border:none;width:10%"></td>
    <td v-bind="{bgcolor: player.color}" style="border:none;width:45%"></td>
    </tr>
    <tr>
      <td  style="border:none;text-align:right">
      <span style="margin-right:5%">-</span>
      <button @click="player.mana-=5">5</button>
      <button @click="player.mana-=3">3</button>
      <button @click="player.mana-=2">2</button>
      <button @click="player.mana-=1">1</button>
      </td>
      <td style="border:none;text-align:center">
      {{player.mana}}
      </td>
      <td style="border:none;text-align:left">
      <button @click="player.mana+=1">1</button>
      <button @click="player.mana+=2">2</button>
      <button @click="player.mana+=3">3</button>
      <button @click="player.mana+=5">5</button>
      <span style="margin-left:5%">+</span>
      </td>
    </tr>
  </table>
  </div>
</div>

<script>
  const Seasons = {
    data() {
      return {
        players: [
          {
            color: "purple",
            mana: 0,
          },
          {
            color: "yellow",
            mana: 0,
          },
          {
            color: "orange",
            mana: 0,
          },
          {
            color: "gray",
            mana: 0,
          },
        ],
      };
    },
  };

  Vue.createApp(Seasons).mount("#Seasons");
</script>
