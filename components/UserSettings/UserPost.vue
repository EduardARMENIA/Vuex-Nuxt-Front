

 <template>

    <div class="card">
    <h4>Your publications </h4>
  <img  :src="`${img}`"style="width:100%">
  <div class="container">
    <h4>author: {{ author }}</b></h4>
    <p>title: {{ title }}</p>
    <p>description: {{ description }}</p>
     <div v-for="(comments, x) in comments" :key="x">
    <p>coments:{{ comments.content }}</p>
  </div>
    <input  id="text" placeholder="Add Comment ..."  v-model="content"  name="content" />
    <button @click="$emit('success', id, content)"><h6>Add Comment</h6></i></button>
</div>
  </div>
</div>
</template>    


<script>
export default {
  props: {
      img: { required: true },
      id: { required: true },
      author: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      ['comments']: { type: Array, required: true },
  },
   data() {
          return {
            content: '',
          };
  },    
  method: {
     submitForm(id){
            alert(id)
            alert(this.content)
            this.$axios.$post(`http://localhost:8000/api/${id}/comment`, {content:this.content})
            window.location.reload()
      },
  }        
 } 
</script>