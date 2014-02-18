 function ThriftShopCtrl($scope) {
	$scope.services = [
		{"name":"tutorial","doc":"The first thing to know about are types. The available types in Thrift are:\n\n bool        Boolean, one byte\n byte        Signed byte\n i16         Signed 16-bit integer\n i32         Signed 32-bit integer\n i64         Signed 64-bit integer\n double      64-bit floating point value\n string      String\n binary      Blob (byte array)\n map<t1,t2>  Map from one type to another\n list<t1>    Ordered list of one type\n set<t1>     Set of unique elements of one type\n\nDid you also notice that Thrift supports C style comments?\n","enums":[{"name":"Operation","doc":"You can define enums, which are just 32 bit integers. Values are optional\nand start at 1 if not supplied, C style again.\n","members":[{"name":"ADD","value":"1"},{"name":"SUBTRACT","value":"2"},{"name":"MULTIPLY","value":"3"},{"name":"DIVIDE","value":"4"}]}],"typedefs":[{"name":"MyInteger","type":"i32","doc":"Thrift lets you do typedefs to get pretty names for your types. Standard\nC style here.\n"}],"structs":[{"name":"Work","doc":"Structs are the basic complex data structures. They are comprised of fields\nwhich each have an integer identifier, a type, a symbolic name, and an\noptional default value.\n\nFields can be declared \"optional\", which ensures they will not be included\nin the serialized output if they aren't set.  Note that this requires some\nmanual management in some languages.\n","fields":[{"index":"1","name":"num1","type":"i32","default":"0"},{"index":"2","name":"num2","type":"i32"},{"index":"3","name":"op","type":"Operation"},{"index":"4","name":"comment","type":"string"}]},{"name":"InvalidOperation","doc":"Structs can also be exceptions, if they are nasty.\n","isException":"true","fields":[{"index":"1","name":"what","type":"i32"},{"index":"2","name":"why","type":"string"}]},{"name":"SharedStruct","fields":[{"index":"1","name":"key","type":"i32"},{"index":"2","name":"value","type":"string"}]}],"constants":[{"name":"INT32CONSTANT","type":"i32","doc":"Thrift also lets you define constants for use across languages. Complex\ntypes and structs are specified using JSON notation.\n","value":"9853"},{"name":"MAPCONSTANT","type":"map<string,string>","value":"[hello:world,goodnight:moon]"}],"services":[{"name":"Calculator","extendsType":"SharedService","doc":"Ahh, now onto the cool part, defining a service. Services just need a name\nand can optionally inherit from another service using the extends keyword.\n","functions":[{"name":"ping","returnType":"void","doc":"A method definition looks like C code. It has a return type, arguments,\nand optionally a list of exceptions that it may throw. Note that argument\nlists and exception lists are specified using the exact same syntax as\nfield lists in struct or exception definitions.\n","arguments":[],"exceptions":[]},{"name":"add","returnType":"i32","arguments":[{"index":"1","name":"num1","type":"i32"},{"index":"2","name":"num2","type":"i32"}],"exceptions":[]},{"name":"calculate","returnType":"i32","arguments":[{"index":"1","name":"logid","type":"i32"},{"index":"2","name":"w","type":"Work"}],"exceptions":[{"index":"1","name":"ouch","type":"InvalidOperation"}]},{"name":"zip","returnType":"void","oneWay":"true","doc":"This method has a oneway modifier. That means the client only makes\na request and does not listen for any response at all. Oneway methods\nmust be void.\n","arguments":[],"exceptions":[]}]},{"name":"SharedService","functions":[{"name":"getStruct","returnType":"SharedStruct","arguments":[{"index":"1","name":"key","type":"i32"}],"exceptions":[]}]}]}
	]
	
	$scope.invocationData = null;
	
	$scope.currentService = $scope.services[0];
	
	$scope.setSelected = function(service){
		$scope.currentService = service;
	}
	
	$scope.test_function = function(func,service){
		$scope.invocationData = {func: func, service: service, program: $scope.currentService, arguments:makeArgumentsFromFunc(func)};
	}
	
	function makeArgumentsFromFunc(func){
		var args = [];
		_(func.arguments).each(function(arg){
			args.push({meta:arg,value:''});
		});
		return args;
	}
 
	$scope.invoke = function(){
		InvokeThrift($scope.invocationData);
	}
 }