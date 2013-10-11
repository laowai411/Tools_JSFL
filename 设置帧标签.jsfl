fl.getDocumentDOM().getTimeline().addNewLayer();

var countNum = fl.getDocumentDOM().getTimeline().frameCount;

fl.outputPanel.trace(countNum); 

fl.getDocumentDOM().getTimeline().currentFrame = 0;

fl.getDocumentDOM().selectNone();

for(var i = 0;i<countNum;i++)
{
	fl.getDocumentDOM().getTimeline().setFrameProperty('name', i+1);
	if(i == countNum-1)
	{
		break;
	}
	fl.getDocumentDOM().getTimeline().convertToBlankKeyframes();    
}


