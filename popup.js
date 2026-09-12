function render(payload) {
  const contentEl = document.getElementById("content");
  const timeEl = document.getElementById("time");
  const refreshBtn = document.getElementById("refreshBtn");

  if (!payload) {
    contentEl.className = "skeleton";
    contentEl.textContent = "...";
    timeEl.textContent = "";
    return;
  }

  if (!payload.ok) {
    contentEl.className = "error";
    contentEl.textContent = "قیمت در دسترس نیست";
    timeEl.textContent = "";
    return;
  }

  contentEl.className = "price";

  contentEl.innerHTML = `
    ${payload.latestToman.toLocaleString("fa-IR")}
    <span class="unit">تومان</span>
  `;

  const time = new Date(payload.updatedAt).toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  timeEl.textContent = `به‌روزرسانی ${time}`;

  if (refreshBtn) {
    refreshBtn.textContent = "🔄 بروزرسانی";
    refreshBtn.disabled = false;
  }
}


// نمایش آخرین قیمت ذخیره شده
chrome.storage.local.get("nobitexUsdt", (res) => {
  render(res.nobitexUsdt);
});


// گرفتن قیمت جدید هنگام باز شدن Popup
chrome.runtime.sendMessage(
  { type: "REQUEST_FETCH" },
  (payload) => {

    if (chrome.runtime.lastError) return;

    render(payload);
  }
);


// گوش دادن به تغییر قیمت
chrome.storage.onChanged.addListener((changes) => {

  if (changes.nobitexUsdt) {
    render(changes.nobitexUsdt.newValue);
  }

});


// دکمه بروزرسانی دستی
document.addEventListener("DOMContentLoaded", () => {

  const refreshBtn = document.getElementById("refreshBtn");

  if (!refreshBtn) return;


  refreshBtn.addEventListener("click", () => {

    refreshBtn.disabled = true;
    refreshBtn.textContent = "⏳ در حال بروزرسانی...";


    chrome.runtime.sendMessage(
      { type: "REQUEST_FETCH" },
      (payload) => {

        if (chrome.runtime.lastError) {

          refreshBtn.textContent = "❌ خطا";
          refreshBtn.disabled = false;
          return;

        }


        render(payload);

      }
    );

  });

});