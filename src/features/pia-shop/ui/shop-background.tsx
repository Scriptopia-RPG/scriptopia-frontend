const ShopBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-300 via-stone-200 to-stone-100 dark:from-stone-800 dark:via-stone-700 dark:to-stone-600">
      <div
        className="h-full w-full opacity-30 dark:opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(0,0,0,0.05) 0px,
              rgba(0,0,0,0.05) 1px,
              transparent 1px,
              transparent 20px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(0,0,0,0.05) 0px,
              rgba(0,0,0,0.05) 1px,
              transparent 1px,
              transparent 40px
            )
          `,
        }}
      />
    </div>
  );
};

export default ShopBackground;

