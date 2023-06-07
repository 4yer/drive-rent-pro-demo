<template>
  <div class="card">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }" style="width: 100%">
          <el-table-column prop="date" label="交易时间" sortable width="180" />
          <el-table-column prop="name" label="交易类型" width="180">
            <template #default="scope">
              <el-tag :type="scope.row.name === '收入' ? 'success' : 'error'" disable-transitions>{{ scope.row.name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="金额" :formatter="formatter" />
          <el-table-column prop="way" label="支付方式" width="100" />
          <el-table-column prop="from" label="支付渠道" width="100" />
          <el-table-column prop="carId" label="车牌" width="100" />
          <el-table-column prop="carType" label="车型" width="100" />
          <el-table-column prop="user" label="用户" width="100" />
          <el-table-column prop="mobile" label="手机号" width="140" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default>
              <el-button link type="primary" size="small">详细</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="收入" name="second">
        <el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }" style="width: 100%">
          <el-table-column prop="date" label="交易时间" sortable width="180" />
          <el-table-column prop="name" label="交易类型" width="180">
            <template #default="scope">
              <el-tag :type="scope.row.name === '收入' ? 'success' : 'error'" disable-transitions>{{ scope.row.name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="金额" :formatter="formatter" />
          <el-table-column prop="way" label="支付方式" width="100" />
          <el-table-column prop="from" label="支付渠道" width="100" />
          <el-table-column prop="carId" label="车牌" width="100" />
          <el-table-column prop="carType" label="车型" width="100" />
          <el-table-column prop="user" label="用户" width="100" />
          <el-table-column prop="mobile" label="手机号" width="140" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default>
              <el-button link type="primary" size="small">详细</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="支出" name="third">
        <el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }" style="width: 100%">
          <el-table-column prop="date" label="交易时间" sortable width="180" />
          <el-table-column prop="name" label="交易类型" width="180">
            <template #default="scope">
              <el-tag :type="scope.row.name === '收入' ? 'success' : 'error'" disable-transitions>{{ scope.row.name }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="金额" :formatter="formatter" />
          <el-table-column prop="way" label="支付方式" width="100" />
          <el-table-column prop="from" label="支付渠道" width="100" />
          <el-table-column prop="carId" label="车牌" width="100" />
          <el-table-column prop="carType" label="车型" width="100" />
          <el-table-column prop="user" label="用户" width="100" />
          <el-table-column prop="mobile" label="手机号" width="140" />
          <el-table-column fixed="right" label="操作" width="120">
            <template #default>
              <el-button link type="primary" size="small">详细</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import type { TableColumnCtx } from "element-plus";

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

interface Data {
  date: string;
  name: string;
  amount: string;
  way: string;
  from: string;
  carId: string;
  carType: string;
  user: string;
  mobile: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const formatter = (row: Data, column: TableColumnCtx<Data>) => {
  return row.amount;
};

const tableData: Data[] = [
  {
    date: "2023-05-03",
    name: "收入",
    amount: "1000",
    way: "线下",
    from: "现金",
    carId: "沪A12345",
    carType: "别克",
    user: "张三",
    mobile: "13789894432"
  },
  {
    date: "2023-05-02",
    name: "收入",
    amount: "2000",
    way: "线上",
    from: "支付宝",
    carId: "沪A12345",
    carType: "别克",
    user: "张三",
    mobile: "13789894432"
  },
  {
    date: "2023-05-04",
    name: "支出",
    amount: "3000",
    way: "线上",
    from: "支付宝",
    carId: "沪A12345",
    carType: "别克",
    user: "张三",
    mobile: "13789894432"
  },
  {
    date: "2023-05-01",
    name: "支出",
    amount: "5000",
    way: "线下",
    from: "POS机",
    carId: "沪A12345",
    carType: "别克",
    user: "张三",
    mobile: "13789894432"
  }
];
</script>
<style>
.demo-tabs > .el-tabs__content {
  color: #333;
  font-size: 32px;
}
</style>
