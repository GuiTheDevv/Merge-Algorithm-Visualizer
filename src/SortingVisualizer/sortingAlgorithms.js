//merge sort


export function mergeSort(array) {

    //// Create an empty array to store the animations
    const animations = [];

     // If the array has 0 or 1 elements it is already sorted
    if (array.length  <= 1) return array;

    // Make a copy of the input array to use as an auxiliary array during the sort
    const auxiliaryArray = array.slice();

    //perform merge sort recursively
    mergeSortHelper(array, 0, array.length -1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper (
    mainArray, //array to sort
    startIdx, 
    endIdx,
    auxiliaryArray,
    animations, //array for animations
) {
    if (startIdx === endIdx) return; //invalidates single element arrays

    //find middle index
    const midIdx = Math.floor((startIdx + endIdx) / 2);

    //sort first half
    mergeSortHelper(auxiliaryArray, startIdx, midIdx, mainArray, animations);
    
    //sort second half
    mergeSortHelper(auxiliaryArray, midIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, midIdx, endIdx, auxiliaryArray, animations);
}

function doMerge (
    mainArray,
    startIdx,
    midIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    let k = startIdx;
    let i = startIdx;
    let j = midIdx + 1;

    // Merge subarrays into one sorted array in main array
    while (i <= midIdx && j <= endIdx) {
        const animation = {};
        animation.comparison = [i, j];
        
        // Compare elements  smaller into main
        if ( auxiliaryArray[i] <= auxiliaryArray[j]) {
            animation.swap = [k, auxiliaryArray[i]];
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animation.swap = [k, auxiliaryArray[j]];
            mainArray[k++] = auxiliaryArray[j++];
        }
        animations.push(animation);
    }

    // Move any remaining elements in first subarray to main
    while (i <= midIdx) {
        animations.push({
            comparison: [i, i],
            swap: [k, auxiliaryArray[i]],
        });
        mainArray[k++] = auxiliaryArray[i++];
    }

    // Move any remaining elements in second subarray to main
    while (j <= endIdx) {
        animations.push({
            comparison: [j, j],
            swap: [k, auxiliaryArray[j]],
        });
        mainArray[k++] = auxiliaryArray[j++];
    }
}

// bubble sort

export function bubbleSort(array) {
    //array to store information about sorting for animations
    const animations = [];

    //sets n to length of array
    const n = array.length;

    //control the amount of passes over the array
    for (let i = 0; i < n - 1; i++) {

      //compare adjacent elements and swap if wrong
      for (let j = 0; j < n - i - 1; j++) {

        //check if current element is greater than next 
        if (array[j] > array[j + 1]) {

          // adds elements to animations array
          animations.push([j, j + 1, true]);

          //swaps the elements
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        } 
        
        //adds elements to animations array, false means it doesnt need to be swapped
        else {
          animations.push([j, j + 1, false]);
        }
      }
    }
    return animations;
  }



  
  