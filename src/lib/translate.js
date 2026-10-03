import { getTranslation } from "../data/translations.js";

export function createTranslator(language) {
  return (section, key) => {
    return getTranslation(language, section, key);
  };
}
