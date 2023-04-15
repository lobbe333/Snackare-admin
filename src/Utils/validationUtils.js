export function validateEmail(email) {
  const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return regex.test(email);
}

export function validatePhoneNumber(phoneNumber) {
  // Adjust the regex according to the desired phone number format
  const regex = /^\d{10}$/; // Validates a 10-digit phone number
  return regex.test(phoneNumber);
}

export function validateName(name) {
  return name.trim() !== '';
}

export function validateImgUrl(imgUrl) {
  const regex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
  return regex.test(imgUrl);
}

export function validateShortDescription(shortDescription) {
  return shortDescription.trim() !== '';
}

export function validateTopics(topics) {
  return topics.length > 0;
}

export function validateHeader(header) {
  return header.trim() !== '';
}

export function validateLongDescription(longDescription) {
  return longDescription.trim() !== '';
}

export function validateReviews(reviews) {
  return reviews.length > 0
}

export function validateExampleLectures(exampleLectures) {
  return exampleLectures.length > 0
}






