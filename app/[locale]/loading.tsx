import { Loader } from 'lucide-react';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <Loader className="h-16 w-16 animate-spin text-accent" />
    </div>
  );
};

export default LoadingPage;
