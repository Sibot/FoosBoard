<template>
  <div class="blog">
    <h1>Welcome to the blog</h1>
    <div class="columns">
      <div v-for="post in posts" :key="post.id" class="column is-one-third">
        <app-post :link="post.URL">
          <h2 slot="title" v-html="post.title"></h2>
          <span slot="content" v-html="post.excerpt"></span>
        </app-post>
      </div>
    </div>
    </div>
</template>

<script>
import Post from './Post.vue'
import appService from '../app.service'
export default {
  components: {
    'app-post': Post
  },
  created () {
    this.loadPosts()
  },
  data () {
    return {
      posts: [
        { id: 1, title: 'Javascript rlz', excerpt: 'alsfj asdkfj sdkfjlasfj lasfj aksjdf ', url: 'https://www.crocford.com' },
        { id: 2, title: 'C# tips and tricks', excerpt: 'alsfj asdkfj sdkfjlasfj lasfj aksjdf lakjf dlakjsdflk ajsldfkj sdlfj lsdfj aldsj fskdjflasfj aksjdf lakjf dlakjsdflk', url: 'https://www.msdn.com' },
        { id: 3, title: 'Vue components', excerpt: 'alsfj asdkfj sdkfjlasfj  ajsldfkj sdlfj lsdfj aldsj fskdjf', url: 'https://www.vue.org' },
        { id: 4, title: 'Javascript services', excerpt: 'alsfj asdkfj sdkfjlasfj lasfj aksjdf lakjf dlakjsdflk ajsldfkj sdlfj lsdfj aldsj fskdjf', url: 'https://www.crocford.com' },
        { id: 5, title: 'Run Javascript from C#', excerpt: 'alsfj asdkfj sdkfjlasfj lasfj aksjdf lakjf dlakjsdflk ajsldfkj sdlfj lsdfj aldsj fskdjf', url: 'https://www.crocford.com' },
        { id: 6, title: 'Beer to be had', excerpt: 'alsfj asdkfj sdkfjlasfj lasfj aksjdf lakjf dlakjsdflk ajsldfkj sdlfj lsdfj aldsj fskdjf', url: 'https://www.crocford.com' }
      ]
    }
  },
  methods: {
    loadPosts () {
      appService.getPosts().then((posts) => {
        this.posts = posts
      })
    }
  }
}
</script>
