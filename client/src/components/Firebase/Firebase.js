import { useEffect } from "react";
import { messaging } from "./config";
import { getToken, onMessage } from "firebase/messaging";
import { getAuth, signInAnonymously } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Firebase() {
  const loguearse = () => {
    signInAnonymously(getAuth())
      .then((usuario) => {
        console.log(usuario);
      })
      .catch((response) => {
        console.log(response);
      });
  };
  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BGEoy1-HeQePhqREXIY3tQcBkXfIFA7XYhAs2sPRpvqnhrclYH0uhA_APfnKBEvd5kNq2KpFJojrx0mn4ztVvJw",
      });
      console.log("Token gen =", token);
    } else if (permission === "denided") {
      alert("you denied for the notification");
    }
  }

  useEffect(() => {
    // loguearse();
    requestPermission();
    onMessage(messaging, (message) => {
      console.log("tu mensaje:", message);
      toast(message.notification.body);
    });
  }, []);

  return (
    <div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Firebase;
