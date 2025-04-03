<template>
   <nav class="navbar">
    <div class="header">
       
    <ul class="menu">
      <a href="" class="logo">
            <img src="/imageicon/phefood.png" alt="">
        </a>
        <li >
            <a href=""><strong>HOME</strong></a>
        </li>
        <li class="introduce">
        <a href="">INTRODUCE</a>
        <ul class="name-menu">
              <li class="row">
                <div class="col-6">
                  <p class="title-header">Cơ bản</p>
                  <ul>
                    <li><a href=""><i class="fa-solid fa-circle-dollar-to-slot"></i> Spot</a></li>
                    <li><a href=""><i class="fa-solid fa-jet-fighter"></i> Margin</a></li>
                    <li><a href="P2P.html"><i class="fa-solid fa-credit-card"></i> P2P</a></li>
                    <li><a href=""><i class="fa-brands fa-paypal"></i> Chuyển đổi & giao dịch lô</a></li>
                  </ul>
                </div>
                <div class="col-6">
                  <p class="title-header">Nâng cao</p>
                  <ul>
                    <li><a href="botGiaoDich.html"><i class="fa-solid fa-robot"></i> Bot giao dịch</a></li>
                    <li><a href="saochepgiaodich.html"><i class="fa-solid fa-copy"></i> Sao chép giao dịch</a></li>
                    <li><a href=""><i class="fa-solid fa-lock"></i> API</a></li>
                  </ul>
                </div>
              </li>
            </ul>         
     </li>
     <li class="servicefood">
        <a href="">SERVICE FOOD</a>
        <ul class="name-menu">
              <li class="row">
                <div class="col-6">
                  <p class="title-header">Món ăn chính</p>
                  <ul>
                    <li><a href=""><i class="fa-solid fa-circle-dollar-to-slot"></i> Spot</a></li>
                    <li><a href=""><i class="fa-solid fa-jet-fighter"></i> Margin</a></li>
                    <li><a href="P2P.html"><i class="fa-solid fa-credit-card"></i> P2P</a></li>
                    <li><a href=""><i class="fa-brands fa-paypal"></i> Chuyển đổi & giao dịch lô</a></li>
                  </ul>
                </div>
                <div class="col-6">
                  <p class="title-header">Nâng cao</p>
                  <ul>
                    <li><a href="botGiaoDich.html"><i class="fa-solid fa-robot"></i> Bot giao dịch</a></li>
                    <li><a href="saochepgiaodich.html"><i class="fa-solid fa-copy"></i> Sao chép giao dịch</a></li>
                    <li><a href=""><i class="fa-solid fa-lock"></i> API</a></li>
                  </ul>
                </div>
              </li>
            </ul>        
     </li>
     <li class="servicefood">
        <a href="">SERVICE FOOD</a>
        <ul class="name-menu">
              <li class="row">
                <div class="col-6">
                  <p class="title-header">Món ăn chính</p>
                  <ul>
                    <li><a href=""><i class="fa-solid fa-circle-dollar-to-slot"></i> Spot</a></li>
                    <li><a href=""><i class="fa-solid fa-jet-fighter"></i> Margin</a></li>
                    <li><a href="P2P.html"><i class="fa-solid fa-credit-card"></i> P2P</a></li>
                    <li><a href=""><i class="fa-brands fa-paypal"></i> Chuyển đổi & giao dịch lô</a></li>
                  </ul>
                </div>
                <div class="col-6">
                  <p class="title-header">Nâng cao</p>
                  <ul>
                    <li><a href="botGiaoDich.html"><i class="fa-solid fa-robot"></i> Bot giao dịch</a></li>
                    <li><a href="saochepgiaodich.html"><i class="fa-solid fa-copy"></i> Sao chép giao dịch</a></li>
                    <li><a href=""><i class="fa-solid fa-lock"></i> API</a></li>
                  </ul>
                </div>
              </li>
            </ul>         
     </li>
     <li class="servicefood">
        <a href="">SERVICE FOOD</a>
        <ul class="name-menu">
              <li class="row">
                <div class="col-6">
                  <p class="title-header">Món ăn chính</p>
                  <ul>
                    <li><a href=""><i class="fa-solid fa-circle-dollar-to-slot"></i> Spot</a></li>
                    <li><a href=""><i class="fa-solid fa-jet-fighter"></i> Margin</a></li>
                    <li><a href="P2P.html"><i class="fa-solid fa-credit-card"></i> P2P</a></li>
                    <li><a href=""><i class="fa-brands fa-paypal"></i> Chuyển đổi & giao dịch lô</a></li>
                  </ul>
                </div>
                <div class="col-6">
                  <p class="title-header">Nâng cao</p>
                  <ul>
                    <li><a href="botGiaoDich.html"><i class="fa-solid fa-robot"></i> Bot giao dịch</a></li>
                    <li><a href="saochepgiaodich.html"><i class="fa-solid fa-copy"></i> Sao chép giao dịch</a></li>
                    <li><a href=""><i class="fa-solid fa-lock"></i> API</a></li>
                  </ul>
                </div>
              </li>
            </ul>          
     </li>
    </ul>
    </div>
   </nav>
   <router-view></router-view>
</template>
<style>
body {
    background-image: url('https://mikazuki.com.vn/vnt_upload/culinary/09_2024/c94793cf_13f3_481d_ba0d_ac7773a785b8.jpeg');
    background-size: cover;
}

.navbar{
    background: rgba(169, 226, 202, 0.7);;
    width: 100%;
    
}
.header{
    position: relative;
    justify-content: space-between;
    
}
.logo{
  align-items: center;
  display: flex;

}
.logo img{
  height: 50px;

}
.menu{
  display: flex;
 
  padding: 0;

}
.menu li {
    display: inline-block; 
    padding: 10px 15px;
}

.name-menu .row{
    width: 100%;
    display: flex;
    width: 300px;
}
.name-menu .col-6{
flex: 1;
padding: 10px;
}

.name-menu{
    display: none;
    position: absolute;
    background: aqua;
    margin-right: 300px;

}
.menu .servicefood:hover > .name-menu{
    display: block;
}
.title-header{
  font-size: 1.1rem;
  font-weight: bold;
  
}
.menu .introduce:hover > .name-menu{
    display: block;
}

</style>