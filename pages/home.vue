<template>
  <div id="app">
  <div class="main">
    <div>
      <post @success="submitForm"  v-for="todo in todos" :key="todo.id" :author="todo.author" :description ="todo.content"  :title="todo.title"  :comments="todo.comments" :img="todo.img" :id="todo._id"/> 
    </div>
    </div>
  </div>
</template>
    
    
    <script>
      import Post from "@/components/Post";
      import {useRouter} from "vue-router";
      import {useStore} from "vuex";
      export default {
        components: {Post},
        data() {
          return {
            todos:  [],
          };
        },
       methods: {
            
     async created() {
        try {             
            let response  = await this.$axios.$get('/api/post')
            this.todos = response
            for(var i = 0;i < this.todos.length; i++){
                     const url = `http://localhost:8000/api/${this.todos[i].img[0]}/post_image`  
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
        async submitForm(id, content){
                let post =  await this.$axios.$post(`/api/${id}/comment`, {content:content});
                window.location.reload()
            },
        },
    
        mounted() {
          this.created();
        
        },
      };
    </script>
  