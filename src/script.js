const ol = document.getElementById('posts');
// const tbl = document.getElementById('posts');
// tbl.style.width = '300px';
// tbl.style.border = '1px solid black';


// create a DOM instance that will hold other elements
// for the list
const list = document.createDocumentFragment();

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => {
    let posts = data;
    console.log(posts);

    posts.map(function (post) {
      // regular list dom to populate fetched data
      let li = document.createElement('li');
      li.innerHTML = ` ${post.title}`;
      list.appendChild(li);

      // table to fetch data
      // const tr = tbl.insertRow();
      // const td = tr.insertCell();
      // td.style.border = '1px solid black';
      // td.appendChild(document.createTextNode(`${post.id} ${post.title}`));
    });

    // append the instance to the default dom
    ol.appendChild(list);
  });
