export function createMarkup(photos) {
    return photos
      .map(photo => {
        return `<li class="photo-card">
        <div class="photo-img-wrap">
        <a class="gallery__link" href="${photo.largeImageURL}">
          <img class="photo-img" src="${photo.webformatURL}" alt="${photo.tags}" loading="lazy" width="400"
          height="300"/>
          </a>
        </div>
          <div class="info">
            <p class="info-item">
              <b>Likes<span class="info-amount">${photo.likes}</span></b>
            </p>
            <p class="info-item">
              <b>Views<span class="info-amount">${photo.views}</span></b>
            </p>
            <p class="info-item">
              <b>Comments<span class="info-amount">${photo.comments}</span></b>
            </p>
            <p class="info-item">
              <b>Downloads<span class="info-amount">${photo.downloads}</span></b>
            </p>
          </div>
       </li>`;
      })
      .join('');
  }