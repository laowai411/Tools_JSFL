//var exportFolder = fl.browseForFolderURL("选择导出目录");

var fileURL = fl.browseForFileURL("open", "Select file"); 
var doc = fl.openDocument(fileURL);
var exportFolder = "file:///E|/FFOutput";


if(fileURL != null && doc != null)
{
	var pName = fileURL.substring(fileURL.lastIndexOf("/"));

	var lib = fl.getDocumentDOM().library;
	var libLength = lib.items.length;
	var items=lib.items;

	for(var i=0;i<libLength;i++)
	{
 	   if(lib.items[i].itemType=="bitmap")
  	  {
  	     itemName=lib.items[i].name;
   	     var pngName=itemName.substring(itemName.lastIndexOf("/")+1);
	    
        if(pngName.indexOf('.') == -1)
        {
    	    pngName += ".png";
		}
					
		if(!FLfile.exists(exportFolder+pName))
		{
	   		FLfile.createFolder(exportFolder+pName);
		}
				
		lib.items[i].exportToFile(exportFolder+pName+"/"+pngName);
	  }
    }           
	alert("导出完成!");
}
else
{
	alert("文件目录错误!");
}
