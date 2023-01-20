<script setup lang="ts">
type Prop = {
  title: string,
  author: string,
  hits: number,
  picurl: string,
  posttime: string,
  classid: string,
  id: string
}

interface Props {
  prop?: Prop
}

const props = withDefaults(defineProps<Props>(), {
  prop: () => ({
    title: '默认标题',
    author: '默认作者',
    hits: 648,
    picurl: '/static/images/nopic.jpg',
    posttime: '2022-12-13 05:13:20',
    classid: '50',
    id: '1'
  })
})

const posttime = computed(() => {
  const date = new Date((+props.prop.posttime) * 1000 + 8 * 3600 * 1000)
  return date.toJSON()?.substring(0, 19).replace('T', ' ') || props.prop.posttime
})

const redirectDetail = (cid: string, id: string) => {
  uni.navigateTo({
    url: `/pages/detail/detail?cid=${cid}&id=${id}`
  })
}
</script>

<template>
  <view
    flex
    @click="redirectDetail(props.prop.classid, props.prop.id)"
  >
    <view
      w-230rpx
      h-160rpx
    >
      <image
        :src="props.prop.picurl"
        w-full
        h-full
        mode="aspectFill"
      />
    </view>
    <view
      flex-1
      pl-20rpx
      flex="~ col"
      justify-between
    >
      <view
        text-38rpx
        class="c-[#333]"
        cut-text-2
      >
        {{ props?.prop?.title }}
      </view>
      <view
        text-26rpx
        class="c-[#999] [&>text]:pr-30rpx"
      >
        <text>{{ props?.prop?.author }}</text>
        <text>{{ props?.prop?.hits }}浏览</text>
      </view>
      <view
        text-26rpx
        class="c-[#999] [&>text]:pr-30rpx"
      >
        <text>发布时间: {{ posttime }}</text>
      </view>
    </view>
  </view>
</template>
