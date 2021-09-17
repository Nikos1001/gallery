import { World } from "./world";

function setupGallery(w : World) {
    // Create outer walls
    w.createWall(-15.5, 2, 0, 1, 5, 30);
    w.createWall(15.5, 2, 0, 1, 5, 30);
    w.createWall(8, 2, -15.5, 14, 5, 1);
    w.createWall(-8, 2, -15.5, 14, 5, 1);
    w.createWall(0, 2, 15.5, 30, 5, 1);
    w.createFloor(0, 0, 0, 30, 30);
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
    w.createWall(10, 0.5, 0, 1, 2, 30);
    w.createWall(-10, 0.5, 0, 1, 2, 30);
    for(let x = -12.5; x <= 12.5; x += 2.5) {
        w.createPainting(9.49, 0.4, x, -Math.PI / 2, 1.5);
        w.createPainting(-9.49, 0.4, x, Math.PI / 2, 1.5);
    }
    
    function firstFloorHallwayPaintings(z : number) {
        w.createPainting(4.49, 0.4, z, -Math.PI / 2, 1.5);
        w.createPainting(-4.49, 0.4, z, Math.PI / 2, 1.5);
        w.createPainting(5.51, 0.4, z, Math.PI / 2, 1.5);
        w.createPainting(-5.51, 0.4, z, -Math.PI / 2, 1.5);
    }
    function firstFloorCapPaintings(x : number) {
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
}

export { setupGallery }