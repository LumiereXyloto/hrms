<template>
  <div>
    <router-view />
    <div class="top">项目管理</div>
    <div class="content">
      <p>信管工作室</p>
      <el-dropdown split-button type="primary" class="moreMenu" @click="dialogFormVisible = true">
        添加项目
        <el-dialog title="添加项目" :visible.sync="dialogFormVisible" :append-to-body='true' top='100px' width="550px" center>
          <el-form :model="form">
            <el-form-item label="公司ID" :label-width="formLabelWidth" v-model="addCompanyId">
              <el-input class="increaseInput" placeholder="输入公司ID"></el-input>
            </el-form-item>
            <el-form-item label="项目ID" :label-width="formLabelWidth" v-model="addProjectId">
              <el-input class="increaseInput" placeholder="为该项目编号"></el-input>
            </el-form-item>
            <el-form-item label="项目名称" :label-width="formLabelWidth" v-model="addProjectName">
              <el-input class="increaseInput" placeholder="正确填写项目名"></el-input>
            </el-form-item>
            <el-form-item label="项目地址" :label-width="formLabelWidth" v-model="addProjectUrl">
              <el-input class="increaseInput" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="上线时间" :label-width="formLabelWidth" v-model="addOnlineTime">
              <el-input class="increaseInput"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addDataSave">保存</el-button>
          </div>
        </el-dialog>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <el-button type="text" @click="dialogVisible = true">Excel导入</el-button>
          </el-dropdown-item>
          <el-dialog
            title="导入信息"
            :visible.sync="dialogVisible"
            top='50px'
            left='50px'
            width="500px"
            :append-to-body='true'
            :before-close="handleClose">
            <span>
              <span>
                <h3>①准备信息</h3>
                <p class="upload">使用数据模板文件,录入数据。为了保证成功，请根据表格中批注的数据格式并按照字段顺序进行录入。一次最多导入100条数据。</p>
                <p class="upload uploadMould">
                  <i class="el-icon-download"></i>
                  点击下载模板
                </p>
              </span>
              <span>
                <h3>②上传数据文件</h3>
                <p class="upload">目前支持的文件类型为 *.xls, *.xlsx</p>
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button class="upFiles" type="primary" size="small" plain>
                    <i class="el-icon-plus"></i>
                    添加文件
                  </el-button>
                </el-upload>
              </span>
            </span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>

          <el-dropdown-item>
            <el-button type="text" @click="dialogVisible = true">Excel导出</el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        class="filterDown"
        @click="show3 = !show3"
      >过滤</el-button>
      <span id='state'>
        (共有 {{tableData.length}} 个项目)
      </span>
      <div style="margin-top: 10px;">
        <el-collapse-transition>
          <div v-show="show3">
            <!-- <div class="transition-box">el-collapse-transition</div> -->
            <div class="transition-box">
              <span>项目编号：<el-input class="filter"></el-input></span>
              <span>项目名称：<el-input class="filter"></el-input></span>
              <span>项目网址：<el-input class="filter"></el-input></span><br>
              <span>上线时间：<el-input class="filter"></el-input></span>
              <el-button class="primary" type="primary" style="margin-left:160px;">过滤</el-button>
            </div>
          </div>
        </el-collapse-transition>
      </div>
      <hr>
      <el-table
        class="memberData"
        ref="multipleTable"
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="80">
        </el-table-column>
        <el-table-column
          prop="companyId"
          label="公司编号"
          width="250"
          show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="projectId"
          label="项目编号"
          width="250"
          show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="项目名称"
          width="250"
          show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="projectUrl"
          label="项目网址"
          width="250"
          show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="onlineTime"
          label="上线时间"
          width="250">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="editFormVisible = true">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="7" id="deleteSelection">
        <el-button :plain="true" type="danger" size="small" icon="delete" @click="removeSelection">删除所选</el-button>
      </el-col>
      <el-pagination
        class="pagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,7,10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
      
      <el-dialog title="编辑项目" :visible.sync="editFormVisible" :append-to-body='true' top='100px' width="550px" center>
        <el-form :model="editForm">
          <el-form-item label="公司编号" :label-width="formLabelWidth">
            <el-input class="increaseInput" placeholder="为该图书更改公司编号" v-model="companyId"></el-input>
          </el-form-item>
          <el-form-item label="项目编号" :label-width="formLabelWidth" >
            <el-input class="increaseInput" placeholder="为该图书更改编号" v-model="projectId"></el-input>
          </el-form-item>
          <el-form-item label="项目名称" :label-width="formLabelWidth">
            <el-input class="increaseInput" placeholder="为该项目更改名称" v-model="projectName"></el-input>
          </el-form-item>
          <el-form-item label="项目地址" :label-width="formLabelWidth">
            <el-input class="increaseInput" placeholder="为该项目更改地址" v-model="projectUrl"></el-input>
          </el-form-item>
          <el-form-item label="上线时间" :label-width="formLabelWidth">
            <el-input class="increaseInput" placeholder="为该项目更改上线时间" v-model="onlineTime"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editDataSave">保存</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  .top {
    font-size: 19px;
    line-height: 60px;
    padding-left: 20px;
    background-color:#fafafa;
  }
  .content p{
    font-size: 15px;
    line-height: 70px;
    padding-left: 30px;
  }
  .upFiles {
    margin: 10px 10px;
  }
  .upload{
    margin: 10px 10px;
  }
  .uploadMould{
    color: #409eff;
    cursor: pointer;
  }
  /* .content:nth-child(4){
    height:0px!important;
  } */
  .moreMenu{
    padding-left: 30px;
    display: inline-block;
  }
  .transition-box {
    height: 210px;
    padding-top: 30px;
    border-top: 1px solid #dcdfe4;
    border-bottom: 1px solid #dcdfe4;
    background-color: #f1f2f4;
    box-sizing: border-box;
  }
  .transition-box>span{
    margin-left:80px;
    margin-top:8px;
  }
  .filter{
    width:190px;
    padding-top: 8px;
  }
  .increaseInput{
    width:260px;
  }
  .primary{
    margin-left: 130px;
    margin-top: 8px;
  }
  .increaseMember{
    background-color: #409EFF;
    border:0;
  }
  /* .moreMenu div :first-child{
    width: 60px;
    height: 30px;
  } */
  #deleteSelection{
    margin-left: 5px;
    margin-top: 16px;
  }
  .pagination{
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .editor{
    border: 1px solid #c7ccd3;
    cursor: pointer;
    color: #c7ccd3;
    margin-top: 15px;
    width: 15px;
    height: 15px;
    border-radius: 2px;
    border: 1px solid #c7ccd3;
  }
  .el-input__icon:after{
    display: none;
  }
  .el-icon-arrow-up:before{
    display: none;
  }
  .editor div input{
    width: 0px;
    height: 0px;
    border: 0px;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-dialog__body {
    padding: 20px 20px;
  }
  #state{
    position: relative;
    float: right;
    margin-right: 250px;
  }
  .el-checkbox+.el-checkbox {
    margin-left: 5px;
  }
</style>
<script>
export default {
  data () {
    return {
      activeNames: ['1'],
      input10: '',
      show3: false,
      currentPage: 1,
      pagesize:10,
      tableData: [],
      value: '',
      dialogFormVisible: false,
      dialogVisible: false,
      editFormVisible: false,
      form: {
        email: '',
        studentId: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '140px',
      radio: '1',
      checked: true,
      addCompanyId: '',
      addProjectId: '',
      addProjectName: '',
      addProjectUrl: '',
      addOnlineTime: '',
      companyId: '',
      projectId: '',
      projectName: '',
      projectUrl: '',
      onlineTime: ''
    }
  },
  created: function () {
    var data = [];
    let _this = this;
    this.$http.get('https://www.easy-mock.com/mock/5b84f6da66335a5ae27707d1/hrms/book-list-1', {
      params: {

      }
    }).then(function (res) {
      for (let i = 0; i < res.data.object.length; i++) {
        var obj = {};
        obj.companyId = res.data.object[i].companyId;
        obj.projectId = res.data.object[i].projectId;
        obj.projectName = res.data.object[i].projectName;
        obj.projectUrl = res.data.object[i].projectUrl;
        obj.onlineTime = res.data.object[i].onlineTime;
        data[i] = obj;
      }
      _this.tableData = data;
      console.log(data);
    }).catch(function (error) {
       
    })
  },
  methods: {
    addDataSave: function() {
      this.dialogFormVisible = false;
      var data = [];
      let _this = this;
      var addData = new Object;
      addData.companyId = this.addCompanyId;
      addData.projectId = this.addProjectId;
      addData.projectName = this.addProjectName;
      addData.projectUrl = this.addProjectUrl;
      addData.onlineTime = this.addOnlineTime;
      this.$http.post("https://www.easy-mock.com/mock/5b84f6da66335a5ae27707d1/hrms/book",addData)
      .then(function (res) {
        console.log(res.data.msg);
        
      }).catch(function (error) {
       
      })
    },
    editDataSave() {
      this.editFormVisible = false;
      var data = [];
      let _this = this;
      var editData = new Object;
      editData.companyId = this.companyId;
      editData.projectId = this.projectId;
      editData.projectName = this.projectName;
      editData.projectUrl = this.projectUrl;
      editData.onlineTime = this.onlineTime;
      this.$http.put("https://www.easy-mock.com/mock/5b84f6da66335a5ae27707d1/hrms/book",editData)
      .then(function (res) {
        for (let i = 0; i < res.data.object.length; i++) {
          var obj = {};
          obj.companyId = res.data.object[i].companyId;
          obj.projectId = res.data.object[i].projectId;
          obj.projectName = res.data.object[i].projectName;
          obj.projectUrl = res.data.object[i].projectUrl;
          obj.onlineTime = res.data.object[i].onlineTime;
          data[i] = obj;
        }
        _this.tableData = data;
        console.log(data);
      }).catch(function (error) {
          
      })
    },
    deleteRow(index, rows) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        var deleteData = new Object();
        deleteData.bookId = this.tableData[index].bookId;
        console.log(this.tableData[index].bookId);
        this.$http.delete('https://www.easy-mock.com/mock/5b84f6da66335a5ae27707d1/hrms/book',{params:deleteData});
      }).then(() => {
        rows.splice(index, 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      })
    },
    handleSizeChange: function (size) {
        this.pagesize = size;
    },
    handleCurrentChange: function(currentPage){
        this.currentPage = currentPage;
    },
    handleChange (val) {
      console.log(val)
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleEdit(index, row) {
        console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
}
</script>
