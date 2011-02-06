/*!
 * Tuna - Common sense Javascript object introspection
 * Copyright(c) 2011 Victor Castell <victorcoder@gmail.com>
 * MIT Licensed
 */
 
var Tuna = {
    describe: function(object) {
        var description = {};
        var members = [];
        
        description.type = Tuna.typify(object);
        description.name = 
            (typeof object === "function") ? Tuna.functionize(object) : Tuna.typify(object);
        
        for (i in object) {
            var def = null;
            var name = null;
            
            if (typeof object[i] === "function") {
                def = Tuna.functionize(object[i]);
            }
            
            var type = Tuna.typify(object[i]);

            if (type === "Object") {
                var member = Tuna.describe(object[i]);
                members.push(member);
            } else {
                name = (def == null) ? i : def;
            }
            
            members.push({
              "name": name,
              "type": type
            });
        }
        
        description.members = members;
        
        return description;
    },
    
    typify: function(object) {
        var type = null;
        
        //Check for primitive
        var primitives = ["string", "number", "boolean", "null", "undefined"];
        
        for (i in primitives) {
            if (typeof object == primitives[i]) {
                type = primitives[i].charAt(0).toUpperCase() + primitives[i].substr(1);
                break;
            }
        }
        
        var coreObjects = ["Boolean", "Number", "String", "Array", "Function", "RegExp", "Date", "Object"];
        if (type == null) {
            for (i in coreObjects) {
                if(object instanceof eval(coreObjects[i])) {
                    type = coreObjects[i];
                    break;
                }
            }
        }
        
        return type;
    },
    
    functionize: function(funk) {
        var def = null;
        
        def = funk.toString().match(/function\s\(.*\)/);
        return (def != null) ?  def[0].replace(/\s/, "") : funk.name;
    }
};

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

