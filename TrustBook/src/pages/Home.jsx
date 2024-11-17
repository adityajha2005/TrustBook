import Post from "@/components/Post";

const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-[#14162E] justify-center items-center p-14 ml-[15vw] w-[60vw] flex flex-col gap-6">
        {/* <button
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-lg shadow-md hover:scale-105 transform duration-300"
          onClick={() => console.log("Navigate to other projects")} href="https://eco-zap.vercel.app/"
        >
          EcoZap
        </button> */}
        {/* <a
  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-lg shadow-md hover:scale-105 transform duration-300 flex text-center"
  href="https://eco-zap.vercel.app/"
  target="_blank"
  rel="noopener noreferrer"
>
  EcoZap
</a> */}
        {/* Posts */}
        <Post
          content="Top GitHub repositories to learn modern React development. Open source is great for 
many things. One of them is learning new skills. In this article, we'll look at some of the best 
Open Source React projects on GitHub that you can use to quickly boost your hands-on React 
learning and coding experience."
          username="Aditya Jha"
          img="/testimg.png"
        />
        <Post
          content="Top GitHub repositories to learn modern React development. Open source is great for 
many things. One of them is learning new skills. In this article, we'll look at some of the best 
Open Source React projects on GitHub that you can use to quickly boost your hands-on React 
learning and coding experience."
          username="Aditya Anjana"
          img="/testimg.png"
        />
        <Post
          content="Top GitHub repositories to learn modern React development. Open source is great for 
many things. One of them is learning new skills. In this article, we'll look at some of the best 
Open Source React projects on GitHub that you can use to quickly boost your hands-on React 
learning and coding experience."
          username="Shresth Shroff"
          img="/Character-falling.png"
        />
      </div>
    </>
  );
};

export default Home;
