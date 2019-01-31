function findPath2(world, DinhBatDau, DinhKetThuc,ETankO_)
{
	
	var ToaDoETank1=undefined;
	if(ETankO_[1]!=undefined)
	{
		ToaDoETank1=[Math.round(ETankO_[1].X),Math.round(ETankO_[1].Y)];
		ToaDoETank1=r2f(ToaDoETank1);
	}
	var ToaDoETank0=undefined;
	if(ETankO_[0]!=undefined)
	{
		ToaDoETank0=[Math.round(ETankO_[0].X),Math.round(ETankO_[0].Y)];
		ToaDoETank0=r2f(ToaDoETank0);
	}                         
	var result=[];
	var ketqua=[];
	var myDinhKe=[]
	function timQ(x, y)
	{
		// dong tay nam bac
		var	N = x+1, 
		S = x-1,
		E = y+1,
		W = y-1
		myN =  checkDinhDiDen(N, y),
		myS = checkDinhDiDen(S, y),
		myE = checkDinhDiDen(x, E),
		myW = checkDinhDiDen(x, W),
		ketqua = [];
		if(myN)
		ketqua.push([N,y]);
	
		if(myE)
		ketqua.push([x,E]);
	
		if(myS)
		ketqua.push([S,y]);
	
		if(myW)
		ketqua.push([x,W]);
		return ketqua;//mang cac diem co the di den
	}

	function checkDinhDiDen(x, y)
	{
		if(world[x] == null||world[x][y] == null||world[x][y] > 0)
			return false;
		if(ToaDoETank1!=undefined)
		{
			if(x==ToaDoETank1[0]&&y==ToaDoETank1[1])
				return false;
		}
		if(ToaDoETank0=undefined)
		{
			if(x==ToaDoETank0[2]&&y==ToaDoETank0[1])
				return false;
		}
		return true;
	};
	function timDuong()
	{
			result.push([DinhBatDau[0],DinhBatDau[1]]);
			myDinhKe = timQ(DinhBatDau[0],DinhBatDau[1]);
		
			var j = myDinhKe.length;
	
			j=Math.floor(Math.random()*j);
			result.push([myDinhKe[j][0],myDinhKe[j][1]]);
			
			
		return result;
	}

	return timDuong();
}
