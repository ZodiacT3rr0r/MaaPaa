import { useAnimate } from "framer-motion";
import { useRef } from "react";

export const Example = () => {
  return (
    <MouseImageTrail
      renderImageBuffer={50}
      rotationRange={25}
      images={[
        "https://iili.io/2QsiCs1.jpg",
        "https://iili.io/2QsioqF.jpg",
        "https://iili.io/2QsiBWP.jpg",
        "https://iili.io/2Qsix0g.jpg",
        "https://iili.io/2Qsizga.jpg",
        "https://iili.io/2QsiTdJ.jpg",
        "https://iili.io/2QsiAeR.jpg",
        "https://iili.io/2QsiRbp.jpg",
        "https://iili.io/2Qsi7zN.jpg",
        "https://iili.io/2QsiYXI.jpg",
        "https://iili.io/2Qsiast.jpg",
        "https://iili.io/2QsilqX.jpg",
        "https://iili.io/2Qsi01n.jpg",
        "https://iili.io/2Qsi1gs.jpg",
        "https://iili.io/2QsiGdG.jpg",
        "https://iili.io/2QsiM7f.jpg",
        "https://iili.io/2QsiVe4.jpg",
        "https://iili.io/2QsiWml.jpg",
        "https://iili.io/2QsihI2.jpg",
        "https://iili.io/2QsijXS.jpg"
      ]}
    >
      <section className="grid h-screen w-full place-content-center bg-gradient-to-r from-red-500 via-pink-400 to-red-500">
        <div className="flex items-center w-1/2 mx-auto text-3xl font-bold uppercase text-black">

          <div class="wrap wishesFont">
            <center>
              <p> A Smart Child, a lovely home, countless cherished memories, and an unbreakable bond – life has truly blessed you both with the most precious gift of togetherness. Happy Anniversary!   &nbsp; </p>
              <p> Another year of love, laughter, and unwavering support has passed, and a new year begins to create even more beautiful moments together.
                <br />
                <p>Bas yahi dua hai Rab se</p>
                Aap dono ka saath kabhi na chute,  
                Pyaar bhara rishta kabhi na toote,  
                Sukh-dukh mein yuhi ek duje ka saath nibhayein,  
                Aur har pal khushiyon se mehke yeh jeevan raahein. 
              </p>
            </center>
            <p class="signed">With love and best wishes,
              <br /> Dhrushit Jain
            </p>
          </div>


        </div>
      </section>
    </MouseImageTrail>
  );
};

const MouseImageTrail = ({
  children,
  // List of image sources
  images,
  // Will render a new image every X pixels between mouse moves
  renderImageBuffer,
  // images will be rotated at a random number between zero and rotationRange,
  // alternating between a positive and negative rotation
  rotationRange,
}) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage();
    }
  };

  const calculateDistance = (x1, y1, x2, y2) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    // Using the Pythagorean theorem to calculate the distance
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el = document.querySelector(selector);

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    const rotation = Math.random() * rotationRange;

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) scale(0.5) ${
            imageIndex % 2
              ? `rotate(${rotation}deg)`
              : `rotate(-${rotation}deg)`
          }`,
          `translate(-50%, -50%) scale(1) ${
            imageIndex % 2
              ? `rotate(-${rotation}deg)`
              : `rotate(${rotation}deg)`
          }`,
        ],
      },
      { type: "spring", damping: 15, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "linear", duration: 0.5, delay: 5 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {children}

      {images.map((img, index) => (
        <img
          className="pointer-events-none absolute left-0 top-0 h-48 w-auto rounded-xl border-2 border-black bg-neutral-900 object-cover opacity-0"
          src={img}
          alt={`Mouse move image ${index}`}
          key={index}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};