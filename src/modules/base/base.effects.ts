const useBaseEffects$ = () => {
  const Errorf = (
    err: Error | string,
    errInstance: ErrorConstructor = Error,
    group: string | false = false,
    collapsed = false
  ): Error => {
    const error = SErrorf(err, errInstance);

    if (group) {
      collapsed ? console.groupCollapsed(group) : console.group(group);
      console.error(error);
      console.groupEnd();
    } else {
      console.error(group, error);
    }

    return error;
  };

  const SErrorf = (
    err: Error | string,
    errInstance: ErrorConstructor = Error
  ): Error => (err instanceof Error ? err : new errInstance(logWrapper(err)));

  const Logf = (
    log: string,
    group: string | false = false,
    collapsed = false
  ): string => {
    const logs = SLogf(log);

    if (group) {
      collapsed ? console.groupCollapsed(group) : console.group(group);
      console.log(logs);
      console.groupEnd();
    } else {
      console.log(group, logs);
    }

    return logs;
  };

  const SLogf = (log: string): string => logWrapper(log);

  const logWrapper = (log: string): string =>
    log
      .split('\n')
      .map((s) => s.trim())
      .join('\n')
      .trim();

  return {
    Errorf,
    SErrorf,
    Logf,
    SLogf
  };
};

export default useBaseEffects$;
