import React, { useEffect, useState } from "react";
import "./style.css"; // Import your CSS file

interface WBsliderProps {
  initialValue?: number;
}

const WBslider: React.FC<WBsliderProps> = ({ initialValue = 50 }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const input = document.getElementById("dae1") as HTMLInputElement;
    const current_value = document.querySelector(
      ".current-value"
    ) as HTMLElement;

    const updateSlider = () => {
      const val = parseInt(input.value, 10);

      if (val < 30) {
        current_value.textContent = "< 31";
      } else if (isNaN(val)) {
        current_value.textContent = "0";
      } else {
        current_value.textContent = val.toString();
      }

      const pos =
        (val - parseInt(input.min, 10)) /
        (parseInt(input.max, 10) - parseInt(input.min, 10));

      const thumbwidth = 50;
      const thumbCorrect = thumbwidth * (pos - 0.5) * -1;
      const titlepos = Math.round(
        pos * input.offsetWidth - thumbwidth / 4 + thumbCorrect
      );

      current_value.style.left = `${titlepos}px`;

      const grad = `linear-gradient(90deg, #A7A7A7 ${Math.round(
        pos * 99
      )}%, #dad9d5 ${Math.round(pos * 99 + 1)}%)`;
      input.style.background = grad;
    };

    input.addEventListener("input", updateSlider);
    input.addEventListener("change", updateSlider);
    input.addEventListener("keyup", updateSlider);

    const handleFocus = () => {
      if (isNaN(parseInt(input.value, 10))) {
        input.value = "0";
      }
    };

    input.addEventListener("focus", handleFocus);

    const handleResize = () => {
      updateSlider();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      input.removeEventListener("input", updateSlider);
      input.removeEventListener("change", updateSlider);
      input.removeEventListener("keyup", updateSlider);
      input.removeEventListener("focus", handleFocus);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="slider">
      <span className="min-value">30</span>
      <div className="range">
        <input
          type="range"
          name="date"
          id="dae1"
          min="30"
          max="300"
          step="5"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value, 10))}
          required
        />
        <span className="current-value">{value}</span>
      </div>
      <span className="max-value">300</span>
    </div>
  );
};

export default WBslider;
