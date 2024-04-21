import { IconProps } from "./IconProps.types";

export default function Arrow({ className, size = 44 }: IconProps) {
  return (
    <svg
      width="162"
      height="23"
      viewBox="0 0 262 23"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.83789 10.0821C36.464 10.0821 71.0901 10.0821 105.716 10.0821C154.656 10.0821 204.361 7.82788 253.162 12.0821"
        stroke="black"
        stroke-width="3"
        stroke-linecap="round"
      />
      <path
        d="M241.838 2.48535C243.393 3.17653 263.722 9.48489 259.616 12.4854C255.36 15.5956 251.874 19.8067 246.838 21.4854"
        stroke="black"
        stroke-width="3"
        stroke-linecap="round"
      />
    </svg>
  );
}
