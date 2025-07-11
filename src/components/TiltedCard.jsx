import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import styled from "styled-components";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  className,
  onMouseMove,
  onMouseLeave,
  onMouseEnter,
  onClick,
  isSelected,
}) {
  const ref = useRef(null);

  const x = useMotionValue();
  const y = useMotionValue();
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);

    if (onMouseMove) {
      onMouseMove(e);
    }
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    // opacity.set(1);

    if (onMouseEnter) {
      onMouseEnter();
    }
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);

    if (isSelected) {
      return;
    }
    // opacity.set(0);
    scale.set(1);

    if (onMouseLeave) {
      onMouseLeave();
    }
  }

  useEffect(() => {
    if (isSelected) {
      scale.set(scaleOnHover);
    } else {
      scale.set(1);
    }
  }, [isSelected]);

  return (
    <Container
      onClick={onClick}
      ref={ref}
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      className={className}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale,
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className="tilted-card-img"
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className="tilted-card-overlay">
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </Container>
  );
}

const Container = styled(motion.figure)`
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .tilted-card-mobile-alert {
    position: absolute;
    top: 1rem;
    text-align: center;
    font-size: 0.875rem;
    display: none;
  }

  @media (max-width: 640px) {
    .tilted-card-mobile-alert {
      display: block;
    }
    .tilted-card-caption {
      display: none;
    }
  }

  .tilted-card-inner {
    position: relative;
    transform-style: preserve-3d;
  }

  .tilted-card-img {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    border-radius: 15px;
    will-change: transform;
    transform: translateZ(0);
  }

  .tilted-card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    will-change: transform;
    transform: translateZ(30px);
  }

  .tilted-card-caption {
    pointer-events: none;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 4px;
    background-color: #fff;
    padding: 4px 10px;
    font-size: 10px;
    color: #2d2d2d;
    opacity: 0;
    z-index: 3;
  }
`;
