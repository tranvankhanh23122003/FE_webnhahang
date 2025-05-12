<template>
  <div class="app-wrapper">
    
    <div class="app-container">
      <div class="col-left">
        <header>
        <h1>Restaurant Reviews</h1>
        <p>Share your experience by submitting a review with photos!</p>
      </header>
      <main>
        <section class="form-section">
          <form @submit.prevent="submitReview" class="review-form" novalidate>
            <!-- Rating -->
            <div class="form-group rating-group">
              <label>Rating:</label>
              <div class="stars">
                <button v-for="star in 5" :key="star" type="button" :class="{ active: rating >= star }"
                  @click="rating = star" aria-label="Select star rating">
                  ★
                </button>
              </div>
            </div>

            <!-- Dropdown chọn món ăn có ảnh -->
            <div class="form-group">
              <label for="id_food">Food</label>
              <div class="custom-select" @click="toggleDropdown">
                <div class="selected-item">
                  <img
                    v-if="selectedFood"
                    :src="selectedFood.image"
                    alt="Selected food"
                    class="food-icon"
                  />
                  <span>{{ selectedFood ? selectedFood.name : 'Chọn món ăn đánh giá' }}</span>
                </div>
                <ul v-if="isDropdownOpen" class="dropdown-list">
                  <li
                    v-for="food in foodList"
                    :key="food.id"
                    class="dropdown-item"
                    @click.stop="selectFood(food)"
                  >
                    <img :src="food.image" alt="Food image" class="food-icon" />
                    <p>{{ food.name }}</p>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Thêm trường input cho id_customer -->
            <div class="form-group">
              <label for="id_customer">Customer ID</label>
              <input
                type="text"
                id="id_customer"
                v-model="formEvaluation.id_customer"
                placeholder="Enter your customer ID"
                required
              />
            </div>

            <!-- Review Comment -->
            <div class="form-group">
              <label for="detail">Comment</label>
              <textarea id="detail" v-model="formEvaluation.detail" placeholder="Write your review here..." required
                rows="4"></textarea>
            </div>

            <!-- Upload Photos -->
            <div class="form-group">
              <label for="photos">Upload Photos</label>
              <input type="file" id="photos" multiple accept="image/*" @change="handleFileChange" />
              <div class="photo-previews" v-if="photoPreviews.length">
                <div v-for="(photo, index) in photoPreviews" :key="index" class="photo-preview">
                  <img :src="photo" alt="Photo preview" />
                  <button type="button" class="remove-photo" @click="removePhoto(index)" aria-label="Remove photo">
                    ×
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" :disabled="!canSubmit" class="submit-btn">
              {{ isEditing ? 'Update Review' : 'Submit Review' }}
            </button>
          </form>
        </section>

        <section v-if="reviews.length" class="reviews-section">
          <h2>Previous Reviews</h2>
          <ul class="reviews-list">
            <li v-for="(review, index) in reviews" :key="review.id" class="review-item">
              <div class="review-header">
                <div class="review-rating">
                  <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= review.rating }">
                    ★
                  </span>
                </div>
                <time :datetime="review.date">
                  {{ formattedDate(review.date) }}
                </time>
              </div>
              <p class="review-comment">{{ review.detail }}</p>
              <div class="review-photos" v-if="review.photos.length">
                <img v-for="(photo, i) in review.photos" :key="i" :src="photo" alt="Review photo"
                  class="review-photo" />
              </div>
              <div class="review-actions">
                <button @click="editReview(review)">Edit</button>
                <button @click="deleteReview(index)">Delete</button>
              </div>
            </li>
          </ul>
        </section>

        <section v-else class="no-reviews">
          <p>No reviews yet</p>
        </section>
      </main>
      <footer>
        <small>© 2025 Restaurant Reviews</small>
      </footer>
      </div>
   
    
      <div class="col-right">
        <div class="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.663132104762!2d108.15967391020955!3d16.082961439006894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218c30c993543%3A0xec01cc42d8352cff!2zNTIgR2nDoXAgVsSDbiBDxrDGoW5nLCBIb8OgIE1pbmgsIExpw6puIENoaeG7g3UsIMSQw6AgTuG6tW5nIDU1MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1747078025558!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import api from "../../services/api";

// Dữ liệu form đánh giá
const formEvaluation = reactive({
  id_food: "",
  detail: "",
  id_customer: "", // id khách hàng
});

const rating = ref(0);
const photoFiles = ref([]);
const photoPreviews = ref([]);
const reviews = ref([]);
const editingReview = ref(null);
const isDropdownOpen = ref(false);

// Danh sách món ăn mẫu
const foodList = [
  { id: 1, name: 'Cơm Gà', image: 'imageicon/phefood.png' },
  { id: 2, name: 'Bánh Mì', image: 'imageicon/phefood.png' },
  { id: 3, name: 'Phở', image: 'imageicon/phefood.png' },
];

// Computed
const canSubmit = computed(() => {
  return rating.value > 0 && formEvaluation.detail.trim().length > 0;
});

const isEditing = computed(() => editingReview.value !== null);

const selectedFood = computed(() => {
  return foodList.find((f) => f.id === formEvaluation.id_food) || null;
});

// Methods
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function selectFood(food) {
  formEvaluation.id_food = food.id;
  isDropdownOpen.value = false;
}

