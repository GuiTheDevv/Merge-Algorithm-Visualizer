export function mergeSort(array) {
    const animations = [];
    if (array.length  <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length -1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper (
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    if (startIdx === endIdx) return;
    const midIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, midIdx, mainArray, animations);
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
    while (i <= midIdx && j <= endIdx) {
        const animation = {};
        animation.comparison = [i, j];
        if ( auxiliaryArray[i] <= auxiliaryArray[j]) {
            animation.swap = [k, auxiliaryArray[i]];
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animation.swap = [k, auxiliaryArray[j]];
            mainArray[k++] = auxiliaryArray[j++];
        }
        animations.push(animation);
    }
    while (i <= midIdx) {
        animations.push({
            comparison: [i, i],
            swap: [k, auxiliaryArray[i]],
        });
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push({
            comparison: [j, j],
            swap: [k, auxiliaryArray[j]],
        });
        mainArray[k++] = auxiliaryArray[j++];
    }
}