document.addEventListener('DOMContentLoaded', () => {
    fetch('movie.json')
        .then(response => response.json())
        .then(data => {
            // 데이터에서 처음 20개 항목만 선택
            const top20Movies = data.slice(0, 20);
            const boxofficeList = document.getElementById('boxoffice-list');

            top20Movies.forEach((movie, index) => {
                // 포스터 이미지 URL을 구성
                const imageUrl = `https://image.tmdb.org/t/p/w500${movie.posterPath}`;
                // 영화 정보
                const title = movie.title;
                const releaseDate = movie.releaseDate;
                const originCountry = movie.originCountry;

                // 새로운 리스트 항목을 생성
                const listItem = document.createElement('li');

                listItem.innerHTML = `
                    <a class="poster-link" href="${imageUrl}">
                        <!-- 포스터 칸 -->
                        <div class="poster-box">
                            <img src="${imageUrl}" alt="${title}" height="360">
                            <p>${index + 1}</p> <!-- 순위 표시 -->
                        </div>
                        <!-- 영화 타이틀 -->
                        <div class="title-box">
                            <p>${title}</p>
                            <p>${releaseDate} · ${originCountry}</p>
                            <p>예매율 00% · 누적 관객 00.0만명</p>
                        </div>
                    </a>
                `;

                // 목록에 추가
                boxofficeList.appendChild(listItem);
            });

            // 슬라이더 관련 코드
            const list = document.getElementById('boxoffice-list');
            const items = list.querySelectorAll('li');
            const itemCount = items.length;
            const visibleCount = 5; // 한 번에 보여줄 항목의 수
            const totalSlides = Math.ceil(itemCount / visibleCount);
            let currentSlide = 0;

            // 슬라이드 버튼
            const prevButton = document.getElementById('prev-slide');
            const nextButton = document.getElementById('next-slide');

            // 버튼 클릭 이벤트 핸들러
            prevButton.addEventListener('click', () => {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateSlider();
                }
            });

            nextButton.addEventListener('click', () => {
                if (currentSlide < totalSlides - 1) {
                    currentSlide++;
                    updateSlider();
                }
            });

            // 슬라이더 업데이트 함수
            function updateSlider() {
                const offset = -currentSlide * (500 / visibleCount);
                list.style.transform = `translateX(${offset}%)`;
            }

            // 초기 슬라이더 상태 설정
            updateSlider();
        })

        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

// clearbutton의 clear효과 적용
function clearInput() {
    // 입력 필드의 값을 기존의 value로 바꾸기
    const inputField = document.querySelector('#search-form input');
    inputField.value = "콘텐츠, 인물, 위치, 유저를 검색해보세요";
}

document.addEventListener('DOMContentLoaded', () => {
    // 버튼 클릭 이벤트 핸들러 추가
    const clearButton = document.querySelector('.clear-button');
    clearButton.addEventListener('click', clearInput);

    // 입력 필드에 입력이 시작될 때 value를 지우는 이벤트 핸들러 추가
    const searchInput = document.querySelector('#search-input');
    searchInput.addEventListener('focus', () => {
        if (searchInput.value === "콘텐츠, 인물, 위치, 유저를 검색해보세요") {
            searchInput.value = "";
        }
    });
});