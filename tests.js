//Samples
var foo = {
    "bar": "foobar",
    "dummy": function(paramX) {
        var k = 1;
        var x = 0;
        
        return k + x;
    },
    "isBool": true,
    "nested": {
        "attr1": "str",
        "attr2": true,
        "attr3": function() {},
        "attr4": function(param1) {},
        "attr5": {
            "nested2": "str"
        }
    }
};

function algo(param1) {}

console.log(Tuna.describe(foo));