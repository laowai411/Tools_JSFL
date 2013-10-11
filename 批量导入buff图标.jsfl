
fl.outputPanel.clear();
fl.trace("脚本开始执行");

//图片路径
var iconURL = "file:///F|/Work/2013-09/2013-09-12/BUFF(1)/BUFF/";
//目标fla路径
var fileURL = fl.browseForFileURL("open", "SelectFile");

var list = FLfile.listFolder(iconURL, "files");
var doc = fl.openDocument(fileURL);

for(var i=0; i<list.length; i++)
{
	var fileName = list[i];
	fl.trace(fileName);
	if(fileName.toLowerCase().substr(fileName.length-4)==".png")
	{
		var lib = fl.getDocumentDOM().library;
		fl.outputPanel.trace("正在导入到库: "+fileName+"       剩余--"+list.length-i);
		doc.importFile(iconURL+"/"+fileName, true);
	}
}

var lib = fl.getDocumentDOM().library;
var itemList = lib.items;
var len = itemList.length;
for(var i=0; i<len; i++)
{
	var item = itemList[i];
	fl.trace(item.name);
	if(item.itemType == "bitmap")
	{
		fl.getDocumentDOM().library.selectItem(item.name);
		var lib = fl.getDocumentDOM().library;
		lib.setItemProperty('allowSmoothing', false);
		lib.setItemProperty('compressionType', 'lossless');
		
		var lib = fl.getDocumentDOM().library;
		if (lib.getItemProperty('linkageImportForRS') == true) 
		{
			lib.setItemProperty('linkageImportForRS', false);
		}
		lib.setItemProperty('linkageExportForAS', true);
		lib.setItemProperty('linkageExportForRS', false);
		lib.setItemProperty('linkageExportInFirstFrame', true);
		lib.setItemProperty('linkageClassName', "Buff_"+item.name.substr(0, item.name.length-4));

	}
}