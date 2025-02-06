export function itemsDetectorColl(object, threshold = 60){
    for (let i = 0; i < object.length; i++) {
        for (let j = i + 1; j < object.length; j++) { 
            const objA = object[i];
            const objB = object[j];

            const dx = (objA.x + objA.width / 2) - (objB.x + objB.width / 2);
            const dy = (objA.y + objA.height / 2) - (objB.y + objB.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < threshold) {
                // console.log(`sebuah ${objB.name} tertimpa oleh ${objA.name}`)
                return {items : objB}
            }

            
        }
    }
}