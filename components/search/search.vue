<template>
  <div class="relative">
    <input
      v-model="searchInput"
      @input="onInputChange"
      @blur="onInputBlur"
      placeholder="Search..."
      class="w-full bg-white text-gray-700 rounded border-2 border-transparent outline-none focus:border-purple-500 px-4 py-1"
    />
    <!-- Suggestions list -->
    <div class="relative">
      <div
        class="absolute z-30 bg-white top-0 inset-x-0 rounded shadow-lg mt-1"
      >
        
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  props: {
    search: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    searchInput: '',
    suggestions: [],
  }),
  methods: {
    onInputChange: debounce(async function () {
      this.$store.dispatch('post/post/searchPosts', {search: this.searchInput})
    }, 300),
    onInputBlur() {
      setTimeout(() => (this.suggestions = []), 300)
    },
  },
}
</script>