import { FileSystem } from 'react-native';
/**
 * Function to retrive the GCP Text Detection for an image
 * @param {String} imagePath File path for the image you want to classify
 * @return {String} Returns the text representation of the supplied image
 */
export function getTextFromImage(image) {
  return fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAPjODd5WkrYBaDVMnOWBr2gkgqkKTFPes', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "requests": [
        {
          "image": {
            "content": image
          },
          "features": [
            {
              "type": "TEXT_DETECTION"
            }
          ]
        }
      ]
    })
  }).then(res => res.json())
    .then(json => getKeywords(json))
    .catch(
      (error) => {
        console.error(error);
      }
    )
}

/**
 * Function to only retrive the entire text dump from the entire GCP Response
 * @param {String} gcpResponse Response from the Google Cloud Platform for the image text
 * detection: Should be in a String format
 * @return Only the relevant text dump property from the JSON 
 */
export function getKeywords(picObject) {
  console.log(Object.keys(picObject))
  try {
    return picObject.responses[0].textAnnotations[0].description;
  } catch (error) {
    return "";
  }
}