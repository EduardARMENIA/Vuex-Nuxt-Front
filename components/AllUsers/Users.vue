<div class="main">
    
        <img :src="`${img}`" height = '400' width = '400'>
        <p class='ed'>username: {{ name }}</p><br>
        <p class='ed'>email: {{ email }}</p><br>         

    </div>      



<script>
export default {
  props: {
      img: { required: false },
      id: { required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
  },
}  

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
