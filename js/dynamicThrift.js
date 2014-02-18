function InvokeThrift(invocation){
	var transport = new Thrift.Transport("http://localhost:9001");
    var protocol  = new Thrift.Protocol(transport);
	protocol.writeMessageBegin(invocation.func.name, Thrift.MessageType.CALL, 0);
	//beginning of arguments struct
	protocol.writeStructBegin();
	writeArguments(invocation,protocol);
	//end of arguments struct
	protocol.writeFieldStop();
	protocol.writeStructEnd();
	protocol.writeMessageEnd();
	transport.flush();
}

function writeArguments(invocation,protocol){
	_(invocation.arguments).each(function(arg){
		protocol.writeFieldBegin('', Thrift.Type.I32, arg.meta.index);
		protocol.writeI32(parseInt(arg.value));
		protocol.writeFieldEnd();
	});	
}