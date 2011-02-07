/*!
    tuna.js
    Tuna - Common sense JavaScript object introspection
    Copyright(c) 2011 Victor Castell <victorcoder@gmail.com>
    MIT Licensed

    Public Domain

    No warranty expressed or implied. Use at your own risk.

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.
    
    Usage
    
    Tuna.describe(object);
    
    See example files for mode in depth usage.
    
    You can use the other methods but they are not of much utility outside the 
    scope of the class.
*/

// Wrap in a closure for hiding methods and avoid global variables.
var Tuna = (function() {
    // For interenal use.
    // Gets a JS object instance and returns it's type. It knows if it's
    // a primitive JS type or a Object type.
    function typify(object) {
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
    }
    
    // For internal use.
    // Gets a function object as an input and tries to return 
    // the function notation.
    function functionize(funk) {
        var def = null;
        
        def = funk.toString().match(/function\s\(.*\)/);
        return (def != null) ?  def[0].replace(/\s/, "") : funk.name;
    }
    
    return {
        // Gets any JS object as input and traverse it's methods and 
        // properties to form a new object with an outline of the object
        // structure.
        describe: function(object) {
            var description = {};
            var members = [];
        
            description.type = typify(object);
            description.name = 
                (typeof object === "function") ? functionize(object) : typify(object);
        
            for (var i in object) {
                var def = null;
                var name = null;
                var member = {};
            
                if (typeof object[i] === "function") {
                    def = functionize(object[i]);
                }
            
                member.type = typify(object[i]);
                member.name = (def == null) ? i : def;
            
                if (member.type === "Object") {
                    member.members = Tuna.describe(object[i]);
                }
            
                members.push(member);
            }
        
            description.members = members;
        
            return description;
        }
    }
})();
