function handleKeyDown(event) // xử lý sự kiện khi nhấn một phím
{
		if(event.keyCode==70)// nhấn F pause game
		{
			PauseGame=!PauseGame;
		}
		if(event.keyCode==69) // phim E zoom in camera
		{
			camera.position.z -=0.5;
		}
		if(event.keyCode==81)//phim Q  zoom out camera
		{
			camera.position.z +=0.5;
		}
		if(event.keyCode==83)//phim S set camera
		{
			setCamera=!setCamera;
		}
		if(event.keyCode == 32)//space bắn
			{
				MyTankO.banDan(scene,MyTankDanG);
			}
        switch(event.keyCode)
		{	
			case 37:  	//Arrow left
			dY=0;
			dX=-dM;
			Direction =2;
			break;
			case 39: 	//Arrow right
			dY=0;
			dX=dM;
			Direction =4;
			break;
			case 38:	//Arrow up
			dX=0;
			dY=dM;
			Direction =1;
			break;
			case 40:	//Arrow down
			dX=0;
			dY=-dM;
			Direction =3;
			break;
		}	
    }
    function handleKeyUp(event) // sự kiên khi một phím sau khi nhấn được thả ra
	{
      
        switch(event.keyCode)
		{
			case 37:	//Arrow left
			dX=0;
			break;
			case 39:	//Arrow right
			dX=0;
			break;
			case 38:	//Arrow up	
			dY=0;
			break;
			case 40:	//Arrow down
			dY=0;
			break;	
		}
    }