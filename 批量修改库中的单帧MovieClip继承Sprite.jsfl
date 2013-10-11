
//批量设置库中所有的元件的父类继承至某个类
//一般使用是:批量将单帧的MovieClip继承自Sprite
var filterStr = prompt("请输入要剔除的元件(建议输入所在包)");
var lib = fl.getDocumentDOM().library;
var itemList = lib.items;
var len = itemList.length;
for(var i=0; i<len; i++)
{
	var item = itemList[i];
	if(item.itemType == "movie clip" && item.timeline.frameCount < 2)
	{
		if(filterStr && filterStr != "")
		{
			if(item.name.indexOf(filterStr) == -1 && item.linkageClassName && item.linkageClassName.length>0)
			{
				//父类完整路径名
				item.linkageBaseClass = "flash.display.Sprite";
			
			}
		}
		else
		{
			if(item.linkageClassName && item.linkageClassName.length>0)
			{
				//父类完整路径名
				item.linkageBaseClass = "flash.display.Sprite";
			}
		}		
	}
}
alert("批量修改完成!!!");
