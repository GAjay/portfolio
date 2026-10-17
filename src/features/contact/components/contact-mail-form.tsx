"use client";

import { Form } from "asriui/form";
import type { FormConfig } from "asriui/form";
import { siteConfig } from "@/shared/config/site";

const contactFormConfig: FormConfig = {
  id: "contact-mail",
  submitLabel: "Send message",
  fields: [
    {
      name: "n",
      type: "text",
      label: "Name",
      placeholder: "Name",
      required: true,
    },
    {
      name: "e",
      type: "email",
      label: "Email",
      placeholder: "Email",
      required: true,
    },
    {
      name: "m",
      type: "textarea",
      label: "Message",
      placeholder: "Message",
      required: true,
    },
  ],
};

export function ContactMailForm() {
  return (
    <Form
      className="contact-form"
      config={contactFormConfig}
      validateOn="submit"
      onSubmit={(values) => {
        const name = String(values.n ?? "");
        const email = String(values.e ?? "");
        const message = String(values.m ?? "");
        const subject = encodeURIComponent(`Message from ${name}`);
        const body = encodeURIComponent(`${message}\n\n${email}`);
        window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
      }}
    />
  );
}
