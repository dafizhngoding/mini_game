export function detectCollisionsMobs(objects, threshold = 90) {
    for (let i = 0; i < objects.length; i++) {
        for (let j = i + 1; j < objects.length; j++) {
            const objA = objects[i];
            const objB = objects[j];

            const dx = (objA.x + objA.width / 2) - (objB.x + objB.width / 2);
            const dy = (objA.y + objA.height / 2) - (objB.y + objB.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            // console.log(distance);

            if (distance < threshold) {
                console.log(`Collision detected between ${objA.name} and ${objB.name}`);
                objB.speed = 0
                // Jika dua mob bertabrakan, pisahkan mereka sedikit
                if (objA.type === "mob" && objB.type === "mob") {
                    const angle = Math.atan2(dy, dx);
                    const moveX = Math.cos(angle) * 2;
                    const moveY = Math.sin(angle) * 2;

                    objA.x += moveX;
                    objA.y += moveY;
                    objB.x -= moveX;
                    objB.y -= moveY;
                }
                objB.x = objB.x -= 1;

                // Jika mob mendekati player, buat dia berhenti
                if (objA.type === "goblin" && objB.name === "player") {
                    objA.speed = 0; // Mob berhenti jika sudah dalam jarak threshold ke player
                }
                if (objB.type === "goblin" && objA.name === "player" || objB.name == "mob1" || objB.name === "mob2" || objB.name === "mob3") {
                    objB.speed = 0; // Jika player mendekati mob, mob juga berhenti
                    objB.image = "/assets/Mobs/Goblin/Menebas.gif"
                    if (objA.name === "player") {
                        objA.image = "/assets/Main Character/Hero 1/Mati.gif"
                    }
                    if (objA.type === "goblin") {
                        objA.image = "/assets/Mobs/Goblin/Menebas.gif"

                    }


                    console.log(objB.image);
                }
            } else {
                // Jika mob masih jauh dari player, biarkan dia tetap bergerak normal
                // if (objA.type === "mob" && objB.name === "player") {
                //     objA.speed = 1; // Normal speed
                // }
                // if (objB.type === "mob" && objA.name === "player") {
                //     objB.speed = 1; // Normal speed
                // }
                objB.image = "/assets/Mobs/Goblin/Berlari.gif"
                if (objA.name === "player") {
                    objA.image = "/assets/Main Character/Hero 1/Berlari.gif"
                }

                objB.speed = 1; //
            }
        }
    }
}