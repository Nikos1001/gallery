
async function setupGallery(w) {
    // Create outer walls
    w.createWall(-15.5, 2, 0, 1, 5, 30);
    w.createWall(15.5, 2, 0, 1, 5, 30);
    w.createWall(8, 2, -15.5, 14, 5, 1);
    w.createWall(-8, 2, -15.5, 14, 5, 1);
    w.createWall(0, 2, 15.5, 30, 5, 1);
    w.createFloor(0, -0.5, 0, 32, 32);
    w.createWall(0, 3, -15.5, 30, 3, 1);
    
    // Create central hall
    w.createWall(5, 0.5, -11.5, 1, 2, 7);
    w.createWall(-5, 0.5, -11.5, 1, 2, 7);
    w.createWall(5, 0.5, 0, 1, 2, 10);
    w.createWall(-5, 0.5, 0, 1, 2, 10);
    w.createWall(5, 0.5, 11.5, 1, 2, 7);
    w.createWall(-5, 0.5, 11.5, 1, 2, 7);
    w.createWall(5, 1.5, 0, 1, 1, 30);
    w.createWall(-5, 1.5, 0, 1, 1, 30);

    // Bottom floor outer walls
    w.createWall(10, 1, 0, 1, 3, 30);
    w.createWall(-10, 1, 0, 1, 3, 30);

    // Create upper floor walls
    w.createWall(-10.5, 3, 0, 10, 2, 30);
    w.createWall(10.5, 3, 0, 10, 2, 30);
    w.createWall(0, 4.5, 0, 30, 1, 30);
    w.createFloor(-5, 2.01, 0, 1, 30);
    w.createFloor(5, 2.01, 0, 1, 30);

    w.createWall(3.125, 1.75, 14, 2.75, 0.5, 2);
    w.createFloor(3.125, 2.01, 14, -2.75, -2);
    w.createWall(-3.125, 1.75, 14, 2.75, 0.5, 2);
    w.createFloor(-3.125, 2.01, 14, 2.75, 2);

    for(let x = -12.5; x <= 12.5; x += 2.5) {
        w.createPainting(9.49, 0.4, x, -Math.PI / 2, 1.5);
        w.createPainting(-9.49, 0.4, x, Math.PI / 2, 1.5);
    }
    
    async function firstFloorHallwayPaintings(z) {
        w.createPainting(4.49, 0.4, z, -Math.PI / 2, 1.5);
        w.createPainting(-4.49, 0.4, z, Math.PI / 2, 1.5);
        w.createPainting(5.51, 0.4, z, Math.PI / 2, 1.5);
        w.createPainting(-5.51, 0.4, z, -Math.PI / 2, 1.5);
    }
    async function firstFloorCapPaintings(x) {
        w.createPainting(x, 0.4, -14.99, 0, 1.5);
        w.createPainting(x, 0.4, 14.99, Math.PI, 1.5);
    }

    firstFloorCapPaintings(2.75);
    firstFloorCapPaintings(-2.75);
    firstFloorCapPaintings(7.5);
    firstFloorCapPaintings(-7.5);

    firstFloorHallwayPaintings(-12.5);
    firstFloorHallwayPaintings(-10);
    for(let x = -3; x <= 3; x += 3) {
        firstFloorHallwayPaintings(x);
    }
    firstFloorHallwayPaintings(12.5);
    firstFloorHallwayPaintings(10);
    async function secondFloorPaintings(x) {
        w.createPainting(5.49, 3, x, -Math.PI / 2, 1.5);
        w.createPainting(-5.49, 3, x, Math.PI / 2, 1.5);
    }

    for(let x = -12.5; x <= 12.5; x += 2.5)
        secondFloorPaintings(x);

    console.log(w.currPaintingIdx);
}

export { setupGallery }