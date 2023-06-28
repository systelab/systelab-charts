export class Ticks {
    public static removeInitialAndFinalTick(value, index, values): string {
        return index === 0 || index === values.length - 1 ? '' : value;
    }

    public static removeFinalTick(value, index): string {
        return index === 0 ? '' : value;
    }
}
