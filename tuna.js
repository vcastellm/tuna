/*!
 * Tuna - Common sense JavaScript object introspection
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
        
        for (var i in object) {
            var def = null;
            var name = null;
            var member = {};
            
            if (typeof object[i] === "function") {
                def = Tuna.functionize(object[i]);
            }
            
            member.type = Tuna.typify(object[i]);
            member.name = (def == null) ? i : def;
            
            if (member.type === "Object") {
                member.members = Tuna.describe(object[i]);
            }
            
            members.push(member);
        }
        
        description.members = members;
        
        return description;
    },
    
    typify: function(object) {
        var type = null;
        
        //Check for primitive
        var primitives = ["string", "number", "boolean", "null", "undefined"];
        
        for (var i in primitives) {
            if (typeof object == primitives[i]) {
                type = primitives[i].charAt(0).toUpperCase() + primitives[i].substr(1);
                break;
            }
        }
        
        var coreObjects = ["Boolean", "Number", "String", "Array", "Function", "RegExp", "Date", "Object"];
        if (type == null) {
            for (var i in coreObjects) {
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

