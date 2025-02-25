


export const generateId = (object, prefix="") => {
  if (!object.id) {
    const timestamp = new Date().getTime();
    object.id = `${prefix}_${timestamp}`;
  }
  return object.id;
}