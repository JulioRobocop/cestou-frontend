import { parsePhoneNumberWithError } from "libphonenumber-js";

export default function formatPhone(phone: string): string {
  try {
    const parsed = parsePhoneNumberWithError(phone, "BR");
    return parsed ? parsed.formatNational() : phone;
  } catch (error) {
    return phone;
  }
}
