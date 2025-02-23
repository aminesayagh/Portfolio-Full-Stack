import en from "./messages/en.json";
import fr from "./messages/fr.json";

type Messages = typeof en;
type MessagesFr = typeof fr;

export type Locale = keyof Messages;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}