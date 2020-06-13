<template>
  <div class="traffic-light" :class="`${$route.params.id}-active`">
    <div
      class="item red"
      :class="seconds[0] < 3 && seconds[0] > 0 ? 'pulse' : ''"
    >
      <span v-if="seconds[0] > 0">{{ seconds[0] }}</span>
    </div>
    <div
      class="item orange"
      :class="seconds[1] < 3 && seconds[1] > 0 ? 'pulse' : ''"
    >
      <span v-if="seconds[1] > 0">{{ seconds[1] }}</span>
    </div>
    <div
      class="item green"
      :class="seconds[2] < 3 && seconds[2] > 0 ? 'pulse' : ''"
    >
      <span v-if="seconds[2] > 0">{{ seconds[2] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current_idx: 0,
      direction: "down",
      colors: ["red", "orange", "green"],
      delays: [10, 3, 15],
      seconds: [0, 0, 0]
    };
  },
  beforeMount() {
    this.current_idx = this.colors.indexOf(this.$route.params.id);
    this.direction = localStorage.getItem("direction");
    this.iniCurrentSec();
    this.startTimer();
  },
  mounted() {
    this.startTraffic();
  },
  methods: {
    iniCurrentSec() {
      const storage_sec = parseInt(localStorage.getItem("sec"));
      this.seconds[this.current_idx] =
        localStorage.getItem("color") === this.$route.params.id &&
        storage_sec > 0
          ? storage_sec
          : this.delays[this.current_idx];
      this.seconds = this.seconds.slice();
    },
    startTimer() {
      const timer = setInterval(() => {
        this.seconds = this.seconds.slice();
        this.seconds[this.current_idx] -= 1;

        const sec = this.seconds[this.current_idx];
        localStorage.setItem("sec", sec);
        if (sec === 0) {
          clearInterval(timer);
        }
      }, 1000);
    },
    setDirection() {
      const color = this.colors[this.current_idx];
      if (color === "red") {
        this.direction = "down";
      }
      if (color === "green") {
        this.direction = "up";
      }
    },
    setCounter() {
      if (this.direction === "down") {
        this.current_idx += 1;
      } else {
        this.current_idx -= 1;
      }
    },
    startTraffic() {
      this.setDirectionToLocalStorage();
      localStorage.setItem("color", this.colors[this.current_idx]);
      const intervalId = setInterval(() => {
        clearInterval(intervalId);
        this.setDirection();
        this.setCounter();
        this.startTimer();

        const color = this.colors[this.current_idx];
        this.$route.params.id !== color &&
          this.$router.push({ path: `/${color}` });

        this.iniCurrentSec();
        this.startTraffic();
      }, this.seconds[this.current_idx] * 1000);
    },
    setDirectionToLocalStorage() {
      if (this.colors[this.current_idx] === "green") {
        localStorage.setItem("direction", "up");
      }
      if (this.colors[this.current_idx] === "red") {
        localStorage.setItem("direction", "down");
      }
    }
  }
};
</script>

<style lang="css" scoped>
.traffic-light {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 140px;
  padding: 15px 0;
  margin: auto;
  background-color: #333;
  border-radius: 10px;
}
.item {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  order: 0;
  flex: 0 1 auto;
  align-self: auto;
  opacity: 0.5;
  color: #fff;
  font-family: "Courier New", Courier, monospace;
  font-size: 30px;
  font-weight: bolder;
}
.red-active .red,
.orange-active .orange,
.green-active .green {
  opacity: 1;
}
.red {
  background-color: red;
}
.orange {
  margin: 10px 0;
  background-color: orange;
}
.green {
  background-color: green;
}
@keyframes pulse {
  25% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.pulse {
  animation: pulse 0.5s ease-in-out infinite;
}
</style>
