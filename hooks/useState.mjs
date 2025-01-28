function createUseState() {
     let states = [];
     let index = 0;

     function useState(initialValue) {
          const currentIndex = index;

          if (states[currentIndex] === undefined) {
               states[currentIndex] = initialValue;
          }


          const setState = (newValue) => {
               states[currentIndex] =
                    typeof newValue === "function" ? newValue(states[currentIndex]) : newValue;
               return states[currentIndex];
          };


          index++;
          return [states[currentIndex], (newValue) => setState(newValue)];
     }

     return {
          useState
     };
}

const {
     useState
} = createUseState();
export {
     useState
};