fl.outputPanel.clear();
fl.trace("脚本开始执行");  
//打开图片目录  
//var folder = fl.browseForFolderURL("png图片目录"); 
//var exportUrl = fl.browseForFolderURL("生成swf目录");
var folder = "file:///E|/FFOutput/1";
var exportUrl = "file:///E|/FFOutput";


//取的文件列表句柄  
var list = FLfile.listFolder(folder,"files"); 
var doc = fl.openDocument(exportUrl+"/temp.fla");

for(var _index = 0; _index < list.length; _index++)
{	
	var filename = list[_index];  
	fl.trace(filename);
    if(filename.toLowerCase().substr(filename.length - 4) == ".png")
	{  					
		var lib = fl.getDocumentDOM().library;//取得库 
		lib.selectAll();
		lib.deleteItem();
	
		fl.outputPanel.trace("正在导入到库："+ filename+"         剩余:--"+(list.length-_index)); 
        //文件导入到flash/舞台/库  
        doc.importFile(folder + "/" + filename,true);  
		lib.selectItem(filename);
				
		lib.addItemToDocument({x:0, y:0});		
		var frameArr = fl.getDocumentDOM().getTimeline().layers[0].frames;
		var frame = frameArr[0];
		frame.elements[0].x = 190;
		frame.elements[0].y = 190;
	}
	doc.save();
	fl.getDocumentDOM().exportSWF(exportUrl + "/"+filename, true);
	
	//doc.close();
}