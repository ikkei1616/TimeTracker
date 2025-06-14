const TimeDisplay = () => {
  return (
    <div className="relative w-2/12 border-r-2 border-mainGray ">
      {Array.from({ length: 23 }).map((_, i) => {
        return (
          <p
            key={i}
            className="text-lg"
            style={{
              position: "absolute",
              top: `${(i + 1) * 60 - 10}px`,
              right: 20,
            }}
          >
            {i + 1}:00
          </p>
        );
      })}
    </div>
  );
};

export default TimeDisplay;
