export function detectCollisionsMobs(objects, threshold = 60) {
    for (let i = 0; i < objects.length; i++) {
        for (let j = i + 1; j < objects.length; j++) {
            const objA = objects[i];
            const objB = objects[j];

            const dx = (objA.x + objA.width / 2) - (objB.x + objB.width / 2);
            const dy = (objA.y + objA.height / 2) - (objB.y + objB.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            // console.log(distance);

            if (distance < threshold) {
                return { objA, objB };
            }
        }
    }
}