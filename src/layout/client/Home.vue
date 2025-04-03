<template>
    <Header></Header>
    <div class="background">
        <div class="text" style="font-size: 3rem;">Chào Mừng Bạn Đến PHÊ FOOD</div>
        <div class="text" style="font-size: 2rem;">Cùng phê food - ăn quên lối về</div>
        <div class="text" style="font-size: 2rem;">Giá từ <strong style="color: red;">139.000VNĐ / 4 người</strong>
        </div>
    </div>

    <div class="content">
        <div class="col-left">
            <div class="introduce">
                <p>Về chúng tôi </p>
                <img src="/imageicon/phefood.png" alt="">
            </div>

            <p>🌟 Chào mừng đến với Phê food, nơi hội tụ tinh hoa ẩm thực với những món ăn được chế biến tỉ mỉ từ nguyên
                liệu tươi ngon nhất. Không gian sang trọng, cùng cung cách phục vụ tận tâm sẽ mang đến cho thực
                khách những trải nghiệm trọn vẹn, từ những bữa ăn gia đình ấm áp đến những buổi tiệc sang trọng đáng
                nhớ. 🍽️✨</p>
        </div>
        <div class="col-right">
            <img src="/imageicon/pictureintroduce.jpg" alt="">
        </div>
    </div>
    <div class="menu-container">
        <div class="title">
            <p>
                <strong>
                    <i class="fa-solid fa-utensils"></i>Thực Đơn Của Chúng Tôi <i class="fa-solid fa-utensils"></i>

                </strong>
            </p>
        </div>
        
        <div class="menu-card">
            <MenuCard></MenuCard>

        </div>
        
    </div>





    <router-view></router-view>
</template>
<script setup>
import Header from '../../components/Users/Header.vue'
import MenuCard from '../../components/Users/MenuCard.vue';
</script>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html,
body {
    width: 100%;
}

.background {
    width: 100%;
    min-height: 100%;
    background-image: url('https://mikazuki.com.vn/vnt_upload/culinary/09_2024/c94793cf_13f3_481d_ba0d_ac7773a785b8.jpeg');
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 50px 0;
}

.menu-card {
    background: white;
}

.menu-container {
    background: white;
}

.text {
    color: white;
    font-weight: bold;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
    margin-left: 40px;
}

.title p {
    text-align: center;
    font-size: 2rem;
}

.title {
    background: white;
}

.introduce {
    display: flex;
    justify-content: center;
    padding: 10px;

}

.introduce p {
    font-size: 30px;
    font-weight: bold;


}

.introduce img {
    height: 50px;
    margin-right: 10px;
}

.content {
    width: 100%;
    font-size: 1.5rem;

    padding: 50px;
    background: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.content .col-left {
    flex: 40%;
    background: #f0f0f0;
    padding: 20px;
    text-align: center;
}

.content .col-right {
    flex: 60%;
    padding: 20px;
    text-align: center;
}
</style>
