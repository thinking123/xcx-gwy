#接口bug 
##你的接口
1. 有获取用户信息的接口，但是数据内容还是不够，没有返回学习计时的id， 获取学习计时是需要id的，学习计时还是没有开始的接口，有暂停，但是没有开始的接口。
![img](./img/1.png)
2.论坛里面获取二级分类不用一级分类的id获取吗，接口应该是有问题的，现在没有id的
![img](./img/2.png)
3.获取城市接口不对，返回的应该是省份，省份下面是城市，现在返回的都是城市
![img](./img/3.png)
4.获取论坛列表的接口还是500 错误
![img](./img/4.png)
```$xslt
Request URL: http://47.104.78.133:8080/api/forum/getForumList?userId=3&pageNum=1

{timestamp: "2019-12-20 16:13:10", status: 500, error: "Internal Server Error", message: "null",…}
error: "Internal Server Error"
message: "null"
path: "/api/forum/getForumList"
status: 500
timestamp: "2019-12-20 16:13:10"
```

