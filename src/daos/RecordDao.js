
const {awaitPromise} = require(__app.__helpers.promiseResolver);


const findRecords = async function(collectionName, startDate, endDate, minCount, maxCount) {
       

    let aggregateDoc = [
        {
          '$project': {
            '_id': 0, 
            'key': 1, 
            'value': 1, 
            'createdAt': 1, 
            'counts': 1
          }
        }, {
          '$addFields': {
            'totalCount': {
                '$toInt' : {
                    '$sum': "$counts" 
                }
            }
          }
        }, {
          '$project': {
            '_id': 0, 
            'key': 1, 
            'value': 1, 
            'createdAt': 1, 
            'totalCount': 1
          }
        }, {
          '$match': {
            'createdAt': {
                '$gte': new Date(startDate), 
                '$lte': new Date(endDate)
            },
            
          }
        }, {
          '$unset': [
            'value'
          ]
        }
    ];

    let data = [];
    let [err, aggregationCursor]  = await awaitPromise(db.collection(collectionName).aggregate(aggregateDoc));
   
    if(err) {
        assert.equal(null, err);
    }
    while (await aggregationCursor.hasNext()) {
        let obj = await aggregationCursor.next()
        data.push(obj)
    }
    return [err, data];
}

module.exports = {
    findRecords : findRecords,
};