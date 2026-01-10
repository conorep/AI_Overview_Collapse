(() => {
  if(window.location?.href.startsWith('https://www.google.com/search')) {
    const AIElementFlag = 'AI Overview';
    let killRecursion = false;

    const observeElementChanges = () => {
      let onMutationsObserved = function(mutations, thisObserver) {
        for(const mutation of mutations) {
          for(const aNode of mutation.addedNodes) {
            recurseThroughChildNodes(aNode, thisObserver);
          }
        }
      };
      const config = { childList: true, subtree: true };
      const observer = new MutationObserver(onMutationsObserved);
      observer.observe(document, config);
    }

    const recurseThroughChildNodes = (insertedNode, theObserver) => {
      if(killRecursion) return;

      if(insertedNode.nodeName === 'H1' && insertedNode.innerHTML === AIElementFlag) {
        let collapseButton = document.createElement('button');
        collapseButton.innerText = 'Show or Hide AI Overview';
        collapseButton.id = 'googleAccordion';

        let hveidElement = insertedNode.closest('div[data-hveid]');
        while(hveidElement && !hveidElement.parentElement.dataset.hveid) {
          hveidElement = insertedNode.closest('div[data-hveid]');
          if(hveidElement === null) break;
        }
        if(!hveidElement) return;

        hveidElement = hveidElement.parentElement;
        let leftOffsetElement = document.querySelector('div[role="navigation"]');
        collapseButton.style.marginLeft = leftOffsetElement.getBoundingClientRect().left + 'px';

        resizeHandler(leftOffsetElement, collapseButton);
        hveidElement?.insertAdjacentElement('beforebegin', collapseButton);
        boxTheAIOverview(hveidElement);

        theObserver.disconnect();
        killRecursion = true;
        return;
      }

      if(insertedNode.childNodes?.length > 0) {
        for(const subNode of insertedNode.childNodes) {
          recurseThroughChildNodes(subNode, theObserver);
        }
      }
    }

    observeElementChanges();
  }
})();

function resizeHandler(offsetLeftEl, buttonEl) {
  function resetLeftOffset() {
    buttonEl.style.marginLeft = offsetLeftEl.getBoundingClientRect().left + 'px';
  }
  window.addEventListener('resize', resetLeftOffset);
  showAndHideAIOverview(buttonEl);
}

function boxTheAIOverview(overviewElement) {
  let collapsibleContainer = document.createElement('div');
  collapsibleContainer.id = 'collapsingAIContent';
  overviewElement.insertAdjacentElement('beforebegin', collapsibleContainer);
  collapsibleContainer.append(overviewElement);
}

function showAndHideAIOverview(collapseButton) {
  collapseButton.addEventListener('click', function() {
    this.classList.toggle('active');
    let content = this.nextElementSibling;

    if(content.style.maxHeight)
      content.style.maxHeight = '';
    else
      content.style.maxHeight = "100%";
  });
}
