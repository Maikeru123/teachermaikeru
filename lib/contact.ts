export const contactLimits = { name: 100, email: 254, phone: 40, message: 5000 }

export type ContactFields = { name: string; email: string; phone: string; message: string }
export type ContactErrors = Partial<Record<keyof ContactFields, string>>

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {}
  if (!fields.name.trim()) errors.name = "Please enter your name."
  else if (fields.name.length > contactLimits.name || /[\r\n]/.test(fields.name)) errors.name = "Please enter a shorter, single-line name."
  if (fields.email.length > contactLimits.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) errors.email = "Please enter a valid email."
  if (fields.phone.length > contactLimits.phone || /[\r\n]/.test(fields.phone)) errors.phone = "Please enter a valid contact number."
  if (!fields.message.trim()) errors.message = "Please enter a message."
  else if (fields.message.length > contactLimits.message) errors.message = "Please keep your message under 5,000 characters."
  return errors
}
