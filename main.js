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
            return this.count(/["']?[A-Z][^.?!]+((?![.?!]['"]?\s["']?[A-Z][^.?!]).)+[.?!'"]+/gm);// old regex: /\s+[A-Za-z,;'\"\s]+[.?!]/gm
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

        letterFrequencies: function() {
            // Calculate the number of times each letter of the alphabet appears in the input
            let frequencies = {};

            if (this.input) {
                for (let i = 0; i < this.alphabet.length; i++) {
                    let letter = this.alphabet[i];
                    frequencies[letter] = this.count(new RegExp(letter, 'g'), true);
                }
            }
            return frequencies;
        },

        commonChar: function() {
            // Loop through letterFrequencies and find the letter with the greatest frequency
            let commonChar = { char: '', num: 0 };

            if (this.input) {
                for (let letter in this.letterFrequencies) {
                    if (this.letterFrequencies[letter] > commonChar.num) {
                        commonChar.char = letter;
                        commonChar.num = this.letterFrequencies[letter];
                    }
                }
            }
            return commonChar;
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

        update: function(event) {
            this.input = event.target.value;
        },

        count: function(regex, lowerCase = false) {
            return this.search(regex, lowerCase).length;
        },

        search: function(regex, lowerCase = false) {
            // Wrapper around String.match() so that it returns [] if no match
            let searchText = lowerCase ? this.lowerCaseInput : this.input;
            return (searchText || '').match(regex) || [];
        },

        letterRatio: function(letter) {
            let ratio = 0;
            if (this.input) {
                ratio = Math.floor(this.letterFrequencies[letter] / this.commonChar.num * 100);
            }
            return ratio;
        }
    }
});
