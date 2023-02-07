import axios from "axios";
import Global from "../../../../../Global";
import Toast from "../../../../Toast/Toast";

export const getSeries = async (productId, setSeries) => {
  await axios
    .get(`${Global.URL}/series/${productId}`)
    .then((response) => {
      console.log(response.data);
      setSeries(response.data);
    })
    .catch((e) => {
      console.log(e);
      Toast.fire({
        icon: "warning",
        title: "No hay series con el producto seleccionado!",
      });
    });
};
export const deleteSerie = async (serieId) => {
  await axios.delete(`${Global.URL}/series/${serieId}`).then((response) => {
    Toast.fire({
      icon: "success",
      title: `Serie: ${serieId} eliminada correctamente!`,
    }).catch((e) => {
      console.log(e);
      Toast.fire({
        icon: "warning",
        title: "No se elimino la serie, se recomienda llamar al tecnico",
      });
    });
  });
};
export const restoreSerie = async (serieId) => {
  await axios
    .put(`${Global.URL}/series/restore/${serieId}`)
    .then((response) => {
      Toast.fire({
        icon: "success",
        title: `Serie: ${serieId} recuperada correctamente!`,
      }).catch((e) => {
        console.log(e);
        Toast.fire({
          icon: "warning",
          title:
            "No se ha recuperado la serie, se recomienda llamar al tecnico",
        });
      });
    });
};
