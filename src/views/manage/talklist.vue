<template>
   <div class="m-20">

      <el-table :data="userList" stripe style="width: 100%;border: solid 1px #e3e3e3;" :height="'calc(100vh - 200px)'"
         :header-cell-style="{ 'background-color': '#f5f7fa', 'color': '#909399' }" @sort-change="sortChange"
         @row-dblclick="handleClick">
         <el-table-column fixed prop="talk_id" label="ID" sortable="custom" width="150">
         </el-table-column>
         <el-table-column prop="remark" label="谁和谁打招呼" >
         </el-table-column>
         <el-table-column prop="create_time" label="打招呼时间" width="140">
            <template slot-scope="scope">
               {{ scope.row.create_time }}
            </template>
         </el-table-column>

      </el-table>
      <div class="mt-15">
         <el-pagination background @size-change="handleChange" @current-change="getUserList"
            :current-page.sync="params.page" :page-sizes="[20, 50, 100, 200, 300, 400, 500]" :page-size.sync="params.limit"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
         </el-pagination>
      </div>
      <el-dialog :title="formTitle" :visible.sync="dialogVisible" :modal="true" width="800px"
         @close="dialogVisible = false" append-to-body>
         <el-form :model="detail" :rules="rules" ref="userinfo" label-width="100px">
            <el-form-item label="名称" prop="name">
               <el-input placeholder="请输入名称" v-model="detail.name"></el-input>
            </el-form-item>
            <el-form-item label="URL地址" prop="url">
               <el-input v-model="detail.url" placeholder="请输入URL地址"></el-input>
            </el-form-item>
            <el-form-item label="LOGO图标" prop="logo">
               <el-upload class="avatar-uploader" :headers="getToken" :action="getUrl" :show-file-list="false"
                  :on-success="uploadSuccess" :on-change="change" :before-upload="beforeAvatarUpload">
                  <img v-if="sysInfo_ico" :src="sysInfo_ico" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
               </el-upload>
               <el-input v-model="sysInfo_ico" style="display: none;"></el-input>
            </el-form-item>


            <el-form-item label="状态" prop="status">
               <el-radio-group v-model="detail.status">
                  <el-radio :label="1" border>正常</el-radio>
                  <el-radio :label="0" border>禁用</el-radio>
               </el-radio-group>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
               <el-input type="textarea" :rows="2" v-model="detail.remark"></el-input>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" @click="submitForm('userinfo')">保存</el-button>
            </el-form-item>
         </el-form>

      </el-dialog>
      <el-dialog title="修改密码" :visible.sync="dialogPass" :modal="true" width="400px" append-to-body>
         <el-form label-width="100px">
            <el-form-item label="新密码">
               <el-input v-model="password" show-password placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="重复密码">
               <el-input v-model="repass" show-password placeholder="请输入重复输入密码"></el-input>
            </el-form-item>
            <el-form-item>
               <el-button type="primary" @click="editPassword()">保存</el-button>
            </el-form-item>
         </el-form>
      </el-dialog>
   </div>
</template>
 
