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
    "https://img.freepik.com/free-photo/3d-rendering-boy-wearing-cap-with-letter-r_1142-40523.jpg?size=338&ext=jpg&ga=GA1.1.44546679.1716595200&semt=ais_user",
    "https://img.freepik.com/free-photo/3d-rendering-boy-baseball-cap-gray-background_1142-51796.jpg",
    "https://img.freepik.com/premium-photo/cute-girl-3d-character-design-cartoon-girl-avatar_432516-5513.jpg",
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
                  className="w-24 h-24 rounded-full cursor-pointer transition transform hover:scale-110 hover:opacity-80 m-10"
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
