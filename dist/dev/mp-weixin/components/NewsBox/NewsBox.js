"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "NewsBox",
  props: {
    prop: { type: Object, required: false, default: () => ({
      title: "\u9ED8\u8BA4\u6807\u9898",
      author: "\u9ED8\u8BA4\u4F5C\u8005",
      hits: 648,
      picurl: "/static/images/nopic.jpg",
      posttime: "2022-12-13 05:13:20",
      classid: "50",
      id: "1"
    }) }
  },
  setup(__props) {
    const props = __props;
    const posttime = common_vendor.computed$1(() => {
      var _a;
      const date = new Date(+props.prop.posttime * 1e3 + 8 * 3600 * 1e3);
      return ((_a = date.toJSON()) == null ? void 0 : _a.substring(0, 19).replace("T", " ")) || props.prop.posttime;
    });
    const redirectDetail = (cid, id) => {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?cid=${cid}&id=${id}`
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return {
        a: props.prop.picurl,
        b: common_vendor.t((_a = props == null ? void 0 : props.prop) == null ? void 0 : _a.title),
        c: common_vendor.t((_b = props == null ? void 0 : props.prop) == null ? void 0 : _b.author),
        d: common_vendor.t((_c = props == null ? void 0 : props.prop) == null ? void 0 : _c.hits),
        e: common_vendor.t(common_vendor.unref(posttime)),
        f: common_vendor.o(($event) => redirectDetail(props.prop.classid, props.prop.id))
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eb5f2948"], ["__file", "C:/Users/ning/Desktop/\u9752\u5E74\u5E2E\u65B0\u95FB/src/components/NewsBox/NewsBox.vue"]]);
wx.createComponent(Component);
