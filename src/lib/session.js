import { AsyncStorage } from 'react-native'

// This file is for storing stuff

/**
 * Retrieves all possible tags from the storage 
 */
export const getAllTags = async () => {
    let routes = [];
    try {
        let res = AsyncStorage.getItem('tags');
        tags = JSON.parse(res);
        if(tags) {
            return Promise.resolve(tags);
        }
        return Promise.reject();
    } catch(error) {
        Promise.reject(error)
    }
};

/**
 * Adds a new class tag to storage
 * @param {integer/String} tag Tag with id and name
 */
export const addNewTag = (tag) => {
    return AsyncStorage.getItem('tags').then(item => {
        return JSON.parse(item);
    }).then(arr => {
        if(arr === null) {
            arr = [];
        }
        arr.push(tag);
        return AsyncStorage.setItem('tags', JSON.stringify(arr));
    });
}

/**
 * Returns all of the pictures in the pictures part of the database
 */
export const getAllPictures = async () => {
    let routes = [];
    try {
        let res = AsyncStorage.getItem('pictures');
        pictures = JSON.parse(res);
        if(tags) {
            return Promise.resolve(pictures);
        }
        return Promise.reject();
    } catch(error) {
        Promise.reject(error)
    }
};

/**
 * Adds a new picture to storage
 * @param {integer/String/DateTime/DateTime/String/integer} Picture Picture to add to storage
 */
export const addNewPicture = (picture) => {
    return AsyncStorage.getItem('pictures').then(item => {
        return JSON.parse(item);
    }).then(arr => {
        if(arr === null) {
            arr = [];
        }
        arr.push(picture);
        return AsyncStorage.setItem('pictures', JSON.stringify(arr));
    });
}
