 <template>
    <div class="card">
    <h4>User Information</h4>
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
  }
 } 
</script>
<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  width: 40%;
  margin-left:5%;
}

/* Add rounded corners to the top left and the top right corner of the image */
img {
  border-radius: 5px 5px 0 0;
}
@media (max-width:700px){
  .card{
  width:100%;
  margin-left:0%;
  }
}
</style>
