/**
 * mongoose操作类(封装mongodb)
 */

var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var logger = {
    error: function(e) {
        console.log("[DB]=" + e)
    },
    info: function(e) {
        console.log("[DB]=" + e)
    },
    warn: function(e) {
        console.log("[DB]=" + e)
    },
}

var options = {
    db_user: "",
    db_pwd: "",
    db_host: "",
    db_port: 0,
    db_name: ""
};
if (!!process.env && !!process.env.NODE_ENV && process.env.NODE_ENV === 'dev') {
    console.log("dev start")
    options = {
        db_user: "",
        db_pwd: "",
        db_host: "localhost",
        db_port: 27017,
        db_name: "test"
    };
} else {
    console.log("prod start")
    options = {
        db_user: "e4bce76fc5b64cfca0337e7501a71c7a",
        db_pwd: "116a429d58cf4fa094103015ea69ddc8",
        db_host: "mongo.duapp.com",
        db_port: 8908,
        db_name: "kfHpRGvfdxTyCpraUPjY"
    };
    // options = {
    //     db_user: "",
    //     db_pwd: "",
    //     db_host: "127.0.0.1",
    //     db_port: 27019,
    //     db_name: "test"
    // };
}


global.MongoConnected = false;

mongoose.Promise = global.Promise;

var dbURL = "mongodb://" + options.db_user + ":" + options.db_pwd + "@" + options.db_host + ":" + options.db_port + "/" + options.db_name;
mongoose.connect(dbURL);

mongoose.connection.on('connected', function(err) {
    if (err) {
        logger.error('Database connection failure');
        global.MongoConnected = false;
    } else {
        logger.error('Mongoose Connected Success');
        global.MongoConnected = true;
    }
});

mongoose.connection.on('error', function(err) {

    logger.error('Mongoose connected error ' + err);

});

mongoose.connection.on('disconnected', function() {
    // mongoose.connect(dbURL);
    logger.error('Mongoose disconnected');
    global.MongoConnected = false;
    startTask();
});

var hastask = false;

function startTask() {
    if (hastask) {
        // logger.error('Mongoose has already task');
        return
    }
    hastask = true;
    // logger.error('Mongoose set task');
    setTimeout(function() {
        hastask = false;
        logger.error('Mongoose Try Connect Again');
        mongoose.connect(dbURL);
    },10000)


}


process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        logger.info('Mongoose Exit');
        process.exit(0);
    });
});

var DB = function() {
    this.mongoClient = {};
    var filename = 'database/table.js';
    this.tabConf = JSON.parse(fs.readFileSync(filename));
};

/**
 * 初始化mongoose model
 * @param table_name 表名称(集合名称)
 */
DB.prototype.getConnection = function(table_name) {

    if (!table_name) return;
    if (!this.tabConf[table_name]) {
        logger.error('No table structure');
        return false;
    }
    // console.log(111,mongoose)
    var client = this.mongoClient[table_name];
    if (!client) {
        //构建用户信息表结构
        var nodeSchema = new mongoose.Schema(this.tabConf[table_name]);

        //构建model
        client = mongoose.model(table_name, nodeSchema, table_name);

        this.mongoClient[table_name] = client;
    }
    return client;
};

/**
 * 保存数据
 * @param table_name 表名
 * @param fields 表数据
 * @param callback 回调方法
 */
DB.prototype.save = function(table_name, fields, callback) {
    if (!fields) {
        if (callback) callback({
            msg: 'Field is not allowed for null'
        });
        return false;
    }

    var err_num = 0;
    for (var i in fields) {
        if (!this.tabConf[table_name][i]) err_num++;
    }
    if (err_num > 0) {
        if (callback) callback({
            msg: 'Wrong field name'
        });
        return false;
    }


    if (!global.MongoConnected) {
        logger.error('Mongoose is disconnected');
        callback('Mongoose is disconnected')
        return;
    }


    var node_model = this.getConnection(table_name);
    if (!node_model) callback("No table structure");
    var mongooseEntity = new node_model(fields);
    mongooseEntity.save(function(err, res) {
        if (err) {
            if (callback) callback(err);
        } else {
            if (callback) callback(null, res);
        }
    });
};

/**
 * 更新数据
 * @param table_name 表名
 * @param conditions 更新需要的条件 {_id: id, user_name: name}
 * @param update_fields 要更新的字段 {age: 21, sex: 1}
 * @param callback 回调方法
 */
DB.prototype.update = function(table_name, conditions, update_fields, callback) {
    if (!update_fields || !conditions) {
        if (callback) callback({
            msg: 'Parameter error'
        });
        return;
    }

    if (!global.MongoConnected) {
        logger.error('Mongoose is disconnected');
        callback('Mongoose is disconnected')
        return;
    }

    var node_model = this.getConnection(table_name);
    if (!node_model) callback("No table structure");
    node_model.update(conditions, {
        $set: update_fields
    }, {
        multi: true,
        upsert: true
    }, function(err, res) {
        if (err) {
            if (callback) callback(err);
        } else {
            if (callback) callback(null, res);
        }
    });
};

