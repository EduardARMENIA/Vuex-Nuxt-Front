





<template>    
 <div>
  <div>
      <Profile  v-for="todo in todos" :key="todo.id" :name="todo.name" :img="todo.img" :id="todo.id" :email="todo.email"/> 
  </div>
  <div>
      <UserPost @success="submitForm"  v-for="post in posts" :key="post.id" :author="post.author" :description ="post.content"  :title="post.title"  :comments="post.comments" :img="post.img" :id="post._id"/> 
  </div>
 </div> 
</template>
<script>
  import UserPost from "@/components/ProfileById/UserPost";
  import Profile from "@/components/ProfileById/Profile";
  import axios from "axios"; 
  import {useRouter} from "vue-router";
  import {useStore} from "vuex";
  export default {
    components: {UserPost, Profile},
    data() {
     return {
        todos:  [],
        posts: [],
        item:{
          image : null,
          imageUrl: null
      },
      content: '',
       img: ''
     };
    },
   methods: {
        
 async created() {
    try {        
        const cookieValue = document.cookie.split('; ').find((row) => row.startsWith('jwt=')).split('=')[1]; 
         let id = this.$route.params.id
        let response  = await this.$axios.$get(`/api/${id}/user`)
        this.todos = response
        let responses  = await this.$axios.$get(`http://localhost:8000/api/${this.todos[0].name}/porfile_post`)
        this.posts = responses
    

  
        for(var i = 0;i < this.posts.length; i++){
                     var Name = document.createElement("div");
                     var Description = document.createElement("div");
                     var Author = document.createElement("div");
                     const url = `http://localhost:8000/api/${responses[i].img[0]}/post_image`
    
                     const options = {
                        method: "GET"
                     }
    
                     let response = await fetch(url, options)
                     const imageBlob = await response.blob()
                     const imageObjectURL = URL.createObjectURL(imageBlob);

                     this.posts[i].img = (imageObjectURL)
                     
        }
        for(var i = 0;i < this.todos.length; i++){

                     
                     
                     const url = `http://localhost:8000/api/${ this.todos[i].img[0]}/profile_image`
    
                     const options = {
                        method: "GET"
                     }
    
                     let response = await fetch(url, options)
                     const imageBlob = await response.blob()
                     const imageObjectURL = URL.createObjectURL(imageBlob);
                     this.todos[i].img = (imageObjectURL)                 
        }


    } catch (e) {
      console.error(e);
    }
  },
      submitForm(id){
            alert(id)
            alert(this.content)
            this.$axios.$post(`http://localhost:8000/api/${id}/comment`, {content:this.content})
                 window.location.reload()
      },
      
      password(){
           const cookieValue = document.cookie.split('; ').find((row) => row.startsWith('jwt=')).split('=')[1];  
            const headers = {
              'Content-Type': 'application/json',
              'Authorization':  `${cookieValue}`
           }     
            this.$axios.$post('http://localhost:8000/api/change-password', {content:this.content},{
               headers: headers
           })
          
      },

     
    },

    mounted() {
      this.created();
    
    },
  };
</script>