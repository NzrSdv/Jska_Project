

if (!localStorage.getItem("products")) {
    fetch("https://fortnite-api.com/v2/cosmetics/br/?&language=ru",{//https://dash.fortnite-api.com/endpoints/banners
        method: 'GET'
    })
        .then(res => res.json())
        .then(ans => {
            console.log(ans)
        })
}
else {
    }