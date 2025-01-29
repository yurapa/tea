import { Button } from "@/components/ui/button";

// const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const HomePage = () => {
  // await delay(2000);

  return (
    <div className="flex-center flex-col p-5 m-5">
      <h1 className="h1-bold">The TeaVibe store</h1>
      <div className="flex-center mt-5">
        <Button>Button</Button>
      </div>
    </div>
  );
};

export default HomePage;
