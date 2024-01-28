import LogoImg from "@/assets/images/Logo.png";

const Logo = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-2">
      <img
        src={LogoImg}
        alt="img"
        className="object-cover w-[120px] h-[120px]"
        loading="lazy"
      />
      <span className="font-semibold text-[18px] capitalize">
        villanueva gardens
      </span>
    </div>
  );
};

export default Logo;
