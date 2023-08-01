// function that returns the current year as a string
export const getCurrentYear = () => {
    return new Date().getFullYear().toString();
};

// function that takes in a number like 99.79898071289062 and returns a string like 99.79
export const formatNumber = (num: number) => {
    return num.toFixed(2);
};