<script>
import { mapState } from 'vuex';
import Lockr from 'lockr'
export default {
   data() {
      return {
         sysInfo_ico: '',
         total: 0,
         params: {
            page: 1,
            limit: 20,
            keywords: '',
            order_field: '',
            order_type: 1,
            agent_id:"",
         },
         userList: [],
         formTitle: "添加记录",
         formType: "add",
         dialogVisible: false,
         detail: {},
         originDetail: {
            name:'',
            url:'',
            logo:'',
            remark: '',
            status: 1,
         },
         rules: {
            name: [
               { required: true, message: '请输入标题名称', trigger: 'blur' }
            ],
            url: [
               { required: true, message: '请输入url地址', trigger: 'blur' }
            ],

         },
         dialogPass: false,
         password: '',
         repass: '',
         currentUser: {},
      }
   },
   computed: {
      ...mapState({
         globalConfig: state => state.globalConfig
      }),
      getToken() {
         const authKey = Lockr.get('authToken');
         return { Authorization: authKey }
      },
      getUrl() {
         return window.BASE_URL + '/common/upload/uploadImage'
      }

   },
   watch: {
      dialogVisible(New) {
         if (!New) {
            this.detail = this.originDetail;
         }
      }
   },
   mounted() {
     // this.detail = this.originDetail;
     let user_info= this.$store.state.userInfo;
      if(user_info.account !=='administrator'){
         this.params.agent_id=user_info.agent_id
      }

      this.getUserList();
      
   },
   methods: {
      uploadSuccess(res, file) {
         console.log(res)
         this.sysInfo_ico = res.data;
         this.detail.logo=res.data;
      },
      change(file, fileList) {
         // this.sysInfo.logo = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
         // const isJPG = file.type === 'image/jpeg';
         // const isLt2M = file.size / 1024 / 1024 < 2;

         // if (!isJPG) {
         //   this.$message.error('上传头像图片只能是 JPG 格式!');
         // }
         // if (!isLt2M) {
         //   this.$message.error('上传头像图片大小不能超过 2MB!');
         // }
         // console.log(file)

         // return isJPG && isLt2M;
      },
      // 获取用户列表
      getUserList() {
         this.$api.thirdApi.getTalkList(this.params).then(res => {
            if (res.code == 0) {
               this.userList = res.data.data;
               this.total = res.count;
               this.params.page = res.data.page;
            }
         })
      },
      // 排序
      sortChange(column) {
         this.params.order_field = column.prop;
         if (column.order == null) {
            this.params.order_field = null;
         }
         this.params.order_type = column.order == 'ascending' ? 1 : 2;
         this.getUserList();
      },
      handleClick(row) {
         this.$user(row.user_id, {
            isManage: true, editDataCallbak: data => {
               this.editUser(data);
            }
         });
      },
      handleChange() {
         // 更换每页显示条数后，需要重新从第一页开始
         this.params.page = 1;
         this.getUserList();
      },
      // 添加成员
      addUser() {
         this.formTitle = "添加记录";
         this.formType = "add";
         this.dialogVisible = true;
      },
      // 修改成员
      editUser(item) {
         let detail = item;
         this.formTitle = "修改记录";
         this.formType = "edit";
         this.dialogVisible = true;

         this.sysInfo_ico=detail.logo

         this.detail = detail;
      },
      validateContact(rule, value, callback) {
         if (!value) {
            callback();
         } else if (/^1[3456789]\d{9}$/.test(value) || /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
            callback();
         } else {
            callback(new Error('请输入正确的手机号或邮箱'));
         }
      },
      submitForm(formName) {
         this.$refs[formName].validate((valid) => {
            if (valid) {
               if (this.formType == 'add') {
                  this.$api.thirdApi.addUser(this.detail).then(res => {
                     if (res.code == 0) {
                        this.dialogVisible = false;
                        this.getUserList();
                        this.$message({
                           message: res.msg,
                           type: 'success'
                        });
                     }
                  })
               } else {
                  let detail = JSON.parse(JSON.stringify(this.detail));
                  delete detail.password;
                  this.$api.thirdApi.editUser(detail).then(res => {
                     if (res.code == 0) {
                        this.dialogVisible = false;
                        this.getUserList();
                        this.$message({
                           message: res.msg,
                           type: 'success'
                        });
                     }
                  })
               }

            } else {
               console.log('error submit!!');
               return false;
            }
         });
      },
      editPass(item) {
         this.currentUser = item;
         this.dialogPass = true;
      },
      // 修改密码
      editPassword() {
         if (this.password == '' || this.password.length < 6 || this.password.length > 16) {
            this.$message({
               message: '请输入6-16个字符串的密码',
               type: 'warning'
            });
            return false;
            
         }
         if (this.password != this.repass) {
            this.$message({
               message: '两次密码不一致',
               type: 'warning'
            });
            return false;
         }
         let params = {
            user_id: this.currentUser.user_id,
            password: this.password
         }
         this.$api.thirdApi.editPassword(params).then(res => {
            if (res.code == 0) {
               this.dialogPass = false;
               this.password = '';
               this.repass = '';
               this.$message({
                  message: res.msg,
                  type: 'success'
               });
            }
         })
      },
      // 设置状态
      setStatus(item) {
         let params = {
            user_id: item.user_id,
            status: item.status
         }
         this.$api.thirdApi.setStatus(params).then(res => {
            if (res.code == 0) {
               this.$message({
                  message: res.msg,
                  type: 'success'
               });
            }
         })
      },
      handleCommand(item, command) {
         let params = {
            user_id: item.user_id,
            role: command
         }
         this.$api.thirdApi.setRole(params).then(res => {
            if (res.code == 0) {
               item.role = command;
               this.$message({
                  message: res.msg,
                  type: 'success'
               });
            }
         })
      },
      delUser(item) {
         this.$confirm('此操作将该记录删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
         }).then(() => {
            let params = {
               id: item.id
            }
            this.$api.thirdApi.delUser(params).then(res => {
               if (res.code == 0) {
                  this.$message({
                     message: res.msg,
                     type: 'success'
                  });
                  this.getUserList();
               }
            })
         }).catch(() => {
            this.$message({
               type: 'info',
               message: '已取消删除'
            });
         });
      }
   }
}
</script>
<style lang="scss" scoped>
::v-deep .table-header {
   background-color: #f5f5f5;
   color: #333;
}

::v-deep .avatar-uploader .el-upload {
   border: 1px dashed #d9d9d9;
   border-radius: 6px;
   cursor: pointer;
   position: relative;
   overflow: hidden;
}

::v-deep .avatar-uploader .el-upload:hover {
   border-color: #409EFF;
}

::v-deep .avatar-uploader-icon {
   font-size: 28px;
   color: #8c939d;
   width: 120px;
   height: 120px;
   line-height: 120px;
   text-align: center;
}

.avatar {
   width: 120px;
   height: 120px;
   display: block;
}
</style>