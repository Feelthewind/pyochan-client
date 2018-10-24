export default axios => {
  function urlBase64ToUint8Array(base64String) {
    var padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  if (!("serviceWorker" in navigator)) {
    return;
  }

  var reg;
  navigator.serviceWorker.ready
    .then(function(swreg) {
      reg = swreg;
      return swreg.pushManager.getSubscription();
    })
    .then(function(sub) {
      console.log("sub", sub);
      if (sub === null) {
        // Create a new subscription
        var vapidPublicKey =
          "BNmTh0HBy8K8QEg6XPha2_ufRo_4ixyxrNV-xy3_6cC34yHVq01bIUDabw7JSrC6XxbgMaVMDqWQkI5b8xewJ9E";
        var convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
        return reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidPublicKey
        });
      } else {
        // We have a subscription
      }
    })
    .then(function(newSub) {
      return axios.post("/api/subscription/register", newSub);
    })
    .then(function(res) {
      // if (res.ok) {
      //   displayConfirmNotification();
      // }
    })
    .catch(function(err) {
      console.log(err);
    });
};
