<template>
  <div class="dataVisualize-box">
    <div class="card top-box">
      <div class="top-title">待办事项</div>
      <el-row>
        <el-col :span="3">
          <el-statistic title="待确认订单" :value="1" />
        </el-col>
        <el-col :span="3">
          <el-statistic :value="3">
            <template #title>
              <div style="display: inline-flex; align-items: center">逾期账单</div>
            </template>
          </el-statistic>
        </el-col>
        <el-col :span="3">
          <el-statistic title="逾期未还车" :value="15" />
        </el-col>
        <el-col :span="3">
          <el-statistic title="待处理违章" :value="5">
            <template #suffix>
              <el-icon style="vertical-align: -0.125em">
                <ChatLineRound />
              </el-icon>
            </template>
          </el-statistic>
        </el-col>
        <el-col :span="3">
          <el-statistic title="年检已过期" :value="0" />
        </el-col>
        <el-col :span="3">
          <el-statistic title="保险已过保" :value="1" />
        </el-col>
        <el-col :span="3">
          <el-statistic title="逾期未保养" :value="0" />
        </el-col>
      </el-row>
    </div>
    <div class="card top-box">
      <div class="top-title">经营概况</div>
      <el-tabs v-model="tabActive" class="demo-tabs">
        <el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
      </el-tabs>
      <div class="top-content">
        <el-row :gutter="40">
          <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="item-left sle">
              <span class="left-title">逾期总金额</span>
              <div class="img-box">
                <img src="./images/book-sum.png" alt="" />
              </div>
              <span class="left-number">10.5w</span>
            </div>
          </el-col>
          <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <div class="item-center">
              <div class="today-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/today.png" alt="" />
                </div>
                <span class="item-value">540</span>
                <span class="traffic-name sle">车辆数</span>
              </div>
              <div class="yesterday-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/book_sum.png" alt="" />
                </div>
                <span class="item-value">305</span>
                <span class="traffic-name sle">司机数量</span>
              </div>
              <div class="gitee-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/add_person.png" alt="" />
                </div>
                <span class="item-value">99</span>
                <span class="traffic-name sle">订单量</span>
              </div>
              <div class="gitHub-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/add_team.png" alt="" />
                </div>
                <span class="item-value">103w</span>
                <span class="traffic-name sle">收款金额</span>
              </div>
            </div>
          </el-col>
          <el-col class="mb40" :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
            <div class="item-right">
              <div class="echarts-title">出租 / 空闲量占比</div>
              <div class="book-echarts">
                <Pie ref="pieRef" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="card bottom-box">
      <div class="bottom-title">月收入情况</div>

      <div class="curve-echarts">
        <Curve ref="curveRef" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="dataVisualize">
import { ref, onMounted } from "vue";
import Pie from "./components/pie.vue";
import Curve from "./components/curve.vue";
import { ChatLineRound } from "@element-plus/icons-vue";

const tabActive = ref(1);
const pieRef = ref();
const curveRef = ref();

onMounted(() => {
  pieRef.value.initChart(pieData);
  curveRef.value.initChart(curveData);
});

const tab = [
  { label: "总计", name: 1 },
  { label: "近七日", name: 2 },
  { label: "近一月", name: 3 },
  { label: "近三月", name: 4 },
  { label: "近半年", name: 5 },
  { label: "近一年", name: 6 }
];
const pieData = [
  { value: 200, name: "出租" },
  { value: 300, name: "空闲" }
];
const curveData = [
  { value: 70, spotName: "2023年1月" },
  { value: 20, spotName: "2023年2月" },
  { value: 60, spotName: "2023年3月" },
  { value: 55, spotName: "2023年4月" },
  { value: 80, spotName: "2023年5月" },
  { value: 50, spotName: "2023年6月" }
];
</script>

<style scoped lang="scss">
@import "./index.scss";
.el-col {
  text-align: center;
}
</style>
