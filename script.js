async function init() {
    const hour = new Date().getHours();
    const greetingElement = document.getElementById('greeting');
    const searchInput = document.getElementById('search-input');
    const container = document.getElementById('nav-links');

    if (greetingElement) {
        if (hour >= 18 || hour < 6) {
            greetingElement.innerText = "🌙 晚上好！该整理今天的收获了";
        } else {
            greetingElement.innerText = hour < 12 ? "☀️ 早上好！开启元气满满的一天" : "☕ 下午好！记得喝点水休息一下";
        }
    }

    const myBgUrl = 'images/wallpaper.png';
    const imgElement = new Image();
    imgElement.src = myBgUrl;
    imgElement.onload = () => {
        document.body.style.backgroundImage = `url('${myBgUrl}')`;
        document.body.style.opacity = "0";
        
        requestAnimationFrame(() => {
            document.body.style.transition = "opacity 1.5s ease";
            document.body.style.opacity = "1";
        });
    };

    if (container) {
        try {
            const response = await fetch('data.json');
            const mySites = await response.json();
            
            container.innerHTML = "";
            mySites.forEach(site => {
                const link = document.createElement('a');
                link.href = site.url;
                link.className = "nav-item";
                link.target = "_blank";
                link.innerHTML = `
                    <span class="icon">${site.icon || '🔗'}</span>
                    <div class="nav-info">
                        <span class="name">${site.name}</span>
                        <span class="desc">${site.desc || '暂无描述'}</span>
                    </div>
                `;
                container.appendChild(link);
            });
        } catch (err) {
            console.error("加载数据失败:", err);
        }
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value;
                if (query) {
                    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                }
            }
        });
    }
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 40;
        const y = (window.innerHeight / 2 - e.pageY) / 40;
        
        if (container) {
            container.style.transform = `rotateX(${y}deg) rotateY(${-x}deg)`;
        }
    });
}

document.addEventListener('DOMContentLoaded', init);