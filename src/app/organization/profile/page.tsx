// import ModalButton from "@/app/shared/modal-button";
// import PasswordReset from "@/app/shared/passwordrest";
// import Profile from "@/app/shared/profile";
import { metaObject } from "@/config/site.config";
// import { PiPassword } from "react-icons/pi";

export const metadata = {
  ...metaObject("Organization profile page"),
};

export default function ProfilePage() {
  return (
    <div className="@container">
      {/* <div className="relative">
        <div className="absolute right-0 top-[25px]">
          <ModalButton
            label="Change password"
            view={<PasswordReset />}
            icon={<PiPassword className="me-1.5 h-[17px] w-[17px]" />}
            customSize="600px"
            className="mt-0 w-[150px]"
          />
        </div>
      </div>
      <Profile /> */}
      Profile
    </div>
  );
}
