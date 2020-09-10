<template>
<v-card max-width="300" class="my-5">
    <v-list-item>
        <v-list-item-avatar color="grey">
            <img :src="book.thumbnail" alt="">
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title class="headline">{{book.title}}</v-list-item-title>
            <v-list-item-subtitle>by {{book.author}}</v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>

    <v-img :src="book.cover" width="300" height="400"></v-img>

    <v-card-text>
        {{book.content_short}}
    </v-card-text>

    <v-card-actions>
        <v-btn text color="deep-purple accent-4">
            Read
        </v-btn>
        <v-btn @click="dialog=true" text color="deep-purple accent-4">
            Bookmark
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon v-if="user.favorites.find(res => res.ID === book.ID)" @click="removeFavority(book)" color="error" :disabled="espera">mdi-heart</v-icon>
            <v-icon @click="addFavority(book)" v-else color="secondary">mdi-heart</v-icon>
        </v-btn>
    </v-card-actions>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
            <v-toolbar dark color="secondary">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>{{book.title}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text :href="book.url_dowload">
                        <v-icon>mdi-arrow-down-bold-outline</v-icon>Dowload
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-list three-line subheader>
                <v-list-item class="row px-0 mx-0 mt-6 justify-center">
                    <v-flex class="d-flex justify-center" sm12 md5>
                        <img :src="book.cover" width="300" height="400">
                    </v-flex>
                    <v-flex sm12 md6 text-xs-center class="mt-5 mt-sm-0 px-3">
                        <p class="font-weight-bold mt-5">Author: {{book.author}}</p>
                        <p class="font-weight-bold">Resumen:</p>
                        <p>{{book.content}}</p>
                        <p class="font-weight-bold">Pages:</p>
                        <p>{{book.pages}}</p>
                        <p class="font-weight-bold">Language:</p>
                        <p>{{book.language}}</p>
                        <p class="font-weight-bold">Publisher:</p>
                        <p>{{book.publisher}}</p>
                        <p class="font-weight-bold">Publisher Date:</p>
                        <p>{{book.publisher_date}}</p>
                        <p class="font-weight-bold">Categories:</p>
                        <v-chip class="ma-2 mb-5" v-for="category in book.categories" :key="category.category_id">
                            {{category.name}}
                        </v-chip>
                        <p class="font-weight-bold">Tags:</p>
                        <v-chip class="ma-2" v-for="tag in book.tags" :key="tag.tag_id">
                            {{tag.name}}
                        </v-chip>
                    </v-flex>
                </v-list-item>
            </v-list>
            <v-divider></v-divider>

        </v-card>
    </v-dialog>
</v-card>
</template>

<script>
import {
    mapActions,
    mapState
} from 'vuex'
export default {
    props: ['book'],
    name: 'CardBook',
    data() {
        return {
            show: '',
            dialog: false,
            activate: false
        }
    },
    methods: {
        ...mapActions(['addFavority', 'removeFavority'])
    },
    computed: {
        ...mapState(['user', 'espera'])
    },
}
</script>
