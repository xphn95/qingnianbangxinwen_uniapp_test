"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_NewsBox2 = common_vendor.resolveComponent("NewsBox");
  _easycom_NewsBox2();
}
const _easycom_NewsBox = () => "../../components/NewsBox/NewsBox.js";
if (!Math) {
  _easycom_NewsBox();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const selectedIndex = common_vendor.ref("50");
    const currentPage = common_vendor.ref(1);
    const loading = common_vendor.ref(0);
    const navArr = common_vendor.ref([]);
    const getNavData = () => {
      common_vendor.index.request({
        url: "https://ku.qingnian8.com/dataApi/news/navlist.php",
        success: (res) => {
          navArr.value = res.data;
        }
      });
    };
    const newsArr = common_vendor.ref([]);
    const getNewsData = (id = "50") => {
      common_vendor.index.request({
        url: "https://ku.qingnian8.com/dataApi/news/newslist.php",
        data: {
          cid: +id,
          page: currentPage.value
        },
        success: (res) => {
          if (res.data.length < 8) {
            loading.value = 2;
          }
          newsArr.value = [...newsArr.value, ...res.data];
        }
      });
    };
    const selectItem = (index, id) => {
      selectedIndex.value = index;
      currentPage.value = 1;
      loading.value = 1;
      newsArr.value = [];
      getNewsData(id);
    };
    common_vendor.onLoad(() => {
      getNavData();
      getNewsData();
    });
    common_vendor.onReachBottom(() => {
      if (loading.value === 2) {
        return;
      }
      loading.value = 1;
      currentPage.value += 1;
      getNewsData();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(common_vendor.unref(navArr), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.classname),
            b: item.id,
            c: common_vendor.n(item.id === common_vendor.unref(selectedIndex) ? "uno-b5n0qf" : ""),
            d: common_vendor.o(($event) => selectItem(item.id, item.id), item.id)
          };
        }),
        b: common_vendor.unref(newsArr).length
      }, common_vendor.unref(newsArr).length ? {
        c: common_vendor.f(common_vendor.unref(newsArr), (item, k0, i0) => {
          return {
            a: "83a5a03c-0-" + i0,
            b: common_vendor.p({
              prop: item
            }),
            c: item.id
          };
        })
      } : {}, {
        d: common_vendor.unref(loading) === 1
      }, common_vendor.unref(loading) === 1 ? {} : {}, {
        e: common_vendor.unref(loading) === 2
      }, common_vendor.unref(loading) === 2 ? {} : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-83a5a03c"], ["__file", "C:/Users/ning/Desktop/\u9752\u5E74\u5E2E\u65B0\u95FB/src/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
