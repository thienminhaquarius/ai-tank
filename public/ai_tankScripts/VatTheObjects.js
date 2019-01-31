function MyTank_Object(x,y)	// constructor x,y: vị trí x,y được set up nan đầu
{
	this.ColdDownDan=0;	// giá trị 0: đạn sẵng sàng để bắn, khác 0: đan chời thồi gian để bắn đan kế tiêp
	this.Mau=5;		// máu của tank giá trị là 5, máu=0  => xe tank die
	this.Huong=1;	//hướng di chuyển 1:bắc, 2: tây, 3:nam, 4:đông
	this.Dan=undefined;	// undefined: đạn chưa bắn(không xác đinh), dan_object: tank đã bắn đạn và onject đạn được giữ tại đây
	this.X=x;	// vị trí x	
	this.Y=y;	//vị trí y
	//phương thức di chuyển
	this.diChuyen=function (dx,dy,MyTankG_,ETanksO_) // dx,dy: khoảng dx,dy mà tank sẽ di chuyển,MyTankG_,: dồ họa MyTank, ETanksO_: Object các ETanks
	{
		if(this.Huong !=Direction)		// nếu hướng Tank thay đổi, ta xoay xe tăng theo hướng mới
		{
			MyTankG_.mesh.rotation.z += Math.PI*0.5*(Direction-this.Huong);	// cập nhật xoay đồ họa tank
			this.Huong=Direction;											// cập nhật hướng
		}
		if(!vaChamTuong_MyTank(this.X,this.Y,dx,dy) && !vaChamETanks_MyTank(this.X,this.Y,dx,dy,ETanksO_))// thỏa if thì tank mới di chuyển được
		{
			this.X+=dx;	// cập nhật vị trí MyTank Object
			this.Y+=dy;	//
			MyTankG_.mesh.position.x=this.X;	// cập nhật vị trí hiể thị trên đồ họa		
			MyTankG_.mesh.position.y=this.Y;	
		}	
	}
	//phương thức bắn
	this.banDan=function (scene_,MyTankDanG_){	//scene_: tham chiếu đến scene để add đồ họa lên scene, MyTankDanG_: đồ họa viên đạn của MyTank
		if (this.Dan == undefined && this.ColdDownDan==0) // check đạn sẵng sàng để bắn không
		{
			this.ColdDownDan=50;	// nếu đạn được bắn, set thời gian 50 đơn vị để bắn đạn kế tiếp
			var i=traVeLoaiDan(this.Huong);
			var j=traVeChieuDan(this.Huong);
			this.Dan = new VienDan(this.X,this.Y,i,j);// tạo object viên đạn
						
			MyTankDanG_.mesh.position.x=this.Dan.X;		//cập nhật vị trí đồ họa đạn
			MyTankDanG_.mesh.position.y=this.Dan.Y;		//
			scene_.add(MyTankDanG_.mesh);	// add đồ họa đạn vào scene
		}
	}
	this.demColdDown=function(){	// hàm đếm ngược thời gian bắn đạn nếu nó lớn hơn 0
		if(this.ColdDownDan > 0)
			this.ColdDownDan--;
	}	
}
function EnemyTank_Object(x,y,loai,id_)// constructor x,y: vị trí ban đầu, loai: Loại xe tank, id_: số thứ tự của các xe tank
{
	this.ColdDownTimDuong=20;	// giá trị để tank tự động tìm đường mới (trường hợp xe tank đúng im quá lâu)
	this.ColdDownDan=0;			//giá trị 0: đạn sẵng sàng để bắn, khác 0: đan chời thồi gian để bắn đan kế tiêp
	this.LoaiXeTank=loai; 		//	0: chạy Astar1, 1: chay Astart2, 2: chạy random.
	this.ID=id_;				// ID của các xe tank (tên duy nhất)
	this.TimDuong=true;			// trạng thái tìm đường, true: thực hiện hàm tìm đường, false: thực hiện di chuyển
	this.Mau=3;					// máu của xe tank mau=0  => xe tank die
	this.Huong=1;				//hướng di chuyển 1:bắc, 2: tây, 3:nam, 4:đông	
	this.Dan=undefined;			// undefined: đạn chưa bắn(không xác đinh), dan_object: tank đã bắn đạn và onject đạn được giữ tại đây
	this.X=x;					// vị trí x
	this.Y=y;					//vị trí y
	this.DX=0;					//DX: destinationx :tọa độ x tank sẽ đi đến sau khi tìm đường
	this.DY=0;					//DY: destinationy :tọa độ y tank sẽ đi đến sau khi tìm đường
	this.Loai=1;	// 1: tank di chuyển theo trục x, 2: tank di chuyển theo trục y
	this.Chieu=1;	//1: tank di chuyển theo chiều dương,-1: tank di chuyển theo chiều âm
	this.diChuyen=function (MyTank_,ETankO,E_TankG)// object MyTank, object ETanks, đồ họa E_Tank đang xét di chuyển
	{	
		if(this.TimDuong) // nếu tìm đường = true vào trạng thái tìm đường
		{	
			this.X=Math.round(this.X); // làm tròn tọa độ, vì hàm tìm đường chỉ làm việc trên số nguyên
			this.Y=Math.round(this.Y);
			E_TankG.mesh.position.x=this.X;
			E_TankG.mesh.position.y=this.Y;			
			DiemDau=[this.X,this.Y];	// xác các giá trị ban đầu để đưa vào hàm tìm đường
			DiemDau=r2f(DiemDau);
			DiemDich=[Math.round(MyTank_.X),Math.round(MyTank_.Y)];
			DiemDich=r2f(DiemDich);	// chuyển từ tọa độ 3D sang bản đồ 2 chiều
			if(this.LoaiXeTank==0)	// từng loại tank sẽ sử dụng các hàm tìm đường khác nhau (có 3 loại tank)
			{
				duongdi=findPath(world,DiemDau,DiemDich,ETankO,MyTankO);
			}
			else
			{
				if(this.LoaiXeTank==1)
					duongdi=findPath1(world,DiemDau,DiemDich,ETankO,MyTankO);
				else
				{
					duongdi=findPath2(world,DiemDau,DiemDich,ETankO);
				}
			}
			if(duongdi.length!=0) // nếu tìm được đường đi gồm cặp các điểm x,y, đường đi dài ngắn tùy vào số cặp điểm x,y tìm được
			{
				if(duongdi.length!=1)
				{
				duongdi=duongdi[1]; // ta chỉ lấy trạng thái kề với điểm bắt đầu làm đích
				duongdi=f2r(duongdi);
				this.DX=duongdi[0];	// gán đích tìm được
				this.DY=duongdi[1];
				var D=traVeHuongETank(this.X,this.Y,this.DX,this.DY)
				E_TankG.mesh.rotation.z += Math.PI*0.5*(D-this.Huong);// cập nhật đồ họa ETank đang xét (xoay mặt Tank)
				this.Huong=D;
				this.Loai=traVeLoaiDan(this.Huong);
				this.Chieu=traVeChieuDan(this.Huong);
				this.TimDuong=false;	// tìm đường bằng false, vòng lặp sau sẽ đi vào trạng thái di chuyển
				}
			}
		}
		else //vào trạng thái di chuyển
		{
			if(this.Loai==1)	// tank di chuyển theo trục x
			{	
				if(!vaChamTanks_ETanks(this.X +dE*this.Chieu,this.Y,MyTank_,ETankO,this.ID)) //check nếu không va chạm thì mới di chuyển
				{	
					this.X += dE*this.Chieu;		
					E_TankG.mesh.position.x=this.X;
					if(Math.abs(this.X-this.DX)<0.07) //vị trí ETank gần vị trí đích đã gán
					{
						this.TimDuong=true;	// trở về trạng thái tìm đường ở vòng lặp tiếp theo
					}
				}
				else	//va chạm, tank đứng yên, bắt đầu đêm ngược
				{	
					this.ColdDownTimDuong--;
					if(this.ColdDownTimDuong<0)	// giá trị đếm ngược < 0
					{
						this.ColdDownTimDuong=20; // set up lại giá trị
						this.TimDuong=true; // trở về trạng thái tìm đường ở vòng lặp kế tiếp
					}
				}
			}
			else // tank di chuyển theo trục x
			{
				if(!vaChamTanks_ETanks(this.X,this.Y + dE*this.Chieu,MyTank_,ETankO,this.ID))
				{
					this.Y += dE*this.Chieu;
					E_TankG.mesh.position.y=this.Y;
					if(Math.abs(this.Y-this.DY)<0.07)
					{
						this.TimDuong=true;
					}
				}
				else
				{	
					this.ColdDownTimDuong--;
					if(this.ColdDownTimDuong<0)
					{
						this.ColdDownTimDuong=20;
						this.TimDuong=true;
					}
				}
			}
		}
	}		
	this.banDan=function (scene_,ETankDanG_)
	{
		if (this.Dan == undefined && this.ColdDownDan==0) // check đạn sẵng sàng để bắn
		{
			this.ColdDownDan=50;	// setup lại giá trị bắn
			var i=traVeLoaiDan(this.Huong);
			var j=traVeChieuDan(this.Huong);
			this.Dan = new VienDan(this.X,this.Y,i,j);// tạo object viên đạn 
			ETankDanG_.mesh.position.x=this.Dan.X;	// cập nhật đồ họa đạn
			ETankDanG_.mesh.position.y=this.Dan.Y;
			scene_.add(ETankDanG_.mesh);	// thêm đồ họa đạn vào scene	
		}
	}
	this.demColdDown=function()// hàm đếm ngược giá trị bắn đạn
	{
		if(this.ColdDownDan >0)
			this.ColdDownDan--;
	}	
}
function VienDan(x,y,loaidan,chieu)
{
	this.length=100;// chiều dài đạn lúc mới được bắn ra
	this.X=x;		// vị trí đạn x
	this.Y=y;		// vị trí đạn y
	this.LoaiDan=loaidan;	// loai đạn 1: bay theo trục x, 2: bay theo trục y
	this.Chieu=chieu;	// chiều âm hoặc dương
	this.diChuyen = function (VienDanG_) //VienDanG_: graphic của viên đạn sẽ được cập nhật
	{	
		if(this.LoaiDan==1)	// đạn bay theo trục x
		{
			this.X += this.Chieu*speedDan;
			VienDanG_.mesh.position.x=this.X;
			VienDanG_.mesh.rotation.z+=Math.random()*0.3;// đạn xoay ngẫu nhiên
			VienDanG_.mesh.rotation.x+=Math.random()*0.3;
			VienDanG_.mesh.rotation.y+=Math.random()*0.3;
			if(vaChamTuong_Dan(this.X,this.Y))		// check va chạm 
				this.length=-1;					//chiều dài đạn là -1, đạn sẽ bị hủy ở lần lặp kế tiếp trong hàm main
			this.length--;
		}
		else	// đạn bay theo trục y
		{
			this.Y += this.Chieu*speedDan;
			VienDanG_.mesh.position.y=this.Y;
			VienDanG_.mesh.rotation.z+=Math.random()*0.3;
			VienDanG_.mesh.rotation.x+=Math.random()*0.3;
			VienDanG_.mesh.rotation.y+=Math.random()*0.3;
			if(vaChamTuong_Dan(this.X,this.Y))
				this.length=-1;
			this.length--;
		}
	}
}		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		