import React from "react";
import Button from "./Button";

interface AvatarDialogProps {
  visible: boolean;
  closeModal: () => void;
  setImage: (url: string) => void;
}

const AvatarDialog: React.FC<AvatarDialogProps> = ({
  visible,
  closeModal,
  setImage,
}) => {
  const avatars = [
    "https://via.placeholder.com/150/0000FF/808080?text=Avatar+1",
    "https://via.placeholder.com/150/FF0000/FFFFFF?text=Avatar+2",
    "https://via.placeholder.com/150/00FF00/000000?text=Avatar+3",
  ];

  return (
    <>
      {visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-lg shadow-2xl transform transition-transform duration-300 scale-105">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
              Select an Avatar
            </h2>
            <div className="flex justify-around mb-6">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  className="w-24 h-24 rounded-full cursor-pointer transition transform hover:scale-110 hover:opacity-80"
                  onClick={() => {
                    setImage(avatar);
                    localStorage.setItem("profile", avatar);
                    closeModal();
                  }}
                />
              ))}
            </div>
            <div className="flex justify-center">
              <Button onClick={closeModal} text="Close" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AvatarDialog;
