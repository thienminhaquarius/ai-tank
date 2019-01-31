///=========MyTank===================
//MyTank va chạm với biên giới và tường gạch
function vaChamTuong_MyTank(x,y,dx_,dy_)// x,y: vị trí MyTank, dx_,dy_: delta x, deltay mà MyTank sẽ di chuyển.
{	
	var virx=x+dx_;// Lưu vị trí tạm.
	var viry=y+dy_;			
	if(Math.abs(virx)>15.5-0.5 || Math.abs(viry)>10.5-0.5)// check Tank di den bien gioi(border)
	{
		return true;		
	}
	for(var i=0;i<TuongGachX.length;i++)	// va chạm với Tường Gạch
	{
				
		if(viry > TuongGachY[i]-0.8 && viry<TuongGachY[i]+0.8 && virx < TuongGachX[i]+0.8 && virx >TuongGachX[i]-0.8)
		{
			return true;			
		}			
	}
	return false ;
	//true: va chạm MyTank không thể đi đoạn delta x,y đó
	//fasle: không va chạm, MyTank có thể di chuyển đoạn delta X,delta Y
}
//check va chạm MyTanks với các Enermy Tanks
function vaChamETanks_MyTank(x,y,dx_,dy_,ETanks_) //x,y: vị trí MyTank, dx_,dy_: delta x, deltay mà MyTank sẽ di chuyển.
{
	if(dx_<0)	// tìm x,y tạm để so sánh kết quả
		x=x-0.4;
	if(dx_>0)
		x=x+0.4;
	if(dy_>0)
		y=y+0.4;
	if(dy_<0)
		y=y-0.4;
	for(var i =0;i<ETanks_.length;i++)
	{
		if(ETanks_[i]==undefined)// ETanks[i] đã bị tiêu diệt
			continue;
		
		if((Math.pow(ETanks_[i].X-x,2)+Math.pow(ETanks_[i].Y-y,2))< Math.pow(0.55,2)) // check ETanks có thuộc đường tròn va chạm
			return true;
	}
	return false;
	//true: va chạm MyTank không thể đi đoạn delta x,y đó
	//fasle: không va chạm, MyTank có thể di chuyển đoạn delta X,delta Y
}
// check MyTank bị trúng đạn
function vaChamDan_MyTank(x,y,MyTank_) //x,y: vị trí ETank.Dan đang xét , MyTank_:Object MyTank
{
	if(x > MyTank_.X -0.7 && x < MyTank_.X +0.7 && y > MyTank_.Y -0.7 && y < MyTank_.Y +0.7)
	{
		MyTank_.Mau--; // trúng đạn giảm máu
		return true;
	}
	return false;
	// true trúng đạn ==> chiều dài viên ETanks[i].Dan.length=-1
	// false MyTank không trúng đạn, viên đạn vẫn bay.
}
//========EnemyTank===========
// check va cham ETank voi ETank,Etank voi MyTank
function vaChamTanks_ETanks(x,y,MyTank,ETanks,j)
{
	var a=x;// đường tròn tâm a,b là vị trí tank đang xét
	var b=y;
	var r=1;
	if((Math.pow(MyTank.X-a,2)+Math.pow(MyTank.Y-b,2))< Math.pow(r,2))
		return true;
	for(var i=0;i<ETanks.length;i++)
	{
		if(ETanks[i]==undefined)
			continue;
		if(i==j)
			continue;
		if((Math.pow(ETanks[i].X-a,2)+Math.pow(ETanks[i].Y-b,2))< Math.pow(r,2))
			return true;
	}
	return false;
}
// ETank bị trúng đạn của MyTank
function vaChamDan_ETanks(x,y,ETanks_)// x,y đan của MyTank.Dan, ETanks_: Object các ETank
{
	for(var i=0;i<ETanks_.length;i++)
	{
		if(ETanks_[i]==undefined)// ETanks[i] đã bị tiêu diệt
			continue;
		if(x > ETanks_[i].X -0.7 && x < ETanks_[i].X +0.7 && y > ETanks_[i].Y -0.7 && y < ETanks_[i].Y +0.7)
		{
			ETanks_[i].Mau--;// ETanks[i] bị trúng đạn giảm máu
			
			return true; 
		}
	}
	return false;
	//true: một trong các ETank bị trúng đạn => MyTank.Dan.lenght=-1;
	//false: khong có gì xảy ra
}
//trả về hướng ETank từ vị trí hiện tại và vị trí kế tiếp (để xoay mặt ETank về hướng mới)
function traVeHuongETank(x1,y1,x2,y2)// x1,y1:vi tri hien tai, x2,y2: vi tri ke tiep
{
	if((y2-y1) ==1 )
		return 1;	// bắc
	if((y2-y1)==-1)
		return 3;	//nam
	if((x2-x1)==-1)
		return 2;	//Tây
	if((x2-x1)==1)
		return 4;	//Đông
}
//==================Vien Dan==================
//Check viên đạn va chạm với biên giới, tường	
function vaChamTuong_Dan(x,y)// x,y: vị trí đạn, biến toàn cục vị trí tường, vị trí biên giới.
{
		if(Math.abs(x)>15.5-0.5 || Math.abs(y)>10.5-0.5)
				{
					return true;	
				}
		for(var i=0;i<TuongGachX.length;i++)
		{
			if(x<TuongGachX[i]+0.7 && x >TuongGachX[i]-0.7 && y< TuongGachY[i]+0.7 && y> TuongGachY[i]-0.7 )
				return true;
		}
		return false;
	//true: một trong các Tank bị trúng đạn => Tank.Dan.lenght=-1;
	//false: không có gì xảy ra	
}
// trả về chiều của viên đạn
function traVeChieuDan(huong_)	//huong_: hướng của viên đạn
{
	if (huong_ == 1 || huong_==4)
	{
		return 1;//chiều dương
	}
	else
	{
		return -1// chiều âm
	}
}
// trả về loại đạn, loai1: đạn bay theo truc x, loại2: đạn bay theo trục y
function traVeLoaiDan(huong_) // huong_: hướng của viên đạn
{
	if (huong_==2 || huong_ ==4)
	{
		return 1;// đạn bay theo trục x
	}
	else
	{
		return 2;// đạn bay theo trục y
	}
}
			
//===========các hàm khác==============
//chuyển tọa độ (vì đồ họa là 3D, còn hàm tìm kiếm là trên ,mảng hai chiều)	
//real to fake
function r2f(bien)
{
	temp=[];
	temp[0]=Math.abs(bien[1]-10);
	temp[1]=bien[0]+15;
	return temp;
}
// fake to real
function f2r(bien)
{
	temp=[];
	temp[0]=bien[1]-15;
	temp[1]=-bien[0]+10;
	return temp;
}
// hàm tính khoảng cách giữa hai điểm trên bản đồ
function EuclideanDistance(Point, Goal)
{	
	return Math.sqrt(Math.pow(Point.x - Goal.x, 2) + Math.pow(Point.y - Goal.y, 2));
}












