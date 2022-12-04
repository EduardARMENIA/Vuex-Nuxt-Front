<template>
  <div class="form-group">
      <label>File
        <input type="file" class="form-control-file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
       <label>Title
        <input type="text"  class="form-control" v-model="title"/>
      </label>
       <label>Description
        <input type="text"  class="form-control" v-model="content"/>
      </label>
      <button v-on:click="submitFile()" class="btn btn-default">Add</button>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        file: '',
        title: '',
        content: ''
      }
    },
    methods: {
      submitFile(){
            let formData = new FormData();
            formData.append('image', this.file);
            formData.append('title', this.title);
            formData.append('content', this.content);
            const cookieValue = document.cookie.split('; ').find((row) => row.startsWith('jwt=')).split('=')[1]; 
            this.$axios.$post( '/api/post_image',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${cookieValue}`
                }
              },
             window.location.reload()).then(function(){
          console.log('SUCCESS!!');
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
      },
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }
    }
  }
</script>



<style scoped>
    .form-group{
        width: 100% !important;
        display: flex;
        align-items:center;
        flex-direction:column;
        margin-top:50px;
    }
    .form-group input{
      width:300px !important;
      height:35px;
      outline:none !important;
      padding-left:10px;
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }
    </style>