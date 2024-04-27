import { useRef } from "react";

export default function useUserRef() {
  return {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
    contact: useRef<HTMLInputElement>(null),
    website: useRef<HTMLInputElement>(null),
  };
}
