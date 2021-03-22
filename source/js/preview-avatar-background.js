const filesTypes = ['gif', 'jpg', 'jpeg', 'png'];

const avatarFileChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview > img');
const offerFileChooser = document.querySelector('#images');
const offerImgPreview = document.querySelector('.ad-form__photo');

const setPreviewUploadAvatar = () => {
  avatarFileChooser.addEventListener('change', () => {
    const file = avatarFileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = filesTypes.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

const setPreviewUploadImg = () => {
  offerFileChooser.addEventListener('change', () => {
    const file = offerFileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = filesTypes.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        offerImgPreview.style.backgroundImage = `url('${reader.result}')`;
        offerImgPreview.style.backgroundSize = 'cover';
      });

      reader.readAsDataURL(file);
    }
  });
};

const resetImageSrc = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
};

const resetBackgroundPreview = () => {
  offerImgPreview.style.backgroundImage = '';
};

export { setPreviewUploadAvatar, setPreviewUploadImg, resetImageSrc, resetBackgroundPreview };
