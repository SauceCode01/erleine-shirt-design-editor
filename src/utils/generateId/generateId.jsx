
var counter = 0

export const generateId = (prefix="id") => {
    const timestamp = new Date().getTime();
    counter += 1
    return `${prefix}_${counter}_${timestamp}`;
};


