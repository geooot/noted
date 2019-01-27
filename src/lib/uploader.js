const image2base64 = require('image-to-base64');

/**
 * Function to retrive the GCP Text Detection for an image
 * @param {String} imagePath File path for the image you want to classify
 * @return {String} Returns the text representation of the supplied image
 */
export function getTextFromImage(imagePath) {
  return image2base64(imagePath)
    .then((response) => {
      console.log(response);
      return response
    }).then(response => {
      return fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB2ryymZC_3vKF0vkQtZOH0aNiroY98ui8', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: {
          "requests": [
            {
              "image": {
                "content": encryptedImage
              },
              "features": [
                {
                  "type": "TEXT_DETECTION"
                }
              ]
            }
          ]
        }
      })
    }).then(res => res.json())
    .catch(
      (error) => {
        console.log(error);
      }
    )
}

/**
 * Function to only retrive the entire text dump from the entire GCP Response
 * @param {String} gcpResponse Response from the Google Cloud Platform for the image text
 * detection: Should be in a String format
 * @return Only the relevant text dump property from the JSON 
 */
export function getKeywords(gcpResponse) {
  let picObject = JSON.parse(gcpResponse);
  try {
    return picObject.textAnnotations.description;
  } catch (error) {
    console.error(error);
    return error;
  }
}