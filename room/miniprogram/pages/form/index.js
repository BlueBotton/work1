Page({
    data:{
        data:"",
        region:"",
        groupId:""
    },
    onLoad:function(e){
        if(e.groupId){
            this.setData({
                groupId: e.groupId,
            });
        }
    },
    submit: function(e){
        let u=e.detail.value;
        if(this.data.groupId){
            wx.cloud.callFunction({
                name:"quickstartFunctions",
                data:{
                    type:"joinGroup",
                    data:{
                        ...u,
                        region:this.data.region,
                        groupId:Number(this.data.groupId),
                    },
                },
            })
            
        }
        else{
        wx.cloud.callFunction({
            name:"quickstartFunctions",
            data:{
                type:"createGroup",
                data:{
                    ...u,
                    region:this.data.region,
                },
            },
        })
        .then((res) => {
            console.log(res);
        });
    }
    },

    dataChange: function(e){
        this.setData({
            data: e.detail.value,
        });
    },

});