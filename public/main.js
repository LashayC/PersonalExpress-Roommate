const heart = document.getElementsByClassName("fa-heart");
const going = document.getElementsByClassName("fa-arrow-right");
const contacted = document.getElementsByClassName("fa-phone");
const trash = document.getElementsByClassName("fa-trash");

Array.from(heart).forEach(function(element) {
      element.addEventListener('click', function(){
        const postObjectID = this.parentNode.parentNode.id
         //console.log(`this ${postObjectID}`)

        const heart = parseFloat(this.parentNode.childNodes[1].innerText)
        // console.log(heart)

        fetch('updateHeart', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'postObjectID': postObjectID,
            'heart': heart
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
       });
});

Array.from(going).forEach(function(element) {
  element.addEventListener('click', function(){
    const postObjectID = this.parentNode.parentNode.id
     //console.log(`this ${postObjectID}`)

    const going = parseFloat(this.parentNode.childNodes[1].innerText)
    // console.log(going)

    fetch('updateGoing', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'postObjectID': postObjectID,
        'going': going
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
   });
});

Array.from(contacted).forEach(function(element) {
  element.addEventListener('click', function(){
    const postObjectID = this.parentNode.parentNode.id
     //console.log(`this ${postObjectID}`)

    const contacted = parseFloat(this.parentNode.childNodes[1].innerText)
    // console.log(going)

    fetch('updateContacted', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'postObjectID': postObjectID,
        'contacted': contacted
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
   });
});


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const postObjectID = this.parentNode.parentNode.id

        fetch('deletePosts', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'postObjectID':postObjectID
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
