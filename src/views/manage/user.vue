<template>
   <div class="m-20">
      <div class="mb-15 lz-flex lz-space-between">
         <div>
            <el-button class="mr-15" @click="addUser" >添加成员</el-button>
         </div>
         <!-- 搜索 -->
         <div style="display: flex;">
            <el-select v-model="params.agent_id"  size="small" filterable
               style="width: 150px" placeholder="请选择代理商分组">
               <el-option value="" label="全部"></el-option>
               <el-option :value="agentitem.id" :label="agentitem.name" v-for="(agentitem, indexl) in agentList"
                  :key="indexl"></el-option>

            </el-select>
            <el-input placeholder="请输入关键字搜索" prefix-icon="el-icon-search" style="width: 300px"
               @keyup.enter.native="handleChange" v-model="params.keywords">

               <el-button slot="append" icon="el-icon-search" @click="handleChange"></el-button>
            </el-input>
         </div>

      </div>
      <div class="tab_line">

         <div class="tab_li" :class="{ 'tab_haver': tab_index == 1 }" @click="check_type(1)">真实玩家</div>
         <div class="tab_li" :class="{ 'tab_haver': tab_index == 2 }" @click="check_type(2)">虚拟会员</div>
      </div>
      <el-table :data="userList" stripe style="width: 100%;border: solid 1px #e3e3e3;" :height="'calc(100vh - 200px)'"
         :header-cell-style="{ 'background-color': '#f5f7fa', 'color': '#909399' }" @sort-change="sortChange"
         @row-dblclick="handleClick">
         <el-table-column fixed prop="user_id" label="ID" sortable="custom" width="50">
         </el-table-column>
         <el-table-column prop="realname" label="姓名" width="100">
         </el-table-column>
         <el-table-column prop="account" label="账号" width="120">
         </el-table-column>
         <el-table-column prop="sex" label="性别" sortable="custom" width="90">
            <template slot-scope="scope">
               <span class="el-dropdown-link" v-if="scope.row.sex == 0" style="color:#F56C6C;">女</span>
               <span class="el-dropdown-link" v-if="scope.row.sex == 1" style="color: #67C23A;">男</span>
               <span class="el-dropdown-link" v-if="scope.row.sex == 2">未知</span>
            </template>
         </el-table-column>
         <el-table-column prop="icon_vip" label="是否显示头像皇冠" sortable="custom" >
            <template slot-scope="scope">
               <span class="el-dropdown-link"  style="color:#F56C6C;" v-if="scope.row.icon_vip == 0">否</span>
               <span class="el-dropdown-link" style="color: #67C23A;" v-if="scope.row.icon_vip == 1">是</span>
               
            </template>
         </el-table-column>
         <el-table-column prop="role" label="角色" sortable="custom" width="120">
            <template slot-scope="scope">
               <span class="el-dropdown-link" v-if="scope.row.role == 1">
                  超级管理员
               </span>
               <el-dropdown @command="handleCommand(scope.row, $event)" v-else>
                  <span class="el-dropdown-link cur-handle">
                     {{ scope.row.role == 0 ? '普通用户' : "管理员" }}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                     <el-dropdown-item :command="0">普通用户</el-dropdown-item>
                     <el-dropdown-item :command="2">管理员</el-dropdown-item>
                  </el-dropdown-menu>
               </el-dropdown>
            </template>
         </el-table-column>
         <el-table-column label="所属等级" width="120">
            <template slot-scope="scope">
               <span class="el-dropdown-link" style="color: #F56C6C;">{{ scope.row.islevel_name
                  !== '' ? scope.row.islevel_name : '普通会员' }}</span>

            </template>
         </el-table-column>
         <el-table-column label="所属组别" width="140">
            <template slot-scope="scope">
               <span class="el-dropdown-link" style="color: #F56C6C;" v-if="scope.row.agent_id == 1">代理商一组</span>
               <span class="el-dropdown-link" style="color: #F56C6C;" v-if="scope.row.agent_id == 2">代理商二组</span>
               <span class="el-dropdown-link" style="color: #F56C6C;" v-if="scope.row.agent_id == 3">代理商三组</span>
               <span class="el-dropdown-link" style="color: #F56C6C;" v-if="scope.row.agent_id == 4">代理商四组</span>
               <span class="el-dropdown-link" style="color: #F56C6C;" v-if="scope.row.agent_id == 5">代理商五组</span>

            </template>
         </el-table-column>

         <el-table-column label="详细信息" width="140">
            <template slot-scope="scope">


               <el-popover placement="top-start" width="400" trigger="hover">
                  <div>
                     <div style="font-size: 16px; font-weight: bold; list-style: 30px;color: #F56C6C;">剩余次数</div>
                     <div style="display: flex;">
                        <div style="width: 150px; line-height: 30px;">每日剩余浏览次数:</div>
                        <div style="line-height: 30px; color: #F56C6C;padding-right: 10px;">{{ scope.row.isview }}</div>
                        <div style="width: 150px; line-height: 30px;">每日剩余打招呼次数:</div>
                        <div style="line-height: 30px; color: #F56C6C;padding-right: 10px;">{{ scope.row.istalk }}</div>
                     </div>
                     <div style="display: flex;">
                        <div style="width: 150px; line-height: 30px;">每日剩余点赞喜欢次数:</div>
                        <div style="line-height: 30px; color: #F56C6C;padding-right: 10px;">{{ scope.row.iszan }}</div>
                        <div style="width: 150px; line-height: 30px;">每日剩余加群次数:</div>
                        <div style="line-height: 30px; color: #F56C6C; padding-right: 10px;">{{ scope.row.isgroup }}</div>
                     </div>
                     <div style="font-size: 16px; font-weight: bold; list-style: 30px;color: #F56C6C;">个人中心参数</div>
                     <div style="display: flex;">
                        <div style="width: 150px; line-height: 30px;">是否是附近的人:</div>
                        <div style="line-height: 30px; color: #F56C6C;padding-right: 10px;">
                           <span class="el-dropdown-link" style="color: #F56C6C;" v-if="scope.row.ifpublic == 0">否</span>
                           <span class="el-dropdown-link" style="color: #67C23A;" v-if="scope.row.ifpublic == 1">是</span>
                        </div>
                        <div style="width: 150px; line-height: 30px;">是否喜欢我的TA:</div>
                        <div style="line-height: 30px; color: #F56C6C;padding-right: 10px;">
                           <span class="el-dropdown-link" style="color: #F56C6C;" v-if="scope.row.ifta == 0">否</span>
                           <span class="el-dropdown-link" style="color: #67C23A;" v-if="scope.row.ifta == 1">是</span>
                        </div>
                     </div>
                     <div style="font-size: 16px; font-weight: bold; list-style: 30px;color: #F56C6C;">任务参数</div>
                     <div style="display: flex;">
                        <div style="width: 150px; line-height: 30px;">是否完成步骤1:</div>
                        <div style="line-height: 30px; color: #F56C6C;padding-right: 10px;">
                           <span class="el-dropdown-link" style="color: #F56C6C;" v-if="scope.row.flow1 == 0">否</span>
                           <span class="el-dropdown-link" style="color: #67C23A;" v-if="scope.row.flow1 == 1">是</span>
                        </div>
                        <div style="width: 150px; line-height: 30px;">是否完成步骤2:</div>
                        <div style="line-height: 30px; color: #F56C6C; padding-right: 10px;">
                           <span class="el-dropdown-link" style="color: #F56C6C;" v-if="scope.row.flow2 == 0">否</span>
                           <span class="el-dropdown-link" style="color: #67C23A;" v-if="scope.row.flow2 == 1">是</span>
                        </div>
                     </div>
                     <div style="display: flex;">
                        <div style="width: 150px; line-height: 30px;">是否完成步骤3:</div>
                        <div style="line-height: 30px; color: #F56C6C;padding-right: 10px;">
                           <span class="el-dropdown-link" style="color: #F56C6C;" v-if="scope.row.flow3 == 0">否</span>
                           <span class="el-dropdown-link" style="color: #67C23A;" v-if="scope.row.flow3 == 1">是</span>
                        </div>

                     </div>
                     <div style="font-size: 16px; font-weight: bold; list-style: 30px;color: #F56C6C;">个人标签</div>
                     <div style="display: flex;">
                        
                        <div style="width: 150px; line-height: 30px;">标签:</div>
                        <div style="line-height: 30px; color: #F56C6C;padding-right: 10px;">
                           <span class="el-dropdown-link" style="color: #F56C6C;" >{{ scope.row.tags }}</span>
                           
                        </div>


                     </div>
                     <div style="font-size: 16px; font-weight: bold; list-style: 30px;color: #F56C6C;">会员期限</div>
                     <div style="display: flex;">
                        <div style="width: 150px; line-height: 30px;">开通会员时间:</div>
                        <div style="line-height: 30px; color: #F56C6C;padding-right: 10px;">
                           <span slot="reference">{{ scope.row.begin_level_time
                              !== null ? change_time(scope.row.begin_level_time) : '' }}</span>
                        </div>

                     </div>
                     <div style="display: flex;">

                        <div style="width: 150px; line-height: 30px;">会员到期时间:</div>
                        <div style="line-height: 30px; color: #F56C6C;padding-right: 10px;">
                           <span slot="reference">{{ scope.row.end_level_time !== null ?
                              change_time(scope.row.end_level_time) : ''
                           }}</span>
                        </div>
                     </div>
                  </div>
                  <el-button slot="reference">查看</el-button>
               </el-popover>

            </template>
         </el-table-column>

         <el-table-column prop="create_time" label="注册时间" width="140">
            <template slot-scope="scope">
               <el-popover placement="top-start" title="位置信息" width="250" trigger="hover">
                  IP: {{ scope.row.register_ip }} <br>
                  位置：{{ scope.row.reg_location || '--' }}
                  <span slot="reference">{{ scope.row.create_time }}</span>
               </el-popover>
            </template>
         </el-table-column>

         <el-table-column prop="last_login_time" label="最后登录时间" width="140">
            <template slot-scope="scope">
               <el-popover placement="top-start" title="位置信息" width="250" trigger="hover">
                  IP: {{ scope.row.last_login_ip }} <br>
                  位置：{{ scope.row.location || '--' }}
                  <span slot="reference">{{ scope.row.last_login_time }}</span>
               </el-popover>
            </template>
         </el-table-column>

         <el-table-column prop="islikes" label="被Ta喜欢的人" min-width="120">
            <template slot-scope="scope">
               <span class="el-dropdown-link" style="color: #F56C6C;">{{ scope.row.islikes }}</span>

            </template>
         </el-table-column>
         <el-table-column prop="remark" label="备注" width="130">
         </el-table-column>
         <el-table-column prop="status" label="状态" width="70">
            <template slot-scope="scope">
               <el-switch @change="setStatus(scope.row)" v-if="scope.row.user_id != 1" v-model="scope.row.status"
                  :active-value="1" :inactive-value="0">
               </el-switch>
               <span v-else>--</span>
            </template>
         </el-table-column>
         <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
               <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
               <el-button @click="editUser(scope.row)" type="text" size="small" v-if="scope.row.user_id > 1">编辑</el-button>
               <el-button @click="editPass(scope.row)" type="text" size="small">改密</el-button>
               <el-button @click="delUser(scope.row)" type="text" size="small" v-if="scope.row.user_id>1"><span class="c-red">删除</span></el-button>
            
            </template>
         </el-table-column>
      </el-table>
      <div class="mt-15">
         <el-pagination background @size-change="handleChange" @current-change="change_other"
            :current-page.sync="params.page" :page-sizes="[20, 50, 100, 200, 300, 400, 500]" :page-size.sync="params.limit"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
         </el-pagination>
      </div>
      <el-dialog :title="formTitle" :visible.sync="dialogVisible" :modal="true" width="1000px" @close="close_pop()"
         append-to-body>
         <el-form :model="detail" :rules="rules" ref="userinfo" label-width="130px">
            <div style="display: flex;">
               <div style="width: 50%;">
                  <el-form-item label="账号" prop="account">
                     <el-input placeholder="请输入邮箱或者手机号" :readonly="ifedit" v-model="detail.account"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password" v-show="formType == 'add'">
                     <el-input v-model="detail.password" show-password placeholder="请输入密码"></el-input>
                  </el-form-item>
                  <el-form-item label="姓名" prop="realname">
                     <el-input placeholder="请输入用户名称" v-model="detail.realname"></el-input>
                  </el-form-item>
                  <el-form-item label="所属等级" prop="islevel">
                     <el-select v-model="detail.islevel" size="small" filterable style="width: 100%" placeholder="请选择等级">
                        <el-option :value="0" label="普通会员"></el-option>
                        <el-option :value="levelitem.id" :label="levelitem.name" v-for="(levelitem, indexl) in leveList"
                           :key="indexl"></el-option>

                     </el-select>
                  </el-form-item>
                  <el-form-item label="所属代理商分组">
                     <el-select v-model="detail.agent_id" size="small" filterable style="width: 100%"
                        placeholder="请选择代理商分组">

                        <el-option :value="agentitem.id" :label="agentitem.name" v-for="(agentitem, indexl) in agentList"
                           :key="indexl"></el-option>

                     </el-select>
                  </el-form-item>
                  <el-form-item label="e-mail" prop="email">
                     <el-input placeholder="请输入邮箱地址" v-model="detail.email"></el-input>
                  </el-form-item>
                  <el-form-item label="所属标签" prop="tags">
                     <el-input placeholder="请输入标签" v-model="detail.tags"></el-input>
                     <span>标签填写格式文字加英文逗号隔开如：好看,美女,阳光</span>
                  </el-form-item>
                  <el-form-item label="是否真实玩家">
                     <el-radio-group v-model="detail.istrue">
                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="0" border>否</el-radio>
                     </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否开通搜索">
                     <el-radio-group v-model="detail.ifsearch">

                        <el-radio :label="0" border>是</el-radio>
                        <el-radio :label="1" border>否</el-radio>
                     </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否开通语音通话">
                     <el-radio-group v-model="detail.ifvoice">

                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="0" border>否</el-radio>
                     </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否开通视频通话">
                     <el-radio-group v-model="detail.ifvideo">

                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="0" border>否</el-radio>
                     </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否显示皇冠">
                     <el-radio-group v-model="detail.icon_vip">

                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="0" border>否</el-radio>
                     </el-radio-group>
                  </el-form-item>
               </div>
               <div style="width: 50%;">
                  <el-form-item label="岁数">
                     <el-input placeholder="请输入岁数" v-model="detail.ages" type="number"></el-input>
                  </el-form-item>
                  <el-form-item label="性别" prop="sex">
                     <el-radio-group v-model="detail.sex">
                        <el-radio :label="2" border>未知</el-radio>
                        <el-radio :label="1" border>男</el-radio>
                        <el-radio :label="0" border>女</el-radio>
                     </el-radio-group>
                  </el-form-item>
                  <el-form-item label="角色" prop="role" v-if="user_info.role == 2 && user_info.ifagent == 0">
                     <el-radio-group v-model="detail.role">
                        <el-radio :label="0" border>普通用户</el-radio>
                        <el-radio :label="2" border>管理员</el-radio>
                     </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否代理商权限" v-if="user_info.role == 2 && user_info.ifagent == 0">
                     <el-radio-group v-model="detail.ifagent">
                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="0" border>否</el-radio>
                     </el-radio-group>
                  </el-form-item>
                  <el-form-item label="角色" prop="role" v-if="user_info.role == 1">
                     <el-radio-group v-model="detail.role">
                        <el-radio :label="0" border>普通用户</el-radio>
                        <el-radio :label="2" border>管理员</el-radio>
                     </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否代理商权限" v-if="user_info.role == 1">
                     <el-radio-group v-model="detail.ifagent">
                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="0" border>否</el-radio>
                     </el-radio-group>
                  </el-form-item>
                  <el-form-item label="状态" prop="status">
                     <el-radio-group v-model="detail.status">
                        <el-radio :label="1" border>正常</el-radio>
                        <el-radio :label="0" border>禁用</el-radio>
                     </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否附近的人" prop="ifpublic">
                     <el-radio-group v-model="detail.ifpublic">
                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="0" border>否</el-radio>
                     </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否喜欢我的TA" >
                     <el-radio-group v-model="detail.ifta">
                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="0" border>否</el-radio>
                     </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否完成步骤1">
                     <el-radio-group v-model="detail.flow1">
                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="0" border>否</el-radio>
                     </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否完成步骤2">
                     <el-radio-group v-model="detail.flow2">
                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="0" border>否</el-radio>
                     </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否完成步骤3">
                     <el-radio-group v-model="detail.flow3">
                        <el-radio :label="1" border>是</el-radio>
                        <el-radio :label="0" border>否</el-radio>
                     </el-radio-group>
                  </el-form-item>
               </div>
            </div>


            <el-form-item label="个性签名" prop="remark">
               <el-input type="textarea" :rows="2" v-model="detail.motto"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
               <el-input type="textarea" :rows="2" v-model="detail.remark"></el-input>
            </el-form-item>
            <el-form-item label="附近的人大图" prop="logo">
               <el-upload class="avatar-uploader" :headers="getToken" :action="getUrl" :show-file-list="false"
                  :on-success="uploadSuccess" :on-change="change" :before-upload="beforeAvatarUpload">
                  <img v-if="nearby_img" :src="nearby_img" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
               </el-upload>
               <el-input v-model="nearby_img" style="display: none;"></el-input>
            </el-form-item>
            <el-form-item label="详情大图" prop="logo">
               <el-upload class="avatar-uploader" :headers="getToken" :action="getUrl" list-type="picture"
                  :on-success="uploadSuccess2" :on-remove="del_file" :file-list="fileList" :on-change="change"
                  :before-upload="beforeAvatarUpload">
                  <!-- <img v-if="sysInfo_ico" :src="sysInfo_ico" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
                  <el-button size="small" type="primary">点击上传</el-button>
                  
               </el-upload>
               <el-button size="small" @click="del_bigimg()" type="primary">详情大图删除</el-button>
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
         ifedit: false,
         tab_index: 1,
         nearby_img: '',
         nearby_arr: [],
         total: 0,
         params: {
            page: 1,
            limit: 20,
            keywords: '',
            order_field: '',
            order_type: 1,
            agent_id: ''
         },
         userList: [],
         fileList: [],
         formTitle: "添加成员",
         formType: "add",
         dialogVisible: false,
         detail: {},
         originDetail: {
            realname: '',
            password: '123456',
            nearby_arr: null,
            nearby_img: null,
            email: '',
            sex: 0,
            ages: null,
            islevel_name: '',
            islikes: '',
            begin_level_time: '',
            end_level_time: '',

            role: 0,
            remark: '',
            status: 1,
            tags: null,
            ifpublic: 1,
            ifta: 0,
            islevel: 0,
            flow1: 0,
            flow2: 0,
            flow3: 0,
            istrue: 0,
            ifsearch: 1,
            agent_id: null,
            ifagent: 0,
            ifvoice: 0,
            ifvideo: 0,
            icon_vip: 1,
         },
         leveList: [],
         agentList: [{ id: 1, name: '代理商一组' }, { id: 2, name: '代理商二组' }, { id: 3, name: '代理商三组' }, { id: 4, name: '代理商四组' }, { id: 5, name: '代理商五组' }, { id: 6, name: '代理商六组' }, { id: 7, name: '代理商七组' }, { id: 8, name: '代理商八组' }, { id: 9, name: '代理商九组' }, { id: 10, name: '代理商十组' },],
         rules: {
            account: [
               { min: 4, max: 32, message: '长度在 4 到 32 个字符', trigger: 'blur' }
            ],
            realname: [
               { required: true, message: '请输入用户名称', trigger: 'blur' },
               { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
            ],
            email: [
               { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
            ],
            password: [
               { required: true, message: '请输入密码', trigger: 'blur' },
               { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
            ],
         },
         dialogPass: false,
         password: '',
         repass: '',
         currentUser: {},
         user_info: {},
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
      this.user_info = this.$store.state.userInfo;
      
      if (this.user_info.account !== 'administrator') {
         this.params.agent_id = this.user_info.agent_id
      }

      this.detail = this.originDetail;

      this.getLevelList()

      let regauth = this.globalConfig.sysInfo.regauth ?? 0;
      let msg = '请输入账号：4-32个字符';
      switch (parseInt(regauth)) {
         case 1:
            msg = '请输入正确的手机号';
            break;
         case 2:
            msg = '请输入正确的邮箱';
            break;
         case 3:
            msg = '请输入正确的手机号或者邮箱';
            break;
         default:
            msg = '请输入正确的账号';
            break;

      }
      let req = { required: true, message: msg, trigger: 'blur' };
      this.rules.account.push(req)
      let email = { type: 'email', message: msg, trigger: 'blur', validator: this.validateContact };
      let mobile = { type: 'phone', message: msg, trigger: 'blur', validator: this.validateContact };
      if (regauth == 1) {
         this.rules.account.push(mobile)
      } else if (regauth == 2) {
         this.rules.account.push(email)
      } else if (regauth == 3) {
         this.rules.account.push(email)
         this.rules.account.push(mobile)
      }
   },
   methods: {
      del_bigimg(){
         this.fileList=[]
         this.detail.nearby_arr=''
         this.nearby_arr=[]

      },
      change_time(val) {
         var time = new Date(val * 1000); //获取当前时间
         var y = time.getFullYear()
         var m = time.getMonth()
         var d = time.getDate()

         var h = time.getHours()
         var m = time.getMinutes()
         var s = time.getSeconds()

         return y + '-' + m + '-' + d + ' ' + h + ':' + m + ':' + s
      },
      uploadSuccess(res, file) {

         this.nearby_img = res.data;
         this.detail.nearby_img = res.data;
      },
      uploadSuccess2(res, file) {

         this.nearby_arr.push(res.data)

      },
      del_file(file, fileList) {
         this.nearby_arr.forEach((item, n_index) => {
            if (item.name == file.name) {
               this.nearby_arr.splice(n_index, 1)
            }
         })
      },
      change(file, fileList) {

      },
      beforeAvatarUpload(file) {

      },
      close_pop() {
         this.dialogVisible = false
         this.nearby_arr = []
         this.nearby_img = ''
         this.fileList = []

      },
      // 获取用户列表
      change_other(){
         if (this.tab_index == 1) {
            this.getUserList()
         } else {
            this.getUserList_real()
         }
      },
      getUserList() {
         this.$api.userApi.getUserList(this.params).then(res => {
            if (res.code == 0) {

               this.userList = res.data;
               this.total = res.count;
               this.params.page = res.page;
               for (var i = 0; i < this.userList.length; i++) {
                  for (var k = 0; k < this.leveList.length; k++) {
                     if (this.userList[i].islevel == this.leveList[k].id) {
                        this.userList[i].islevel_name = this.leveList[k].name
                     } else if (this.userList[i].islevel == 0) {
                        this.userList[i].islevel_name = '普通会员'
                     }
                  }
               }
            }
         })
      },
      getUserList_real() {

         this.$api.userApi.getUserList_real(this.params).then(res => {
            if (res.code == 0) {

               this.userList = res.data;
               this.total = res.count;
               this.params.page = res.page;
               for (var i = 0; i < this.userList.length; i++) {
                  for (var k = 0; k < this.leveList.length; k++) {
                     if (this.userList[i].islevel == this.leveList[k].id) {
                        this.userList[i].islevel_name = this.leveList[k].name
                     } else if (this.userList[i].islevel == 0) {
                        this.userList[i].islevel_name = '普通会员'
                     }
                  }
               }
            }
         })
      },
      check_type(index) {
         this.tab_index = index
         this.userList = []
         if (index == 1) {
            this.getUserList()
         } else {
            this.getUserList_real()
         }
      },
      // 获取等级列表
      getLevelList() {
         this.leveList = [];
         var params = {
            page: 1,
            limit: 100,
            keywords: '',
            order_field: '',
            order_type: 1,
         };
         this.$api.levelApi.getUserList(params).then(res => {
            if (res.code == 0) {
               this.leveList = res.data;
               this.getUserList();
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
         if (this.tab_index == 1) {
            this.getUserList();
         } else {
            this.getUserList_real();
         }
      },
      // 添加成员
      addUser() {

         this.formTitle = "添加成员";
         this.formType = "add";
         this.dialogVisible = true;
         this.nearby_img = '';
         this.fileList = [];
         this.ifedit = false
      },
      // 修改成员
      editUser(item) {
         this.ifedit = true
         this.nearby_img = ''
         this.fileList = []

         let detail = item;
         this.formTitle = "修改成员";
         this.formType = "edit";
         this.dialogVisible = true;
         detail.password = 'rainagd';

         this.detail = detail;

         this.nearby_img = item.nearby_img;

         var imgs = { name: '', url: '' }

         if (item.nearby_arr !== null && item.nearby_arr !== '') {
            const get_nearby_arr = item.nearby_arr.split(',')
            this.nearby_arr = get_nearby_arr
            get_nearby_arr.forEach((item, n_index) => {
               imgs.name = '图片' + n_index
               imgs.url = item
               this.fileList.push(imgs)
               imgs = { name: '', url: '' }
            })
         }

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
                  console.log('add-555', this.detail)
                  this.detail.nearby_arr = this.nearby_arr.toString()
                  this.$api.userApi.addUser(this.detail).then(res => {
                     if (res.code == 0) {
                        this.dialogVisible = false;
                        this.fileList = []
                        this.nearby_img = ''
                        this.nearby_arr = []

                        this.getUserList();
                        this.$message({
                           message: res.msg,
                           type: 'success'
                        });
                     }
                  })
               } else {
                  this.detail.nearby_arr = this.nearby_arr.toString()
                  let detail = JSON.parse(JSON.stringify(this.detail));

                  delete detail.password;

                  this.$api.userApi.editUser(detail).then(res => {
                     if (res.code == 0) {
                        this.fileList = []
                        this.nearby_img = ''
                        this.nearby_arr = []
                        this.dialogVisible = false;
                        if (this.tab_index == 1) {
                           this.getUserList();
                        } else {
                           this.getUserList_real();
                        }

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
         this.$api.userApi.editPassword(params).then(res => {
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
            status: item.status,
            ifpublic: item.status
         }
         this.$api.userApi.setStatus(params).then(res => {
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
         this.$api.userApi.setRole(params).then(res => {
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
         this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
         }).then(() => {
            let params = {
               user_id: item.user_id
            }
            this.$api.userApi.delUser(params).then(res => {
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
.tab_line {
   display: flex;
   margin-bottom: 15px;
}

.tab_li {
   width: 120px;
   text-align: center;
   line-height: 30px;
}

.tab_haver {
   color: #fff;
   background: #409EFF;
}

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