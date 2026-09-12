const ALARM_NAME = "price-fetch";

let arzdigitalWS = null;


// تبدیل و نمایش Badge
function updateBadge(payload) {

  if (!payload?.latestToman) return;

  const thousands = (payload.latestToman / 1000).toFixed(1);

  chrome.action.setBadgeText({
    text: thousands
  });

  chrome.action.setBadgeBackgroundColor({
    color: "#059669"
  });

  chrome.action.setTitle({
    title:
      `USDT: ${payload.latestToman.toLocaleString("fa-IR")} تومان (${payload.source})`
  });

}


// اتصال WebSocket ارزدیجیتال
function connectArzDigitalWS() {

  if (arzdigitalWS) return;


  arzdigitalWS = new WebSocket(
    "wss://ws.arzdigital.com/connection/websocket"
  );


  arzdigitalWS.onopen = () => {

    console.log("ArzDigital WS Connected");


    arzdigitalWS.send(JSON.stringify({
      connect: {
        name: "js"
      },
      id: 1
    }));


    arzdigitalWS.send(JSON.stringify({
      subscribe: {
        channel: "price:812"
      },
      id: 2
    }));

  };


  arzdigitalWS.onmessage = async (event) => {

    try {

      const msg = JSON.parse(event.data);


      const price =
        msg?.push?.pub?.data?.pirt;


      if (!price) return;


      const payload = {

        ok: true,

        source: "ArzDigital",

        latestToman:
          Math.round(Number(price)),

        updatedAt:
          Date.now()

      };


      await chrome.storage.local.set({
        nobitexUsdt: payload
      });


      updateBadge(payload);


    } catch (error) {

      console.log(
        "WS Parse Error:",
        error
      );

    }

  };


  arzdigitalWS.onerror = (error) => {

    console.log(
      "WebSocket Error",
      error
    );

    arzdigitalWS.close();

  };


  arzdigitalWS.onclose = () => {

    console.log(
      "WS Closed - reconnecting..."
    );


    arzdigitalWS = null;


    setTimeout(() => {

      connectArzDigitalWS();

    }, 3000);

  };

}



// درخواست دستی از Popup
chrome.runtime.onMessage.addListener(
  (msg, sender, sendResponse) => {


    if (msg?.type === "REQUEST_FETCH") {


      chrome.storage.local.get(
        "nobitexUsdt",
        (res) => {

          sendResponse(
            res.nobitexUsdt || null
          );

        }
      );


      return true;

    }

  }
);




// نصب اکستنشن
chrome.runtime.onInstalled.addListener(() => {


  chrome.alarms.create(
    ALARM_NAME,
    {
      periodInMinutes: 5
    }
  );


  connectArzDigitalWS();


});



// باز شدن مرورگر
chrome.runtime.onStartup.addListener(() => {

  connectArzDigitalWS();

});



// در صورت بیدار شدن Service Worker
connectArzDigitalWS();