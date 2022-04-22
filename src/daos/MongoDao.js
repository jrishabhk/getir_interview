const promiseResolver = require(__app.__helpers.promiseResolver).default;



const insertDocument = async function(collectionName, doc) {
    // this._dbConnection.collection(collectionName).insertOne(doc, function(err, result) {
    //     assert.equal(null, err);
    //     console.log(" Below doc inserted successfully");
    //     _this.printDocument(collectionName, doc, callback);
    // });
    let [err, data] = await promiseResolver(this._dbConnection.collection(collectionName).insertOne(doc));
    if(data) {
        assert.equal(null, err);
        //console.log(" Below doc inserted successfully", data.ops);
        //this.printDocument(collectionName, doc);
    }
    return [err, data];
}

const findDocument = async function(collectionName, doc) {
       
    let [err, data] = await promiseResolver(this._dbConnection.collection(collectionName).find(doc).toArray());
    if(err) {
        assert.equal(null, err);
    }
    return [err, data];
}

const findOneDocument = async function(collectionName, doc) {
       
    let [err, data] = await promiseResolver(this._dbConnection.collection(collectionName).findOne(doc));
    if(err) {
        assert.equal(null, err);
    }
    return [err, data];
}

const printDocument = async function(collectionName, doc) {
    this._dbConnection.collection(collectionName).find({}).filter(doc)
        .toArray(function(err, docs) {
            console.log("printDocument", docs[0]);
            console.log("\n");
            
        });
}

const updateDocument = async function(collectionName, doc, updateDocument) {
    this._dbConnection.collection(collectionName).updateMany(doc, updateDocument, function(err, result) {
            assert.equal(null, err);
            console.log(result.result.ok + " document updated successfully");
            _this.printDocument(collectionName, doc);
        });
}

const updateOneDocument = async function (collectionName, filter, updateDoc, options) {
    let [err, data] = await promiseResolver(this._dbConnection.collection(collectionName).updateOne(filter, updateDoc, options));
    let _this = this;
    if(data) {
        assert.equal(null, err);
        //console.log(" Below doc updated successfully :", data);
    }
    return [err, data];
}

const deleteDocument = function (collectionName, doc) {
    this._dbConnection.collection(collectionName).deleteOne(doc, function(err, result) {
        assert.equal(null, err);
        console.log(result.result.ok + " document deleted successfully");
    });
}

    module.exports = {
        findDocument : findDocument
    }

