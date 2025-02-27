
var counter = 0

export const generateId = () => {
    const timestamp = new Date().getTime();
    counter += 1
    return `id_${counter}_${timestamp}`;
};