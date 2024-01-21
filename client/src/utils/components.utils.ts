/* eslint-disable @typescript-eslint/no-explicit-any */

interface Options<T> {
  payload: T[];
  options: {
    key: keyof T | string;
    value: keyof T | string;
  };
}

export default {
  optionTransformer: <T>(args: Options<T>) => {
    const { payload, options } = args;

    return payload?.map((items: any) => ({
      title: items[options.key],
      value: items[options.value],
    }));
  },
};
