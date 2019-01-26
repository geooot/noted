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
})

/**
 * Adds a new class tag to storage
 * @param {integer/String} tag Tag with id and name
 */
export const addNewClassTag = (tag) {
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