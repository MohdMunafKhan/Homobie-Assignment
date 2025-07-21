import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function DarkModeToggle() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('high-contrast', isHighContrast);
  }, [isHighContrast]);

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="highContrastToggle"
        checked={isHighContrast}
        onChange={() => setIsHighContrast(!isHighContrast)}
        aria-label="Toggle high contrast mode"
      />
      <label className="form-check-label text-light" htmlFor="highContrastToggle">
        High Contrast
      </label>
    </div>
  );
}

export default DarkModeToggle;