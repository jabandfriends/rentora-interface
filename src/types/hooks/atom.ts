export type SetAtom<T> = (value: T | ((prev: T) => T)) => void
