<template>
    <el-form ref="loginForm" :model="form"  :rules="rules"  class="card-box loginform">
      <h3 class="title">系统登录</h3>
	    <el-form-item prop="account">
         <el-input type="text"  v-model="form.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
	    <el-form-item prop="checkPass">
	      <el-input type="password" v-model="form.checkPass"  auto-complete="off" placeholder="密码"></el-input>
	    </el-form-item>
	    <el-checkbox  v-model="checked" checked style="margin:0px 0px 35px 0px;">记住密码</el-checkbox>
		<el-form-item style="width:100%;">
		<el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
		    <!-- <el-button>重置</el-button> -->
		</el-form-item>
	</el-form>
</template>

<script>
import { requestLogin } from '../api/api';
import NProgress from 'nprogress';
export default {
    data() {
      return {
      	logining: false,
        form: {
            account: '',
         	checkPass: ''
        },
        rules: {
        	account: [
	            { required: true, message: '请输入账号', trigger: 'blur' }
	          ],
	        checkPass: [
	            { required: true, message: '请输入密码', trigger: 'blur' }
	          ]
        },
        checked: true
      }
    },
    methods: {
      handleSubmit(event) {
        this.$refs.loginForm.validate((valid) => {
            if (valid) {
            	this.logining = true;
            	NProgress.start();
            	let loginParams = { 
            		username: this.form.account, 
            		password: this.form.checkPass 
            	};
            	requestLogin(loginParams).then(data => {
                    this.logining = false;
                    NProgress.done();
                    let { msg, code, user } = data;
                    console.log('res', data);
                    if (code !== 200) {
		                this.$notify({
		                    title: '错误',
		                    message: msg,
		                    type: 'error'
		                });
		            } else {
		                localStorage.setItem('user', JSON.stringify(user));
		                if (this.$route.query.redirect) {
		                  this.$router.push({ path: this.$route.query.redirect });
		                } else {
		                  this.$router.push({ path: '/table' });
		                }
		            }
            	});
            } else {
            	console.log('login error');
            	return false;
            }
        });
      }
    }
  }
</script>

<style scoped>
  .card-box {
    padding: 20px;
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin-bottom: 20px;
    background-color: #F9FAFC;
    margin: 180px auto;
    width: 400px;
    border: 2px solid #8492A6;
  }
  
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .loginform {
    width: 350px;
    padding: 35px 35px 15px 35px;
  }
</style>