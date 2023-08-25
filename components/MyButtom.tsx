import { useState, MouseEvent } from "react";

interface ButtonWithIconProps {
  onClick?: () => void;
}

function ButtonWithIcon({ onClick }: ButtonWithIconProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    if (onClick) {
      onClick();
    }
    setModalOpen(true);
  };

  return (
    <button
      onClick={handleOpenModal}
      className="fixed bottom-0 right-0 text-white rounded-l-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="72"
        height="90"
        viewBox="5 15 72 72"
        fill="none"
      >
        <g filter="url(#filter0_d_37_919)">
          <circle cx="36" cy="34" r="28" fill="url(#paint0_linear_37_919)" />
          <circle cx="36" cy="34" r="27" stroke="#515CC6" stroke-width="2" />
        </g>
        <path
          d="M36 24V44M26 34H46"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="bevel"
        />
        <defs>
          <filter
            id="filter0_d_37_919"
            x="0"
            y="0"
            width="72"
            height="72"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="4" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_37_919"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_37_919"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_37_919"
            x1="36"
            y1="6"
            x2="36"
            y2="62"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#3F4EA0" />
            <stop offset="1" stop-color="#473FA0" />
          </linearGradient>
        </defs>
      </svg>
    </button>
  );
}

export default ButtonWithIcon;
