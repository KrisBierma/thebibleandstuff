

export const sortingFunctions = (data2, skipped, difference, toFind) => {

// function sortPlurals() {
// check all the ungrouped words for plurals (just adding -s)
    for (let i=0; i<data2.length; i++) {
      // if data is grouped, skip it
      while (skipped.indexOf(i) !== -1) {
          i = i+1;
          // console.log(i)
      }      

        for (let j=0; j<data2.length; j++) {
          // don't compare word to itself or word to grouped words
          if (j === i && j !== data2.length-1) {
              j = j+1;
          }     
          // only continue if the difference of lengths is 1
          let d1 = data2[i].wordle.length;
          let d2 = data2[j].wordle.length;
          // console.log(d1, d2)
          if (d1 - d2 === -difference || d1 - d2 === difference) {
            let w1 = data2[i].wordle;
            let w2 = data2[j].wordle;
            let l1 = w1.length;
            let l2 = w2.length;
            let greater, lesser;

            // find the greater and lesser number
            function findThem() {
              return l1 > l2 ? (greater = w1, lesser = w2) : (greater = w2, lesser = w1)
            };
            findThem();

            // compare data[i] to data[j]
            // check if the last letter of the greater is s
            var last = greater.length-1;
            if (greater[last] === toFind) {
              let greaterObj, lesserObj, greaterIndex, lesserIndex;
              function findThem2() {
                return l1 > l2 ? (greaterObj = data2[i], lesserObj = data2[j], greaterIndex = data2.indexOf(data2[i]), lesserIndex = data2.indexOf(data2[j])) : (greaterObj = data2[j], lesserObj = data2[i], greaterIndex = data2.indexOf(data2[j]), lesserIndex = data2.indexOf(data2[i]))
              };
              findThem2();
// console.log(i,j)

              // compare letter by letter
              let flagCount = 0;
              for (let k=0; k<lesser.length; k++) {
                if (lesser[k].toLowerCase() === greater[k].toLowerCase()) {
                  flagCount++;
                  // console.log(lesser, greater, lesser[k].toLowerCase(), greater[k].toLowerCase())
                }
              }
              let tempArr = [];
              let locations = [];
              // if all the letters match add to tempArr, change value
              if (flagCount === lesser.length) {
                console.log('---------------------------------------')
                console.log(lesser, greater)

                tempArr.push(lesserObj, greaterObj);
                locations.push(greaterIndex, lesserIndex);

                // consolidate all the found synonyms and values into once index (the first one of the synonyms array) of the data2 array and remove the other locations/values
                let tempValue = tempArr.reduce(function(prev, cur) {
                  return prev + cur.value;
                }, 0);
                let tempWords = tempArr[0].wordle + '(s)'; 

                // set the new word and value
                data2[lesserIndex].wordle = tempWords;
                data2[lesserIndex].value = tempValue;
// console.log(tempArr, tempValue, tempWords)
                locations.sort(function(a,b){return b-a;});
// console.log(data2)                 
                // order locations array in descending order so the splicing happens from back to front
                for (let i=0; i<tempArr.length; i++){
                  if (locations[i] !== lesserIndex) {
                    data2.splice(locations[i], 1);
                  }
                }
              }
            }
          }  
        }

      }
    // }
      
}