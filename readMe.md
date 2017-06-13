

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

```