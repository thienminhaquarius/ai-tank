function findPath1(world,DinhBatDau, DinhKetThuc,ETankO_,MyTankO_)
{
	var worldWidth = world[0].length;
	var worldHeight = world.length;
	var worldSize =	worldWidth * worldHeight; 
	var h = EuclideanDistance;
	
	//khởi tạo các biến
	var pre;
	var Dinh = new Array(worldSize); // javascrip là ngôn ngữ linh động ta không sợ tốn tài nguyên như c++
	var Open = [];
	var	myDinhBatDau = Node( {x:DinhBatDau[0], y:DinhBatDau[1]});
	var myDinhKetThuc = Node({x:DinhKetThuc[0], y:DinhKetThuc[1]});
	
	var r; // bán kính r
	var a,b;	// tâm a,b
	
	var TuongAo=true;
	var ToaDoETank0=undefined;
	if(ETankO_[0]!=undefined)// xe tank vàng có ID=0 chưa bị tiêu diệt
	{
		ToaDoETank0=[Math.round(ETankO_[0].X),Math.round(ETankO_[0].Y)];
		ToaDoETank0=r2f(ToaDoETank0);	// vị trí ETank0 trong hệ 2D

		r=Math.floor(h({x:ToaDoETank0[0],y:ToaDoETank0[1]},myDinhKetThuc)/2);// bán dính là khoảng cách giữa MyTank và ETank0 chia 2

		a=(ToaDoETank0[0]+myDinhKetThuc.x)/2; //tâm a: (ETank0.x +MyTank.x)/2
		b=(ToaDoETank0[1]+myDinhKetThuc.y)/2; //tâm b: (ETank0.y +MyTank.y)/2
	
		//check nếu ban đầu ETank1 đã nằm trong đường tròn thid ETank1 sẽ di chuyển bình thường (Như Astar1)
		// nếu không có trạng thái false thì ETank 2 sẽ đứng im (vì ETank1 "nghĩ" xung quanh nó toàn là tường gạch)
		if((Math.pow(myDinhBatDau.x-a,2)+Math.pow(myDinhBatDau.y-b,2))<= Math.pow(r,2))
			TuongAo=false; //ETank1 nằm trong vòng tròn ảo nên tường ảo không được sử dụng
	}
	else// ETank0 đã bị tiêu diệt nên tường ảo không được sử dụng
	{
		TuongAo=false;
	}

	//=====Tìm đường bay của đạn, xem đạn là tường để né==============
	var Dan=undefined;
	if(MyTankO_.Dan!=undefined)
	{
		Dan=new Array(2);
		Dan[0]=Math.round(MyTankO_.Dan.X);
		Dan[1]=Math.round(MyTankO_.Dan.Y);
		Dan=r2f(Dan);	//vị trí viên đạn của MyTank
	}
	var xmin,xmax,ymin,ymax; //tìm vùng bay đạn nằm trong hình chữ nhật xmin,xmax,ymin,ymax
	if(Dan!=undefined)
	{
		if(MyTankO_.Dan.LoaiDan==1)// dan bay theo truc x
		{
			if(MyTankO_.Dan.Chieu==1) // dan bay truc x chieu duong
			{
				xmin=Dan[0]-1;	xmax=Dan[0]+1;
				ymin=Dan[1]+1;	ymax=Dan[1]+15;	
			}
		else	//dan bay theo chieu am
		{
			xmin=Dan[0]-1;	xmax=Dan[0]+1;
			ymin=Dan[1]-15;	ymax=Dan[1]-1;
		}
		}
		else
		{	// dan bay theo truc y
			if(MyTankO_.Dan.Chieu==1) // 
			{
				xmin=Dan[0]-15;	xmax=Dan[0]-1;
				ymin=Dan[1]-1;	ymax=Dan[1]+1;
			}
			else
			{
				xmin=Dan[0]+1;	xmax=Dan[0]+15;
				ymin=Dan[1]-1;	ymax=Dan[1]+1;
			}							
		}
	}	// ta tìm được đường bay của đạn xmin,xmax,ymin,ymax
	
	//xác đinh một điểm ở vị trí x,y có phải là điểm hợp lệ
	function checkDinhDiDen(x, y)
	{
		if(world[x] == null||world[x][y] == null||world[x][y] > 0)	//thuộc vị trí tường, ngoài biên giới
			return false;
		
		//ne dan
		if(Dan!=undefined)	// tọa độ có nằm trong đường đạn
		{
			if(x>xmin && x<xmax && y>ymin &&y<ymax)
			{
				return false;
			}
		}
		if(TuongAo)// nếu tường ảo được thiết lập, ETank1 xem tường ảo là tường và check di chuyển
		{
			if((Math.pow(x-a,2)+Math.pow(y-b,2))< Math.pow(r,2))
			return false;
		}
		return true;
		//true: điểm hợp lwj có thể đi đến được
		//false:điểm đang ở vị trí chướng ngại vật, không hợp lệ
	};

	// hàm tìm các đỉnh q kế tiếp của trạng thái p đang xét
	function timQ(x, y)	// x,y: tọa độ của điểm 
	{
		var	N = x+1, 
		S = x-1,
		E = y+1,
		W = y-1,
		myN =  checkDinhDiDen(N, y),
		myS = checkDinhDiDen(S, y),
		myE = checkDinhDiDen(x, E),
		myW = checkDinhDiDen(x, W),
		ketqua = [];
		if(myN)
		ketqua.push({x:N, y:y});
		if(myE)
		ketqua.push({x:x, y:E});
		if(myS)
		ketqua.push({x:S, y:y});
		if(myW)
		ketqua.push({x:x, y:W});
		return ketqua; // trả về chuỗi cặp điểm x1,y1,x2,y2... mà điểm đang xet có thể đi đến được 
	}
	// class node cấu truc dữ liệu
	function Node(Point)
	{
		var newNode = {
			pre:undefined,	// nơi lưu trạng thái trước đó mà node đang xet xuất phát
			next:[],		// lưu các trạng thái mà node đang xét trỏ tới
			tap:undefined,	// undefined: node chưa xét, 1: thuộc tập open, 2:thuộc tập close
			x:Point.x,		//tạo độ điểm
			y:Point.y,
			f:0,			//f: hàm ước lượng f
			g:0				//g: chi phí để đi được đến node hiện tại
		};
		return newNode;
	}
	
	//khi một đỉnh thuộc close chuyền về open,tất cả các đỉnh xuất phát từ q cũng đều thay đổi và bị đư về tập Open như q
	function cacDinhTroToi(dinh_)	//dinh_: vị trí đỉnh trong mảng Dinh[]
	{
		for(var qi=0;qi<Dinh[dinh_].next.length;qi++)	// xét lần lược các đỉnh được dinh_ trỏ tới nằm trong Dinh[dinh_].next
		{
			var id=Dinh[dinh_].next[qi];
			Dinh[id].g=Dinh[dinh_].g+h(Dinh[id],Dinh[dinh_]);	//thay đổi g và f
			Dinh[id].f=Dinh[id].g+h(Dinh[id],myDinhKetThuc);
			Dinh[id].tap=1;										//chuyển về tập open
			Open.push(id);										//đưa về tập open
			cacDinhTroToi(id);	//đệ qui
		}
		Dinh[dinh_].next=[];		// node đã thuộc open, không có đường đi nên các đỉnh nó trỏ tới là rỗng
	}
	
	//hàm tìm đường
	function timDuong()
	{
		//khởi tạo
		var result = [];
		var TapQ;
		var  Distance, min, i, j;

		var q,p,index;	// p và q không lưu node, chúng chỉ lưu chỉ số của node đó nằm trong tập Dinh[](mỗi đỉnh có mỗi index duy nhất)
		index=myDinhBatDau.x+(myDinhBatDau.y*worldWidth);	// index của đỉnh bắt đầu trong Dinh[]
		Open.push(index);
		Dinh[index] = myDinhBatDau;
		Dinh[index].f=h(myDinhBatDau,myDinhKetThuc); // hkoiwr tạo f=h
		
		while(Open.length!=0)
		{
			Distance = Dinh[Open[0]].f; //gán khoảng cách ban đầu
			min = 0;					//gán tên đỉnh ban đầu
			for(i = 0; i < Open.length; i++)
			{
			
				index=Open[i];
				if(Dinh[index].f < Distance)
				{
					Distance = Dinh[index].f;
					min = i;
				}
			}
				p=Open[min];// tìm được p có f nhỏ nhất
			
				Open.splice(min,1);//loại bỏ p khỏi Open
				Dinh[p].tap=2; // chuyển p sang tập Close
				//p được đưa vào Close, tập next của đỉnh trỏ đến p phải thêm p vào để xét các thay đổi về sau
				if(Dinh[p].pre!=undefined)
				{
					Dinh[Dinh[p].pre].next.push(p);
				}
			//nếu tìm được đến đích(vị trí MyTank) thì kết thúc
			if((Dinh[p].x == myDinhKetThuc.x)&&(Dinh[p].y == myDinhKetThuc.y))
			{
				while (p!=undefined)// vòng lặp trỏ ngược lại các đỉnh dẫn đến đỉnh đích
				{
					result.push([Dinh[p].x, Dinh[p].y]);
					p=Dinh[p].pre;
				}
				Open = [];
				result.reverse();	//trả về đường đi gồm chuỗi các cặp điểm x,y
				break;
			}
			else // bắt đầu xét
			{
				TapQ = timQ(Dinh[p].x, Dinh[p].y); //tìm các đỉnh q mà p có thể đi đến được
				j = TapQ.length;//độ dài chuỗi cặp đỉnh
				for(i = 0; i < j; i++)
				{
					q=TapQ[i].x+(TapQ[i].y*worldWidth);// q lưu chỉ số của phần tử TapQ[i] trong Dinh[]
					if(Dinh[q]==undefined) // nếu điểm chưa được xét lần nào (không thuộc Open,Close)
					{
						Dinh[q]=Node(TapQ[i]); // khởi tạo cấu truc dữ liệu của một node
						Dinh[q].g=Dinh[p].g+h(Dinh[q],Dinh[p]); // tính g
						Dinh[q].f=Dinh[q].g+h(Dinh[q],myDinhKetThuc); // tính f
						Dinh[q].tap=1;	// Node q thuộc tập Open
						Dinh[q].pre=p;	// khởi nguồn của q là p (đến được q là nhờ đi qua p)
						Open.push(q);	// thêm q vào open để xét
					}
					else
					{
						if(Dinh[q].tap==1) // nếu q thuộc tập Open
						{
							if(Dinh[q].g>Dinh[p].g+h(Dinh[q],Dinh[p]))	// nếu chí phí đi đến g bé hơn chi phí cũ
							{
								Dinh[q].g=Dinh[p].g+h(Dinh[q],Dinh[p]);		// thay đổi g,f,pre
								Dinh[q].f=Dinh[q].g+h(Dinh[q],myDinhKetThuc);
								Dinh[q].pre=p;
							}
						}
						else	// q thuộc tập Close
						{
							if(Dinh[q].g>Dinh[p].g+h(Dinh[q],Dinh[p]))// nếu chí phí đi đến g bé hơn chi phí cũ
							{
								Dinh[q].g=Dinh[p].g+h(Dinh[q],Dinh[p]);	// thay đổi g,f
								Dinh[q].f=Dinh[q].g+h(Dinh[q],myDinhKetThuc);
								
								// vì q sẽ được đem về Open, q không thuộc Close nữa (q không là đường đi), tập next của đỉnh trỏ đến q (đỉnh đi qua để đến được q)
								//sẽ phải loại bỏ q
								pre=Dinh[q].pre;	// lưu pre của q vào biến tạm
								for(var ipre=0;ipre<Dinh[pre].next.length;ipre++)
								{
									if(Dinh[pre].next[ipre]==q)
									{
										Dinh[pre].next.splice(ipre,1);// loai bỏ q khỏi next
										break;
									}
								}
								//Xử lý các đỉnh nằm trong Dinh[q].next (các đỉnh mà q trỏ tới)
								cacDinhTroToi(q);	
									
								Dinh[q].pre=p;// thay đổi pre của q
								Dinh[q].tap=1;//đưa Node q về Open
								Open.push(q);// thêm q vào Open
							}	
						}
					}
				}
			}	
		} //end while
		return result;
	}
	return timDuong();
}
