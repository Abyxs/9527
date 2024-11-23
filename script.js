document.addEventListener('DOMContentLoaded', function() {
    const toolSearch = document.getElementById('toolSearch');
    const searchResult = document.getElementById('searchResult');
    
    // 获取所有工具项
    const tools = Array.from(document.querySelectorAll('.tool-item')).map(item => ({
        element: item,
        name: item.querySelector('span').textContent.trim(),
        category: item.closest('.tool-category').querySelector('h3').textContent.trim()
    }));

    // 搜索功能
    function performSearch(keyword) {
        searchResult.innerHTML = '';
        
        if (!keyword) {
            searchResult.classList.remove('active');
            return;
        }

        const matches = tools.filter(tool => 
            tool.name.toLowerCase().includes(keyword.toLowerCase()) ||
            tool.category.toLowerCase().includes(keyword.toLowerCase())
        );

        if (matches.length > 0) {
            matches.forEach(tool => {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                div.innerHTML = `
                    <span>${tool.name}</span>
                    <small style="color: #666; margin-left: 8px;">${tool.category}</small>
                `;
                
                div.addEventListener('click', () => {
                    tool.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    tool.element.classList.add('highlight');
                    setTimeout(() => tool.element.classList.remove('highlight'), 2000);
                    searchResult.classList.remove('active');
                    toolSearch.value = '';
                });
                
                searchResult.appendChild(div);
            });
            searchResult.classList.add('active');
        } else {
            const noResult = document.createElement('div');
            noResult.className = 'search-result-item no-result';
            noResult.textContent = '未找到相关工具';
            searchResult.appendChild(noResult);
            searchResult.classList.add('active');
        }
    }

    // 输入事件监听
    let debounceTimer;
    toolSearch.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            performSearch(e.target.value.trim());
        }, 300);
    });

    // 点击空白处关闭搜索结果
    document.addEventListener('click', (e) => {
        if (!toolSearch.contains(e.target) && !searchResult.contains(e.target)) {
            searchResult.classList.remove('active');
        }
    });

    // 按下 ESC 键关闭搜索结果
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchResult.classList.remove('active');
            toolSearch.value = '';
            toolSearch.blur();
        }
    });

    // 等待DOM加载完成
    let snowInterval;
    let isSnowing = false;

    // 创建雪花函数
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerHTML = '❅';
        
        // 随机位置和大小
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.fontSize = (Math.random() * 15 + 8) + 'px';
        snowflake.style.opacity = Math.random() * 0.8 + 0.2;
        
        // 随机动画持续时间
        const duration = Math.random() * 5 + 8;
        snowflake.style.animationDuration = duration + 's';
        
        document.body.appendChild(snowflake);
        
        // 动画结束后移除
        setTimeout(() => {
            snowflake.remove();
        }, duration * 1000);
    }

    // 开始下雪
    function startSnowfall() {
        if (!isSnowing) {
            isSnowing = true;
            snowInterval = setInterval(createSnowflake, 300);
            document.querySelector('.snow-toggle').classList.add('active');
        }
    }

    // 停止下雪
    function stopSnowfall() {
        if (isSnowing) {
            isSnowing = false;
            clearInterval(snowInterval);
            document.querySelector('.snow-toggle').classList.remove('active');
            // 清除现有的雪花
            document.querySelectorAll('.snowflake').forEach(snowflake => {
                snowflake.remove();
            });
        }
    }

    // 绑定点击事件
    const snowToggle = document.querySelector('.snow-toggle');
    if (snowToggle) {
        snowToggle.addEventListener('click', function() {
            if (isSnowing) {
                stopSnowfall();
            } else {
                startSnowfall();
            }
        });
    }

    // 页面加载时自动开始下雪
    startSnowfall();
});

// 音乐播放器功能
class MusicPlayer {
    constructor() {
        this.audioPlayer = document.getElementById('musicPlayer');
        this.radioIcon = document.getElementById('radioIcon');
        this.isPlaying = false;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // 同时监听点击和触摸事件
        this.radioIcon.addEventListener('click', (e) => {
            e.preventDefault();
            this.togglePlay();
        });
        
        this.radioIcon.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.togglePlay();
        });

        // 添加音频加载状态监听
        this.audioPlayer.addEventListener('canplaythrough', () => {
            console.log('Audio is ready to play');
        });

        // 添加错误处理
        this.audioPlayer.addEventListener('error', (e) => {
            console.error('Audio error:', e);
        });
    }

    async togglePlay() {
        try {
            if (this.isPlaying) {
                await this.pause();
            } else {
                // 在移动端触发用户交互后立即播放
                const playPromise = this.audioPlayer.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        this.isPlaying = true;
                        this.radioIcon.classList.add('playing');
                        document.getElementById('mainTitle').classList.add('playing');
                        console.log('Playing started successfully');
                    }).catch(error => {
                        console.error('Play failed:', error);
                    });
                }
            }
        } catch (error) {
            console.error('Toggle play error:', error);
        }
    }

    async pause() {
        this.audioPlayer.pause();
        this.isPlaying = false;
        this.radioIcon.classList.remove('playing');
        document.getElementById('mainTitle').classList.remove('playing');
    }
}

// 初始化音乐播放器
document.addEventListener('DOMContentLoaded', () => {
    new MusicPlayer();
});

let snowInterval;
let isSnowing = false;

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❅';
    
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.fontSize = (Math.random() * 15 + 8) + 'px';
    snowflake.style.opacity = Math.random() * 0.8 + 0.2;
    
    const duration = Math.random() * 5 + 8;
    snowflake.style.animationDuration = duration + 's';
    
    document.body.appendChild(snowflake);
    
    setTimeout(() => {
        snowflake.remove();
    }, duration * 1000);
}

function startSnowfall() {
    if (!isSnowing) {
        isSnowing = true;
        snowInterval = setInterval(createSnowflake, 300);
        document.querySelector('.snow-toggle').classList.add('active');
    }
}

function stopSnowfall() {
    if (isSnowing) {
        isSnowing = false;
        clearInterval(snowInterval);
        document.querySelector('.snow-toggle').classList.remove('active');
        // 清除现有的雪花
        const snowflakes = document.querySelectorAll('.snowflake');
        snowflakes.forEach(snowflake => {
            snowflake.remove();
        });
    }
}

// 添加开关控制
document.querySelector('.snow-toggle').addEventListener('click', function() {
    if (isSnowing) {
        stopSnowfall();
    } else {
        startSnowfall();
    }
});

// 页面加载时默认不开启下雪
// window.addEventListener('load', startSnowfall); 

// 农历数据
const lunarInfo = [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x16a95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557
];

// 农历月份
const lunarMonths = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];

// 农历日期
const lunarDays = [
    '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
];

function showDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const day = now.getDay();
    const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
    
    // 简单的农历转换（这里使用固定偏移，实际应该根据具体日期计算）
    // 2024年11月22日对应农历十月初十
    const lunarMonth = '十';
    const lunarDay = '初十';
    
    const dateStr = `${year}年${month}月${date}日 星期${weekdays[day]}`;
    const lunarStr = `农历${lunarMonth}月${lunarDay}`;
    
    document.getElementById('currentDate').textContent = dateStr;
    document.getElementById('lunarDate').textContent = lunarStr;
}

// 每秒更新时间
setInterval(showDateTime, 1000);
// 初始化显示
showDateTime();