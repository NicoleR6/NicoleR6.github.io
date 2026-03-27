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

    if (container) {
        try {
            const response = await fetch('data.json');
            const mySites = await response.json();
            
            container.innerHTML = "";
            mySites.forEach(site => {
                const anchor = document.createElement('a');
                anchor.href = site.url;
                anchor.className = "nav-anchor";
                
                anchor.target = "_self"; 
                anchor.rel = "noopener noreferrer";

                const item = document.createElement('div');
                item.className = "nav-item";
                item.style.transition = "transform 0.15s ease-out, background 0.3s";
                item.innerHTML = `
                    <span class="icon">${site.icon || '🔗'}</span>
                    <div class="nav-info">
                        <span class="name">${site.name}</span>
                        <span class="desc">${site.desc || '暂无描述'}</span>
                    </div>
                `;

                anchor.appendChild(item);

                anchor.addEventListener('mousemove', (e) => {
                    const rect = anchor.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = (-(y - centerY) / centerY) * 10;
                    const rotateY = ((x - centerX) / centerX) * 10;
                    
                    item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
                });

                anchor.addEventListener('mouseleave', () => {
                    item.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                });

                container.appendChild(anchor);
            });
        } catch (err) {
            console.error("加载数据失败:", err);
            container.innerHTML = `
                <div class="error-state" style="grid-column: 1 / -1; padding: 50px; text-align: center;">
                    <img src="images/error-frieren.png" alt="Error" style="width: 200px; opacity: 0.8;">
                    <p style="color: white; margin-top: 20px;">哎呀，魔法失效了（数据加载失败）</p>
                    <button onclick="location.reload()" style="background: var(--purple-text); border: none; padding: 8px 16px; border-radius: 8px; color: white; cursor: pointer;">重试</button>
                </div>
            `;
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
}

document.addEventListener('DOMContentLoaded', init);