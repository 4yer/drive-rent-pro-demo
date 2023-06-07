<template>
  <el-drawer v-model="drawerVisible" :destroy-on-close="true" size="450px" :title="`${drawerProps.title}车辆`">
    <el-form
      ref="ruleFormRef"
      label-width="100px"
      label-suffix=" :"
      :rules="rules"
      :disabled="drawerProps.isView"
      :model="drawerProps.row"
      :hide-required-asterisk="drawerProps.isView"
    >
      <el-form-item label="车辆照片" prop="photo">
        <UploadImg v-model:image-url="drawerProps.row!.photo" width="135px" height="135px" :file-size="3">
          <template #empty>
            <el-icon><Avatar /></el-icon>
            <span>请上传车辆照片</span>
          </template>
          <template #tip> 照片大小不能超过 3M </template>
        </UploadImg>
      </el-form-item>
      <!-- <el-form-item label="用户照片" prop="photo">
        <UploadImgs v-model:file-list="drawerProps.row!.photo" height="140px" width="140px" border-radius="50%">
          <template #empty>
            <el-icon><Picture /></el-icon>
            <span>请上传照片</span>
          </template>
          <template #tip> 照片大小不能超过 5M </template>
        </UploadImgs>
      </el-form-item> -->
      <el-form-item label="车牌号码" prop="carId">
        <el-input v-model="drawerProps.row!.carId" placeholder="请填写车牌号码" clearable></el-input>
      </el-form-item>
      <el-form-item label="车辆型号" prop="name">
        <el-select v-model="drawerProps.row!.name" placeholder="请选择车辆型号" clearable>
          <el-option v-for="item in genderType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="发动机号" prop="engineNo">
        <el-input v-model="drawerProps.row!.engineNo" placeholder="请填写发动机号" clearable></el-input>
      </el-form-item>
      <el-form-item label="颜色" prop="color">
        <el-input v-model="drawerProps.row!.color" placeholder="请填写颜色" clearable></el-input>
      </el-form-item>
      <el-form-item label="门店" prop="store">
        <el-input v-model="drawerProps.row!.store" placeholder="请填写门店" clearable></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false"> 取消 </el-button>
      <el-button v-show="!drawerProps.isView" type="primary" @click="handleSubmit"> 确定 </el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from "vue";
import { genderType } from "@/utils/serviceDict";
import { ElMessage, FormInstance } from "element-plus";
import { Car } from "@/api/interface";
import UploadImg from "@/components/Upload/Img.vue";
// import UploadImgs from "@/components/Upload/Imgs.vue";

const rules = reactive({
  avatar: [{ required: true, message: "请上传车辆照片" }],
  photo: [{ required: true, message: "请上传车辆照片" }],
  carId: [{ required: true, message: "请填写车牌号码" }],
  gender: [{ required: true, message: "请选择车辆型号" }],
  idCard: [{ required: true, message: "请填写发动机号" }],
  email: [{ required: true, message: "请填写颜色" }],
  store: [{ required: true, message: "请填写车辆类型" }]
});

interface DrawerProps {
  title: string;
  isView: boolean;
  row: Partial<Car.ResCarList>;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
}

const drawerVisible = ref(false);
const drawerProps = ref<DrawerProps>({
  isView: false,
  title: "",
  row: {}
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  drawerProps.value = params;
  drawerVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async valid => {
    if (!valid) return;
    try {
      await drawerProps.value.api!(drawerProps.value.row);
      ElMessage.success({ message: `${drawerProps.value.title}车辆成功！` });
      drawerProps.value.getTableList!();
      drawerVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

defineExpose({
  acceptParams
});
</script>
