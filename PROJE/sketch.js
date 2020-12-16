var s;
let i,v,yx,yy,yyuk,ygen,ax,ay,ayuk,agen,sx,sy,syuk,sgen,cr=0,cg=0,cb=0,c,saatt,topp,saniye,minuteangle,hourangle;//renk saat classla
let houralarm,minutealarm,saatal,yzl,dakikal;
let tiktok,alarmm;


let controlalarm=false;
let control=true;

function preload(){

tiktok=loadSound("tktk.mp3");       //tiktok mp3
alarmm=loadSound("alarm.mp3");      //alarm mp3


}
function setup() {

createCanvas(800, 800);
  yx=0,yy=0,ax=0,ay=0,sx=0,sy=0;
  syuk=180;
  sgen=1;
  ayuk=90;
  agen=8
  yyuk=180;
  ygen=6;
  cx=width/2;
  cy=height/2;
  saatt=new saat();
  //*********************alarm
  houralarm=createSelect();
  houralarm.position(10,10);       //saat combobox'ı
  houralarm.option('SAAT');
  houralarm.option(1);
  houralarm.option(2);
  houralarm.option(3);
  houralarm.option(4);
  houralarm.option(5);
  houralarm.option(6);
  houralarm.option(7);
  houralarm.option(8);
  houralarm.option(9);
  houralarm.option(10);
  houralarm.option(11);
  houralarm.option(12);

  minutealarm=createInput();     //dakika textbox'ı
  minutealarm.position(65,10);

  button=createButton('Ayarla');
  button.position(140,8);       // alarm ayarlama butonu
  button.mousePressed(alarm);



  textAlign(CENTER, CENTER);
}

function draw() { /////////////////////////////////////////////////////////////
  background(255);

  
  saatt.saat1();   // saat çizimi
  saatt.kollar();  // saat kollarının çizimi

if (control) {
  efekt();         //tiktok ses efekti fonksiyonu
             }


if (saatal==(hour()%12) && dakikal==minute()) {    //eğer şu anki saatin 12 ye modu alarm textbox'ından aldığımız değere eşitse ve dakika textboxundan aldığımız değer şu anki dakikaya eşitse

if (controlalarm==true) {    //alarm kuruluysa
  alarmm.play();             //alarm çalsın
  controlalarm=false;        //alarm kurulu değil resetledik
  h1.innerHTML="Alarm Yok";  //h1 headerımız güncellendi
  h1.style.color="Black";

                        }

                                        } 


                }


function efekt(){
  tiktok.play();           
  control=false;          
  setTimeout(function(){control=true;},1200); //bu fonksiyondaki tiktok efektini 1.2 saniye çalıştır
}




function alarm(){

saatal=houralarm.value();   //alarmın çalınmak istediği saat değerini aldık
dakikal=minutealarm.value(); // alarmın çalınmak istediği dakika değerini aldık

controlalarm=true;           //alarmı aktif ettik
let h1=document.getElementById('h1');
if (!saatal.includes("SAAT")) { //eğer saat inputumuz default olarak atadığımız "SAAT" dışında bir inputsa
  h1.innerHTML="Alarm   "+saatal+":"+dakikal;  //alarm bildirimi koyduk
  h1.style.color="red";
}


}

class saat{

  saat1(){

    //çerçevemiz
    circle(410,390,620);  

    fill("WHITE");
    circle(410,390,600);  //iç çemberimiz
    textSize(36);
    fill("BLACK");

  noStroke()
    push();
    translate(400,400);  //merkez
    fill(44);
  for (i = 0; i < 12; i++) {     
    v = p5.Vector.fromAngle((i + 1) / 12.0 * TAU - HALF_PI);  //i+1 / 12 * 1.5 pi
    v.mult(260); // ve vektörünü skaler çarptık
    textSize(50);  //1 den 12 ye kadar çevredeki sayıların boyutunu belirledik
   
    text(i + 1, (v.x)+10, (v.y)-5); //sayılarımızı iç çemberimizin kenarlarına yerleştiriyoruz
  }
    pop();
    //60 nokta
    push();
    fill("BLACK");
     translate(410,390);
    for (i = 0; i < 60;i++) {
    v = p5.Vector.fromAngle((i + 1) / 60 * TAU - HALF_PI); // aynı 1-12 saati belirten sayılarda yaptığımız gibi dakika ve saniyeyi de gösteren ufak noktalar ekliyoruz saatimize
      if((i+1)%5==0){ 
    v.mult(220);push();           //her 5 noktadan 1 tanesini kırmızı yapıyoruz ki saat ve dakika okuyabilmemiz kolaylaşsın
        fill("RED");
    circle(v.x,v.y,7);
      pop();}
      else{ v.mult(220);
    circle(v.x,v.y,4);
      }

  }
    pop();
  }
  kollar(){

    push();
    translate(410,390);
    rotate(-90);         //şekli push içerisinde -90 derece döndürüyoruz 
   angleMode(DEGREES);   //derece modunda çalışacağız
   let hr = hour();    //güncel bilgisayarımızdaki saat dakika ve saniye değişkenlerini aldık
   let mn = minute();
   let sc = second();

   strokeWeight(8);
   stroke('black');
   noFill();
   let saniye = map(sc, 0, 60, 0, 360); //0-60 aralığında bir değer olan saniyeyi açılar ile çalışacağımız için 0-360 aralığına genişletiyoruz


   stroke(150, 100, 255);
   let minuteAngle = map(mn, 0, 60, 0, 360);


   stroke(150, 255, 100);
   let hourAngle = map(hr % 12, 0, 12, 0, 360);


   push();
   rotate(saniye);   //saniye göstergemizin açısını veriyoruz bilgisayarımızın saniyesi sürekli değişiceğinden açısı da sürekli değişicek ve hareket edicek
   stroke("RED");
   line(0, 0, 230, 0);
   pop();

   push();
   rotate(minuteAngle);
   stroke("BLACK");
   line(0, 0, 200, 0);
   pop();

   push();
   rotate(hourAngle);
   stroke("BLACK");

   line(0, 0, 100, 0);
   pop();

  pop();
  }
}
