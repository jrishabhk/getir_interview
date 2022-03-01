//inlcude library/packages
const createError = require('http-errors');


//include daos
const RecordDao = require(__app.__daos.RecordDao);

const COLLECTION_NAME = 'records'

const findRecords = async (startDate, endDate, minCount, maxCount) => {

    let result = await RecordDao.findRecords(COLLECTION_NAME, startDate, endDate, minCount, maxCount);

        if(Array.isArray(result[1]) && result[1].length){
           let finalResult = result[1].filter((ele) => ele.totalCount > minCount && ele.totalCount < maxCount )
            return finalResult;
        }
        else{
            throw createError.Unauthorized('Did not find Result for supplied body');
        }
};



module.exports = {
    findRecords : findRecords
}