
const handleClick = (ramen) => {
  const ramenDetail = document.getElementById('ramen-detail')
  const ratingDisplay = document.getElementById('rating-display')
  const commentDisplay = document.getElementById('comment-display')
  const editRamenForm = document.getElementById("edit-ramen")

  ramenDetail.querySelector('img').src = ramen.image
  ramenDetail.querySelector('img').alt = ramen.name
  ramenDetail.querySelector('h2').textContent = ramen.name
  ramenDetail.querySelector('h3').textContent = ramen.restaurant
 
  ratingDisplay.textContent = ramen.rating
  commentDisplay.textContent = ramen.comment 

  if(editRamenForm) {
   const editRating = editRamenForm.querySelector("#edit-ramen")
   const editComment = editRamenForm.querySelector("#edit-comment")
  
  if(editRating && editComment) {
    editRating.value = ramen.rating;
    editComment.value = ramen.comment;
  } 
  editRamenForm.dataset.currentRamenId = ramen.id;
  }  
};

const addSubmitListener = () => {
  const newRamenDataForm = document.getElementById('new-ramen')
  const ramenDataMenu = document.getElementById('ramen-menu')
  newRamenDataForm.addEventListener('submit', function(event){
    event.preventDefault()

    let ramen = {
      'image': newRamenDataForm.querySelector('#new-image').value,
      'name': newRamenDataForm.querySelector('#new-name').value,
      'restaurant': newRamenDataForm.querySelector('#new-restaurant').value,
      'rating' : newRamenDataForm.querySelector('#new-rating').value,
      'comment': newRamenDataForm.querySelector('#new-comment').value
    }
    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(ramen)
    })
    .then(response => response.json())
    .then(newRamen => {
      ramen.id = newRamen.id;
      ramenData.push(ramen);
    })
    const div = document.createElement('div')
    const image = document.createElement('img')
    image.src = ramen.image
    image.addEventListener('click', () => handleClick(ramen))
    const name = document.createElement('h2')
    name.innerText = ramen.name
    const restaurant = document.createElement('h3')
    restaurant.innerText = ramen.restaurant;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => handleDelete(ramen, div));
    div.append(image, name, restaurant, deleteButton)
   
    ramenDataMenu.append(div)

    // ramen.id = ramenData +1;
    // ramenData.push(ramen)
  })
  const editRamenForm = document.getElementById('edit-ramen')
    editRamenForm.addEventListener("submit", function(event) {
      event.preventDefault();

      console.log("edit this form")
      const currentRamenId = editRamenForm.dataset.currentRamenId
      if (!currentRamenId) {
        return
      }
          const updatedRating = editRamenForm.querySelector('#edit-rating').value;
          const updatedComment = editRamenForm.querySelector('#edit-comment').value;

    fetch(`http://localhost:3000/ramens/${currentRamenId}`, {
      method: 'PATCH',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        rating: updatedRating,
        comment: updatedComment
      })
    })
    .then(response => response.json())
    .then(updateRamen => {
      const ratingDisplay = document.getElementById('rating-display');
      const commentDisplay = document.getElementById('comment-display')

      ratingDisplay.textContent = updatedRating
      commentDisplay.textContent = updatedComment

      const ramen = ramenData.find(ramen => ramen.id === parseInt(currentRamenId))
      if (ramen) {
        ramen.rating = updatedRating
        ramen.comment = updatedComment
    }
    });
  });
};
const handleDelete = (ramen, ramenElement) => {
  const ramenMenu = document.getElementById("ramen-menu");
  const ramenDetail = document.getElementById("ramen-detail");

  fetch('`http://localhost:3000/ramens/${ramen.id}`', {
    method: 'Delete'
  })
  .then(() => {   
    ramenMenu.removeChild(ramenElement);

    ramenData = ramenData.filter(item => item.id !== ramen.id);
    
    const currentRamenId = ramenDetail.querySelector('img').alt === ramen.name ? ramen.id : null;
    if (currentRamenId) {
      ramenDetail.querySelector("img").src = " ";
      ramenDetail.querySelector("img").alt = " ";
      ramenDetail.querySelector("h2").textContent = " ";
      ramenDetail.querySelector("h3").textContent = " ";
      document.getElementById("rating-display").textContent = " ";
      document.getElementById("comment-display").textContent = " ";
  
    } 
  })
}


const displayRamens = () => {
  const ramenMenu = document.getElementById('ramen-menu')
  fetch('http://localhost:3000/ramens')
  .then(function(response){
    return response.json()
  })
  .then(function(data){
   ramenData = data;
    if (data.length > 0) {
      handleClick(data[0])
    }
    data.forEach(function(ramen){
      const div = document.createElement("div");
      const image = document.createElement('img')
      image.src = ramen.image
      ramenMenu.append(image)
      image.addEventListener('click', () => handleClick(ramen))
      const name = document.createElement("h2");
      name.innerText = ramen.name;
      const restaurant = document.createElement('h3');
      restaurant.innerText = ramen.restaurant

      const deleteButton = document.createElement('button')
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => handleDelete(ramen, div));
      div.append(image, name, restaurant, deleteButton);
      
      ramenMenu.append(div);
    })
  })
};
let ramenData = [];

const main = () => {
  displayRamens()
  addSubmitListener()
}
document.addEventListener('DOMContentLoaded', () => main())
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  handleDelete,
  main,
};
