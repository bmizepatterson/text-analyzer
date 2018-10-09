new Vue({

    el: "#app",

    data: {
        input: '',
    },

    computed: {
        paragraphNum: function() {
            return this.count(/.\n/g);
        },

        sentenceNum: function() {
            return 0;
        },

        wordNum: function() {
            return 0;
        },

        charNum: function() {
            return 0;
        },

        longestWord: function() {
            return 'Triskaedekaphobia';
        }
    },

    methods: {
        update: function(event) {
            this.input = event.target.value;
        },

        count: function(regex) {
            return ((this.input || '').match(regex) || []).length;
        }
    }
});
