import { ToastQueue, ToastOptions } from "@react-stately/toast";

type Variant = "neutral" | "informative" | "positive" | "negative";

export interface ToastItem {
  variant: Variant;
  description: string;
  action?: {
    onClick: () => void;
    label: string;
    closeToastAfterAction?: boolean;
  };
}

export const toastQueue = new ToastQueue<ToastItem>({
  maxVisibleToasts: 5
});

export const addToast = (
  toast: ToastItem,
  options?: ToastOptions | undefined
) => {
  if (
    !!toastQueue.visibleToasts.find(
      t => t.content.description === toast.description
    )
  )
    return;
  const key = toastQueue.add(toast, options);
  if (!options?.timeout) {
    setTimeout(() => {
      toastQueue.remove(key);
    }, options?.timeout);
  }
};
