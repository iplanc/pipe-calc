<template>
  <div class="app">
    <el-steps :active="steps" finish-status="success" align-center>
      <el-step title="Step 1" />
      <el-step title="Step 2" />
      <el-step title="Step 3" />
      <el-step title="Step 4" />
    </el-steps>

    <el-row :gutter="20">
      <el-col :span="6">
        <el-divider content-position="left"><h1>截取范围</h1></el-divider>
        <el-input v-model="subPipe" placeholder="截管长度" @focus="focus(1)">
          <template #append> cm </template>
        </el-input>
        请在此输入切割长度，以空格分隔
      </el-col>

      <el-col :span="6">
        <el-divider content-position="left"><h1>原料长度</h1></el-divider>
        <el-input v-model="rawPipe" placeholder="原料长度" @focus="focus(2)">
          <template #append> cm </template>
        </el-input>
        请在此输入原料长度，以空格分隔
      </el-col>

      <el-col :span="6">
        <el-divider content-position="left"><h1>算法选择</h1></el-divider>
        <el-radio-group v-model="method" @change="focus(3)">
          <el-radio-button label="GRBF">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="优先针对单个原材料进行递归运算得出局部最优解，性能较差"
              placement="top"
              >贪心递归蛮力法
            </el-tooltip>
          </el-radio-button>
          <!-- Greedy Recursion Brute-Force -->
          <el-radio-button disabled label="None2">开发中</el-radio-button>
          <el-radio-button disabled label="None3">开发中</el-radio-button>
        </el-radio-group>
      </el-col>

      <el-col :span="6">
        <el-button
          size="large"
          style="width: 100%"
          plain
          type="primary"
          @click="calc"
          v-loading.fullscreen.lock="fullscreenLoading"
        >
          <h2>开始计算</h2>
        </el-button>
      </el-col>
    </el-row>

    <el-divider style="padding-bottom: 10px"><h2>截取结果</h2></el-divider>
    <span v-html="result"></span>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      steps: 0,
      method: "GRBF",
      subPipe: "60 65 70",
      rawPipe: "220 130 260",
      result: "",
      fullscreenLoading: false,
      min: -1,
      path: "",
      waste: "",
    };
  },
  methods: {
    calc() {
      this.result = "";
      this.fullscreenLoading = true;
      this.steps = 4;

      var subPipes = this.subPipe.split(" ");
      var rawPipes = this.rawPipe.split(" ");
      var that = this;

      rawPipes.forEach(function (each) {
        if (that.method == "GRBF") {
          // Greedy Recursion Brute-Force
          that.min = each;
          that.recursion(subPipes, each, "");
          that.showResult(that.path, that.waste);
        }
      });

      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 500);

      //this.result = subPipes + "<br />" + rawPipes + this.method;
    },

    recursion(subs, raw, path) {
      var that = this;
      subs.forEach(function (each) {
        if (raw - each >= 0) {
          that.recursion(subs, raw - each, path + " " + each);
        } else {
          if (that.min > raw) {
            that.min = raw;
            that.path = path;
            that.waste = raw;
          }
          return;
        }
      });
    },

    showResult(path, waste) {
      var that = this;
      var subs = path.split(" ");
      subs.forEach(function (each) {
        // var str = "";
        //for (var i = 0; i < Math.ceil(each / 10.0); i++) str = str + "=";
        //that.result = that.result + str + " ";
        that.result = that.result + each + " | ";
      });
      that.result = that.result + " + " + waste + "<br />";
    },

    focus(step) {
      this.steps = step;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
