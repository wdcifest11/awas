const Particles = ({style}: {style: string}) => {
  return (
    <div className={`rounded-full -z-10 bg-100 blur-[100px] ${style}`}></div>
  );
};

export default Particles;