/**
 * 更新数据方法(带操作符的)
 * @param table_name 数据表名
 * @param conditions 更新条件 {_id: id, user_name: name}
 * @param update_fields 更新的操作符 {$set: {id: 123}}
 * @param callback 回调方法
 */
DB.prototype.updateData = function(table_name, conditions, update_fields, callback) {
    if (!update_fields || !conditions) {
        if (callback) callback({
            msg: 'Parameter error'
        });
        return;
    }
    if (!global.MongoConnected) {
        logger.error('Mongoose is disconnected');
        callback('Mongoose is disconnected')
        return;
    }

    var node_model = this.getConnection(table_name);
    if (!node_model) callback("No table structure");

    node_model.findOneAndUpdate(conditions, update_fields, {
        multi: true,
        upsert: true
    }, function(err, data) {
        if (callback) callback(err, data);
    });
};

/**
 * 删除数据
 * @param table_name 表名
 * @param conditions 删除需要的条件 {_id: id}
 * @param callback 回调方法
 */
DB.prototype.remove = function(table_name, conditions, callback) {

    if (!global.MongoConnected) {
        logger.error('Mongoose is disconnected');
        callback('Mongoose is disconnected')
        return;
    }

    var node_model = this.getConnection(table_name);
    node_model.remove(conditions, function(err, res) {
        if (err) {
            if (callback) callback(err);
        } else {
            if (callback) callback(null, res);
        }
    });
};

/**
 * 查询数据
 * @param table_name 表名
 * @param conditions 查询条件
 * @param fields 待返回字段
 * @param callback 回调方法
 */
DB.prototype.find = function(table_name, conditions, fields, callback) {

    if (!global.MongoConnected) {
        logger.error('Mongoose is disconnected');
        callback('Mongoose is disconnected')
        return;
    }

    var node_model = this.getConnection(table_name);
    if (!node_model) callback("No table structure");
    node_model.find(conditions, fields || null, {}, function(err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * 查询单条数据
 * @param table_name 表名
 * @param conditions 查询条件
 * @param callback 回调方法
 */
DB.prototype.findOne = function(table_name, conditions, callback) {

    if (!global.MongoConnected) {
        logger.error('Mongoose is disconnected');
        callback('Mongoose is disconnected')
        return;
    }

    var node_model = this.getConnection(table_name);
    if (!node_model) callback("No table structure");
    node_model.findOne(conditions, function(err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * 根据_id查询指定的数据
 * @param table_name 表名
 * @param _id 可以是字符串或 ObjectId 对象。
 * @param callback 回调方法
 */
DB.prototype.findById = function(table_name, _id, callback) {

    if (!global.MongoConnected) {
        logger.error('Mongoose is disconnected');
        callback('Mongoose is disconnected')
        return;
    }

    var node_model = this.getConnection(table_name);
    if (!node_model) callback("No table structure");
    node_model.findById(_id, function(err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * 返回符合条件的文档数
 * @param table_name 表名
 * @param conditions 查询条件
 * @param callback 回调方法
 */
DB.prototype.count = function(table_name, conditions, callback) {

    if (!global.MongoConnected) {
        logger.error('Mongoose is disconnected');
        callback('Mongoose is disconnected')
        return;
    }

    var node_model = this.getConnection(table_name);
    if (!node_model) callback("No table structure");
    node_model.count(conditions, function(err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * 查询符合条件的文档并返回根据键分组的结果
 * @param table_name 表名
 * @param field 待返回的键值
 * @param conditions 查询条件
 * @param callback 回调方法
 */
DB.prototype.distinct = function(table_name, field, conditions, callback) {

    if (!global.MongoConnected) {
        logger.error('Mongoose is disconnected');
        callback('Mongoose is disconnected')
        return;
    }

    var node_model = this.getConnection(table_name);
    if (!node_model) callback("No table structure");
    node_model.distinct(field, conditions, function(err, res) {
        if (err) {
            callback(err);
        } else {
            callback(null, res);
        }
    });
};

/**
 * 连写查询
 * @param table_name 表名
 * @param conditions 查询条件 {a:1, b:2}
 * @param options 选项：{fields: "a b c", sort: {time: -1}, limit: 10}
 * @param callback 回调方法
 */
DB.prototype.where = function(table_name, conditions, options, callback) {

    if (!global.MongoConnected) {
        logger.error('Mongoose is disconnected');
        callback('Mongoose is disconnected')
        return;
    }

    var node_model = this.getConnection(table_name);
    if (!node_model) callback("No table structure");
    node_model.find(conditions)
        .select(options.fields || '')
        .sort(options.sort || {})
        .skip(options.skip || 0)
        .limit(options.limit || 0)
        .exec(function(err, res) {
            if (err) {
                callback(err);
            } else {
                callback(null, res);
            }
        });
};

module.exports = new DB();