import { CreateTypeForm } from "@/components/create-type-form";
const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Tasks</h1>
        <div className="test-page">
          <CreateTypeForm />
        </div>
      </div>
    </div>
  );
};

export default TestPage;
