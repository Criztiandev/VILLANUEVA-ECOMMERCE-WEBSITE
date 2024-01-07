import Button from "@/components/Button";
import FlexStack from "@/components/FlexStack";

const TopBar = () => {
  return (
    <header className="navbar bg-base-100 border px-8 py-4">
      <div className="flex justify-between items-center w-full">
        <Button className="btn  btn-circle" title="T" />

        <FlexStack dir="row">
          <Button className="btn  btn-circle" title="T" />
          <Button className="btn  btn-circle" title="T" />
        </FlexStack>
      </div>
    </header>
  );
};

export default TopBar;
