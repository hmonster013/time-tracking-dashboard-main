document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    const cards = document.querySelectorAll('.card__content');
  
    // Hàm cập nhật nội dung
    function updateContent(data, period) {
      data.forEach((item, index) => {
        const card = cards[index];
        const current = item.timeframes[period].current;
        const previous = item.timeframes[period].previous;
  
        // Cập nhật thời gian hiện tại và trước đó
        card.querySelector('.card__content--body').textContent = `${current}hrs`;
        card.querySelector('.card__content--footer').textContent = `Previous - ${previous}hrs`;
      });
    }
  
    // Fetch dữ liệu từ file JSON
    fetch('./data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        // Gắn sự kiện cho các nút
        buttons.forEach(button => {
          button.addEventListener('click', () => {
            const period = button.id.replace('Btn', '').toLowerCase(); // dailyBtn -> daily
            updateContent(data, period);
          });
        });
  
        // Hiển thị mặc định là weekly
        updateContent(data, 'weekly');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
  