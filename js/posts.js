const postData = [
  {
    id: 1,
    mediaUrl: 'images/Rectangle-20.jpg',
    status: 'Today',
    likes: 128,
    comments1: 31,
    postDate: '9-08-2016',
    views: 67,
    comments2: 22,
    uploadDate: '11-04-2016',
  },
  {
    id: 2,
    mediaUrl: 'images/Rectangle-21.jpg',
    status: 'Today',
    likes: 128,
    comments1: 31,
    postDate: '9-08-2016',
    views: 67,
    comments2: 22,
    uploadDate: '11-04-2016',
  },
  {
    id: 3,
    mediaUrl: 'images/Rectangle-22.jpg',
    status: 'Today',
    likes: 128,
    comments1: 31,
    postDate: '9-08-2016',
    views: 67,
    comments2: 22,
    uploadDate: '11-04-2016',
  },
  {
    id: 4,
    mediaUrl: 'images/Rectangle-23.jpg',
    status: 'Today',
    likes: 128,
    comments1: 31,
    postDate: '9-08-2016',
    views: 67,
    comments2: 22,
    uploadDate: '11-04-2016',
  },
  {
    id: 5,
    mediaUrl: 'images/Rectangle-24.jpg',
    status: 'Today',
    likes: 128,
    comments1: 31,
    postDate: '9-08-2016',
    views: 67,
    comments2: 22,
    uploadDate: '11-04-2016',
  },
  {
    id: 6,
    mediaUrl: 'images/Rectangle-25.jpg',
    status: 'Today',
    likes: 128,
    comments1: 31,
    postDate: '9-08-2016',
    views: 67,
    comments2: 22,
    uploadDate: '11-04-2016',
  },
  {
    id: 7,
    mediaUrl: 'images/Rectangle-26.jpg',
    status: 'Today',
    likes: 128,
    comments1: 31,
    postDate: '9-08-2016',
    views: 67,
    comments2: 22,
    uploadDate: '11-04-2016',
  },
  {
    id: 8,
    mediaUrl: 'images/Rectangle-27.jpg',
    status: 'Today',
    likes: 128,
    comments1: 31,
    postDate: '9-08-2016',
    views: 67,
    comments2: 22,
    uploadDate: '11-04-2016',
  },
  {
    id: 9,
    mediaUrl: 'images/Rectangle-28.jpg',
    status: 'Today',
    likes: 128,
    comments1: 31,
    postDate: '9-08-2016',
    views: 67,
    comments2: 22,
    uploadDate: '11-04-2016',
  },
];

function getContainer() {
  return document.getElementById('content-list-container');
}
const templateHtml = `
    <div class="item" data-id="[ID_ЗАПИСУ]">
        <div class="item-media">
            <img src="" alt="Post Image" data-media-url>
        </div>
        <div class="item-details">
            <div class="stat-group group">
                <span class="status" data-status></span>
                <div class="stats-wrapper">
                 <div class="stats-icon">
                    <i class="fas fa-heart"></i>
                    <span data-likes class="small"></span>
                </div>
                <div class="stats-icon">
                    <i class="fas fa-comment"></i>
                    <span data-comments-1 class="small"></span>
                </div>
                </div>
               
            </div>
            <div class="date-group group">
                <span class="date" data-post-date></span>
                 <div class="stats-wrapper">
                <div class="stats-icon">
                    <i class="fas fa-heart"></i>
                    <span data-views class="small"></span>
                </div>
                <div class="stats-icon">
                    <i class="fas fa-comment"></i>
                    <span data-comments-2 class="small"></span>
                </div>
                </div>
            </div>
            <div class="upload-group group">
                <span class="upload-text">Image upload</span>
                <span class="upload-date small" data-upload-date></span>
            </div>
        </div>
    </div>
`;

const ITEMS_PER_PAGE_GRID = 8;
let currentView = 'grid';
let currentPage = 1;

function renderPosts(items) {
  const container = getContainer();
  if (!container) return;
  container.innerHTML = '';

  items.forEach(post => {
    const itemElement = document.createElement('div');
    itemElement.innerHTML = templateHtml;
    const card = itemElement.querySelector('.item');

    card.setAttribute('data-id', post.id);

    card.querySelector('[data-media-url]').src = post.mediaUrl;
    card.querySelector('[data-status]').textContent = post.status;
    card.querySelector('[data-likes]').textContent = post.likes;
    card.querySelector('[data-comments-1]').textContent = post.comments1;
    card.querySelector('[data-post-date]').textContent = post.postDate;
    card.querySelector('[data-views]').textContent = post.views;
    card.querySelector('[data-comments-2]').textContent = post.comments2;
    card.querySelector('[data-upload-date]').textContent = post.uploadDate;

    container.appendChild(card);
  });
}

function renderCurrent() {
  const end = currentPage * ITEMS_PER_PAGE_GRID;
  const slice = postData.slice(0, end);
  renderPosts(slice);
  toggleLoadMoreButton(end < postData.length);
}

function toggleLoadMoreButton(show) {
  const btn = document.querySelector('.load-more');
  if (!btn) return;
  btn.style.display = show ? 'block' : 'none';
}

document.addEventListener('viewChange', e => {
  const view = e?.detail?.view || 'grid';
  currentView = view;
  currentPage = 1;
  renderCurrent();
});

document.addEventListener('DOMContentLoaded', () => {
  renderCurrent();

  const loadMoreBtn = document.querySelector('.load-more');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      currentPage += 1;
      renderCurrent();
    });
  }
});