function handleFileChange(event) {
  const files = Array.from(event.target.files);
  for (const file of files) {
    if (!file.type.startsWith("image/")) continue;
    photoFiles.value.push(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      photoPreviews.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
  event.target.value = null;
}

function removePhoto(index) {
  photoFiles.value.splice(index, 1);
  photoPreviews.value.splice(index, 1);
}

function submitReview() {
  if (!canSubmit.value) return;

  const formData = new FormData();
  formData.append("id_food", formEvaluation.id_food);
  formData.append("star", rating.value);
  formData.append("detail", formEvaluation.detail);
  formData.append("id_customer", formEvaluation.id_customer);

  photoFiles.value.forEach((file) => {
    formData.append("photos[]", file);
  });

  if (isEditing.value) {
    formData.append("_method", "PUT");
    api
      .post(`/client/rates/update/${editingReview.value.id}`, formData)
      .then((response) => {
        const updatedReview = {
          id: editingReview.value.id,
          rating: rating.value,
          detail: formEvaluation.detail,
          photos: photoPreviews.value,
          date: new Date().toISOString(),
          id_food: formEvaluation.id_food,
          id_customer: formEvaluation.id_customer,
        };
        const index = reviews.value.findIndex((r) => r.id === editingReview.value.id);
        reviews.value.splice(index, 1, updatedReview);
        saveReviewsToLocalStorage();
        resetForm();
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật đánh giá:", error);
      });
  } else {
    api
      .post("/client/rates/create", formData)
      .then((response) => {
        const newReview = {
          id: response.data.data.id,
          rating: rating.value,
          detail: formEvaluation.detail,
          photos: photoPreviews.value,
          date: new Date().toISOString(),
          id_food: formEvaluation.id_food,
          id_customer: formEvaluation.id_customer,
        };
        reviews.value.unshift(newReview);
        saveReviewsToLocalStorage();
        resetForm();
      })
      .catch((error) => {
        console.error("Lỗi khi gửi đánh giá:", error);
      });
  }
}

function editReview(review) {
  editingReview.value = review;
  formEvaluation.id_food = review.id_food;
  formEvaluation.detail = review.detail;
  formEvaluation.id_customer = review.id_customer;
  rating.value = review.rating;
  photoPreviews.value = review.photos || [];
  photoFiles.value = [];
}

function deleteReview(index) {
  const review = reviews.value[index];
  if (confirm("Bạn có chắc muốn xóa đánh giá này?")) {
    api
      .delete(`/client/rates/delete/${review.id}`)
      .then(() => {
        reviews.value.splice(index, 1);
        saveReviewsToLocalStorage();
        alert("Đánh giá đã được xóa.");
      })
      .catch((error) => {
        console.error("Lỗi khi xóa đánh giá:", error);
        alert("Không thể xóa đánh giá. Vui lòng thử lại sau.");
      });
  }
}

function formattedDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function resetForm() {
  rating.value = 0;
  formEvaluation.id_food = "";
  formEvaluation.detail = "";
  formEvaluation.id_customer = "1";
  photoFiles.value = [];
  photoPreviews.value = [];
  editingReview.value = null;
}

function saveReviewsToLocalStorage() {
  localStorage.setItem("restaurant_reviews", JSON.stringify(reviews.value));
}

function loadReviewsFromLocalStorage() {
  const saved = localStorage.getItem("restaurant_reviews");
  if (saved) {
    reviews.value = JSON.parse(saved);
  }
}

onMounted(() => {
  loadReviewsFromLocalStorage();
});
</script>



<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap");

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  background: linear-gradient(135deg, #72edf2 10%, #5151e5 100%);
  height: 100vh;
}

.dropdown-list {
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0ff;
}
.food-icon {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 4px;
}

.app-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #143b36;

}

.app-container {
  background: white;
  width: 100%;
  height: 90vh;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

header {
  background: #5151e5;
  color: white;
  padding: 1.2rem 1.5rem;
  text-align: center;
}

main {
  padding: 1rem 1.5rem;
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

footer {
  background: #5151e5;
  color: white;
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  text-align: center;
}

.review-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.stars {
  display: flex;
  gap: 0.3rem;
}

.stars button {
  font-size: 2rem;
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
}

.stars button.active,
.stars button:hover,
.stars button:hover~button {
  color: #ffb400;
}

textarea {
  resize: vertical;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

textarea:focus {
  outline: none;
  border-color: #5151e5;
  box-shadow: 0 0 4px rgba(81, 81, 229, 0.5);
}

.photo-previews {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.6rem;
}

.photo-preview {
  width: 60px;
  height: 60px;
  position: relative;
}

.photo-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.remove-photo {
  position: absolute;
  top: 2px;
  right: 2px;
  background: white;
  border: none;
  border-radius: 50%;
  font-weight: bold;
  cursor: pointer;
  color: red;
  width: 20px;
  height: 20px;
}

.submit-btn {
  background: #5151e5;
  color: white;
  padding: 0.7rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.submit-btn:disabled {
  background: #999;
  cursor: not-allowed;
}

.reviews-section {
  flex-grow: 1;
}

.review-item {
  background: #f0f0ff;
  border-radius: 10px;
  padding: 1rem;
}

.review-rating {
  color: #ffb400;
}

.star.filled {
  color: #ffb400;
}

.review-photo {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 0.5rem;
}

.no-reviews {
  text-align: center;
  color: #555;
  padding: 1rem;
  font-style: italic;
}

.review-actions {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.review-actions button {
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #5151e5;
  color: white;
  font-size: 0.85rem;
}

.review-actions button:hover {
  background: #3c3cce;
}
.col-left{
  width: 40%;
}
.col-right{
  width: 60%;
}

</style>
