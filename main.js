new Vue({

    el: "#app",

    data: {
        input: '',
        alphabet: 'abcdefghijklmnopqrstuvwxyz',
        tweenedParagraphNum: 0,
        tweenedSentenceNum: 0,
        tweenedWordNum: 0,
        tweenedCharNum: 0,
        tweenedLetterNum: 0
    },

    computed: {
        paragraphNum: function() {
            if (this.input) {
                return this.count(/.\n/g) + 1;
            }
            return 0;
        },

        animatedParagraphNum: function() {
            return this.tweenedParagraphNum.toFixed(0);
        },

        sentenceNum: function() {
            // TODO: Improperly matches abbreviations.
            return this.count(/\s+[A-Za-z,;'\"\s]+[.?!]/gm);
        },

        animatedSentenceNum: function() {
            return this.tweenedSentenceNum.toFixed(0);
        },

        wordNum: function() {
            return this.count(/[\w']+/g);
        },

        animatedWordNum: function() {
            return this.tweenedWordNum.toFixed(0);
        },

        charNum: function() {
            return this.count(/./g);
        },

        animatedCharNum: function() {
            return this.tweenedCharNum.toFixed(0);
        },

        letterNum: function() {
            return this.count(/[A-Za-z]/g);
        },

        animatedLetterNum: function() {
            return this.tweenedLetterNum.toFixed(0);
        },

        longestWord: function() {
            let words = this.search(/[\w']+/g);
            let lengths = words.map((word) => word.length);
            let longest = lengths.indexOf(Math.max(...lengths));
            return words[longest];
        },

        lowerCaseInput: function() {
            return this.input.toLowerCase();
        },

        commonChar: function() {
            if (this.input) {
                // Gather all letter frequencies and find the max
                let lengths = [];
                for (let i = 0; i < this.alphabet.length; i++) {
                    lengths.push(this.count(new RegExp(this.alphabet[i], 'g'), true));
                }
                let max = Math.max(...lengths);
                return {
                    char: this.alphabet[lengths.indexOf(max)],
                    num:  max
                };
            }
            return { char: '', num: 0 };
        }
    },

    watch: {
        paragraphNum: function(newValue) {
            TweenLite.to(this.$data, 0.5, { tweenedParagraphNum: newValue });
        },

        sentenceNum: function(newValue) {
            TweenLite.to(this.$data, 0.5, { tweenedSentenceNum: newValue });
        },

        wordNum: function(newValue) {
            TweenLite.to(this.$data, 0.5, { tweenedWordNum: newValue });
        },

        charNum: function(newValue) {
            TweenLite.to(this.$data, 0.5, { tweenedCharNum: newValue });
        },

        letterNum: function(newValue) {
            TweenLite.to(this.$data, 0.5, { tweenedLetterNum: newValue });
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
                let result = Math.floor(count / this.commonChar.num * 100);
                return result;
            }
            return 0;
        }
    }
});
