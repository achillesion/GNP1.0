export const compareObjects = (obj1: object, obj2: object) =>
	JSON.stringify(obj1) === JSON.stringify(obj2);
