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
                const link = document.createElement('a');
                link.href = site.url;
                link.className = "nav-item";
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                link.innerHTML = `
                    <span class="icon">${site.icon || '🔗'}</span>
                    <div class="nav-info">
                        <span class="name">${site.name}</span>
                        <span class="desc">${site.desc || '暂无描述'}</span>
                    </div>
                `;

                link.addEventListener('mousemove', (e) => {
                    const rect = link.getBoundingClientRect();
                    
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (-(y - centerY) / centerY) * 15;
                    const rotateY = ((x - centerX) / centerX) * 15;
                    
                    link.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(40px) translateY(-5px)`;
                });

                link.addEventListener('mouseleave', () => {
                    link.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)`;
                });

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
}

document.addEventListener('DOMContentLoaded', init);