export const Dots = () => (
  <svg fill="#FDFDFDFF" viewBox="0 0 192 48" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="24" opacity="1">
      <animate
        id="spinner_qYjJ"
        begin="0;spinner_t4KZ.end-0.25s"
        attributeName="opacity"
        dur="0.75s"
        values="1;.2"
        fill="freeze"
      />
    </circle>
    <circle cx="96" cy="24" r="24" opacity=".4">
      <animate
        begin="spinner_qYjJ.begin+0.15s"
        attributeName="opacity"
        dur="0.75s"
        values="1;.2"
        fill="freeze"
      />
    </circle>
    <circle cx="168" cy="24" r="24" opacity=".3">
      <animate
        id="spinner_t4KZ"
        begin="spinner_qYjJ.begin+0.3s"
        attributeName="opacity"
        dur="0.75s"
        values="1;.2"
        fill="freeze"
      />
    </circle>
  </svg>
);