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
        }
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
        },

        letterRatio: function(letter) {
            if (this.input) {
                let lowerCaseInput = this.input.toLowerCase();
                let regex = new RegExp(letter, 'g');
                // console.log(regex);
                // console.log(this.count(regex), '/', this.letterNum);
                let count = this.count(regex);
                if (count > this.commonChar.num) {
                    this.commonChar.char = letter;
                    this.commonChar.num = count;
                }
                // console.log(letter, result);
                let result = Math.floor(count / this.letterNum * 100);
                return result;
            }
            return 0;
        }
    }
});
