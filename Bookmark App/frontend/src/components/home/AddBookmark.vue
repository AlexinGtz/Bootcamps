<template>
    <div class="add-bookmark container">
        <form @submit.prevent="addBookmark" class="card-panel">
            <h2 class="center-align orange-text">Add New Bookmark</h2>
            <div class="field">
                <label for="description">Name</label>
                <input type="text" name="name" v-model="name">
            </div>
            <div class="field">
                <label for="description">Description</label>
                <input type="text" name="description" v-model="description">
            </div>
            <div class="url">
                <label for="url">Bookmark URL</label>
                <input type="text" name="url" v-model="url">
            </div>
                <p><label>Share Bookmark</label></p>
            <div class="switch">
                <label>
                Off
                <input type="checkbox" name="shared" v-model="shared">
                <span class="lever"></span>
                On
                </label>
            </div>
            <p class="red-text center" v-if="feedback">{{ feedback }}</p>
            <div class="field center">
                <button class="btn deep-orange">Add Bookmark</button>
            </div>
        </form>
    </div>
</template>


<script>
import { API } from '@aws-amplify/api'
import slugify from 'slugify'
import { Auth } from '@aws-amplify/auth';

export default {
    name: 'AddBookmark',
    data() {
        return {
            apiName: 'Bookmark App',
            path: '/bookmarks',
            id: null,
            description: null,
            name: null,
            url: null,
            feedback: null,
            shared: false,
            slug: null,
            count: null,
            username: null
        }
    },
    methods: {
        async addBookmark(){
            let results = await Auth.currentUserInfo()
            console.log(`Done: ${JSON.stringify(results.username)}`)
            this.username = results.username
            console.log(this.username)
            if (this.shared){
                console.log("yes shared")
            }
            else {
                console.log("Not Shared")
            }
            if(this.description && this.url && this.name) {
                this.feedback = null,
                this.slug = slugify(this.description, {
                replacement: '-',
                remove: /[$*_+~.()'"!\-:@]/g,
                lower: true
                }),
                await API.post(this.apiName, this.path, {body:{
                    id: this.slug+"-"+this.count,
                    name: this.name,
                    description: this.description,
                    url: this.url,
                    shared: this.shared,
                    username: this.username
                }}).then(() => {
                    this.$router.push({ name: 'Bookmark'})
                }).catch(err =>{
                    console.log(err)
                })
                }
                
                 else {
                this.feedback = "You must enter all fields"
            }
        }
    },
    async created(){
        API.get(this.apiName, this.path, {
          queryStringParameters: {}
        })
        .then(response => {
          this.count = response.length + 1
          console.log(this.count)
        }).catch(err => {
        console.log(err)
      })
      }
}
</script>



<style>
.add-bookmark{
    max-width: 400px;
    margin-top: 60px;
}
.add-bookmark h2{
    font-size: 2.4em;
}
.add-bookmark .field{
    margin-bottom: 16px;
    margin-top: 40px;
}
</style>