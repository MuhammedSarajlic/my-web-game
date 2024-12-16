export type Hitbox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export function isColliding(a: Hitbox, b: Hitbox): boolean {
  console.log('hitbox');
  console.log(a);
  console.log(b);

  return (
    a.x < b.x + b.width &&
    b.x < a.x + a.width &&
    a.y + a.height > b.y &&
    b.y + b.height > a.y
  );
}
