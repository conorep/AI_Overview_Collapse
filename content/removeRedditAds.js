function shredditAdRemoval() {
  let shredditAds = document.querySelectorAll('shreddit-ad-post');
  if(shredditAds) shredditAds.forEach((adEl) => adEl.remove());
}

function dynamicAdRemoval() {
  if(document.readyState !== 'complete')
    return;

  let shredditDynamicAds = document.querySelectorAll('div[slot="credit-bar"]:not(div#pdp-credit-bar), div[slot="ad-format-content"]');
  if(shredditDynamicAds?.length) {
    shredditDynamicAds.forEach((adEl) => adEl.remove());
    document.removeEventListener('readystatechange', dynamicAdRemoval);
  }
}

document.addEventListener('readystatechange', dynamicAdRemoval);

document.addEventListener('scroll', shredditAdRemoval)
shredditAdRemoval();
