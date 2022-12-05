 <template>
    <div class="card">
    <h4>User Settings</h4>
  <img  :src="`${img}`"style="width:100%">
  <div class="container">
    <h4><b>{{ name }}</b></h4>
    <p>{{ email }}</p>
  </div>
</div>
</template>        



<script>
export default {
  props: {
      img: { required: false },
      id: { required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
  },
  data() {
          return {
            content: '',
            item:{
             image : null,
             imageUrl: null
            },
          };
  },        
   methods:{
             onChange(e) {
                const file = e.target.files[0]
                this.item.imageUrl = URL.createObjectURL(file)
                let images = new FormData();
                images.append('image', file); 
                const cookieValue = document.cookie.split('; ').find((row) => row.startsWith('jwt=')).split('=')[1];       
                this.$axios.$post(`http://localhost:8000/api/profile_image`, images,  {
                     headers: {Authorization:  `${cookieValue}`}
                })
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
  
  }
 } 
</script>
<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  width: 40%
}

/* Add rounded corners to the top left and the top right corner of the image */
img {
  border-radius: 5px 5px 0 0;
}
</style>
