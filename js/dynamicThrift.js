function InvokeThrift(f){
	var transport = new Thrift.Transport("http://localhost:9001/json");
    var protocol  = new Thrift.Protocol(transport);
	protocol.writeMessageBegin(f.name, Thrift.MessageType.CALL, 0);
	
	//beginning of arguments struct
	protocol.writeStructBegin();
	
	writeArguments(f,protocol);
	
	//end of arguments struct
	protocol.writeFieldStop();
	protocol.writeStructEnd();
	
	protocol.writeMessageEnd();
	transport.flush();
}

function writeArguments(f,protocol){
	_(f.arguments).each(function(arg){
		//protocol.writeFieldBegin('', Thrift.Type.I32, arg.meta.index);
		//protocol.writeI32(parseInt(arg.value));
		//protocol.writeFieldEnd();
	});	
}