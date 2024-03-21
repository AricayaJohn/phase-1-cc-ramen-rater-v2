
const handleClick = (ramen) => {
  const ramenDetail = document.getElementById('ramen-detail')
  const ratingDisplay = document.getElementById('rating-display')
  const commentDisplay = document.getElementById('comment-display')

  ramenDetail.querySelector('img').src = ramen.image
  ramenDetail.querySelector('img').alt = ramen.name
  ramenDetail.querySelector('h2').textContent = ramen.name
  ramenDetail.querySelector('h3').textContent = ramen.restaurant
 
  ratingDisplay.textContent = ramen.rating
  commentDisplay.textContent = ramen.comment 
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
    const div = document.createElement('div')
    const image = document.createElement('img')
    image.src = ramen.image
    image.addEventListener('click', () => handleClick(ramen))
    const name = document.createElement('h2')
    name.innerText = ramen.name
    const restaurant = document.createElement('h3')
    restaurant.innerText = ramen.restaurant
    div.append(image, name, restaurant)
    ramenDataMenu.append(div)
  })
}
const displayRamens = () => {
  const ramenMenu = document.getElementById('ramen-menu')
  fetch('http://localhost:3000/ramens')
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    data.forEach(function(ramen){
      const image = document.createElement('img')
      image.src = ramen.image
      ramenMenu.append(image)
      image.addEventListener('click', () => handleClick(ramen))
    })
  })
};
const main = () => {
  displayRamens()
  addSubmitListener()
}
document.addEventListener('DOMContentLoaded', () => main())
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};