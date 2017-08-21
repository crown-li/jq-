# jq-carousel
jq轮播图

## 使用

1.引用jq

2.引入carousel.js和index.html里面的css样式并按照里面的html结构进行布局

3.实例化：

```
$('#carousel').Carousel({
  fullScreen:false       // 是否全屏
  flag  : true,          // 是否自动滚动
  speed : 2000,		       // 滚动速度
  isNav : true,          // 是否显示导航
  isPage: true,          // 是否显示翻页
});
```
