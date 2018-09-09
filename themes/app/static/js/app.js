algorithm = Algorithmia.client("simNkidTbC0XeTmxJEdslAAVE3K1").algo("danielfrg/word2vec/0.3.1")
var example1 = new Vue({
    el: '#example-1',
    data: {
      counter: 0
    }
  })

var similar = new Vue({
    el: "#similar",
    data: function () {
        return {
            word: "",
            data: [],
            error: "",
        }
    },
    methods: {
        query: function (event) {
            console.log("Similar: " + this.word);
            if (this.word) {
                this.error = "";
                this.data = [];
                
                var input = {
                    "similar": {
                        "word": this.word,
                        "n": 10
                    }
                }
                
                algorithm.pipe(input).then((response) => {
                    console.log(response)
                    if(response.error) {
                        this.error = response["error"]
                    }
                    else if (response["result"]["error"]) {
                        this.error = response["result"]["error"] + ": " +response["result"]["word"]
                    }
                    else {
                        this.data = response["result"]
                    }
                    return response
                });
            }
        },
        ex_france: function (event) {
            this.word = "france";
            this.query();
        },
        ex_dog: function (event) {
            this.word = "dog";
            this.query();
        },
        ex_apple: function (event) {
            this.word = "apple";
            this.query();
        },
        ex_san_francisco: function (event) {
            this.word = "san_francisco";
            this.query();
        }
    }
})


var analogy = new Vue({
    el: "#analogy",
    data: function () {
        return {
            pos: [{v: ""}, {v: ""}, {v: ""}],
            neg: [{v: ""}, {v: ""}, {v: ""}],
            data: [],
            error: "",
        }
    },
    methods: {
        query: function (event) {
            pos = this.pos.map(x => x["v"]).filter(Boolean);
            neg = this.neg.map(x => x["v"]).filter(Boolean);
            console.log("Analogy: " + pos + " - " + neg);
            
            if (pos.length > 0 || neg.length > 0) {
                this.error = "";
                this.data = [];
                
                var input = {
                    "analogy": {
                        "pos": pos,
                        "neg": neg,
                        "n": 10
                    }
                }
                
                algorithm.pipe(input).then((response) => {
                    console.log(response)
                    if(response.error) {
                        this.error = response["error"]
                    }
                    else if (response["result"]["error"]) {
                        this.error = response["result"]["error"] + ": " +response["result"]["word"]
                    }
                    else {
                        this.data = response["result"]
                    }
                    return response
                });
            }
        },
        ex_madrid: function (event) {
            this.pos = [{"v": "france"}, {"v": "italy"}, {"v": "spain"}];
            this.neg = [{"v": "paris"}, {"v": "rome"}, {"v": ""}];
            this.query();
        },
        ex_queen: function (event) {
            this.pos = [{"v": "king"}, {"v": "woman"}, {"v": ""}];
            this.neg = [{"v": "man"}, {"v": ""}, {"v":""}];
            this.query();
        },
        ex_cold: function (event) {
            this.pos = [{"v": "hot"}, {"v": "winter"}, {"v": ""}];
            this.neg = [{"v": "summer"}, {"v": ""}, {"v": ""}];
            this.query();
        },
        ex_niece: function (event) {
            this.pos = [{"v": "girl"}, {"v": "nephew"}, {"v": ""}];
            this.neg = [{"v": "boy"}, {"v": ""}, {"v": ""}];
            this.query();
        },
        ex_unicorn: function (event) {
            this.pos = [{"v": "mythical_creature"}, {"v": "horse"}, {"v": "magical"}];
            this.neg = [{"v": ""}, {"v": ""}, {"v": ""}];
            this.query();
        }
    }
})
