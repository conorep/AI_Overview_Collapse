function shredditAdRemoval() {
  let shredditAds = document.querySelectorAll('shreddit-ad-post');
  if(shredditAds) shredditAds.forEach((adEl) => adEl.remove())
}

document.addEventListener('scroll', (e) => {
  shredditAdRemoval();
})

shredditAdRemoval();
