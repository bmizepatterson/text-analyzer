Vue.component("animated-integer", {

    template: "<span>{{ tweenValue }}</span>",

    props: {
        value: {
            type: Number,
            required: true
        }
    },

    data: function() {
        return {
            tweenValue: 0
        }
    },

    watch: {
        value: function(newValue, oldValue) {
            this.tween(oldValue, newValue);
        }
    },

    mounted: function() {
        this.tween(0, this.value);
    },

    methods: {
        tween: function(startValue, endValue) {
            let vm = this;
            TweenLite.to(vm.$data, 0.5, { tweenValue: endValue,
                onUpdate: function () {
                vm.$data.tweenValue = Math.ceil(vm.$data.tweenValue);
            }, });
        }
    }
})

new Vue({

    el: "#app",

    data: {

        input: '',
        alphabet: 'abcdefghijklmnopqrstuvwxyz'
    },

    computed: {

        paragraphNum: function() {
            if (this.input) {
                return this.count(/.\n/g);
            }
            return 0;
        },

        sentenceNum: function() {
            // TODO: Improperly matches abbreviations.
            return this.count(/["']?[A-Z][^.?!]+((?![.?!]['"]?\s["']?[A-Z][^.?!]).)+[.?!'"]+/gm);// old regex: /\s+[A-Za-z,;'\"\s]+[.?!]/gm
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

    methods: {

        update: function(event) {
            this.input = event.target.value + "\n";
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
