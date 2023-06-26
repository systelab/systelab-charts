type KeySelector<T> = (item: T) => string;

export const arrayToObject = <T, K>(array: Iterable<T>, keySelector: KeySelector<T>): Record<string, T> => {
    const result: Record<string, T> = { };
    for(const item of array) {
        result[keySelector(item)] = item;
    }
    return result;
};
