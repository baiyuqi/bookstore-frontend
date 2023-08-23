<template>
  <div class="modal" v-if="is_open">
    <div class="content">
      <p class="close" @click="hide()">close</p>
      <p class="title">{{ title }}</p>
      <p class="title">{{ product.name }}</p>
      <Row :gutter="16" style="background: #eee; padding: 10%">
        <Col span="12">
          <Card style="height: 200px">
            
            <div style="text-align: center">
              <Upload
                :before-upload="handleLocalUpload"
                :action="product.action||''"
                ref="localUploadRef"
                :on-success="handleLocalSuccess"
                :on-error="handleLocalError"
              >
                <Button icon="ios-cloud-upload-outline">选择文件</Button>
              </Upload>
              <Button
                type="primary"
                @click="localUpload"
                :loading="local.loadingStatus"
                :disabled="!local.file"
              >
                {{ local.loadingStatus ? "本地文件上传中" : "本地上传" }}
              </Button>
            </div>
            <div>
              <div v-if="local.log.status != 0">
                状态：{{ local.log.message }}
              </div>
              <div v-if="local.log.status === 200">
                文件名：{{ local.log.fileName }}
              </div>
              <div v-if="local.log.status === 200">
                文件路径：{{ local.log.filePath }}
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {config} from "../config";
axios.defaults.withCredentials = true
import { Upload, Row, Button, Col, Card } from "iview";


export default {
  props: ["title", "content", "id"],
  components: {
    Upload,
       Card,

 Button, Col,
    Row
  },
  data() {
    return {
      is_open: false,
      product: {},
      local: {
        // 选择文件后，将 beforeUpload 返回的 file 保存在这里，后面会用到
        file: null,
        // 标记上传状态
        loadingStatus: false,
        log: {
          status: 0,
          message: "",
          fileName: "",
          filePath: "",
        },
      },
    };
  },
  mounted() {
    let vm = this;

    vm.$nextTick(function () {
      console.log(vm.id);
      axios
        .get(config.server + "/product/get?id=" + vm.id)
        .then((response) => {
          vm.product = response.data;
          vm.product.action =
            config.server + "/product/uploadImage?productId=" +
            vm.product.id;
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  },
  methods: {
    show() {
      this.is_open = true;
    },
    hide() {
      this.is_open = false;
    },
    // beforeUpload 在返回 false 或 Promise 时，会停止自动上传，这里我们将选择好的文件 file 保存在 data里，并 return false
    handleLocalUpload(file) {
      this.local.file = file;
      return false;
    },
    // 这里是手动上传，通过 $refs 获取到 Upload 实例，然后调用私有方法 .post()，把保存在 data 里的 file 上传。
    // iView 的 Upload 组件在调用 .post() 方法时，就会继续上传了。
    localUpload() {
      this.local.loadingStatus = true; // 标记上传状态
      this.$refs.localUploadRef.post(this.local.file);
    },
    // 上传成功后，清空 data 里的 file，并修改上传状态
    handleLocalSuccess(response) {
      this.local.file = null;
      this.local.loadingStatus = false;
      if (response.code === 200) {
       // this.$Message.success(response.message);
        this.local.log.status = response.code;
        this.local.log.message = response.message;
     //   this.local.log.fileName = response.data.fileName;
       // this.local.log.filePath = response.data.filePath;
        this.$refs.localUploadRef.clearFiles();
      } else {
       // this.$Message.error(response.message);
        this.local.log.status = response.code;
        this.local.log.message = response.message;
      }
    },
    // 上传失败后，清空 data 里的 file，并修改上传状态
    handleLocalError() {
      this.local.file = null;
      this.local.loadingStatus = false;
     // this.$Message.error("上传失败");
    },
   
  },
};
</script>
<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
}
.content {
  width: 600px;
  height: 400px;
  background-color: #fff;
  margin: 0px auto;
  margin-top: 200px;
  text-align: center;
  font-size: 14px;
  color: #333;
  padding: 5px;
}
.title {
  margin-bottom: 20px;
  font-size: 16px;
}
.close {
  text-align: right;
}
</style>