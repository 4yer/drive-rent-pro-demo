<template>
  <div class="table-box">
    <div class="card mb10 pt0 pb0">
      <SelectFilter :data="filterData" :default-values="filterResult" @change="changeFilter" />
    </div>

    <ProTable
      ref="proTable"
      title="订单列表"
      :columns="columns"
      :request-api="getTableList"
      :init-param="initParam"
      :data-callback="dataCallback"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader="scope">
        <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')"> 新增订单 </el-button>
        <el-button type="primary" :icon="Download" plain @click="downloadFile"> 导出订单数据 </el-button>
        <el-button type="danger" :icon="Delete" plain :disabled="!scope.isSelected" @click="batchDelete(scope.selectedListIds)">
          删除
        </el-button>
      </template>
      <!-- Expand -->
      <template #expand="scope">
        {{ scope.row }}
      </template>
      <!-- usernameHeader -->
      <template #usernameHeader="scope">
        <el-button type="primary" @click="ElMessage.success('我是通过作用域插槽渲染的表头')">
          {{ scope.column.label }}
        </el-button>
      </template>
      <!-- createTime -->
      <template #createTime="scope">
        <el-button type="primary" link @click="ElMessage.success('我是通过作用域插槽渲染的内容')">
          {{ scope.row.createTime }}
        </el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link :icon="View" @click="openDrawer('查看', scope.row)"> 查看 </el-button>
        <el-button type="primary" link :icon="EditPen" @click="openDrawer('编辑', scope.row)"> 编辑 </el-button>
      </template>
    </ProTable>
    <UserDrawer ref="drawerRef" />
    <ImportExcel ref="dialogRef" />
  </div>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive } from "vue";
// import { useRouter } from "vue-router";
import { User } from "@/api/interface";
import { Order } from "@/api/interface";
import { useHandleData } from "@/hooks/useHandleData";
import { useDownload } from "@/hooks/useDownload";
import { ElMessage, ElMessageBox } from "element-plus";
import ProTable from "@/components/ProTable/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import SelectFilter from "@/components/SelectFilter/index.vue";
import UserDrawer from "@/views/proTable/components/UserDrawer.vue";
import { ProTableInstance, ColumnProps } from "@/components/ProTable/interface";
import { CirclePlus, Delete, EditPen, Download, View } from "@element-plus/icons-vue";
import { deleteUser, editUser, addUser, exportUserInfo } from "@/api/modules/user";

import { getOrderList } from "@/api/modules/order";

// const router = useRouter();

// 跳转详情页
// const toDetail = () => {
//   router.push(`/proTable/useProTable/detail/${Math.random().toFixed(3)}?params=detail-page`);
// };

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref<ProTableInstance>();

// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ type: 1 });

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total,
    pageNum: data.pageNum,
    pageSize: data.pageSize
  };
};

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = (params: any) => {
  let newParams = JSON.parse(JSON.stringify(params));
  newParams.createTime && (newParams.startTime = newParams.createTime[0]);
  newParams.createTime && (newParams.endTime = newParams.createTime[1]);
  delete newParams.createTime;
  return getOrderList(newParams);
};

// 订单状态
const filterData = [
  {
    title: "订单状态",
    key: "status",
    options: [
      {
        label: "全部",
        value: ""
      },
      {
        label: "待确认",
        value: "1",
        icon: "ShoppingCart"
      },
      {
        label: "待支付",
        value: "2",
        icon: "Edit"
      },
      {
        label: "进行中",
        value: "3",
        icon: "Van"
      },
      {
        label: "结算中",
        value: "4",
        icon: "Guide"
      },
      {
        label: "已完成",
        value: "5",
        icon: "CircleCheck"
      },
      {
        label: "已取消",
        value: "6",
        icon: "CircleClose"
      }
    ]
  }
];

const filterResult = ref({ state: "1", type: ["1", "3"] });

const changeFilter = (val: typeof filterResult.value) => {
  filterResult.value = val;
};

// 表格配置项
const columns: ColumnProps<Order.ResOrderList>[] = [
  { type: "selection", fixed: "left", width: 80 },
  // { type: "index", label: "#", width: 80 },
  // { type: "expand", label: "Expand", width: 100 },
  {
    prop: "id",
    label: "订单编号",
    width: 120,
    search: { el: "input" }
  },
  {
    prop: "carId",
    label: "车牌号",
    width: 120,
    search: { el: "input" }
  },
  {
    prop: "name",
    label: "车型"
  },
  {
    prop: "driver",
    label: "司机",
    render: scope => {
      return (
        <el-button type="primary" link>
          {scope.row.driver}
        </el-button>
      );
    }
  },
  {
    prop: "driverPhone",
    label: "司机电话",
    width: 120
  },
  {
    prop: "rent",
    label: "租金",
    width: 100
  },
  {
    prop: "status",
    label: "订单状态",
    tag: true,
    width: 100
  },
  {
    prop: "nextPayDate",
    label: "下次还款日期",
    width: 120
  },
  {
    prop: "store",
    label: "门店",
    width: 120
  },
  {
    prop: "createTime",
    label: "创建时间",
    width: 150,
    search: {
      el: "date-picker",
      span: 2,
      props: { type: "datetimerange", valueFormat: "YYYY-MM-DD HH:mm:ss" },
      defaultValue: ["2022-11-12 11:35:00", "2022-12-12 11:35:00"]
    }
  },
  { prop: "operation", label: "操作", fixed: "right", width: 200 }
];

// 批量删除订单信息
const batchDelete = async (id: string[]) => {
  await useHandleData(deleteUser, { id }, "删除所选订单信息");
  proTable.value?.clearSelection();
  proTable.value?.getTableList();
};

// 导出订单列表
const downloadFile = async () => {
  ElMessageBox.confirm("确认导出订单数据?", "温馨提示", { type: "warning" }).then(() =>
    useDownload(exportUserInfo, "订单列表", proTable.value?.searchParam)
  );
};

// 批量添加订单
const dialogRef = ref<InstanceType<typeof ImportExcel> | null>(null);

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref<InstanceType<typeof UserDrawer> | null>(null);
const openDrawer = (title: string, row: Partial<User.ResUserList> = {}) => {
  const params = {
    title,
    isView: title === "查看",
    row: { ...row },
    api: title === "新增" ? addUser : title === "编辑" ? editUser : undefined,
    getTableList: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
</script>
