

# 引用

[iisnode](http://www.heeroluo.net/article/detail/118/suffering-from-iisnode)


# API

Server http://localhost/

## （一）产品接口

### 1）获取所有产品
URL `/products/get`

返回实例
```
{"errorCode":1,"errorMessage":"成功","count":0,"datas":[]}
```

### 2）获取所有产品（分页筛选）
URL `/products/getall`


|参数名|必选|类型|说明|
|-------|-------|-------|-------|
|pagesize|no|int|每页数量|
|pageindex|no|int|第几页|
|conditions|no|object| SourceId: 6,Id: [62788, 62772]|
|options|no|object| Id: 1|

```
conditions:
{
    SourceId: 6,
    Id: [62788, 62772]
},
options: {
    Id: 1
}

```

### 3）存数据
URL `/products/insert`
```
{
    "Id": 0,
    "SourceId": 0,
    "ProductId": 0,
    "ProductName": "",
    "PicUrl": "",
    "PicContent": "",
    "Price": "",
    "Url": "",
    "RealPrice":0,
    "Unit": "",
    "InsertDate": new Date(),
    "Updatedate": ""
}
```
### 4）存数据(批量)
URL `/products/insertgroup`

### 5）清空
URL `/products/removeall`

## （二）任务接口

### 1）查询当前任务
URL `/task/get`

```
{"errorCode":1,"errorMessage":"[TASK] get false__9664","JOB":{"Version":"","HasRun":false,"j":null,"InTasking":false,"TaskRemark":""}}
```

### 2) 清空当前任务
URL `/task/cancel`

### 3) 设置当前任务
URL `/task/set`

|参数名|必选|类型|说明|
|-------|-------|-------|-------|
|min|no|int|任务时间 每个小时第几分钟|
|cnt|no|int|URL数|


## （三）產品跟蹤

|参数名|必选|类型|说明|
|-------|-------|-------|-------|
|FollowId|no|int|自增ID |
|Name|no|String|產品名|
|SourceId|no|Number| 來源   5:sx  6:yg |
|SourceName|no|String| 來源   5:sx  6:yg |
|SourceProductNo|no|String| 關聯產品ID|
|Price|no|Number| 價格|
|Unit|no|String| 單位|
|InsertUser|no|String| 執行|
|InsertDate|no|Date| 插入日期|
|Updatedate|no|Date| 更新日期|

### 1）获取所有产品
URL `/follows/get`

返回实例
```
{
    "errorCode": 1,
    "errorMessage": "成功",
    "count": 15,
    "datas": [
        {
            "_id": "5948f024aabc3e398475a921",
            "FollowId": 1,
            "Name": "",
            "SourceId": 5,
            "Price": 666,
            "Unit": "-",
            "InsertUser": "x",
            "InsertDate": "2017-06-20T09:51:32.603Z",
            "Updatedate": null,
            "__v": 0
        }
    ]
}

```

### 2.1）获取所有产品（分页筛选）
URL `/follows/getall`
### 2.1）获取所有产品（source分组）
URL `/follows/getall`

|参数名|必选|类型|说明|
|-------|-------|-------|-------|
|pagesize|no|int|每页数量|
|pageindex|no|int|第几页|
|conditions|no|object| 篩選|
|options|no|object| 排序字段|

```
conditions:
{
    SourceId: 6,
    FollowId: [62788, 62772]
},
options: {
    FollowId: -1
}

```



### 3）新增和更新
URL `/follows/insertOrUpdate`

入參
|参数名|必选|类型|说明|
|-------|-------|-------|-------|
|_id|no|int|標識，有值就更新 沒有就新增數據|


```
{
    "FollowId": "Number",
    "Name": "String",
    "SourceId": "Number",
    "SourceProductNo": "String",
    "Price": "Number",
    "Unit": "String",
    "InsertUser": "String",
    "InsertDate": "Date",
    "Updatedate": "Date"
}
```



### 4）清空
URL `/follows/removeall`



# WEB

```
$.ajax({
        url: "http://localhost:18080/products/getall",
        data: {
            pagesize: 5,
            pageindex: 1,
            conditions: {
                SourceId: 6,
                //Id: [62788, 62772],
                Id:{"$gt":1,"$lte":62788}  
            },
            options: {
                Id: 1
            }
        },
        success: function(res) {
            console.table(res.Datas)
        }
    }
)


$.ajax({
        url: "http://localhost:18080/follows/getall",
        data: {
            pagesize: 5,
            pageindex: 1,
            conditions: {
               FollowId:3
            },
            options: {
                FollowId: -1
            }
        },
        success: function(res) {
            console.table(res.Datas)
        }
    }
)

```


```
insert({
    "InsertUser": "xue",
    "InsertDate": "2017-06-07",
    "SourceId": 5,
    "SourceName": "食行生鲜",
    "Price": 0.99,
    "Unit": "个",
    "Name": "酱油瓶子",
    "FollowId": "1001"
});

insert({
    "InsertUser": "xue",
    "InsertDate": "2017-06-07",
    "SourceId": 6,
    "SourceName": "永辉超市",
    "Price": 1.55,
    "Unit": "个",
    "Name": "酱油瓶子",
    "FollowId": "1001"
});

insert({
    "InsertUser": "xue",
    "InsertDate": "2017-06-08",
    "SourceId": 5,
    "SourceName": "食行生鲜",
    "Price": 1.08,
    "Unit": "个",
    "Name": "酱油瓶子",
    "FollowId": "1001"
});

insert({
    "InsertUser": "xue",
    "InsertDate": "2017-06-08",
    "SourceId": 6,
    "SourceName": "永辉超市",
    "Price": 1.56,
    "Unit": "个",
    "Name": "酱油瓶子",
    "FollowId": "1001"
});

insert({
    "InsertUser": "xue",
    "InsertDate": "2017-06-09",
    "SourceId": 6,
    "SourceName": "永辉超市",
    "Price": 1.57,
    "Unit": "个",
    "Name": "酱油瓶子",
    "FollowId": "1001"
});

/************/


insert({
    "InsertUser": "xue",
    "InsertDate": "2017-06-07",
    "SourceId": 5,
    "SourceName": "食行生鲜",
    "Price": 12.4,
    "Unit": "斤",
    "Name": "韭菜",
    "FollowId": "1002"
});

insert({
    "InsertUser": "xue",
    "InsertDate": "2017-06-07",
    "SourceId": 6,
    "SourceName": "永辉超市",
    "Price": 22.3,
    "Unit": "斤",
    "Name": "韭菜",
    "FollowId": "1002"
});

insert({
    "InsertUser": "xue",
    "InsertDate": "2017-06-08",
    "SourceId": 5,
    "SourceName": "食行生鲜",
    "Price": 11.2,
    "Unit": "斤",
    "Name": "韭菜",
    "FollowId": "1002"
});

insert({
    "InsertUser": "xue",
    "InsertDate": "2017-06-08",
    "SourceId": 6,
    "SourceName": "永辉超市",
    "Price": 13.2,
    "Unit": "斤",
    "Name": "韭菜",
    "FollowId": "1002"
});

insert({
    "InsertUser": "xue",
    "InsertDate": "2017-06-10",
    "SourceId": 6,
    "SourceName": "永辉超市",
    "Price": 11.3,
    "Unit": "斤",
    "Name": "韭菜",
    "FollowId": "1002"
});


insert({
    "InsertUser": "xue",
    "InsertDate": "2017-06-10",
    "SourceId": 6,
    "SourceName": "永辉超市",
    "Price": 77,
    "Unit": "200g",
    "Name": "吐司面包",
    "FollowId": "1003"
});





/**********************************************/





$.ajax({
    url: "http://localhost:18080/follows/getbygroup",
    data: {
      conditions: {
             FollowId: [1001,1002],
        } 
    },
    success: function(res) {
            console.log(res.datas)
        }
    }
)
```