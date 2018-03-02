<template>
  <md-card>
    <md-card-header>
      <h2 class="md-title">Welcome to the blog</h2>
    </md-card-header>
    <md-card-content>
      <md-card v-for="post in posts" :key="post.id">
        <app-post :link="post.URL">
          <md-card-header slot="title" v-html="post.title"></md-card-header>
          <md-card-content slot="content" v-html="post.excerpt"></md-card-content>
        </app-post>
      </md-card>
    </md-card-content>
  </md-card>
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
