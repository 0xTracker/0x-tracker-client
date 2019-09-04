import AutoReload from './auto-reload';

describe('auto reload', () => {
  afterEach(() => {
    AutoReload.clearListeners();
    AutoReload.stop();
  });

  it('should add listeners', () => {
    const handler = () => {};
    const handler2 = () => {};

    AutoReload.addListener(handler);
    AutoReload.addListener(handler2);

    expect(AutoReload.getListeners()).toEqual([handler, handler2]);
  });

  it('should remove specified listener', () => {
    const handler = () => {};
    const handler2 = () => {};

    AutoReload.addListener(handler);
    AutoReload.addListener(handler2);
    AutoReload.removeListener(handler);

    expect(AutoReload.getListeners()).toEqual([handler2]);
  });

  it('should clear all listeners', () => {
    AutoReload.addListener(() => {});
    AutoReload.addListener(() => {});
    AutoReload.clearListeners();

    expect(AutoReload.getListeners()).toHaveLength(0);
  });

  it('should call registered listeners after specified interval', () => {
    jest.useFakeTimers();

    const handler = jest.fn();
    const handler2 = jest.fn();

    AutoReload.start(1000);
    AutoReload.addListener(handler);
    AutoReload.addListener(handler2);

    expect(handler).toHaveBeenCalledTimes(0);
    expect(handler2).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1000);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(1);

    AutoReload.removeListener(handler);

    jest.advanceTimersByTime(1000);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler2).toHaveBeenCalledTimes(2);
  });
});
