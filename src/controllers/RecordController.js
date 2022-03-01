//libraries

// include services
const RecordService = require(__app.__services.RecordService);

const findRecords = async (req, res, next) => {
    
    try {
        let body = req.body.data;
        let {   startDate, 
                endDate, 
                minCount,
                maxCount} = body;
        let result;


        let newStartDate = new Date(startDate);
        let newEndDate = new Date(endDate);
        let newMinCount = parseInt(minCount);
        let newMaxCount = parseInt(maxCount)
        
        let dateCheck = newStartDate.getTime() < newEndDate.getTime() ? true : false;
        let countCheck = newMinCount < newMaxCount ? true : false;
        if(dateCheck && countCheck) {
            result = await RecordService.findRecords(newStartDate, newEndDate, newMinCount, newMaxCount);
        
            return res.status(200).send({
                code : 0,
                message : "Success",
                records : result
            });
        }
        else {
            let message = '';
            if(!dateCheck && !countCheck) {
                message = 'Start date should be less than End date. minCount should be less than maxCount';
            }
            else if(!dateCheck && countCheck) {
                message = 'Start date should be less than End date';
            }
            else {
                message = 'minCount should be less than maxCount';
            }
            return res.status(422).send({
                code : 1,
                message : message,
                records : []
            });
        }
       
    }
    catch(exception) {
        console.log("Exception from findRecords");
        console.log(exception.message);
        console.log(exception);
        next(exception);
    }
};


module.exports = {
    findRecords : findRecords
};