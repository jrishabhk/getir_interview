// define all type check for all different data type and data structures
//import libraries


module.exports = {
   
    isArray : function(arr) {
                return (arr !== null && Array.isArray(arr));
            },
    isDate : function(date) {
                return ( typeof date === 'object' && date.constructor === Date);
            }
};