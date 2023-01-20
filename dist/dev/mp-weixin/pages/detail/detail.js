"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  props: {
    cid: { type: String, required: true },
    id: { type: String, required: true }
  },
  setup(__props) {
    const props = __props;
    const newsDetail = common_vendor.ref({
      title: "",
      author: "",
      content: "",
      posttime: ""
    });
    const findHistoryIndex = (arr, item) => {
      if (!arr.length) {
        return -1;
      } else {
        return arr.findLastIndex((arrItem) => {
          return arrItem.id === item.id && arrItem.classid === item.classid;
        });
      }
    };
    const saveHistory = (data) => {
      const historyArr = common_vendor.index.getStorageSync("historyArr") || [];
      const { id, classid, title, author, picurl, hits, posttime } = data;
      const usefulData = { id, classid, title, author, picurl, hits, posttime };
      const index = findHistoryIndex(historyArr, usefulData);
      if (index > -1) {
        historyArr.splice(index, 1);
      }
      historyArr.unshift(usefulData);
      common_vendor.index.setStorageSync("historyArr", historyArr);
    };
    const getDetail = () => {
      common_vendor.index.request({
        url: "https://ku.qingnian8.com/dataApi/news/detail.php",
        data: props,
        success: (res) => {
          const data = res.data;
          newsDetail.value = JSON.parse(JSON.stringify(data));
          newsDetail.value.content = newsDetail.value.content.replace("<img", '<img style="max-width: 100%"');
          common_vendor.index.setNavigationBarTitle({
            title: newsDetail.value.title
          });
          saveHistory(data);
        }
      });
    };
    getDetail();
    const posttime_ = common_vendor.computed$1(() => {
      var _a;
      const date = new Date(+((_a = newsDetail.value) == null ? void 0 : _a.posttime) * 1e3 + 8 * 3600 * 1e3);
      return date.toJSON().substring(0, 19).replace("T", " ");
    });
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return {
        a: common_vendor.t((_a = common_vendor.unref(newsDetail)) == null ? void 0 : _a.title),
        b: common_vendor.t((_b = common_vendor.unref(newsDetail)) == null ? void 0 : _b.author),
        c: common_vendor.t(common_vendor.unref(posttime_)),
        d: (_c = common_vendor.unref(newsDetail)) == null ? void 0 : _c.content
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9cb6f745"], ["__file", "C:/Users/ning/Desktop/\u9752\u5E74\u5E2E\u65B0\u95FB/src/pages/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
