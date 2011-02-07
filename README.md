Tuna - Common sense JavaScript object introspection
===

Tuna is a tool to inspect JavaScript objects. It is a tool to digg in the details of JS object instances that tries to define a standard way to visualize the object hierarchy. 

The motivation for writing this library is to extend the core JavaScript object inspection capabilities and define a standard way of looking in to instances inspired by AS3 describeType() function and by node.js sys.inspect. Contrary to describeType instead of returning XML object definition it is based on JavaScript objects or JSON objects.

It's similar in many aspects to node's sys.inspect but the output format is a bit different and it's usable outside this environment and inside too.

Use
---

Include the main script in your page or require it in your Node script and use
  
  Tuna.describe(object);
  
Copyright(c) 2011 Victor Castell victorcoder at gmail.com

