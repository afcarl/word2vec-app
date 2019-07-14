algorithm = Algorithmia.client("simNkidTbC0XeTmxJEdslAAVE3K1").algo("danielfrg/word2vec/0.3.2")

var header = new Vue({
    el: "#header",
    data: {
      status: "loading"
    },
    methods: {
        query: function (event) {
            console.log("Getting status");
            var input = {"status": ""}

            algorithm.pipe(input).then((response) => {
                console.log("Analogy response: " + response);

                if(response.error) {
                    this.status = response["error"];
                }
                else if (response["result"]["error"]) {
                    this.status = response["result"]["error"] + ": " +response["result"]["word"];
                }
                else {
                    this.status = "ready";
                }
                return response;
            });
        }
    }
});

header.query();
header.query();

var similar = new Vue({
    el: "#similar",
    data: function () {
        return {
            word: "",
            data: [],
            spinner: false,
            error: "",
            error_view: false,
        }
    },
    methods: {
        query: function (event) {
            if (this.word) {
                console.log("Querying similar: " + this.word);
                this.error = "";
                this.data = [];
                this.spinner = true;

                var input = {
                    "similar": {
                        "word": this.word,
                        "n": 10
                    }
                }

                algorithm.pipe(input).then((response) => {
                    console.log("Similar response: " + response);
                    this.spinner = false;

                    if(response.error) {
                        this.error_view = true;
                        this.error = response["error"];
                    }
                    else if (response["result"]["error"]) {
                        this.error = response["result"]["error"] + ": " +response["result"]["word"];
                    }
                    else {
                        this.data = response["result"];
                    }
                    return response;
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
});

var analogy = new Vue({
    el: "#analogy",
    data: function () {
        return {
            pos: [{v: ""}, {v: ""}, {v: ""}],
            neg: [{v: ""}, {v: ""}, {v: ""}],
            spinner: false,
            data: [],
            error: "",
            error_view: false,
        }
    },
    methods: {
        query: function (event) {
            pos = this.pos.map(x => x["v"]).filter(Boolean);
            neg = this.neg.map(x => x["v"]).filter(Boolean);

            if (pos.length > 0 || neg.length > 0) {
                console.log("Querying analogy: " + pos + " - " + neg);
                this.error = "";
                this.data = [];
                this.spinner = true;

                var input = {
                    "analogy": {
                        "pos": pos,
                        "neg": neg,
                        "n": 10
                    }
                }

                algorithm.pipe(input).then((response) => {
                    console.log("Analogy response: " + response);
                    this.spinner = false;

                    if(response.error) {
                        this.error_view = true;
                        this.error = response["error"];
                    }
                    else if (response["result"]["error"]) {
                        this.error = response["result"]["error"] + ": " +response["result"]["word"];
                    }
                    else {
                        this.data = response["result"];
                    }
                    return response;
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
});
