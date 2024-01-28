import React from "react";

const CoverSection = () => {
  return (
    <Container className="mb-6 w-full  h-full ">
      <Container
        className={`grid gap-4
    ${imagesExist(1) && "grid-rows-[auto_100px]"}
  `}>
        {/* Cover Image */}
        <CoverImage
          cover={cover}
          ref={CoverRef}
          onFileSelect={handleFileSelect}
        />

        {imagesExist(1) && (
          <Container className="flex gap-4">
            {renderImages()?.map((slot: any, index) => {
              // If the Imave is Cover, Dont render it
              if (slot?.name === cover?.name) return;

              // If the slot is a undefiend, make it a MiniInput
              if (!slot) {
                return <MiniInput key={index} onSelect={handleAddImage} />;
              }
              // render everything with Image
              return (
                <OtherImage
                  isDelete={isDelete}
                  image={slot}
                  onCoverChange={handleSlotAction}
                />
              );
            })}
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default CoverSection;
