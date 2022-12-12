<template>
  <div class="form-group">
    <label>File
      <input ref="file" type="file" class="form-control-file" @change="handleFileUpload()">
    </label>
    <label>Title
      <input v-model="title" type="text" class="form-control">
    </label>
    <label>Description
      <input v-model="content" type="text" class="form-control">
    </label>
    <button class="btn btn-default" @click="submitFile()">
      Add
    </button>
  </div>
</template>

<script>
export default {
  middleware: ['auth'],
  data () {
    return {
      file: '',
      title: '',
      content: ''
    }
  },
  methods: {
    submitFile () {
      this.$store.dispatch('post/addPosts', { file: this.file, title: this.title, content: this.content })
    },
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
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
