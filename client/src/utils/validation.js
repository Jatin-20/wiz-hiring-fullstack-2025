export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
export function isValidName(name) {
    return /^[a-zA-Z ]{2,50}$/.test(name.trim());
  }

export function isFutureDateTime(isoTime) {
    return new Date(isoTime) > new Date();
  }
  