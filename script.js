// json 데이터 박스오피스란에 붙여넣기
document.addEventListener('DOMContentLoaded', () => {
    fetch('movie.json')
        .then(response => {
            return response.json(); // JSON 데이터로 변환
        })
        .then(data => {
            // 데이터에서 처음 5개 항목만 선택
            const top5Movies = data.slice(0, 5);
            const boxofficeList = document.getElementById('boxoffice-list');

            top5Movies.forEach((movie, index) => {
                // 포스터 이미지 URL을 구성
                const imageUrl = `https://image.tmdb.org/t/p/w300${movie.posterPath}`;
                // 영화 정보
                const title = movie.title;
                const releaseDate = movie.releaseDate;
                const originCountry = movie.originCountry;

                // 새로운 리스트 항목을 생성
                const listItem = document.createElement('li');

                listItem.innerHTML = `
                    <a class="poster-link" href="https://pedia.watcha.com/ko-KR">
                        <!-- 포스터 칸 -->
                        <div class="poster-box">
                            <img src="${imageUrl}" alt="${title}" height=   "360">
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
        })
});