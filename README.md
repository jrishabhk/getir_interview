# getir_interview

Local Setup
```
    #install dependecies
    $npm install

    # run application
    $npm start

    # run test in application
    $npm run test
```

#ENDpoint
https://getir-interview.herokuapp.com/Record/getRecords

# Request Body
```
{
    "data" : {
        "startDate" : "2015-11-27",
        "endDate" : "2015-11-28",
        "minCount": 1600 ,
        "maxCount": 3000
    }
}
```

# Response Body

```
{
    "code": 0,
    "message": "Success",
    "records": [
        {
            "key": "mrniAseF",
            "createdAt": "2015-11-21T04:24:26.167Z",
            "totalCount": 3757
        },
        {
            "key": "mrniAseF",
            "createdAt": "2015-11-21T04:24:26.167Z",
            "totalCount": 3757
        }
    ]
}
```