const duration = {
  medium: 0.3
};

export const variationResizablePanel = {
  initial: {
    opacity: 0,
    y: -20,
    height: 0
  },
  animate: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: {
      duration: duration.medium / 2,
      delay: duration.medium / 2
    }
  },
  exit: {
    y: -20,
    opacity: 0,
    height: 0,
    transition: {
      duration: duration.medium / 2
    }
  }
};
