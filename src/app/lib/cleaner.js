// Define the cleaner function with different cleaning routines based on options
export const cleaner = async (data) => {
    const cleanedData = data.filter(item => {
        for (const key in item) {
            if (item[key] === null) {
                return false; // Exclude the object if any attribute is null
            }
        }
        return true; // Include the object if all attributes are not null
    });
    
    return cleanedData;
};
