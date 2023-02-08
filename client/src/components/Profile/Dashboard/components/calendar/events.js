import axios from "axios";
import Global from "../../../../../Global";
import Toast from "../../../../Toast/Toast";

export const getEvents = async (setCurrentEvents) => {
  await axios
    .get(Global.URL + "/events")
    .then((response) => {
      setCurrentEvents(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
};
export const createEvent = async (event) => {
  console.log(event);
  let data = null;
  await axios
    .post(Global.URL + "/events", event)
    .then((response) => {
      Toast.fire({ icon: "success", title: "Nuevo evento" });
      data = response.data;
    })
    .catch((e) => {
      console.log(e);
      Toast.fire({
        icon: "error",
        title: "No se agrego el vento! se recomienda llamar al tecnico",
      });
    });
  if (data) return data;
  else return false;
};
export const deleteEvent = async (id) => {
  await axios
    .delete(Global.URL + "/events/" + id)
    .then((response) => {
      Toast.fire({ icon: "success", title: response.data });
    })
    .catch((e) => {
      console.log(e);
      Toast.fire({
        icon: "error",
        title: "No se elimino el evento, se recomienda llamar al tecnico!",
      });
    });
};
