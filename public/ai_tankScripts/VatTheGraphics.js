//==========Đồ họa các đối tượng di chuyển và điều khiển được=============
// đây là các ohbject  đồ họa chỉ hiển thị khi được cập nhật, không có tác dụng tính toán di chuyển, va chạm...
var MyTank_Graphic=function()	// dồ họa MyTank
{
	this.mesh = new THREE.Object3D();
				
	//tạo thân xe Tank là khối hộp chữ nhật
	var geoThan = new THREE.BoxGeometry( 1, 0.8, 0.20 );
	var matThan = new THREE.MeshPhongMaterial({color:0x2ECC71,shading:THREE.FlatShading});
	var Than= new THREE.Mesh( geoThan, matThan );//Ghép mesh và shader
				
				//tạo bồn lái xe tank là khối cầu
	var geoDinh=new THREE.SphereGeometry( 0.3, 5, 5 );
	var matDinh = new THREE.MeshPhongMaterial({color:0xE74C3C,shading:THREE.FlatShading});
	var Dinh=new THREE.Mesh( geoDinh, matDinh );
	Dinh.position.y+=-0.15;
	Dinh.position.z+=0.25;
				
	//nòn xe tank là khối trụ trụ
	var geoNong=new THREE.CylinderGeometry( 0.1, 0.1, 0.6, 5 );
	var matNong = new THREE.MeshPhongMaterial({color:0xEC7063,shading:THREE.FlatShading});
	var Nong=new THREE.Mesh( geoNong,matNong);
	Nong.position.z +=0.35;
	Nong.position.y +=0.2;
				
	//tạo bánh xe là khố hộp chữ nhật
	var geoBanhXe = new THREE.BoxGeometry( 0.2, 1.01, 0.51 );
	var matBanhXe = new THREE.MeshPhongMaterial({color:0xe63900,shading:THREE.FlatShading});
	var BanhXe1 =new THREE.Mesh( geoBanhXe, matBanhXe);//bánh xe trái
	BanhXe1.position.x+=0.39;
	var BanhXe2 =new THREE.Mesh( geoBanhXe, matBanhXe);//bánh xe phải
	BanhXe2.position.x-=0.39;
	Than.castShadow = true;		// tạo đổ bóng thân xe (các phần khác của xe không tạo dổ bóng, vì để giảm tài nguyên)
	Than.receiveShadow = true;
	//ghép các thành phần lại với nhau
	this.mesh.add(BanhXe1)
	this.mesh.add(BanhXe2)
	this.mesh.add(Nong)
	this.mesh.add(Dinh);
	this.mesh.add(Than);
}	
	//=============Enermy Tank============
var EnermyTank_Graphic=function()	// Dồ họa ETank
{	
	this.mesh = new THREE.Object3D();
	//tạo thân xe Tank là khối hộp chữ nhật
	
	var geoThan = new THREE.BoxGeometry( 1, 0.8, 0.2 );
	var matThan = new THREE.MeshPhongMaterial({color:0xa64dff,shading:THREE.FlatShading});
	var Than= new THREE.Mesh( geoThan, matThan );
	var geoDinh=new THREE.SphereGeometry( 0.3, 5, 5 );
	this.matDinh = new THREE.MeshPhongMaterial({color:0xF1C40F,shading:THREE.FlatShading});
	var Dinh=new THREE.Mesh( geoDinh, this.matDinh );
	Dinh.position.y+=-0.15;
	Dinh.position.z+=0.25;
	var geoNong=new THREE.CylinderGeometry( 0.1, 0.1, 0.6, 5 );
	this.matNong = new THREE.MeshPhongMaterial({color:0xF1C40F,shading:THREE.FlatShading});
	var Nong=new THREE.Mesh( geoNong, this.matNong);
	Nong.position.z +=0.35;
	Nong.position.y +=0.2;
	var geoBanhXe = new THREE.BoxGeometry( 0.2, 1.01, 0.51 );
	var matBanhXe = new THREE.MeshPhongMaterial({color:0xffff00,shading:THREE.FlatShading});
	var BanhXe1 =new THREE.Mesh( geoBanhXe, matBanhXe);
	BanhXe1.position.x+=0.39;
	var BanhXe2 =new THREE.Mesh( geoBanhXe, matBanhXe);
	BanhXe2.position.x-=0.39;
	Than.castShadow = true;
	Than.receiveShadow = true;
	this.mesh.add(BanhXe1)
	this.mesh.add(BanhXe2)
	this.mesh.add(Nong)
	this.mesh.add(Dinh);
	this.mesh.add(Than);
}
var VienDan_Graphic=function()	// đồ họa viên đạn
{
	this.mesh = new THREE.Object3D();
	var geovienDan = new THREE.DodecahedronGeometry( 0.4, 0);	// tạo mesh viên đạn
	this.matvienDan = new THREE.MeshPhongMaterial({color:0xD2B4DE  , shading:THREE.FlatShading});// tạo shader viên đạn
	var dan= new THREE.Mesh( geovienDan,this.matvienDan);				//Ghép mesh và shader
	dan.castShadow = true;		// tạo bóng và đổ bóng viên đạn
	dan.receiveShadow = true;
	this.mesh.add(dan);
}
				
	//====== vật thể nền, ngoại cảnh cho game=======
var tuongGach=function()// đồ họa tườn gạch là khối hộp
{
	this.mesh = new THREE.Object3D();
	var geotuongGach = new THREE.BoxGeometry( 1, 1, 1 );
	this.mattuongGach =new THREE.MeshPhongMaterial({color:0x916c2b, shading:THREE.FlatShading});//màu nâu
	var gach= new THREE.Mesh( geotuongGach,this.mattuongGach );
	gach.castShadow = true;
	gach.receiveShadow = true;
	this.mesh.add(gach);
}
var hangRaoX=function()	// trụ hàng rào nằm ngang
{
	this.mesh = new THREE.Object3D();
	var geoRao = new THREE.CylinderGeometry( 2, 2, 50, 15 );
	var matRao = new THREE.MeshPhongMaterial({color:0xff8000  , shading:THREE.FlatShading});//màu cam
	var Rao= new THREE.Mesh( geoRao, matRao );
		
	Rao.castShadow = true;
	Rao.receiveShadow = true;
	this.mesh.add(Rao)
		
}
var hangRaoY=function() //trụ hàng rào nằm dọc
{
	this.mesh = new THREE.Object3D();
	var geoRao = new THREE.CylinderGeometry( 2, 2, 38, 15 );
	var matRao = new THREE.MeshPhongMaterial({color:0xff8000  , shading:THREE.FlatShading});//màu cam
	var Rao= new THREE.Mesh( geoRao, matRao );	
	Rao.castShadow = true;
	Rao.receiveShadow = true;
	this.mesh.add(Rao)	
}
var nen =function()// nền đất bản đồ
{
	this.mesh = new THREE.Object3D();
	var geonengach = new THREE.BoxGeometry( 31, 21, 1 );
	var matnenGach = new THREE.MeshPhongMaterial({color:0x2E86C1 , shading:THREE.FlatShading});// màu xám
	var nenGach= new THREE.Mesh( geonengach,matnenGach);
	nenGach.castShadow = true;
	nenGach.receiveShadow = true;
	this.mesh.add(nenGach);
}	
				
				
				
				
				
				
				
				
				
				
				
				
				
				