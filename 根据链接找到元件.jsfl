//
// 根据链接找到元件
//
// This command was recorded by Adobe Flash CS5.5.
//

//弹框
var tName = prompt("请输入要查找元件的链接", "");
//是否找到
var hasFind = false;
//提示内容数组
var tipList = [];

	var folds = fl.getDocumentDOM().library.items;
	var len = folds.length;
	for(var i=0; i<len; i++)
	{
		var link = folds[i].linkageClassName;
		var tempName = String(folds[i].name);
		if(link != undefined)
		{
			var tempLink = String(link);
			
			if(tempLink.toLowerCase().indexOf(tName.toLowerCase()) != -1)
			{
				hasFind = true;
				tipList.push("元件名称: "+folds[i].name+" ,链接： "+tempLink+"，类型: "+folds[i].itemType);
			}
		}		
	}
	
	
	if(hasFind)
	{
		var le = tipList.length;
		var str = "共发现："+le+"个 : \n";		
		for(var j=0; j<le; j++)
		{ 
			str=str.concat(tipList[j]+"\n\n");
		}
		alert(str);
	}
	else
	{
		alert("链接为："+tName+" 的元件未找到！");
	}
	
