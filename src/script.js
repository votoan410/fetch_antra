// API calls
const BASE_URL = 'https://jsonplaceholder.typicode.com';
const postsPath = 'posts';

// api methods
const getPosts = () => {
  const postsEndPoint = [BASE_URL, postsPath].join('/');
  return fetch(postsEndPoint).then(response => {
    return response.json();
  });
};

const deletePost = id => {
  const postsEndPoint = [BASE_URL, postsPath, id].join('/');
  return fetch(postsEndPoint, {
    method: 'DELETE',
  }).then(response => {
    return response.json();
  });
};

// CONST
const DomSelectors = {
  articleContainer: 'article__container',
  cardProps: {
    cardArticle: 'card',
    blueTitle: 'card__tag--blue',
    greenTitle: 'card__tag--green',
    cardDate: 'card__date',
    cardParagraph: 'card__paragraph',
    cardContinue: 'card__continue',
    cardHeader: 'card__header',
  },
};

// STATE
class PostState {
  constructor() {
    this._posts = [];
  }

  get posts() {
    return this._posts;
  }

  set posts(newPosts) {
    this._posts = newPosts;
    renderPostCard(this._posts, document.querySelector('.article__container'));
  }
}

let state = new PostState();

// VIEW RENDER function
const render = (tmp, element) => {
  element.innerHTML = tmp;
};

const renderPostCard = (posts, elementToMap) => {
  // render sth to swhere
  // in this case is to the card section
  const tmp =
    posts !== undefined
      ? posts
          .map(post => generatePostCardTmp(post, DomSelectors.cardProps))
          .join('')
      : [];

  elementToMap !== undefined ? render(tmp, elementToMap) : null;
};

// Template
const generatePostCardTmp = (
  post,
  { cardArticle, blueTitle, cardDate, cardParagraph, cardContinue, cardHeader }
) => {
  return `<article class="${cardArticle}">
            <header>
              <span class="${blueTitle}">${post.id}</span>
              <h2 class="${cardHeader}">${post.title}</h2>
              <span class="${cardDate}">Nov 12</span>
            </header>
            <p class="${cardParagraph}">
              ${post.body}
            </p>
          <button class="btn-delete" name="btn-delete-${post.id}"  >Delete this post</button>
        </article>`;
};

const setUpCardsEvent = cardsElement => {
  cardsElement.addEventListener('click', event => {
    console.log(event.target);
    if (event?.target?.name?.startsWith('btn-delete')) {
      const id = +event.target.name.substring(11);
      console.log(id);
      deletePost(id).then(data => {
        state.posts = state.posts.filter(post => {
          return post.id !== id;
        });
      });
    }
  });
};

// INIT
const init = () => {
  renderPostCard();
  const cardsElement =  document.querySelector(
    ".article__container"
  );
  console.log('card element val: ' + cardsElement);
  setUpCardsEvent(cardsElement);

  getPosts().then(data => {
    state.posts = data;
  });
};

init();
