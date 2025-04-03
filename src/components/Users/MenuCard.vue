<template>
    <div class="container">
        <div class="card-food">
            <div>
                <ul class="list-food">
                    <li>
                        <a href="">
                            <div class="food-item">
                                <img src="/imageicon/laukimchi.png" alt="">
                                <div class="food-info">
                                    <div class="name-food"><strong> Món Khai Vị</strong></div>
                                    <p class="detail">
                                        Bảng giá chi tiết cho từng món
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <div class="food-item">
                                <img src="/imageicon/lauthai.png" alt="">
                                <div class="food-info">
                                    <div class="name-food"><strong> Món Chính</strong></div>
                                    <p class="detail">
                                        Bảng giá chi tiết cho từng món
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <div class="food-item">
                                <img src="/imageicon/lautuxuyen.png" alt="">
                                <div class="food-info">
                                    <div class="name-food"><strong> Món Tráng Miệng</strong></div>
                                    <p class="detail">
                                        Bảng giá chi tiết cho từng món
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <div class="food-item">
                                <img src="/imageicon/lautuxuyen.png" alt="">
                                <div class="food-info">
                                    <div class="name-food"><strong> Các Đồ Uống </strong></div>
                                    <p class="detail">
                                        Bảng giá chi tiết cho từng món
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <div class="food-item">
                                <img src="/imageicon/lautuxuyen.png" alt="">
                                <div class="food-info">
                                    <div class="name-food"><strong> Các Món Pizza</strong></div>
                                    <p class="detail">
                                        Bảng giá chi tiết cho từng món
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <div class="food-item">
                                <img src="/imageicon/lautuxuyen.png" alt="">
                                <div class="food-info">
                                    <div class="name-food"><strong> Các Món Lẩu</strong></div>
                                    <p class="detail">
                                        Bảng giá chi tiết cho từng món
                                    </p>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="title">
            <p>
                <strong>
                    <i class="fa-solid fa-utensils"></i>Thực Đơn Của Chúng Tôi <i class="fa-solid fa-utensils"></i>

                </strong>
            </p>
        </div>
        
        <div class="container-fluid">
            <div class="food-grid">
                <div class="food-card">
                    <img src="/imageicon/bunbo.png" alt="">
            <div class="info-food">
<div class="food-name">Bún Bò</div>
<div class="food-price"><strong>20.00VNĐ</strong></div>
            </div>
                </div>
                <div class="food-card">
                    <img src="/imageicon/bunbo.png" alt="">
            <div class="info-food">
<div class="food-name">Bún Bò</div>
<div class="food-price"><strong>20.00VNĐ</strong></div>

            </div>
                </div>
                <div class="food-card">
                    <img src="/imageicon/bunbo.png" alt="">
            <div class="info-food">
<div class="food-name">Bún Bò</div>
<div class="food-price"><strong>20.00VNĐ</strong></div>

            </div>
                </div>
            
        </div>
      
        </div>
     
    </div>
    <router-view></router-view>
</template>
<script setup>
</script>
<style>
.title{
    margin-top: 30px;
}
.container {
    max-width: 1200px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 15px;
    padding-right: 15px;
}
.container-fluid {
    max-width: 1200px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 30px;
    padding-right: 30px;
}
.card-food {
    margin-top: 20px;
    display: flex;

}
.name-food{
    white-space: nowrap; 
}

.list-food {
    display: flex;
    gap: 130px;
    flex-wrap: wrap;

}
.detail {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5); /* Lớp nền tối nhẹ */
    color: white;
    font-size: 1.5rem;
    text-align: center;
    padding: 10px;

    opacity: 0;
    transform: translateY(30px); /* Ban đầu đẩy xuống 30px */
    transition: transform 0.4s ease-out, opacity 0.4s ease-out;
}

/* Khi hover vào food-item, chữ sẽ đi từ dưới lên */
.food-item:hover .detail {
    opacity: 1;
    transform: translateY(0);
}

.food-item {
    border: 1px solid black;
    width: 300px;
    height: 330px;
    text-align: center;
    position: relative;
}
.food-card{
    border: 1px solid red;
    border-radius: 8px;
    text-align: center;
    width: 300px;
    padding: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ; 
margin: 30px;
}
.food-grid{
justify-content: center;
 
    display: flex;
    
}
.food-item img {
    width: 100%;
    height: 100%;
}
.food-item::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.5));

}
 /* .food-item:hover{
    transform: scale(1.1);
    cursor: pointer;

 } */

.food-info {
    position: absolute;
    top: 50%;
    transform: translate(-50%);
    left: 50%;
    color: white;
    font-size: 1.5rem;
    max-width: 90%;
    padding: 0 10px;
    word-wrap: break-word;
}

.food-info p {
    margin: 0;
}

</style>