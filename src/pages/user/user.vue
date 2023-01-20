<script setup lang="ts">
interface ListItem {
  id: string,
  classid: string,
  title: string,
  author: string,
  picurl: string,
  hits: string,
  [k: string]: string
}

const listArr = ref<Array<ListItem>>([])

const getData = () => {
  const historyArr = uni.getStorageSync('historyArr') || []
  listArr.value = historyArr
}

onShow(() => {
  getData()
})
</script>

<template>
  <view>
    <view
      py-50rpx
      class="bg-[#f8f8f8] c-[#666]"
      flex="~ col"
      justify-center
      items-center
    >
      <image
        src="../../static/images/history.png"
        w-150rpx
        h-150rpx
        mb-20rpx
      />
      <text
        text-38rpx
      >
        浏览历史
      </text>
    </view>
  </view>
  <view
    p-30rpx
  >
    <view
      v-for="item of listArr"
      :key="item.id"
      b-b-1px
      b-b-dotted
      class="b-b-[#efefef]"
      py-20rpx
    >
      <NewsBox :prop="item" />
      <view>{{ listArr }}</view>
    </view>
    <view v-show="listArr.length === 0">
      <view
        flex="~ col"
        justify-center
        items-center
      >
        <image
          src="@/static/images/nohis.png"
          mode="widthFix"
          w-450rpx
        />
        <view
          text-26rpx
          class="c-[#888]"
        >
          暂无浏览记录
        </view>
      </view>
    </view>
  </view>
</template>
