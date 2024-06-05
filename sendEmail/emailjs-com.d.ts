/* eslint-disable prettier/prettier */
declare module 'emailjs-com' {
  export function init(userID: string): void;
  export function send(
    serviceID: string,
    templateID: string,
    templateParams: Record<string, any>
  ): Promise<{ status: number; text: string }>;
  export function sendForm(
    serviceID: string,
    templateID: string,
    form: HTMLFormElement
  ): Promise<{ status: number; text: string }>;
}
