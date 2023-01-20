<script lang="ts" setup>
interface Query {
  cid: string,
  id: string
}

const props = defineProps<Query>()

interface NewsDetail {
  title: string,
  author: string,
  content: string,
  posttime: string,
  [k: string]: string
}

const newsDetail = ref<NewsDetail>({
  title: '',
  author: '',
  content: '',
  posttime: ''
})

interface SaveData {
  id: string,
  classid: string,
  title: string,
  author: string,
  picurl: string,
  hits: string,
  posttime: string
  [k: string]: string
}

const findHistoryIndex = (arr: Array<SaveData> | [], item: SaveData) => {
  if (!arr.length) {
    return -1
  } else {
    return arr.findLastIndex(arrItem => {
      return arrItem.id === item.id && arrItem.classid === item.classid
    })
  }
}

const saveHistory = (data: SaveData) => {
  const historyArr = uni.getStorageSync('historyArr') || []
  const { id, classid, title, author, picurl, hits, posttime } = data
  const usefulData = { id, classid, title, author, picurl, hits, posttime }
  const index = findHistoryIndex(historyArr, usefulData)
  if (index > -1) {
    historyArr.splice(index, 1)
  }
  historyArr.unshift(usefulData)
  uni.setStorageSync('historyArr', historyArr)
}

const getDetail = () => {
  uni.request({
    url: 'https://ku.qingnian8.com/dataApi/news/detail.php',
    data: props,
    success: res => {
      const data = <SaveData>res.data
      newsDetail.value = JSON.parse(JSON.stringify(data))
      newsDetail.value.content = newsDetail.value.content.replace('<img', '<img style="max-width: 100%"')
      uni.setNavigationBarTitle({
        title: newsDetail.value.title
      })
      saveHistory(data)
    }
  })
}

getDetail()

const posttime_ = computed(() => {
  const date = new Date((+newsDetail.value?.posttime) * 1e3 + 8 * 3600 * 1e3)
  return date.toJSON().substring(0, 19).replace('T', ' ')
})
</script>

<template>
  <view
    p-30rpx
  >
    <view
      text-46rpx
      class="c-[#333]"
    >
      {{ newsDetail?.title }}
    </view>
    <view
      class="bg-[#f6f6f6] c-[#666]"
      p-20rpx
      my-40rpx
      text-25rpx
      flex
      justify-between
    >
      <view>编辑: {{ newsDetail?.author }}</view>
      <view>{{ posttime_ }}</view>
    </view>
    <view
      pb-50rpx
      rich-text-fit-img
    >
      <rich-text :nodes="newsDetail?.content" />
    </view>
    <view
      class="bg-[#fef0f0] c-[#f89898] leading-[1.8em]"
      text-26rpx
      p-20rpx
    >
      声明: 本站的内容均采集于腾讯新闻, 如果侵权请联系管理(423478357@qq.com)进行整改删除, 本站进行了内容采集不代表本站的及作者观点, 若有侵犯请及时联系管理员, 谢谢您的支持.
    </view>
  </view>
</template>
