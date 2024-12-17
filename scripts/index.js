function openModal(popup) {
  popup.classList.add("popup_is-opened");
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

[profilePopup, cardPopup, imagePopup].forEach((popup) =>
  popup.classList.add("popup_is-animated")
);

const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");

imagePopupCloseButton.addEventListener("click", () =>
  closeModal(imagePopup)
);

function addCardHandlers(cardElement, cardData) {
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.addEventListener("click", () => {
    imagePopupImage.src = cardData.link;
    imagePopupImage.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;
    openModal(imagePopup);
  });

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () =>
    likeButton.classList.toggle("card__like-button_is-active")
  );

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () =>
    deleteButton.closest(".card").remove()
  );
}

function createCard(cardData) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  cardElement.querySelector(".card__title").textContent = cardData.name;

  addCardHandlers(cardElement, cardData);

  return cardElement;
}

const cardContainer = document.querySelector(".places__list");
initialCards.forEach((cardData) => {
  cardContainer.append(createCard(cardData));
});

// редактирование профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const openEditProfileButton = document.querySelector(".profile__edit-button");
const closeEditProfileButton = profilePopup.querySelector(".popup__close");
const profileForm = profilePopup.querySelector(".popup__form");
const profileTitleInput = profilePopup.querySelector(".popup__input_type_name");
const profileDescriptionInput = profilePopup.querySelector(".popup__input_type_description");

openEditProfileButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

closeEditProfileButton.addEventListener("click", () =>
  closeModal(profilePopup)
);

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profilePopup);
});

const addCardButton = document.querySelector(".profile__add-button");
const closeCardPopupButton = cardPopup.querySelector(".popup__close");
const cardForm = cardPopup.querySelector(".popup__form");
const cardNameInput = cardPopup.querySelector(".popup__input_type_card-name");
const cardLinkInput = cardPopup.querySelector(".popup__input_type_url");

addCardButton.addEventListener("click", () => {
  cardNameInput.value = "";
  cardLinkInput.value = "";
  openModal(cardPopup);
});

closeCardPopupButton.addEventListener("click", () =>
  closeModal(cardPopup)
);

cardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newCard = createCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  });
  cardContainer.prepend(newCard);
  closeModal(cardPopup);
});
