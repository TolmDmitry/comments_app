class Pagination {
  numPages = 1;

  prevButton = document.getElementById('button_prev');
  nextButton = document.getElementById('button_next');
  showMoreButton = document.getElementById('button_show_more');

  current_page = 1;
  records_per_page = 5;

  init = (page = 1) => {
    fetch(`https://jordan.ashton.fashion/api/goods/30/comments`).then(res => res.json()).then((data) => {
      this.numPages = Math.ceil(data.total / data.per_page);
      this.pageNumbers(this.numPages);
      this.changePage(page);
    })

    this.selectedPage();
    this.clickPage();
    this.addEventListeners();
  }

  addEventListeners = function () {
    this.prevButton.addEventListener('click', this.prevPage);
    this.nextButton.addEventListener('click', this.nextPage);
    this.showMoreButton.addEventListener('click', this.showMore)
  }

  selectedPage = function () {
    let page_number = document.getElementById('page_number').getElementsByClassName('clickPageNumber');
    for (let i = 0; i < page_number.length; i++) {
      if (i == this.current_page - 1) {
        page_number[i].style.opacity = "1.0";
      }
      else {
        page_number[i].style.opacity = "0.5";
      }
    }
  }

  checkButtonOpacity = () => {
    this.current_page == 1 ? this.prevButton.classList.add('opacity') : this.prevButton.classList.remove('opacity');
    this.current_page == this.numPages ? this.nextButton.classList.add('opacity') : this.nextButton.classList.remove('opacity');
    this.current_page == this.numPages ? this.showMoreButton.classList.add('opacity') : this.showMoreButton.classList.remove('opacity')
  }

  drawItem = function (item) {
    const newsItem = `
    <div class="card">
        <div class="new-info">
        <h1>${item.name}</h1>
        <p>${item.text}</p>
        </div>
    </div>
    `;
    const newsFragment = document.createRange().createContextualFragment(newsItem);
    content.appendChild(newsFragment);
  }

  changePage = function (page = this.current_page) {
    fetch(`https://jordan.ashton.fashion/api/goods/30/comments?page=${page}`).then(res => res.json()).then((data) => {
      const content = document.querySelector('.content');
      content.replaceChildren();
      data.data.forEach(this.drawItem);
      this.numPages = Math.ceil(data.total / data.per_page);
    })
    this.checkButtonOpacity();
    this.selectedPage();
  }

  prevPage = () => {
    if (this.current_page > 1) {
      this.current_page--;
      this.changePage(this.current_page);
    }
  }

  nextPage = () => {
    if (this.current_page < this.numPages) {
      this.current_page++;
      this.changePage(this.current_page);
    }
  }
  showMore = () => {
    fetch(`https://jordan.ashton.fashion/api/goods/30/comments?page=${this.current_page + 1}`).then(res => res.json()).then((data) => {
      const content = document.querySelector('.content');
      data.data.forEach(this.drawItem);
      this.numPages = Math.ceil(data.total / data.per_page);
      ++this.current_page;
    })
    this.checkButtonOpacity();
    this.selectedPage();
  }

  clickPage = function () {
    document.addEventListener('click', (e) => {
      if (e.target.nodeName == "SPAN" && e.target.classList.contains("clickPageNumber")) {
        this.current_page = e.target.textContent;
        this.changePage(this.current_page);

      }
    });
  }

  pageNumbers = function (amountOfPages) {
    let pageNumber = document.getElementById('page_number');
    pageNumber.innerHTML = "";

    for (let i = 1; i < amountOfPages + 1; i++) {
      pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
    }
  }
}

export default Pagination;