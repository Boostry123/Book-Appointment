module.exports = {
    customeDay: function (option){
        const Days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"]
        
        return Days;
    },



    chosenTime : function (option){

        const FridayTime = ["9:00","9:20","9:40","10:00","10:20","10:40","11:00","11:20","11:40","12:00","12:20","12:40"]
        const NormalTime = ["9:00","9:20","9:40","10:00","10:20","10:40","11:00","11:20","11:40","12:00","12:20","12:40","13:00","13:20","13:40","14:00","14:20","14:40",
            "15:00","15:20","15:40","16:00","16:20","16:40","17:00","17:20","17:40","18:00","18:20","18:40","19:00","19:20","19:40"]

        if(option == "Friday"){
            return FridayTime
        }else{
            return NormalTime
        }
    }
}


