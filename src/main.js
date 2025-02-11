import app from "./config/configApp";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import router from "./routes/protectedRoute";
import store from "@/vuex/store";
import "./static/css/style.css";
// Vue 3rd party plugins
import "@/core/plugins/ant-design";
import "@/core/plugins/fonts";
import "@/core/plugins/maps";
import "@/core/plugins/masonry";
import "@/core/plugins/apexcharts";
import "@/core/plugins/unicons";
import "@/core/components/custom";
import "@/core/components/style";
import "@/i18n/config";



app.config.productionTip = false;


app.use(store);
app.use(router);
app.use(Toast);
app.mount("#app");
