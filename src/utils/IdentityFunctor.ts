const IdentityFunctor = <S>(value: S) => {
  return {
    map: <U>(fn: (s: S) => U) => IdentityFunctor(fn(value)),
    get: () => value,
  };
};

export default IdentityFunctor;
