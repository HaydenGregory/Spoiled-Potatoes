// console.log(movieID.dataset)
// document.addEventListener('click', (e) => {
//     if (e.target.classList.contains("edit-button")){ async
//         const movieID = await document.getElementById('edit-button')
//         const userReview = await document.getElementById("user-review")
//         fetch('/specificresult/review/update', {
//             method: "PATCH",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 movieId: movieID,
//                 review: userReview
//             })
//         })
//     }
// })

// <% if (review.UserId === userActive.id) {%>
//     <input id="user-review" class="card-text edit-field" value="<%= review.review %> " >
//       <button data-movieID="<%= movie.imdbID %>" class="moreInfo btn col-12 edit-button">Submit Changes</button>
//     <button data-movieID="<%= movie.imdbID %>" class="moreInfo btn col-12">Delete Review</button>
//     <% } else { %> 
//       <p class="card-text"> <%= review.review %> </p>
//       <% } %>