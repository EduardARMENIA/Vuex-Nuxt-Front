

 <template>
    <div class="card">
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
      id:  { required: true },
      author: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      ['comments']: { type: Array, required: true },
  },
  data() {
          return {
            content: '',
          };
  }        
 } 
</script>
<style scoped>
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
