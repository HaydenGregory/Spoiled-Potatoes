document.addEventListener('click', (e) => {
    if (e.target.classList.contains('favMovie')) {
        fetch(`/specificresult/fav/${e.target.dataset.movieid}`, {
            method: "POST"
        })
            .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
    }
})