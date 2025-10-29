const API_KEY = "ef6a52e75c7843cfbf0183720252610";
const cardsContainer = document.getElementById("cards");
const statusDiv = document.getElementById("status");
const findBtn = document.getElementById("findBtn");
const cityInput = document.getElementById("cityInput");

//   دالة عرض بيانات الطقس
async function getWeather(city = "Cairo") {
  try {
    statusDiv.innerHTML = `<p style="color:white;">Loading weather...</p>`;

    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3`
    );
    const data = await res.json();

    // لو الـ API رجّع خطأ
    if (!data.location) {
      statusDiv.innerHTML = `<p style="color:red;">City not found </p>`;
      cardsContainer.innerHTML = "";
      return;
    }

    //   عرض المدينة والبلد في العنوان  ي
    statusDiv.innerHTML = `
      <h2 style="color:#06b6d4; margin-bottom:10px;">
        🌍 Current Location: <span style="color:white;">${data.location.name}, ${data.location.country}</span>
      </h2>
    `;

    // تنظيف الكروت القديمة
    cardsContainer.innerHTML = "";

    //  إنشاء كروت الأيام الثلاثة
    data.forecast.forecastday.forEach((day, index) => {
      const date = new Date(day.date);
      const dayName =
        index === 0
          ? "Today"
          : date.toLocaleDateString("en-US", { weekday: "long" });

      const card = document.createElement("div");
      card.classList.add("card", "day-card");
       card.innerHTML = `
        <div class="day-name">${dayName}</div>
        <div class="icon">
          <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
        </div>
        <div class="day-temp">${day.day.avgtemp_c}°C</div>
        <div class="desc">${day.day.condition.text}</div>
        <p>💨 Wind: ${day.day.maxwind_kph} km/h</p>
        <p>🌧️ Rain Chance: ${day.day.daily_chance_of_rain}%</p>
      `;
      cardsContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    statusDiv.innerHTML = `<p style="color:red;">Error loading weather ❗</p>`;
  }
}
 //  دالة لتحديد الموقع تلقائيًا بدون إذن المستخدم
async function getWeatherByLocation() {
  try {
    // نستخدم API لتحديد المدينة من الـ IP بدون إذن
    const locRes = await fetch("https://ipapi.co/json/");
    const locData = await locRes.json();

    const city = locData.city || "Cairo"; // لو معرفش يجيب المدينة نحط القاهرة
    getWeather(city);
  } catch (error) {
    // في حالة فشل API نستخدم القاهرة كخيار افتراضي
    getWeather("Cairo");
  }
}
//  تحميل الطقس عند فتح الصفحة
window.addEventListener("DOMContentLoaded", () => {
  getWeatherByLocation();
});

//   البحث اليدوي
findBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }
  getWeather(city);
});
