import FileUpload from "@/components/FileUpload";

import Loader from "@/app/loader";
const Page: React.FC = () => {
  return (
    <div className="upload-container min-h-screen m-4 rounded-xl bg-white p-4">
      <FileUpload />
      <Loader />
    </div>
  );
};

export default Page;
