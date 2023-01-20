"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_NewsBox2 = common_vendor.resolveComponent("NewsBox");
  _easycom_NewsBox2();
}
const _easycom_NewsBox = () => "../../components/NewsBox/NewsBox.js";
if (!Math) {
  _easycom_NewsBox();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "user",
  setup(__props) {
    const listArr = common_vendor.ref([]);
    const getData = () => {
      const historyArr = common_vendor.index.getStorageSync("historyArr") || [];
      listArr.value = historyArr;
    };
    common_vendor.onShow(() => {
      getData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listArr), (item, k0, i0) => {
          return {
            a: "99b0ba47-0-" + i0,
            b: common_vendor.p({
              prop: item
            }),
            c: item.id
          };
        }),
        b: common_assets._imports_0,
        c: common_vendor.unref(listArr).length === 0
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-99b0ba47"], ["__file", "C:/Users/ning/Desktop/\u9752\u5E74\u5E2E\u65B0\u95FB/src/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
