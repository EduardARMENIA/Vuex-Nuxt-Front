<template>

  <div id="app">
  <div class="main">
    <div v-for="(todo, key) in todos" :key="key">
        <img :src="`${ todo.img}`" height = '400' width = '400'>
        <h6>{{todo.name}}</h6>
        <button @click.prevent="openUser(todo._id)">See Profile</button>
    </div>
    </div>
  </div>

</template>


<script>
  import {useRouter} from "vue-router";
  import {useStore} from "vuex";
  import Users from "@/components/AllUsers/Users";
  export default {
    components: {Users},
    data() {
     const data = ({
       content: ''
    });
     return {
        todos:  []
     };
    },
   methods: {
        
 async created() {
    try {
        const cookieValue = document.cookie.split('; ').find((row) => row.startsWith('jwt=')).split('=')[1];                    
        const response = await fetch('http://localhost:8000/api/users-name', {
          headers: {'Content-Type': 'application/json', 'Authorization': `${cookieValue}`},
          credentials: 'include'
        });
        const content = await response.json();
        let x = JSON.stringify(content)
        let mydata = JSON.parse(x);  
        this.todos = mydata
  
        for(var i = 0;i < this.todos.length; i++){
                     const url = `http://localhost:8000/api/${mydata[i].img[0]}/profile_image`
    
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
  openUser(user){
     this.$router.push('/User/'+ user)
  }
    },
    mounted() {
      this.created();
    
    },
  };
</script>