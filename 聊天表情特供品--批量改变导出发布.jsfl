fl.outputPanel.clear();
fl.trace("脚本开始执行");  
//打开图片目录  
var folder = "file:///D|/work/assets_src/icon/faces/";
var exportUrl = "file:///D|/work_xymmo/assets/icon/faces/";
//fl.trace(folder);
//取的文件列表句柄  
var list = FLfile.listFolder(folder,"files"); 
fl.trace(list);
for(var _index = 0; _index < list.length; _index++)
{
	var doc = fl.openDocument(folder + list[_index]);
	//获取文档类.
	//var doc = fl.getDocumentDOM(); 
	//fl.trace(doc.name);
	//doc.getTimeline();
	var blib = doc.library;
	for(var i in blib.items)//遍历库.
	{
		var titem = blib.items[i];
		if(titem.itemType == "movie clip")
		{
			titem.timeline.copyFrames(0,titem.timeline.frameCount);			
			doc.getTimeline().pasteFrames(0,titem.timeline.frameCount);
			blib.deleteItem(titem.name);
			break;
		}
	}
	for(var i in blib.items)//遍历库.
	{
		var titem = blib.items[i];
		if(titem.name == "MovieClip")
		{
			blib.deleteItem(titem.name);
			break;
		}
	}
	var layer = doc.getTimeline().layers[0];
	var len = layer.frames.length;
	//对本层的所有帧进行遍历
	for(var k = 0; k < len; k++)
	{
		var frame = layer.frames[k];				
		var _elements = frame.elements;
		//对帧上的元素进行遍历
		for(var m = 0; m < _elements.length; m++)
		{
			_elements[m].x = 190;
			_elements[m].y = 190;
		}
	}
	fl.getDocumentDOM().exportSWF(exportUrl + doc.name.substring(-4), true);
	doc.save();
	doc.close();
}