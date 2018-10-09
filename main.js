new Vue({

    el: "#app",

    data: {
        input: '',
        commonChar: {
            char: '',
            num: 0
        }
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

        lowerCaseInput: function() {
            return this.input.toLowerCase();
        }
    },

    methods: {
        update: _.debounce(function(event) {
            this.input = event.target.value;
        }, 300),

        count: function(regex, lowerCase = false) {
            return this.search(regex, lowerCase).length;
        },

        search: function(regex, lowerCase = false) {
            let searchText = lowerCase ? this.lowerCaseInput : this.input;
            return (searchText || '').match(regex) || [];
        },

        letterRatio: function(letter) {
            if (this.input) {
                let regex = new RegExp(letter, 'g');
                let count = this.count(regex, true);
                if (count > this.commonChar.num) {
                    this.commonChar.char = letter;
                    this.commonChar.num = count;
                }
                let result = Math.floor(count / this.letterNum * 100);
                return result;
            }
            return 0;
        }
    }
});
