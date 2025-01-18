// 获取元素
const startButton = document.getElementById('start-button');
const resultDisplay = document.getElementById('result');
const waitText = document.getElementById('wait-text');
const clickText = document.getElementById('click-text');
const gameTitle = document.getElementById('game-title');
const scoreList = document.getElementById('score-list');
const scoreboard = document.getElementById('scoreboard');
const body = document.body;

// 游戏状态
let gameStarted = false;
let startTime;
let timeoutId;
const scores = []; // 用于存储成绩

// 开始游戏
startButton.addEventListener('click', (event) => {
    event.stopPropagation(); // 阻止事件冒泡
    if (!gameStarted) {
        startGame();
    }
});

// 游戏逻辑
function startGame() {
    // 初始化状态
    gameStarted = true;
    startButton.style.display = "none"; // 隐藏按钮
    gameTitle.style.display = "none"; // 隐藏标题
    resultDisplay.style.display = "none"; // 隐藏结果
    scoreboard.style.display = "none"; // 隐藏成绩列表
    waitText.style.display = "block"; // 显示 "Wait"
    waitText.textContent = "Wait"; // 设置文字内容
    body.style.backgroundColor = "black";

    // 随机时间（1到5秒）
    const randomTime = Math.random() * 4000 + 1000; // 1000ms到5000ms之间
    timeoutId = setTimeout(() => {
        body.style.backgroundColor = "red";
        waitText.style.display = "none"; // 隐藏 "Wait"
        clickText.style.display = "block"; // 显示 "点击屏幕"
        clickText.textContent = "点击屏幕"; // 设置文字内容
        startTime = Date.now(); // 记录变红的时间
    }, randomTime);

    // 监听点击事件
    body.addEventListener('click', handleClick);
    body.addEventListener('touchstart', handleClick); // 支持触摸事件
}

// 处理点击事件
function handleClick(event) {
    if (!gameStarted) return;

    // 如果屏幕是黑色，点击失败
    if (body.style.backgroundColor === "black") {
        clearTimeout(timeoutId); // 清除定时器
        body.style.backgroundColor = "green";
        resultDisplay.textContent = "失败！你在屏幕变红前点击了。";
        resetGame();
        return;
    }

    // 如果屏幕是红色，计算反应时间
    if (body.style.backgroundColor === "red") {
        const endTime = Date.now();
        const reactionTime = (endTime - startTime) / 1000; // 转换为秒
        resultDisplay.textContent = `反应时间：${reactionTime.toFixed(4)} 秒`;
        recordScore(reactionTime); // 记录成绩
        resetGame();
    }
}

// 记录成绩
function recordScore(time) {
    scores.push(time); // 将成绩添加到数组
    if (scores.length > 20) {
        scores.shift(); // 如果超过20个成绩，移除最早的
    }
    updateScoreboard(); // 更新成绩列表
}

// 更新成绩列表
function updateScoreboard() {
    scoreList.innerHTML = ""; // 清空列表
    scores.forEach((score, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${score.toFixed(4)} 秒`;
        scoreList.appendChild(li);
    });
}

// 重置游戏
function resetGame() {
    gameStarted = false;
    body.style.backgroundColor = "#f0f0f0";
    startButton.textContent = "再试一次"; // 修改按钮文本
    startButton.style.display = "block"; // 显示按钮
    gameTitle.style.display = "block"; // 显示标题
    resultDisplay.style.display = "block"; // 显示结果
    scoreboard.style.display = "block"; // 显示成绩列表
    waitText.style.display = "none"; // 隐藏 "Wait"
    clickText.style.display = "none"; // 隐藏 "点击屏幕"
    body.removeEventListener('click', handleClick);
    body.removeEventListener('touchstart', handleClick); // 移除触摸事件监听
}