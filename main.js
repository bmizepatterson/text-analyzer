new Vue({

    el: "#app",

    data: {
        input: '',
    },

    computed: {
        paragraphNum: function() {
            if (this.input) {
                return this.count(/.\n/g) + 1;
            }
            return 0;
        },

        sentenceNum: function() {
            // TODO: Improperly matches abbreviations.
            return this.count(/\s+[A-Za-z,;'\"\s]+[.?!]/gm);
        },

        wordNum: function() {
            return this.count(/[\w']+/g);
        },

        charNum: function() {
            return this.count(/./g);
        },

        letterNum: function() {
            return this.count(/[A-Za-z]/g);
        },

        longestWord: function() {
            let words = this.search(/[\w']+/g);
            let lengths = words.map((word) => word.length);
            let longest = lengths.indexOf(Math.max(...lengths));
            return words[longest];
        },


    },

    methods: {
        update: _.debounce(function(event) {
            this.input = event.target.value;
        }, 300),

        count: function(regex) {
            return this.search(regex).length;
        },

        search: function(regex) {
            return (this.input || '').match(regex) || [];
        }
    }
});
