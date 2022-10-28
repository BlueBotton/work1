$(document).ready(function(){
    var currentColor = "white";
    var currentBoardCells = ["board40", "board41", "board42", "board43"];
    var currentPegCells = ["peg40", "peg41", "peg42", "peg43"]
    //从棋盘底部开始填色
    var currentRow = 11;
    var possibleColors = ["blue", "green", "red", "yellow", "orange", "pink"];
    var hasWon = false;

    var cell1Color, cell2Color, cell3Color, cell4Color;

    //定义颜色
    var colors = {
        "rgb(0, 128, 0)": "green",
        "rgb(255, 255, 0)": "yellow",
        "rgb(255, 0, 0)": "red",
        "rgb(0, 0, 255)": "blue",
        "rgb(255, 192, 203)": "pink",
        "rgb(255, 165, 0)": "orange",
        "rgb(0, 0, 0)": "black",
    }

    //生成一个随机颜色序列
    var code = [
        possibleColors[Math.floor(Math.random()*6)], 
        possibleColors[Math.floor(Math.random()*6)],
        possibleColors[Math.floor(Math.random()*6)],
        possibleColors[Math.floor(Math.random()*6)]
    ];
    
    console.log(code);

    //创建游戏主板单元格
    for(let i = 0; i < 44; i++){
        let cell = "<div class=\"boardCell\" id=board"+i+"></div>"
        $(".board").append(cell);
    }

    //创建Pegs的单元格
    for(let i = 0; i < 44; i++){
        let cell = "<div class=\"pegCell\" id=peg"+i+"></div>"
        $(".pegs").append(cell);
    }

    //改变面板左侧游戏主板的style
    $(".board").css("grid-template-rows", "repeat(11,73.18px)");
    $(".board").css("grid-template-columns", "repeat(4,73.18px)");
    $(".boardCell").css("border", "1px solid black");
    $(".boardCell").css("border-radius", "50%");
    $(".boardCell").css("background-color", "white");

    //改变右侧Pegs的style
    $(".pegs").css("grid-template-rows", "repeat(22,36.59px)");
    $(".pegs").css("grid-template-columns", "repeat(2,36.59px");
    $(".pegCell").css("border", "1px solid black");
    $(".pegCell").css("border-radius", "50%")
    $(".pegCell").css("background-color", "gray")

    //向颜色板里添加颜色
    $(".color").each(function(){
        //set the color of the cell to its ID
        let color = $(this).attr("id");
        $(this).css("background-color", color);
    });

    //用户点击某一颜色，填充“提交”按钮上方的“当前颜色”使其一致
    $(".color").click(function(){
        let color = $(this).attr("id");
        currentColor = color;
        $(".currentColor").css("background-color", color);
    });

    //点击主板改变颜色
    $(".boardCell").click(function(){
        var id = $(this).attr("id");

        if(isValid(id)){
            $(this).css("background-color", currentColor);
        }
    });

    $(".submit").click(function(){
        updatePegs();
        checkWin();
        changeCurrentRow();
    });

    $(".refresh").click(function(){
        window.location.reload();
    });

    function changeCurrentRow(){
        currentRow -= 1;
        var mult = 4;

        currentBoardCells = [
            "board" + (currentRow*mult-4), 
            "board" + (currentRow*mult-3), 
            "board" + (currentRow*mult-2), 
            "board" + (currentRow*mult-1)];
        currentPegCells = [
            "peg" + (currentRow*mult-4), 
            "peg" + (currentRow*mult-3), 
            "peg" + (currentRow*mult-2), 
            "peg" + (currentRow*mult-1)];
    }

    //检查用户点击的位置是否Valid
    function isValid(id){
        if(currentBoardCells.includes(id) && hasWon === false){
            return true;
        }
        return false;
    }

    //检查是否赢得游戏
    function checkWin(){
        if(code[0] === cell1Color &&
            code[1] === cell2Color &&
            code[2] === cell3Color &&
            code[3] === cell4Color){
            hasWon = true;
            alert("恭喜，你赢了！游戏结束！");
            //set the colors of the code box
            $("#secretColor1").css("background-color", code[0]);
            $("#secretColor2").css("background-color", code[1]);
            $("#secretColor3").css("background-color", code[2]);
            $("#secretColor4").css("background-color", code[3]);
        }

        return hasWon; 
    }

    //每一次Submit之后Pegs颜色更新
    function updatePegs(){
        let cell1 = $("#"+currentBoardCells[0]);
        let cell2 = $("#"+currentBoardCells[1]);
        let cell3 = $("#"+currentBoardCells[2]);
        let cell4 = $("#"+currentBoardCells[3]);

        cell1Color = colors[cell1.css("background-color")];
        cell2Color = colors[cell2.css("background-color")];
        cell3Color = colors[cell3.css("background-color")];
        cell4Color = colors[cell4.css("background-color")];

        let peg1 = $("#"+currentPegCells[0]);
        let peg2 = $("#"+currentPegCells[1]);
        let peg3 = $("#"+currentPegCells[2]);
        let peg4 = $("#"+currentPegCells[3]);

        let pegs = [peg1, peg2, peg3, peg4];

        let filledPegs = [];
        let chosenCells = [];
        //创建一个颜色序列的副本
        let codeCopy = [...code];

        //颜色和位置正确，随机选一个可用Peg显示黑色；颜色正确位置不对，随机一个可用Peg显示白色
        if(code[0] === cell1Color){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            let index = codeCopy.indexOf(cell1Color);
            if(index > -1){
                codeCopy.splice(index, 1);
            }

            chosenCells.push(1);

            pegs[num-1].css("background-color", "black");
        }
        if(code[1] === cell2Color){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            let index = codeCopy.indexOf(cell2Color);
            if(index > -1){
                codeCopy.splice(index, 1);
            }

            chosenCells.push(2);

            pegs[num-1].css("background-color", "black");
        }
        if(code[2] === cell3Color){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            let index = codeCopy.indexOf(cell3Color);
            if(index > -1){
                codeCopy.splice(index, 1);
            }

            chosenCells.push(3);

            pegs[num-1].css("background-color", "black");
        }
        if(code[3] === cell4Color){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            let index = codeCopy.indexOf(cell4Color);
            if(index > -1){
                codeCopy.splice(index, 1);
            }

            chosenCells.push(4);

            pegs[num-1].css("background-color", "black");
        }

    
        if(codeCopy.includes(cell1Color) && !chosenCells.includes(1)){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            pegs[num-1].css("background-color", "white");
        }       
        if(codeCopy.includes(cell2Color) && !chosenCells.includes(2)){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            pegs[num-1].css("background-color", "white");
        }    
        if(codeCopy.includes(cell3Color) && !chosenCells.includes(3)){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            pegs[num-1].css("background-color", "white");
        }    
        if(codeCopy.includes(cell4Color) && !chosenCells.includes(4)){
            let num = randomNum14(filledPegs);
            filledPegs.push(num);

            pegs[num-1].css("background-color", "white");
        }     
    }
    //随机生成1-4的数字
    function randomNum14(nums){
        let num = Math.floor(Math.random()*4) + 1;

        while(nums.includes(num)){
            num = Math.floor(Math.random()*4) + 1;
        }
        return num;
    }
});
