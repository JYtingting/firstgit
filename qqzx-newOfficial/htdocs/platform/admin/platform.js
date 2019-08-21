var state=true,
    Arr=[]
$("#checkAll").click(function(){
    state=!state;
    if(state){
        $("input[name='subBox']").prop("checked",false);
        Arr=[]
        console.log(Arr)
    }else{
        Arr=[]
        $("input[name='subBox']").prop("checked",true);
        $("input[name='subBox']:checked").each(function(){
            Arr.push($(this).val())
        });
        console.log(Arr)
    }
})

$("input[name='subBox").click(function(){
    Arr=[];
    var allCheckNum = $("input[name='subBox']").length,
        checkedNum = $("input[name='subBox']:checked").length;
    $("input[name='subBox']:checked").each(function(){
        Arr.push($(this).val())
    });
    if(checkedNum<allCheckNum){
        $("#checkAll").prop("checked",false);
        state=true
    }else{
        state=false;
        $("#checkAll").prop("checked",true);
    }
    console.log(allCheckNum,checkedNum)
    console.log(Arr)
})
