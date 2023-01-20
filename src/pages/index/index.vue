<template>
  <scroll-view
    scroll-x
    box-border
    h-100rpx
    class="bg-[#f7f8fa]"
    flex
    flex-col
    hide-scroll
    fixed
    left-0
    wtop-0
    z-10
  >
    <view
      class="[&>view]:text-40rpx [&>view]:inline-block [&>view]:leading-100rpx [&>view]:px-30rpx"
      whitespace-nowrap
    >
      <view
        v-for="item of navArr"
        :key="item.id"
        :class="item.id === selectedIndex ? 'c-[#31c27c]' : ''"
        @click="selectItem(item.id, item.id)"
      >
        {{ item.classname }}
      </view>
    </view>
  </scroll-view>
  <view
    v-if="newsArr.length"
    p-30rpx
    pt-130rpx
    pb-48px
  >
    <view
      v-for="item of newsArr"
      :key="item.id"
      b-b-1px
      b-b-dotted
      class="b-b-[#efefef]"
      py-20rpx
    >
      <NewsBox
        :prop="item"
      />
    </view>
  </view>
  <view
    v-else
    class="mt-300rpx"
    h-full
    flex
    justify-center
    items-center
  >
    <image
      src="../../static/images/nodata.png"
      mode="widthFix"
      w-360rpx
    />
  </view>
  <view
    text-center
    text-26rpx
    class="c-[#888]"
    leading-2em
  >
    <view v-if="loading === 1">
      数据加载中...
    </view>
    <view v-if="loading === 2">
      没有更多~
    </view>
  </view>
</template>

<script lang="ts" setup>
const selectedIndex = ref('50')
const currentPage = ref(1)
/*
0: 默认
1: 加载中
2: 没有更多了
*/
const loading = ref(0)

//  导航内容
type NavItem = {
  id: string,
  classname: string
}

type NavArr = Array<NavItem> | []

const navArr = ref<NavArr>([])

// 获取导航列表数据
const getNavData = () => {
  uni.request({
    url: 'https://ku.qingnian8.com/dataApi/news/navlist.php',
    success: res => {
      navArr.value = <NavArr>res.data
    }
  })
}

// 新闻列表内容
type NewsItem = {
  author: string,
  classid: string,
  hits: string,
  id: string,
  picurl: string,
  posttime: string,
  title: string
}
type NewsArr = Array<NewsItem> | []

const newsArr = ref<NewsArr>([])

// 获取新闻列表数据
const getNewsData = (id: string = '50') => {
  uni.request({
    url: 'https://ku.qingnian8.com/dataApi/news/newslist.php',
    data: {
      cid: +id,
      page: currentPage.value
    },
    success: res => {
      if ((<NewsArr>res.data).length < 8) {
        loading.value = 2
      }
      newsArr.value = [...newsArr.value, ...(<NewsArr>res.data)]
      // console.log(res.data)
    }
  })
}

//  点击高亮
const selectItem = (index: string, id: string) => {
  selectedIndex.value = index
  currentPage.value = 1
  loading.value = 1
  newsArr.value = []
  getNewsData(id)
}

onLoad(() => {
  getNavData()
  getNewsData()
})

onReachBottom(() => {
  if (loading.value === 2) {
    return
  }
  loading.value = 1
  currentPage.value += 1
  getNewsData()
})
</script>
